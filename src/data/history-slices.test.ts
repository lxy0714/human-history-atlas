// 历史数据二级分片完整性测试
// 验证：索引层 hasBody=true 的节点 id 一定能在对应 shard 的 body 文件里找到
// 且所有 shard 的 id 集合 = 索引 hasBody=true 的 id 集合
// 总数 = 763

import { describe, it, expect } from 'vitest';
import { ALL_HISTORY_NODES_INDEX, ERA_IDS } from '@/data/history-index';
import { SHARD_BODY_IMPORTS } from '@/data/shard-body-map';
import { ERA_SHARD_KEYS } from '@/data/era-shard-map';

describe('历史数据二级分片完整性', () => {
  it('总节点数 = 763', () => {
    expect(ALL_HISTORY_NODES_INDEX.length).toBe(763);
  });

  it('7 个时代都有对应的 shard 列表', () => {
    for (const eraId of ERA_IDS) {
      const shards = ERA_SHARD_KEYS[eraId];
      expect(shards).toBeDefined();
      expect(shards.length).toBeGreaterThan(0);
    }
    expect(ERA_IDS.length).toBe(7);
  });

  it('各时代节点计数正确：10/80/173/246/108/70/76', () => {
    const expected: Record<string, number> = {
      prehistoric: 10,
      ancient: 80,
      classical: 173,
      medieval: 246,
      earlyModern: 108,
      industrial: 70,
      modern: 76,
    };

    for (const eraId of ERA_IDS) {
      const count = ALL_HISTORY_NODES_INDEX.filter((n) => n.eraId === eraId).length;
      expect(count).toBe(expected[eraId] ?? -1);
    }
  });

  it('索引 hasBody=true 的节点数 = 763（所有节点都有正文）', () => {
    const hasBodyCount = ALL_HISTORY_NODES_INDEX.filter((n) => n.hasBody).length;
    expect(hasBodyCount).toBe(763);
  });

  it('每个节点都有非空 shardKey，且指向的 shard 文件存在', () => {
    let emptyCount = 0;
    let missingShardCount = 0;
    for (const node of ALL_HISTORY_NODES_INDEX) {
      if (!node.shardKey) {
        emptyCount++;
        continue;
      }
      if (!SHARD_BODY_IMPORTS[node.shardKey]) {
        missingShardCount++;
      }
    }
    expect(emptyCount).toBe(0);
    expect(missingShardCount).toBe(0);
  });

  it('每个节点的正文都能在对应 shard 的 body map 里找到（无遗漏）', async () => {
    // 并行加载所有 shard
    const allShardMaps = await Promise.all(
      Object.keys(SHARD_BODY_IMPORTS).map(async (key) => {
        const mod = await SHARD_BODY_IMPORTS[key]();
        return { key, bodyMap: mod.BODY_MAP };
      }),
    );

    const shardById = new Map<string, string>(); // nodeId -> shardKey
    for (const { key, bodyMap } of allShardMaps) {
      for (const id of Object.keys(bodyMap)) {
        shardById.set(id, key);
      }
    }

    let missingCount = 0;
    const missingSamples: string[] = [];

    for (const node of ALL_HISTORY_NODES_INDEX) {
      if (!node.hasBody) continue;
      if (!shardById.has(node.id)) {
        missingCount++;
        if (missingSamples.length < 5) missingSamples.push(node.id);
      }
    }

    expect(missingCount).toBe(0);
    expect(missingSamples).toEqual([]);
  });

  it('所有 shard 的 id 都能在索引里找到，且 shardKey 与索引一致（无重复、无多余）', async () => {
    const indexById = new Map(ALL_HISTORY_NODES_INDEX.map((n) => [n.id, n]));
    let extraCount = 0;
    let wrongShardCount = 0;
    let duplicateCount = 0;
    const seenIds = new Set<string>();
    const extras: string[] = [];
    const wrongShardSamples: string[] = [];

    for (const shardKey of Object.keys(SHARD_BODY_IMPORTS)) {
      const mod = await SHARD_BODY_IMPORTS[shardKey]();
      for (const id of Object.keys(mod.BODY_MAP)) {
        // 无重复
        if (seenIds.has(id)) {
          duplicateCount++;
          continue;
        }
        seenIds.add(id);

        // 索引中存在
        const node = indexById.get(id);
        if (!node) {
          extraCount++;
          if (extras.length < 5) extras.push(id);
          continue;
        }

        // shardKey 匹配
        if (node.shardKey !== shardKey) {
          wrongShardCount++;
          if (wrongShardSamples.length < 5) {
            wrongShardSamples.push(`${id}: index=${node.shardKey} actual=${shardKey}`);
          }
        }
      }
    }

    expect(extraCount).toBe(0);
    expect(wrongShardCount).toBe(0);
    expect(duplicateCount).toBe(0);
    expect(extras).toEqual([]);
  });

  it('shard 总数：medieval 至少拆成 2 片', () => {
    const medievalShards = ERA_SHARD_KEYS.medieval || [];
    expect(medievalShards.length).toBeGreaterThanOrEqual(2);
  });

  // 抽样 3 个节点正文前 60 字与源数据一致
  it('抽样 3 个节点正文前 60 字与历史源数据一致', async () => {
    // 动态加载源数据（仅测试用）
    const { ALL_HISTORY_NODES } = await import('@/data/history');
    const sourceById = new Map(ALL_HISTORY_NODES.map((n) => [n.id, n.description || '']));

    const sampleIds = [
      'sci-four-inventions', // 四大发明（中国中世纪）
      'america-maya-cities', // 玛雅城邦蒂卡尔与帕伦克（美洲中世纪）
      'dynasty-nanbeichao', // 南北朝（中国中世纪）
    ];

    for (const id of sampleIds) {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === id);
      expect(node).toBeDefined();
      if (!node) continue;

      const shardKey = node.shardKey;
      expect(shardKey).toBeTruthy();

      const mod = await SHARD_BODY_IMPORTS[shardKey]();
      const shardBody = mod.BODY_MAP[id];
      expect(shardBody).toBeDefined();

      const sourceBody = sourceById.get(id) || '';
      expect(sourceBody).toBeTruthy();

      // 前 60 字完全一致
      const prefixLen = 60;
      expect(shardBody.slice(0, prefixLen)).toBe(sourceBody.slice(0, prefixLen));
    }
  });

  it('正文内容不为空（抽样 3 个节点验证长度 > 100 字）', async () => {
    const samples = [
      { id: 'zhang-qian' }, // 张骞
      { id: 'america-chichen-itza' }, // 奇琴伊察
      { id: 'event-northern-wei-unify' }, // 北魏统一北方
    ];

    for (const s of samples) {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === s.id);
      expect(node).toBeDefined();
      if (!node) continue;
      const mod = await SHARD_BODY_IMPORTS[node.shardKey]();
      const body = mod.BODY_MAP[s.id];
      expect(body).toBeDefined();
      expect(body.length).toBeGreaterThan(100);
    }
  });
});

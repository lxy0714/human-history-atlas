import { describe, it, expect } from 'vitest';
import { getNodeAssociations, hasAssociation, RELATIONS } from '@/data/relations';
import { ALL_HISTORY_NODES } from '@/data/history';
// 使用纯 console.info 输出统计，避免引入 client-toolkit-lite（其 crypto-js 子路径在 vitest ESM 下有兼容问题）
const log = console.info;

describe('关联系统一致性验证', () => {
  const allNodeIds = new Set(ALL_HISTORY_NODES.map((n) => n.id));

  it('零孤立节点：每个节点至少有 1 条关联', () => {
    const isolated: string[] = [];
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      if (assoc.total === 0) {
        isolated.push(`${node.title} (${node.id})`);
      }
    }
    expect(isolated).toEqual([]);
    expect(isolated.length).toBe(0);
  });

  it('零悬空引用：所有关联目标都真实存在', () => {
    const dangling: string[] = [];
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      for (const item of assoc.all) {
        if (!allNodeIds.has(item.targetId)) {
          dangling.push(`${node.id} → ${item.targetId}`);
        }
      }
    }
    expect(dangling).toEqual([]);
    expect(dangling.length).toBe(0);
  });

  it('零自环：节点不会关联到自己', () => {
    const selfLoops: string[] = [];
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      if (assoc.all.some((i) => i.targetId === node.id)) {
        selfLoops.push(node.id);
      }
    }
    expect(selfLoops).toEqual([]);
    expect(selfLoops.length).toBe(0);
  });

  it('零重复关联：同一目标节点只出现一次', () => {
    const dupes: string[] = [];
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      const seen = new Set<string>();
      for (const item of assoc.all) {
        if (seen.has(item.targetId)) {
          dupes.push(`${node.id} → ${item.targetId}`);
        }
        seen.add(item.targetId);
      }
    }
    expect(dupes).toEqual([]);
    expect(dupes.length).toBe(0);
  });

  it('双向对称：A 关联 B 当且仅当 B 关联 A', () => {
    const asymmetric: string[] = [];
    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      for (const item of assoc.all) {
        const reverseAssoc = getNodeAssociations(item.targetId);
        const hasReverse = reverseAssoc.all.some((r) => r.targetId === node.id);
        if (!hasReverse) {
          asymmetric.push(`${node.id} → ${item.targetId}（无反向）`);
        }
      }
    }
    expect(asymmetric).toEqual([]);
    expect(asymmetric.length).toBe(0);
  });

  it('hasAssociation 与 getNodeAssociations 一致', () => {
    const testNodes = ALL_HISTORY_NODES.slice(0, 50);
    for (const node of testNodes) {
      const assoc = getNodeAssociations(node.id);
      for (const item of assoc.all) {
        expect(hasAssociation(node.id, item.targetId)).toBe(true);
      }
    }
    // 随机不相关的应该为 false
    expect(hasAssociation('confucius', 'world-war-2')).toBe(false);
  });

  it('RELATIONS 双向对称 100%', () => {
    const relKeySet = new Set(RELATIONS.map((r) => `${r.from}|${r.to}|${r.type}`));
    const asymmetric: string[] = [];
    for (const r of RELATIONS) {
      const reverseKey = `${r.to}|${r.from}|${r.type}`;
      if (!relKeySet.has(reverseKey)) {
        asymmetric.push(`${r.from} → ${r.to} (${r.type})`);
      }
    }
    expect(asymmetric).toEqual([]);
  });

  it('统计输出', () => {
    let totalTypedPairs = 0;
    let totalRelatedPairs = 0;
    const degreeMap = new Map<string, number>();

    for (const node of ALL_HISTORY_NODES) {
      const assoc = getNodeAssociations(node.id);
      degreeMap.set(node.id, assoc.total);
      totalTypedPairs += assoc.typed.length;
      totalRelatedPairs += assoc.related.length;
    }

    // 无向边数 = 总度数 / 2
    const typedEdges = totalTypedPairs / 2;
    const relatedEdges = totalRelatedPairs / 2;

    const degrees = [...degreeMap.values()];
    const avgDegree = degrees.reduce((a, b) => a + b, 0) / degrees.length;
    const maxDegree = Math.max(...degrees);
    const minDegree = Math.min(...degrees);

    log('\n=== 关联系统统计 ===');
    log(`节点总数: ${ALL_HISTORY_NODES.length}`);
    log(`正式关系边数 (typed): ${typedEdges}`);
    log(`轻量相关边数 (related): ${relatedEdges}`);
    log(`总关联边数: ${typedEdges + relatedEdges}`);
    log(`平均度数: ${avgDegree.toFixed(2)}`);
    log(`最小度数: ${minDegree}`);
    log(`最大度数: ${maxDegree}`);
    log('====================\n');

    expect(minDegree).toBeGreaterThanOrEqual(1);
  });
});

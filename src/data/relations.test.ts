import { describe, it, expect } from 'vitest';
import { RELATIONS, getRelatedNodeIds, findShortestPath } from './relations';
import { ALL_HISTORY_NODES } from './history';

describe('RELATIONS 数据一致性', () => {
  // 零自环
  it('零自环关系（from === to）', () => {
    const selfLoops = RELATIONS.filter((r) => r.from === r.to);
    expect(selfLoops.length).toBe(0);
  });

  // 双向对称：如果有 A→B，就必须有 B→A
  it('关系双向对称', () => {
    const forwardKeys = new Set(RELATIONS.map((r) => `${r.from}->${r.to}::${r.type}`));
    const backwardKeys = new Set(RELATIONS.map((r) => `${r.to}->${r.from}::${r.type}`));

    const missing: string[] = [];
    for (const key of forwardKeys) {
      if (!backwardKeys.has(key)) {
        missing.push(key);
      }
    }
    expect(missing).toEqual([]);
  });

  // 零悬空：所有 from/to 都存在于节点中
  it('零悬空关系', () => {
    const nodeIds = new Set(ALL_HISTORY_NODES.map((n) => n && n.id).filter(Boolean));
    const dangling = RELATIONS.filter(
      (r) => !nodeIds.has(r.from) || !nodeIds.has(r.to),
    );
    expect(dangling.length).toBe(0);
  });

  // 部分节点可能没有关系（纯地理/补充类节点），验证数量在合理范围
  it('孤立节点数量在合理范围（< 50%）', () => {
    const nodeIds = ALL_HISTORY_NODES.map((n) => n && n.id).filter(Boolean) as string[];
    const inRelation = new Set<string>();
    for (const r of RELATIONS) {
      inRelation.add(r.from);
      inRelation.add(r.to);
    }
    const isolatedCount = nodeIds.filter((id) => !inRelation.has(id)).length;
    const totalCount = nodeIds.length;
    // 孤立节点不应超过总数的 50%
    expect(isolatedCount).toBeLessThan(totalCount * 0.5);
    // 至少有一半节点有连接
    expect(inRelation.size).toBeGreaterThan(totalCount * 0.5);
  });

  // 关系总数
  it('关系总数', () => {
    expect(RELATIONS.length).toBeGreaterThan(1000);
  });
});

describe('getRelatedNodeIds', () => {
  it('返回所有关联节点（去重）', () => {
    const ids = getRelatedNodeIds('confucius');
    expect(ids.length).toBeGreaterThan(0);
    // 无重复
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('不存在的节点返回空数组', () => {
    expect(getRelatedNodeIds('nonexistent-node')).toEqual([]);
  });
});

describe('findShortestPath', () => {
  it('同一节点返回路径长度 1', () => {
    const result = findShortestPath('confucius', 'confucius');
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(['confucius']);
    expect(result!.steps).toBe(0);
  });

  it('直接相连的两个节点路径步数为 1', () => {
    const ids = getRelatedNodeIds('confucius');
    if (ids.length > 0) {
      const result = findShortestPath('confucius', ids[0]);
      expect(result).not.toBeNull();
      expect(result!.path.length).toBe(2);
      expect(result!.steps).toBe(1);
      expect(result!.path[0]).toBe('confucius');
      expect(result!.path[result!.path.length - 1]).toBe(ids[0]);
    }
  });

  it('不可达返回 null', () => {
    const result = findShortestPath('confucius', 'completely-fake-node');
    expect(result).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { clusterNodes } from './cluster-utils';
import type { IHistoryNode } from '@/data/history';

function mockNode(id: string, lat: number, lng: number, civ = 'china'): IHistoryNode {
  return {
    id,
    title: id,
    year: 1000,
    yearDisplay: '公元1000年',
    type: 'event',
    civilization: civ as never,
    summary: '',
    eraId: 'ancient',
    location: { lat, lng },
    categories: [],
    important: false,
    imageEra: '',
    relatedNodeIds: [],
    description: '',
  } as IHistoryNode;
}

describe('clusterNodes', () => {
  it('完全同坐标的节点聚为一组', () => {
    const nodes = [
      mockNode('a', 34.3416, 108.9398),
      mockNode('b', 34.3416, 108.9398),
      mockNode('c', 34.3416, 108.9398),
    ];
    const clusters = clusterNodes(nodes, 0);
    expect(clusters.length).toBe(1);
    expect(clusters[0].count).toBe(3);
    expect(clusters[0].nodes.map((n) => n.id).sort()).toEqual(['a', 'b', 'c']);
  });

  it('不同坐标的节点各成一组', () => {
    const nodes = [
      mockNode('a', 34.3416, 108.9398),
      mockNode('b', 39.9042, 116.4074),
      mockNode('c', 41.9028, 12.4964),
    ];
    const clusters = clusterNodes(nodes, 0);
    expect(clusters.length).toBe(3);
    for (const c of clusters) {
      expect(c.count).toBe(1);
    }
  });

  it('阈值内的节点聚为一组', () => {
    const nodes = [
      mockNode('a', 34.34, 108.94),
      mockNode('b', 34.341, 108.941), // 约 0.0014 度
      mockNode('c', 34.35, 108.95),
    ];
    const clusters = clusterNodes(nodes, 0.02); // 阈值 0.02 度
    expect(clusters.length).toBe(1);
    expect(clusters[0].count).toBe(3);
  });

  it('阈值外的节点分开', () => {
    const nodes = [
      mockNode('a', 34.34, 108.94),
      mockNode('b', 35.34, 108.94), // 1 度差异
    ];
    const clusters = clusterNodes(nodes, 0.5);
    expect(clusters.length).toBe(2);
  });

  it('聚集组主色取出现最多的文明', () => {
    const nodes = [
      mockNode('a', 34.34, 108.94, 'china'),
      mockNode('b', 34.34, 108.94, 'china'),
      mockNode('c', 34.34, 108.94, 'rome'),
    ];
    const clusters = clusterNodes(nodes, 0);
    expect(clusters.length).toBe(1);
    // china 出现 2 次最多，主色应为 china 色
    expect(clusters[0].primaryColor).toBeTruthy();
  });

  it('空输入返回空数组', () => {
    expect(clusterNodes([], 0)).toEqual([]);
  });

  it('没有坐标的节点被过滤', () => {
    const nodes = [
      { ...mockNode('a', 34.34, 108.94), location: undefined },
    ];
    expect(clusterNodes(nodes as IHistoryNode[], 0)).toEqual([]);
  });
});

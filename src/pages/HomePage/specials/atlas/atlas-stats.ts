// EXPORTS: useAtlasStats, getNodeDegreeMap, getCivilizationRiseFallData, getEraDistribution, getCategoryDistribution, getCivilizationDistribution, getCenturyDensity, getRelationTypeStats, getTopHubNodes

import { useMemo } from 'react';
import {
  ALL_HISTORY_NODES_INDEX,
  CIVILIZATIONS,
  CATEGORIES,
  ERAS,
  type IHistoryNodeIndex,
  type CivilizationKey,
  type CategoryKey,
  type HistoryNodeType,
} from '@/data/history-index';
import { RELATIONS, RELATION_STATS, RELATION_TYPES, type RelationType } from '@/data/relations';
import { formatYear } from '../../utils';

const ALL_NODES = ALL_HISTORY_NODES_INDEX;

// ========== 类型统计 ==========
export function countByType(nodes: IHistoryNodeIndex[]): Record<HistoryNodeType, number> {
  const acc: Record<string, number> = { event: 0, person: 0, dynasty: 0, artifact: 0, myth: 0 };
  for (const n of nodes) {
    const t = n.type ?? 'event';
    acc[t] = (acc[t] ?? 0) + 1;
  }
  return acc as Record<HistoryNodeType, number>;
}

export function countByCategory(nodes: IHistoryNodeIndex[]): Record<CategoryKey, number> {
  const acc: Record<string, number> = {};
  for (const key of Object.keys(CATEGORIES)) acc[key] = 0;
  for (const n of nodes) {
    for (const c of n.categories) {
      acc[c] = (acc[c] ?? 0) + 1;
    }
  }
  return acc as Record<CategoryKey, number>;
}

export function countByEra(nodes: IHistoryNodeIndex[]): Record<string, number> {
  const acc: Record<string, number> = {};
  for (const e of ERAS) acc[e.id] = 0;
  for (const n of nodes) {
    acc[n.eraId] = (acc[n.eraId] ?? 0) + 1;
  }
  return acc;
}

export function countByCivilization(nodes: IHistoryNodeIndex[]): Record<CivilizationKey, number> {
  const acc: Record<string, number> = {};
  for (const k of Object.keys(CIVILIZATIONS)) acc[k] = 0;
  for (const n of nodes) {
    acc[n.civilization] = (acc[n.civilization] ?? 0) + 1;
  }
  return acc as Record<CivilizationKey, number>;
}

// ========== 度数统计（关系最密 TopN） ==========
export function getNodeDegreeMap(): Map<string, number> {
  const map = new Map<string, number>();
  for (const r of RELATIONS) {
    map.set(r.from, (map.get(r.from) ?? 0) + 1);
    map.set(r.to, (map.get(r.to) ?? 0) + 1);
  }
  return map;
}

export function getTopHubNodes(topN = 15): Array<{ id: string; title: string; degree: number; civilization: CivilizationKey }> {
  const degreeMap = getNodeDegreeMap();
  const nodeMap = new Map(ALL_NODES.map((n) => [n.id, n]));
  return [...degreeMap.entries()]
    .filter(([id]) => nodeMap.has(id))
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([id, degree]) => {
      const n = nodeMap.get(id)!;
      return { id, title: n.title, degree, civilization: n.civilization };
    });
}

// ========== 关系类型统计 ==========
export function getRelationTypeStats(): Array<{ type: RelationType; label: string; count: number; color: string }> {
  const acc: Record<string, number> = {};
  for (const r of RELATIONS) {
    acc[r.type] = (acc[r.type] ?? 0) + 1;
  }
  return (Object.keys(RELATION_TYPES) as RelationType[]).map((t) => ({
    type: t,
    label: RELATION_TYPES[t].label,
    count: acc[t] ?? 0,
    color: RELATION_TYPES[t].color,
  }));
}

// ========== 文明兴衰曲线 ==========
// 时间分段：史前疏，近现代密
function buildTimeBuckets(): number[] {
  const buckets: number[] = [];
  // 史前：-300万 ~ -3000，每 10 万年一采样（稀疏代表）
  // 为保证可读，我们用分段对数刻度的"代表点"
  // 改为：10个史前点 + 古代/古典/中世纪每 100年 + 近现/工业每 50年 + 现代每 10年
  const prehistoric = [-3000000, -1000000, -300000, -100000, -30000, -10000, -5000, -4000];
  const ancient = [];
  for (let y = -4000; y <= -500; y += 500) ancient.push(y);
  const classical = [];
  for (let y = -500; y <= 500; y += 100) classical.push(y);
  const medieval = [];
  for (let y = 500; y <= 1500; y += 100) medieval.push(y);
  const earlyModern = [];
  for (let y = 1500; y <= 1800; y += 50) earlyModern.push(y);
  const industrial = [];
  for (let y = 1800; y <= 1900; y += 20) industrial.push(y);
  const modern = [];
  for (let y = 1900; y <= 2026; y += 10) modern.push(y);
  buckets.push(...prehistoric, ...ancient, ...classical, ...medieval, ...earlyModern, ...industrial, ...modern);
  // 去重
  return [...new Set(buckets)].sort((a, b) => a - b);
}

export const TIME_BUCKETS = buildTimeBuckets();

// 统计口径1：存续政权数（dynasty 节点 year~yearEnd 持续计数）
// 统计口径2：节点事件密度（所有节点按 year 计数，person/event/myth/artifact/dynasty 都算）
export function getCivilizationRiseFallData(mode: 'dynasties' | 'density' = 'dynasties') {
  const civKeys = Object.keys(CIVILIZATIONS) as CivilizationKey[];
  const xAxis = TIME_BUCKETS;

  // 准备每个文明每个时间点的值
  const seriesData: Record<CivilizationKey, number[]> = {} as Record<CivilizationKey, number[]>;
  for (const k of civKeys) seriesData[k] = new Array(xAxis.length).fill(0);

  if (mode === 'dynasties') {
    // 王朝/帝国：存续区间内持续计数
    const dynasties = ALL_NODES.filter((n) => n.type === 'dynasty');
    for (const d of dynasties) {
      // yearEnd 从 description 或 summary 推断不现实；统一按 year 起 + 平均存续
      // 简化：dynasty 的 year 是建立年，yearEnd 用 relatedNodeIds/描述不现实
      // 我们用一个经验估算法：按 era 大致存续
      const startYear = d.year;
      const endYear = estimateDynastyEnd(d);
      const civ = d.civilization;
      for (let i = 0; i < xAxis.length; i++) {
        if (xAxis[i] >= startYear && xAxis[i] <= endYear) {
          seriesData[civ][i] += 1;
        }
      }
    }
  } else {
    // 节点事件密度：每个节点在其 year 处 +1，用核扩散让曲线更平滑（± 一个 bucket）
    for (const n of ALL_NODES) {
      const civ = n.civilization;
      // 找到最近的 bucket index
      let idx = 0;
      let minDist = Infinity;
      for (let i = 0; i < xAxis.length; i++) {
        const dist = Math.abs(xAxis[i] - n.year);
        if (dist < minDist) {
          minDist = dist;
          idx = i;
        }
      }
      // 核扩散：中心点权重 1，左右邻点 0.5
      seriesData[civ][idx] += 1;
      if (idx > 0) seriesData[civ][idx - 1] += 0.4;
      if (idx < xAxis.length - 1) seriesData[civ][idx + 1] += 0.4;
    }
  }

  return { xAxis, seriesData };
}

// 粗略估算王朝终结年（用于兴衰曲线可视化，非学术精确）
function estimateDynastyEnd(node: IHistoryNodeIndex): number {
  // 优先从 era 推断
  const era = ERAS.find((e) => e.id === node.eraId);
  const eraEnd = era ? era.endYear : node.year + 200;
  // 默认存续
  const defaultSpan = {
    prehistoric: 1000,
    ancient: 300,
    classical: 300,
    medieval: 250,
    earlyModern: 200,
    industrial: 100,
    modern: 70,
  }[node.eraId] ?? 200;
  return Math.min(node.year + defaultSpan, eraEnd);
}

// ========== 千年/世纪密度 ==========
export function getCenturyDensity(): Array<{ year: number; label: string; count: number }> {
  // 从 -3000 到 2000，古代每500年一格，近现代每100年
  const buckets: Array<{ year: number; label: string; count: number }> = [];
  // 公元前每500年
  for (let y = -3000; y < 0; y += 500) {
    buckets.push({ year: y, label: formatYear(y, { compact: false }), count: 0 });
  }
  // 公元后至1500每500年
  for (let y = 0; y < 1500; y += 500) {
    buckets.push({ year: y, label: formatYear(y), count: 0 });
  }
  // 1500后每100年
  for (let y = 1500; y <= 2000; y += 100) {
    buckets.push({ year: y, label: formatYear(y), count: 0 });
  }
  // 2000后到2026一格
  buckets.push({ year: 2000, label: '2000年后', count: 0 });

  for (const n of ALL_NODES) {
    // 找到 bucket
    let found = false;
    for (let i = 0; i < buckets.length - 1; i++) {
      if (n.year >= buckets[i].year && n.year < buckets[i + 1].year) {
        buckets[i].count++;
        found = true;
        break;
      }
    }
    if (!found && buckets.length > 0) {
      // 公元前3000以前归第一格，2000以后归最后一格
      if (n.year < buckets[0].year) buckets[0].count++;
      else buckets[buckets.length - 1].count++;
    }
  }
  return buckets;
}

// ========== 总览统计 hook ==========
export function useAtlasStats() {
  return useMemo(() => {
    const total = ALL_NODES.length;
    const byType = countByType(ALL_NODES);
    const byEra = countByEra(ALL_NODES);
    const byCiv = countByCivilization(ALL_NODES);
    const civCount = Object.values(byCiv).filter((v) => v > 0).length;
    const relationTotal = RELATION_STATS.totalPairs;
    const years = ALL_NODES.map((n) => n.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return {
      total,
      byType,
      byEra,
      byCiv,
      civCount,
      relationTotal,
      timeSpan: { min: minYear, max: maxYear },
    };
  }, []);
}

// 年份展示格式化（使用统一 formatYear）
export { formatYear };

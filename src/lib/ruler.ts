// EXPORTS: yearToRulerPercent, getNearbyNodes, RULER_LABELS, rulerPercentToYear
// 时间标尺工具：年份 → 百分比的非线性映射（与底部滑块一致）

import { ERAS } from '@/data/history-constants';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { formatYear } from '@/pages/HomePage/year-utils';

// 各时代在标尺上的权重（史前更紧凑，近现代更宽松）
const ERA_WEIGHTS: Record<string, number> = {
  prehistory: 5,
  ancient: 12,
  classical: 18,
  medieval: 20,
  renaissance: 15,
  industrial: 15,
  modern: 15,
};

const TOTAL_YEARS = 2026 - (-3000); // 从公元前3000年到2026年

// 非线性分段映射
export function yearToRulerPercent(year: number): number {
  // 找所在时代
  let totalWeight = 0;
  let cumulativeBefore = 0;
  let currentEraStart = -3000;
  let currentEraWeight = 10;

  for (const era of ERAS) {
    const w = ERA_WEIGHTS[era.id] ?? 10;
    totalWeight += w;
  }

  for (const era of ERAS) {
    const w = ERA_WEIGHTS[era.id] ?? 10;
    if (year < era.endYear) {
      currentEraStart = era.startYear;
      currentEraWeight = w;
      break;
    }
    cumulativeBefore += w;
    currentEraStart = era.endYear;
  }

  // 计算当前时代内的位置
  const nextEra = ERAS.find((e) => e.startYear > currentEraStart);
  const eraEnd = nextEra ? nextEra.startYear : 2026;
  const eraSpan = eraEnd - currentEraStart;
  const posInEra = Math.max(0, Math.min(1, (year - currentEraStart) / eraSpan));

  return ((cumulativeBefore + posInEra * currentEraWeight) / totalWeight) * 100;
}

// 非线性分段映射（百分比 → 年份，反查）
export function rulerPercentToYear(percent: number): number {
  let totalWeight = 0;
  for (const era of ERAS) {
    totalWeight += ERA_WEIGHTS[era.id] ?? 10;
  }

  const targetWeight = (percent / 100) * totalWeight;
  let cumulative = 0;

  for (const era of ERAS) {
    const w = ERA_WEIGHTS[era.id] ?? 10;
    if (cumulative + w >= targetWeight) {
      const segProgress = (targetWeight - cumulative) / w;
      const nextEra = ERAS.find((e) => e.startYear > era.startYear);
      const eraEnd = nextEra ? nextEra.startYear : 2026;
      return era.startYear + segProgress * (eraEnd - era.startYear);
    }
    cumulative += w;
  }
  return 2026;
}

// 获取指定节点的前后关联节点（各2个）
// 注意：nodes 由调用方传入，避免本文件静态 import 全量数据导致首屏体积膨胀
export function getNearbyNodes(
  nodeId: string,
  nodes: IHistoryNodeIndex[],
): { before: IHistoryNodeIndex[]; after: IHistoryNodeIndex[] } {
  const current = nodes.find((n) => n.id === nodeId);
  if (!current) return { before: [], after: [] };

  const sorted = [...nodes].sort((a, b) => a.year - b.year);
  const idx = sorted.findIndex((n) => n.id === nodeId);

  const before = sorted.slice(Math.max(0, idx - 2), idx);
  const after = sorted.slice(idx + 1, idx + 3);

  return { before, after };
}

// 标尺上的年代标签（与 formatYear 统一口径）
export const RULER_LABELS = [
  { year: -3000, label: '前3,000年' },
  { year: -2000, label: '前2,000年' },
  { year: -1000, label: '前1,000年' },
  { year: 0, label: '公元元年' },
  { year: 500, label: '公元500年' },
  { year: 1000, label: '公元1000年' },
  { year: 1500, label: '公元1500年' },
  { year: 1800, label: '公元1800年' },
  { year: 2000, label: '公元2000年' },
];

export { formatYear };

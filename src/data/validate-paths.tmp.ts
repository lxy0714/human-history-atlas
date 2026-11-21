import { LEARNING_PATHS } from './learning-paths';
import { ALL_HISTORY_NODES } from './history';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idToYear = new Map(ALL_HISTORY_NODES.map(n => [n.id, n.year]));

logger.info('=== 学习路径时序检查 ===\n');

for (const path of LEARNING_PATHS) {
  logger.info(`路径: ${path.id} - ${path.title}`);
  let prevEnd = -99999;
  for (let i = 0; i < path.chapters.length; i++) {
    const ch = path.chapters[i];
    const years = ch.nodeIds.map(nid => idToYear.get(nid) ?? 0);
    const minY = Math.min(...years);
    const maxY = Math.max(...years);
    const orderOk = years.every((y, idx) => idx === 0 || years[idx - 1] <= y);

    if (minY < prevEnd) {
      logger.info(`  ⚠ 第${i+1}章「${ch.title}」(${minY}~${maxY}) 早于上一章末(${prevEnd})`);
    }
    if (!orderOk) {
      // 找乱序对
      for (let j = 1; j < years.length; j++) {
        if (years[j] < years[j - 1]) {
          logger.info(`  ⚠ 第${i+1}章乱序: ${ch.nodeIds[j]}(${years[j]}) < ${ch.nodeIds[j-1]}(${years[j-1]})`);
        }
      }
    }
    prevEnd = maxY;
  }
  logger.info('');
}

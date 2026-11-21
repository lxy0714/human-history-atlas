import { ALL_HISTORY_NODES } from './history';
import { RELATIONS } from './relations';
import { logger } from '@lark-apaas/client-toolkit-lite';

const relSet = new Set(RELATIONS.map(r => `${r.from}|${r.to}|${r.type}`));
const asymmetric = RELATIONS.filter(r => !relSet.has(`${r.to}|${r.from}|${r.type}`));

logger.info('非对称关系总数:', String(asymmetric.length));
const byType: Record<string, number> = {};
asymmetric.forEach(r => {
  byType[r.type] = (byType[r.type] || 0) + 1;
});
logger.info('按类型分布:', JSON.stringify(byType));

// 只看 person 类型的
logger.info('\nPerson 类型非对称:');
asymmetric.filter(r=>r.type==='person').forEach(r => logger.info(`  ${r.from} -> ${r.to}: ${r.label}`));

logger.info('\nCausal 类型非对称（前20）:');
asymmetric.filter(r=>r.type==='causal').slice(0,20).forEach(r => logger.info(`  ${r.from} -> ${r.to}: ${r.label}`));

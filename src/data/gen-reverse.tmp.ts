import { ALL_HISTORY_NODES } from './history';
import { RELATIONS } from './relations';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idSet = new Set(ALL_HISTORY_NODES.map(n => n.id));
const relSet = new Set(RELATIONS.map(r => `${r.from}|${r.to}|${r.type}`));

const missingReverse: string[] = [];

RELATIONS.forEach(r => {
  const reverseKey = `${r.to}|${r.from}|${r.type}`;
  if (!relSet.has(reverseKey) && idSet.has(r.from) && idSet.has(r.to)) {
    // 生成反向关系代码
    const reverseLabel = reverseLabelOf(r.label);
    const reverseDesc = reverseDescOf(r.description, r.from, r.to);
    const code = `  { from: '${r.to}', to: '${r.from}', type: '${r.type}', label: '${reverseLabel}', description: '${reverseDesc}' },`;
    missingReverse.push(code);
  }
});

function reverseLabelOf(label: string): string {
  return label; // person 关系标签通常对称
}

function reverseDescOf(desc: string, from: string, to: string): string {
  // person 关系描述通常是对称的，直接返回原描述
  return desc;
}

logger.info(`// ===== Phase14 补 person 双向对称关系（${missingReverse.length}条）=====`);
missingReverse.forEach(c => logger.info(c));

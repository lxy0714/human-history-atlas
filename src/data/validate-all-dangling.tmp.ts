import { ALL_HISTORY_NODES } from './history';
import { RELATIONS } from './relations';
import { GLOSSARY_TERMS } from './glossary';
import { MONTH_DAY_EVENTS } from './month-day-events';
import { LEARNING_PATHS } from './learning-paths';
import { NODE_KEY_POINTS } from './key-points';
import { QUIZ_QUESTIONS } from './quiz';
import { HISTORY_ROUTES } from './routes';
import { RELATIONSHIP_GRAPHS } from './specials';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idSet = new Set(ALL_HISTORY_NODES.map(n => n.id));

function check(name: string, ids: string[]) {
  const dangling = ids.filter(id => !idSet.has(id));
  logger.info(`${name}: ${dangling.length} 个悬空`);
  if (dangling.length) dangling.forEach(d => logger.info(`  - ${d}`));
  return dangling.length;
}

let total = 0;

// RELATIONS
total += check('RELATIONS from', RELATIONS.map(r => r.from));
total += check('RELATIONS to', RELATIONS.map(r => r.to));

// relatedNodeIds
const allRelated = ALL_HISTORY_NODES.flatMap(n => n.relatedNodeIds || []);
total += check('relatedNodeIds', allRelated);

// 术语
total += check('术语词典', GLOSSARY_TERMS.flatMap(g => g.relatedNodeIds || []));

// 月日
total += check('月日事件', Object.keys(MONTH_DAY_EVENTS));

// 学习路径
total += check('学习路径', LEARNING_PATHS.flatMap(p => p.chapters.flatMap(c => c.nodeIds)));

// 记忆点
total += check('记忆点', Object.keys(NODE_KEY_POINTS));

// 题库
total += check('题库', QUIZ_QUESTIONS.flatMap(q => q.relatedNodeId ? [q.relatedNodeId] : []));

// 路线（points 里的 label 不对应节点，跳过；只查 id 本身）
total += check('历史路线id', HISTORY_ROUTES.map(r => r.id));

// 专题人物关系图
total += check('专题人物关系图节点', RELATIONSHIP_GRAPHS.flatMap(g => g.nodes.map(n => n.id)));

logger.info(`\n=== 全模块悬空总数: ${total} ===`);

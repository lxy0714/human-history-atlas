import { ALL_HISTORY_NODES } from './history';
import { GLOSSARY_TERMS } from './glossary';
import { MONTH_DAY_EVENTS } from './month-day-events';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idSet = new Set(ALL_HISTORY_NODES.map(n => n.id));

logger.info('=== 术语悬空 ===');
GLOSSARY_TERMS.forEach(g => {
  (g.relatedNodeIds || []).forEach(rid => {
    if (!idSet.has(rid)) logger.info(`  ${g.term}: ${rid}`);
  });
});

logger.info('\n=== 月日事件悬空 ===');
Object.keys(MONTH_DAY_EVENTS).forEach(id => {
  if (!idSet.has(id)) logger.info(`  ${id}`);
});

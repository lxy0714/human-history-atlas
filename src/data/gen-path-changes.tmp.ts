import { LEARNING_PATHS } from './learning-paths';
import { ALL_HISTORY_NODES } from './history';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idToYear = new Map(ALL_HISTORY_NODES.map(n => [n.id, n.year]));

function sortIds(ids: string[]): string[] {
  // 去重后排序，保持首次出现顺序的稳定排序
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const id of ids) {
    if (!seen.has(id)) { seen.add(id); unique.push(id); }
  }
  return unique.sort((a, b) => (idToYear.get(a) ?? 0) - (idToYear.get(b) ?? 0));
}

// 生成替换脚本：对每个章节，输出 old_string (原始nodeIds数组段) 和 new_string (排序后)
// 输出 JSON 格式供后续使用
const out: Array<{ pathId: string; chapterId: string; chapterTitle: string; before: string[]; after: string[] }> = [];
for (const p of LEARNING_PATHS) {
  for (const ch of p.chapters) {
    const before = ch.nodeIds;
    const after = sortIds(ch.nodeIds);
    const changed = before.length !== after.length || before.some((b, i) => b !== after[i]);
    if (changed) {
      out.push({ pathId: p.id, chapterId: ch.id, chapterTitle: ch.title, before, after });
    }
  }
}

logger.info(JSON.stringify(out, null, 2));

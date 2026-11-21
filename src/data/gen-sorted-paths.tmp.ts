import { LEARNING_PATHS } from './learning-paths';
import { ALL_HISTORY_NODES } from './history';
import { logger } from '@lark-apaas/client-toolkit-lite';

const idToYear = new Map(ALL_HISTORY_NODES.map(n => [n.id, n.year]));

// 对每个路径的每章，按 year 升序重排 nodeIds
const sortedPaths = LEARNING_PATHS.map(path => ({
  ...path,
  chapters: path.chapters.map(ch => {
    const sorted = [...ch.nodeIds].sort((a, b) => {
      const ya = idToYear.get(a) ?? 0;
      const yb = idToYear.get(b) ?? 0;
      return ya - yb;
    });
    // 计算 chapterYearStart / End
    const years = sorted.map(id => idToYear.get(id) ?? 0);
    return {
      ...ch,
      nodeIds: sorted,
      chapterYearStart: Math.min(...years),
      chapterYearEnd: Math.max(...years),
    };
  }),
}));

// 输出为 TS 代码
function toTs(obj: unknown): string {
  return JSON.stringify(obj, null, 2)
    .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:');
}

logger.info(`// 自动排序后的学习路径（每章节点按 year 升序）
// 共 ${sortedPaths.length} 条路径

export interface IPathChapter {
  title: string;
  nodeIds: string[];
  chapterYearStart: number;
  chapterYearEnd: number;
}

export interface ILearningPath {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  civilization: string;
  description: string;
  chapters: IPathChapter[];
}

export const LEARNING_PATHS: ILearningPath[] = ${toTs(sortedPaths)};

export const LEARNING_PATH_TOTAL = LEARNING_PATHS.length;
`);

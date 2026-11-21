// EXPORTS: useLearningProgress
// 学习进度系统：已读 / 已掌握 / 路径进度
// 持久化到 localStorage（使用 safeStorage），刷新保持

import { useState, useEffect, useCallback, useMemo } from 'react';
import { safeStorage } from './utils';
import { LEARNING_PATHS, type ILearningPath } from '@/data/learning-paths';

const READ_KEY = 'history-learning-read';
const MASTERED_KEY = 'history-learning-mastered';
const PATH_PROGRESS_KEY = 'history-learning-path-progress';

export interface PathProgress {
  currentChapterIndex: number; // 当前学到第几章（0-based）
  completedNodeIds: string[]; // 已完成的节点 id 列表
}

export function useLearningProgress() {
  // ========= 读取初始值 =========
  const [readIds, setReadIds] = useState<string[]>(() => {
    try {
      const raw = safeStorage.getItem(READ_KEY);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      /* ignore */
    }
    return [];
  });

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const raw = safeStorage.getItem(MASTERED_KEY);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      /* ignore */
    }
    return [];
  });

  const [pathProgress, setPathProgress] = useState<Record<string, PathProgress>>(() => {
    try {
      const raw = safeStorage.getItem(PATH_PROGRESS_KEY);
      if (raw) return JSON.parse(raw) as Record<string, PathProgress>;
    } catch {
      /* ignore */
    }
    return {};
  });

  // ========= 持久化 =========
  useEffect(() => {
    safeStorage.setItem(READ_KEY, JSON.stringify(readIds));
  }, [readIds]);

  useEffect(() => {
    safeStorage.setItem(MASTERED_KEY, JSON.stringify(masteredIds));
  }, [masteredIds]);

  useEffect(() => {
    safeStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(pathProgress));
  }, [pathProgress]);

  // ========= 操作 =========
  const markRead = useCallback((nodeId: string) => {
    setReadIds((prev) => (prev.includes(nodeId) ? prev : [...prev, nodeId]));
  }, []);

  const isRead = useCallback((nodeId: string) => readIds.includes(nodeId), [readIds]);
  const isMastered = useCallback((nodeId: string) => masteredIds.includes(nodeId), [masteredIds]);

  const toggleMastered = useCallback((nodeId: string) => {
    setMasteredIds((prev) =>
      prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId],
    );
  }, []);

  const getPathProgress = useCallback(
    (pathId: string): PathProgress => {
      return (
        pathProgress[pathId] ?? {
          currentChapterIndex: 0,
          completedNodeIds: [],
        }
      );
    },
    [pathProgress],
  );

  const markNodeCompletedInPath = useCallback(
    (pathId: string, nodeId: string) => {
      setPathProgress((prev) => {
        const cur = prev[pathId] ?? { currentChapterIndex: 0, completedNodeIds: [] };
        if (cur.completedNodeIds.includes(nodeId)) return prev;
        return {
          ...prev,
          [pathId]: {
            ...cur,
            completedNodeIds: [...cur.completedNodeIds, nodeId],
          },
        };
      });
      // 节点完成也算已掌握
      toggleMastered(nodeId);
    },
    [toggleMastered],
  );

  const setCurrentChapter = useCallback((pathId: string, chapterIndex: number) => {
    setPathProgress((prev) => {
      const cur = prev[pathId] ?? { currentChapterIndex: 0, completedNodeIds: [] };
      return {
        ...prev,
        [pathId]: { ...cur, currentChapterIndex: chapterIndex },
      };
    });
  }, []);

  // ========= 计算统计 =========
  const { totalNodes, totalPaths, overallPercent } = useMemo(() => {
    // 全库节点数（ALL_HISTORY_NODES 在 store 里）
    // 这里从路径里统计路径总节点数
    let pathNodeCount = 0;
    LEARNING_PATHS.forEach((p) => {
      p.chapters.forEach((ch) => {
        pathNodeCount += ch.nodeIds.length;
      });
    });
    const masteredInPaths = LEARNING_PATHS.reduce((acc, p) => {
      const prog = pathProgress[p.id];
      return acc + (prog?.completedNodeIds.length ?? 0);
    }, 0);
    const percent = pathNodeCount > 0 ? Math.round((masteredInPaths / pathNodeCount) * 100) : 0;
    const completedPaths = LEARNING_PATHS.filter((p) => {
      const prog = pathProgress[p.id];
      const allNodes = p.chapters.reduce((acc, ch) => acc + ch.nodeIds.length, 0);
      return (prog?.completedNodeIds.length ?? 0) >= allNodes;
    }).length;
    return {
      totalNodes: pathNodeCount,
      totalPaths: completedPaths,
      overallPercent: percent,
    };
  }, [pathProgress]);

  // 路径完成百分比
  const getPathPercent = useCallback(
    (path: ILearningPath): number => {
      const prog = pathProgress[path.id];
      const total = path.chapters.reduce((acc, ch) => acc + ch.nodeIds.length, 0);
      if (total === 0) return 0;
      const done = prog?.completedNodeIds.length ?? 0;
      return Math.round((done / total) * 100);
    },
    [pathProgress],
  );

  // 章节完成百分比
  const getChapterPercent = useCallback(
    (pathId: string, nodeIds: string[]): number => {
      const prog = pathProgress[pathId];
      if (!prog || nodeIds.length === 0) return 0;
      const done = nodeIds.filter((id) => prog.completedNodeIds.includes(id)).length;
      return Math.round((done / nodeIds.length) * 100);
    },
    [pathProgress],
  );

  // 重置所有进度
  const resetAllProgress = useCallback(() => {
    setReadIds([]);
    setMasteredIds([]);
    setPathProgress({});
  }, []);

  return {
    readIds,
    masteredIds,
    markRead,
    isRead,
    isMastered,
    toggleMastered,
    pathProgress,
    getPathProgress,
    markNodeCompletedInPath,
    setCurrentChapter,
    totalPaths,
    overallPercent,
    getPathPercent,
    getChapterPercent,
    resetAllProgress,
  };
}

export type UseLearningProgressReturn = ReturnType<typeof useLearningProgress>;

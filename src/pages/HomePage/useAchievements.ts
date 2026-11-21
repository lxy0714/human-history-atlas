// EXPORTS: useAchievements
// 成就系统 + 打卡系统 hook
// 与 useLearningProgress 打通，监听 read/master/path/quiz 等事件触发成就

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import { ACHIEVEMENTS, type Achievement, type AchievementUnlocked } from '@/data/achievements';
import { safeScopedStorage } from '@/lib/safeScopedStorage';

const ACHIEVEMENTS_KEY = 'history-achievements';
const CHECKIN_KEY = 'history-checkin-dates';
const SHORT_ANSWER_DONE_KEY = 'history-short-answer-done-count';
const QUIZ_DONE_KEY = 'history-quiz-done';
const QUIZ_PERFECT_KEY = 'history-quiz-perfect';
const HUB_VIEWED_KEY = 'history-hub-viewed';

function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function calcStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort().reverse();
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  // 最近必须是今天或昨天，否则 streak 已断
  if (sorted[0] !== today && sorted[0] !== yStr) return 0;

  let streak = 0;
  let cursor = new Date(sorted[0]);
  const set = new Set(dates);

  while (true) {
    const cs = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`;
    if (set.has(cs)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export interface UseAchievementsReturn {
  // 成就
  unlocked: Record<string, AchievementUnlocked>;
  unlockedCount: number;
  totalCount: number;
  achievements: Achievement[];
  isUnlocked: (id: string) => boolean;

  // 打卡
  checkinDates: string[];
  streakDays: number;
  totalDays: number;
  isTodayChecked: boolean;
  checkin: () => void; // 标记今日已学习

  // 动作触发（由外部调用）
  onNodeRead: (nodeId: string, totalNodes: number) => void;
  onNodeMastered: (masteredCount: number) => void;
  onPathComplete: (completedPaths: number) => void;
  onQuizComplete: (score: number, total: number) => void;
  onShortAnswerDone: () => void;
  onHubViewed: () => void;
  onFavoriteChange: (favoriteCount: number) => void;
}

export function useAchievements(): UseAchievementsReturn {
  // 成就解锁记录
  const [unlocked, setUnlocked] = useState<Record<string, AchievementUnlocked>>(() => {
    try {
      const raw = safeScopedStorage.getItem(ACHIEVEMENTS_KEY);
      if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return {};
  });

  // 打卡日期
  const [checkinDates, setCheckinDates] = useState<string[]>(() => {
    try {
      const raw = safeScopedStorage.getItem(CHECKIN_KEY);
      if (raw) return JSON.parse(raw) as string[];
    } catch { /* ignore */ }
    return [];
  });

  // 完成的选择题测验次数
  const [quizDone, setQuizDone] = useState<boolean>(() => {
    try {
      return safeScopedStorage.getItem(QUIZ_DONE_KEY) === '1';
    } catch { return false; }
  });

  // 满分次数
  const [quizPerfect, setQuizPerfect] = useState<boolean>(() => {
    try {
      return safeScopedStorage.getItem(QUIZ_PERFECT_KEY) === '1';
    } catch { return false; }
  });

  // 完成简答题数量
  const [shortAnswerDoneCount, setShortAnswerDoneCount] = useState<number>(() => {
    try {
      const raw = safeScopedStorage.getItem(SHORT_ANSWER_DONE_KEY);
      if (raw) return parseInt(raw, 10) || 0;
    } catch { /* ignore */ }
    return 0;
  });

  // 枢纽节点是否已查看
  const [hubViewed, setHubViewed] = useState<boolean>(() => {
    try {
      return safeScopedStorage.getItem(HUB_VIEWED_KEY) === '1';
    } catch { return false; }
  });

  // 持久化：统一在一个 effect 中批量写入，减少重复 I/O
  useEffect(() => {
    safeScopedStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(unlocked));
    safeScopedStorage.setItem(CHECKIN_KEY, JSON.stringify(checkinDates));
    safeScopedStorage.setItem(SHORT_ANSWER_DONE_KEY, String(shortAnswerDoneCount));
    safeScopedStorage.setItem(QUIZ_DONE_KEY, quizDone ? '1' : '0');
    safeScopedStorage.setItem(QUIZ_PERFECT_KEY, quizPerfect ? '1' : '0');
    safeScopedStorage.setItem(HUB_VIEWED_KEY, hubViewed ? '1' : '0');
  }, [unlocked, checkinDates, shortAnswerDoneCount, quizDone, quizPerfect, hubViewed]);

  // 打卡相关计算
  const streakDays = useMemo(() => calcStreak(checkinDates), [checkinDates]);
  const totalDays = useMemo(() => checkinDates.length, [checkinDates]);
  const isTodayChecked = useMemo(() => checkinDates.includes(todayStr()), [checkinDates]);

  // 解锁成就
  const unlockAchievement = useCallback((id: string) => {
    setUnlocked((prev) => {
      if (prev[id]) return prev;
      const ach = ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        toast.success(` 解锁成就：${ach.title}`, {
          description: ach.description,
          duration: 3000,
        });
      }
      return { ...prev, [id]: { unlockedAt: new Date().toISOString() } };
    });
  }, []);

  // 打卡
  const checkin = useCallback(() => {
    const today = todayStr();
    setCheckinDates((prev) => {
      if (prev.includes(today)) return prev;
      return [...prev, today];
    });
  }, []);

  // 节点已读 → 检查成就
  const readCheckTimerRef = useRef<number | null>(null);
  const onNodeRead = useCallback((nodeId: string, totalNodes: number) => {
    checkin();
    // 初心
    unlockAchievement('ach-first-read');
    // 学海无涯：已读 300
    // 用 setTimeout 延后检查（确保 readIds 已更新到 storage）
    if (readCheckTimerRef.current) {
      clearTimeout(readCheckTimerRef.current);
    }
    readCheckTimerRef.current = window.setTimeout(() => {
      readCheckTimerRef.current = null;
      // 从 storage 读取最新值
      try {
        const raw = safeScopedStorage.getItem('history-learning-read');
        const readIds = raw ? (JSON.parse(raw) as string[]) : [];
        const count = readIds.length;
        if (count >= 300) unlockAchievement('ach-read-300');
        if (count >= totalNodes && totalNodes > 0) unlockAchievement('ach-read-all');
      } catch { /* ignore */ }
    }, 0);
  }, [checkin, unlockAchievement]);

  // 清理所有定时器
  useEffect(() => {
    return () => {
      if (readCheckTimerRef.current) {
        clearTimeout(readCheckTimerRef.current);
        readCheckTimerRef.current = null;
      }
    };
  }, []);

  // 节点掌握 → 检查成就
  const onNodeMastered = useCallback((masteredCount: number) => {
    checkin();
    if (masteredCount >= 10) unlockAchievement('ach-mastered-10');
    if (masteredCount >= 100) unlockAchievement('ach-mastered-100');
  }, [checkin, unlockAchievement]);

  // 学习路径完成
  const onPathComplete = useCallback((completedPaths: number) => {
    checkin();
    if (completedPaths >= 1) unlockAchievement('ach-path-first');
    if (completedPaths >= 5) unlockAchievement('ach-path-5');
  }, [checkin, unlockAchievement]);

  // 测验完成
  const onQuizComplete = useCallback((score: number, total: number) => {
    checkin();
    if (!quizDone) {
      setQuizDone(true);
      unlockAchievement('ach-quiz-first');
    }
    if (total > 0 && score === total && !quizPerfect) {
      setQuizPerfect(true);
      unlockAchievement('ach-quiz-perfect');
    }
  }, [checkin, unlockAchievement, quizDone, quizPerfect]);

  // 简答题完成
  const onShortAnswerDone = useCallback(() => {
    checkin();
    setShortAnswerDoneCount((prev) => {
      const next = prev + 1;
      if (next >= 10) unlockAchievement('ach-short-answer-10');
      return next;
    });
  }, [checkin, unlockAchievement]);

  // 查看枢纽节点
  const onHubViewed = useCallback(() => {
    if (!hubViewed) {
      setHubViewed(true);
      unlockAchievement('ach-hub-view');
    }
  }, [hubViewed, unlockAchievement]);

  // 收藏变化
  const onFavoriteChange = useCallback((favoriteCount: number) => {
    if (favoriteCount >= 10) unlockAchievement('ach-favorite-10');
  }, [unlockAchievement]);

  const isUnlocked = useCallback((id: string) => !!unlocked[id], [unlocked]);

  return {
    unlocked,
    unlockedCount: Object.keys(unlocked).length,
    totalCount: ACHIEVEMENTS.length,
    achievements: ACHIEVEMENTS,
    isUnlocked,
    checkinDates,
    streakDays,
    totalDays,
    isTodayChecked,
    checkin,
    onNodeRead,
    onNodeMastered,
    onPathComplete,
    onQuizComplete,
    onShortAnswerDone,
    onHubViewed,
    onFavoriteChange,
  };
}

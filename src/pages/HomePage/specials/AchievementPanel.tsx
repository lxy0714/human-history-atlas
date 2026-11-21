// EXPORTS: AchievementPanel
// 学习成就面板：徽章卡片 + 打卡统计 + 错题统计

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  CalendarDays,
  BookOpen,
  Award,
  Target,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ACHIEVEMENTS, type Achievement } from '@/data/achievements';
import { QUIZ_QUESTIONS } from '@/data/quiz';
import { SHORT_ANSWER_QUESTIONS } from '@/data/quiz-short-answer';
import { safeScopedStorage } from '@/lib/safeScopedStorage';
import type { UseAchievementsReturn } from '../useAchievements';
import { useI18n } from '@/i18n';

interface AchievementPanelProps {
  achievements: UseAchievementsReturn;
  totalNodes: number;
  readCount: number;
  masteredCount: number;
  completedPaths: number;
  favoriteCount: number;
  onPracticeWrong?: (category: string, type: 'choice' | 'short-answer' | 'all') => void;
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  reading: { label: '阅读探索', color: 'text-primary' },
  path: { label: '学习路径', color: 'text-info' },
  quiz: { label: '测验挑战', color: 'text-warning' },
  streak: { label: '打卡坚持', color: 'text-destructive' },
  explore: { label: '探索发现', color: 'text-success' },
  collection: { label: '收藏收藏', color: 'text-[#9c6b3a]' },
};

export default function AchievementPanel({
  achievements,
  totalNodes,
  readCount,
  masteredCount,
  completedPaths,
  favoriteCount,
  onPracticeWrong,
}: AchievementPanelProps) {
  const { nt } = useI18n();
  const { unlocked, unlockedCount, totalCount, isUnlocked, streakDays, totalDays, isTodayChecked } = achievements;

  // 错题统计版本号：storage 事件/页面可见性变化时自增，驱动 useMemo 重新计算
  const [wrongRefreshVersion, setWrongRefreshVersion] = useState(0);
  const bumpWrongVersion = useCallback(() => setWrongRefreshVersion((v) => v + 1), []);

  // 监听 storage 变化（跨标签页同步）和页面可见性变化（从答题页返回时刷新）
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === 'history-quiz-wrong-questions' ||
        e.key === 'history-short-answer-wrong-questions'
      ) {
        bumpWrongVersion();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        bumpWrongVersion();
      }
    };
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [bumpWrongVersion]);

  // 从 localStorage 读取错题并按分类统计
  const { wrongCount, wrongByCategory, wrongByType } = useMemo(() => {
    const choiceRaw = safeScopedStorage.getItem('history-quiz-wrong-questions');
    const shortRaw = safeScopedStorage.getItem('history-short-answer-wrong-questions');
    const choiceWrongIds: string[] = choiceRaw ? JSON.parse(choiceRaw) : [];
    const shortWrongIds: string[] = shortRaw ? JSON.parse(shortRaw) : [];
    const byCat: Record<string, number> = {};
    const byType: Record<string, number> = { choice: choiceWrongIds.length, short: shortWrongIds.length };
    for (const id of choiceWrongIds) {
      const q = QUIZ_QUESTIONS.find(qq => qq.id === id);
      if (q) byCat[q.category] = (byCat[q.category] ?? 0) + 1;
    }
    for (const id of shortWrongIds) {
      const q = SHORT_ANSWER_QUESTIONS.find(qq => qq.id === id);
      if (q) byCat[q.category] = (byCat[q.category] ?? 0) + 1;
    }
    return { wrongCount: choiceWrongIds.length + shortWrongIds.length, wrongByCategory: byCat, wrongByType: byType };
  }, [wrongRefreshVersion]);

  // 按分类分组成就
  const grouped = useMemo(() => {
    const map: Record<string, Achievement[]> = {};
    ACHIEVEMENTS.forEach((a) => {
      if (!map[a.category]) map[a.category] = [];
      map[a.category].push(a);
    });
    return map;
  }, []);

  const wrongBarMax = Math.max(...Object.values(wrongByCategory), 1);

  return (
    <div className="space-y-6">
      {/* 顶部统计卡 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-card/40 p-5">
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="size-5 text-warning" />
            <h2 className="text-lg font-bold font-display">学习成就</h2>
            <Badge variant="outline" className="ml-auto text-xs">
              已解锁 {unlockedCount}/{totalCount}
            </Badge>
          </div>

          <div className="mb-4">
            <Progress
              value={Math.round((unlockedCount / totalCount) * 100)}
              className="h-2"
            />
            <div className="mt-1 text-right text-[11px] text-muted-foreground">
              {Math.round((unlockedCount / totalCount) * 100)}% 完成度
            </div>
          </div>

          {/* 打卡与天数 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-border/40 bg-card/60 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-destructive">
                <Flame className="size-4" />
                <span className="text-xl font-black tabular-nums">{streakDays}</span>
              </div>
              <div className="text-[11px] text-muted-foreground">连续打卡</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/60 p-3 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-info">
                <CalendarDays className="size-4" />
                <span className="text-xl font-black tabular-nums">{totalDays}</span>
              </div>
              <div className="text-[11px] text-muted-foreground">累计天数</div>
            </div>
            <div className="rounded-lg border border-border/40 bg-card/60 p-3 text-center">
              <div className="mb-1 text-xl">
                {isTodayChecked ? '✅' : '⚪'}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {isTodayChecked ? '今日已学' : '今日未学'}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* 学习进度总览 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            <h3 className="text-sm font-semibold font-serif">学习进度</h3>
          </div>
          <div className="space-y-3">
            <StatRow
              label="已读节点"
              value={`${readCount} / ${totalNodes}`}
              percent={Math.round((readCount / totalNodes) * 100)}
            />
            <StatRow
              label="已掌握节点"
              value={`${masteredCount} 个`}
              percent={Math.min(100, Math.round((masteredCount / 100) * 100))}
            />
            <StatRow
              label="完成路径"
              value={`${completedPaths} 条`}
              percent={Math.min(100, Math.round((completedPaths / 5) * 100))}
            />
            <StatRow
              label="收藏节点"
              value={`${favoriteCount} 个`}
              percent={Math.min(100, Math.round((favoriteCount / 10) * 100))}
            />
          </div>
        </Card>
      </motion.div>

      {/* 错题统计 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-destructive" />
              <h3 className="text-sm font-semibold font-serif">错题统计</h3>
            </div>
            <Badge variant="outline" className="text-xs text-destructive">
              共 {wrongCount} 道
            </Badge>
          </div>
          {wrongCount === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              暂无错题，继续保持！
            </div>
          ) : (
            <div className="space-y-2">
              {Object.entries(wrongByCategory)
                .filter(([, v]) => v > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => {
                  const catLabel = WRONG_CATEGORY_LABELS[cat] ?? cat;
                  return (
                    <div key={cat} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground/80">{catLabel}</span>
                        <span className="tabular-nums font-medium">{count} 道</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / wrongBarMax) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.15 }}
                          className="h-full rounded-full bg-destructive/70"
                        />
                      </div>
                      {onPracticeWrong && (
                        <button
                          onClick={() => onPracticeWrong(cat, 'all')}
                          className="text-[11px] text-primary hover:underline"
                        >
                          练这类错题 →
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </Card>
      </motion.div>

      {/* 成就徽章墙 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Award className="size-4 text-warning" />
            <h3 className="text-sm font-semibold font-serif">成就徽章</h3>
          </div>

          <div className="space-y-5">
            {Object.entries(grouped).map(([cat, list]) => (
              <div key={cat}>
                <div className="mb-2 text-xs font-semibold text-muted-foreground">
                  {CATEGORY_LABELS[cat]?.label ?? cat}
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {list.map((a, i) => {
  
                    const unlocked_ = isUnlocked(a.id);
                    const data = unlocked[a.id];
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                        className={`relative flex flex-col items-center rounded-xl border p-3 text-center transition-all ${
                          unlocked_
                            ? 'border-warning/40 bg-warning/5 shadow-sm'
                            : 'border-border/40 bg-card/40 opacity-60'
                        }`}
                      >
                        <div
                          className={`mb-2 text-3xl ${unlocked_ ? '' : 'grayscale opacity-50'}`}
                        >
                          {a.icon}
                        </div>
                        <div
                          className={`text-xs font-semibold ${unlocked_ ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {nt(a)}
                        </div>
                        <div className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
                          {a.description}
                        </div>
                        {unlocked_ && data && (
                          <div className="mt-1.5 text-[10px] text-warning/80">
                            {formatDate(data.unlockedAt)}
                          </div>
                        )}
                        {!unlocked_ && (
                          <div className="mt-1.5 text-[10px] text-muted-foreground">
                            未解锁
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function StatRow({ label, value, percent }: { label: string; value: string; percent: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground/80">{label}</span>
        <span className="tabular-nums font-medium">{value}</span>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}.${m}.${day}`;
  } catch {
    return '';
  }
}

const WRONG_CATEGORY_LABELS: Record<string, string> = {
  china: '中国历史',
  world: '世界历史',
  myth: '神话文化',
  military: '军事战争',
  tech: '科技文明',
  term: '历史术语',
  causal: '因果链条',
  'short-answer': '简答题',
  'short-answer-china': '简答·中国',
  'short-answer-world': '简答·世界',
  'short-answer-tech': '简答·科技',
};

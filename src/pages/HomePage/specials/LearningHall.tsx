// EXPORTS: LearningHall
// 史学堂：学习路径 + 术语词典 + 学习进度总览
// 放在专题馆内，作为一个大专题入口

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  BookText,
  GraduationCap,
  ArrowLeft,
  RotateCcw,
  Search,
  Layers,
  Lightbulb,
  CheckCircle2,
  PlayCircle,
  Trophy,
} from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';
import { useDebouncedValue } from '@/utils/use-performance';
import type { HistoryState } from '../useHistoryStore';
import type { UseLearningProgressReturn } from '../useLearningProgress';
import type { UseAchievementsReturn } from '../useAchievements';
import { LEARNING_PATHS } from '@/data/learning-paths';
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, type GlossaryCategory } from '@/data/glossary';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import PathDetail from './PathDetail';
import GlossaryView from './GlossaryView';
import AchievementPanel from './AchievementPanel';

type HallView = 'home' | 'paths' | 'path-detail' | 'glossary' | 'achievements';

interface LearningHallProps {
  store: HistoryState;
  progress: UseLearningProgressReturn;
  achievements?: UseAchievementsReturn;
  onBack: () => void;
}

export default function LearningHall({ store, progress, achievements, onBack }: LearningHallProps) {
  const [view, setView] = useState<HallView>('home');
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [glossaryCategory, setGlossaryCategory] = useState<GlossaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 200);

  const totalNodes = ALL_HISTORY_NODES_INDEX.length; // 全库节点总数
  const totalPathNodes = useMemo(
    () =>
      LEARNING_PATHS.reduce(
        (a, p) => a + p.chapters.reduce((b, c) => b + c.nodeIds.length, 0),
        0,
      ),
    [],
  );
  const readCount = progress.readIds.length;
  const masteredCount = progress.masteredIds.length;
  const readPercent = totalNodes > 0 ? Math.round((readCount / totalNodes) * 100) : 0;
  const completedPaths = progress.totalPaths;

  const handleReset = () => {
    progress.resetAllProgress();
    toast.success('学习进度已重置');
  };

  const activePath = useMemo(
    () => LEARNING_PATHS.find((p) => p.id === activePathId) ?? null,
    [activePathId],
  );

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 px-3 py-4 md:px-5 md:py-6"
          >
            {/* 顶部标题 */}
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:text-sm"
              >
                <ArrowLeft className="size-4" />
                返回
              </button>
            </div>
            <div className="text-center">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs tracking-[0.2em] text-primary font-display">
                史 学 堂
              </div>
              <h1 className="text-2xl font-bold tracking-wide md:text-3xl font-display">
                结构化学习历史
              </h1>
              <p className="mt-2 text-xs text-muted-foreground md:text-sm">
                {LEARNING_PATHS.length} 条学习路径 · {GLOSSARY_TERMS.length} 条历史术语 · {totalPathNodes} 个节点记忆要点
              </p>
            </div>

            {/* 学习总览卡 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl border border-border/40 bg-card/60 p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-5 text-primary" />
                  <h2 className="text-base font-bold font-display">学习总览</h2>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <RotateCcw className="size-3.5" />
                      重置进度
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确定重置所有学习进度？</AlertDialogTitle>
                      <AlertDialogDescription>
                        已读节点、已掌握节点、各路径进度将全部清除，此操作不可撤销。
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <AlertDialogAction onClick={handleReset}>
                        确认重置
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      已读节点
                      <span className="ml-1 font-semibold text-foreground">
                        {readCount} / {totalNodes}
                      </span>
                    </span>
                    <span className="tabular-nums text-primary">{readPercent}%</span>
                  </div>
                  <Progress value={readPercent} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      已掌握节点
                      <span className="ml-1 font-semibold text-foreground">
                        {masteredCount}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(10, masteredCount) }).map((_, i) => (
                      <CheckCircle2 key={i} className="size-4 text-primary" />
                    ))}
                    {masteredCount === 0 && (
                      <span className="text-xs text-muted-foreground">还没有已掌握的节点</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-muted-foreground">
                    已完成路径
                    <span className="ml-1 font-semibold text-foreground">
                      {completedPaths} / {LEARNING_PATHS.length}
                    </span>
                  </span>
                  <span className="tabular-nums text-primary">
                    路径总进度 {progress.overallPercent}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 两个大入口卡片 + 学习成就 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.button
                  type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView('paths')}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="absolute -right-6 -top-6 size-16 rounded-full bg-primary/20 blur-xl transition-opacity group-hover:opacity-40" />
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <Layers className="size-6" />
                </div>
                <h3 className="mb-1 text-base font-bold font-display">学习路径</h3>
                <p className="text-xs text-muted-foreground">
                  10 条主题学习路线，按章节系统学习历史
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>{LEARNING_PATHS.length} 条路径</span>
                  <span>·</span>
                  <span>
                    {LEARNING_PATHS.reduce((a, p) => a + p.chapters.length, 0)} 章
                  </span>
                  <span>·</span>
                  <span>
                    {LEARNING_PATHS.reduce(
                      (a, p) => a + p.chapters.reduce((b, c) => b + c.nodeIds.length, 0),
                      0,
                    )}{' '}
                    节点
                  </span>
                </div>
              </motion.button>

              <motion.button
                  type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setView('glossary')}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-5 text-left transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="absolute -right-6 -top-6 size-16 rounded-full bg-accent/20 blur-xl transition-opacity group-hover:opacity-40" />
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-accent/30 text-accent-foreground">
                  <BookText className="size-6" />
                </div>
                <h3 className="mb-1 text-base font-bold font-display">术语词典</h3>
                <p className="text-xs text-muted-foreground">
                  {GLOSSARY_TERMS.length} 条历史术语，覆盖制度经济思想社会军事地理
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {GLOSSARY_CATEGORIES.slice(0, 4).map((c) => (
                    <span
                      key={c.key}
                      className="rounded-full px-2 py-0.5 text-[10px] text-muted-foreground"
                      style={{ backgroundColor: `${c.color}18`, color: c.color }}
                    >
                      {c.label}
                    </span>
                  ))}
                  <span className="text-[10px] text-muted-foreground">
                    +{GLOSSARY_CATEGORIES.length - 4} 类
                  </span>
                </div>
              </motion.button>

              {achievements && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setView('achievements')}
                  className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-5 text-left transition-all hover:border-warning/40 hover:shadow-md"
                >
                  <div className="absolute -right-6 -top-6 size-16 rounded-full bg-warning/20 blur-xl transition-opacity group-hover:opacity-40" />
                  <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-warning/15 text-warning">
                    <Trophy className="size-6" />
                  </div>
                  <h3 className="mb-1 text-base font-bold font-display">学习成就</h3>
                  <p className="text-xs text-muted-foreground">
                    {achievements.unlockedCount}/{achievements.totalCount} 个徽章，打卡与里程碑
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span> 连续 {achievements.streakDays} 天</span>
                    <span>·</span>
                    <span> 累计 {achievements.totalDays} 天</span>
                  </div>
                </motion.button>
              )}
            </div>

            {/* 小贴士 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex gap-3 rounded-xl border border-border/30 bg-muted/30 p-4"
            >
              <Lightbulb className="mt-0.5 shrink-0 size-4 text-warning" />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">怎么用好史学堂？</p>
                <p>1. 选一条感兴趣的学习路径，按章节顺序阅读节点</p>
                <p>2. 读完后可标记「已掌握」，系统自动追踪进度</p>
                <p>3. 遇到不懂的术语，去词典查定义和相关节点</p>
                <p>4. 所有进度都存在你的浏览器里，换设备不互通</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {view === 'paths' && (
          <motion.div
            key="paths"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 px-3 py-4 md:px-5 md:py-6"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('home')}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground md:text-sm"
              >
                <ArrowLeft className="size-4" />
                返回史学堂
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">学习路径</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                选择一条路线，开始系统学习
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {LEARNING_PATHS.map((path, i) => {
                const percent = progress.getPathPercent(path);
                const totalNodes = path.chapters.reduce(
                  (a, ch) => a + ch.nodeIds.length,
                  0,
                );
                const Icon = path.icon;
                return (
                  <motion.button
                  type="button"
                    key={path.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActivePathId(path.id);
                      setView('path-detail');
                    }}
                    className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/60 p-4 text-left transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <div
                      className="absolute -right-6 -top-6 size-16 rounded-full opacity-20 blur-xl transition-opacity group-hover:opacity-40"
                      style={{ backgroundColor: path.color }}
                    />
                    <div className="flex items-start gap-3">
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg text-xl"
                        style={{
                          backgroundColor: `${path.color}18`,
                          color: path.color,
                        }}
                      >
                        {path.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold font-display">{path.title}</h3>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {path.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">
                          {path.chapters.length} 章 · {totalNodes} 节点 · {path.estimatedHours}h
                        </span>
                        <span className="tabular-nums font-medium text-primary">
                          {percent}%
                        </span>
                      </div>
                      <Progress value={percent} className="h-1.5" />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">
                        {percent === 0 ? '未开始' : percent === 100 ? '已完成 ' : '学习中'}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-[11px]"
                        style={{ color: path.color }}
                      >
                        开始学习
                        <PlayCircle className="size-3.5" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {view === 'path-detail' && activePath && (
          <PathDetail
            path={activePath}
            store={store}
            progress={progress}
            onBack={() => setView('paths')}
          />
        )}

        {view === 'glossary' && (
          <GlossaryView
            store={store}
            category={glossaryCategory}
            setCategory={setGlossaryCategory}
            searchQuery={debouncedSearch}
            setSearchQuery={setSearchQuery}
            onBack={() => setView('home')}
          />
        )}

        {view === 'achievements' && achievements && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 px-3 py-4 md:px-5 md:py-6"
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('home')}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:text-sm"
              >
                <ArrowLeft className="size-4" />
                返回史学堂
              </button>
            </div>
            <AchievementPanel
              achievements={achievements}
              totalNodes={totalNodes}
              readCount={readCount}
              masteredCount={masteredCount}
              completedPaths={completedPaths}
              favoriteCount={store.favoriteIds.length}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

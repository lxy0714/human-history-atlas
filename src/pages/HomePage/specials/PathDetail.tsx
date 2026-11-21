// EXPORTS: PathDetail
// 单条学习路径详情页：章节纵向排列 + 节点卡

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BookOpen, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { HistoryState } from '../useHistoryStore';
import type { UseLearningProgressReturn } from '../useLearningProgress';
import { LEARNING_PATHS, type ILearningPath } from '@/data/learning-paths';
import { NODE_KEY_POINTS } from '@/data/key-points';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import { useAchievements } from '../useAchievements';
import { useI18n } from '@/i18n';

interface PathDetailProps {
  path: ILearningPath;
  store: HistoryState;
  progress: UseLearningProgressReturn;
  onBack: () => void;
}

function getNodeById(id: string) {
  return ALL_HISTORY_NODES_INDEX.find((n) => n.id === id);
}

function getTypeShape(type?: string): string {
  switch (type) {
    case 'person':
      return '●';
    case 'dynasty':
      return '◆';
    case 'myth':
      return '✦';
    case 'artifact':
      return '■';
    default:
      return '◆';
  }
}

export default function PathDetail({ path, store, progress, onBack }: PathDetailProps) {
  const { nt } = useI18n();
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const achievements = useAchievements();
  const pathPercent = progress.getPathPercent(path);
  const totalNodes = useMemo(
    () => path.chapters.reduce((a, ch) => a + ch.nodeIds.length, 0),
    [path],
  );
  const pathProg = progress.getPathProgress(path.id);

  const handleNodeClick = (nodeId: string) => {
    const node = getNodeById(nodeId);
    if (node) {
      store.openDetail(node);
      progress.markRead(nodeId);
      const pathProg = progress.getPathProgress(path.id);
      const wasCompleted = pathProg.completedNodeIds.includes(nodeId);
      const prevCount = pathProg.completedNodeIds.length;
      progress.markNodeCompletedInPath(path.id, nodeId);
      // 检查路径是否刚刚完成
      if (!wasCompleted && prevCount + 1 >= totalNodes) {
        // 计算已完成的路径数（当前这条刚完成）
        let completed = 0;
        for (const p of LEARNING_PATHS) {
          const pp = progress.getPathProgress(p.id);
          const total = p.chapters.reduce((a, ch) => a + ch.nodeIds.length, 0);
          if (pp.completedNodeIds.length >= total) completed++;
        }
        achievements.onPathComplete(completed);
      }
    }
  };

  const currentChapter = path.chapters[currentChapterIdx];
  const chapterPercent = currentChapter
    ? progress.getChapterPercent(path.id, currentChapter.nodeIds)
    : 0;

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-5 md:py-6">
      {/* 顶部返回 */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground md:text-sm"
        >
          <ArrowLeft className="size-4" />
          返回路径列表
        </button>
      </div>

      {/* 路径信息卡 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 rounded-xl border border-border/40 bg-card/60 p-5 shadow-sm"
        style={{ borderTopColor: path.color, borderTopWidth: 3 }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-lg text-2xl"
            style={{ backgroundColor: `${path.color}18` }}
          >
            {path.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold font-display md:text-xl">{nt(path)}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground md:text-sm">
              {path.subtitle}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
          {path.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline" style={{ borderColor: path.color, color: path.color }}>
            {path.chapters.length} 章
          </Badge>
          <Badge variant="outline">{totalNodes} 节点</Badge>
          <Badge variant="outline">预计 {path.estimatedHours}h</Badge>
          <Badge variant="secondary">{path.difficulty}</Badge>
        </div>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">路径总进度</span>
            <span className="tabular-nums font-medium text-primary">{pathPercent}%</span>
          </div>
          <Progress value={pathPercent} className="h-2" />
        </div>
      </motion.div>

      {/* 章节 Tab（左右按钮切换） */}
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentChapterIdx((i) => Math.max(0, i - 1))}
          disabled={currentChapterIdx === 0}
          className="text-xs"
        >
          ← 上一章
        </Button>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">
            第 {currentChapterIdx + 1} / {path.chapters.length} 章
          </div>
          <div className="text-sm font-semibold font-display">
            {nt(currentChapter)}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setCurrentChapterIdx((i) => Math.min(path.chapters.length - 1, i + 1))
          }
          disabled={currentChapterIdx === path.chapters.length - 1}
          className="text-xs"
        >
          下一章 →
        </Button>
      </div>

      {/* 当前章节进度条 */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
          <span>本章进度</span>
          <span className="tabular-nums text-primary">{chapterPercent}%</span>
        </div>
        <Progress value={chapterPercent} className="h-1.5" />
      </div>

      {/* 章节简介 */}
      {currentChapter?.subtitle && (
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          {currentChapter.subtitle}
        </p>
      )}

      {/* 节点序列 */}
      <div className="relative space-y-3 pl-6">
        {/* 左侧主线 */}
        <div
          className="absolute left-[11px] top-1 bottom-1 w-px"
          style={{ backgroundColor: path.color, opacity: 0.3 }}
        />

        {currentChapter?.nodeIds.map((nodeId, idx) => {
  
          const node = getNodeById(nodeId);
          if (!node) return null;
          const isMastered = progress.isMastered(nodeId);
          const isRead = progress.isRead(nodeId);
          const keyPoints = NODE_KEY_POINTS[nodeId];
          const status = isMastered ? 'mastered' : isRead ? 'reading' : 'new';
          const StatusIcon = isMastered ? CheckCircle2 : isRead ? PlayCircle : Circle;

          return (
            <motion.div
              key={nodeId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="relative"
            >
              {/* 时间轴节点 */}
              <div
                className="absolute -left-[22px] top-3 z-10 rounded-full bg-background"
                style={{ color: isMastered ? path.color : 'var(--muted-foreground)' }}
              >
                <StatusIcon
                  className={`size-5 ${isMastered ? '' : isRead ? 'fill-primary/20' : ''}`}
                />
              </div>

              <button
                onClick={() => handleNodeClick(nodeId)}
                className={`w-full rounded-lg border p-3 text-left transition-all hover:border-primary/40 hover:bg-card/80 hover:shadow-sm ${
                  isMastered
                    ? 'border-primary/30 bg-primary/5'
                    : isRead
                      ? 'border-border/60 bg-card/40'
                      : 'border-border/30 bg-card/20'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className="mt-0.5 shrink-0 text-xs"
                    style={{ color: path.color }}
                  >
                    {getTypeShape(node.type)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="truncate text-sm font-semibold">{nt(node)}</h4>
                      {isMastered && (
                        <Badge variant="default" className="shrink-0 text-[10px] h-4 px-1">
                          已掌握
                        </Badge>
                      )}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {node.yearDisplay}
                    </div>
                    {keyPoints && keyPoints[0] && (
                      <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground/90">
                        {keyPoints[0]}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="mt-1 shrink-0 size-4 text-muted-foreground/50" />
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* 章节底部导航 */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentChapterIdx((i) => Math.max(0, i - 1))}
          disabled={currentChapterIdx === 0}
          className="text-xs"
        >
          ← 上一章
        </Button>
        <div className="text-[11px] text-muted-foreground">
          {pathProg.completedNodeIds.length} / {totalNodes} 节点已掌握
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentChapterIdx((i) => Math.min(path.chapters.length - 1, i + 1))
          }
          disabled={currentChapterIdx === path.chapters.length - 1}
          className="text-xs"
        >
          下一章 →
        </Button>
      </div>

      {/* 全部章节索引 */}
      <div className="mt-8">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold font-display">
          <BookOpen className="size-4 text-primary" />
          全部章节
        </h3>
        <div className="space-y-2">
          {path.chapters.map((ch, idx) => {
  
            const percent = progress.getChapterPercent(path.id, ch.nodeIds);
            return (
              <button
                key={ch.id}
                onClick={() => setCurrentChapterIdx(idx)}
                className={`flex w-full items-center gap-3 rounded-lg border p-2.5 text-left text-xs transition-colors ${
                  idx === currentChapterIdx
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40'
                }`}
              >
                <div
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    backgroundColor: `${path.color}20`,
                    color: path.color,
                  }}
                >
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{nt(ch)}</div>
                </div>
                <div className="text-right">
                  <div className="tabular-nums text-[11px] text-muted-foreground">
                    {percent}%
                  </div>
                  <div className="text-[10px] text-muted-foreground/70">
                    {ch.nodeIds.length} 节点
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

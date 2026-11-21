// EXPORTS: TodayInHistory
// 历史上的今天：按当前日期展示历史事件

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { HistoryState } from '../useHistoryStore';
import type { IHistoryNodeIndex } from '@/data/history-index';
import {
  MONTH_DAY_EVENTS,
  getEventsOfDate,
  getEventsOfWeek,
  getEventsOfMonth,
  MONTH_DAY_TOTAL,
} from '@/data/month-day-events';
import { ALL_HISTORY_NODES_INDEX, ERAS } from '@/data/history-index';
import { useI18n } from '@/i18n';

interface TodayInHistoryProps {
  store: HistoryState;
  onBack: () => void;
}

function getNodeById(id: string) {
  return ALL_HISTORY_NODES_INDEX.find((n) => n.id === id);
}

function formatDate(month: number, day: number): string {
  return `${month}月${day}日`;
}

const INTRO_WORDS = [
  '历史的今天，也曾改变世界。',
  '每一个今天，都是曾经的明天。',
  '回看历史长河中的这一天。',
  '时间的坐标上，有人曾点燃星火。',
  '同一天，不同年，同样波澜壮阔。',
];

export default function TodayInHistory({ store, onBack }: TodayInHistoryProps) {
  const { nt, ns } = useI18n();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());
  const [isToday, setIsToday] = useState(true);

  const intro = useMemo(() => {
    const idx = (month + day) % INTRO_WORDS.length;
    return INTRO_WORDS[idx];
  }, [month, day]);

  const todayIds = useMemo(() => getEventsOfDate(month, day), [month, day]);
  const weekIds = useMemo(() => getEventsOfWeek(month, day), [month, day]);
  const monthIds = useMemo(() => getEventsOfMonth(month), [month, day]);

  // 决定展示范围：当天 > 本周 > 本月
  const { displayNodes, mode } = useMemo(() => {
    if (todayIds.length > 0) {
      const nodes = todayIds
        .map(getNodeById)
        .filter((n) => n != null)
        .sort((a, b) => a.year - b.year);
      return { displayNodes: nodes, mode: 'day' as const };
    }
    if (weekIds.length > 0) {
      const nodes = weekIds
        .map(getNodeById)
        .filter((n) => n != null)
        .sort((a, b) => a.year - b.year);
      return { displayNodes: nodes, mode: 'week' as const };
    }
    const nodes = monthIds
      .map(getNodeById)
      .filter((n) => n != null)
      .sort((a, b) => a.year - b.year);
    return { displayNodes: nodes, mode: 'month' as const };
  }, [todayIds, weekIds, monthIds]);

  const goToday = () => {
  
    const t = new Date();
    setMonth(t.getMonth() + 1);
    setDay(t.getDate());
    setIsToday(true);
  };

  const changeDay = (delta: number) => {
    const d = new Date(2000, month - 1, day + delta);
    setMonth(d.getMonth() + 1);
    setDay(d.getDate());
    setIsToday(false);
  };

  const handleNodeClick = (node: IHistoryNodeIndex) => {
    store.openDetail(node);
  };

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-5 md:py-6">
      {/* 返回 */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground md:text-sm"
        >
          <ArrowLeft className="size-4" />
          返回专题馆
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 标题 */}
        <div className="mb-5 text-center">
          <div className="mb-1 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            历史上的今天
          </div>
          <h2 className="text-2xl font-bold font-display md:text-3xl">
            {formatDate(month, day)}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">{intro}</p>
        </div>

        {/* 日期选择器 */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeDay(-1)}
            className="size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="secondary" size="sm" onClick={goToday} disabled={isToday}>
            今天
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeDay(1)}
            className="size-8"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* 范围说明 */}
        {mode !== 'day' && (
          <div className="mb-4 rounded-lg border border-warning/30 bg-warning/10 p-3 text-xs text-foreground">
            <span className="font-semibold text-warning">提示：</span>
            {mode === 'week'
              ? `今天暂无收录的历史事件，以下为近期（±3天）的 ${displayNodes.length} 件大事。`
              : `今天与本周暂无收录事件，以下为${month}月的 ${displayNodes.length} 件大事。`}
          </div>
        )}

        {/* 统计 */}
        <div className="mb-3 text-[11px] text-muted-foreground">
          共 {displayNodes.length} 件历史事件 · 全库收录 {MONTH_DAY_TOTAL} 条精确日期
        </div>

        {/* 事件时间轴 */}
        <div className="relative space-y-3 pl-5">
          {/* 轴线 */}
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-primary/30" />

          {displayNodes.map((node, i) => {
  
            const md = MONTH_DAY_EVENTS[node.id];
            const era = ERAS.find((e) => e.id === node.eraId);
            return (
              <motion.button
                  type="button"
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => handleNodeClick(node)}
                className="relative block w-full rounded-lg border border-border/30 bg-card/40 p-3 text-left transition-all hover:border-primary/40 hover:bg-card/80 hover:shadow-sm"
              >
                {/* 时间轴圆点 */}
                <div className="absolute -left-[18px] top-4 size-3 rounded-full border-2 border-background bg-primary" />

                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className="shrink-0 text-[10px]"
                    style={{ borderColor: era?.accent, color: era?.accent }}
                  >
                    {node.yearDisplay}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold">{nt(node)}</h4>
                    {md && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {month}月{md.day}日
                      </p>
                    )}
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground/90">
                      {ns(node)}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {displayNodes.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            <Clock className="mx-auto mb-2 size-8 opacity-50" />
            暂无收录的历史事件
          </div>
        )}
      </motion.div>
    </div>
  );
}

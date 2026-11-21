// EXPORTS: OnThisDay
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { ON_THIS_DAY_EVENTS } from '@/data/specials';
import { HISTORY_NODES_INDEX } from '@/data/history-index';
import type { HistoryState } from '../useHistoryStore';
import { Badge } from '@/components/ui/badge';
import { formatYear } from '../utils';
import { useI18n } from '@/i18n';

interface OnThisDayProps {
  store: HistoryState;
}

export default function OnThisDay({ store }: OnThisDayProps) {
  const { nt, ns, ny } = useI18n();
  const today = useMemo(() => new Date(), []);
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // 匹配今日事件
  const todayEvents = useMemo(() => {
    return ON_THIS_DAY_EVENTS.filter(
      (e) => e.month === month && e.day === day,
    ).sort((a, b) => a.year - b.year);
  }, [month, day]);

  // 从历史节点中找相同月日（这里简化：如果数据有 year 字段但无月日，就随机推荐几个）
  const randomNodes = useMemo(() => {
    const shuffled = [...HISTORY_NODES_INDEX].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [todayEvents.length]); // 今日有事件时也不重算

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    store.scrollToNode(id);
  };

  // 格式化今日日期
  const monthNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {/* 顶部日期展示 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-card/50 to-card/20 p-6 text-center"
      >
        <div className="absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <Calendar className="mx-auto mb-2 size-8 text-primary" />
           <div className="mb-1 text-xs tracking-[0.3em] text-muted-foreground font-display">
             历 史 上 的 今 天
           </div>
           <h2 className="mb-1 text-3xl font-black font-display md:text-4xl">
            {monthNames[month - 1]}月 {day} 日
          </h2>
          <p className="text-xs text-muted-foreground">
            {today.getFullYear()} 年 · 星期{'日一二三四五六'.charAt(today.getDay())}
          </p>
        </div>
      </motion.div>

      {/* 事件列表 */}
      {todayEvents.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-semibold font-serif">
              历史上的今天 · 共 {todayEvents.length} 件大事
            </span>
          </div>

          <div className="space-y-2">
            {todayEvents.map((event, i) => (
              <motion.div
                key={`${event.year}-${nt(event)}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 transition-all hover:border-border hover:bg-card/80"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{
                    backgroundColor:
                      event.category === '政治'
                        ? '#d4a843'
                        : event.category === '军事'
                          ? '#c0392b'
                          : event.category === '科学'
                            ? '#3498db'
                            : event.category === '文化'
                              ? '#9b59b6'
                              : event.category === '经济'
                                ? '#27ae60'
                                : '#95a5a6',
                  }}
                />
                <div className="flex items-start gap-3 pl-2">
                  <div className="shrink-0 text-right min-w-[80px]">
                    <div className="text-lg font-black font-serif text-primary leading-tight">
                      {formatYear(event.year)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-bold font-serif">{nt(event)}</h4>
                      <Badge variant="outline" className="h-5 shrink-0 px-1.5 text-[10px]">
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // 空状态
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-border/40 bg-card/40 p-8 text-center"
        >
          <div className="mx-auto mb-3 text-4xl"></div>
          <h3 className="mb-2 text-base font-bold font-serif">
            今天在历史上是平静的一天
          </h3>
          <p className="text-xs text-muted-foreground">
            没有找到今天发生的重大历史事件，但每一天都值得被记住
          </p>
        </motion.div>
      )}

      {/* 推荐节点 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-semibold font-serif">不妨看看这些</span>
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {randomNodes.map((node, i) => (
            <motion.button
                  type="button"
              key={node.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              onClick={() => handleNodeClick(node.id)}
              className="group rounded-lg border border-border/40 bg-card/40 p-3 text-left transition-all hover:border-border hover:bg-card/80"
            >
              <div className="mb-1 text-[10px] text-primary">{ny(node.yearDisplay)}</div>
              <h4 className="mb-1 text-xs font-semibold font-serif line-clamp-2">
                {nt(node)}
              </h4>
              <p className="text-[10px] text-muted-foreground line-clamp-2">
                {ns(node)}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

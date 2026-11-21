// EXPORTS: Rankings
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RANKINGS } from '@/data/specials';

export default function Rankings() {
  const [activeId, setActiveId] = useState(RANKINGS[0].id);
  const ranking = RANKINGS.find((r) => r.id === activeId) ?? RANKINGS[0];

  const maxValue = useMemo(
    () => Math.max(...ranking.items.map((i) => i.value)),
    [ranking],
  );

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <Trophy className="size-5 text-warning" />
        <span className="text-sm font-semibold font-serif">历史数据排行榜</span>
      </div>

      {/* 分类 tab */}
      <Tabs defaultValue={activeId} onValueChange={setActiveId}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {RANKINGS.map((r) => (
            <TabsTrigger
              key={r.id}
              value={r.id}
              className="text-[10px] md:text-xs"
            >
              {r.name.length > 4 ? r.name.slice(0, 4) : r.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <p className="text-center text-xs text-muted-foreground">{ranking.description}</p>

      {/* 条形图 */}
      <div className="space-y-2">
        {ranking.items.map((item, i) => {
          const percent = (item.value / maxValue) * 100;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card/40 p-3 transition-all hover:border-border hover:bg-card/70"
            >
              {/* 排名数字 */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-7 shrink-0 items-center justify-center rounded-md text-xs font-black ${
                    i < 3
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  {item.rank}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold font-serif">
                      {item.name}
                    </span>
                    <span
                      className="shrink-0 text-xs font-bold tabular-nums"
                      style={{ color: item.color }}
                    >
                      {item.value.toLocaleString()} {item.unit}
                    </span>
                  </div>

                  {/* 进度条 */}
                  <div className="h-2 overflow-hidden rounded-full bg-muted/40">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: 'easeOut',
                      }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: `0 0 6px ${item.color}60`,
                      }}
                    />
                  </div>

                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    {item.civilization}
                  </div>
                </div>
              </div>

              {/* 金银铜装饰角 */}
              {i < 3 && (
                <div
                  className="absolute right-0 top-0 size-0 border-l-[24px] border-b-[24px] border-l-transparent opacity-60"
                  style={{
                    borderBottomColor:
                      i === 0
                        ? '#ffd700'
                        : i === 1
                          ? '#c0c0c0'
                          : '#cd7f32',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 数据说明 */}
      <div className="rounded-lg border border-border/30 bg-card/30 p-3 text-[10px] leading-relaxed text-muted-foreground">
        <div className="mb-1 flex items-center gap-1 text-foreground/70">
          <TrendingUp className="size-3" />
          <span className="font-semibold">数据说明</span>
        </div>
        历史疆域和人口数据因史料与研究方法不同而存在差异，本排行榜数据为学界较通行估计值，仅供参考。
      </div>
    </div>
  );
}

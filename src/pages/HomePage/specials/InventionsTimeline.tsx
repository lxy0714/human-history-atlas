// EXPORTS: default
// 科技发明专题：横向时间线展示关键技术突破

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { INVENTION_NODES, INVENTION_CATEGORIES } from '@/data/specials/inventions';

import type { HistoryState } from '../useHistoryStore';
import { useI18n } from '@/i18n';

interface InventionsTimelineProps {
  store: HistoryState;
}

export default function InventionsTimeline({ store }: InventionsTimelineProps) {
  const { nt, ny } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!selectedCategory) return INVENTION_NODES;
    return INVENTION_NODES.filter((n) => n.category === selectedCategory);
  }, [selectedCategory]);

  const selected = selectedId
    ? INVENTION_NODES.find((n) => n.id === selectedId) ?? null
    : null;

  const catInfo = (cat: string) =>
    INVENTION_CATEGORIES[cat as keyof typeof INVENTION_CATEGORIES] ?? {
      name: cat,
      icon: '',
      color: '#888',
    };

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        {/* 标题 */}
        <div className="mb-6 text-center md:mb-10">
           <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs tracking-[0.3em] text-primary font-display">
             <Lightbulb className="size-3.5" />
             科 技 发 明
           </div>
           <h1 className="text-2xl font-black tracking-wide font-display md:text-4xl">
            科技发明简史
          </h1>
          <p className="mt-2 text-xs text-muted-foreground md:text-sm">
            改变人类历史进程的20项关键技术突破
          </p>
        </div>

        {/* 分类筛选 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-3 py-1 text-xs transition-all ${
              selectedCategory === null
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-border/40 bg-card/40 text-muted-foreground hover:text-foreground'
            }`}
          >
            全部
          </button>
          {Object.entries(INVENTION_CATEGORIES).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all ${
                selectedCategory === key
                  ? 'text-primary'
                  : 'border-border/40 bg-card/40 text-muted-foreground hover:text-foreground'
              }`}
              style={
                selectedCategory === key
                  ? {
                      borderColor: `${info.color}80`,
                      backgroundColor: `${info.color}20`,
                    }
                  : undefined
              }
            >
              <span>{info.icon}</span>
              {info.name}
            </button>
          ))}
        </div>

        {/* 横向时间线 */}
        <div className="relative mb-8 overflow-x-auto pb-4">
          <div className="relative flex min-w-max items-center gap-10 px-4 py-6">
            {/* 时间轴基线 */}
            <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />

            {filtered.map((node, i) => {
  
              const info = catInfo(node.category);
              const isSelected = selectedId === node.id;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  onClick={() => setSelectedId(isSelected ? null : node.id)}
                  className="relative z-10 flex w-[180px] shrink-0 cursor-pointer flex-col items-center"
                >
                  {/* 上方节点：偶数在上，奇数在下 */}
                  {i % 2 === 0 && (
                    <div
                      className={`mb-4 w-full rounded-lg border p-3 text-center transition-all ${
                        isSelected
                          ? 'scale-105 shadow-lg'
                          : 'bg-card/50 hover:bg-card hover:shadow-sm'
                      }`}
                      style={
                        isSelected
                          ? {
                              borderColor: `${info.color}80`,
                              backgroundColor: `${info.color}15`,
                            }
                          : undefined
                      }
                    >
                      <div className="mb-1 text-2xl">{info.icon}</div>
                      <p className="text-xs font-semibold font-serif">{nt(node)}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {ny(node.yearDisplay)}
                      </p>
                    </div>
                  )}

                  {/* 圆点 */}
                  <div
                    className="relative flex size-8 items-center justify-center rounded-full border-2 transition-all"
                    style={{
                      borderColor: info.color,
                      backgroundColor: isSelected ? info.color : 'var(--background)',
                      boxShadow: isSelected
                        ? `0 0 12px ${info.color}80`
                        : `0 0 4px ${info.color}40`,
                    }}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: isSelected ? '#fff' : info.color }}
                    />
                  </div>

                  {/* 下方节点 */}
                  {i % 2 === 1 && (
                    <div
                      className={`mt-4 w-full rounded-lg border p-3 text-center transition-all ${
                        isSelected
                          ? 'scale-105 shadow-lg'
                          : 'bg-card/50 hover:bg-card hover:shadow-sm'
                      }`}
                      style={
                        isSelected
                          ? {
                              borderColor: `${info.color}80`,
                              backgroundColor: `${info.color}15`,
                            }
                          : undefined
                      }
                    >
                      <div className="mb-1 text-2xl">{info.icon}</div>
                      <p className="text-xs font-semibold font-serif">{nt(node)}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {ny(node.yearDisplay)}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 详情卡片 */}
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-2xl"
          >
            <div
              className="rounded-xl border p-6"
              style={{
                borderColor: `${catInfo(selected.category).color}40`,
                backgroundColor: `${catInfo(selected.category).color}08`,
              }}
            >
              <div className="mb-3 flex items-start gap-4">
                <div
                  className="flex size-14 shrink-0 items-center justify-center rounded-lg text-3xl"
                  style={{ backgroundColor: `${catInfo(selected.category).color}20` }}
                >
                  {catInfo(selected.category).icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold font-serif">{nt(selected)}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{ny(selected.yearDisplay)}</span>
                    <span>·</span>
                    <span>{selected.inventor}</span>
                    <span>·</span>
                    <span>{selected.civilization}</span>
                  </div>
                </div>
              </div>

              <div
                className="mb-4 rounded-lg border-l-4 py-2 pl-3 text-sm italic"
                style={{
                  borderColor: catInfo(selected.category).color,
                  color: catInfo(selected.category).color,
                  backgroundColor: `${catInfo(selected.category).color}08`,
                }}
              >
                <Sparkles className="mr-1.5 inline size-3.5" />
                {selected.impact}
              </div>

              <p className="text-sm leading-[1.8] text-foreground/85">
                {selected.description}
              </p>

              {store.scrollToNode && (
                <button
                  onClick={() => {
                    // 查找对应的历史节点
                    const nodeIdMap: Record<string, string> = {
                      'inv-paper': 'paper-cailun',
                      'inv-printing': 'printing-press',
                      'inv-gunpowder': 'gunpowder',
                      'inv-compass': 'compass',
                      'inv-steam': 'watt-steam',
                      'inv-airplane': 'wright-brothers',
                      'inv-penicillin': 'penicillin',
                      'inv-computer': 'eniac',
                      'inv-internet': 'internet',
                      'inv-smartphone': 'smartphone',
                      'inv-ai': 'chatgpt',
                    };
                    const targetId = nodeIdMap[selected.id];
                    if (targetId) store.scrollToNode(targetId);
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  在时间轴中查看
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {!selected && (
          <div className="text-center text-xs text-muted-foreground">
            点击上方节点查看详细介绍
          </div>
        )}
      </div>
    </div>
  );
}

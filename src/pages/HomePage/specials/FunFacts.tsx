// EXPORTS: FunFacts
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FUN_FACTS } from '@/data/specials';

// Fisher-Yates 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const CATEGORIES = ['全部', '人物', '政治', '军事', '文化', '科技', '生活', '经济', '地理'];

export default function FunFacts() {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [seed, setSeed] = useState(0);
  const [activeCategory, setActiveCategory] = useState('全部');

  const shuffled = useMemo(() => {
    const filtered =
      activeCategory === '全部'
        ? FUN_FACTS
        : FUN_FACTS.filter((f) => f.category === activeCategory);
    return shuffle(filtered);
  }, [seed, activeCategory]);

  const toggleFlip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reshuffle = () => {
    setSeed((s) => s + 1);
    setFlipped(new Set());
  };

  return (
    <div className="space-y-4">
      {/* 顶部操作 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-warning" />
          <span className="text-sm font-semibold font-serif">
            冷知识卡片墙
          </span>
          <span className="text-[10px] text-muted-foreground">
            共 {FUN_FACTS.length} 条
          </span>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={reshuffle}
          className="h-7 gap-1 text-xs"
        >
          <RefreshCw className="size-3" />
          打乱重排
        </Button>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-[11px] transition-all ${
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 卡片网格 */}
      {shuffled.length === 0 ? (
        <div className="rounded-xl border border-border/40 bg-card/40 p-10 text-center">
          <p className="text-sm text-muted-foreground">该分类暂无冷知识</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shuffled.map((fact, i) => {
            const isFlipped = flipped.has(fact.id);
            return (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.02, 1) }}
                className="relative h-[180px] cursor-pointer perspective-1000"
                onClick={() => toggleFlip(fact.id)}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* 正面 */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border/40 bg-gradient-to-br from-card to-card/50 p-4 text-center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="mb-2 text-3xl"></div>
                    <h4 className="text-sm font-bold leading-snug font-serif">
                      {fact.question}
                    </h4>
                    <div className="mt-auto flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="rounded-full bg-muted/50 px-2 py-0.5">
                        {fact.category}
                      </span>
                      <span>点击翻牌</span>
                    </div>
                  </div>

                  {/* 背面 */}
                  <div
                    className="absolute inset-0 flex flex-col rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-4"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="text-xs font-bold text-primary">答</span>
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>
                    <p className="flex-1 overflow-y-auto text-xs leading-relaxed text-foreground/90">
                      {fact.answer}
                    </p>
                    <div className="mt-2 text-right text-[10px] text-muted-foreground">
                      {fact.civilization} · {fact.category}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

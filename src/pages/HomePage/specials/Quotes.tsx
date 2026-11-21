// EXPORTS: Quotes
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Quote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QUOTES } from '@/data/specials';
import { useDebouncedValue } from '@/utils/use-performance';

const TABS = [
  { value: 'all', label: '全部' },
  { value: 'chinese', label: '中国名言' },
  { value: 'western', label: '西方名言' },
  { value: 'idiom', label: '成语典故' },
];

export default function Quotes() {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 200);

  const filtered = useMemo(() => {
    let list = QUOTES;
    if (tab !== 'all') {
      list = list.filter((q) => q.category === tab);
    }
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.text.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          (item.source ?? '').toLowerCase().includes(q),
      );
    }
    return list;
  }, [tab, debouncedQuery]);

  return (
    <div className="space-y-4">
      {/* 搜索 */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索名言、作者或出处..."
          className="bg-card/50 pl-9"
        />
      </div>

      {/* 分类 tab */}
      <Tabs defaultValue="all" onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {TABS.map((t) => (
            <TabsTrigger key={t.value} value={t.value} className="text-xs md:text-sm">
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 名言卡片列表 */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border/40 bg-card/40 p-8 text-center">
            <p className="text-sm text-muted-foreground">未找到匹配的名言</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="relative overflow-hidden rounded-xl border border-border/40 bg-card/50 p-4 md:p-5"
            >
              {/* 装饰引号 */}
              <Quote
                className="absolute right-3 top-3 size-8 text-primary/10"
                strokeWidth={1.5}
              />

              {/* 名言内容 */}
              <p className="mb-3 text-base font-semibold leading-relaxed font-serif md:text-lg">
                「{item.text}」
              </p>

              {/* 作者 & 出处 */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/30 pt-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/80">—— {item.author}</span>
                {item.source && <span>{item.source}</span>}
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                    item.category === 'chinese'
                      ? 'bg-red-500/15 text-red-400'
                      : item.category === 'western'
                        ? 'bg-info/15 text-info'
                        : 'bg-warning/15 text-warning'
                  }`}
                >
                  {item.category === 'chinese'
                    ? '中国名言'
                    : item.category === 'western'
                      ? '西方名言'
                      : '成语典故'}
                </span>
              </div>

              {/* 背景解释 */}
              {item.background && (
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground/80">
                  {item.background}
                </p>
              )}
            </motion.blockquote>
          ))
        )}
      </div>
    </div>
  );
}

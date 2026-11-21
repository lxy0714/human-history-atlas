// EXPORTS: GlossaryView
// 术语词典视图：搜索 + 分类筛选 + 词条列表 + 弹层详情

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, X, ExternalLink, BookText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import type { HistoryState } from '../useHistoryStore';
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
  type IGlossaryTerm,
} from '@/data/glossary';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import { useI18n } from '@/i18n';

interface GlossaryViewProps {
  store: HistoryState;
  category: GlossaryCategory | 'all';
  setCategory: (c: GlossaryCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onBack: () => void;
}

export default function GlossaryView({
  store,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  onBack,
}: GlossaryViewProps) {
  const { t, nt } = useI18n();
  const [activeTerm, setActiveTerm] = useState<IGlossaryTerm | null>(null);

  const filtered = useMemo(() => {
  
    let list = GLOSSARY_TERMS;
    if (category !== 'all') {
      list = list.filter((t) => t.category === category);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.aliases?.some((a) => a.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [category, searchQuery]);

  // 按分类分组（全部时）
  const grouped = useMemo(() => {
    if (category !== 'all') return null;
    const map = new Map<GlossaryCategory, IGlossaryTerm[]>();
    filtered.forEach((t) => {
  
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    });
    return map;
  }, [filtered, category]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: GLOSSARY_TERMS.length };
    GLOSSARY_CATEGORIES.forEach((c) => {
  
      counts[c.key] = GLOSSARY_TERMS.filter((t) => t.category === c.key).length;
    });
    return counts;
  }, []);

  const handleNodeClick = (nodeId: string) => {
    const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === nodeId);
    if (node) {
      store.openDetail(node);
      setActiveTerm(null);
    }
  };

  // 按拼音排序简化：按 term 字符串排序
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => a.term.localeCompare(b.term, 'zh-CN'));
  }, [filtered]);

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-5 md:py-6">
      {/* 顶部 */}
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground md:text-sm"
        >
          <ArrowLeft className="size-4" />
          返回史学堂
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-2 flex items-center gap-2">
          <BookText className="size-5 text-primary" />
          <h2 className="text-xl font-bold font-display">历史术语词典</h2>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          {GLOSSARY_TERMS.length} 条术语 · 6 大分类 · 支持搜索与分类筛选
        </p>

        {/* 搜索框 */}
        <div className="mb-4">
          <InputGroup className="h-10">
            <InputGroupAddon align="inline-start">
              <Search className="size-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索术语、别称或内容..."
            />
            {searchQuery && (
              <InputGroupAddon align="inline-end" className="pr-2">
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </InputGroupAddon>
            )}
          </InputGroup>
        </div>

        {/* 分类 chips */}
        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setCategory('all')}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
              category === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            全部 ({categoryCounts.all})
          </button>
          {GLOSSARY_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs transition-colors ${
                category === c.key
                  ? 'text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
              style={
                category === c.key
                  ? { backgroundColor: c.color }
                  : undefined
              }
            >
              {c.label} ({categoryCounts[c.key]})
            </button>
          ))}
        </div>

        {/* 结果统计 */}
        <div className="mb-2 text-[11px] text-muted-foreground">
          共 {filtered.length} 条结果
        </div>
      </motion.div>

      {/* 词条列表 —— 全部模式按分类分组 */}
      {grouped ? (
        <div className="space-y-6">
          {GLOSSARY_CATEGORIES.map((cat) => {
            const items = grouped.get(cat.key);
            if (!items || items.length === 0) return null;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  className="mb-2 flex items-center gap-2 text-sm font-bold font-display"
                  style={{ color: cat.color }}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.label}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({items.length})
                  </span>
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {items
                    .sort((a, b) => a.term.localeCompare(b.term, 'zh-CN'))
                    .map((term) => (
                      <TermCard key={term.term} term={term} onClick={() => setActiveTerm(term)} />
                    ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {sorted.map((term, i) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.01 }}
            >
              <TermCard term={term} onClick={() => setActiveTerm(term)} />
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center text-sm text-muted-foreground">
          没有找到匹配的术语
        </div>
      )}

      {/* 词条详情弹层 */}
      <AnimatePresence>
        {activeTerm && (
          <Dialog open={!!activeTerm} onOpenChange={(o) => !o && setActiveTerm(null)}>
            <DialogContent className="max-w-md p-0">
              <DialogHeader className="p-5 pb-0">
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-display text-lg">{activeTerm.term}</span>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: GLOSSARY_CATEGORIES.find(
                        (c) => c.key === activeTerm.category,
                      )?.color,
                      color: GLOSSARY_CATEGORIES.find(
                        (c) => c.key === activeTerm.category,
                      )?.color,
                    }}
                  >
                    {activeTerm.category}
                  </Badge>
                </DialogTitle>
                {activeTerm.aliases && activeTerm.aliases.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    别称：{activeTerm.aliases.join('、')}
                  </p>
                )}
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
                <p className="text-sm leading-relaxed text-foreground">
                  {activeTerm.definition}
                </p>

                {activeTerm.relatedNodeIds.length > 0 && (
                  <div className="mt-4">
                    <div className="mb-2 text-xs font-semibold text-muted-foreground">
                      关联节点
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeTerm.relatedNodeIds.map((id) => {
  
                        const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === id);
                        if (!node) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => handleNodeClick(id)}
                            className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-secondary/50 px-2.5 py-1 text-xs transition-colors hover:border-primary/40 hover:bg-primary/10"
                          >
                            <span>{nt(node)}</span>
                            <ExternalLink className="size-3 text-muted-foreground" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end border-t border-border/40 p-3">
                <DialogClose asChild>
                  <button className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                    关闭
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function TermCard({ term, onClick }: { term: IGlossaryTerm; onClick: () => void }) {
  const catInfo = GLOSSARY_CATEGORIES.find((c) => c.key === term.category);
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-border/30 bg-card/40 p-3 text-left transition-all hover:border-primary/40 hover:bg-card/80 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold font-display">{term.term}</h4>
        <Badge
          variant="outline"
          className="shrink-0 text-[10px]"
          style={{ borderColor: catInfo?.color, color: catInfo?.color }}
        >
          {term.category}
        </Badge>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
        {term.definition}
      </p>
    </button>
  );
}

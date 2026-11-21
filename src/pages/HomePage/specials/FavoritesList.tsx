// EXPORTS: FavoritesList
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n';
import { Star, X, ArrowLeft, BookmarkX } from 'lucide-react';
import { HISTORY_NODES_INDEX, CIVILIZATIONS, ERAS, type IHistoryNodeIndex } from '@/data/history-index';
import type { HistoryState } from '../useHistoryStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FavoritesListProps {
  store: HistoryState;
  onBack: () => void;
}

export default function FavoritesList({ store, onBack }: FavoritesListProps) {
  const { ln, nt, ns, ny } = useI18n();
  const { favoriteIds, toggleFavorite, scrollToNode } = store;

  const favoriteNodes = HISTORY_NODES_INDEX.filter(
    (n): n is IHistoryNodeIndex => !!n && favoriteIds.includes(n.id),
  );

  return (
    <div className="mx-auto max-w-5xl px-2 py-4 md:px-4 md:py-6">
      {/* 返回栏 */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:text-sm"
        >
          <ArrowLeft className="size-4" />
          返回专题馆
        </button>
      </div>

      {/* 标题 */}
      <div className="mb-6 text-center md:mb-8">
         <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs tracking-[0.3em] text-primary font-display">
           我 的 收 藏
         </div>
         <h1 className="flex items-center justify-center gap-2 text-2xl font-black tracking-wide font-display md:text-3xl">
           <Star className="size-6 fill-primary text-primary" />
          我 的 收 藏
        </h1>
        <p className="mt-2 text-xs text-muted-foreground md:text-sm">
          已收藏 {favoriteIds.length} 个历史节点
        </p>
      </div>

      {/* 空状态 */}
      {favoriteNodes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/30 py-16 text-center"
        >
          <BookmarkX className="mb-4 size-12 text-muted-foreground/50" />
          <p className="mb-1 text-sm font-medium font-serif">暂无收藏</p>
          <p className="text-xs text-muted-foreground">
            在详情面板点击星标即可收藏感兴趣的历史节点
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {favoriteNodes.map((node, i) => {
  
              const civ = CIVILIZATIONS[node.civilization];
              const era = ERAS.find((e) => e.id === node.eraId);
              const civColor = civ?.color ?? '#888';
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/50 transition-all hover:border-border hover:bg-card"
                >
                  <button
                    onClick={() => {
                      onBack();
                      setTimeout(() => scrollToNode(node.id), 50);
                    }}
                    className="block w-full p-4 text-left"
                  >
                    {/* 顶部装饰条 */}
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: `linear-gradient(90deg, ${civColor}, ${civColor}00)`,
                      }}
                    />
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold font-serif">{nt(node)}</h3>
                    </div>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px]"
                        style={{
                          borderColor: `${civColor}40`,
                          color: civColor,
                        }}
                      >
                        {civ?.name ?? node.civilization}
                      </Badge>
                      {era && (
                        <Badge variant="outline" className="text-[10px]">
                          {ln(era)}
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 text-xs font-medium text-muted-foreground font-serif">
                      {ny(node.yearDisplay)}
                    </p>
                    <p className="line-clamp-2 text-xs leading-relaxed text-foreground/70">
                      {ns(node)}
                    </p>
                  </button>

                  {/* 取消收藏按钮 */}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleFavorite(node.id)}
                    className="!absolute right-2 top-2 z-20 h-7 w-7 rounded-full text-warning hover:bg-warning/10 hover:text-warning"
                    aria-label="取消收藏"
                  >
                    <X className="size-3.5" />
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

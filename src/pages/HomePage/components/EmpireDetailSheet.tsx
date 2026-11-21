// EXPORTS: EmpireDetailSheet
import { X, MapPin, Calendar, Crown, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CIVILIZATIONS } from '@/data/history-index';
import type { IEmpire } from '@/data/empires';
import { ALL_HISTORY_NODES_INDEX } from '@/data/history-index';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmpireDetailSheetProps {
  empire: IEmpire | null;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
}

import { formatYear } from '../utils';

export default function EmpireDetailSheet({
  empire,
  onClose,
  onNodeClick,
}: EmpireDetailSheetProps) {
  const isMobile = useIsMobile();

  const civColor =
    CIVILIZATIONS[empire?.civilization as keyof typeof CIVILIZATIONS]?.color ?? '#888';
  const civName =
    CIVILIZATIONS[empire?.civilization as keyof typeof CIVILIZATIONS]?.name ?? '';

  const relatedNodes = empire
    ? empire.relatedNodeIds
        .map((id) => ALL_HISTORY_NODES_INDEX.find((n) => n.id === id))
        .filter(Boolean)
    : [];

  const content = empire ? (
    <div className="p-4">
      {/* 头部 */}
      <div className="mb-3 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <Badge
            variant="outline"
            className="mb-2"
            style={{ borderColor: `${civColor}40`, color: civColor }}
          >
            <Crown className="mr-1 size-3" />
            {civName}文明
          </Badge>
          <h2 className="text-lg font-bold font-serif">{empire.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            <Calendar className="mr-1 inline size-3" />
            {formatYear(empire.startYear)} — {formatYear(empire.endYear)}
            <span className="mx-1 text-border">·</span>
            极盛于 {formatYear(empire.peakYear)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* 首都 */}
      <div className="mb-3 flex items-center gap-2 rounded-md bg-muted/40 px-3 py-2">
        <MapPin className="size-4 text-primary" />
        <div>
          <div className="text-xs text-muted-foreground">首都</div>
          <div className="text-sm font-medium">{empire.capital.name}</div>
        </div>
      </div>

      {/* 简介 */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">极盛简介</p>
        <p className="text-sm leading-relaxed">{empire.brief}</p>
      </div>

      {/* 关联节点 */}
      {relatedNodes.length > 0 && (
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Link className="size-3" />
            关联历史节点
          </p>
          <div className="space-y-1">
            {relatedNodes.map((node) => {
              if (!node) return null;
              const nodeColor =
                CIVILIZATIONS[node.civilization as keyof typeof CIVILIZATIONS]?.color ??
                '#888';
              return (
                <button
                  key={node.id}
                  onClick={() => onNodeClick(node.id)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/50"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: nodeColor }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium">{node.title}</div>
                    <div className="truncate text-[10px] text-muted-foreground">
                      {node.yearDisplay}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <p className="mt-4 text-[10px] text-muted-foreground/70">
        ※ 疆域为历史概略示意，不追求现代国界精度
      </p>
    </div>
  ) : null;

  if (isMobile) {
    return (
      <AnimatePresence>
        {empire && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-[1200] max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-border/40 bg-card/95 shadow-2xl"
          >
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {empire && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 20, opacity: 0 }}
          className="absolute right-3 top-3 z-[1000] w-72 overflow-y-auto rounded-lg border border-border/40 bg-card/90 shadow-xl"
          style={{ maxHeight: 'calc(100% - 24px)' }}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

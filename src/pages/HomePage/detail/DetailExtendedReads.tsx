// —— 详情面板：延伸阅读区 ——
// 横向滑动的推荐卡片，带推荐理由标签和文明色条。

import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CIVILIZATIONS } from '@/data/history-index';
import type { IHistoryNodeIndex } from '@/data/history-index';

export interface ExtendedReadItem {
  node: IHistoryNodeIndex;
  reason: string;
  reasonIcon: string;
}

interface DetailExtendedReadsProps {
  extendedReads: ExtendedReadItem[];
  civColor: string;
  onScrollToNode: (id: string) => void;
}

export default function DetailExtendedReads({
  extendedReads,
  civColor,
  onScrollToNode,
}: DetailExtendedReadsProps) {
  if (extendedReads.length === 0) return null;

  return (
    <>
      <Separator className="my-5" style={{ backgroundColor: `${civColor}20` }} />
      <div>
        <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-foreground/80 font-serif">
          <Sparkles className="size-3.5 text-primary" />
          延伸阅读
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:-mx-6 md:px-6">
          {extendedReads.map(({ node, reason, reasonIcon }) => {
            const nc = CIVILIZATIONS[node.civilization]?.color ?? '#888';
            return (
              <motion.button
                  type="button"
                key={node.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onScrollToNode(node.id)}
                className="group relative flex w-44 shrink-0 flex-col gap-1.5 rounded-lg border border-border/40 bg-card/50 p-3 text-left transition-all hover:border-border hover:bg-card"
              >
                {/* 推荐理由标签 */}
                <div className="mb-1 flex items-center gap-1">
                  <span className="text-[10px] text-primary">{reasonIcon}</span>
                  <span className="text-[10px] font-medium text-primary">
                    {reason}
                  </span>
                </div>
                {/* 文明色条 */}
                <div
                  className="absolute left-0 top-0 h-full w-0.5 rounded-l-lg"
                  style={{ backgroundColor: nc }}
                />
                <div className="flex items-center gap-1.5 pl-1">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: nc }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {node.yearDisplay}
                  </span>
                </div>
                <p className="line-clamp-2 pl-1 text-xs font-medium text-foreground font-serif">
                  {node.title}
                </p>
                <div className="mt-auto flex flex-wrap gap-1 pl-1">
                  <Badge className="h-4 px-1 text-[9px]" style={{
                    backgroundColor: `${nc}20`,
                    color: nc,
                  }}>
                    {CIVILIZATIONS[node.civilization]?.name ?? node.civilization}
                  </Badge>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// —— 历史放映机：事件流列表 ——
// 包含桌面端右侧竖向列表 与 移动端底部横向滑动列表。

import { Star } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CIVILIZATIONS } from '@/data/history-constants';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { useI18n } from '@/i18n';

interface ProjectorEventListProps {
  eventList: IHistoryNodeIndex[];
  isMobile: boolean;
  onOpenDetail: (node: IHistoryNodeIndex) => void;
  onPause: () => void;
}

export default function ProjectorEventList({
  eventList,
  isMobile,
  onOpenDetail,
  onPause,
}: ProjectorEventListProps) {
  const { nt } = useI18n();
  const handleClick = (node: IHistoryNodeIndex) => {
    onOpenDetail(node);
    onPause();
  };

  // 桌面端：右侧竖向列表
  if (!isMobile) {
    return (
      <div className="pointer-events-auto absolute right-4 top-32 z-10 w-72">
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2">
            <h3
              className="text-xs font-semibold text-foreground/80"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              历史事件流
            </h3>
          </div>
          <ScrollArea className="h-[45vh]">
            <div className="space-y-2 p-3">
              {eventList.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">等待历史发生…</p>
              )}
              {eventList.map((node) => {
  
                const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                return (
                  <div
                    key={node.id}
                    className="cursor-pointer rounded-lg border border-border bg-card p-2 text-xs transition-colors hover:border-primary/60 hover:bg-accent/30"
                    onClick={() => handleClick(node)}
                  >
                      <div className="flex items-center gap-2">
                        <span
                          className="shrink-0 text-[10px] font-medium tabular-nums"
                          style={{ color: civColor }}
                        >
                          {node.yearDisplay}
                        </span>
                        {node.important && <Star className="size-3 fill-current text-amber-500" />}
                      </div>
                      <div
                        className="mt-0.5 font-medium text-foreground/90"
                        style={{ fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {nt(node)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  }

  // 移动端：底部横向滑动列表
  if (eventList.length === 0) return null;
  return (
    <div className="mx-3 mb-2 max-h-24 overflow-x-auto">
      <div className="flex gap-2">
        {eventList.slice(0, 5).map((node) => {
  
          const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
          return (
            <div
              key={node.id}
              className="shrink-0 w-40 cursor-pointer rounded-lg border border-border bg-card p-2 text-xs"
              onClick={() => handleClick(node)}
            >
              <div
                className="text-[10px] tabular-nums"
                style={{ color: civColor }}
              >
                {node.yearDisplay}
              </div>
              <div
                className="mt-0.5 truncate font-medium"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {nt(node)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

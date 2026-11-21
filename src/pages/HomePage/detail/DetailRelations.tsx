// —— 详情面板：关联网络区 ——
// 按六类关系分组展示相关节点，点击跳转。

import { Network, GitBranch, Users, Clock, Globe, BookOpen, ArrowLeftRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CIVILIZATIONS } from '@/data/history-index';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { RELATION_TYPES, type RelationType } from '@/data/relations';
import { useI18n } from '@/i18n';

type RelationGroupKey = RelationType | 'related';

interface DetailRelationsProps {
  hasAnyRelation: boolean;
  civColor: string;
  groupedRelations: Record<RelationGroupKey, Array<{ node: IHistoryNodeIndex; label: string }>>;
  onScrollToNode: (id: string) => void;
  onOpenGraph: () => void;
}

const TYPE_ICONS: Record<RelationGroupKey, React.ReactNode> = {
  person: <Users className="size-3" />,
  causal: <GitBranch className="size-3" />,
  temporal: <Clock className="size-3" />,
  geographic: <Globe className="size-3" />,
  culture: <BookOpen className="size-3" />,
  parallel: <ArrowLeftRight className="size-3" />,
  related: <Network className="size-3" />,
};

const RELATED_GROUP_META = { label: '相关延伸', color: 'var(--muted-foreground)' };

export default function DetailRelations({
  hasAnyRelation,
  civColor,
  groupedRelations,
  onScrollToNode,
  onOpenGraph,
}: DetailRelationsProps) {
  const { nt } = useI18n();
  if (!hasAnyRelation) return null;

  return (
    <>
      <Separator className="my-5" style={{ backgroundColor: `${civColor}20` }} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 font-serif">
            <Network className="size-3.5 text-primary" />
            关联网络
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenGraph}
            className="h-6 gap-1 text-[10px]"
          >
            <GitBranch className="size-3" />
            查看图谱
          </Button>
        </div>

        {(Object.entries(groupedRelations) as [RelationGroupKey, Array<{ node: IHistoryNodeIndex; label: string }>][])
          .filter(([, arr]) => arr.length > 0)
          .map(([type, arr]) => {
            const isRelated = type === 'related';
            const rt = isRelated ? RELATED_GROUP_META : RELATION_TYPES[type as RelationType];
            const typeIcon = TYPE_ICONS[type];
            return (
              <div key={type}>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="size-1 rounded-full" style={{ backgroundColor: rt.color }} />
                  {typeIcon}
                  <span className="text-[10px] font-medium" style={{ color: rt.color }}>
                    {rt.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {arr.slice(0, 8).map(({ node, label }) => {
  
                    const nc = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                    return (
                      <button
                        key={node.id}
                        onClick={() => onScrollToNode(node.id)}
                        className="group flex items-center gap-1 rounded-md border border-border/40 bg-card/50 px-2 py-1 text-left text-[11px] hover:border-border hover:bg-card"
                        title={label}
                      >
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: nc }}
                        />
                        <span className="truncate text-foreground/90 group-hover:text-foreground">
                          {nt(node)}
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          · {label.length > 8 ? label.slice(0, 7) + '…' : label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

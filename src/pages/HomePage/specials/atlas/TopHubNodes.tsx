import { useMemo } from 'react';
import { getTopHubNodes } from './atlas-stats';
import { CIVILIZATIONS, type CivilizationKey } from '@/data/history-index';
import { useI18n } from '@/i18n';

interface TopHubNodesProps {
  onNodeClick?: (nodeId: string) => void;
}

export default function TopHubNodes({ onNodeClick }: TopHubNodesProps) {
  const { nt } = useI18n();
  const topNodes = useMemo(() => getTopHubNodes(15), []);
  const maxDegree = topNodes[0]?.degree ?? 1;

  return (
    <div>
      <h3 className="mb-2 text-base font-bold font-display md:text-lg">历史枢纽节点 Top 15</h3>
      <p className="mb-3 text-xs text-muted-foreground">
        按关系度数排序，度数越高说明该节点在历史网络中越处于"枢纽"位置
      </p>
      <div className="space-y-1.5">
        {topNodes.map((n, i) => {
  
          const civ = CIVILIZATIONS[n.civilization as CivilizationKey];
          const pct = (n.degree / maxDegree) * 100;
          return (
            <button
              key={n.id}
              onClick={() => onNodeClick?.(n.id)}
              className="group relative block w-full overflow-hidden rounded-md border border-border/30 bg-card/40 px-2.5 py-1.5 text-left transition-all hover:border-primary/40 hover:bg-card"
            >
              {/* 进度条背景 */}
              <div
                className="absolute inset-y-0 left-0 opacity-20 transition-opacity group-hover:opacity-30"
                style={{
                  width: `${pct}%`,
                  backgroundColor: civ?.color ?? '#888',
                }}
              />
              <div className="relative flex items-center gap-2">
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: civ?.color ?? '#888', color: '#fff' }}
                >
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-xs font-medium md:text-sm">{nt(n)}</span>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {n.degree}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

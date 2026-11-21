// EXPORTS: FullRelationGraph
// 全量关系图谱：739节点 + 1450边，ECharts force 布局，按文明着色/度数缩放/类型形状

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useI18n } from '@/i18n';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption, GraphSeriesOption } from 'echarts';
import * as echarts from 'echarts/core';
import { EChartsType } from 'echarts/core';
import {
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  type ToolboxComponentOption,
} from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebouncedValue } from '@/utils/use-performance';
import { motion } from 'framer-motion';
import {
  ALL_HISTORY_NODES_INDEX,
  CIVILIZATIONS,
  type IHistoryNodeIndex,
  type CivilizationKey,
  type HistoryNodeType,
} from '@/data/history-index';
import { RELATIONS, RELATION_STATS, RELATION_TYPES, type RelationType } from '@/data/relations';
import { findShortestPath } from '@/data/relations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RotateCcw, ZoomIn, ZoomOut, Target, Network, X, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { bilingualHaystack } from '@/i18n/text';

  // 注册 ECharts 组件（仅 graph 需要的）
  echarts.use([TooltipComponent, LegendComponent, ToolboxComponent, GraphChart, CanvasRenderer]);

interface FullRelationGraphProps {
  onOpenDetail: (node: IHistoryNodeIndex) => void;
}

// 节点类型 → 形状映射
const TYPE_SYMBOL: Record<HistoryNodeType | 'default', string> = {
  event: 'circle',
  person: 'diamond',
  dynasty: 'rect',
  myth: 'star',
  artifact: 'triangle',
  default: 'circle',
};

// 度数分级：用于计算节点大小
function degreeToSize(degree: number, maxDegree: number): number {
  const minSize = 12;
  const maxSize = 48;
  if (maxDegree <= 1) return minSize;
  // 平方根压缩，避免超级节点过大
  const ratio = Math.sqrt(degree / maxDegree);
  return minSize + (maxSize - minSize) * ratio;
}

export default function FullRelationGraph({ onOpenDetail }: FullRelationGraphProps) {
  const { ln, nt, ns } = useI18n();
  const isMobile = useIsMobile();
  const chartRef = useRef<ReactECharts | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<RelationType>>(
    new Set(Object.keys(RELATION_TYPES) as RelationType[]),
  );
  const [egoNodeId, setEgoNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 180);
  const [highlightPath, setHighlightPath] = useState<string[] | null>(null);
  const [pathFrom, setPathFrom] = useState('');
  const [pathTo, setPathTo] = useState('');

  // 计算所有节点的度数（用于大小映射）
  const degreeMap = useMemo(() => {
    const map: Record<string, number> = {};
    RELATIONS.forEach((r) => {
      map[r.from] = (map[r.from] ?? 0) + 1;
      map[r.to] = (map[r.to] ?? 0) + 1;
    });
    return map;
  }, []);

  // 卸载时 dispose echarts 实例，避免内存泄漏
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        try {
          const inst = chartRef.current.getEchartsInstance();
          inst.dispose();
        } catch {
          // 可能已经被销毁
        }
        chartRef.current = null;
      }
    };
  }, []);

  const maxDegree = useMemo(() => {
    let max = 1;
    Object.values(degreeMap).forEach((d) => {
      if (d > max) max = d;
    });
    return max;
  }, [degreeMap]);

  // 构建 ECharts option
  const option = useMemo(() => {
    const nodeMap = new Map<string, IHistoryNodeIndex>();
    ALL_HISTORY_NODES_INDEX.forEach((n) => {
      if (n) nodeMap.set(n.id, n);
    });

    // 过滤边：只保留当前激活的关系类型
    const filteredEdges = RELATIONS.filter((r) => activeTypes.has(r.type));

    // 构建边集合（避免重复）
    const seen = new Set<string>();
    const edges: Array<{ source: string; target: string; lineStyle: { color: string; width: number; opacity: number }; type: RelationType; label?: string }> = [];

    filteredEdges.forEach((r) => {
      const key = [r.from, r.to].sort().join('--');
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({
        source: r.from,
        target: r.to,
        lineStyle: {
          color: RELATION_TYPES[r.type].color,
          width: 1,
          opacity: 0.4,
        },
        type: r.type,
      });
    });

    // Ego 模式：只显示中心节点及其邻居
    let visibleNodeIds = new Set<string>();
    if (egoNodeId) {
      visibleNodeIds.add(egoNodeId);
      filteredEdges.forEach((r) => {
        if (r.from === egoNodeId) visibleNodeIds.add(r.to);
        if (r.to === egoNodeId) visibleNodeIds.add(r.from);
      });
    }

    // 路径高亮模式：只显示路径上的节点
    if (highlightPath && highlightPath.length > 0) {
      visibleNodeIds = new Set(highlightPath);
    }

    const isFiltered = egoNodeId || (highlightPath && highlightPath.length > 0);

    // 构建节点数据
    const data = ALL_HISTORY_NODES_INDEX.filter((n): n is IHistoryNodeIndex => {
      if (!n) return false;
      if (isFiltered && !visibleNodeIds.has(n.id)) return false;
      return true;
    }).map((node) => {
  
      const degree = degreeMap[node.id] ?? 0;
      const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
      const size = degreeToSize(degree, maxDegree);
      const isEgoCenter = egoNodeId === node.id;
      const isOnPath = highlightPath?.includes(node.id);

      return {
        id: node.id,
        name: nt(node),
        value: degree,
        category: node.civilization,
        symbol: TYPE_SYMBOL[node.type ?? 'event'] ?? TYPE_SYMBOL.default,
        symbolSize: isEgoCenter || isOnPath ? size * 1.3 : size,
        itemStyle: {
          color: civColor,
          borderColor: isEgoCenter ? '#fff' : isOnPath ? '#ffd700' : 'rgba(10,10,10,0.6)',
          borderWidth: isEgoCenter || isOnPath ? 3 : 1,
          shadowBlur: isEgoCenter || isOnPath ? 15 : 0,
          shadowColor: isEgoCenter ? civColor : isOnPath ? '#ffd700' : 'transparent',
        },
          label: {
            show: isEgoCenter || isOnPath || size >= 28,
            fontSize: isEgoCenter || isOnPath ? 13 : 11,
            color: 'var(--foreground)',
            fontWeight: (isEgoCenter || isOnPath ? 'bold' : 'normal') as 'bold' | 'normal',
            fontFamily: 'serif',
          },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' as const },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: civColor,
          },
        },
        // 自定义数据，用于 tooltip
        nodeData: node,
        degree,
      };
    });

    // 过滤边：只保留两端都可见的
    const visibleEdges = isFiltered
      ? edges.filter((e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target))
      : edges;

    // 路径高亮：特殊标记路径上的边
    const pathEdgeSet = new Set<string>();
    if (highlightPath && highlightPath.length > 1) {
      for (let i = 0; i < highlightPath.length - 1; i++) {
        const key = [highlightPath[i], highlightPath[i + 1]].sort().join('--');
        pathEdgeSet.add(key);
      }
    }

    const finalEdges = visibleEdges.map((e) => {
      const key = [e.source, e.target].sort().join('--');
      const isPathEdge = pathEdgeSet.has(key);
      return {
        ...e,
        lineStyle: {
          ...e.lineStyle,
          width: isPathEdge ? 3 : e.lineStyle.width,
          opacity: isPathEdge ? 1 : e.lineStyle.opacity,
          color: isPathEdge ? '#ffd700' : e.lineStyle.color,
        },
      };
    });

    // 文明分类（legend）
    const categories = Object.entries(CIVILIZATIONS).map(([key, info]) => ({
      name: key,
      itemStyle: { color: info.color },
    }));

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(20, 18, 15, 0.95)',
        borderColor: 'rgba(200, 160, 100, 0.3)',
        borderWidth: 1,
        padding: [10, 12],
        textStyle: {
          color: '#f5ecd7',
          fontFamily: 'serif',
          fontSize: 12,
        },
        formatter: (params: unknown) => {
  
          const p = params as { dataType: string; data: { nodeData?: IHistoryNodeIndex; degree?: number; name?: string; type?: RelationType; label?: string } };
          if (p.dataType === 'node' && p.data?.nodeData) {
            const n = p.data.nodeData;
            const civName = ln(CIVILIZATIONS[n.civilization], n.civilization);
            return `
              <div style="font-weight:600;font-size:14px;margin-bottom:4px;font-family:serif;">${nt(n)}</div>
              <div style="color:#c9a96e;font-size:11px;margin-bottom:4px;">${n.yearDisplay} · ${civName}</div>
              <div style="font-size:11px;color:#aaa;margin-bottom:4px;">关联度：${p.data.degree ?? 0}</div>
              <div style="font-size:11px;line-height:1.5;max-width:200px;color:#ddd;">${ns(n)}</div>
              <div style="margin-top:6px;font-size:10px;color:#d4a843;">双击查看详情 →</div>
            `;
          }
          if (p.dataType === 'edge') {
            const typeInfo = RELATION_TYPES[(p.data as { type: RelationType }).type];
            return `
              <div style="font-weight:600;font-size:12px;color:${typeInfo?.color ?? '#888'};">
                ${typeInfo?.label ?? ''}
              </div>
            `;
          }
          return '';
        },
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        data: categories.map((c) => c.name),
        textStyle: {
          color: 'var(--muted-foreground)',
          fontSize: 11,
        },
        pageTextStyle: { color: 'var(--muted-foreground)' },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          roam: true, // 缩放和平移
          draggable: true,
          data,
          links: finalEdges,
          categories,
          force: {
            repulsion: isFiltered ? 200 : 120,
            gravity: 0.05,
            edgeLength: isFiltered ? [80, 150] : [50, 100],
            friction: 0.6,
          },
          edgeSymbol: ['none', 'none'],
          lineStyle: {
            curveness: 0.1,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 2,
              opacity: 1,
            },
          },
          animationDuration: 1000,
          animationEasingUpdate: 'quinticInOut',
        },
      ],
    };
  }, [activeTypes, egoNodeId, highlightPath, degreeMap, maxDegree]);

  // 双击事件：打开详情
  const onChartReady = useCallback(
    (chart: unknown) => {
      const inst = chart as EChartsType;
      inst.on('dblclick', (params: unknown) => {
        const p = params as { dataType: string; data?: { nodeData?: IHistoryNodeIndex } };
        if (p.dataType === 'node' && p.data?.nodeData) {
          onOpenDetail(p.data.nodeData);
        }
      });

      inst.on('click', (params: unknown) => {
        const p = params as { dataType: string; data?: { id?: string; nodeData?: IHistoryNodeIndex } };
        if (p.dataType === 'node' && p.data?.id) {
          // 普通点击：设置 ego 中心
          setEgoNodeId((prev) => (prev === p.data!.id ? null : p.data!.id));
          setHighlightPath(null);
        }
      });
    },
    [onOpenDetail],
  );

  // 搜索节点（防抖）
  const searchResults = useMemo(() => {
  
    if (!debouncedSearch.trim()) return [];
    const q = debouncedSearch.toLowerCase();
    return ALL_HISTORY_NODES_INDEX.filter(
      (n) =>
        n &&
        (bilingualHaystack(n.title, nt(n)).toLowerCase().includes(q) ||
          ns(n).toLowerCase().includes(q) ||
          n.yearDisplay.includes(q)),
    ).slice(0, 8);
  }, [debouncedSearch]);

  const focusOnNode = useCallback((nodeId: string) => {
    setEgoNodeId(nodeId);
    setHighlightPath(null);
    setSearchQuery('');
    // 让图表定位到该节点
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({
        type: 'focusNodeAdjacency',
        seriesIndex: 0,
        dataIndex: nodeId,
      });
    }
  }, []);

  // 最短路径查询
  const handleFindPath = useCallback(() => {
  
    if (!pathFrom || !pathTo) return;
    const fromNode = ALL_HISTORY_NODES_INDEX.find(
      (n) => n && bilingualHaystack(n.title, nt(n)).includes(pathFrom),
    );
    const toNode = ALL_HISTORY_NODES_INDEX.find(
      (n) => n && bilingualHaystack(n.title, nt(n)).includes(pathTo),
    );
    if (!fromNode || !toNode) return;
    const result = findShortestPath(fromNode.id, toNode.id);
    if (result) {
      setHighlightPath(result.path);
      setEgoNodeId(null);
    }
  }, [pathFrom, pathTo, activeTypes]);

  // 重置视图
  const resetView = useCallback(() => {
    setEgoNodeId(null);
    setHighlightPath(null);
    setPathFrom('');
    setPathTo('');
    setSearchQuery('');
    if (chartRef.current) {
      const chart = chartRef.current.getEchartsInstance();
      chart.dispatchAction({ type: 'restore' });
    }
  }, []);

  // 切换关系类型
  const toggleType = useCallback((type: RelationType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
    setHighlightPath(null);
  }, []);

  return (
    <div className="space-y-3">
      {/* 工具栏 */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 搜索 */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索节点…"
            className="h-8 pl-8 text-xs"
          />
          {/* 搜索结果下拉 */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-md border border-border/40 bg-card/95 p-1 shadow-lg">
              {searchResults.map((n) => (
                <button
                  key={n.id}
                  onClick={() => focusOnNode(n.id)}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-xs hover:bg-accent/30"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{
                      backgroundColor: CIVILIZATIONS[n.civilization]?.color ?? '#888',
                    }}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">{nt(n)}</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {n.yearDisplay}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 关系类型筛选 */}
        <div className="flex flex-wrap items-center gap-1">
          {(Object.keys(RELATION_TYPES) as RelationType[]).map((type) => {
            const info = RELATION_TYPES[type];
            const active = activeTypes.has(type);
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] transition-all ${
                  active
                    ? 'border-transparent text-white'
                    : 'border-border/40 bg-transparent text-muted-foreground hover:bg-accent/20'
                }`}
                style={active ? { backgroundColor: info.color } : {}}
              >
                <span>{info.icon}</span>
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-1">
          {/* 最短路径 */}
          <div className="hidden items-center gap-1 md:flex">
            <Input
              value={pathFrom}
              onChange={(e) => setPathFrom(e.target.value)}
              placeholder="起点"
              className="h-8 w-24 text-xs"
            />
            <span className="text-muted-foreground">→</span>
            <Input
              value={pathTo}
              onChange={(e) => setPathTo(e.target.value)}
              placeholder="终点"
              className="h-8 w-24 text-xs"
            />
            <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={handleFindPath}>
              寻径
            </Button>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={resetView}
            title="重置"
            aria-label="重置视图"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Ego 中心提示 */}
      {egoNodeId && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs"
        >
          <Target className="size-3.5 text-primary" />
          <span className="text-foreground/80">
            Ego 中心：
            <span className="font-semibold">
              {nt(ALL_HISTORY_NODES_INDEX.find((n) => n?.id === egoNodeId)) ?? egoNodeId}
            </span>
            <span className="ml-2 text-muted-foreground">
              度数：{degreeMap[egoNodeId] ?? 0}
            </span>
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto h-6 w-6"
            onClick={() => setEgoNodeId(null)}
            aria-label="取消 Ego"
          >
            <X className="size-3" />
          </Button>
        </motion.div>
      )}

      {/* 路径高亮提示 */}
      {highlightPath && highlightPath.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs"
        >
          <Network className="size-3.5 text-amber-500" />
          <span className="text-foreground/80">
            最短路径：<span className="font-semibold">{highlightPath.length - 1} 步</span>
            <span className="ml-2 text-muted-foreground">
              {highlightPath
                .map((id) => nt(ALL_HISTORY_NODES_INDEX.find((n) => n?.id === id)) ?? id)
                .join(' → ')}
            </span>
          </span>
          <Button
            size="icon"
            variant="ghost"
            className="ml-auto h-6 w-6"
            onClick={() => setHighlightPath(null)}
            aria-label="清除路径"
          >
            <X className="size-3" />
          </Button>
        </motion.div>
      )}

      {/* 图谱 */}
      <div
        className={`relative overflow-hidden rounded-xl border border-border/40 bg-card/20 ${
          isMobile ? 'h-[55vh]' : 'h-[70vh]'
        }`}
      >
        <ReactECharts
          ref={(el) => {
            chartRef.current = el;
          }}
          option={option}
          onChartReady={onChartReady}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />

        {/* 左上角统计 */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-border/40 bg-card/80 px-3 py-2 text-[11px]">
          <div className="font-semibold text-foreground/80" style={{ fontFamily: 'var(--font-display)' }}>
            关系网络
          </div>
          <div className="mt-1 text-muted-foreground">
            <span className="tabular-nums text-foreground">
              {ALL_HISTORY_NODES_INDEX.filter((n) => n).length}
            </span>{' '}
            节点 ·{' '}
            <span className="tabular-nums text-foreground">
              当前视图 {Math.floor(
                RELATIONS.filter((r) => activeTypes.has(r.type)).length / 2,
              ).toLocaleString()}
            </span>{' '}
            条边 / 全库 {RELATION_STATS.totalPairs.toLocaleString()} 条
          </div>
          {egoNodeId && (
            <div className="mt-0.5 text-primary">Ego 视图</div>
          )}
        </div>

        {/* 操作提示 */}
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-border/40 bg-card/80 px-2 py-1.5 text-[10px]">
          <div className="text-muted-foreground">
            单击选中 · 双击详情 · 滚轮缩放 · 拖拽平移
          </div>
        </div>
      </div>

      {/* 底部节点类型图例 */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-primary" />
          <span>事件</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-3 rotate-45 bg-primary" />
          <span>人物</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-3 bg-primary" />
          <span>朝代</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="size-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: '10px solid var(--primary)',
            }}
          />
          <span>文物</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Star className="size-3 fill-current text-primary" />
          <span>神话</span>
        </div>
        <div className="ml-2 text-muted-foreground/60">大小 = 关联度</div>
      </div>
    </div>
  );
}

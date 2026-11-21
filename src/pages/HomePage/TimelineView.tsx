// EXPORTS: TimelineView
import { useRef, useEffect, useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  MapPin,
  Clock,
  Sparkles,
  LayoutGrid,
  Rows,
  ZoomIn,
  ZoomOut,
  Plus,
  Minus,
  Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CivilBadge from '@/components/ui/civil-badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import SwimLaneView from './SwimLaneView';
import EmptyState from './components/EmptyState';
import { useI18n } from '@/i18n';
import { getCivilizationName, getCategoryName, getEraName } from '@/data/i18n/content-i18n';
import { ERAS, CIVILIZATIONS, CATEGORIES } from '@/data/history-constants';
import type {
  IHistoryNodeIndex,
  CivilizationKey,
  CategoryKey,
} from '@/data/history-index';
import type { HistoryState } from './useHistoryStore';
import { getNodeTimeRange } from './utils';
import { NodeShape } from './timeline-shapes';
import {
  BACK_TO_TOP_THRESHOLD,
  CLUSTER_THRESHOLD_ZOOM_1,
  CLUSTER_THRESHOLD_ZOOM_2,
  CLUSTER_THRESHOLD_ZOOM_3,
  CLUSTER_THRESHOLD_ZOOM_4,
  CLUSTER_THRESHOLD_ZOOM_5,
} from './timeline-constants';

interface TimelineViewProps {
  store: HistoryState;
}

// 文明兴衰数据：按时代分段的强盛度 0-100
const CIVILIZATION_RISE_FALL: Record<CivilizationKey, number[]> = {
  china: [5, 15, 40, 75, 85, 60, 70],
  europe: [5, 10, 70, 30, 55, 80, 90],
  middleEast: [20, 80, 50, 75, 40, 30, 25],
  southAsia: [10, 30, 20, 40, 35, 40, 50],
  eastAsia: [5, 5, 10, 60, 20, 15, 20],
  africa: [60, 40, 20, 15, 10, 20, 35],
  america: [5, 10, 15, 25, 50, 30, 75],
  centralAsia: [0, 5, 35, 60, 45, 25, 15],
  oceania: [0, 0, 5, 15, 20, 15, 20],
  global: [3, 8, 20, 25, 40, 60, 85],
};

const CURVE_COLORS: Record<CivilizationKey, string> = {
  china: '#B4442A',
  europe: '#C25A2E',
  middleEast: '#CE8A46',
  southAsia: '#D4A843',
  eastAsia: '#BE7A3C',
  africa: '#A85C33',
  america: '#D9B06A',
  centralAsia: '#9C6B3F',
  oceania: '#E0C08A',
  global: '#8A6A45',
};

const CIV_KEYS = Object.keys(CIVILIZATION_RISE_FALL) as CivilizationKey[];

export default memo(function TimelineView({ store }: TimelineViewProps) {
  const { t, ln, nt, ns, ny } = useI18n();
  const {
    filteredNodes,
    openDetail,
    currentEra,
    targetNodeId,
    clearTarget,
    selectedNode,
    timeRange,
    isPlaying,
    density,
    setDensity,
    zoomLevel,
    setZoomLevel,
    zoomIn,
    zoomOut,
    setTimelineScrollTop,
    timelineScrollTop,
    viewMode,
  } = store;

  const scrollRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const initialScrollDone = useRef(false);
  const lastRangeRef = useRef<string>('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [timelineLayout, setTimelineLayout] = useState<'vertical' | 'swimlane'>('vertical');

  // 图表交互状态
  const [hiddenCivs, setHiddenCivs] = useState<CivilizationKey[]>([]);
  const [hoveredCiv, setHoveredCiv] = useState<CivilizationKey | null>(null);

  // 展开的聚合簇 id 集合（按 eraId_clusterIndex 为 key）
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());

  // 密度类名（舒适/紧凑）
  const nodeGap = density === 'compact' ? 'space-y-1.5' : 'space-y-3';
  const densityClass = nodeGap;
  const nodePaddingY = density === 'compact' ? 'py-1.5' : 'py-2';
  const dotSize = density === 'compact' ? 'size-2.5' : 'size-3.5';
  const titleSize = density === 'compact' ? 'text-[13px]' : 'text-sm';
  const metaSize = density === 'compact' ? 'text-[10px]' : 'text-[11px]';

  // 缩放档位 → 每簇显示上限（聚合阈值）
  // zoomLevel 越大，阈值越高，越少聚合；1档最聚合，5档完全展开
  const clusterThreshold = useMemo(() => {
    switch (zoomLevel) {
      case 1: return CLUSTER_THRESHOLD_ZOOM_1;
      case 2: return CLUSTER_THRESHOLD_ZOOM_2;
      case 3: return CLUSTER_THRESHOLD_ZOOM_3;
      case 4: return CLUSTER_THRESHOLD_ZOOM_4;
      case 5: return CLUSTER_THRESHOLD_ZOOM_5;
      default: return CLUSTER_THRESHOLD_ZOOM_3;
    }
  }, [zoomLevel]);

  // 缩放档位 → 节点重要度过滤门槛
  // 1档: 只显示 important=true
  // 2档: important + dynasty/civilization 类型
  // 3档及以上: 全部
  const importanceFilter = useCallback(
    (node: IHistoryNodeIndex): boolean => {
      if (zoomLevel >= 3) return true;
      if (zoomLevel === 2) {
        return node.important === true || node.type === 'dynasty';
      }
      // zoomLevel === 1
      return node.important === true;
    },
    [zoomLevel],
  );

  // 按时代分组 + 聚合簇
  const clustersByEra = useMemo(() => {
    const result: Record<string, Array<{ nodes: IHistoryNodeIndex[]; isCluster: boolean; key: string }>> = {};

    ERAS.forEach((era) => {
      const eraNodes = filteredNodes
        .filter((n) => n && n.eraId === era.id && importanceFilter(n))
        .sort((a, b) => a.year - b.year);

      if (eraNodes.length === 0) {
        result[era.id] = [];
        return;
      }

      // 时代节点数 ≤ 阈值，全部直接显示（一个大簇但不聚合）
      if (eraNodes.length <= clusterThreshold) {
        result[era.id] = [
          { nodes: eraNodes, isCluster: false, key: `${era.id}_all` },
        ];
        return;
      }

      // 超过阈值：拆分成若干簇，每簇 ≤ threshold
      // 前 threshold 个直接展示，其余按每 threshold 个聚合一簇
      const clusters: Array<{ nodes: IHistoryNodeIndex[]; isCluster: boolean; key: string }> = [];

      // 第一簇：重要节点直接展开（取前 threshold 个）
      const importantFirst = eraNodes
        .filter((n) => n.important === true)
        .slice(0, Math.min(clusterThreshold, eraNodes.length));

      if (importantFirst.length > 0 && importantFirst.length < clusterThreshold) {
        // 重要节点不足阈值，用普通节点补齐到阈值前
        const remaining = eraNodes.filter(
          (n) => n.important !== true,
        );
        const fillCount = clusterThreshold - importantFirst.length;
        const firstCluster = [
          ...importantFirst,
          ...remaining.slice(0, fillCount),
        ].sort((a, b) => a.year - b.year);
        clusters.push({ nodes: firstCluster, isCluster: false, key: `${era.id}_0` });

        // 剩余节点按阈值聚合
        const rest = remaining.slice(fillCount);
        for (let i = 0; i < rest.length; i += clusterThreshold) {
          const chunk = rest.slice(i, i + clusterThreshold);
          clusters.push({
            nodes: chunk,
            isCluster: true,
            key: `${era.id}_c${Math.floor(i / clusterThreshold) + 1}`,
          });
        }
      } else {
        // 重要节点本身就多，直接全部按阈值分组
        for (let i = 0; i < eraNodes.length; i += clusterThreshold) {
          const chunk = eraNodes.slice(i, i + clusterThreshold);
          const isFirst = i === 0;
          clusters.push({
            nodes: chunk,
            isCluster: !isFirst || chunk.length > clusterThreshold,
            key: `${era.id}_${Math.floor(i / clusterThreshold)}`,
          });
        }
      }

      result[era.id] = clusters;
    });

    return result;
  }, [filteredNodes, importanceFilter, clusterThreshold]);

  const toggleCluster = useCallback((key: string) => {
    setExpandedClusters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // 滚轮缩放（Ctrl + 滚轮）
  const handleWheelZoom = useCallback(
    (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    },
    [zoomIn, zoomOut],
  );

  // 双指捏合缩放（移动端）
  const pinchRef = useRef({
    active: false,
    initialDist: 0,
    initialZoom: 3,
  });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current.active = true;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current.initialDist = Math.sqrt(dx * dx + dy * dy);
      pinchRef.current.initialZoom = zoomLevel;
    }
  }, [zoomLevel]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!pinchRef.current.active || e.touches.length !== 2) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = dist / pinchRef.current.initialDist;
      // 距离比 0.7 ~ 1.4 映射到 1~5 档
      let targetZoom = pinchRef.current.initialZoom;
      if (ratio > 1.1) {
        targetZoom = Math.min(5, pinchRef.current.initialZoom + Math.floor((ratio - 1) * 5));
      } else if (ratio < 0.9) {
        targetZoom = Math.max(1, pinchRef.current.initialZoom - Math.floor((1 - ratio) * 5));
      }
      if (targetZoom !== zoomLevel) {
        setZoomLevel(targetZoom as 1 | 2 | 3 | 4 | 5);
      }
    },
    [zoomLevel, setZoomLevel],
  );

  const handleTouchEnd = useCallback(() => {
    pinchRef.current.active = false;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheelZoom, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: false });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd);
    return () => {
      el.removeEventListener('wheel', handleWheelZoom);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheelZoom, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const toggleCivVisibility = (civ: CivilizationKey) => {
    setHiddenCivs((prev) =>
      prev.includes(civ) ? prev.filter((c) => c !== civ) : [...prev, civ],
    );
  };

  // 同时期节点判断
  const selectedTimeRange = useMemo(() => {
    if (!selectedNode) return null;
    return getNodeTimeRange(selectedNode);
  }, [selectedNode]);

  const isContemporary = (node: IHistoryNodeIndex): boolean => {
    if (!selectedTimeRange || node.id === selectedNode?.id) return false;
    const [s, e] = getNodeTimeRange(node);
    return s <= selectedTimeRange[1] && e >= selectedTimeRange[0];
  };

  // 按时代分组节点
  const nodesByEra = useMemo(() => {
    const map: Record<string, IHistoryNodeIndex[]> = {};
    ERAS.forEach((e) => {
      map[e.id] = filteredNodes.filter((n) => n && n.eraId === e.id).sort((a, b) => a.year - b.year);
    });
    return map;
  }, [filteredNodes]);

  // 初始滚动到中世纪（或恢复保存位置）
  useEffect(() => {
    if (initialScrollDone.current) return;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // 如果有保存的滚动位置，恢复它
    if (timelineScrollTop !== null && scrollRef.current) {
      timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = timelineScrollTop;
          initialScrollDone.current = true;
        }
      }, 100);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }

    // 默认滚动到中世纪
    const medievalNode = filteredNodes.find(
      (n) => n && n.eraId === 'medieval' && n.important,
    );
    if (medievalNode && scrollRef.current) {
      timer = setTimeout(() => {
        const el = nodeRefs.current[medievalNode.id];
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'center' });
          initialScrollDone.current = true;
        }
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [filteredNodes, timelineScrollTop]);

  // timeRange 变化时滚动到范围起始节点（仅在播放或拖拽触发时）
  useEffect(() => {
    const rangeKey = `${timeRange[0]}-${timeRange[1]}`;
    if (lastRangeRef.current === rangeKey) return;
    lastRangeRef.current = rangeKey;
    if (!isPlaying && initialScrollDone.current) return;
    if (filteredNodes.length === 0 || !scrollRef.current) return;
    const firstNode = filteredNodes[0];
    const el = nodeRefs.current[firstNode.id];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [timeRange, isPlaying, filteredNodes]);

  // 定位到指定节点
  useEffect(() => {
    if (!targetNodeId || !scrollRef.current) return;
    const el = nodeRefs.current[targetNodeId];
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      timer = setTimeout(() => clearTarget(), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [targetNodeId, clearTarget]);

  // 滚动监听：回到顶部按钮 + 保存滚动位置
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    setShowBackToTop(top > BACK_TO_TOP_THRESHOLD);
    if (initialScrollDone.current) {
      setTimelineScrollTop(top);
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 绘制文明兴衰曲线 (SVG)
  const chartWidth = 200;
  const chartHeight = 120;
  const xStep = chartWidth / (ERAS.length - 1);

  const generatePath = (values: number[]) => {
    const points = values.map((v, i) => {
      const x = i * xStep;
      const y = chartHeight - (v / 100) * (chartHeight - 10) - 5;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  const generateAreaPath = (values: number[]) => {
    const linePath = generatePath(values);
    return `${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;
  };

  const getCurveOpacity = (key: CivilizationKey, isLine: boolean) => {
    if (hiddenCivs.includes(key)) return 0;
    if (hoveredCiv === key) return isLine ? 1 : 0.18;
    if (hoveredCiv) return isLine ? 0.22 : 0;
    return isLine ? 0.72 : 0;
  };

  // 类型图例
  const typeLegend = [
    { type: 'person', label: t('badge.typePerson', '人物'), shape: 'diamond' },
    { type: 'event', label: t('badge.typeEvent', '事件'), shape: 'circle' },
    { type: 'dynasty', label: t('badge.typeDynasty', '朝代'), shape: 'square' },
    { type: 'artifact', label: t('ui.artifactBuilding', '文物/建筑'), shape: 'triangle' },
    { type: 'myth', label: t('badge.typeMyth', '神话'), shape: 'star' },
  ];

  return (
    <div className="flex h-full gap-4">
      {/* 时间轴主区域 */}
      <div className="min-w-0 flex-1">
        {/* 顶部工具栏 */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* 布局切换 */}
            <div className="flex items-center rounded-md border border-border/40 bg-card p-0.5">
              <button
                onClick={() => setTimelineLayout('vertical')}
                className={`inline-flex h-10 items-center gap-1 rounded-sm px-3 text-sm transition-colors md:h-auto md:py-0.5 md:px-2 md:text-[11px] ${
                  timelineLayout === 'vertical'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={timelineLayout === 'vertical'}
              >
                <Rows className="size-3" />
                {t('view.timeline', '时间轴')}
              </button>
              <button
                onClick={() => setTimelineLayout('swimlane')}
                className={`inline-flex h-10 items-center gap-1 rounded-sm px-3 text-sm transition-colors md:h-auto md:py-0.5 md:px-2 md:text-[11px] ${
                  timelineLayout === 'swimlane'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={timelineLayout === 'swimlane'}
              >
                <LayoutGrid className="size-3" />
                {t('swimlane.title', '文明泳道')}
              </button>
            </div>
            <span className="text-xs text-muted-foreground">
              {t('ui.total', '共')} {filteredNodes.length} {t('ui.nodes', '个节点')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* 形状图例 */}
            <div className="hidden items-center gap-2 md:flex">
              {typeLegend.map((t) => (
                <div key={t.type} className="flex items-center gap-1">
                  {t.shape === 'circle' && <span className="size-2 rounded-full bg-primary" />}
                  {t.shape === 'diamond' && (
                    <span className="size-2 rotate-45 bg-primary" />
                  )}
                  {t.shape === 'square' && <span className="size-2 bg-primary" />}
                  {t.shape === 'triangle' && (
                    <span
                      className="size-0"
                      style={{
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderBottom: '7px solid var(--primary)',
                      }}
                    />
                  )}
                  {t.shape === 'star' && <Star className="size-3 fill-current text-primary" />}
                  <span className="text-[10px] text-muted-foreground">{t.label}</span>
                </div>
              ))}
            </div>
            {/* 缩放控制 */}
            <div className="flex items-center gap-1 rounded-md border border-border/40 bg-card/40 p-0.5">
              <button
                onClick={zoomOut}
                disabled={zoomLevel <= 1}
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={t('timeline.zoomOut', '缩小')}
                title={`${t('timeline.zoomOut', '缩小')} (Ctrl+-)`}
              >
                <Minus className="size-3" />
              </button>
              <span className="min-w-[36px] text-center text-[11px] tabular-nums text-foreground/70">
                {zoomLevel}/5
              </span>
              <button
                onClick={zoomIn}
                disabled={zoomLevel >= 5}
                className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
                aria-label={t('timeline.zoomIn', '放大')}
                title={`${t('timeline.zoomIn', '放大')} (Ctrl++)`}
              >
                <Plus className="size-3" />
              </button>
            </div>
            {/* 密度切换 */}
            <div className="hidden items-center gap-1 rounded-md border border-border/40 bg-card/40 p-0.5 sm:flex">
              <button
                onClick={() => setDensity('comfortable')}
                className={`rounded-sm px-2 py-0.5 text-[11px] transition-colors ${
                  density === 'comfortable'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('ui.comfortable', '舒适')}
              </button>
              <button
                onClick={() => setDensity('compact')}
                className={`rounded-sm px-2 py-0.5 text-[11px] transition-colors ${
                  density === 'compact'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('ui.compact', '紧凑')}
              </button>
            </div>
          </div>
        </div>
        {timelineLayout === 'vertical' ? (
          <ScrollArea
            ref={scrollRef}
            className="h-[calc(100vh-14rem)] pr-2"
            onScrollCapture={handleScroll}
          >
          <div className="relative py-4 pb-36 md:pb-24">
            {/* 中央时间线 */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10 md:left-6"
            />

            {ERAS.map((era, eraIdx) => {
  
              const nodes = nodesByEra[era.id];
              if (nodes.length === 0) return null;

              return (
                <div key={era.id} className="relative mb-10">
                  {/* 时代标签 */}
                  <div
                    className="sticky top-0 z-10 mb-4 ml-10 md:ml-14"
                    style={{
                      backgroundColor: 'var(--card)',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5"
                      style={{
                        borderLeft: `3px solid ${era.accent}`,
                      }}
                    >
                      <span
                        className="text-sm font-bold tracking-wide"
                        style={{ color: era.accent, fontFamily: 'var(--font-display)' }}
                      >
                        {ln(era)}
                      </span>
                    </div>
                  </div>

                  {/* 节点列表（含聚合簇） */}
                   <div className={densityClass}>
                     {clustersByEra[era.id].map((cluster, clusterIdx) => {
                       const isExpanded = expandedClusters.has(cluster.key);

                       // 非聚合簇：直接渲染所有节点
                       if (!cluster.isCluster || isExpanded) {
                         return (
                           <div key={cluster.key} className="space-y-1.5">
                             {cluster.nodes.map((node, i) => {
  
                               const civInfo =
                                 CIVILIZATIONS[node.civilization] ??
                                 { name: node.civilization, color: '#888' };
                               const civColor = civInfo.color;
                               const isSelected = selectedNode?.id === node.id;
                               const contemporary = selectedNode ? isContemporary(node) : false;
                               const hasSelected = !!selectedNode;

                               return (
                                 <>
                                   <motion.div
                                     key={node.id}
                                     ref={(el) => {
                                       nodeRefs.current[node.id] = el;
                                     }}
                                     initial={{ opacity: 0, x: -10 }}
                                     whileInView={{ opacity: 1, x: 0 }}
                                     viewport={{ once: true, margin: '-50px' }}
                                     transition={{
                                       duration: 0.4,
                                       delay: Math.min(i * 0.02, 0.2),
                                     }}
                                     onClick={() => openDetail(node)}
                                    className={
                                        'timeline-node ' +
                                        (density === 'compact' ? 'timeline-compact ' : '') +
                                        'relative ml-10 cursor-pointer rounded-[2px] border ' +
                                        'py-4 px-[18px] transition-colors md:ml-16 ' +
                                        'max-w-full md:max-w-3xl ' +
                                        ' [content-visibility:auto] [contain-intrinsic-size:auto_120px] ' +
                                        (isSelected
                                         ? 'border-[#D4A843]/70 bg-card/40 '
                                         : 'border-foreground/10 bg-card/40 hover:border-[#D4A843]/45 ') +
                                       (hasSelected && !isSelected && !contemporary ? 'opacity-30 ' : '') +
                                       (contemporary ? 'ring-2 ring-primary/30 ring-offset-1 ring-offset-background' : '')
                                     }
                                   >
                                     {/* 左侧文明色条（纯色） */}
                                     <div
                                       className="absolute left-0 top-0 h-full w-[3px]"
                                       style={{ backgroundColor: civColor }}
                                     />

                                     {/* 节点形状 */}
                                     <NodeShape type={node.type} color={civColor} important={node.important ?? false} />

                                     <div className="flex flex-wrap items-center gap-2">
                                       <span
                                         className={`font-medium tabular-nums ${metaSize}`}
                                         style={{ color: civColor }}
                                       >
                                         {ny(node.yearDisplay)}
                                       </span>
                                       {node.important && (
                                         <CivilBadge variant="important" label={t('timeline.important', '重要')} size="sm" />
                                       )}
                                       {node.type === 'person' && (
                                         <CivilBadge variant="type" type="person" size="sm" />
                                       )}
                                       {node.type === 'myth' && (
                                         <CivilBadge variant="myth" size="sm" />
                                       )}
                                       {node.type === 'dynasty' && (
                                         <CivilBadge variant="type" type="dynasty" label={t('timeline.dynasty', '朝代')} size="sm" />
                                       )}
                                       {node.location?.lat !== undefined && (
                                         <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                           <MapPin className="size-3" />
                                           {node.location.lat.toFixed(1)}°, {node.location.lng.toFixed(1)}°
                                         </span>
                                       )}
                                     </div>
                                     <h3
                                       className="mt-1 text-sm font-semibold text-foreground"
                                       style={{ fontFamily: "'Noto Serif SC', serif" }}
                                     >
                                       {nt(node)}
                                     </h3>
                                   <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-muted-foreground md:text-xs md:leading-relaxed">
                                       {ns(node)}
                                     </p>

                                     {/* 标签 */}
                                     <div className="mt-2 flex flex-wrap gap-1">
                                       {(node.categories ?? [])
                                         .filter(
                                           (c): c is CategoryKey =>
                                             typeof c === 'string' && c in CATEGORIES,
                                         )
                                         .slice(0, 3)
                                         .map((cat) => (
                                           <CivilBadge
                                             key={cat}
                                             variant="category"
                                             category={cat}
                                             label={ln(CATEGORIES[cat], cat)}
                                             size="sm"
                                           />
                                         ))}
                                       <CivilBadge
                                         variant="civilization"
                                         civilization={node.civilization as CivilizationKey}
                                         size="sm"
                                       />
                                     </div>
                                   </motion.div>
                                 </>
                               );
                             })}
                           </div>
                         );
                       }

                       // 聚合簇：折叠态，显示 +N 按钮
                       const firstYear = ny(cluster.nodes[0]?.yearDisplay) ?? '';
                       const lastYear = ny(cluster.nodes[cluster.nodes.length - 1]?.yearDisplay) ?? '';
                       const importantCount = cluster.nodes.filter((n) => n.important).length;
                       // 统计文明分布，取 Top2 色
                       const civCount: Record<string, number> = {};
                       cluster.nodes.forEach((n) => {
                         civCount[n.civilization] = (civCount[n.civilization] ?? 0) + 1;
                       });
                       const topCivs = Object.entries(civCount)
                         .sort((a, b) => b[1] - a[1])
                         .slice(0, 3);

                       return (
                         <motion.div
                           key={cluster.key}
                           initial={{ opacity: 0, x: -8 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.3, delay: clusterIdx * 0.02 }}
                           className="relative ml-10 md:ml-16"
                         >
                           <button
                             onClick={() => toggleCluster(cluster.key)}
                             className="group flex w-full items-center gap-3 rounded-[2px] border border-dashed border-foreground/15 bg-transparent px-3 py-2 text-left transition-colors hover:border-[#D4A843]/40"
                           >
                             {/* 左侧聚合图标 */}
                             <div
                               className="flex size-7 shrink-0 items-center justify-center rounded-[2px] border border-primary/40 bg-transparent text-xs font-bold text-primary"
                             >
                               +{cluster.nodes.length}
                             </div>
                             <div className="min-w-0 flex-1">
                               <div className="flex items-center gap-2">
                                 <span className={`font-medium tabular-nums ${metaSize} text-primary/80`}>
                                   {firstYear}
                                 </span>
                                 <span className="text-[10px] text-muted-foreground">—</span>
                                 <span className={`font-medium tabular-nums ${metaSize} text-primary/80`}>
                                   {lastYear}
                                 </span>
                                 <span className="text-[11px] text-muted-foreground">
                                   {cluster.nodes.length} {t('ui.nodes', '个节点')}
                                 </span>
                                 {importantCount > 0 && (
                                   <span className="text-[10px] text-amber-500">{importantCount}</span>
                                 )}
                               </div>
                               {/* 文明色点 */}
                               <div className="mt-1 flex items-center gap-1">
                                 {topCivs.map(([civ, count]) => {
  
                                   const color = CIVILIZATIONS[civ as CivilizationKey]?.color ?? '#888';
                                   return (
                                     <div
                                       key={civ}
                                       className="flex items-center gap-0.5"
                                       title={`${ln(CIVILIZATIONS[civ as CivilizationKey], civ)} ${count}个`}
                                     >
                                       <span
                                         className="size-2 rounded-full"
                                         style={{ backgroundColor: color }}
                                       />
                                       <span className="text-[9px] text-muted-foreground">{count}</span>
                                     </div>
                                   );
                                 })}
                               </div>
                             </div>
                             <span className="text-[11px] text-muted-foreground group-hover:text-primary">
                               {t('ui.expandArrow', '展开 →')}
                             </span>
                           </button>
                         </motion.div>
                       );
                     })}
                   </div>
                </div>
              );
            })}

            {filteredNodes.length === 0 && <EmptyState type="node" />}
          </div>
          </ScrollArea>
        ) : (
          <div className="h-[calc(100vh-14rem)]">
            <SwimLaneView store={store} />
          </div>
        )}
      </div>
      {/* 文明兴衰曲线图（仅纵向时间轴模式显示） */}
      {timelineLayout === 'vertical' && (
        <div className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-4 rounded-[2px] border border-border/40 bg-card/40 p-3">
          <h4
            className="mb-2 text-xs font-semibold text-foreground/80"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {t('ui.riseFall', '文明兴衰曲线')}
          </h4>
          <div className="relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full"
              preserveAspectRatio="none"
            >
              {/* 网格线 */}
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={chartHeight - (y / 100) * (chartHeight - 10) - 5}
                  x2={chartWidth}
                  y2={chartHeight - (y / 100) * (chartHeight - 10) - 5}
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* 面积曲线 */}
              {CIV_KEYS.map((key) => {
                const values = CIVILIZATION_RISE_FALL[key];
                return (
                  <path
                    key={key}
                    d={generateAreaPath(values)}
                    fill={CURVE_COLORS[key]}
                    fillOpacity={getCurveOpacity(key, false)}
                    style={{ transition: 'fill-opacity 0.2s' }}
                  />
                );
              })}

              {/* 折线 */}
              {CIV_KEYS.map((key) => {
                const values = CIVILIZATION_RISE_FALL[key];
                const isHovered = hoveredCiv === key;
                return (
                  <path
                    key={`line-${key}`}
                    d={generatePath(values)}
                    fill="none"
                    stroke={CURVE_COLORS[key]}
                    strokeWidth={isHovered ? 2 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={getCurveOpacity(key, true)}
                    style={{
                      transition: 'stroke-width 0.2s, opacity 0.2s',
                    }}
                  />
                );
              })}
            </svg>

            {/* 图例 - 可交互 */}
            <div className="mt-3 space-y-1">
              {CIV_KEYS.map((key) => {
  
                const isHidden = hiddenCivs.includes(key);
                const isHovered = hoveredCiv === key;
                return (
                  <button
                    key={key}
                    onClick={() => toggleCivVisibility(key)}
                    onMouseEnter={() => setHoveredCiv(key)}
                    onMouseLeave={() => setHoveredCiv(null)}
                    className="flex w-full items-center gap-1.5 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-accent/30"
                  >
                    <span
                      className="size-[6px] shrink-0 rounded-[2px] transition-opacity"
                      style={{
                        backgroundColor: CURVE_COLORS[key],
                        opacity: isHidden ? 0.2 : 1,
                      }}
                    />
                    <span
                      className={`truncate text-[10px] transition-opacity ${
                        isHidden
                          ? 'text-muted-foreground/40 line-through'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {ln(CIVILIZATIONS[key], key)}
                    </span>
                    {isHovered && (
                      <span className="ml-auto text-[9px] text-muted-foreground">
                        {isHidden ? '显示' : '隐藏'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 时代轴 */}
          <div className="mt-3 flex justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span>{t('timeline.eraShort_prehistoric', '史前')}</span>
            <span>{t('timeline.eraShort_ancient', '古代')}</span>
            <span>{t('timeline.eraShort_classical', '古典')}</span>
            <span>{t('timeline.eraShort_medieval', '中世')}</span>
            <span>{t('timeline.eraShort_earlyModern', '近代')}</span>
            <span>{t('timeline.eraShort_industrial', '工业')}</span>
            <span>{t('timeline.eraShort_modern', '现代')}</span>
          </div>

          <p className="mt-2 text-[9px] text-muted-foreground/60">
            {t('ui.legendHint', '点击图例可显隐曲线')}
          </p>
        </div>
      </div>
      )}

      {/* 回到顶部按钮 */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
                  type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-card/80 text-foreground/70 shadow-lg transition-colors hover:text-primary"
            aria-label={t('timeline.backToTop', '回到顶部')}
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}, (prev, next) => {
  // TimelineView 实际用到的字段才比较，跳过播放进度等高频无关字段
  const relevantKeys = [
    'filteredNodes', 'openDetail', 'currentEra', 'targetNodeId', 'clearTarget',
    'selectedNode', 'timeRange', 'isPlaying', 'density', 'setDensity', 'zoomLevel',
    'setZoomLevel', 'zoomIn', 'zoomOut', 'setTimelineScrollTop', 'timelineScrollTop',
    'viewMode', 'dataLoaded',
  ];
  for (const key of relevantKeys) {
    if (prev.store[key as keyof typeof prev.store] !== next.store[key as keyof typeof prev.store]) {
      return false;
    }
  }
  return true;
});

// EXPORTS: SwimLaneView
import { useMemo, useRef, useState, useEffect, memo } from 'react';
import { ChevronDown, Maximize2, Minimize2, Layers, Star } from 'lucide-react';
import {
  ERAS,
  CIVILIZATIONS,
  type IHistoryNodeIndex as IHistoryNode,
  type CivilizationKey,
} from '@/data/history-index';
import type { HistoryState } from './useHistoryStore';
import { useI18n } from '@/i18n';
import { getEraName, getCivilizationName } from '@/data/i18n/content-i18n';
import { getNodeTimeRange, formatYear } from './utils';
import { LANE_WIDTH, ERA_LABEL_WIDTH } from './timeline-constants';
import CivilBadge from '@/components/ui/civil-badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SwimLaneViewProps {
  store: HistoryState;
}

// 泳道顺序（从左到右，按地理相邻排列）
const LANE_ORDER: CivilizationKey[] = [
  'china',
  'eastAsia',
  'southAsia',
  'centralAsia',
  'middleEast',
  'europe',
  'africa',
  'america',
  'oceania',
  'global',
];

// 只保留实际存在的文明
const ACTIVE_LANES: CivilizationKey[] = LANE_ORDER.filter(
  (k) => k in CIVILIZATIONS,
) as CivilizationKey[];

// 节点类型形状（6 类）
function NodeTypeDot({ type, color }: { type: string; color: string }) {
  const size = 7;
  switch (type) {
    case 'person':
      return (
        <span
          className="inline-block shrink-0"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            transform: 'rotate(45deg)',
            borderRadius: 1,
          }}
        />
      );
    case 'dynasty':
    case 'civilization':
      return (
        <span
          className="inline-block shrink-0"
          style={{ width: size, height: size, backgroundColor: color, borderRadius: 1 }}
        />
      );
    case 'myth':
      return (
        <Star
          className="shrink-0 fill-current"
          style={{ color, width: size, height: size }}
        />
      );
    case 'artifact':
    case 'building':
    case 'landmark':
      return (
        <span className="inline-block shrink-0" style={{ width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid ${color}` }} />
      );
    case 'event':
    case 'war':
    default:
      return (
        <span
          className="inline-block shrink-0 rounded-full"
          style={{ width: size, height: size, backgroundColor: color }}
        />
      );
  }
}

export default memo(function SwimLaneView({ store }: SwimLaneViewProps) {
  const { t, ln, nt, ny } = useI18n();
  const { filteredNodes, openDetail, selectedNode } = store;
  const [hiddenLanes, setHiddenLanes] = useState<CivilizationKey[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const eraRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeEra, setActiveEra] = useState<string>(ERAS[0]?.id ?? '');

  const visibleLanes = useMemo(
    () => ACTIVE_LANES.filter((k) => !hiddenLanes.includes(k)),
    [hiddenLanes],
  );

  // 按 era 分组，并在每个 era 内按 lane 再分组
  const nodesByEraAndLane = useMemo(() => {
    const result: Record<string, Record<CivilizationKey, IHistoryNode[]>> = {};
    for (const era of ERAS) {
      result[era.id] = {} as Record<CivilizationKey, IHistoryNode[]>;
      for (const lane of ACTIVE_LANES) {
        result[era.id][lane] = [];
      }
    }
    for (const node of filteredNodes) {
      const civ = node.civilization;
      if (!result[node.eraId]) continue;
      if (!result[node.eraId][civ]) result[node.eraId][civ] = [];
      result[node.eraId][civ].push(node);
    }
    for (const eraId of Object.keys(result)) {
      for (const lane of Object.keys(result[eraId])) {
        result[eraId][lane as CivilizationKey].sort((a, b) => a.year - b.year);
      }
    }
    return result;
  }, [filteredNodes]);

  // 每个泳道的节点总数
  const laneCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lane of ACTIVE_LANES) {
      let c = 0;
      for (const era of ERAS) {
        c += nodesByEraAndLane[era.id]?.[lane]?.length ?? 0;
      }
      counts[lane] = c;
    }
    return counts;
  }, [nodesByEraAndLane]);

  const toggleLane = (lane: CivilizationKey) => {
    setHiddenLanes((prev) =>
      prev.includes(lane) ? prev.filter((l) => l !== lane) : [...prev, lane],
    );
  };

  const scrollToEra = (eraId: string) => {
    const el = eraRefs.current[eraId];
    if (el && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: el.offsetTop - 44,
        behavior: 'smooth',
      });
    }
  };

  // 选中节点高亮同期判断
  const selectedRange = useMemo(() => {
    if (!selectedNode) return null;
    return getNodeTimeRange(selectedNode);
  }, [selectedNode]);

  const isContemporary = (node: IHistoryNode): boolean => {
    if (!selectedRange || node.id === selectedNode?.id) return false;
    const [s, e] = getNodeTimeRange(node);
    return !(e < selectedRange[0] || s > selectedRange[1]);
  };

  // 滚动监听当前时代
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handler = () => {
      const scrollTop = el.scrollTop;
      let current = ERAS[0]?.id ?? '';
      for (const era of ERAS) {
        const ref = eraRefs.current[era.id];
        if (ref && ref.offsetTop - 60 <= scrollTop) {
          current = era.id;
        }
      }
      setActiveEra(current);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  const laneWidth = LANE_WIDTH; // 单泳道宽
  const eraLabelWidth = ERA_LABEL_WIDTH; // 时代标签列宽

  return (
    <div className="flex h-full flex-col gap-3">
      {/* 顶部控制条 */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-card p-1 shadow-xs border border-border/50">
              <div className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer">
                <Layers className="size-3.5" />
                <span className="hidden sm:inline">{t('swimlane.title', '文明泳道')}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground tabular-nums">{filteredNodes.length}</span>
              <span className="mx-1">·</span>
              {visibleLanes.length} 条泳道
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={activeEra} onValueChange={scrollToEra}>
              <SelectTrigger className="h-8 w-[130px] text-xs">
                <SelectValue placeholder={t('swimlane.locateEra', '定位时代')} />
              </SelectTrigger>
              <SelectContent>
                {ERAS.map((era) => (
                  <SelectItem key={era.id} value={era.id} className="text-xs">
                    {ln(era)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 文明图例胶囊 */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {ACTIVE_LANES.map((lane) => {
            const hidden = hiddenLanes.includes(lane);
            const civ = CIVILIZATIONS[lane];
            return (
              <button
                key={lane}
                type="button"
                onClick={() => toggleLane(lane)}
                className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all"
                style={{
                  borderColor: hidden ? 'var(--border)' : `${civ.color}50`,
                  backgroundColor: hidden ? 'transparent' : `${civ.color}10`,
                  color: hidden ? 'var(--muted-foreground)' : civ.color,
                  opacity: hidden ? 0.45 : 1,
                }}
                aria-pressed={!hidden}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: civ.color }}
                />
                <span className="font-medium">{ln(civ)}</span>
                <span
                  className="tabular-nums"
                  style={{ fontSize: 10, opacity: 0.6 }}
                >
                  {laneCounts[lane] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 泳道主卡片 */}
      <div className="relative flex-1 overflow-hidden rounded-xl border border-border/50 bg-card/30 shadow-sm">
        <div
          ref={scrollContainerRef}
          className="relative h-full w-full overflow-auto"
          style={{ scrollbarGutter: 'stable' }}
        >
          <div
            className="relative"
            style={{
              width: eraLabelWidth + visibleLanes.length * laneWidth,
              minWidth: '100%',
            }}
          >
            {/* ============ 顶部 sticky 泳道头 ============ */}
            <div
              className="sticky top-0 z-30 flex border-b border-border/60 bg-card"
            >
              {/* 左上角空角 */}
              <div
                className="shrink-0 border-r border-border/50"
                style={{ width: eraLabelWidth }}
              />
              {visibleLanes.map((lane, idx) => {
                const civ = CIVILIZATIONS[lane];
                return (
                  <div
                    key={lane}
                    className="relative flex shrink-0 flex-col items-center justify-center gap-0.5 border-r border-border/30 py-3"
                    style={{
                      width: laneWidth,
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--muted) 40%, transparent)',
                    }}
                  >
                    {/* 顶部文明色条 */}
                    <div
                      className="absolute left-0 right-0 top-0 h-[3px]"
                      style={{ backgroundColor: civ.color }}
                    />
                    <span
                      className="text-sm font-bold font-display leading-tight"
                      style={{ color: civ.color }}
                    >
                      {ln(civ)}
                    </span>
                    <span
                      className="tabular-nums text-[10px] text-muted-foreground"
                    >
                      {laneCounts[lane] ?? 0} 个节点
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ============ 时代 + 泳道内容 ============ */}
            <div className="relative">
              {ERAS.map((era) => {
  
                const hasAny = visibleLanes.some(
                  (l) => nodesByEraAndLane[era.id]?.[l]?.length > 0,
                );
                if (!hasAny) return null;
                const isActive = activeEra === era.id;

                return (
                  <div
                    key={era.id}
                    ref={(el) => {
                      eraRefs.current[era.id] = el;
                    }}
                    className="relative border-b border-border/30 last:border-b-0"
                    style={{
                      backgroundColor: isActive
                        ? 'color-mix(in srgb, var(--primary) 6%, transparent)'
                        : 'transparent',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    {/* 时代左侧 sticky 标签列 */}
                    <div
                      className="sticky left-0 z-20 flex w-full items-stretch"
                      style={{ width: eraLabelWidth }}
                    >
                      <div
                        className="sticky left-0 z-20 flex shrink-0 flex-col items-center justify-start gap-1 border-r border-border/50 py-6 bg-card"
                        style={{ width: eraLabelWidth }}
                      >
                        {/* 时代色条 */}
                        <div
                          className="h-6 w-[2px] rounded-full"
                          style={{ backgroundColor: era.accent, opacity: 0.6 }}
                        />
                        <span
                          className="font-display text-[11px] font-bold tracking-widest"
                          style={{
                            color: isActive ? era.accent : 'var(--muted-foreground)',
                            writingMode: 'vertical-rl',
                            letterSpacing: '0.15em',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {ln(era)}
                        </span>
                        <span
                          className="tabular-nums text-[9px]"
                          style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                        >
                          {formatYear(era.startYear)} ~ {formatYear(era.endYear)}
                        </span>
                      </div>
                    </div>

                    {/* 泳道斑马纹背景（绝对定位） */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      {visibleLanes.map((lane, idx) => (
                        <div
                          key={lane}
                          className="absolute top-0 h-full border-r border-border/15"
                          style={{
                            left: eraLabelWidth + idx * laneWidth,
                            width: laneWidth,
                            backgroundColor:
                              idx % 2 === 0
                                ? 'transparent'
                                : 'color-mix(in srgb, var(--muted) 25%, transparent)',
                          }}
                        />
                      ))}
                    </div>

                    {/* 同期参考线（选中时） */}
                    {selectedRange && (
                      <div
                        className="pointer-events-none absolute z-[1] left-0 right-0 border-y border-dashed"
                        style={{
                          top: '50%',
                          borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    )}

                    {/* 节点行 */}
                    <div className="absolute inset-0">
                      <div
                        className="absolute left-0 top-0 h-full"
                        style={{ width: eraLabelWidth, flexShrink: 0 }}
                      />
                      {visibleLanes.map((lane, laneIndex) => {
                        const nodes = nodesByEraAndLane[era.id]?.[lane] ?? [];
                        const civ = CIVILIZATIONS[lane];
                        const laneLeft = eraLabelWidth + laneIndex * laneWidth;
                        return (
                          <div
                            key={lane}
                            className="absolute top-0 flex flex-col gap-1.5 px-2.5 py-3 [content-visibility:auto] [contain-intrinsic-size:auto_1000px]"
                            style={{
                              left: laneLeft,
                              width: laneWidth,
                              height: '100%',
                            }}
                          >
                            {nodes.map((node) => {
  
                              const isSelected = selectedNode?.id === node.id;
                              const contemp = isContemporary(node);
                              return (
                                <button
                                  key={node.id}
                                  type="button"
                                  onClick={() => openDetail(node)}
                                  className="group relative min-h-[44px] cursor-pointer rounded-lg border px-2 py-1.5 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]"
                                  style={{
                                    borderColor: node.important
                                      ? `${civ.color}80`
                                      : isSelected
                                        ? civ.color
                                        : 'color-mix(in srgb, var(--border) 80%, transparent)',
                                    backgroundColor: isSelected
                                      ? `${civ.color}18`
                                      : 'var(--card)',
                                    boxShadow: node.important
                                      ? `0 0 0 1px ${civ.color}20, 0 2px 8px ${civ.color}15`
                                      : isSelected
                                        ? `0 0 0 1px ${civ.color}40`
                                        : 'var(--shadow-resting)',
                                  }}
                                  aria-label={nt(node)}
                                  title={nt(node)}
                                >
                                  {/* 左侧色条 */}
                                  <span
                                    className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                                    style={{ backgroundColor: civ.color }}
                                  />
                                  <div className="flex items-start gap-1.5 pl-1.5">
                                      <div className="mt-0.5">
                                      <NodeTypeDot type={node.type} color={civ.color} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div
                                        className="tabular-nums text-[10px] font-medium leading-tight opacity-85"
                                        style={{ color: civ.color }}
                                      >
                                        {ny(node.yearDisplay)}
                                      </div>
                                      <div
                                        className="line-clamp-2 text-[12px] font-medium leading-snug text-foreground"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                      >
                                        {nt(node)}
                                      </div>
                                    </div>
                                  </div>
                                  {/* 争议徽标 */}
                                  {node.disputed && (
                                    <span
                                      className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-warning"
                                      title={t('swimlane.disputed', '存在争议')}
                                    />
                                  )}
                                  {/* 同期高亮金点 */}
                                  {contemp && (
                                    <span
                                      className="absolute -right-1 -top-1 z-10 size-2.5 rounded-full bg-primary ring-2 ring-background"
                                      style={{ boxShadow: `0 0 6px var(--primary)` }}
                                    />
                                  )}
                                  {/* 重要节点金角 */}
                                  {node.important && (
                                    <span
                                      className="absolute right-1.5 bottom-1.5 text-[8px]"
                                      style={{ color: civ.color }}
                                    >
                                     
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                            {nodes.length === 0 && (
                              <div className="flex flex-1 items-center justify-center text-[10px] text-muted-foreground/40">
                                —
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* 高度撑高（由内容最高的 lane 决定） */}
                    <div className="invisible flex">
                      <div style={{ width: eraLabelWidth, flexShrink: 0 }} />
                      {visibleLanes.map((lane) => {
                        const nodes = nodesByEraAndLane[era.id]?.[lane] ?? [];
                        return (
                          <div
                            key={lane}
                            className="px-2.5 py-3"
                            style={{ width: laneWidth, flexShrink: 0 }}
                          >
                            {nodes.map((n) => (
                              <div
                                key={n.id}
                                className="mb-1.5 min-h-[44px]"
                              />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center text-[10px] text-muted-foreground">
        横向滑动查看更多文明 · 纵向滑动浏览不同时代 · 点击节点查看详情
      </div>
    </div>
  );
});

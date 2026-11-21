// EXPORTS: HistoryProjector
// 历史放映机：全屏自动播放模式，展示全球历史动态演进

import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  X,
  SkipBack,
  SkipForward,
  RotateCcw,
  Plus,
  Minus,
  Gauge,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { EMPIRES, type IEmpire } from '@/data/empires';
import { HISTORY_ROUTES } from '@/data/routes';
import {
  ALL_HISTORY_NODES_INDEX,
  ERAS,
  CIVILIZATIONS,
  type IHistoryNodeIndex,
  type CivilizationKey,
} from '@/data/history-index';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n } from '@/i18n';
import { getCivilizationName } from '@/data/i18n/content-i18n';
import { getNodeTimeRange } from '../utils';
import {
  ERA_NARRATIONS,
  MILESTONE_IDS,
  SPEED_OPTIONS,
  progressToYear,
  yearToProgress,
  formatYear,
  createEmpirePolygons,
  createDivIcon,
  parseRouteEra,
} from './projector-utils';
import ProjectorControls from './ProjectorControls';
import ProjectorEventList from './ProjectorEventList';

interface HistoryProjectorProps {
  open: boolean;
  onClose: () => void;
  onOpenDetail: (node: IHistoryNodeIndex) => void;
  initialCivilization?: CivilizationKey | null;
}

export default memo(function HistoryProjector({
  open,
  onClose,
  onOpenDetail,
  initialCivilization,
}: HistoryProjectorProps) {
  const { t, ln, nt, lang } = useI18n();
  const isMobile = useIsMobile();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polygonLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const projectorRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0-100 非线性进度
  const [speed, setSpeed] = useState(1);
  const [currentYear, setCurrentYear] = useState(ERAS[0].startYear);
  // 当前时代完全由 currentYear 派生：游标突变（重置/跳时代/拖进度）时顶部
  // 大字、时代名、时代区间与事件流、地图标记在同一帧内一起更新，不再单独存 state。
  const currentEra = useMemo(() => {
    const found = ERAS.find((e) => currentYear >= e.startYear && currentYear < e.endYear);
    if (found) return found;
    return currentYear >= ERAS[ERAS.length - 1].endYear ? ERAS[ERAS.length - 1] : ERAS[0];
  }, [currentYear]);
  const [narrativeVisible, setNarrativeVisible] = useState(true);
  const [filterCiv, setFilterCiv] = useState<CivilizationKey | 'all'>('all');
  const [pulseNodeId, setPulseNodeId] = useState<string | null>(null);

  const playRef = useRef<number | null>(null);
  const lastEraRef = useRef<string | null>(null);
  const animFramesRef = useRef<number[]>([]);
  const narrativeTimerRef = useRef<number | null>(null);

  // 注册 rAF 帧，统一管理便于取消
  const trackRaf = (frameId: number) => {
    animFramesRef.current.push(frameId);
    return frameId;
  };
  const cancelAllTrackedRaf = () => {
    animFramesRef.current.forEach((id) => cancelAnimationFrame(id));
    animFramesRef.current = [];
  };

  // 初始化地图
  useEffect(() => {
    if (!open || !mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [20, 30],
      zoom: 2,
      minZoom: 2,
      maxZoom: 6,
      zoomControl: false,
      worldCopyJump: true,
      preferCanvas: true,
      // 完全锁定：只跟随播放年份自动定位
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      touchZoom: false,
      keyboard: false,
      closePopupOnClick: false,
      zoomSnap: 0,
      zoomDelta: 0,
      trackResize: false,
    });

    mapRef.current = map;

    // 锁定光标：不再是 grab
    map.getContainer().style.cursor = 'default';

    // 卫星底图
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 8,
      className: 'projector-tiles',
    }).addTo(map);

    // 地名层
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 8, opacity: 0.7 },
    ).addTo(map);

    const polyGroup = L.layerGroup().addTo(map);
    polygonLayerRef.current = polyGroup;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, [open]);

  // 事件流：纯派生值——所有 year <= currentYear 的重要节点，最新在前，上限 30 条
  // （任何改变游标/过滤的入口都会同步重算，不存在 rAF 步进滞后）
  const eventList = useMemo(() => {
    return ALL_HISTORY_NODES_INDEX.filter(
      (n) =>
        n &&
        n.important &&
        n.year <= currentYear &&
        (filterCiv === 'all' || n.civilization === filterCiv),
    )
      .sort((a, b) => b.year - a.year)
      .slice(0, 30);
  }, [currentYear, filterCiv]);

  // 当前年份下活跃的帝国
  const activeEmpires = useMemo(() => {
    let list = EMPIRES.filter((e) => currentYear >= e.startYear && currentYear <= e.endYear);
    if (filterCiv !== 'all') {
      list = list.filter((e) => e.civilization === filterCiv);
    }
    return list;
  }, [currentYear, filterCiv]);

  // 当前年份下显示的路线
  const visibleRoutes = useMemo(() => {
    return HISTORY_ROUTES.filter((r) => {
      const [s, e] = parseRouteEra(r.era);
      return currentYear >= s && currentYear <= e;
    });
  }, [currentYear]);

  // 渲染路线
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // 收集本批次路线的 rAF 帧 ID，effect 清理时统一取消
    const routeFrameIds: number[] = [];

    // 清理旧路线层
    if (routeLayerRef.current) {
      routeLayerRef.current.clearLayers();
      map.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (visibleRoutes.length === 0) return;

    const group = L.layerGroup();

    visibleRoutes.forEach((route) => {
      const latlngs = route.points.map((p) => [p.lat, p.lng] as [number, number]);
      const line = L.polyline(latlngs, {
        color: route.color,
        weight: 2.5,
        opacity: 0,
        dashArray: route.dashed ? '8 6' : undefined,
        lineJoin: 'round',
        lineCap: 'round',
      });

      line.bindTooltip(
        `<div style="font-size:12px;line-height:1.4;min-width:140px;">
          <div style="font-weight:600;color:${route.color};margin-bottom:2px;">${route.name}</div>
          <div style="color:#c9a96e;font-size:11px;">${route.era}</div>
          <div style="color:#aaa;font-size:10px;margin-top:2px;">${route.description}</div>
        </div>`,
        { direction: 'top', offset: [0, -6], opacity: 0.9 },
      );

      line.addTo(group);

      // 淡入
      let t = 0;
      let frameId = 0;
      const anim = () => {
        t += 0.05;
        if (t >= 1) {
          line.setStyle({ opacity: 0.75 });
          return;
        }
        line.setStyle({ opacity: 0.75 * t });
        frameId = requestAnimationFrame(anim);
        trackRaf(frameId);
        routeFrameIds.push(frameId);
      };
      frameId = requestAnimationFrame(anim);
      trackRaf(frameId);
      routeFrameIds.push(frameId);
    });

    group.addTo(map);
    routeLayerRef.current = group;

    return () => {
      // 清理本批次路线的淡入动画帧
      routeFrameIds.forEach((id) => cancelAnimationFrame(id));
      // 同时从全局追踪列表中移除
      animFramesRef.current = animFramesRef.current.filter(
        (id) => !routeFrameIds.includes(id),
      );
    };
  }, [visibleRoutes]);

  // 渲染疆域（带淡入淡出）
  useEffect(() => {
    if (!mapRef.current || !polygonLayerRef.current) return;
    // 疆域变化时取消未完成的淡入动画
    cancelAllTrackedRaf();

    const map = mapRef.current;
    const group = polygonLayerRef.current;

    // 清除旧图层
    group.clearLayers();

    if (activeEmpires.length === 0) return;

    activeEmpires.forEach((empire) => {
      const color =
        CIVILIZATIONS[empire.civilization as CivilizationKey]?.color ?? '#888';
      const polys = createEmpirePolygons(empire, color);
      polys.forEach((poly) => {
        poly.setStyle({ fillOpacity: 0, opacity: 0 });
        poly.addTo(group);
        // 淡入动画
        let opacity = 0;
        const targetFill = 0.28;
        const targetStroke = 0.85;
        const step = 0.04;
        let frameId = 0;
        const animate = () => {
          opacity += step;
          if (opacity >= 1) {
            poly.setStyle({ fillOpacity: targetFill, opacity: targetStroke });
            return;
          }
          poly.setStyle({
            fillOpacity: targetFill * opacity,
            opacity: targetStroke * opacity,
          });
          frameId = requestAnimationFrame(animate);
          trackRaf(frameId);
        };
        frameId = requestAnimationFrame(animate);
        trackRaf(frameId);

        poly.bindTooltip(
          `<div style="font-size:12px;line-height:1.4;min-width:140px;">
            <div style="font-weight:600;color:${color};margin-bottom:2px;">${empire.name}</div>
            <div style="color:#c9a96e;font-size:11px;">${formatYear(empire.startYear)} — ${formatYear(empire.endYear)}</div>
          </div>`,
          { direction: 'top', offset: [0, -6], opacity: 0.9 },
        );
      });
    });
  }, [activeEmpires]);

  // 路线层变化时取消旧动画（隐含在上面的疆域 effect，但路线单独管）
  useEffect(() => {
    if (!mapRef.current) return;
    // 路线重绘前取消已追踪的动画
    // 注：路线动画帧也在 animFramesRef 中统一管理，这里不在此处 cancelAll
    // 因为在渲染路线 effect 内部每帧都会重新加入追踪，外层统一在卸载时清理
  }, []);

  // 当前年份节点点亮
  const visibleNodes = useMemo(() => {
    const year = currentYear;
    // 展示当前年份前后50年内的节点（重要节点放宽到100年）
    let nodes = ALL_HISTORY_NODES_INDEX.filter((n) => {
      if (!n || !n.location?.lat) return false;
      if (filterCiv !== 'all' && n.civilization !== filterCiv) return false;
      const [s, e] = getNodeTimeRange(n);
      // 重要节点：前后100年显示
      if (n.important) return year >= s - 100 && year <= e + 100;
      // 普通节点：前后30年
      return year >= s - 30 && year <= e + 30;
    });
    // 限制节点数量避免过载
    if (nodes.length > 80) {
      const important = nodes.filter((n) => n.important);
      const normal = nodes.filter((n) => !n.important).slice(0, 60 - important.length);
      nodes = [...important, ...normal];
    }
    return nodes;
  }, [currentYear, filterCiv]);

  // 更新节点标记
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // 清除不在可见列表里的节点
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      if (!visibleIds.has(id)) {
        marker.remove();
        delete markersRef.current[id];
      }
    });

    // 添加新节点
    visibleNodes.forEach((node) => {
  
      if (markersRef.current[node.id]) return;
      const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
      const marker = L.marker([node.location!.lat, node.location!.lng], {
        icon: createDivIcon(civColor, node.important ?? false),
        riseOnHover: true,
      }).addTo(map);

      marker.on('click', () => {
        onOpenDetail(node);
        setIsPlaying(false);
      });

      marker.bindTooltip(
        `<div style="font-size:11px;line-height:1.3;">
          <div style="font-weight:600;margin-bottom:1px;">${nt(node)}</div>
          <div style="color:#c9a96e;font-size:10px;">${node.yearDisplay}</div>
        </div>`,
        { direction: 'top', offset: [0, -6], opacity: 0.85 },
      );

      markersRef.current[node.id] = marker;
    });
  }, [visibleNodes, onOpenDetail]);

  // 里程碑脉冲强调
  useEffect(() => {
    // 如果当前年份接近某个重要节点，触发脉冲
    const milestone = ALL_HISTORY_NODES_INDEX.find(
      (n) =>
        n &&
        n.important &&
        Math.abs(n.year - currentYear) < 5 &&
        MILESTONE_IDS.includes(n.id),
    );
    if (milestone && pulseNodeId !== milestone.id) {
      setPulseNodeId(milestone.id);
      const timer = setTimeout(() => setPulseNodeId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentYear, pulseNodeId]);

  // 播放逻辑
  useEffect(() => {
    if (!isPlaying || !open) {
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
        playRef.current = null;
      }
      return;
    }

    let lastTime = performance.now();
    const totalDuration = 180; // 1x下180秒播完

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setProgress((prev) => {
        const progressPerSecond = (100 / totalDuration) * speed;
        let next = prev + delta * progressPerSecond;

        // 到达终点
        if (next >= 100) {
          setIsPlaying(false);
          return 100;
        }

        const year = progressToYear(next);
        setCurrentYear(year);

        // 时代切换检测
        const era = ERAS.find((e) => year >= e.startYear && year < e.endYear) ?? ERAS[0];
        if (lastEraRef.current !== era.id) {
          lastEraRef.current = era.id;
          setNarrativeVisible(true);
          // 5秒后隐藏解说
          if (narrativeTimerRef.current) clearTimeout(narrativeTimerRef.current);
          narrativeTimerRef.current = window.setTimeout(() => setNarrativeVisible(false), 6000);
        }

        return next;
      });

      playRef.current = requestAnimationFrame(step);
    };

    playRef.current = requestAnimationFrame(step);

    return () => {
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
        playRef.current = null;
      }
    };
  }, [isPlaying, open, speed, filterCiv]);

  // 重置（游标、事件流、已显示集合同步归零）
  const handleReset = useCallback(() => {
    // 先停掉所有已注册的 rAF 帧，防止旧帧在 setState 前回写事件流造成残留
    cancelAllTrackedRaf();
    if (playRef.current) {
      cancelAnimationFrame(playRef.current);
      playRef.current = null;
    }
    setProgress(0);
    setCurrentYear(ERAS[0].startYear);
    lastEraRef.current = null;
    setPulseNodeId(null);
    setIsPlaying(true);
  }, []);

  // 跳到某个时代（事件流按新起点重建累积日志）
  const jumpToEra = useCallback((eraIdx: number) => {
    const era = ERAS[eraIdx];
    if (!era) return;
    const p = yearToProgress(era.startYear);
    setProgress(p);
    setCurrentYear(era.startYear);
    lastEraRef.current = era.id;
    setNarrativeVisible(true);
    if (narrativeTimerRef.current) clearTimeout(narrativeTimerRef.current);
    narrativeTimerRef.current = window.setTimeout(() => setNarrativeVisible(false), 6000);
  }, [filterCiv]);

  // 手动调整进度条（事件流按新年份重建累积日志）
  const handleProgressChange = useCallback((value: number[]) => {
    const p = value[0];
    setProgress(p);
    const year = progressToYear(p);
    setCurrentYear(year);
    const era = ERAS.find((e) => year >= e.startYear && year < e.endYear) ?? ERAS[0];
    if (lastEraRef.current !== era.id) {
      lastEraRef.current = era.id;
      setNarrativeVisible(true);
      if (narrativeTimerRef.current) clearTimeout(narrativeTimerRef.current);
      narrativeTimerRef.current = window.setTimeout(() => setNarrativeVisible(false), 6000);
    }
  }, [filterCiv]);

  // 切换文明过滤（事件流由 useMemo 随 filterCiv 自动重算）
  const handleCivChange = useCallback((val: string) => {
    const civ = val as CivilizationKey | 'all';
    setFilterCiv(civ);
  }, []);

  // 关闭时清理 + 焦点陷阱管理
  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
        playRef.current = null;
      }
      cancelAllTrackedRaf();
      if (narrativeTimerRef.current) {
        clearTimeout(narrativeTimerRef.current);
        narrativeTimerRef.current = null;
      }
      // 焦点返回触发元素
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus({ preventScroll: true });
        previouslyFocusedRef.current = null;
      }
      return;
    }

    // 打开时：保存当前焦点 + 移入放映机第一个可交互元素
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    // 等待 DOM 渲染后聚焦第一个可交互元素
    const focusTimer = window.setTimeout(() => {
      if (!projectorRef.current) return;
      const focusable = projectorRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length > 0) {
        focusable[0].focus({ preventScroll: true });
      }
    }, 50);

    // 焦点陷阱：Tab/Shift+Tab 在内部循环
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !projectorRef.current) return;
      const focusable = projectorRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // 重置播放状态
    handleReset();
    if (initialCivilization) {
      setFilterCiv(initialCivilization);
    }

    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleReset, initialCivilization]);

  if (!open) return null;

  // 用 portal 挂到 body：彻底避开任何祖先的 transform / filter / backdrop-filter
  // 成为 fixed 的 containing block（那会让 fixed 相对祖先定位，出现"有 rect 但命中不到"）。
  return createPortal(
    <div
      ref={projectorRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('nt(projector)', '历史放映机')}
      className="fixed inset-0 z-[9999] bg-background"
      style={{ pointerEvents: 'auto' }}
    >
      {/* 地图全屏 */}
      <div ref={mapContainerRef} className="absolute inset-0 cursor-default" style={{ isolation: 'isolate' }} />

      {/* 顶部信息栏 */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          {/* 左上：年份 + 时代 */}
          <div className="pointer-events-auto">
            <div className="rounded-xl border border-border bg-card px-5 py-3 shadow-lg">
              <div
                className="font-display text-4xl font-bold tabular-nums text-foreground md:text-5xl"
                style={{ color: currentEra.accent }}
              >
                {formatYear(currentYear)}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className="text-sm font-semibold"
                  style={{ color: currentEra.accent, fontFamily: 'var(--font-display)' }}
                >
                  {ln(currentEra)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatYear(currentEra.startYear)} — {formatYear(currentEra.endYear)}
                </span>
              </div>
            </div>
          </div>

          {/* 右上：关闭按钮 */}
          <div className="pointer-events-auto flex items-start gap-2">
            <Select value={filterCiv} onValueChange={handleCivChange}>
              <SelectTrigger className="!h-11 w-36 bg-card text-xs">
                <SelectValue placeholder={t('projector.filterCivilization', '全部文明')} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all"> {t('projector.filterCivilization', '全部文明')}</SelectItem>
                {Object.entries(CIVILIZATIONS).map(([key, info]) => (
                  <SelectItem key={key} value={key} className="text-xs">
                    <span className="mr-2 inline-block size-2 rounded-full" style={{ backgroundColor: info.color }} />
                    {getCivilizationName(key as CivilizationKey, lang)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-11 w-11 bg-card hover:bg-card"
              aria-label={t('projector.close', '退出放映机')}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* 时代解说卡 */}
        <AnimatePresence>
          {narrativeVisible && (
            <motion.div
              key={currentEra.id + '-narr'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pointer-events-auto mt-3 max-w-xl rounded-xl border border-border bg-card px-4 py-3 text-sm leading-relaxed text-foreground/90 shadow-lg"
              style={{ borderColor: `${currentEra.accent}40` }}
            >
              <p className="font-display" style={{ color: currentEra.accent }}>
                {ERA_NARRATIONS[currentEra.id] ?? currentEra.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 右侧事件流（桌面端） */}
      {!isMobile && (
        <ProjectorEventList
          eventList={eventList}
          isMobile={isMobile}
          onOpenDetail={onOpenDetail}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* 底部控制条 */}
      <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-20" style={{ isolation: 'isolate' }}>
        {/* 移动端事件流（底部） */}
        {isMobile && (
          <ProjectorEventList
            eventList={eventList}
            isMobile={isMobile}
            onOpenDetail={onOpenDetail}
            onPause={() => setIsPlaying(false)}
          />
        )}

        <ProjectorControls
          progress={progress}
          currentEraId={currentEra.id}
          isPlaying={isPlaying}
          speed={speed}
          onProgressChange={handleProgressChange}
          onReset={handleReset}
          onJumpToEra={jumpToEra}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onSpeedChange={setSpeed}
        />
      </div>
    </div>,
    document.body,
  );
});

// EXPORTS: TimeSlider
import { useRef, useState, useCallback, useEffect, memo } from 'react';
import { Play, Pause, ZoomIn, ZoomOut, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ERAS } from '@/data/history-constants';
import { useI18n } from '@/i18n';
import type { HistoryState } from './useHistoryStore';

interface TimeSliderProps {
  store: HistoryState;
}

// === 分段非线性映射 ===
const PREHISTORY_PCT = 0.25;
const CIVILIZATION_PCT = 0.75;
const PREHISTORY_START = -3000000;
const CIVILIZATION_START = -4000;
const MAX_YEAR = 2026;

function pctToYear(pct: number): number {
  if (pct <= PREHISTORY_PCT) {
    const t = pct / PREHISTORY_PCT;
    return PREHISTORY_START + t * (CIVILIZATION_START - PREHISTORY_START);
  }
  const t = (pct - PREHISTORY_PCT) / CIVILIZATION_PCT;
  return CIVILIZATION_START + t * (MAX_YEAR - CIVILIZATION_START);
}

function yearToPct(year: number): number {
  if (year <= CIVILIZATION_START) {
    const t = (year - PREHISTORY_START) / (CIVILIZATION_START - PREHISTORY_START);
    return Math.max(0, Math.min(1, t * PREHISTORY_PCT));
  }
  const t = (year - CIVILIZATION_START) / (MAX_YEAR - CIVILIZATION_START);
  return PREHISTORY_PCT + Math.max(0, Math.min(1, t)) * CIVILIZATION_PCT;
}

import { formatYear } from './utils';

export default memo(function TimeSlider({ store }: TimeSliderProps) {
  const { t } = useI18n();
  const {
    timeRange,
    setTimeRange,
    currentEra,
    setCurrentEraByYear,
    isPlaying,
    playProgress,
    togglePlay,
  } = store;

  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  // rAF 节流：拖动时每帧最多更新一次，避免高频 set 造成 UI 卡顿
  const rafRef = useRef<number | null>(null);
  const pendingRangeRef = useRef<[number, number] | null>(null);

  const setTimeRangeThrottled = useCallback(
    (range: [number, number]) => {
      pendingRangeRef.current = range;
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (pendingRangeRef.current) {
          setTimeRange(pendingRangeRef.current);
        }
        rafRef.current = null;
      });
    },
    [setTimeRange],
  );

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const minYear = PREHISTORY_START;
  const maxYear = MAX_YEAR;

  const handlePointerDown = (type: 'start' | 'end') => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(type);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || !trackRef.current) return;
    e.preventDefault();
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const year = pctToYear(pct);

    const minGapPct = 0.03;
    if (dragging === 'start') {
      const endPct = yearToPct(timeRange[1]);
      const maxStartPct = Math.max(0, endPct - minGapPct);
      const maxStartYear = pctToYear(maxStartPct);
      const clamped = Math.max(minYear, Math.min(year, maxStartYear));
      setTimeRangeThrottled([clamped, timeRange[1]]);
    } else {
      const startPct = yearToPct(timeRange[0]);
      const minEndPct = Math.min(1, startPct + minGapPct);
      const minEndYear = pctToYear(minEndPct);
      const clamped = Math.min(maxYear, Math.max(year, minEndYear));
      setTimeRangeThrottled([timeRange[0], clamped]);
    }
  };

  const handlePointerUp = (type: 'start' | 'end') => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    setTimeout(() => setDragging(null), 0);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    if (dragging) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickPct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const year = pctToYear(clickPct);
    const windowPct = 0.1;
    const startPct = Math.max(0, clickPct - windowPct);
    const endPct = Math.min(1, clickPct + windowPct);
    setTimeRange([Math.round(pctToYear(startPct)), Math.round(pctToYear(endPct))]);
    setCurrentEraByYear(year);
  };

  // hover 年份用 rAF 节流
  const hoverRafRef = useRef<number | null>(null);
  const handleTrackHover = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    if (hoverRafRef.current !== null) return;
    hoverRafRef.current = requestAnimationFrame(() => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      setHoverYear(pctToYear(pct));
      hoverRafRef.current = null;
    });
  };

  const zoomIn = () => {
    const sPct = yearToPct(timeRange[0]);
    const ePct = yearToPct(timeRange[1]);
    const centerPct = (sPct + ePct) / 2;
    const span = (ePct - sPct) * 0.6;
    const newStart = Math.max(0, centerPct - span / 2);
    const newEnd = Math.min(1, centerPct + span / 2);
    setTimeRange([
      Math.round(pctToYear(newStart)),
      Math.min(maxYear, Math.round(pctToYear(newEnd))),
    ]);
  };

  const zoomOut = () => {
    const sPct = yearToPct(timeRange[0]);
    const ePct = yearToPct(timeRange[1]);
    const centerPct = (sPct + ePct) / 2;
    const span = (ePct - sPct) * 1.5;
    const newStart = Math.max(0, centerPct - span / 2);
    const newEnd = Math.min(1, centerPct + span / 2);
    setTimeRange([
      Math.max(minYear, Math.round(pctToYear(newStart))),
      Math.min(maxYear, Math.round(pctToYear(newEnd))),
    ]);
  };

  const startPct = yearToPct(timeRange[0]) * 100;
  const endPct = yearToPct(Math.min(timeRange[1], maxYear)) * 100;
  const hoverPct = hoverYear !== null ? yearToPct(hoverYear) * 100 : null;

  const [mobileExpanded, setMobileExpanded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 移动端：点击条外区域收起播放条
  useEffect(() => {
    if (!mobileExpanded) return;
    function onDocClick(e: MouseEvent) {
      if (sliderRef.current && !sliderRef.current.contains(e.target as Node)) {
        setMobileExpanded(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [mobileExpanded]);

  const eraTicks = ERAS.map((era) => ({
    ...era,
    startPct: yearToPct(era.startYear) * 100,
    endPct: yearToPct(Math.min(era.endYear, MAX_YEAR)) * 100,
  }));

  // === 轨道内容（可复用组件，桌面和移动共用） ===
  const TrackContent = () => (
    <div className="relative h-7">
      {/* 时代分段背景 */}
      <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden">
        <div className="relative h-full w-full">
          {eraTicks.map((era) => (
            <div
              key={era.id}
              className="absolute inset-y-0 transition-all duration-500"
              style={{
                left: `${era.startPct}%`,
                width: `${era.endPct - era.startPct}%`,
                backgroundColor: `${era.accent}40`,
              }}
              title={era.name}
            />
          ))}
        </div>
      </div>

      {/* 史前/文明史分界 */}
      <div
        className="absolute top-0 z-[1] h-full w-px bg-primary/40"
        style={{ left: `${PREHISTORY_PCT * 100}%` }}
      />

      {/* 选中区间高亮 */}
      <div
        className="absolute top-1/2 h-[2px] -translate-y-1/2 transition-all"
        style={{
          left: `${startPct}%`,
          width: `${endPct - startPct}%`,
          backgroundColor: '#C0392B',
        }}
      />

      {/* 播放进度指示 */}
      {isPlaying && (
        <div
          className="absolute top-1/2 z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${playProgress}%`,
            backgroundColor: '#C0392B',
          }}
        />
      )}

      {/* 悬浮指示 */}
      {hoverPct !== null && !dragging && (
        <div
          className="absolute top-0 z-10 h-full w-px bg-white/40"
          style={{ left: `${hoverPct}%` }}
        />
      )}

      {/* 左滑块 */}
      <div
        className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: `${startPct}%` }}
      >
        <div
          className="absolute h-11 w-11 cursor-ew-resize touch-none"
          onPointerDown={handlePointerDown('start')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp('start')}
          onPointerCancel={handlePointerUp('start')}
          onDoubleClick={(e) => e.stopPropagation()}
        />
        <div className="pointer-events-none h-5 w-3 rounded-[2px] border border-border bg-card transition-transform group-hover:scale-110">
          <div className="flex h-full flex-col items-center justify-center gap-0.5">
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
          </div>
        </div>
      </div>

      {/* 右滑块 */}
      <div
        className="absolute top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ left: `${endPct}%` }}
      >
        <div
          className="absolute h-11 w-11 cursor-ew-resize touch-none"
          onPointerDown={handlePointerDown('end')}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp('end')}
          onPointerCancel={handlePointerUp('end')}
          onDoubleClick={(e) => e.stopPropagation()}
        />
        <div className="pointer-events-none h-5 w-3 rounded-[2px] border border-border bg-card transition-transform group-hover:scale-110">
          <div className="flex h-full flex-col items-center justify-center gap-0.5">
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
            <span className="block h-0.5 w-1 rounded-full bg-muted-foreground" />
          </div>
        </div>
      </div>

      {/* 移动端关键刻度标签（只显示前5个时代的缩写） */}
      <div className="pointer-events-none absolute -bottom-3 left-0 right-0 hidden md:block">
        {eraTicks.map((era) => {
          const midPct = (era.startPct + era.endPct) / 2;
          // 只显示宽度 > 8% 的时代标签
          const eraWidth = era.endPct - era.startPct;
          if (eraWidth < 6) return null;
          return (
            <div
              key={`label-${era.id}`}
              className="absolute -translate-x-1/2 whitespace-nowrap text-[9px] text-muted-foreground/70"
              style={{ left: `${midPct}%`, top: '100%' }}
            >
              {era.name.length > 4 ? era.name.slice(0, 4) : era.name}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      ref={sliderRef}
      className="sticky bottom-[72px] md:bottom-0 z-[45] border-t border-foreground/10 bg-background px-3 md:px-4 md:pb-3 md:pt-3 md:z-30"
      style={{
        paddingBottom: mobileExpanded
          ? 'calc(8px + 56px)'
          : '8px',
        paddingTop: '8px',
      }}
    >
      {/* 移动端：默认折叠态（一行）/ 展开态（两行） */}
      <div className="md:hidden">
        {/* 上行：播放 + 时代名/年份 + 展开按钮  —— 始终显示 */}
        <button
          type="button"
          onClick={() => setMobileExpanded((v) => !v)}
          className="flex min-h-[44px] w-full items-center gap-2 text-left"
          aria-expanded={mobileExpanded}
          aria-label={mobileExpanded ? t('timelineControl.collapse', '收起时间轴') : t('timelineControl.expand', '展开时间轴')}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-foreground/15 bg-background/60 hover:bg-accent/20 transition-colors">
            <Play className={`size-4 ${isPlaying ? 'animate-pulse' : ''}`} style={{ color: currentEra.accent }} />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-bold font-serif"
              style={{ color: currentEra.accent }}
            >
              {currentEra.name}
            </p>
            <p className="truncate text-[11px] text-muted-foreground tabular-nums">
              {formatYear(timeRange[0], { maxYear: MAX_YEAR })} ~ {formatYear(timeRange[1], { maxYear: MAX_YEAR })}
            </p>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center">
            <ChevronUp
              className={`size-4 text-muted-foreground transition-transform ${mobileExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* 下行：轨道 + 缩放 —— 展开时显示 */}
        {mobileExpanded && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-end gap-0.5">
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-muted-foreground hover:text-foreground"
                onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                aria-label={t('timelineControl.zoomOut', '缩小')}
              >
                <ZoomOut className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 text-muted-foreground hover:text-foreground"
                onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                aria-label={t('timelineControl.zoomIn', '放大')}
              >
                <ZoomIn className="size-4" />
              </Button>
            </div>
            <div
              ref={trackRef}
              className="relative w-full pt-1"
              onClick={(e) => { e.stopPropagation(); handleTrackClick(e as any); }}
            >
              <TrackContent />
            </div>
          </div>
        )}
      </div>

      {/* 桌面端：单行布局 */}
      <div className="hidden items-center gap-3 md:flex">
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 shrink-0 !rounded-[2px] border border-foreground/15"
          onClick={togglePlay}
          style={{
            color: isPlaying ? '#C0392B' : undefined,
            borderColor: isPlaying ? '#C0392B50' : undefined,
          }}
          aria-label={isPlaying ? t('timelineControl.pause', '暂停') : t('timelineControl.play', '播放')}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>

        <div className="hidden w-28 shrink-0 sm:block">
          <p
            className="text-sm font-bold"
            style={{ color: currentEra.accent, fontFamily: 'var(--font-display)' }}
          >
            {currentEra.name}
          </p>
        </div>

        <div
          ref={trackRef}
          className="group relative flex-1 pb-4"
          onClick={handleTrackClick}
          onMouseMove={handleTrackHover}
          onMouseLeave={() => setHoverYear(null)}
        >
          <TrackContent />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 text-muted-foreground hover:text-foreground"
            onClick={zoomOut}
            aria-label={t('timelineControl.zoomOut', '缩小')}
          >
            <ZoomOut className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 text-muted-foreground hover:text-foreground"
            onClick={zoomIn}
            aria-label={t('timelineControl.zoomIn', '放大')}
          >
            <ZoomIn className="size-4" />
          </Button>
        </div>

        <div className="hidden w-32 shrink-0 text-right sm:block">
          <p className="text-[10px] text-muted-foreground">{t('timelineControl.currentRange', '当前范围')}</p>
          <p className="text-xs font-medium tabular-nums text-foreground">
            {formatYear(timeRange[0], { maxYear: MAX_YEAR })}
            <span className="mx-1 text-muted-foreground">~</span>
            {formatYear(timeRange[1], { maxYear: MAX_YEAR })}
          </p>
        </div>
      </div>
    </div>
  );
});

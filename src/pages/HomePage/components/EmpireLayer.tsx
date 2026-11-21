// EXPORTS: EmpireLayer
// 帝国疆域图层：淡入淡出过渡 + 层级管理 + 悬停交互

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import L from 'leaflet';
import { EMPIRES, type IEmpire } from '@/data/empires';
import { CIVILIZATIONS } from '@/data/history-index';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Crown, Star } from 'lucide-react';
import { formatYear } from '@/pages/HomePage/year-utils';

interface EmpireLayerProps {
  map: L.Map | null;
  currentYear: number;
  mode: 'off' | 'concurrent' | 'peak';
  selectedEmpireId?: string | null;
  showNodes?: boolean;
  onSelectEmpire?: (empire: IEmpire) => void;
}

// 淡入动画时长
const FADE_DURATION = 350; // ms
// 疆域填充透明度
const EMPIRE_FILL_OPACITY = 0.22;
// 疆域描边透明度
const EMPIRE_STROKE_OPACITY = 0.85;
// 疆域描边宽度（px）
const EMPIRE_STROKE_WIDTH = 1.5;
// 都城 marker 半径（px）
const EMPIRE_CAPITAL_RADIUS = 4;

// 创建疆域多边形（初始透明，后续淡入）
function createEmpirePolygon(empire: IEmpire, color: string): L.Polygon[] {
  return empire.polygons.map((ring) =>
    L.polygon(ring as L.LatLngTuple[], {
      color,
      weight: EMPIRE_STROKE_WIDTH,
      opacity: 0, // 初始透明
      fillColor: color,
      fillOpacity: 0,
      lineJoin: 'round',
      lineCap: 'round',
      interactive: true,
      pane: 'empire-polygons',
    }),
  );
}

function createCapitalMarker(empire: IEmpire, color: string): L.CircleMarker {
  return L.circleMarker([empire.capital.lat, empire.capital.lng], {
    radius: EMPIRE_CAPITAL_RADIUS,
    color: '#fff',
    weight: 1.5,
    fillColor: color,
    fillOpacity: 0,
    pane: 'empire-capitals',
  });
}

// 淡入多边形，返回 cancel 函数
function fadeInPolygons(polygons: L.Polygon[], fillOp = EMPIRE_FILL_OPACITY): () => void {
  let frameId = 0;
  const start = performance.now();
  const startFill = 0;
  const endFill = fillOp;
  const startStroke = 0;
  const endStroke = EMPIRE_STROKE_OPACITY;

  function tick(now: number) {
    const t = Math.min((now - start) / FADE_DURATION, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3);
    const curFill = startFill + (endFill - startFill) * eased;
    const curStroke = startStroke + (endStroke - startStroke) * eased;
    polygons.forEach((poly) => {
      try {
        poly.setStyle({
          fillOpacity: curFill,
          opacity: curStroke,
        });
      } catch {
        // 图层可能已被移除
      }
    });
    if (t < 1) {
      frameId = requestAnimationFrame(tick);
    }
  }
  frameId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frameId);
}

// 淡出多边形，完成后执行回调，返回 cancel 函数
function fadeOutPolygons(
  polygons: L.Polygon[],
  onComplete?: () => void,
): () => void {
  let frameId = 0;
  let done = false;
  const start = performance.now();
  // 读取当前透明度作为起始值
  let startFill = EMPIRE_FILL_OPACITY;
  let startStroke = EMPIRE_STROKE_OPACITY;
  if (polygons[0]) {
    const s = polygons[0].options as { fillOpacity?: number; opacity?: number };
    if (typeof s.fillOpacity === 'number') startFill = s.fillOpacity;
    if (typeof s.opacity === 'number') startStroke = s.opacity;
  }

  function tick(now: number) {
    const t = Math.min((now - start) / FADE_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const curFill = startFill * (1 - eased);
    const curStroke = startStroke * (1 - eased);
    polygons.forEach((poly) => {
      try {
        poly.setStyle({
          fillOpacity: curFill,
          opacity: curStroke,
        });
      } catch {
        // 图层可能已被移除
      }
    });
    if (t < 1) {
      frameId = requestAnimationFrame(tick);
    } else {
      done = true;
      onComplete?.();
    }
  }
  frameId = requestAnimationFrame(tick);
  return () => {
    if (!done) cancelAnimationFrame(frameId);
  };
}

// 淡入首都标记，返回 cancel 函数
function fadeInMarkers(markers: L.CircleMarker[]): () => void {
  let frameId = 0;
  const start = performance.now();
  function tick(now: number) {
    const t = Math.min((now - start) / FADE_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    markers.forEach((m) => {
      try {
        m.setStyle({ fillOpacity: eased });
      } catch {
        // 图层可能已被移除
      }
    });
    if (t < 1) frameId = requestAnimationFrame(tick);
  }
  frameId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frameId);
}

export default function EmpireLayer({
  map,
  currentYear,
  mode,
  selectedEmpireId,
  onSelectEmpire,
}: EmpireLayerProps) {
  const isMobile = useIsMobile();
  const polyLayerRef = useRef<L.LayerGroup | null>(null);
  const capLayerRef = useRef<L.LayerGroup | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const animCancelRef = useRef<Array<() => void>>([]);
  const [hoveredEmpire, setHoveredEmpire] = useState<IEmpire | null>(null);
  const [concurrentPanelOpen, setConcurrentPanelOpen] = useState(false);

  // 获取当前年份下存在的帝国
  const empiresAtYear = useMemo(() => {
    if (mode === 'off') return [];
    if (mode === 'peak' && selectedEmpireId) {
      const e = EMPIRES.find((x) => x.id === selectedEmpireId);
      return e ? [e] : [];
    }
    return EMPIRES.filter(
      (e) => currentYear >= e.startYear && currentYear <= e.endYear,
    );
  }, [currentYear, mode, selectedEmpireId]);

  // 取消所有进行中的 rAF 动画
  const cancelAllAnimations = useCallback(() => {
    animCancelRef.current.forEach((fn) => fn());
    animCancelRef.current = [];
  }, []);

  // 确保 pane 存在并设置层级
  useEffect(() => {
    if (!map) return;
    // 疆域 polygon pane (在路线之下、节点之下)
    if (!map.getPane('empire-polygons')) {
      map.createPane('empire-polygons');
      const pane = map.getPane('empire-polygons');
      if (pane) pane.style.zIndex = '400'; // 低于默认 marker pane(600)、低于路线
    }
    // 首都 marker pane
    if (!map.getPane('empire-capitals')) {
      map.createPane('empire-capitals');
      const pane = map.getPane('empire-capitals');
      if (pane) pane.style.zIndex = '450';
    }
  }, [map]);

  // 渲染疆域（带淡入淡出）
  useEffect(() => {
    if (!map) return;

    // 清理旧图层（带淡出）
    const oldPolys: L.Polygon[] = [];
    const oldCaps: L.CircleMarker[] = [];

    if (polyLayerRef.current) {
      polyLayerRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polygon) oldPolys.push(layer);
      });
    }
    if (capLayerRef.current) {
      capLayerRef.current.eachLayer((layer) => {
        if (layer instanceof L.CircleMarker) oldCaps.push(layer);
      });
    }

    // 清除旧定时器和进行中的动画
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    cancelAllAnimations();

    // 如果没有新帝国：淡出后清理
    if (empiresAtYear.length === 0) {
      if (oldPolys.length > 0) {
        const cancel = fadeOutPolygons(oldPolys, () => {
          if (polyLayerRef.current) {
            polyLayerRef.current.clearLayers();
            map.removeLayer(polyLayerRef.current);
            polyLayerRef.current = null;
          }
          if (capLayerRef.current) {
            capLayerRef.current.clearLayers();
            map.removeLayer(capLayerRef.current);
            capLayerRef.current = null;
          }
        });
        animCancelRef.current.push(cancel);
      }
      return;
    }

    // 有新帝国：先淡出旧的，再淡入新的
    // 用本地变量保存 ref，避免闭包内 ref 指向新值（TDZ 安全）
    const polygonLayerRef = polyLayerRef;
    const capitalLayerRef = capLayerRef;

    const buildNewLayers = () => {
      const polyGroup = L.layerGroup();
      const capGroup = L.layerGroup();

      const newPolys: L.Polygon[] = [];
      const newCaps: L.CircleMarker[] = [];

      empiresAtYear.forEach((empire) => {
        const color =
          CIVILIZATIONS[empire.civilization as keyof typeof CIVILIZATIONS]?.color ??
          '#888';

        const polygons = createEmpirePolygon(empire, color);
        polygons.forEach((poly) => {
          poly.on('mouseover', () => {
            poly.setStyle({
              weight: 2.5,
              fillOpacity: 0.4,
              opacity: 1,
            });
            setHoveredEmpire(empire);
          });
          poly.on('mouseout', () => {
            poly.setStyle({
              weight: EMPIRE_STROKE_WIDTH,
              fillOpacity: EMPIRE_FILL_OPACITY,
              opacity: EMPIRE_STROKE_OPACITY,
            });
            setHoveredEmpire((prev) => (prev?.id === empire.id ? null : prev));
          });
          poly.on('click', () => {
            onSelectEmpire?.(empire);
          });
          poly.bindTooltip(
            `<div style="font-size: 12px; line-height: 1.5; min-width: 160px;">
              <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px; color: ${color};">${empire.name}</div>
              <div style="color: #c9a96e; font-size: 11px; margin-bottom: 2px;">
                ${formatYear(empire.startYear)}
                &nbsp;—&nbsp;
                ${formatYear(empire.endYear)}
              </div>
              <div style="font-size: 11px; color: #aaa;">首都：${empire.capital.name}</div>
              <div style="font-size: 11px; color: #888; margin-top: 3px;">${empire.brief}</div>
            </div>`,
            {
              direction: 'top',
              offset: [0, -6],
              opacity: 0.92,
              className: 'empire-tooltip',
            },
          );
          poly.addTo(polyGroup);
          newPolys.push(poly);
        });

        const cap = createCapitalMarker(empire, color);
        cap.bindTooltip(
          `<strong>${empire.capital.name}</strong><br/><span style="font-size: 11px; color: #aaa;">${empire.name}首都</span>`,
          {
            direction: 'top',
            offset: [0, -6],
            opacity: 0.85,
          },
        );
        cap.addTo(capGroup);
        newCaps.push(cap);
      });

      polyGroup.addTo(map);
      capGroup.addTo(map);
      polygonLayerRef.current = polyGroup;
      capitalLayerRef.current = capGroup;

      // 淡入
      requestAnimationFrame(() => {
        const cancelPoly = fadeInPolygons(newPolys);
        const cancelCap = fadeInMarkers(newCaps);
        animCancelRef.current.push(cancelPoly, cancelCap);
      });
    };

    if (oldPolys.length > 0) {
      // 淡出旧的，完成后建新的
      fadeOutPolygons(oldPolys, () => {
        if (polygonLayerRef.current) {
          polygonLayerRef.current.clearLayers();
          map.removeLayer(polygonLayerRef.current);
          polygonLayerRef.current = null;
        }
        if (capitalLayerRef.current) {
          capitalLayerRef.current.clearLayers();
          map.removeLayer(capitalLayerRef.current);
          capitalLayerRef.current = null;
        }
        buildNewLayers();
      });
    } else {
      buildNewLayers();
    }

    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      cancelAllAnimations();
      // 卸载/重建时清理图层
      if (polyLayerRef.current) {
        try {
          polyLayerRef.current.clearLayers();
          map.removeLayer(polyLayerRef.current);
        } catch {
          // map 可能已销毁
        }
        polyLayerRef.current = null;
      }
      if (capLayerRef.current) {
        try {
          capLayerRef.current.clearLayers();
          map.removeLayer(capLayerRef.current);
        } catch {
          // map 可能已销毁
        }
        capLayerRef.current = null;
      }
    };
  }, [empiresAtYear, map, cancelAllAnimations]);

  // 排名列表（按疆域面积估算或按持续时间）
  const sortedEmpires = useMemo(() => {
    return [...empiresAtYear].sort((a, b) => {
      const aSize = a.polygons.reduce((sum, ring) => sum + ring.length, 0);
      const bSize = b.polygons.reduce((sum, ring) => sum + ring.length, 0);
      return bSize - aSize;
    });
  }, [empiresAtYear]);

  return (
    <>
      {/* 悬停帝国信息卡 */}
      <AnimatePresence>
        {hoveredEmpire && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute left-3 top-20 z-[1000] w-56 rounded-xl border border-border/40 bg-card/90 p-3 shadow-lg"
          >
            <div className="mb-1 flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor:
                    CIVILIZATIONS[
                      hoveredEmpire.civilization as keyof typeof CIVILIZATIONS
                    ]?.color ?? '#888',
                }}
              />
              <span className="font-bold font-display">{hoveredEmpire.name}</span>
            </div>
            <div className="text-[11px] text-primary">
              {formatYear(hoveredEmpire.startYear)} — {formatYear(hoveredEmpire.endYear)}
            </div>
            <div className="mt-1.5 text-xs text-foreground/80">
              首都：{hoveredEmpire.capital.name}
            </div>
            <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {hoveredEmpire.brief}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 并立帝国列表面板 */}
      {mode === 'concurrent' && empiresAtYear.length > 0 && (
        <div
          className={`absolute top-3 z-[1000] transition-all duration-300 ${
            isMobile ? 'right-2' : 'right-3'
          }`}
          style={{ maxWidth: isMobile ? '200px' : '240px' }}
        >
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="overflow-hidden rounded-xl border border-border/40 bg-card/90 shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
              <div className="text-xs font-semibold font-display">
                并立帝国 · {empiresAtYear.length}
              </div>
              <button
                onClick={() => setConcurrentPanelOpen((v) => !v)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={concurrentPanelOpen ? '收起' : '展开'}
              >
                {concurrentPanelOpen ? (
                  <ChevronRight className="size-3.5" />
                ) : (
                  <ChevronLeft className="size-3.5" />
                )}
              </button>
            </div>

            {!concurrentPanelOpen && (
              <div className="max-h-[60vh] overflow-y-auto p-1.5">
                <div className="space-y-0.5">
                  {sortedEmpires.map((empire, idx) => (
                    <button
                      key={empire.id}
                      onClick={() => onSelectEmpire?.(empire)}
                      className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent/50"
                    >
                      <span className="mt-0.5 shrink-0 text-[10px] text-muted-foreground tabular-nums">
                        {idx + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="size-1.5 shrink-0 rounded-full"
                            style={{
                              backgroundColor:
                                CIVILIZATIONS[
                                  empire.civilization as keyof typeof CIVILIZATIONS
                                ]?.color ?? '#888',
                            }}
                          />
                          <span className="truncate text-xs font-medium">
                            {empire.name}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[10px] text-muted-foreground">
                          {formatYear(empire.startYear)} — {formatYear(empire.endYear)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

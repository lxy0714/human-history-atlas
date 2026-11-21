import { useState, useEffect, useRef, useCallback } from 'react';
import { Route, X, Play, Pause, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { HISTORY_ROUTES, type HistoryRoute } from '@/data/routes';
import { findNodeById } from '@/data/relations';
import { useIsMobile } from '@/hooks/use-mobile';
import L from 'leaflet';

interface RoutePanelProps {
  map: L.Map | null;
  open: boolean;
  onClose: () => void;
  onNodeClick: (nodeId: string) => void;
}

interface ActiveRoute {
  id: string;
  polyline: L.Polyline;
  arrowMarker: L.Marker | null;
  markers: L.CircleMarker[];
  progress: number; // 0-1 动画进度
  playing: boolean;
}

// 路线播放动画每帧进度增量（60fps 下约 21 秒播完）
const ROUTE_ANIM_SPEED = 0.008;

export default function RoutePanel({ map, open, onClose, onNodeClick }: RoutePanelProps) {
  const [activeRoutes, setActiveRoutes] = useState<Map<string, ActiveRoute>>(new Map());
  const animFrameRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  // 减少动画偏好检测
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // 卸载时清理所有活动路线，避免图层残留叠加
  useEffect(() => {
    return () => {
      if (!map) return;
      activeRoutes.forEach((active) => {
        try {
          map.removeLayer(active.polyline);
          if (active.arrowMarker) map.removeLayer(active.arrowMarker);
          active.markers.forEach((m) => map.removeLayer(m));
        } catch {
          // map 可能已被销毁，忽略
        }
      });
    };
  }, [map, activeRoutes]);

  // 动画播放
  useEffect(() => {
    if (activeRoutes.size === 0) return;
    // 减少动画偏好下：直接显示完整路线，不播放动画
    if (reducedMotion) {
      setActiveRoutes((prev) => {
        const next = new Map(prev);
        next.forEach((route, id) => {
          const routeData = HISTORY_ROUTES.find((r) => r.id === id);
          if (!routeData) return;
          const latlngs = routeData.points.map((p) => [p.lat, p.lng] as [number, number]);
          route.polyline.setLatLngs(latlngs);
          if (route.arrowMarker && routeData.points.length > 0) {
            const last = routeData.points[routeData.points.length - 1];
            route.arrowMarker.setLatLng([last.lat, last.lng]);
          }
          next.set(id, { ...route, progress: 1, playing: false });
        });
        return next;
      });
      return;
    }

    let localFrameId: number | null = null;

    function animate() {
      let anyPlaying = false;

      setActiveRoutes((prev) => {
        const next = new Map(prev);

        next.forEach((route, id) => {
          if (!route.playing) return;
          if (route.progress >= 1) return;

          anyPlaying = true;
          const newProgress = Math.min(1, route.progress + ROUTE_ANIM_SPEED);
          const routeData = HISTORY_ROUTES.find((r) => r.id === id);
          if (!routeData) return;

          // 计算当前显示到第几个点 + 段内进度
          const totalSegments = routeData.points.length - 1;
          const currentSeg = Math.floor(newProgress * totalSegments);
          const segProgress = (newProgress * totalSegments) % 1;

          // 构建已经过的点 + 当前段内插值点
          const latlngs: [number, number][] = [];
          for (let i = 0; i <= currentSeg && i < routeData.points.length; i++) {
            latlngs.push([routeData.points[i].lat, routeData.points[i].lng]);
          }
          let arrowLat: number, arrowLng: number;
          if (currentSeg < totalSegments) {
            const p1 = routeData.points[currentSeg];
            const p2 = routeData.points[currentSeg + 1];
            arrowLat = p1.lat + (p2.lat - p1.lat) * segProgress;
            arrowLng = p1.lng + (p2.lng - p1.lng) * segProgress;
            latlngs.push([arrowLat, arrowLng]);
          } else {
            arrowLat = routeData.points[routeData.points.length - 1].lat;
            arrowLng = routeData.points[routeData.points.length - 1].lng;
          }

          route.polyline.setLatLngs(latlngs);

          // 更新方向箭头位置
          if (route.arrowMarker) {
            route.arrowMarker.setLatLng([arrowLat, arrowLng]);
          }

          next.set(id, { ...route, progress: newProgress });
        });

        return next;
      });

      // rAF 调度放在 setState 外部，避免严格模式下 updater 双调用导致双调度
      if (anyPlaying) {
        localFrameId = requestAnimationFrame(animate);
      } else {
        localFrameId = null;
      }
    }

    localFrameId = requestAnimationFrame(animate);
    return () => {
      if (localFrameId) cancelAnimationFrame(localFrameId);
    };
  }, [activeRoutes.size, reducedMotion]);

  // 添加路线
  function addRoute(routeData: HistoryRoute) {
    if (!map) return;
    if (activeRoutes.size >= 3) return;

    const polyline = L.polyline([], {
      color: routeData.color,
      weight: 3,
      opacity: 0.9,
      dashArray: routeData.dashed ? '8 6' : undefined,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(map);

    // 方向箭头（SVG 图标）
    const arrowIcon = L.divIcon({
      className: 'route-arrow-icon',
      html: `<div style="
        width: 0;
        height: 0;
        border-left: 8px solid ${routeData.color};
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        transform: translateY(-3px);
        filter: drop-shadow(0 0 4px ${routeData.color}aa);
      "></div>`,
      iconSize: [8, 12],
      iconAnchor: [0, 6],
    });
    const arrowMarker = L.marker(
      [routeData.points[0].lat, routeData.points[0].lng],
      { icon: arrowIcon, interactive: false, keyboard: false },
    ).addTo(map);

    // 关键节点标记
    const markers: L.CircleMarker[] = routeData.points
      .filter((p) => p.nodeId || true) // 所有点都显示小圆点
      .map((point) => {
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 4,
          color: routeData.color,
          fillColor: routeData.color,
          fillOpacity: 1,
          weight: 2,
          className: 'route-point-marker',
        }).addTo(map!);

        marker.bindTooltip(
          `<div style="font-size: 11px; font-weight: 500;">${point.name}</div>`,
          { direction: 'top', offset: [0, -6], opacity: 0.9 },
        );

        marker.on('click', () => {
          if (point.nodeId) {
            const node = findNodeById(point.nodeId);
            if (node) onNodeClick(point.nodeId);
          }
        });

        return marker;
      });

    const newActive: ActiveRoute = {
      id: routeData.id,
      polyline,
      arrowMarker,
      markers,
      progress: 0,
      playing: true,
    };

    setActiveRoutes((prev) => {
      const next = new Map(prev);
      next.set(routeData.id, newActive);
      return next;
    });

    // 调整视野
    const bounds = L.latLngBounds(routeData.points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }

  // 移除路线
  function removeRoute(routeId: string) {
    const active = activeRoutes.get(routeId);
    if (!active || !map) return;

    map.removeLayer(active.polyline);
    if (active.arrowMarker) map.removeLayer(active.arrowMarker);
    active.markers.forEach((m) => map.removeLayer(m));

    setActiveRoutes((prev) => {
      const next = new Map(prev);
      next.delete(routeId);
      return next;
    });
  }

  // 播放/暂停
  function togglePlay(routeId: string) {
    setActiveRoutes((prev) => {
      const next = new Map(prev);
      const r = next.get(routeId);
      if (!r) return prev;
      next.set(routeId, { ...r, playing: !r.playing });
      return next;
    });
  }

  // 清除全部
  function clearAll() {
    if (!map) return;
    activeRoutes.forEach((active) => {
    map!.removeLayer(active.polyline);
    if (active.arrowMarker) map!.removeLayer(active.arrowMarker);
    active.markers.forEach((m) => map!.removeLayer(m));
    });
    setActiveRoutes(new Map());
  }

  // 面板内容
  const panelContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border/40 p-3">
        <div className="flex items-center gap-2">
          <Route className="size-4 text-primary" />
          <h3 className="text-sm font-semibold font-serif">历史路线</h3>
        </div>
        <div className="flex items-center gap-1">
          {activeRoutes.size > 0 && (
             <Button size="icon" variant="ghost" onClick={clearAll} className="h-9 w-9" title="清除全部">
               <Trash2 className="size-4 text-muted-foreground" />
            </Button>
          )}
          {!isMobile && (
             <Button size="icon" variant="ghost" onClick={onClose} className="h-9 w-9">
               <X className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          {activeRoutes.size > 0 && (
            <div className="mb-3 space-y-2">
              <p className="text-xs text-muted-foreground">
                正在显示 ({activeRoutes.size}/3)
              </p>
              {Array.from(activeRoutes.values()).map((active) => {
                const routeData = HISTORY_ROUTES.find((r) => r.id === active.id);
                if (!routeData) return null;
                return (
                  <div
                    key={active.id}
                    className="rounded-lg border border-border/40 bg-card/50 p-2"
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-0.5 w-6 rounded-sm"
                          style={{ backgroundColor: routeData.color }}
                        />
                        <span className="text-xs font-medium">{routeData.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => togglePlay(active.id)}
                          className="h-6 w-6"
                        >
                          {active.playing ? (
                            <Pause className="size-3" />
                          ) : (
                            <Play className="size-3" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeRoute(active.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    </div>
                    {/* 进度条 */}
                    <div className="h-0.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${active.progress * 100}%`,
                          backgroundColor: routeData.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mb-2 text-xs text-muted-foreground">历史路线（点击开启）</p>
          <div className="space-y-2">
            {HISTORY_ROUTES.map((route) => {
              const isActive = activeRoutes.has(route.id);
              return (
                <motion.button
                  type="button"
                  key={route.id}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (isActive ? removeRoute(route.id) : addRoute(route))}
                  disabled={!isActive && activeRoutes.size >= 3}
                  className={`w-full rounded-lg border p-2.5 text-left transition-all ${
                    isActive
                      ? 'border-primary/40 bg-primary/5'
                      : activeRoutes.size >= 3
                        ? 'cursor-not-allowed border-border/20 opacity-50'
                        : 'border-border/40 bg-card/30 hover:border-border hover:bg-card/60'
                  }`}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <div
                      className="h-1 w-8 rounded-full"
                      style={{
                        backgroundColor: route.color,
                        backgroundImage: route.dashed
                          ? `repeating-linear-gradient(90deg, ${route.color} 0 4px, transparent 4px 7px)`
                          : undefined,
                      }}
                    />
                    <span className="text-xs font-semibold">{route.name}</span>
                    <Badge variant="outline" className="ml-auto h-5 px-1.5 text-[9px]">
                      {route.era}
                    </Badge>
                  </div>
                  <p className="line-clamp-1 text-[10px] text-muted-foreground">
                    {route.description}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-[9px] text-muted-foreground">
                    <span>{route.points.length} 个途经点</span>
                    {isActive && <span className="text-primary">· 已显示</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[1100] h-[70vh] overflow-hidden rounded-t-2xl border-t border-border/40 bg-card shadow-2xl"
          >
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            {panelContent}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="absolute left-3 top-16 z-[1000] h-[calc(100%-6rem)] w-72 overflow-hidden rounded-lg border border-border/40 bg-card/90 shadow-lg"
        >
          {panelContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

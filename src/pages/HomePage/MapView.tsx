// EXPORTS: MapView
import { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import L from 'leaflet';
import { MapPin, Layers, Navigation, X, Route, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ALL_HISTORY_NODES_INDEX,
  CIVILIZATIONS,
  ERAS,
  CATEGORIES,
  type IHistoryNodeIndex,
  type CategoryKey,
} from '@/data/history-index';
import type { HistoryState } from './useHistoryStore';
import { getNodeTimeRange } from './utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,

} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n } from '@/i18n';
import { getCivilizationName, getCategoryName } from '@/data/i18n/content-i18n';
import { motion, AnimatePresence } from 'framer-motion';
import RoutePanel from './components/RoutePanel';
import EmpireLayer from './components/EmpireLayer';
import LayerControlPanel from './components/LayerControlPanel';
import EmpireDetailSheet from './components/EmpireDetailSheet';
import { EMPIRES, type IEmpire } from '@/data/empires';
import { clusterNodes, type ClusterGroup } from './cluster-utils';
import { createClusterIcon } from './cluster-icon';

interface MapViewProps {
  store: HistoryState;
}

// 底图配置
const BASEMAPS = {
  satellite: {
    name: '卫星影像',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  dark: {
    name: '深色街道',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© OpenStreetMap contributors © CARTO',
  },
};

type BasemapKey = keyof typeof BASEMAPS;

// 创建自定义 marker icon（圆点 + 发光，44x44 透明热区，视觉点居中）
function createDivIcon(color: string, important: boolean) {
  const dotSize = important ? 18 : 12;
  const hitSize = 44;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${hitSize}px;
      height: ${hitSize}px;
      display: flex;
      align-items: center;
      justify-content: center;
    "><div style="
      width: ${dotSize}px;
      height: ${dotSize}px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid rgba(26, 22, 18, 0.9);
      box-shadow: 0 0 0 2px ${color}40, 0 0 12px ${color}aa;
    "></div></div>`,
    iconSize: [hitSize, hitSize],
    iconAnchor: [hitSize / 2, hitSize / 2],
    popupAnchor: [0, -hitSize / 2 - 2],
  });
}

export default memo(function MapView({ store }: MapViewProps) {
  const { t, lang } = useI18n();
  const {
    filteredNodes,
    openDetail,
    currentEra,
    targetNodeId,
    clearTarget,
    selectedNode,
  } = store;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const clusterMarkersRef = useRef<Record<string, L.Marker>>({});
  const basemapLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const [basemap, setBasemap] = useState<BasemapKey>('satellite');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [legendOpen, setLegendOpen] = useState(false);
  const [routePanelOpen, setRoutePanelOpen] = useState(false);
  const [popupNode, setPopupNode] = useState<IHistoryNodeIndex | null>(null);
  const [clusterPopup, setClusterPopup] = useState<ClusterGroup | null>(null);
  const isMobile = useIsMobile();

  // 疆域图层状态
  const [showNodes, setShowNodes] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showCivColors, setShowCivColors] = useState(true);
  const [empireMode, setEmpireMode] = useState<'concurrent' | 'peak' | 'off'>('concurrent');
  const [selectedPeakEmpireId, setSelectedPeakEmpireId] = useState('roman-empire');
  const [selectedEmpire, setSelectedEmpire] = useState<IEmpire | null>(null);

  // 从 timeRange 计算当前中心年份
  const currentYear = useMemo(
    () => Math.round((store.timeRange[0] + store.timeRange[1]) / 2),
    [store.timeRange],
  );

  // 初始化地图
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25, 45],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: false,
      worldCopyJump: true,
      preferCanvas: true,
    });

    mapRef.current = map;

    // 默认卫星底图，加载失败自动降级到深色街道
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    const base = L.tileLayer(BASEMAPS.satellite.url, {
      attribution: BASEMAPS.satellite.attribution,
      maxZoom: 19,
      className: 'satellite-tiles',
    }).addTo(map);
    basemapLayerRef.current = base;

    // 卫星瓦片加载失败降级：首屏 6s 后若瓦片还在加载/报错，切到深色底图
    fallbackTimer = setTimeout(() => {
      const tiles = mapContainerRef.current?.querySelectorAll('.satellite-tiles img');
      let failedCount = 0;
      tiles?.forEach((img) => {
        if ((img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth === 0) {
          failedCount++;
        }
      });
      // 超过 30% 瓦片加载失败就降级
      if (tiles && tiles.length > 5 && failedCount / tiles.length > 0.3 && mapRef.current) {
        mapRef.current.removeLayer(base);
        const dark = L.tileLayer(BASEMAPS.dark.url, {
          attribution: BASEMAPS.dark.attribution,
          maxZoom: 19,
        }).addTo(mapRef.current);
        basemapLayerRef.current = dark;
        setBasemap('dark');
        // 隐藏地名层
        if (labelsLayerRef.current) {
          mapRef.current.removeLayer(labelsLayerRef.current);
        }
      }
    }, 6000);

    // 叠加地名标注层
    const labels = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 19,
        opacity: 0.8,
      },
    ).addTo(map);
    labelsLayerRef.current = labels;

    // 缩放控件放右下角
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // 设置地图容器尺寸
    const sizeTimer = setTimeout(() => map.invalidateSize(), 100);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      clearTimeout(sizeTimer);
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // 切换底图
  useEffect(() => {
    if (!mapRef.current || !basemapLayerRef.current) return;

    mapRef.current.removeLayer(basemapLayerRef.current);
    const newLayer = L.tileLayer(BASEMAPS[basemap].url, {
      attribution: BASEMAPS[basemap].attribution,
      maxZoom: 19,
    });
    newLayer.addTo(mapRef.current);
    basemapLayerRef.current = newLayer;

    // 卫星图时显示地名标注，深色底图时隐藏
    if (labelsLayerRef.current) {
      if (basemap === 'satellite') {
        labelsLayerRef.current.addTo(mapRef.current);
      } else {
        mapRef.current.removeLayer(labelsLayerRef.current);
      }
    }
  }, [basemap]);

  // 渲染标记点（单节点 + 聚集组）
  useEffect(() => {
    if (!mapRef.current) return;

    // 清除旧标记
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};
    Object.values(clusterMarkersRef.current).forEach((m) => m.remove());
    clusterMarkersRef.current = {};

    if (!showNodes) return;

    const validNodes = filteredNodes.filter(
      (n) => n.location?.lat !== undefined && n.location?.lng !== undefined,
    );

    // 按坐标聚集（阈值 0 = 完全同坐标）
    const clusters = clusterNodes(validNodes, 0);

    clusters.forEach((group) => {
      if (group.count === 1) {
        // 单节点：沿用原有标记样式
        const node = group.nodes[0];
        const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
        const marker = L.marker([node.location!.lat, node.location!.lng], {
          icon: createDivIcon(civColor, node.important ?? false),
          riseOnHover: true,
        }).addTo(mapRef.current!);

        marker.on('click', () => {
          if (isMobile) {
            setPopupNode(node);
          } else {
            openDetail(node);
          }
        });

        // 给桌面端加 tooltip
        if (!isMobile) {
          marker.bindTooltip(
            `<div style="font-size: 12px; line-height: 1.4;">
              <div style="font-weight: 600; margin-bottom: 2px;">${node.title}</div>
              <div style="color: #c9a96e; font-size: 11px;">${node.yearDisplay}</div>
            </div>`,
            {
              direction: 'top',
              offset: [0, -8],
              opacity: 0.9,
              className: 'history-tooltip',
            },
          );
        }

        markersRef.current[node.id] = marker;
      } else {
        // 聚集组：显示数量角标
        const marker = L.marker([group.lat, group.lng], {
          icon: createClusterIcon(group.primaryColor, group.count, group.count >= 10 ? 34 : group.count >= 5 ? 30 : 26),
          riseOnHover: true,
          zIndexOffset: 1000,
        }).addTo(mapRef.current!);

        marker.on('click', () => {
          setClusterPopup(group);
        });

        // 桌面端 tooltip：预览前几个节点
        if (!isMobile) {
          const preview = group.nodes.slice(0, 4);
          const more = group.count - preview.length;
          const content = `
            <div style="font-size: 12px; line-height: 1.5; min-width: 180px;">
              <div style="font-weight: 600; margin-bottom: 4px; color: ${group.primaryColor};">
                ${group.count} ${t('map.nodesHere', '个历史节点在此处')}
              </div>
              ${preview.map((n) => `<div style="color: #e8dcc4;">· ${n.title} <span style="color: #c9a96e; font-size: 10px;">(${n.yearDisplay})</span></div>`).join('')}
              ${more > 0 ? `<div style="color: #888; margin-top: 2px; font-size: 11px;">${t('map.moreNodes', '还有').replace('{n}', String(more))}...</div>` : ''}
              <div style="color: #c9a96e; font-size: 10px; margin-top: 4px;">${t('map.clickToList', '点击查看完整列表')}</div>
            </div>
          `;
          marker.bindTooltip(content, {
            direction: 'top',
            offset: [0, -12],
            opacity: 0.9,
            className: 'history-tooltip',
          });
        }

        clusterMarkersRef.current[group.key] = marker;
      }
    });
  }, [filteredNodes, isMobile, openDetail, showNodes]);

  // 同时期节点高亮
  useEffect(() => {
    if (!selectedNode) {
      // 恢复所有marker
      Object.values(markersRef.current).forEach((m) => {
        const el = m.getElement();
        if (el) {
          el.style.opacity = '1';
          el.style.transition = 'opacity 0.3s ease';
          el.style.filter = 'none';
        }
      });
      Object.values(clusterMarkersRef.current).forEach((m) => {
        const el = m.getElement();
        if (el) {
          el.style.opacity = '1';
          el.style.transition = 'opacity 0.3s ease';
          el.style.filter = 'none';
        }
      });
      return;
    }

    const [selStart, selEnd] = getNodeTimeRange(selectedNode);

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const node = ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === id);
      if (!node) return;
      const el = marker.getElement();
      if (!el) return;
      el.style.transition = 'opacity 0.3s ease, filter 0.3s ease';

      if (id === selectedNode.id) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 6px #f5c542)';
        return;
      }

      const [s, e] = getNodeTimeRange(node);
      const isContemp = s <= selEnd && e >= selStart;
      if (isContemp) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 4px #f5c54280)';
      } else {
        el.style.opacity = '0.25';
        el.style.filter = 'none';
      }
    });

    // 聚集组高亮：组内只要有一个同时期节点就显示、有 glow
    Object.entries(clusterMarkersRef.current).forEach(([key, marker]) => {
      const el = marker.getElement();
      if (!el) return;
      // 通过 key 反查 group（从已有 DOM 不行，用 filterNodes 重建太频繁）
      // 简化：聚集组默认正常显示，选中节点在组内时加 glow
      const [selStart2, selEnd2] = [selStart, selEnd];
      let hasContemp = false;
      let hasSelected = false;
      // 遍历所有节点找同坐标的
      const ll = marker.getLatLng();
      for (const n of filteredNodes) {
        if (!n.location) continue;
        if (Math.abs(n.location.lat - ll.lat) > 0.0001) continue;
        if (Math.abs(n.location.lng - ll.lng) > 0.0001) continue;
        const [ns, ne] = getNodeTimeRange(n);
        if (ns <= selEnd2 && ne >= selStart2) hasContemp = true;
        if (n.id === selectedNode.id) hasSelected = true;
        if (hasContemp && hasSelected) break;
      }
      el.style.transition = 'opacity 0.3s ease, filter 0.3s ease';
      if (hasSelected) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 8px #f5c542)';
      } else if (hasContemp) {
        el.style.opacity = '1';
        el.style.filter = 'drop-shadow(0 0 5px #f5c542aa)';
      } else {
        el.style.opacity = '0.25';
        el.style.filter = 'none';
      }
    });
  }, [selectedNode, filteredNodes]);

  // 定位到目标节点
  useEffect(() => {
    if (!targetNodeId || !mapRef.current) return;

    // 1. 优先找单节点 marker
    if (markersRef.current[targetNodeId]) {
      const marker = markersRef.current[targetNodeId];
      const latlng = marker.getLatLng();
      mapRef.current.flyTo(latlng, 5, { duration: 1.2 });
      marker.openTooltip();
      const timer = setTimeout(() => {
        clearTarget();
        if (markersRef.current[targetNodeId]) {
          markersRef.current[targetNodeId].closeTooltip();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    // 2. 节点在聚集组里：定位到聚集组 + 打开列表
    const targetNode = ALL_HISTORY_NODES_INDEX.find((n) => n.id === targetNodeId);
    if (!targetNode?.location) return;
    const { lat, lng } = targetNode.location;

    for (const group of Object.values(clusterMarkersRef.current)) {
      const ll = group.getLatLng();
      if (Math.abs(ll.lat - lat) < 0.0001 && Math.abs(ll.lng - lng) < 0.0001) {
        mapRef.current.flyTo(ll, 5, { duration: 1.2 });
        // 找到对应的 cluster group 数据并打开列表
        const validNodes = filteredNodes.filter(
          (n) => n.location?.lat !== undefined && n.location?.lng !== undefined,
        );
        const clusters = clusterNodes(validNodes, 0);
        const matched = clusters.find(
          (c) => Math.abs(c.lat - lat) < 0.0001 && Math.abs(c.lng - lng) < 0.0001,
        );
        if (matched) {
          setClusterPopup(matched);
        }
        const timer = setTimeout(() => {
          clearTarget();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [targetNodeId, clearTarget, filteredNodes]);

  // 文明列表（用于图例）
  const civList = Object.entries(CIVILIZATIONS);
  const catList = Object.entries(CATEGORIES);

  function handleRouteNodeClick(nodeId: string) {
    const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === nodeId);
    if (node) openDetail(node);
  }

  function handleEmpireNodeClick(nodeId: string) {
    const node = ALL_HISTORY_NODES_INDEX.find((n) => n.id === nodeId);
    if (node) openDetail(node);
    setSelectedEmpire(null);
  }

  function handleEraJump(eraIndex: number) {
    const era = ERAS[eraIndex];
    if (!era) return;
    const midYear = Math.round((era.startYear + era.endYear) / 2);
    const span = Math.max(100, Math.round((era.endYear - era.startYear) * 0.3));
    store.setTimeRange([midYear - span, midYear + span]);
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/40">
      {/* 地图容器 */}
      <div ref={mapContainerRef} className="h-full w-full" style={{ isolation: 'isolate' }} />

      {/* 顶部控制条 */}
      <div className="absolute left-3 right-3 top-3 z-[1000] flex items-start justify-between gap-2">
        {/* 图例 */}
        <div className="flex flex-col gap-2">
          {/* 图例/路线按钮组 */}
          <div className="flex flex-col gap-2">
            {!isMobile ? (
              <>
                {legendOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="overflow-hidden rounded-lg border border-border/40 bg-card p-3 shadow-lg"
                  >
                    <p className="mb-2 text-xs font-semibold font-serif">{t('map.legend', '文明图例')}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {civList.map(([key, civ]) => (
                        <div key={key} className="flex items-center gap-1.5">
                          <span
                            className="size-2.5 rounded-full border border-background"
                            style={{
                              backgroundColor: civ.color,
                              boxShadow: `0 0 4px ${civ.color}80`,
                            }}
                          />
                          <span className="text-[11px] text-foreground/80">{civ.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setLegendOpen(!legendOpen)}
                    className={`h-11 gap-1.5 shadow-lg md:h-9 ${legendOpen ? 'bg-primary/20 text-primary' : ''}`}
                  >
                    <Navigation className="size-4 md:size-4" />
                    <span className="text-sm md:text-xs">{t('map.legendShort', '图例')}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setRoutePanelOpen(!routePanelOpen)}
                    className={`h-11 gap-1.5 shadow-lg md:h-9 ${routePanelOpen ? 'bg-primary/20 text-primary' : ''}`}
                  >
                    <Route className="size-4 md:size-4" />
                    <span className="text-sm md:text-xs">{t('map.routes', '路线')}</span>
                  </Button>
                </div>
              </>
            ) : (
              <Sheet open={legendOpen} onOpenChange={setLegendOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-11 gap-1.5 shadow-lg md:h-9"
                  >
                    <Navigation className="size-4 md:size-4" />
                    <span className="text-sm md:text-xs">{t('map.legendShort', '图例')}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetHeader className="border-b p-3">
                    <SheetTitle className="text-sm font-serif">{t('map.legend', '文明图例')}</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-4rem)] p-3">
                    <div className="space-y-2">
                      {civList.map(([key, civ]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span
                            className="size-3 rounded-full border border-background"
                            style={{
                              backgroundColor: civ.color,
                              boxShadow: `0 0 4px ${civ.color}80`,
                            }}
                          />
                          <span className="text-sm">{civ.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-semibold text-muted-foreground font-serif">
                        专题分类
                      </p>
                      <div className="space-y-1">
                        {catList.map(([key, cat]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="size-3 text-sm">{cat.icon}</span>
                            <span className="text-sm text-foreground/80">{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* 底图切换 */}
        <div className="flex gap-1 rounded-lg border border-border/40 bg-card p-1 shadow-lg">
          {(Object.keys(BASEMAPS) as BasemapKey[]).map((key) => (
            <Button
              key={key}
              size="sm"
              variant="ghost"
              onClick={() => setBasemap(key)}
              className={`h-10 px-3 text-sm transition-colors md:h-7 md:px-2.5 md:text-xs ${
                basemap === key
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {BASEMAPS[key].name}
            </Button>
          ))}
          <div className="mx-1 w-px bg-border/40" />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              const el = mapContainerRef.current;
              if (!el) return;
              if (!document.fullscreenElement) {
                el.requestFullscreen?.().catch(() => {
                  // 不支持 Fullscreen API 时用 CSS 全屏兜底
                  setIsFullscreen(true);
                });
              } else {
                document.exitFullscreen?.().catch(() => setIsFullscreen(false));
              }
            }}
            className="h-11 w-11 p-0 text-muted-foreground hover:text-foreground md:h-7 md:w-7"
            aria-label={t('common.fullscreen', '全屏')}
            title={t('common.fullscreen', '全屏')}
            type="button"
          >
            <Maximize className="size-5 md:size-3.5" />
          </Button>
        </div>
      </div>

      {/* 全屏状态监听 */}
      <FullscreenListener onChange={setIsFullscreen} />

  {/* 路线面板 */}
      <RoutePanel
        map={mapRef.current}
        open={showRoutes && routePanelOpen}
        onClose={() => setRoutePanelOpen(false)}
        onNodeClick={handleRouteNodeClick}
      />

      {/* 图层控制面板 */}
      <LayerControlPanel
        showNodes={showNodes}
        showEmpires={empireMode !== 'off'}
        showRoutes={showRoutes}
        showCivColors={showCivColors}
        empireMode={empireMode}
        selectedPeakEmpireId={selectedPeakEmpireId}
        onToggleNodes={() => setShowNodes((v) => !v)}
        onToggleEmpires={() => setEmpireMode((m) => (m === 'off' ? 'concurrent' : 'off'))}
        onToggleRoutes={() => { setShowRoutes((v) => !v); setRoutePanelOpen(true); }}
        onToggleCivColors={() => setShowCivColors((v) => !v)}
        onEmpireModeChange={setEmpireMode}
        onSelectPeakEmpire={setSelectedPeakEmpireId}
        onEraJump={handleEraJump}
      />

      {/* 帝国疆域图层 */}
      <EmpireLayer
        map={mapRef.current}
        currentYear={currentYear}
        mode={empireMode}
        selectedEmpireId={selectedPeakEmpireId}
        showNodes={showNodes}
        onSelectEmpire={setSelectedEmpire}
      />

      {/* 帝国详情弹窗 */}
      <EmpireDetailSheet
        empire={selectedEmpire}
        onClose={() => setSelectedEmpire(null)}
        onNodeClick={handleEmpireNodeClick}
      />

      {/* 底部状态 */}
      <div className="absolute bottom-36 left-3 z-[1000] md:bottom-6">
        <Badge
          variant="secondary"
          className="shadow-md"
          style={{
            backgroundColor: `${currentEra.accent}15`,
            color: currentEra.accent,
            borderColor: `${currentEra.accent}30`,
          }}
        >
          <MapPin className="mr-1 size-3" />
          {filteredNodes.filter((n) => n && n.location?.lat !== undefined).length} 个地理标记
        </Badge>
      </div>

      {/* 移动端 popup sheet */}
      <AnimatePresence>
        {isMobile && popupNode && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-[1100] max-h-[70vh] overflow-hidden rounded-t-2xl border-t border-border/40 bg-card shadow-2xl"
          >
            {/* 拖拽指示条 */}
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="px-4 pb-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: `${CIVILIZATIONS[popupNode.civilization]?.color ?? '#888'}40`,
                    color: CIVILIZATIONS[popupNode.civilization]?.color ?? '#888',
                  }}
                >
                  {CIVILIZATIONS[popupNode.civilization]?.name ?? popupNode.civilization}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                   className="h-9 w-9"
                  onClick={() => setPopupNode(null)}
                  aria-label={t('common.close', '关闭')}
                >
                  <X className="size-4" />
                </Button>
              </div>

              <h3 className="text-base font-bold font-serif">{popupNode.title}</h3>
              <p className="mb-3 text-xs text-muted-foreground">
                {popupNode.yearDisplay}
              </p>
              <p className="mb-4 line-clamp-3 text-sm text-foreground/80">
                {popupNode.summary}
              </p>

              <div className="mb-3 flex flex-wrap gap-1">
                {(popupNode.categories ?? [])
                  .filter((c): c is CategoryKey => typeof c === 'string' && c in CATEGORIES)
                  .slice(0, 3)
                  .map((cat) => {
                    const catInfo = CATEGORIES[cat];
                    return (
                      <span
                        key={cat}
                        className="rounded-sm bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {catInfo.icon} {catInfo.name}
                      </span>
                    );
                  })}
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  openDetail(popupNode);
                  setPopupNode(null);
                }}
              >
                查看详情
              </Button>
            </div>
          </motion.div>
        )}

        {/* 移动端聚集节点列表 */}
        {isMobile && clusterPopup && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-[1100] max-h-[75vh] overflow-hidden rounded-t-2xl border-t border-border/40 bg-card shadow-2xl"
          >
            <div className="flex justify-center py-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="px-4 pb-4">
              <div className="mb-2 flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: `${clusterPopup.primaryColor}40`,
                    color: clusterPopup.primaryColor,
                  }}
                >
                  此处有 {clusterPopup.count} 个节点
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setClusterPopup(null)}
                  aria-label={t('common.close', '关闭')}
                >
                  <X className="size-4" />
                </Button>
              </div>
              <ScrollArea className="max-h-[55vh]">
                <div className="space-y-1 pr-2">
                  {clusterPopup.nodes
                    .sort((a, b) => a.year - b.year)
                    .map((node) => {
                      const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                      return (
                        <button
                          key={node.id}
                          type="button"
                          onClick={() => {
                            openDetail(node);
                            setClusterPopup(null);
                          }}
                          className="flex w-full items-start gap-2 rounded-lg border border-border/30 bg-card/50 p-2 text-left transition-colors hover:border-border/60 hover:bg-card"
                        >
                          <span
                            className="mt-1 block size-2 shrink-0 rounded-full"
                            style={{ backgroundColor: civColor }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-foreground">
                              {node.title}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {node.yearDisplay} · {CIVILIZATIONS[node.civilization]?.name ?? node.civilization}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}

        {/* 桌面端聚集节点列表（悬浮卡片） */}
        {!isMobile && clusterPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-4 top-20 z-[1100] w-80 overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border/40 px-3 py-2">
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: `${clusterPopup.primaryColor}40`,
                  color: clusterPopup.primaryColor,
                }}
              >
                {clusterPopup.count} 个节点在此处
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setClusterPopup(null)}
                aria-label="关闭"
              >
                <X className="size-3.5" />
              </Button>
            </div>
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-1 p-2">
                {clusterPopup.nodes
                  .sort((a, b) => a.year - b.year)
                  .map((node) => {
                    const civColor = CIVILIZATIONS[node.civilization]?.color ?? '#888';
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => {
                          openDetail(node);
                          setClusterPopup(null);
                        }}
                        className="flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-accent/50"
                      >
                        <span
                          className="mt-1 block size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: civColor }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-foreground">
                            {node.title}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {node.yearDisplay} · {CIVILIZATIONS[node.civilization]?.name ?? node.civilization}
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}, (prev, next) => {
  const relevantKeys = [
    'filteredNodes', 'openDetail', 'currentEra', 'targetNodeId',
    'clearTarget', 'selectedNode', 'dataLoaded',
  ];
  for (const key of relevantKeys) {
    if (prev.store[key as keyof typeof prev.store] !== next.store[key as keyof typeof prev.store]) {
      return false;
    }
  }
  return true;
});

// 全屏状态监听组件（纯副作用，渲染 null）
function FullscreenListener({ onChange }: { onChange: (v: boolean) => void }) {
  useEffect(() => {
    const handler = () => {
      onChange(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [onChange]);
  return null;
}

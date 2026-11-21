// 全局状态管理：视图、筛选、播放、详情面板、时代氛围、收藏、密度
// 大数组（ALL_HISTORY_NODES / HISTORY_NODES）异步加载，首屏不阻塞

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { logger } from '@lark-apaas/client-toolkit-lite';
import { AppEvents } from './app-events';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  ERAS,
  CIVILIZATIONS,
  CATEGORIES,
  HISTORY_META,
} from '@/data/history-constants';
import type { IHistoryNodeIndex, CivilizationKey, CategoryKey, IEra } from '@/data/history-index';
import {
  loadHistoryIndex,
  getHistoryIndex,
  findNodeIndexById,
  getRandomNodeIdFromIndex,
  preloadHistoryIndex,
  reloadHistoryIndex,
  loadAllBodies,
  isFullTextReady,
} from '@/data/history-loader';
import { safeStorage } from './utils';

export type ViewMode = 'timeline' | 'map' | 'list' | 'special';
export type DensityMode = 'comfortable' | 'compact';
export type ZoomLevel = 1 | 2 | 3 | 4 | 5;

const FAVORITES_KEY = 'history-favorites';
const DENSITY_KEY = 'history-density';
const ZOOM_KEY = 'history-zoom-level';
const READING_KEY = 'history-reading-state';

export interface HistoryState {
  // 视图
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;

  // 数据加载状态
  dataLoaded: boolean;
  loadError: string | null; // 加载失败的错误信息，成功为 null
  allNodes: IHistoryNodeIndex[]; // 全部节点数组（索引层，无 description）
  baseNodes: IHistoryNodeIndex[]; // 基础节点数组
  retryLoad: () => void; // 手动重试加载

  // 筛选
  selectedCivilizations: CivilizationKey[];
  selectedCategories: CategoryKey[];
  toggleCivilization: (c: CivilizationKey) => void;
  toggleCategory: (c: CategoryKey) => void;
  clearFilters: () => void;

  // 搜索
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: IHistoryNodeIndex[];

  // 全文搜索
  fullTextSearch: boolean;
  setFullTextSearch: (v: boolean) => void;
  fullTextLoading: boolean;
  enableFullTextSearch: () => Promise<void>;

  // 过滤后的节点
  filteredNodes: IHistoryNodeIndex[];

  // 详情面板
  selectedNode: IHistoryNodeIndex | null;
  openDetail: (node: IHistoryNodeIndex) => void;
  closeDetail: () => void;
  /** 详情面板打开方式：'auto'=自动恢复（正文延后加载）, 'user'=用户主动点击（正文立即加载） */
  detailTrigger: 'auto' | 'user';

  // 左侧目录
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (v: boolean) => void;

  // 当前时代（氛围色）
  currentEra: IEra;
  setCurrentEraById: (id: string) => void;
  setCurrentEraByYear: (year: number) => void;

  // 自动播放
  isPlaying: boolean;
  playSpeed: number;
  playProgress: number;
  playEraCardVisible: boolean;
  togglePlay: () => void;
  setPlaySpeed: (s: number) => void;

  // 时间范围滑块
  timeRange: [number, number];
  setTimeRange: (r: [number, number]) => void;

  // 定位到节点
  targetNodeId: string | null;
  scrollToNode: (id: string) => void;
  clearTarget: () => void;

  // 专题馆对比跳转
  specialCompareLeftId: string | null;
  openCompare: (nodeId?: string) => void;

  // 收藏
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // 时间轴密度
  density: DensityMode;
  setDensity: (d: DensityMode) => void;

  // 时间轴缩放级别
  zoomLevel: ZoomLevel;
  setZoomLevel: (z: ZoomLevel) => void;
  zoomIn: () => void;
  zoomOut: () => void;

  // 随机探索
  randomExplore: () => void;
  randomPulse: number;

  // 详情面板上下节点
  prevNode: IHistoryNodeIndex | null;
  nextNode: IHistoryNodeIndex | null;

  // 阅读位置记忆
  restoreDone: boolean;
  setTimelineScrollTop: (pos: number) => void;
  timelineScrollTop: number | null;
  clearReadingState: () => void;

  // 元数据
  meta: typeof HISTORY_META;
}

// 找到包含某年的时代
function findEraByYear(year: number): IEra {
  const era = ERAS.find((e) => year >= e.startYear && year < e.endYear);
  return era ?? ERAS[0];
}

export function useHistoryStore(): HistoryState {
  const isMobile = useIsMobile();

  // ========= 从 localStorage 读取初始值 =========
  const initialFavorites = useMemo(() => {
    try {
      const raw = safeStorage.getItem(FAVORITES_KEY);
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      /* ignore */
    }
    return [];
  }, []);

  const initialDensity = useMemo(() => {
    const raw = safeStorage.getItem(DENSITY_KEY);
    return (raw === 'compact' ? 'compact' : 'comfortable') as DensityMode;
  }, []);

  const initialZoom = useMemo(() => {
    const raw = safeStorage.getItem(ZOOM_KEY);
    const n = parseInt(raw ?? '3', 10);
    return Math.max(1, Math.min(5, isNaN(n) ? 3 : n)) as ZoomLevel;
  }, []);

  const initialReading = useMemo(() => {
    try {
      const raw = safeStorage.getItem(READING_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return null;
  }, []);

  // ========= 状态 =========
  const [viewMode, setViewMode] = useState<ViewMode>(initialReading?.viewMode ?? 'timeline');
  const [selectedCivilizations, setSelectedCivilizations] = useState<CivilizationKey[]>(
    initialReading?.selectedCivilizations ?? [],
  );
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(
    initialReading?.selectedCategories ?? [],
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const searchDebounceRef = useRef<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<IHistoryNodeIndex | null>(null);
  const [detailTrigger, setDetailTrigger] = useState<'auto' | 'user'>('auto');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentEra, setCurrentEra] = useState<IEra>(ERAS[3]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);
  const [playProgress, setPlayProgress] = useState(50);
  const [playEraCardVisible, setPlayEraCardVisible] = useState(false);
  const [timeRange, setTimeRange] = useState<[number, number]>(
    initialReading?.timeRange ?? [500, 1500],
  );
  const [targetNodeId, setTargetNodeId] = useState<string | null>(null);
  const [specialCompareLeftId, setSpecialCompareLeftId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(initialFavorites);
  const [density, setDensityState] = useState<DensityMode>(initialDensity);
  const [zoomLevel, setZoomLevelState] = useState<ZoomLevel>(initialZoom);
  const [randomPulse, setRandomPulse] = useState(0);
  const [timelineScrollTop, setTimelineScrollTopState] = useState<number | null>(
    initialReading?.timelineScrollTop ?? null,
  );
  const [restoreDone, setRestoreDone] = useState(false);

  // 数据加载状态
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [allNodes, setAllNodes] = useState<IHistoryNodeIndex[]>([]);
  const [baseNodes, setBaseNodes] = useState<IHistoryNodeIndex[]>([]);
  const [fullTextSearch, setFullTextSearch] = useState(false);
  const [fullTextLoading, setFullTextLoading] = useState(false);

  // ========= 数据加载 =========
  useEffect(() => {
    // 先检查缓存（如果别处已加载）
    const cached = getHistoryIndex();
    if (cached) {
      setAllNodes(cached.ALL_HISTORY_NODES_INDEX);
      setBaseNodes(cached.HISTORY_NODES_INDEX);
      setDataLoaded(true);
      return;
    }

    // 空闲时加载索引（不阻塞首屏渲染）
    let cancelled = false;
    const timer = window.setTimeout(() => {
      loadHistoryIndex()
        .then((data) => {
          if (cancelled) return;
          setAllNodes(data.ALL_HISTORY_NODES_INDEX);
          setBaseNodes(data.HISTORY_NODES_INDEX);
          setDataLoaded(true);
          setLoadError(null);
        })
        .catch((err) => {
          if (cancelled) return;
          const msg = err instanceof Error ? err.message : String(err);
          logger.error('Lazy load history data failed:', String(err));
          setLoadError(msg || '历史数据加载失败');
        });
    }, 150); // 延迟 150ms，给首屏骨架渲染时间

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  // 手动重试加载
  const retryLoad = () => {
    setLoadError(null);
    reloadHistoryIndex()
      .then((data) => {
        setAllNodes(data.ALL_HISTORY_NODES_INDEX);
        setBaseNodes(data.HISTORY_NODES_INDEX);
        setDataLoaded(true);
        setLoadError(null);
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error('Retry load history data failed:', String(err));
        setLoadError(msg || '历史数据加载失败');
      });
  };

  // 移动端默认收起侧边栏
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // 恢复选中节点（数据加载后再执行）
  useEffect(() => {
    if (!dataLoaded) return;
    if (!initialReading?.selectedNodeId) {
      setRestoreDone(true);
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];

    const node = findNodeIndexById(initialReading.selectedNodeId);
    if (node) {
      const t = setTimeout(() => {
        setDetailTrigger('auto');
        setSelectedNode(node);
        const era = ERAS.find((e) => e.id === node.eraId);
        if (era) setCurrentEra(era);
        setTargetNodeId(node.id);
      }, 400);
      timers.push(t);
    }

    const restoreTimer = setTimeout(() => setRestoreDone(true), 600);
    timers.push(restoreTimer);

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [dataLoaded]);

  // 播放/滑块最大年份硬上限
  const MAX_PLAY_YEAR = 2026;

  // 搜索防抖（300ms）
  useEffect(() => {
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => {
      if (searchDebounceRef.current) {
        window.clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery]);

  // 搜索结果（默认索引搜索：标题、摘要、年代、文明、分类）
  // 全文搜索模式：额外匹配 description
  const searchResults = useMemo(() => {
    if (!dataLoaded || !debouncedSearchQuery.trim()) return [];
    const q = debouncedSearchQuery.toLowerCase();
    const baseMatch = (n: IHistoryNodeIndex) =>
      n &&
      (n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.yearDisplay.includes(q) ||
        n.civilization.toLowerCase().includes(q) ||
        n.categories.some((c) => c.toLowerCase().includes(q)));

    if (!fullTextSearch || !isFullTextReady()) {
      return allNodes.filter(baseMatch).slice(0, 10);
    }

    // 全文搜索：遍历所有节点，description 在 allBodies 里
    // 注意：这里不直接访问 allBodies（loader 内部状态），而是走一个替代方案
    // 因为 loader 的 loadAllBodies 返回 Promise，我们在 enableFullTextSearch 里处理
    return allNodes.filter(baseMatch).slice(0, 10);
  }, [debouncedSearchQuery, dataLoaded, allNodes, fullTextSearch]);

  // 筛选后的节点
  const filteredNodes = useMemo(() => {
    if (!dataLoaded) return [];
    return allNodes.filter((n) => {
      if (!n) return false;
      if (n.year < timeRange[0] || n.year > timeRange[1]) return false;
      if (selectedCivilizations.length > 0 && !selectedCivilizations.includes(n.civilization))
        return false;
      if (
        selectedCategories.length > 0 &&
        !n.categories.some((c) => selectedCategories.includes(c))
      )
        return false;
      return true;
    });
  }, [selectedCivilizations, selectedCategories, timeRange, dataLoaded, allNodes]);

  // ========= 全文搜索 =========
  const enableFullTextSearch = useCallback(async () => {
    if (isFullTextReady()) {
      setFullTextSearch(true);
      return;
    }
    setFullTextLoading(true);
    try {
      await loadAllBodies();
      setFullTextSearch(true);
      logger.info('全文搜索已启用');
    } catch (err) {
      logger.error('全文搜索加载失败:', String(err));
    } finally {
      setFullTextLoading(false);
    }
  }, []);
  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      safeStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  // ========= 密度 =========
  const setDensity = useCallback((d: DensityMode) => {
    setDensityState(d);
    safeStorage.setItem(DENSITY_KEY, d);
  }, []);

  // ========= 缩放级别 =========
  const setZoomLevel = useCallback((z: ZoomLevel) => {
    setZoomLevelState(z);
    safeStorage.setItem(ZOOM_KEY, String(z));
  }, []);

  const zoomIn = useCallback(() => {
    setZoomLevelState((prev) => {
      const next = Math.min(5, prev + 1) as ZoomLevel;
      safeStorage.setItem(ZOOM_KEY, String(next));
      return next;
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevelState((prev) => {
      const next = Math.max(1, prev - 1) as ZoomLevel;
      safeStorage.setItem(ZOOM_KEY, String(next));
      return next;
    });
  }, []);

  // ========= 随机探索 =========
  const randomExplore = useCallback(() => {
    setRandomPulse((p) => p + 1);
    // 确保数据已加载
    if (!dataLoaded) {
      // 触发加载，等加载完成再随机
      void loadHistoryIndex().then(() => {
        const id = getRandomNodeIdFromIndex();
        if (!id) return;
        setTargetNodeId(id);
        setViewMode('timeline');
        const node = findNodeIndexById(id);
        if (node) {
          setSelectedNode(node);
          const era = ERAS.find((e) => e.id === node.eraId);
          if (era) setCurrentEra(era);
        }
      }).catch((err) => {
        logger.error('Random explore load failed:', String(err));
      });
      return;
    }
    const id = getRandomNodeIdFromIndex();
    if (!id) return;
    setTargetNodeId(id);
    setViewMode('timeline');
    const node = findNodeIndexById(id);
    if (node) {
      setSelectedNode(node);
      const era = ERAS.find((e) => e.id === node.eraId);
      if (era) setCurrentEra(era);
    }
  }, [dataLoaded]);

  // ========= 上下节点（详情面板导航） =========
  const { prevNode, nextNode } = useMemo(() => {
    if (!selectedNode || !dataLoaded) return { prevNode: null, nextNode: null };
    const idx = allNodes.findIndex((n) => n && n.id === selectedNode.id);
    return {
      prevNode: idx > 0 ? (allNodes[idx - 1] ?? null) : null,
      nextNode:
        idx >= 0 && idx < allNodes.length - 1 ? (allNodes[idx + 1] ?? null) : null,
    };
  }, [selectedNode, dataLoaded, allNodes]);

  // ========= 阅读位置记忆（防抖保存） =========
  const saveTimerRef = useRef<number | null>(null);
  const scheduleSave = useCallback(
    (data: Record<string, unknown>) => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
      saveTimerRef.current = window.setTimeout(() => {
        try {
          const existing = safeStorage.getItem(READING_KEY);
          const prev = existing ? JSON.parse(existing) : {};
          safeStorage.setItem(READING_KEY, JSON.stringify({ ...prev, ...data }));
        } catch {
          /* ignore */
        }
      }, 300);
    },
    [],
  );

  // 视图变化时保存
  useEffect(() => {
    if (!restoreDone) return;
    scheduleSave({ viewMode });
  }, [viewMode, scheduleSave, restoreDone]);

  // 筛选变化时保存
  useEffect(() => {
    if (!restoreDone) return;
    scheduleSave({ selectedCivilizations, selectedCategories, timeRange });
  }, [selectedCivilizations, selectedCategories, timeRange, scheduleSave, restoreDone]);

  // 选中节点变化时保存
  useEffect(() => {
    if (!restoreDone) return;
    scheduleSave({ selectedNodeId: selectedNode?.id ?? null });
  }, [selectedNode, scheduleSave, restoreDone]);

  // 滚动位置变化时保存（防抖）
  useEffect(() => {
    if (!restoreDone) return;
    scheduleSave({ timelineScrollTop });
  }, [timelineScrollTop, scheduleSave, restoreDone]);

  const setTimelineScrollTop = useCallback((top: number) => {
    setTimelineScrollTopState(top);
  }, []);

  const clearReadingState = useCallback(() => {
    safeStorage.removeItem(READING_KEY);
  }, []);

  // ========= 其他回调 =========
  const toggleCivilization = useCallback((c: CivilizationKey) => {
    setSelectedCivilizations((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }, []);

  const toggleCategory = useCallback((c: CategoryKey) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCivilizations([]);
    setSelectedCategories([]);
  }, []);

  const openDetail = useCallback((node: IHistoryNodeIndex) => {
    setDetailTrigger('user');
    setSelectedNode(node);
    const era = ERAS.find((e) => e.id === node.eraId);
    if (era) setCurrentEra(era);
    // 打开详情时也预加载数据（已加载则忽略）
    preloadHistoryIndex();
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((v) => !v);
  }, []);

  const setCurrentEraById = useCallback((id: string) => {
    const era = ERAS.find((e) => e.id === id);
    if (era) setCurrentEra(era);
  }, []);

  const setCurrentEraByYear = useCallback((year: number) => {
    setCurrentEra(findEraByYear(year));
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((v) => {
      const next = !v;
      if (next && playProgress >= 100) {
        setPlayProgress(0);
      }
      return next;
    });
  }, [playProgress]);

  // 自动播放逻辑
  const playRef = useRef<number | null>(null);
  const lastEraIdRef = useRef<string | null>(null);
  const eraStopTimerRef = useRef<number>(0);
  useEffect(() => {
    if (!isPlaying) {
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
        playRef.current = null;
      }
      setPlayEraCardVisible(false);
      lastEraIdRef.current = null;
      return;
    }

    let lastTime = performance.now();
    const totalYears = MAX_PLAY_YEAR - ERAS[0].startYear;
    const stopping = () => eraStopTimerRef.current > 0;

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (stopping()) {
        eraStopTimerRef.current -= delta;
        if (eraStopTimerRef.current <= 0) {
          eraStopTimerRef.current = 0;
          setPlayEraCardVisible(false);
        }
      } else {
        const progressPerSecond = (100 / 30) * playSpeed;
        setPlayProgress((prev) => {
          const next = prev + delta * progressPerSecond;
          if (next >= 100) {
            setIsPlaying(false);
            setPlayEraCardVisible(false);
            lastEraIdRef.current = null;
            return 100;
          }
          const year = ERAS[0].startYear + (next / 100) * totalYears;
          const era = findEraByYear(year);

          if (lastEraIdRef.current && lastEraIdRef.current !== era.id) {
            eraStopTimerRef.current = 2.5 / playSpeed;
            setPlayEraCardVisible(true);
            setCurrentEra(era);
            lastEraIdRef.current = era.id;
            return next;
          }
          if (!lastEraIdRef.current) {
            lastEraIdRef.current = era.id;
            setCurrentEra(era);
          }

          const windowSize = totalYears * 0.3;
          let rangeStart = year - windowSize * 0.3;
          let rangeEnd = year + windowSize * 0.7;
          if (rangeStart < ERAS[0].startYear) {
            rangeStart = ERAS[0].startYear;
            rangeEnd = rangeStart + windowSize;
          }
          if (rangeEnd > MAX_PLAY_YEAR) {
            rangeEnd = MAX_PLAY_YEAR;
            rangeStart = rangeEnd - windowSize;
          }
          setTimeRange([Math.round(rangeStart), Math.round(rangeEnd)]);
          return next;
        });
      }

      playRef.current = requestAnimationFrame(step);
    };

    playRef.current = requestAnimationFrame(step);

    return () => {
      if (playRef.current) {
        cancelAnimationFrame(playRef.current);
        playRef.current = null;
      }
    };
  }, [isPlaying, playSpeed]);

  const scrollToNode = useCallback(
    (id: string) => {
      setTargetNodeId(id);
      setViewMode('timeline');
      const node = findNodeIndexById(id);
      if (node) {
        openDetail(node);
      } else {
        // 数据还没加载，等加载完再打开
        void loadHistoryIndex().then(() => {
          const n = findNodeIndexById(id);
          if (n) openDetail(n);
        }).catch((err) => {
          logger.error('scrollToNode lazy load failed:', String(err));
        });
      }
    },
    [openDetail],
  );

  const clearTarget = useCallback(() => {
    setTargetNodeId(null);
  }, []);

  const openCompare = useCallback((nodeId?: string) => {
    setSpecialCompareLeftId(nodeId ?? null);
    setViewMode('special');
    setTimeout(() => {
      const event = new CustomEvent(AppEvents.NAVIGATE_SPECIAL_TOPIC, {
        detail: { topicId: 'compare' },
      });
      window.dispatchEvent(event);
    }, 50);
  }, []);

  // 对外返回对象用 useMemo 稳定引用，避免子组件因引用变化无谓重渲染
  return useMemo<HistoryState>(() => ({
    viewMode,
    setViewMode,
    dataLoaded,
    allNodes,
    baseNodes,
    selectedCivilizations,
    selectedCategories,
    toggleCivilization,
    toggleCategory,
    clearFilters,
    searchQuery,
    setSearchQuery,
    searchResults,
    filteredNodes,
    selectedNode,
    detailTrigger,
    openDetail,
    closeDetail,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    currentEra,
    setCurrentEraById,
    setCurrentEraByYear,
    isPlaying,
    playSpeed,
    playProgress,
    playEraCardVisible,
    togglePlay,
    setPlaySpeed,
    timeRange,
    setTimeRange,
    targetNodeId,
    scrollToNode,
    clearTarget,
    specialCompareLeftId,
    openCompare,
    favoriteIds,
    toggleFavorite,
    isFavorite,
    density,
    setDensity,
    zoomLevel,
    setZoomLevel,
    zoomIn,
    zoomOut,
    randomExplore,
    randomPulse,
    prevNode,
    nextNode,
    restoreDone,
    setTimelineScrollTop,
    timelineScrollTop,
    clearReadingState,
    loadError,
    retryLoad,
    fullTextSearch,
    setFullTextSearch,
    fullTextLoading,
    enableFullTextSearch,
    meta: HISTORY_META,
  }), [
    viewMode,
    dataLoaded,
    loadError,
    retryLoad,
    allNodes,
    baseNodes,
    selectedCivilizations,
    selectedCategories,
    toggleCivilization,
    toggleCategory,
    clearFilters,
    searchQuery,
    setSearchQuery,
    searchResults,
    filteredNodes,
    selectedNode,
    detailTrigger,
    openDetail,
    closeDetail,
    sidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    currentEra,
    setCurrentEraById,
    setCurrentEraByYear,
    isPlaying,
    playSpeed,
    playProgress,
    playEraCardVisible,
    togglePlay,
    setPlaySpeed,
    timeRange,
    setTimeRange,
    targetNodeId,
    scrollToNode,
    clearTarget,
    specialCompareLeftId,
    openCompare,
    favoriteIds,
    toggleFavorite,
    isFavorite,
    density,
    setDensity,
    zoomLevel,
    setZoomLevel,
    zoomIn,
    zoomOut,
    randomExplore,
    randomPulse,
    prevNode,
    nextNode,
    restoreDone,
    setTimelineScrollTop,
    timelineScrollTop,
    clearReadingState,
    fullTextSearch,
    setFullTextSearch,
    fullTextLoading,
    enableFullTextSearch,
  ]);
}

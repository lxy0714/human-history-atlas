// 左侧时代目录与筛选侧栏
// 桌面端：可折叠为窄轨（仅时代缩略）；移动端：Sheet 抽屉
// 支持：时代分组展开/收缩、状态持久化、键盘可达、ARIA

import { useState, useMemo, useCallback, useEffect, memo } from 'react';
import {
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronFirst,
  Filter,
  X,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ERAS, CIVILIZATIONS, CATEGORIES } from '@/data/history-constants';
import type { CivilizationKey, CategoryKey } from '@/data/history-constants';
import type { HistoryState } from './useHistoryStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { safeStorage } from './utils';
import { useI18n } from '@/i18n';
import { getEraName, getCivilizationName, getCategoryName } from '@/data/i18n/content-i18n';
import { formatYear } from './year-utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const SIDEBAR_COLLAPSED_KEY = 'history-sidebar-collapsed';

// 时代两字简称（窄轨竖排显示用）
const ERA_SHORT_NAMES: Record<string, string> = {
  prehistoric: '史前',
  ancient: '古代',
  classical: '古典',
  medieval: '中世',
  earlyModern: '近世',
  industrial: '工业',
  modern: '现代',
};

interface SidebarProps {
  store: HistoryState;
}

export default memo(function Sidebar({ store }: SidebarProps) {
  const { t, ln, nt, ny } = useI18n();
  const isMobile = useIsMobile();
  const {
    sidebarOpen,
    setSidebarOpen,
    setCurrentEraById,
    scrollToNode,
    selectedCivilizations,
    selectedCategories,
    toggleCivilization,
    toggleCategory,
    clearFilters,
    dataLoaded,
    allNodes,
    meta,
    currentEra,
  } = store;

  // 折叠状态（桌面端窄轨模式）
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return safeStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
    } catch {
      return false;
    }
  });

  // 时代分组展开状态：当前时代默认展开
  const [expandedEras, setExpandedEras] = useState<string[]>(() => {
    try {
      const raw = safeStorage.getItem('history-expanded-eras');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* ignore */
    }
    return [currentEra?.id ?? 'medieval'];
  });

  const [showFilters, setShowFilters] = useState(false);

  // 持久化折叠状态
  useEffect(() => {
    try {
      safeStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  // 持久化展开的时代
  useEffect(() => {
    try {
      safeStorage.setItem('history-expanded-eras', JSON.stringify(expandedEras));
    } catch {
      /* ignore */
    }
  }, [expandedEras]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v) => !v);
  }, []);

  const toggleEra = (eraId: string) => {
    setExpandedEras((prev) =>
      prev.includes(eraId) ? prev.filter((id) => id !== eraId) : [...prev, eraId],
    );
  };

  const handleEraTitleClick = (eraId: string) => {
    // 只切换展开/收起，不切换当前时代；同时保持跳转定位
    toggleEra(eraId);
    setCurrentEraById(eraId);
  };

  // 窄轨模式下点击时代：跳转到该时代
  const handleNarrowEraClick = (eraId: string) => {
    setCurrentEraById(eraId);
    setExpandedEras((prev) =>
      prev.includes(eraId) ? prev : [...prev, eraId],
    );
  };

  const activeFilterCount = selectedCivilizations.length + selectedCategories.length;

  // 按时代分组节点（仅数据加载后有内容）
  const nodesByEra = useMemo(() => {
    if (!dataLoaded) return null;
    const map: Record<string, typeof allNodes> = {};
    for (const era of ERAS) {
      map[era.id] = [];
    }
    for (const node of allNodes) {
      if (!node) continue;
      if (!map[node.eraId]) map[node.eraId] = [];
      map[node.eraId].push(node);
    }
    return map;
  }, [dataLoaded, allNodes]);

  const getEraCount = (eraId: string): number => {
    if (nodesByEra) return nodesByEra[eraId]?.length ?? meta.eraCounts[eraId] ?? 0;
    return meta.eraCounts[eraId] ?? 0;
  };

  const getEraNodes = (eraId: string) => {
    if (nodesByEra) return nodesByEra[eraId] ?? [];
    return [];
  };

  // 窄轨模式（折叠态）内容
  const NarrowRail = () => (
    <div className="flex h-full w-full flex-col items-center py-3 gap-2">
      {/* 折叠/展开按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="size-10 text-muted-foreground hover:text-foreground"
        onClick={toggleCollapsed}
        aria-label={collapsed ? t('sidebar.expand', '展开目录') : t('sidebar.collapse', '收起目录')}
        aria-expanded={false}
        title={collapsed ? t('sidebar.expand', '展开目录') : t('sidebar.collapse', '收起目录')}
      >
        <ChevronRight className="size-5" />
      </Button>

      <Separator className="w-8" />

      {/* 七个时代竖排按钮 */}
      <div className="flex flex-1 flex-col items-center gap-1">
        {ERAS.map((era) => {
  
          const isActive = currentEra?.id === era.id;
          return (
            <button
              key={era.id}
              onClick={() => handleNarrowEraClick(era.id)}
              aria-label={`${ln(era)}（${getEraCount(era.id)} ${t('ui.nodes', '个节点')}）`}
              title={`${ln(era)} · ${getEraCount(era.id)} ${t('ui.nodes', '个节点')}`}
              className={`group relative flex flex-col items-center justify-center gap-0.5 rounded-md px-1 py-2 transition-colors ${
                isActive
                  ? 'bg-primary/15 text-foreground'
                  : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'
              }`}
              style={{
                borderLeft: isActive ? `2px solid ${era.accent}` : '2px solid transparent',
              }}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: era.accent }}
              />
              <span
                className="text-[11px] font-medium font-serif leading-tight"
                style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
              >
                {t(`timeline.eraShort_${era.id}`, ERA_SHORT_NAMES[era.id] ?? ln(era).slice(0, 2))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // 完整目录内容（桌面展开 / 移动抽屉共用）
  const FullContent = () => (
    <div className="flex h-full flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between border-b border-foreground/10 p-3">
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen className="size-4 shrink-0 text-primary" />
          <span className="text-sm font-semibold text-foreground font-serif truncate">
            {t('ui.eraIndex', '时代目录')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={() => setShowFilters((v) => !v)}
            aria-label={showFilters ? '收起筛选' : '展开筛选'}
            aria-expanded={showFilters}
          >
            <Filter className="size-3.5 mr-1" />
            {t('sidebar.filter', '筛选')}
            {activeFilterCount > 0 && (
              <Badge variant="default" className="ml-1 h-4 px-1 text-[10px]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          {/* 桌面端：折叠按钮 */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground shrink-0"
              onClick={toggleCollapsed}
              aria-label="收起目录"
              aria-expanded={true}
              title="收起目录"
            >
              <ChevronLeft className="size-4" />
            </Button>
          )}
          {/* 移动端：关闭按钮 */}
          {isMobile && (
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground shrink-0"
                aria-label="关闭目录"
              >
                <X className="size-4" />
              </Button>
            </SheetClose>
          )}
        </div>
      </div>

      {/* 筛选面板 */}
      {showFilters && (
        <div className="space-y-3 border-b border-border/40 p-3">
          <div>
            <div className="mb-1 text-[11px] font-medium text-muted-foreground">{t('sidebar.civilizations', '文明')}</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(CIVILIZATIONS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleCivilization(key as CivilizationKey)}
                  className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
                    selectedCivilizations.includes(key as CivilizationKey)
                      ? 'border-primary/60 bg-primary/15 text-foreground'
                      : 'border-border/40 text-muted-foreground hover:border-border'
                  }`}
                >
                  <span
                    className="mr-1 inline-block size-1.5 rounded-full align-middle"
                    style={{ backgroundColor: val.color }}
                  />
                  {ln(val)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-[11px] font-medium text-muted-foreground">{t('sidebar.categories', '分类')}</div>
            <div className="flex flex-wrap gap-1">
              {Object.entries(CATEGORIES).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key as CategoryKey)}
                  className={`rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
                    selectedCategories.includes(key as CategoryKey)
                      ? 'border-primary/60 bg-primary/15 text-foreground'
                      : 'border-border/40 text-muted-foreground hover:border-border'
                  }`}
                >
                  <span className="mr-1">{val.icon}</span>
                  {ln(val)}
                </button>
              ))}
            </div>
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-7 text-xs text-muted-foreground"
              onClick={clearFilters}
            >
              <X className="size-3 mr-1" />
              {t('sidebar.clearAll', '清除全部筛选')}
            </Button>
          )}
          <Separator className="my-1" />
        </div>
      )}

      <ScrollArea className="flex-1 min-h-0">
        <div className="py-1">
          {ERAS.map((era) => {
  
            const expanded = expandedEras.includes(era.id);
            const count = getEraCount(era.id);
            const nodes = getEraNodes(era.id);
            const isCurrent = currentEra?.id === era.id;
            return (
              <div key={era.id} className="mb-1">
                <button
                  onClick={() => handleEraTitleClick(era.id)}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:text-foreground border-b border-foreground/[0.06] ${
                    isCurrent ? 'text-foreground' : 'text-foreground/70'
                  }`}
                  style={{
                    borderLeft: isCurrent ? '2px solid #C0392B' : '2px solid transparent',
                  }}
                  aria-expanded={expanded}
                  aria-controls={`era-group-${era.id}`}
                  aria-label={`${ln(era)}，${count} ${t('ui.nodes', '个节点')}，${expanded ? t('sidebar.expanded', '已展开') : t('sidebar.collapsed', '已收起')}`}
                >
                  {expanded ? (
                    <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground font-serif">
                      {ln(era)}
                    </div>
                    <div className="mt-0.5 text-[10px] text-foreground/45 tracking-wide">
                      {formatYear(era.startYear)}
                      {' ~ '}
                      {formatYear(era.endYear)}
                    </div>
                  </div>
                  <span className="text-[11px] text-foreground/50 tabular-nums">
                    {count}
                  </span>
                </button>

                {expanded && (
                  <div
                    id={`era-group-${era.id}`}
                    role="group"
                    aria-label={`${ln(era)}节点列表`}
                    className="ml-5 mt-0.5 space-y-0.5 border-l border-foreground/[0.06] pl-3"
                  >
                    {dataLoaded ? (
                      <>
                        {nodes.slice(0, 20).map((node) => (
                          <button
                            key={node.id}
                            onClick={() => {
                              scrollToNode(node.id);
                              if (isMobile) setSidebarOpen(false);
                            }}
                            className="flex w-full items-center gap-2 px-2 py-1.5 text-left transition-colors hover:text-foreground"
                            aria-label={`${nt(node)}，${ny(node.yearDisplay)}`}
                          >
                            <span className="size-1 shrink-0 bg-foreground/25" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs text-foreground/80">
                                {nt(node)}
                              </p>
                            </div>
                          </button>
                        ))}
                        {nodes.length > 20 && (
                          <p className="px-2 py-1 text-[10px] text-muted-foreground/60">
                            {t('ui.andMore', '还有')} {nodes.length - 20} {t('ui.nodesEllipsis', '个节点…')}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="space-y-1 py-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="h-5 w-full animate-pulse bg-accent/20 rounded-sm"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-border/40 p-3">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{t('ui.total', '共')} {dataLoaded ? allNodes.length : meta.totalNodes} {t('ui.historyNodes', '个历史节点')}</span>
          <span>{ERAS.length} {t('ui.eras', '个时代')}</span>
        </div>
      </div>
    </div>
  );

  // 移动端：底部抽屉式 Sheet
  if (isMobile) {
    return (
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>{t('ui.eraIndex', '时代目录')}</SheetTitle>
          </SheetHeader>
          <SheetClose className="sr-only" />
          <FullContent />
        </SheetContent>
      </Sheet>
    );
  }

  // 桌面端：侧边栏（支持折叠为窄轨），flex 布局天然占位，main 自动避让
  return (
    <aside
      className={`flex shrink-0 h-full flex-col border-r border-foreground/10 bg-background transition-[width] duration-300 ease-out ${collapsed ? 'w-14' : 'w-60'}`}
      aria-label="时代目录"
    >
      {collapsed ? <NarrowRail /> : <FullContent />}
    </aside>
  );
}, (prev, next) => {
  // 跳过播放相关高频变化字段，Sidebar 不依赖这些
  const skipKeys = ['playProgress', 'isPlaying', 'playEraCardVisible', 'playSpeed'];
  for (const key of Object.keys(prev.store) as Array<keyof typeof prev.store>) {
    if (skipKeys.includes(key as string)) continue;
    if (prev.store[key] !== next.store[key]) return false;
  }
  return true;
});

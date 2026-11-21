// EXPORTS: Header
import { useState, useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { AppEvents } from './app-events';
import { Search, Filter, Play, Pause, Dices, Menu, X, Keyboard, Clock, Globe, List, BookMarked, Film, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CIVILIZATIONS, CATEGORIES, ERAS } from '@/data/history-constants';
import type { IHistoryNodeIndex } from '@/data/history-index';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';
import { getEraName, getCivilizationName } from '@/data/i18n/content-i18n';
import type { CivilizationKey, CategoryKey } from '@/data/history-index';
import type { ViewMode, HistoryState } from './useHistoryStore';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getCurrentFestival, shouldShowFestival, dismissFestival } from '@/lib/festival';

const VIEW_OPTIONS: { value: ViewMode; label: string; icon: typeof Clock }[] = [
  { value: 'timeline', label: '时间轴', icon: Clock },
  { value: 'map', label: '世界地图', icon: Globe },
  { value: 'list', label: '百科列表', icon: List },
  { value: 'special', label: '专题馆', icon: BookMarked },
];

interface SearchBoxProps {
  searchQuery: string;
  searchFocused: boolean;
  searchResults: IHistoryNodeIndex[];
  searchRef?: React.RefObject<HTMLDivElement | null>;
  mobile?: boolean;
  fullTextSearch: boolean;
  fullTextLoading: boolean;
  onQueryChange: (value: string) => void;
  onFocus: () => void;
  onClear: () => void;
  onSelectResult: (node: IHistoryNodeIndex) => void;
  onToggleFullText: () => void;
}

function SearchBox({
  searchQuery,
  searchFocused,
  searchResults,
  searchRef,
  mobile = false,
  fullTextSearch,
  fullTextLoading,
  onQueryChange,
  onFocus,
  onClear,
  onSelectResult,
  onToggleFullText,
}: SearchBoxProps) {
  const { t, nt, ns, ny } = useI18n();
  return (
    <div ref={mobile ? undefined : searchRef} className="relative w-full">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={onFocus}
          placeholder={fullTextSearch ? t('search.fulltextPlaceholder', '搜索全文（标题+摘要+正文）') : t('search.placeholder', '搜索标题与摘要')}
          className="h-10 bg-card pl-9 pr-28 text-sm border-border focus:border-primary/50"
        />
        {/* 全文搜索切换 */}
        <button
          type="button"
          onClick={onToggleFullText}
          disabled={fullTextLoading}
          className={
            '!absolute right-12 top-1/2 z-20 flex h-7 md:h-7 h-11 min-w-14 -translate-y-1/2 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium transition-colors ' +
            (fullTextSearch
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground') +
            (fullTextLoading ? ' cursor-wait opacity-70' : '')
          }
          title={fullTextLoading ? t('search.fulltextLoading', '正在加载全文索引...') : fullTextSearch ? t('search.fulltextOn', '全文搜索已开启') : t('search.fulltextToggle', '开启全文搜索')}
        >
          {fullTextLoading && <div className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
          {fullTextLoading ? t('search.fulltextShort', '全文') : t('search.fulltextShort', '全文')}
        </button>
        {searchQuery && (
          <Button
            size="icon"
            variant="ghost"
            className="!absolute right-1 top-1/2 z-20 h-9 w-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={onClear}
            aria-label={t('common.clear', '清除')}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* 搜索结果下拉 */}
      {searchFocused && (
        <div className="absolute left-0 right-0 top-11 z-50 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-card shadow-xl">
          {searchResults.length > 0 ? (
            <div className="p-2">
              <p className="px-2 py-1 text-xs text-muted-foreground">
                {t('search.resultsFound', '找到 {n} 条结果').replace('{n}', String(searchResults.length))}
              </p>
              {searchResults.slice(0, 15).map((node) => (
                <button
                  key={node.id}
                  onClick={() => onSelectResult(node)}
                  className="flex w-full flex-col gap-1 rounded-md px-2 py-2 text-left transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {nt(node)}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {ny(node.yearDisplay)}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {ns(node)}
                  </p>
                </button>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              {t('search.noResults', '未找到相关结果')}
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-muted-foreground">
              {t('search.hint', '输入关键词搜索历史节点')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  store: HistoryState;
}

export default memo(function Header({ store }: HeaderProps) {
  const { t, lang, ln } = useI18n();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const festival = getCurrentFestival();
  const festivalVisible = festival ? shouldShowFestival(festival.key) : false;

  const viewOptions = useMemo(
    () => [
      { value: 'timeline' as ViewMode, label: t('nav.timeline', '时间轴'), icon: Clock },
      { value: 'map' as ViewMode, label: t('nav.map', '世界地图'), icon: Globe },
      { value: 'list' as ViewMode, label: t('nav.list', '百科列表'), icon: List },
      { value: 'special' as ViewMode, label: t('nav.special', '专题馆'), icon: BookMarked },
    ],
    [t],
  );

  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedCivilizations,
    selectedCategories,
    toggleCivilization,
    toggleCategory,
    clearFilters,
    isPlaying,
    togglePlay,
    playSpeed,
    setPlaySpeed,
    currentEra,
    toggleSidebar,
    randomExplore,
    randomPulse,
    scrollToNode,
    playProgress,
    fullTextSearch,
    fullTextLoading,
    enableFullTextSearch,
  } = store;

  // 随机探索 + 推荐理由
  const handleRandom = useCallback(() => {
    randomExplore();
    setTimeout(() => {
  
      const node = store.selectedNode;
      if (node) {
        const civ = getCivilizationName(node.civilization as CivilizationKey, lang) || t('header.someCiv', '某文明');
        const era = getEraName(node.eraId, lang) || t('header.someEra', '某时代');
        const reasons = [
          t('header.reason1', '来自{era}的{civ}，看看同一时期还发生了什么').replace('{era}', era).replace('{civ}', civ),
          t('header.reason2', '补全{civ}脉络里的关键一环').replace('{civ}', civ),
          t('header.reason3', '与你熟悉的历史有奇妙的同期对照'),
          t('header.reason4', '{civ}历史中不可不知的节点').replace('{civ}', civ),
          t('header.reason5', '看看这条因果链上的蝴蝶效应'),
        ];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        toast.info(`${t('header.whyExplore', '为什么看看它')}：${reason}`, {
          duration: 3500,
        });
      }
    }, 100);
  }, [randomExplore, store.selectedNode]);

  // 点击外部关闭搜索下拉
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelectResult = (node: IHistoryNodeIndex) => {
    setSearchQuery('');
    setSearchFocused(false);
    setMobileSearchOpen(false);
    scrollToNode(node.id);
  };

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchFocused(false);
  }, [setSearchQuery, setSearchFocused]);

  const handleQueryChange = useCallback(
    (value: string) => setSearchQuery(value),
    [setSearchQuery],
  );

  const handleSearchFocus = useCallback(
    () => setSearchFocused(true),
    [setSearchFocused],
  );

  const activeFilterCount = selectedCivilizations.length + selectedCategories.length;

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border bg-background">
         <div className="flex h-14 min-w-0 items-center gap-0.5 overflow-x-hidden px-2 md:h-16 md:gap-3 md:px-6">
        {/* 左侧：菜单按钮 + Logo */}
         <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
                 className="h-11 w-11 text-foreground/70 hover:text-foreground md:hidden"
            onClick={toggleSidebar}
            aria-label={t('nav.menu', '目录')}
          >
            <Menu className="size-5" />
          </Button>

           <div className="flex items-center gap-2">
             <div
               className="flex size-8 items-center justify-center rounded-none text-sm font-black font-serif"
               style={{
                 backgroundColor: 'var(--card)',
                 color: 'var(--primary)',
                 border: '1px solid var(--primary)',
               }}
             >
               史
             </div>
             {/* 节日彩蛋 */}
             {festival && festivalVisible && (
               <button
                 onClick={() => festival && dismissFestival(festival.key)}
                 className="relative -ml-2 -mt-3 flex h-5 w-5 animate-bounce items-center justify-center rounded-full text-xs hover:scale-110"
                 title={festival.label}
                 style={{ animationDuration: '1.5s' }}
               >
                 {festival.icon}
               </button>
             )}
             <div className="flex flex-col leading-tight">
                <span
                  className="text-sm font-bold tracking-wide md:text-base"
                  style={{ color: currentEra.accent, fontFamily: 'var(--font-display)' }}
                >
                  {t('header.tagline', '全球历史全景')}
                </span>
              </div>
            </div>
          </div>

        {/* 桌面端搜索框 */}
        <div className="mx-2 hidden flex-1 max-w-xl md:block">
          <SearchBox
            searchQuery={searchQuery}
            searchFocused={searchFocused}
            searchResults={searchResults}
            searchRef={searchRef}
            fullTextSearch={fullTextSearch}
            fullTextLoading={fullTextLoading}
            onQueryChange={handleQueryChange}
            onFocus={handleSearchFocus}
            onClear={handleClearSearch}
            onSelectResult={handleSelectResult}
            onToggleFullText={enableFullTextSearch}
          />
        </div>

        {/* 桌面端视图切换 */}
        <div className="hidden items-center gap-6 lg:flex">
          {viewOptions.map((opt) => {
            const Icon = opt.icon;
            const active = viewMode === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setViewMode(opt.value)}
                aria-label={`切换到${opt.label}视图`}
                className={`group relative flex items-center gap-1.5 py-1 text-[13px] tracking-[0.02em] transition-colors ${
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="size-3.5" />
                {opt.label}
                <span
                  className={`absolute left-0 right-0 -bottom-[6px] h-px transition-all ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ backgroundColor: active ? '#C0392B' : 'transparent' }}
                />
              </button>
            );
          })}
        </div>

        {/* 中间留白（桌面端） */}
        <div className="hidden flex-1 lg:block" />

        {/* 右侧操作区 */}
         <div className="flex shrink-0 items-center gap-0 md:gap-2 max-w-full overflow-hidden">
          {/* 移动端：搜索按钮 */}
          <Sheet open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 text-foreground/70 hover:text-foreground md:hidden"
                aria-label="搜索"
              >
                <Search className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto border-b border-border/40 p-0">
              <div className="p-3">
                <div className="mb-3 flex items-center gap-2">
                  <SheetClose asChild>
               <Button variant="ghost" size="icon" className="h-10 w-10">
                     <X className="size-4" />
                    </Button>
                  </SheetClose>
                  <span className="font-serif font-semibold">搜索历史</span>
                </div>
                <SearchBox
                  mobile
                  searchQuery={searchQuery}
                  searchFocused={searchFocused}
                  searchResults={searchResults}
                  fullTextSearch={fullTextSearch}
                  fullTextLoading={fullTextLoading}
                  onQueryChange={handleQueryChange}
                  onFocus={handleSearchFocus}
                  onClear={handleClearSearch}
                  onSelectResult={handleSelectResult}
                  onToggleFullText={enableFullTextSearch}
                />
              </div>
            </SheetContent>
          </Sheet>

          {/* 筛选按钮 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-11 w-11 shrink-0 gap-1.5 text-muted-foreground hover:text-foreground md:h-9 md:w-auto md:px-3 md:border md:border-foreground/15 md:!rounded-[2px]"
                aria-label="筛选"
              >
                <Filter className="size-4" />
                <span className="hidden text-xs md:inline">{t('ui.filters', '筛选')}</span>
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium font-serif">筛选条件</span>
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-[11px] text-muted-foreground"
                      onClick={clearFilters}
                    >
                      清除 <X className="ml-1 size-3" />
                    </Button>
                  )}
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">文明 / 地区</p>
                  <div className="flex flex-wrap gap-1">
                    {(Object.keys(CIVILIZATIONS) as CivilizationKey[]).map((key) => {
                      const civ = CIVILIZATIONS[key] ?? { name: key, color: '#888' };
                      const active = selectedCivilizations.includes(key);
                      return (
                        <Badge
                          key={key}
                          variant={active ? 'default' : 'outline'}
                          className="cursor-pointer text-[11px] transition-colors"
                          style={
                            active
                              ? { backgroundColor: civ.color, borderColor: civ.color, color: '#fff' }
                              : { borderColor: `${civ.color}40`, color: civ.color }
                          }
                          onClick={() => toggleCivilization(key)}
                        >
                          {ln(civ)}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">专题</p>
                  <div className="flex flex-wrap gap-1">
                    {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
                      const cat = CATEGORIES[key] ?? { name: key, icon: '◆' };
                      const active = selectedCategories.includes(key);
                      return (
                        <Badge
                          key={key}
                          variant={active ? 'secondary' : 'outline'}
                          className="cursor-pointer text-[11px]"
                          onClick={() => toggleCategory(key)}
                        >
                          <span className="mr-0.5">{cat.icon}</span>
                          {ln(cat)}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {t('ui.total', '共')} {store.dataLoaded ? store.allNodes.length : store.meta.totalNodes} {t('ui.historyNodes', '个历史节点')} · {store.meta.totalEras} {t('ui.eras', '个时代')}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* 语言切换 */}
          <LanguageSwitcher />

          {/* 主题切换 */}
          <ThemeSwitcher />

          {/* 移动端：更多菜单（随机探索收进来，省一个按钮位） */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 shrink-0 text-muted-foreground hover:text-foreground md:hidden"
                aria-label="更多"
                type="button"
              >
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <button
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  togglePlay();
                }}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                {isPlaying ? '暂停播放' : '播放历史'}
              </button>
              <div className="px-2 py-1">
                <p className="mb-1 text-[11px] text-muted-foreground">播放速度</p>
                <div className="flex gap-1">
                  {[0.5, 1, 2].map((speed) => (
                    <button
                      key={speed}
                      className={`flex-1 rounded-sm px-1 py-1 text-xs transition-colors ${
                        playSpeed === speed
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => setPlaySpeed(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
              <div className="my-1 h-px bg-border" />
              <button
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  handleRandom();
                }}
              >
                <Dices className="size-4" />
                随机探索
              </button>
              <button
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  const event = new CustomEvent(AppEvents.OPEN_PROJECTOR, {});
                  window.dispatchEvent(event);
                }}
              >
                <Film className="size-4" />
                历史放映机
              </button>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 历史放映机按钮（桌面端显示） */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-11 w-11 shrink-0 text-muted-foreground hover:text-primary md:flex md:h-10 md:w-10 md:border md:border-foreground/15 md:!rounded-[2px]"
            onClick={() => {
              const event = new CustomEvent(AppEvents.OPEN_PROJECTOR, {});
              window.dispatchEvent(event);
            }}
            aria-label="历史放映机"
            title="历史放映机（按 P 键）"
            type="button"
          >
            <Film className="size-4" />
          </Button>

          {/* 随机探索按钮（桌面端显示） */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-11 w-11 shrink-0 text-muted-foreground hover:text-primary md:flex md:h-10 md:w-10 md:border md:border-foreground/15 md:!rounded-[2px]"
            onClick={handleRandom}
            aria-label="随机探索"
            title="随机探索（按 R 键）"
            type="button"
          >
            <Dices
              key={randomPulse}
              className="size-4 transition-transform duration-500"
              style={{
                transform: randomPulse > 0 ? 'rotate(360deg) scale(1.2)' : 'rotate(0deg)',
              }}
            />
          </Button>

          {/* 快捷键帮助 */}
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground hidden md:flex border border-foreground/15 !rounded-[2px]"
                      aria-label="快捷键帮助"
                      type="button"
                    >
                      <Keyboard className="size-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-xs">快捷键</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-serif">键盘快捷键</DialogTitle>
                <DialogDescription>提升浏览效率的小技巧</DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm">
                {[
                  { keys: ['/', '搜索'], desc: '聚焦搜索框' },
                  { keys: ['Esc'], desc: '关闭详情面板 / 清除搜索' },
                  { keys: ['←', '→'], desc: '上一个 / 下一个节点（详情打开时）' },
                  { keys: ['空格'], desc: '播放 / 暂停历史长河' },
                  { keys: ['R'], desc: '随机探索' },
                ].map((item) => (
                  <div key={item.keys.join('')} className="flex items-center justify-between">
                    <span className="text-foreground/80">{item.desc}</span>
                    <div className="flex gap-1">
                      {item.keys.map((k, i) => (
                        <kbd
                          key={i}
                          className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-xs font-mono"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* 播放按钮 */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="hidden h-11 w-11 shrink-0 gap-1.5 md:inline-flex md:h-9 md:w-auto md:px-3 md:border md:border-foreground/15 md:!rounded-[2px]"
                aria-label={isPlaying ? '暂停播放' : '播放历史'}
                style={{
                  backgroundColor: isPlaying ? `${currentEra.accent}20` : undefined,
                  color: isPlaying ? currentEra.accent : undefined,
                  borderColor: isPlaying ? `${currentEra.accent}30` : undefined,
                }}
              >
                {isPlaying ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
                <span className="hidden text-xs md:inline">
                  {isPlaying ? t('ui.playing', '播放中') : t('ui.play', '播放')}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium font-serif">历史长河</span>
                  <Button size="sm" onClick={togglePlay} variant="secondary">
                    {isPlaying ? (
                      <>
                        <Pause className="mr-1 size-3" /> 暂停
                      </>
                    ) : (
                      <>
                        <Play className="mr-1 size-3" /> 播放
                      </>
                    )}
                  </Button>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">播放速度</label>
                  <Select
                    value={String(playSpeed)}
                    onValueChange={(v) => setPlaySpeed(Number(v))}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x 慢速</SelectItem>
                      <SelectItem value="1">1x 正常</SelectItem>
                      <SelectItem value="2">2x 快速</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  从远古缓缓驶向现代，感受文明的兴衰沉浮
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
       </div>

       {/* 播放进度条 */}
      {isPlaying && (
        <div className="relative h-[2px] w-full bg-border/40">
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: `${playProgress}%`,
              backgroundColor: '#C0392B',
            }}
          />
          <div
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2"
            style={{
              left: `${playProgress}%`,
              backgroundColor: '#C0392B',
            }}
          />
        </div>
      )}
    </header>
  );
});

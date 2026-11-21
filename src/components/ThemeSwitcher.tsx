import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Palette, ChevronDown } from 'lucide-react';
import { logger } from '@lark-apaas/client-toolkit-lite';
import { safeScopedStorage } from '@/lib/safeScopedStorage';
import { computePanelPosition, nextIndex, PANEL_WIDTH } from '@/lib/theme-menu';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  swatch: string;
}

const THEMES: ThemeOption[] = [
  { id: 'museum', name: '博物馆', description: '深色木质展柜（默认）', swatch: '#1a1108' },
  { id: 'ink', name: '墨夜', description: '纯黑 OLED 黑金高对比', swatch: '#0a0a0a' },
  { id: 'parchment', name: '羊皮纸', description: '暖调复古阅读', swatch: '#f4ecd8' },
  { id: 'xuanzhi', name: '宣纸', description: '素白素雅长读', swatch: '#f7f3ea' },
  { id: 'bamboo', name: '竹简', description: '青墨绿汉简质感', swatch: '#161b16' },
];

// 英文主题名（按 id 映射，不改变原中文数组）
const THEME_EN: Record<string, { name: string; description: string }> = {
  museum: { name: 'Museum', description: 'Dark wood showcase (default)' },
  ink: { name: 'Ink Night', description: 'Pure black OLED, high contrast gold' },
  parchment: { name: 'Parchment', description: 'Warm vintage reading' },
  xuanzhi: { name: 'Xuan Paper', description: 'Clean white, long reads' },
  bamboo: { name: 'Bamboo', description: 'Ink-green bamboo slip texture' },
};

const STORAGE_KEY = 'app-theme';
const PANEL_ID = 'theme-switcher-menu';

function getCurrentThemeId(): string {
  if (typeof document === 'undefined') return 'museum';
  const saved = safeScopedStorage.getItem(STORAGE_KEY);
  if (saved && THEMES.some((t) => t.id === saved)) return saved;
  return 'museum';
}

function applyTheme(themeId: string) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', themeId);
  safeScopedStorage.setItem(STORAGE_KEY, themeId);
  logger.info('切换主题:', themeId);
}

export default function ThemeSwitcher() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState('museum');
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  function getThemeName(id: string): string {
  
    if (lang === 'en-US') return THEME_EN[id]?.name ?? id;
    return THEMES.find((t) => t.id === id)?.name ?? id;
  }
  function getThemeDesc(id: string): string {
  
    if (lang === 'en-US') return THEME_EN[id]?.description ?? '';
    return THEMES.find((t) => t.id === id)?.description ?? '';
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasFocusedRef = useRef(false);

  useEffect(() => {
    const saved = getCurrentThemeId();
    setCurrentId(saved);
    applyTheme(saved);
  }, []);

  const updatePosition = useCallback(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setPanelPos(computePanelPosition({ left: rect.left, right: rect.right, bottom: rect.bottom }, window.innerWidth));
  }, []);

  // resize 时先用 rAF 等一帧（滚动条模式切换等瞬时布局偏移稳定后再取值）
  const handleResize = useCallback(() => {
    // 同步先算一次（避免视觉跳动），下一帧再校准（处理滚动条切换等边缘情况）
    updatePosition();
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [updatePosition]);

  // 打开时定位，并跟随窗口尺寸 / 滚动更新
  useEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    updatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition, handleResize]);

  // 面板首次渲染完成后把焦点移到当前选中项（必须等 panelPos 就绪，否则 item 还没挂载）
  useEffect(() => {
  
    if (!open) {
      hasFocusedRef.current = false;
      return;
    }
    if (!panelPos || hasFocusedRef.current) return;
    const idx = Math.max(0, THEMES.findIndex((t) => t.id === currentId));
    const raf = requestAnimationFrame(() => {
      const el = itemRefs.current[idx];
      if (!el) return;
      el.focus();
      hasFocusedRef.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, [open, panelPos, currentId]);

  // 面板原生 keydown：Escape 阻止冒泡到 window（详情面板在 window 监听，会同时关详情）
  // 面板 DOM 级 keydown：焦点在面板内时拦 Escape 并 stopPropagation
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const el = panelRef.current;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // document 级 capture 阶段 Escape：面板开着时优先拦截，保证焦点不在面板内也能先关面板
  useEffect(() => {
    if (!open) return;
    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
    document.addEventListener('keydown', onDocKeyDown, true);
    return () => document.removeEventListener('keydown', onDocKeyDown, true);
  }, [open]);

  // 点击面板与触发按钮之外关闭（pointerdown 早于 click，避免与开合互相吞掉）
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // 面板已在 onKeyDown 里处理 Escape 并 stopPropagation，这里不再额外监听

  function handleSelect(id: string) {
    setCurrentId(id);
    applyTheme(id);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onTriggerKeyDown(e: ReactKeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onPanelKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    const len = THEMES.length;
    const activeEl = document.activeElement;
    const idx = itemRefs.current.findIndex((el) => el === activeEl);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      itemRefs.current[nextIndex(idx, len, true)]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      itemRefs.current[nextIndex(idx, len, false)]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      itemRefs.current[len - 1]?.focus();
    } else if (e.key === 'Tab') {
      // 让焦点自然移出，同时收起面板
      setOpen(false);
    } else if (e.key === 'Escape') {
      // 阻止冒泡：详情面板在 window 监听 keydown，会同时把详情关掉
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  const current = THEMES.find((t) => t.id === currentId) ?? THEMES[0];

  const panel =
    open && panelPos && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={panelRef}
            id={PANEL_ID}
            role="menu"
            aria-label="选择主题"
            onKeyDown={onPanelKeyDown}
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              width: PANEL_WIDTH,
            }}
            className="z-[200] overflow-hidden rounded-lg border border-border/50 bg-card shadow-lg"
          >
            <div className="px-3 py-2 text-xs text-muted-foreground">{t('nt(theme)', '选择主题')}</div>
            <div className="flex flex-col pb-1">
              {THEMES.map((t, i) => {
  
                const active = t.id === currentId;
                const tName = lang === 'en-US' ? THEME_EN[t.id]?.name ?? t.name : t.name;
                const tDesc = lang === 'en-US' ? THEME_EN[t.id]?.description ?? t.description : t.description;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    tabIndex={-1}
                    onClick={() => handleSelect(t.id)}
                    className={cn(
                      'flex min-h-[44px] items-center gap-3 px-3 py-2 text-left transition-colors',
                      'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                      active ? 'bg-primary/10 text-foreground' : 'hover:bg-accent/50',
                    )}
                  >
                    <span
                      className="h-4 w-4 shrink-0 rounded-full border border-border/60"
                      style={{ backgroundColor: t.swatch }}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn('text-sm', active ? 'font-semibold' : '')}
                        style={{ fontFamily: active ? 'var(--font-display)' : 'var(--font-sans)' }}
                      >
                        {tName}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {tDesc}
                      </div>
                    </div>
                    {active && <span className="text-primary">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        aria-label={`${t('nt(theme)', '主题')} · ${current.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        className={cn(
          'flex items-center gap-1.5 rounded-md border border-border/40 bg-card/60',
          'h-11 w-11 justify-center md:h-9 md:w-auto md:px-2 md:py-1.5',
          'text-xs text-foreground/80 transition-colors hover:bg-card/90 hover:text-foreground',
          'active:scale-[0.97]',
        )}
      >
        <Palette className="h-4 w-4 shrink-0 text-primary md:h-3.5 md:w-3.5" />
        <span className="hidden whitespace-nowrap sm:inline">{t('nt(theme)', '主题')} · {getThemeName(currentId)}</span>
        <ChevronDown
          className={cn('h-3 w-3 shrink-0 transition-transform', open && 'rotate-180')}
        />
      </button>

      {panel}
    </div>
  );
}

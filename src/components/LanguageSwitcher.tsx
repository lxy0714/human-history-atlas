// —— 语言切换器 ——
// 实现口径与主题切换器完全一致：portal 到 body、固定定位、越界翻转、
// 方向键循环、aria menu/menuitemradio、Escape 关闭、外点关闭、持久化

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { computePanelPosition, nextIndex, PANEL_WIDTH } from '@/lib/theme-menu';
import { useI18n } from '@/i18n';
import type { I18nLang } from '@/i18n/types';

interface LangOption {
  id: I18nLang;
  label: string;
  nativeName: string; // 母语写法（中文写"中文"，英文写"English"）
}

// 语言列表：id 与 useI18n 持久化 key 一致
const LANGUAGES: LangOption[] = [
  { id: 'zh-CN', label: '简体中文', nativeName: '中文' },
  { id: 'en-US', label: 'English', nativeName: 'EN' },
];

const PANEL_ID = 'language-switcher-menu';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasFocusedRef = useRef(false);

  const current = LANGUAGES.find((l) => l.id === lang) ?? LANGUAGES[0];

  const updatePosition = useCallback(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setPanelPos(
      computePanelPosition(
        { left: rect.left, right: rect.right, bottom: rect.bottom },
        window.innerWidth,
      ),
    );
  }, []);

  const handleResize = useCallback(() => {
    updatePosition();
    requestAnimationFrame(() => {
      updatePosition();
    });
  }, [updatePosition]);

  // 打开时定位 + 跟随窗口/滚动更新
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

  // 面板就绪后聚焦当前项
  useEffect(() => {
    if (!open) {
      hasFocusedRef.current = false;
      return;
    }
    if (!panelPos || hasFocusedRef.current) return;
    const idx = Math.max(0, LANGUAGES.findIndex((l) => l.id === lang));
    const raf = requestAnimationFrame(() => {
      const el = itemRefs.current[idx];
      if (!el) return;
      el.focus();
      hasFocusedRef.current = true;
    });
    return () => cancelAnimationFrame(raf);
  }, [open, panelPos, lang]);

  // 面板内 Escape 拦冒泡（防止详情面板同时被关）
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

  // document 级 capture Escape：面板开着时优先拦截
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

  // 外点关闭（pointerdown 早于 click）
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

  function handleSelect(id: I18nLang) {
    setLang(id);
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
    const len = LANGUAGES.length;
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
      setOpen(false);
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  const panel =
    open && panelPos && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={panelRef}
            id={PANEL_ID}
            role="menu"
            aria-label={t('common.language', '语言')}
            onKeyDown={onPanelKeyDown}
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              width: PANEL_WIDTH,
            }}
            className="z-[200] overflow-hidden rounded-lg border border-border/50 bg-card shadow-lg"
          >
            <div className="px-3 py-2 text-xs text-muted-foreground">
              {t('common.language', '语言')}
            </div>
            <div className="flex flex-col pb-1">
              {LANGUAGES.map((l, i) => {
                const active = l.id === lang;
                return (
                  <button
                    key={l.id}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    tabIndex={-1}
                    onClick={() => handleSelect(l.id)}
                    className={cn(
                      'flex min-h-[44px] items-center gap-3 px-3 py-2 text-left transition-colors',
                      'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                      active ? 'bg-primary/10 text-foreground' : 'hover:bg-accent/50',
                    )}
                  >
                    <Globe className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn('text-sm', active ? 'font-semibold' : '')}
                        style={{
                          fontFamily: active ? 'var(--font-display)' : 'var(--font-sans)',
                        }}
                      >
                        {l.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {l.nativeName}
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

  const ariaLabel =
    lang === 'en-US'
      ? `Switch language, current: ${current.label}`
      : `切换语言，当前 ${current.label}`;

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        aria-label={ariaLabel}
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
        <Globe className="h-4 w-4 shrink-0 text-primary md:h-3.5 md:w-3.5" />
        <span className="hidden whitespace-nowrap sm:inline">
          {current.nativeName}
        </span>
        <ChevronDown
          className={cn('h-3 w-3 shrink-0 transition-transform', open && 'rotate-180')}
        />
      </button>

      {panel}
    </div>
  );
}

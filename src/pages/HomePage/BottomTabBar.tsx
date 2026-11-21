// EXPORTS: BottomTabBar
import { Clock, Globe, List, BookMarked } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useI18n } from '@/i18n';
import type { ViewMode } from './useHistoryStore';

interface BottomTabBarProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export default function BottomTabBar({ viewMode, onChange }: BottomTabBarProps) {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  const tabs = [
    { id: 'timeline' as ViewMode, label: t('view.timeline', '时间轴'), icon: Clock },
    { id: 'map' as ViewMode, label: t('view.map', '世界地图'), icon: Globe },
    { id: 'list' as ViewMode, label: t('view.list', '百科'), icon: List },
    { id: 'special' as ViewMode, label: t('view.special', '专题馆'), icon: BookMarked },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background"
      role="tablist"
      aria-label={t('nav.viewSwitch', '视图切换')}
      style={{
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom))',
        paddingTop: '6px',
      }}
    >
      <div className="flex h-12 w-full items-stretch justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={tab.label}
              onClick={() => onChange(tab.id)}
              className="group relative flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-200 ease-out"
              style={{
                color: active ? 'var(--primary)' : 'var(--muted-foreground)',
                transform: active ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <Icon
                className="h-5 w-5 transition-transform duration-200 ease-out"
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="truncate"
                style={{
                  fontFamily: active ? 'var(--font-display)' : 'var(--font-sans)',
                  letterSpacing: active ? '0.02em' : '0',
                }}
              >
                {tab.label}
              </span>
              {active && (
                <span
                  className="absolute -top-0.5 h-px w-6"
                  style={{ backgroundColor: '#C0392B' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

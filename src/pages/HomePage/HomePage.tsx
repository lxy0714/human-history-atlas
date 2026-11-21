// EXPORTS: HomePage
import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { useI18n } from '@/i18n';
import { AppEvents } from './app-events';
import { formatYear } from './utils';
import { toast } from 'sonner';
import { useHistoryStore } from './useHistoryStore';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { I18nProvider } from '@/i18n';
import Header from './Header';
import Sidebar from './Sidebar';
import LoadingScreen from './LoadingScreen';
import TimeSlider from './TimeSlider';
import BottomTabBar from './BottomTabBar';
import ViewSkeleton from '@/components/ViewSkeleton';
import ViewErrorBoundary from '@/components/ViewErrorBoundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { lazyWithRetry } from '@/utils/lazy';
import ChunkLoadErrorView from './ChunkLoadErrorView';
import { shouldAutoReload, isChunkLoadError } from '@/utils/chunk-recovery';
import { getLastAutoReloadTime, setLastAutoReloadTime } from '@/utils/chunk-recovery-storage';
import { motion, AnimatePresence } from 'framer-motion';

// 主视图懒加载（独立 chunk）
const TimelineView = lazyWithRetry(() => import('./TimelineView'));
const MapView = lazyWithRetry(() => import('./MapView'));
const ListView = lazyWithRetry(() => import('./ListView'));
const SpecialHall = lazyWithRetry(() => import('./SpecialHall'));
const HistoryProjector = lazyWithRetry(() => import('./components/HistoryProjector'));
const DetailPanel = lazyWithRetry(() => import('./DetailPanel'));

export default function HomePage() {
  return (
    <I18nProvider>
      <HomePageInner />
    </I18nProvider>
  );
}

function HomePageInner() {
  const { ln } = useI18n();
  const store = useHistoryStore();
  const { viewMode, currentEra, isPlaying, playEraCardVisible, setViewMode, openDetail, loadError, retryLoad } = store;
  const [projectorOpen, setProjectorOpen] = useState(false);
  const [chunkError, setChunkError] = useState<Error | null>(null);

  // 分片加载失败自愈：自动 reload（30 秒内只一次），二次失败展示手动重试 UI
  const handleViewError = useCallback((error: Error): boolean => {
    if (!isChunkLoadError(error)) return false; // 非分片错误走默认错误 UI

    const now = Date.now();
    const last = getLastAutoReloadTime();

    if (shouldAutoReload(last, now)) {
      // 自动恢复：记录时间 + 刷新
      setLastAutoReloadTime(now);
      // 延迟到 commit 后再刷新，避免 React 报错中断
      setTimeout(() => {
        window.location.reload();
      }, 0);
      return true; // 已自定义处理，不展示默认错误 UI
    }

    // 30 秒内已自动重试过 → 展示手动重试 UI
    setChunkError(error);
    return true;
  }, []);
  useEffect(() => {
    const handler = () => setProjectorOpen(true);
    window.addEventListener(AppEvents.OPEN_PROJECTOR, handler);
    return () => window.removeEventListener(AppEvents.OPEN_PROJECTOR, handler);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 键盘快捷键
  useKeyboardShortcuts(store);

  // 监听搜索聚焦事件
  useEffect(() => {
    const handler = () => {
      // 触发Header里的搜索框聚焦（通过派发自定义事件）
      const input = document.querySelector('input[type="search"]') as HTMLInputElement | null;
      if (input) {
        input.focus();
        input.select();
      }
    };
    window.addEventListener(AppEvents.FOCUS_SEARCH, handler);
    return () => window.removeEventListener(AppEvents.FOCUS_SEARCH, handler);
  }, []);

  // 全局背景渐变（中性暖黑色系）
  const bgStyle: React.CSSProperties = {
    background:
      'radial-gradient(ellipse at top, hsl(28 18% 12%) 0%, hsl(28 20% 9%) 60%, hsl(28 22% 7%) 100%)',
    transition: 'background 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  // 本部署环境 CDN 对静态资源做 302 重定向，浏览器禁止注册重定向后的 SW，故不启用离线缓存


  return (
    <div
      className="flex min-h-screen min-h-[100dvh] flex-col text-foreground"
      style={bgStyle}
    >
      {/* 加载动画 */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 噪点纹理叠加层 */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] noise-overlay" />

      {/* 顶部导航 */}
      <Header store={store} />

      {/* 主体区域 */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* 左侧目录 */}
        <Sidebar store={store} />

        {/* 主视图区 */}
        <main className="flex-1 overflow-hidden p-3 md:p-5 lg:p-6 pb-0 md:pb-5 lg:pb-6">
          {/* 数据加载失败提示 */}
          {loadError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-destructive-foreground"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="font-medium">历史数据加载失败</div>
                  <div className="mt-1 text-sm opacity-90">
                    {loadError.includes('timeout')
                      ? '加载超时，请检查网络后重试。'
                      : loadError.length > 100
                        ? `${loadError.slice(0, 100)}...`
                        : loadError}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={retryLoad}
                  className="shrink-0 rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                >
                  重试
                </button>
              </div>
            </div>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="h-full"
            >
              <ViewErrorBoundary
                title="视图加载失败了"
                description="历史画卷暂时没能打开，点击重新加载试试。"
                onRetry={() => window.location.reload()}
                onError={handleViewError}
              >
                <Suspense fallback={<ViewSkeleton title="加载视图中..." />}>
                  {viewMode === 'timeline' && <TimelineView store={store} />}
                  {viewMode === 'map' && <MapView store={store} />}
                  {viewMode === 'list' && <ListView store={store} />}
                  {viewMode === 'special' && <SpecialHall store={store} />}
                </Suspense>
              </ViewErrorBoundary>

              {/* 分片加载失败手动重试 UI（在错误边界外，错误边界 handled 模式下渲染 null） */}
              {chunkError && (
                <ChunkLoadErrorView
                  error={chunkError}
                  onRetry={() => window.location.reload()}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 底部时间滑块 */}
      <TimeSlider store={store} />

      {/* 移动端底部 Tab Bar */}
      <BottomTabBar viewMode={viewMode} onChange={setViewMode} />

      {/* 详情面板 */}
      <Suspense fallback={null}>
        <DetailPanel store={store} />
      </Suspense>

      {/* 播放时代介绍卡片 */}
      <AnimatePresence>
        {isPlaying && playEraCardVisible && !projectorOpen && (
          <motion.div
            key={currentEra.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-30 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="relative overflow-hidden rounded-2xl border p-6 shadow-2xl"
              style={{
                backgroundColor: `${currentEra.bgFrom}ee`,
                borderColor: `${currentEra.accent}40`,
              }}
            >
              {/* 装饰角 */}
              <div
                className="absolute -left-8 -top-8 size-24 rounded-full opacity-20 blur-2xl"
                style={{ backgroundColor: currentEra.accent }}
              />
              <div
                className="absolute -bottom-10 -right-8 size-28 rounded-full opacity-15 blur-2xl"
                style={{ backgroundColor: currentEra.accent }}
              />

              <div
                className="mb-3 inline-block rounded-full px-3 py-1 text-sm font-bold tracking-wide"
                style={{
                  backgroundColor: `${currentEra.accent}20`,
                  color: currentEra.accent,
                  border: `1px solid ${currentEra.accent}30`,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {ln(currentEra)}
              </div>
              <h2
                className="mb-2 text-2xl font-black tracking-wide font-serif"
                style={{ color: currentEra.accent }}
              >
                {ln(currentEra)}
              </h2>
              <p className="mb-3 text-xs text-muted-foreground">
                {formatYear(currentEra.startYear, { compact: false, useGrouping: true })}
                {' ~ '}
                {formatYear(currentEra.endYear, { compact: false, useGrouping: true })}
              </p>
              <p className="text-sm leading-relaxed text-foreground/85">
                {currentEra.description}
              </p>
              <div
                className="mt-5 h-1 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: `${currentEra.accent}20` }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: currentEra.accent,
                    boxShadow: `0 0 8px ${currentEra.accent}80`,
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'linear' }}
                />
              </div>
              <p className="mt-2 text-center text-[10px] tracking-widest text-muted-foreground">
                时 代 概 览
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 历史放映机（全屏模式） */}
      <AnimatePresence>
        {projectorOpen && (
          <Suspense fallback={null}>
            <HistoryProjector
              open={projectorOpen}
              onClose={() => setProjectorOpen(false)}
              onOpenDetail={openDetail}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

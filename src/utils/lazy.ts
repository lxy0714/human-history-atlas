// 懒加载工具 - 带重试 + 预取
import { lazy, ComponentType, useEffect } from 'react';

interface LazyOptions {
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * 创建带重试能力的懒加载组件
 * chunk 加载失败时自动重试，最多 retryAttempts 次
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyOptions = {},
) {
  const { retryAttempts = 2, retryDelay = 1000 } = options;
  let attempts = 0;

  const loadComponent = (): Promise<{ default: T }> => {
    return importFn().catch((error) => {
      attempts += 1;
      if (attempts <= retryAttempts) {
        return new Promise<{ default: T }>((resolve) => {
          setTimeout(() => {
            resolve(loadComponent());
          }, retryDelay * attempts);
        });
      }
      // 重试耗尽 → 抛错给 ErrorBoundary 统一处理（自愈逻辑在边界层）
      const wrapped = new Error(
        `懒加载分片失败（已重试 ${retryAttempts} 次）：${error?.message ?? String(error)}`,
        { cause: error },
      );
      wrapped.name = 'ChunkLoadError';
      throw wrapped;
    });
  };

  return lazy(loadComponent);
}

/**
 * 预取懒加载 chunk（不渲染，仅下载到缓存）
 */
export function prefetchChunk(importFn: () => Promise<unknown>) {
  if (typeof window === 'undefined') return;
  // requestIdleCallback 优先，否则 setTimeout 兜底
  const idleCb =
    (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 2000));
  idleCb(() => {
    importFn().catch(() => {
      // 预取失败静默
    });
  });
}

/**
 * 判断是否为移动端（窄屏或触控设备）
 * 移动端不做跨视图预取，节省首屏带宽
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const narrow = window.matchMedia?.('(max-width: 767px)').matches;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches;
  return Boolean(narrow || coarse);
}

/**
 * Hook 版本：首屏渲染完成后预取指定模块
 * 移动端（窄屏/触控）跳过预取，桌面端保留预取
 */
export function usePrefetchChunks(prefetchFns: Array<() => Promise<unknown>>) {
  useEffect(() => {
    // 移动端不预取
    if (isMobileDevice()) return;

    // 桌面端：延迟到首屏渲染后预取
    const timer = setTimeout(() => {
      prefetchFns.forEach((fn) => fn().catch(() => {}));
    }, 1500);
    return () => clearTimeout(timer);
  }, [prefetchFns]);
}

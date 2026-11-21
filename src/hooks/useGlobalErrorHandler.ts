// 全局错误监听：捕获未处理的 Promise rejection、window error、资源加载失败
// 只记录不干扰用户，避免崩溃白屏
import { useEffect } from 'react';
import { logger } from '@lark-apaas/client-toolkit-lite';

export function useGlobalErrorHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      // 阻止默认行为（防止某些浏览器弹错误框）
      // e.preventDefault();
      const reason = e.reason;
      const msg = reason?.message ?? String(reason ?? 'unknown');
      logger.error('[unhandledrejection]', msg);
      // 常见网络错误静默，不打扰用户
      if (
        msg.includes('chunk failed') ||
        msg.includes('Load failed') ||
        msg.includes('NetworkError') ||
        msg.includes('Failed to fetch')
      ) {
        return;
      }
    };

    const handleWindowError = (e: ErrorEvent) => {
      logger.error('[window.error]', e.message);
      // 资源加载错误（图片/脚本/样式）不做全局拦截
      // 由各组件自己的 onError 兜底
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleWindowError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleWindowError, true);
    };
  }, []);
}

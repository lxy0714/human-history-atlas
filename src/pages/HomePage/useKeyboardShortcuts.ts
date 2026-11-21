// EXPORTS: useKeyboardShortcuts
import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { HistoryState } from './useHistoryStore';
import { safeStorage } from './utils';
import { AppEvents } from './app-events';

const SHORTCUT_HINT_KEY = 'history-shortcut-hint-shown';

export function useKeyboardShortcuts(store: HistoryState) {
  const {
    selectedNode,
    closeDetail,
    scrollToNode,
    togglePlay,
    viewMode,
    randomExplore,
    setSearchQuery,
    searchQuery,
    prevNode,
    nextNode,
  } = store;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      // 忽略输入框中的按键（Esc除外）
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Esc：关闭详情/清除搜索/关闭弹窗
      if (e.key === 'Escape') {
        if (selectedNode) {
          closeDetail();
          return;
        }
        if (searchQuery) {
          setSearchQuery('');
          return;
        }
      }

      if (isInput && e.key !== 'Escape') return;

      // / 聚焦搜索
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        // 派发事件让Header的搜索框聚焦
        const event = new CustomEvent(AppEvents.FOCUS_SEARCH);
        window.dispatchEvent(event);
        return;
      }

      // 空格：播放/暂停（仅时间轴/地图/列表视图）
      if (e.code === 'Space' && viewMode !== 'special') {
        e.preventDefault();
        togglePlay();
        return;
      }

      // R：随机探索
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        randomExplore();
        return;
      }

      // 左右箭头：仅在详情面板打开且不在专题馆时
      if (selectedNode && viewMode !== 'special') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (prevNode) scrollToNode(prevNode.id);
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (nextNode) scrollToNode(nextNode.id);
          return;
        }
      }
    },
    [
      selectedNode,
      closeDetail,
      scrollToNode,
      togglePlay,
      viewMode,
      randomExplore,
      setSearchQuery,
      searchQuery,
      prevNode,
      nextNode,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  // 首次访问显示toast提示（静默一次后不再显示）
  useEffect(() => {
    const shown = safeStorage.getItem(SHORTCUT_HINT_KEY);
    if (!shown) {
      safeStorage.setItem(SHORTCUT_HINT_KEY, '1');
      // 延迟到页面加载完
      const timer = setTimeout(() => {
        toast.info('按 / 快速搜索，按 R 随机探索，Esc 关闭', {
          duration: 3500,
          description: '点击右上角键盘图标查看全部快捷键',
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
    return;
  }, []);
}

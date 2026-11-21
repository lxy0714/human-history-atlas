// EXPORTS: useGraphPanZoom
// 图谱视图通用手势 hook：滚轮缩放、拖拽平移、双指触摸、重置视图
// 用于 RelationGraphModal / PersonEgoGraph 等 SVG 实现的图谱组件
import { useState, useRef, useCallback, useEffect, type RefObject } from 'react';
import {
  GRAPH_MIN_SCALE,
  GRAPH_MAX_SCALE,
  GRAPH_WHEEL_ZOOM_STEP,
} from './graph-view-constants';

export interface GraphViewState {
  x: number;
  y: number;
  scale: number;
}

export interface UseGraphPanZoomOptions {
  /** 最小缩放，默认 GRAPH_MIN_SCALE */
  minScale?: number;
  /** 最大缩放，默认 GRAPH_MAX_SCALE */
  maxScale?: number;
  /** 滚轮步长（乘算，<1 为缩小），默认 GRAPH_WHEEL_ZOOM_STEP */
  wheelStep?: number;
  /** 是否启用滚轮缩放，默认 true */
  enableWheel?: boolean;
  /** 是否启用拖拽平移，默认 true */
  enableDrag?: boolean;
  /** 是否启用触摸手势，默认 true */
  enableTouch?: boolean;
  /** 滚轮事件绑定的 DOM 元素（不传则不绑定 wheel，可手动调用 handleWheel） */
  wheelElement?: RefObject<HTMLElement | null> | null;
  /** 仅当此条件为 true 时才绑定事件，默认 true */
  enabled?: boolean;
}

export interface UseGraphPanZoomReturn {
  /** 当前视图状态 */
  view: GraphViewState;
  /** 直接设置视图 */
  setView: React.Dispatch<React.SetStateAction<GraphViewState>>;
  /** 重置为初始视图（0,0,1） */
  resetView: () => void;
  /** 按比例缩放（以当前中心为锚点） */
  zoomBy: (factor: number) => void;
  /** 滚轮缩放处理函数（若 wheelElement 已传，则自动绑定，无需手动调用） */
  handleWheel: (e: WheelEvent) => void;
  /** 鼠标按下（开始拖拽） */
  handleMouseDown: (e: React.MouseEvent, startVx?: number, startVy?: number) => void;
  /** 鼠标移动（拖拽中） */
  handleMouseMove: (e: React.MouseEvent) => void;
  /** 鼠标抬起（结束拖拽） */
  handleMouseUp: () => void;
  /** 触摸开始 */
  handleTouchStart: (e: React.TouchEvent) => void;
  /** 触摸移动 */
  handleTouchMove: (e: React.TouchEvent) => void;
  /** 触摸结束 */
  handleTouchEnd: () => void;
  /** 是否正在拖拽 */
  isDragging: boolean;
}

export function useGraphPanZoom(options: UseGraphPanZoomOptions = {}): UseGraphPanZoomReturn {
  const {
    minScale = GRAPH_MIN_SCALE,
    maxScale = GRAPH_MAX_SCALE,
    wheelStep = GRAPH_WHEEL_ZOOM_STEP,
    enableWheel = true,
    enableDrag = true,
    enableTouch = true,
    wheelElement = null,
    enabled = true,
  } = options;

  const [view, setView] = useState<GraphViewState>({ x: 0, y: 0, scale: 1 });
  // 用 ref 保存最新 view，事件处理函数从 ref 读取，避免依赖 view 导致频繁重建
  const viewRef = useRef(view);
  viewRef.current = view;

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const touchRef = useRef<{ x: number; y: number; dist: number; vx: number; vy: number; scale: number } | null>(null);

  const clampScale = useCallback(
    (s: number) => Math.max(minScale, Math.min(maxScale, s)),
    [minScale, maxScale],
  );

  const resetView = useCallback(() => {
    setView({ x: 0, y: 0, scale: 1 });
  }, []);

  const zoomBy = useCallback(
    (factor: number) => {
      setView((v) => ({ ...v, scale: clampScale(v.scale * factor) }));
    },
    [clampScale],
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enableWheel || !enabled) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? wheelStep : 1 / wheelStep;
      setView((v) => ({ ...v, scale: clampScale(v.scale * delta) }));
    },
    [enableWheel, enabled, wheelStep, clampScale],
  );

  // 滚轮事件绑定
  useEffect(() => {
    if (!enableWheel || !enabled || !wheelElement?.current) return;
    const el = wheelElement.current;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [enableWheel, enabled, wheelElement, handleWheel]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, startVx?: number, startVy?: number) => {
      if (!enableDrag || !enabled) return;
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx: startVx ?? viewRef.current.x,
        vy: startVy ?? viewRef.current.y,
      };
    },
    [enableDrag, enabled],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enableDrag || !enabled || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setView((v) => ({
        ...v,
        x: dragStartRef.current!.vx + dx,
        y: dragStartRef.current!.vy + dy,
      }));
    },
    [enableDrag, enabled],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enableTouch || !enabled) return;
      const currentView = viewRef.current;
      if (e.touches.length === 1) {
        touchRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          dist: 0,
          vx: currentView.x,
          vy: currentView.y,
          scale: currentView.scale,
        };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchRef.current = {
          x: 0,
          y: 0,
          dist: Math.sqrt(dx * dx + dy * dy),
          vx: currentView.x,
          vy: currentView.y,
          scale: currentView.scale,
        };
      }
    },
    [enableTouch, enabled],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enableTouch || !enabled || !touchRef.current) return;
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchRef.current.x;
        const dy = e.touches[0].clientY - touchRef.current.y;
        setView((v) => ({
          x: touchRef.current!.vx + dx,
          y: touchRef.current!.vy + dy,
          scale: v.scale,
        }));
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ratio = dist / (touchRef.current.dist || dist);
        setView((v) => ({
          ...v,
          scale: clampScale(touchRef.current!.scale * ratio),
        }));
      }
    },
    [enableTouch, enabled, clampScale],
  );

  const handleTouchEnd = useCallback(() => {
    touchRef.current = null;
  }, []);

  return {
    view,
    setView,
    resetView,
    zoomBy,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    isDragging,
  };
}

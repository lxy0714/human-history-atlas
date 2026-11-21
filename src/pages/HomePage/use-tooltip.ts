// —— 通用 tooltip hook（鼠标跟随 + 边界检测） ——
// 适用于 DOM / SVG 节点 hover 显示 tooltip 的场景。
// 用法：const { tooltipProps, tooltipStyle, tooltipNode } = useTooltip<T>(containerRef);
//       在节点上绑定 onMouseMove / onMouseLeave；
//       tooltipNode 是当前 hover 的数据，tooltipStyle 是定位好的样式。

import { useState, useCallback, type RefObject } from 'react';

interface UseTooltipOptions {
  /** tooltip 距鼠标的偏移量（px），默认 12 */
  offset?: number;
  /** tooltip 预估宽度（用于右边界检测），默认 220 */
  tooltipWidth?: number;
  /** tooltip 预估高度（用于下边界检测），默认 80 */
  tooltipHeight?: number;
  /** 距容器边缘的最小安全距离（px），默认 10 */
  margin?: number;
}

interface UseTooltipResult<T> {
  /** 当前 hover 的节点数据（null 表示未 hover） */
  hovered: T | null;
  /** tooltip 定位样式（left/top） */
  style: { left: number; top: number };
  /** 鼠标移入节点时调用，传入事件和节点数据 */
  handleMouseMove: (e: React.MouseEvent, node: T) => void;
  /** 鼠标移出节点时调用 */
  handleMouseLeave: () => void;
}

export function useTooltip<T>(
  containerRef: RefObject<HTMLElement | null>,
  options: UseTooltipOptions = {},
): UseTooltipResult<T> {
  const { offset = 12, tooltipWidth = 220, tooltipHeight = 80, margin = 10 } = options;

  const [hovered, setHovered] = useState<T | null>(null);
  const [style, setStyle] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, node: T) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const containerW = rect.width;
      const containerH = rect.height;

      // 右边界检测：超出则翻转到鼠标左侧
      let left = relX + offset;
      if (left + tooltipWidth > containerW - margin) {
        left = relX - offset - tooltipWidth;
      }
      // 左边界兜底
      left = Math.max(left, margin);

      // 下边界检测：超出则向上翻
      let top = relY + offset;
      if (top + tooltipHeight > containerH - margin) {
        top = relY - offset - tooltipHeight;
      }
      // 上边界兜底
      top = Math.max(top, margin);

      setStyle({ left, top });
      setHovered(node);
    },
    [containerRef, offset, tooltipWidth, tooltipHeight, margin],
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
  }, []);

  return { hovered, style, handleMouseMove, handleMouseLeave };
}

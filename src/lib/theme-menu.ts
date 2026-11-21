/**
 * 主题切换器的纯计算逻辑（无 DOM / 无 logger 依赖，便于单测）。
 */

export const PANEL_WIDTH = 224;
export const PANEL_GAP = 4;
export const VIEWPORT_MARGIN = 8;

export interface RectLike {
  left: number;
  right: number;
  bottom: number;
}

/**
 * 计算面板固定定位坐标：
 * - 默认左对齐触发按钮，向右展开
 * - 若右边缘会超出视口（含边距），自动翻转成右对齐
 * - 翻转后若仍越界（极窄屏），夹到视口边距内
 */
export function computePanelPosition(rect: RectLike, viewportWidth: number) {
  const leftEdge = rect.left as number;
  const rightEdge = rect.right as number;
  const maxLeft = viewportWidth - PANEL_WIDTH - VIEWPORT_MARGIN;

  // 默认左对齐
  let left = leftEdge;

  // 右越界 → 翻转成右对齐
  if (leftEdge + PANEL_WIDTH > viewportWidth - VIEWPORT_MARGIN) {
    left = rightEdge - PANEL_WIDTH;
  }

  // 左越界兜底（极窄屏）
  left = Math.max(VIEWPORT_MARGIN, Math.min(left, maxLeft));

  return { top: rect.bottom + PANEL_GAP, left };
}

/**
 * 方向键在选项间的下一个索引（循环）。
 * current < 0 表示当前没有聚焦项。
 */
export function nextIndex(current: number, length: number, forward: boolean) {
  if (length <= 0) return -1;
  if (current < 0) return forward ? 0 : length - 1;
  return forward ? (current + 1) % length : (current - 1 + length) % length;
}

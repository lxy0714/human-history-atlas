import { describe, expect, it } from 'vitest';
import { computePanelPosition, nextIndex, PANEL_WIDTH } from '@/lib/theme-menu';

describe('主题面板定位（左对齐优先，越界翻转）', () => {
  it('默认左对齐触发按钮（空间充足时向右展开）', () => {
    // 按钮左=900 右=1050，面板宽 224 → 左对齐后右边缘=1124 < 1280-8，完全放得下
    const pos = computePanelPosition({ left: 900, right: 1050, bottom: 54 }, 1280);
    expect(pos.left).toBe(900);
    expect(pos.left + PANEL_WIDTH).toBeLessThanOrEqual(1280 - 8);
    expect(pos.top).toBe(58);
  });

  it('按钮在视口右侧、右越界时自动翻转成右对齐', () => {
    // 按钮左=1150 右=1250，面板宽 224 → 左对齐到 1150+224=1374 > 1280，翻转为右对齐
    const pos = computePanelPosition({ left: 1150, right: 1250, bottom: 54 }, 1280);
    expect(pos.left).toBe(1250 - PANEL_WIDTH); // 右对齐
    expect(pos.left + PANEL_WIDTH).toBe(1250);
  });

  it('窄视口 390 宽时翻转为右对齐且完整在视口内', () => {
    // 按钮左=274 右=318（390 屏右侧的主题按钮），面板宽 224
    // 左对齐 274+224=498 > 390，翻转为右对齐 318-224=94
    const pos = computePanelPosition({ left: 274, right: 318, bottom: 54 }, 390);
    expect(pos.left).toBe(318 - PANEL_WIDTH); // 右对齐翻转
    expect(pos.left).toBeGreaterThanOrEqual(8);
    expect(pos.left + PANEL_WIDTH).toBeLessThanOrEqual(390 - 8 + 0.001);
  });

  it('极窄视口仍夹在视口左边界（面板宽于视口时右越界是预期的）', () => {
    const pos = computePanelPosition({ left: 10, right: 100, bottom: 54 }, 150);
    expect(pos.left).toBe(8); // 夹到左边界 VIEWPORT_MARGIN
  });

  it('不压住左侧按钮：1280 下主题按钮 left≈890 时面板不从筛选按钮底下过', () => {
    // 主题按钮 left=889 right=1022（133px 宽），筛选按钮 right≈881
    // 面板左对齐应从 889 开始，不会向左伸到 881 以下
    const pos = computePanelPosition({ left: 889, right: 1022, bottom: 54 }, 1280);
    expect(pos.left).toBe(889);
    expect(pos.left).toBeGreaterThan(881); // 面板左缘在筛选按钮右缘右侧
  });
});

describe('方向键循环索引', () => {
  it('向下正常前进', () => {
    expect(nextIndex(0, 5, true)).toBe(1);
    expect(nextIndex(3, 5, true)).toBe(4);
  });

  it('向下到底回到 0', () => {
    expect(nextIndex(4, 5, true)).toBe(0);
  });

  it('向上到顶回到末位', () => {
    expect(nextIndex(0, 5, false)).toBe(4);
  });

  it('无聚焦项时按方向落到首/末项', () => {
    expect(nextIndex(-1, 5, true)).toBe(0);
    expect(nextIndex(-1, 5, false)).toBe(4);
  });

  it('空列表返回 -1', () => {
    expect(nextIndex(0, 0, true)).toBe(-1);
  });
});

import { describe, it, expect } from 'vitest';
import { stripInlineMarkers, splitFirstCharForDropCap } from './markdown-render';

describe('stripInlineMarkers', () => {
  it('移除 **粗体** 标记', () => {
    expect(stripInlineMarkers('**蒂卡尔**是玛雅最大的城市')).toBe('蒂卡尔是玛雅最大的城市');
    expect(stripInlineMarkers('**背景与起源：** 文艺复兴')).toBe('背景与起源： 文艺复兴');
  });

  it('移除 *斜体* 标记', () => {
    expect(stripInlineMarkers('孔子（*丘*，字仲尼）')).toBe('孔子（丘，字仲尼）');
  });

  it('移除 `代码` 标记', () => {
    expect(stripInlineMarkers('使用 `React` 构建')).toBe('使用 React 构建');
  });

  it('移除 [链接](url) 保留文字', () => {
    expect(stripInlineMarkers('点击[这里](https://example.com)查看')).toBe('点击这里查看');
  });

  it('多种标记混合', () => {
    expect(stripInlineMarkers('**玛雅文明**（*Maya*）发源于`中美洲`，详见[维基](url)。'))
      .toBe('玛雅文明（Maya）发源于中美洲，详见维基。');
  });

  it('未闭合标记保留原样（不吞字）', () => {
    expect(stripInlineMarkers('**未闭合的粗体')).toBe('**未闭合的粗体');
  });

  it('空字符串安全', () => {
    expect(stripInlineMarkers('')).toBe('');
  });

  it('普通文本不变', () => {
    expect(stripInlineMarkers('这是一段普通文字，没有标记。')).toBe('这是一段普通文字，没有标记。');
  });
});

describe('splitFirstCharForDropCap', () => {
  it('普通文本：首字就是第一个字符', () => {
    const { first, rest } = splitFirstCharForDropCap('玛雅文明');
    expect(first).toBe('玛');
    expect(rest).toBe('雅文明');
  });

  it('**粗体** 开头：首字是粗体内第一个字，剩余补齐标记', () => {
    const { first, rest } = splitFirstCharForDropCap('**蒂卡尔**是玛雅最大的城市');
    expect(first).toBe('蒂');
    expect(rest).toBe('**卡尔**是玛雅最大的城市');
  });

  it('*斜体* 开头：首字是斜体内第一个字', () => {
    const { first, rest } = splitFirstCharForDropCap('*帕伦克*遗址');
    expect(first).toBe('帕');
    expect(rest).toBe('*伦克*遗址');
  });

  it('`code` 开头：首字是 code 内第一个字', () => {
    const { first, rest } = splitFirstCharForDropCap('`代码`示例');
    expect(first).toBe('代');
    expect(rest).toBe('`码`示例');
  });

  it('[链接](url) 开头：首字是链接文字首字', () => {
    const { first, rest } = splitFirstCharForDropCap('[这里](https://example.com)查看');
    expect(first).toBe('这');
    expect(rest).toBe('[里](https://example.com)查看');
  });

  it('未闭合 **：当普通文本处理', () => {
    const { first, rest } = splitFirstCharForDropCap('**未闭合');
    expect(first).toBe('*');
    expect(rest).toBe('*未闭合');
  });

  it('空字符串安全', () => {
    const { first, rest } = splitFirstCharForDropCap('');
    expect(first).toBe('');
    expect(rest).toBe('');
  });
});

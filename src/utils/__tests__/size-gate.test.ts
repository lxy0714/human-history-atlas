import { describe, it, expect } from 'vitest';
import { classifySize, headroom } from '../size-gate';

describe('size-gate 纯函数', () => {
  it('正常体积返回 OK', () => {
    expect(classifySize(50_000, 110_000, 137_000)).toBe('OK');
  });

  it('临近 WARN 线（>= warn*0.95）返回 NEAR', () => {
    expect(classifySize(109_334, 110_000, 137_000)).toBe('NEAR');
  });

  it('恰好等于 WARN 线返回 WARN', () => {
    expect(classifySize(110_000, 110_000, 137_000)).toBe('WARN');
  });

  it('超过 FAIL 线返回 FAIL', () => {
    expect(classifySize(140_000, 110_000, 137_000)).toBe('FAIL');
  });

  it('warn*0.95 边界值返回 NEAR（刚好踩线）', () => {
    // 110000 * 0.95 = 104500
    expect(classifySize(104_500, 110_000, 137_000)).toBe('NEAR');
  });

  it('bytes 为 NaN 返回 FAIL（非法入参）', () => {
    expect(classifySize(NaN, 110_000, 137_000)).toBe('FAIL');
  });

  it('bytes 为负数返回 FAIL', () => {
    expect(classifySize(-100, 110_000, 137_000)).toBe('FAIL');
  });

  it('warn <= 0 返回 FAIL', () => {
    expect(classifySize(50_000, 0, 137_000)).toBe('FAIL');
    expect(classifySize(50_000, -10, 137_000)).toBe('FAIL');
  });

  it('fail <= warn 返回 FAIL', () => {
    expect(classifySize(50_000, 110_000, 110_000)).toBe('FAIL');
    expect(classifySize(50_000, 110_000, 50_000)).toBe('FAIL');
  });

  it('headroom 正常计算余量字节与百分比', () => {
    const r = headroom(109_334, 110_000);
    expect(r.left).toBe(666);
    expect(r.pct).toBeCloseTo(0.605, 2);
  });

  it('headroom 超过 WARN 时余量为 0', () => {
    const r = headroom(120_000, 110_000);
    expect(r.left).toBe(0);
    expect(r.pct).toBe(0);
  });

  it('headroom 非法入参返回 0（不抛错）', () => {
    expect(headroom(NaN, 110_000).left).toBe(0);
    expect(headroom(50_000, 0).left).toBe(0);
  });
});

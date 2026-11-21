// EXPORTS: classifySize, headroom
// 体积等级判定 + 余量计算（纯函数，门禁用）
// NEAR = 距 WARN 不足 5%

export type SizeLevel = 'FAIL' | 'WARN' | 'NEAR' | 'OK';

const NEAR_RATIO = 0.95;

/**
 * 根据字节数与阈值判定等级
 * - FAIL: bytes >= fail 或 任何非法入参
 * - WARN: warn <= bytes < fail
 * - NEAR: warn * 0.95 <= bytes < warn
 * - OK: bytes < warn * 0.95
 *
 * 非法入参一律 FAIL，不得静默放行：
 *   NaN / 非有限数 / 负数 / warn<=0 / fail<=warn
 */
export function classifySize(bytes: number, warn: number, fail: number): SizeLevel {
  // 入参合法性校验
  if (!Number.isFinite(bytes) || bytes < 0) return 'FAIL';
  if (!Number.isFinite(warn) || warn <= 0) return 'FAIL';
  if (!Number.isFinite(fail) || fail <= warn) return 'FAIL';

  if (bytes >= fail) return 'FAIL';
  if (bytes >= warn) return 'WARN';
  if (bytes >= warn * NEAR_RATIO) return 'NEAR';
  return 'OK';
}

/**
 * 计算距 WARN 线的余量（字节 + 百分比）
 * bytes >= warn 时余量为 0
 */
export function headroom(bytes: number, warn: number): { left: number; pct: number } {
  if (!Number.isFinite(warn) || warn <= 0) return { left: 0, pct: 0 };
  if (!Number.isFinite(bytes) || bytes < 0) return { left: 0, pct: 0 };
  const left = Math.max(0, warn - bytes);
  const pct = (left / warn) * 100;
  return { left, pct };
}

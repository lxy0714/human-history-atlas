// EXPORTS: shouldAutoReload, isChunkLoadError
// 分片加载失败自愈 - 纯函数模块（无副作用，可安全用于 vitest）
//
// 存储相关函数（读写上次自动恢复时间）在 ./chunk-recovery-storage.ts
// 拆分原因：避免 vitest node 环境加载 @lark-apaas/client-toolkit-lite 时 crypto-js 子路径崩溃

/**
 * 防死循环纯函数：判定本次是否允许自动 reload
 *
 * - 首次无记录（lastTime = null/undefined）→ 允许
 * - 距上次不足 thresholdMs → 不允许（防死循环）
 * - 超过 thresholdMs → 允许
 * - 非法时间戳（NaN / 负数 / 非有限数）→ 保守不允许（不确定间隔，宁可不冒死循环风险）
 */
export function shouldAutoReload(
  lastTime: number | null | undefined,
  now: number,
  thresholdMs: number = 30_000,
): boolean {
  // now 非法 → 保守不允许
  if (!Number.isFinite(now) || now <= 0) return false;
  // threshold 非法 → 保守不允许
  if (!Number.isFinite(thresholdMs) || thresholdMs <= 0) return false;
  // 首次无记录 → 允许
  if (lastTime == null) return true;
  // lastTime 非法 → 保守不允许
  if (!Number.isFinite(lastTime) || lastTime <= 0) return false;

  return now - lastTime >= thresholdMs;
}

/** 判断错误是否为 chunk 加载失败（动态 import 失败） */
export function isChunkLoadError(error: Error | unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const msg = (error as Error).message ?? '';
  const name = (error as Error).name ?? '';
  if (name === 'ChunkLoadError') return true;
  if (/chunk.*failed/i.test(msg)) return true;
  if (/loading chunk/i.test(msg)) return true;
  if (/failed to fetch dynamically imported module/i.test(msg)) return true;
  if (/Loading CSS chunk/i.test(msg)) return true;
  if (/Importing a module script failed/i.test(msg)) return true;
  return false;
}

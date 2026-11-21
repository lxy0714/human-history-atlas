// EXPORTS: getLastAutoReloadTime, setLastAutoReloadTime
// 分片加载失败自愈 - 存储模块（浏览器端专用，依赖 scopedStorage）
// 与纯函数分离，避免 vitest node 环境加载 client-toolkit-lite

import { scopedStorage } from '@lark-apaas/client-toolkit-lite';

const STORAGE_KEY = 'chunk-recovery:last-auto-reload';

/** 读取上次自动恢复时间戳（ms），无记录或失败返回 null */
export function getLastAutoReloadTime(): number | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = scopedStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

/** 记录本次自动恢复时间戳（ms） */
export function setLastAutoReloadTime(ms: number): void {
  if (typeof window === 'undefined') return;
  try {
    scopedStorage.setItem(STORAGE_KEY, String(ms));
  } catch {
    // ignore
  }
}

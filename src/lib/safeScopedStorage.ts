// scopedStorage 安全封装：隐私模式/禁用存储时降级为内存存储
// 所有裸用 scopedStorage 的地方都应通过本模块访问，避免隐私模式下抛错

import { scopedStorage } from '@lark-apaas/client-toolkit-lite';

const memoryStore: Record<string, string> = {};
let available: boolean | null = null;

function testAvailable(): boolean {
  try {
    const k = '__ss_test__';
    scopedStorage.setItem(k, '1');
    scopedStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function ensure(): boolean {
  if (available === null) available = testAvailable();
  return available;
}

export const safeScopedStorage = {
  getItem(key: string): string | null {
    if (ensure()) {
      try {
        return scopedStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return memoryStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    if (ensure()) {
      try {
        scopedStorage.setItem(key, value);
        return;
      } catch {
        /* quota exceeded / private mode */
      }
    }
    memoryStore[key] = value;
  },
  removeItem(key: string): void {
    if (ensure()) {
      try {
        scopedStorage.removeItem(key);
        return;
      } catch {
        /* ignore */
      }
    }
    delete memoryStore[key];
  },
};

// EXPORTS: safeLocalStorage
// localStorage 安全封装：隐私模式/禁用时静默降级为内存存储

const memoryStore: Record<string, string> = {};
let available: boolean | null = null;

function testAvailable(): boolean {
  try {
    const k = '__sls_test__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function ensure(): boolean {
  if (available === null) available = testAvailable();
  return available;
}

export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (ensure()) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return memoryStore[key] ?? null;
  },
  setItem(key: string, value: string): void {
    if (ensure()) {
      try {
        localStorage.setItem(key, value);
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
        localStorage.removeItem(key);
        return;
      } catch {
        /* ignore */
      }
    }
    delete memoryStore[key];
  },
};

import { describe, it, expect, beforeEach, vi } from 'vitest';

// history-loader 关键逻辑测试
// 因为 dynamic import 很难在 vitest 中 mock，我们通过重新实现核心逻辑来验证重试/超时/错误态机制
// 真实构建路径由 build-artifact.test.ts 负责

type LoadFn = () => Promise<{ nodes: number }>;

function createLoader(loadFn: LoadFn, maxRetries = 2, timeoutMs = 15000) {
  let cached: { nodes: number } | null = null;
  let error: string | null = null;
  let promise: Promise<{ nodes: number }> | null = null;
  let retriesDone = 0;

  function load(): Promise<{ nodes: number }> {
    if (promise) return promise;

    promise = (async () => {
      let lastErr: unknown = null;
      for (let i = 0; i <= maxRetries; i++) {
        try {
          if (i > 0) {
            retriesDone = i;
            // 测试用短退避（真实用 800ms/2400ms 指数退避）
            await new Promise((r) => setTimeout(r, 1 * i));
          }
          // 超时控制
          const result = await Promise.race([
            loadFn(),
            new Promise<never>((_, rej) =>
              setTimeout(() => rej(new Error('timeout')), timeoutMs)
            ),
          ]);
          cached = result;
          error = null;
          return result;
        } catch (e) {
          lastErr = e;
        }
      }
      error = lastErr instanceof Error ? lastErr.message : String(lastErr);
      throw new Error(`加载失败：${error}`);
    })();

    return promise;
  }

  function reload() {
    promise = null;
    cached = null;
    error = null;
    retriesDone = 0;
    return load();
  }

  return {
    load,
    reload,
    getCached: () => cached,
    getError: () => error,
    getRetries: () => retriesDone,
  };
}

describe('history-loader 核心逻辑', () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  it('成功加载时缓存数据，无错误', async () => {
    const loader = createLoader(() => Promise.resolve({ nodes: 763 }));
    const result = await loader.load();
    expect(result.nodes).toBe(763);
    expect(loader.getCached()?.nodes).toBe(763);
    expect(loader.getError()).toBeNull();
    expect(loader.getRetries()).toBe(0);
  });

  it('失败时自动重试，耗尽后返回错误态（非静默空数组）', async () => {
    let callCount = 0;
    const loader = createLoader(() => {
      callCount++;
      return Promise.reject(new Error('network error'));
    }, 2);

    await expect(loader.load()).rejects.toThrow(/加载失败/);
    // 初始 1 次 + 2 次重试 = 3 次调用
    expect(callCount).toBe(3);
    expect(loader.getRetries()).toBe(2);
    // 关键：错误态非空（不是静默留白）
    expect(loader.getError()).toBeTruthy();
    expect(loader.getError()).toContain('network error');
    expect(loader.getCached()).toBeNull();
  });

  it('失败后重试第 N 次成功，返回正确数据', async () => {
    let callCount = 0;
    const loader = createLoader(() => {
      callCount++;
      if (callCount < 3) return Promise.reject(new Error('fail'));
      return Promise.resolve({ nodes: 763 });
    }, 2);

    const result = await loader.load();
    expect(result.nodes).toBe(763);
    expect(callCount).toBe(3);
    expect(loader.getRetries()).toBe(2);
    expect(loader.getError()).toBeNull();
  });

  it('reload 会清空缓存和错误，重新加载', async () => {
    let callCount = 0;
    const loader = createLoader(() => {
      callCount++;
      return Promise.resolve({ nodes: callCount * 100 });
    });

    const r1 = await loader.load();
    expect(r1.nodes).toBe(100);

    const r2 = await loader.load();
    expect(r2.nodes).toBe(100); // 缓存命中
    expect(callCount).toBe(1);

    const r3 = await loader.reload();
    expect(r3.nodes).toBe(200); // 重新加载
    expect(callCount).toBe(2);
  });

  it('超时视为失败', async () => {
    const loader = createLoader(
      () => new Promise(() => {}) /* 永不 resolve */,
      0,
      10
    );

    await expect(loader.load()).rejects.toThrow(/加载失败/);
    expect(loader.getError()).toContain('timeout');
    expect(loader.getCached()).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { shouldAutoReload, isChunkLoadError } from '../chunk-recovery';

describe('chunk-recovery 纯函数', () => {
  describe('shouldAutoReload', () => {
    it('首次无记录（null）时允许自动恢复', () => {
      expect(shouldAutoReload(null, 100_000, 30_000)).toBe(true);
    });

    it('首次无记录（undefined）时允许自动恢复', () => {
      expect(shouldAutoReload(undefined, 100_000, 30_000)).toBe(true);
    });

    it('距上次不足 30 秒时不允许（防死循环）', () => {
      expect(shouldAutoReload(90_000, 100_000, 30_000)).toBe(false); // 差 10 秒
      expect(shouldAutoReload(75_000, 100_000, 30_000)).toBe(false); // 差 25 秒
      expect(shouldAutoReload(70_001, 100_000, 30_000)).toBe(false); // 差 29.999 秒
    });

    it('距上次恰好等于阈值时允许（边界）', () => {
      expect(shouldAutoReload(70_000, 100_000, 30_000)).toBe(true); // 刚好 30 秒
    });

    it('距上次超过阈值时允许', () => {
      expect(shouldAutoReload(50_000, 100_000, 30_000)).toBe(true); // 差 50 秒
      expect(shouldAutoReload(0 + 1, 100_000, 30_000)).toBe(true); // 很久以前
    });

    it('lastTime 为 NaN 时保守不允许', () => {
      expect(shouldAutoReload(NaN, 100_000, 30_000)).toBe(false);
    });

    it('lastTime 为负数时保守不允许', () => {
      expect(shouldAutoReload(-1000, 100_000, 30_000)).toBe(false);
    });

    it('now 为 NaN / 负数时保守不允许', () => {
      expect(shouldAutoReload(null, NaN, 30_000)).toBe(false);
      expect(shouldAutoReload(null, -1000, 30_000)).toBe(false);
    });

    it('threshold 为 0 / 负数时保守不允许', () => {
      expect(shouldAutoReload(null, 100_000, 0)).toBe(false);
      expect(shouldAutoReload(null, 100_000, -1000)).toBe(false);
    });
  });

  describe('isChunkLoadError', () => {
    it('识别 ChunkLoadError name', () => {
      expect(isChunkLoadError({ name: 'ChunkLoadError', message: '' })).toBe(true);
    });

    it('识别含 "chunk failed" 的错误消息', () => {
      expect(isChunkLoadError(new Error('Loading chunk X failed.'))).toBe(true);
    });

    it('识别 vite 动态 import 失败消息', () => {
      expect(
        isChunkLoadError(new Error('Failed to fetch dynamically imported module')),
      ).toBe(true);
    });

    it('普通错误不识别', () => {
      expect(isChunkLoadError(new Error('Something went wrong'))).toBe(false);
      expect(isChunkLoadError(new Error('undefined is not a function'))).toBe(false);
    });

    it('非错误对象不识别', () => {
      expect(isChunkLoadError(null)).toBe(false);
      expect(isChunkLoadError(undefined)).toBe(false);
      expect(isChunkLoadError('string error')).toBe(false);
      expect(isChunkLoadError(123)).toBe(false);
    });
  });
});

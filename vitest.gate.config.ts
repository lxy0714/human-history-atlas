import { defineConfig } from 'vitest/config';
import path from 'node:path';

// 构建产物门禁配置（依赖 build 输出，由 npm run test:gate 调用）
// 只跑 3 个产物门禁文件，不包含源码单测
// 与 vitest.config.ts 加起来覆盖全部 src/**/*.test.{ts,tsx}，交集为空

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'crypto-js/sha1': path.resolve(__dirname, './node_modules/crypto-js/sha1.js'),
      'crypto-js': path.resolve(__dirname, './node_modules/crypto-js/index.js'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: [
      'src/data/bundle-gate.test.ts',
      'src/data/build-artifact.test.ts',
      'src/__tests__/css-radius-guard.test.ts',
      'src/__tests__/bundle-gzip-gate.test.ts',
    ],
    exclude: ['node_modules', 'dist'],
  },
});

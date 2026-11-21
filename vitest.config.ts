import { defineConfig } from 'vitest/config';
import path from 'node:path';

// 源码单测配置（不依赖构建产物，日常开发快跑）
// 产物门禁单独由 vitest.gate.config.ts 负责（npm run test:gate）
// 两边加起来覆盖全部 src/**/*.test.{ts,tsx}，交集为空

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // @lark-apaas/client-toolkit-lite 从 ESM 入口 import 'crypto-js/sha1'（裸路径不带 .js），
      // 在 node 环境下无法解析。这里手动指向带后缀的文件。
      'crypto-js/sha1': path.resolve(__dirname, './node_modules/crypto-js/sha1.js'),
      'crypto-js': path.resolve(__dirname, './node_modules/crypto-js/index.js'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: [
      'node_modules',
      'dist',
      // 以下三个产物门禁改由 vitest.gate.config.ts 负责
      'src/data/bundle-gate.test.ts',
      'src/data/build-artifact.test.ts',
      'src/__tests__/css-radius-guard.test.ts',
      'src/__tests__/bundle-gzip-gate.test.ts',
    ],
  },
});

// 构建产物门禁测试
// 防止有人静态 import 旧 history.ts 把 3.2MB 大包重新拽回首屏
// 阈值：任何 history 相关的 chunk > 400KB (raw) 即 fail
// 注意：history-index 约 471KB，era 正文分片可以 > 400KB（它们是按需动态 import 的）
// 真正要防的是旧全量 history.ts 被首屏/详情链路静态引入
//
// 运行方式：npm run test:gate（先 build 再跑三个产物门禁）
// 注意：本文件是门禁，产物缺失必须 FAIL，绝不允许静默跳过

import { describe, it, expect } from 'vitest';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// 注意：本文件不得使用 console.* 也不得使用 @lark-apaas/client-toolkit-lite 的 logger
//  - console.* 会被 eslint auto-fix 替换为 logger（触发 no-console 规则）
//  - logger 在 vitest node 环境下 crypto-js 子路径解析失败，导致文件级 0 test
// 诊断输出统一放进 expect(message) 断言消息中，失败时自动打印，成功时静默
const DIST_DIR = join(__dirname, '../../dist/output_resource/assets');

type Files = Array<{ name: string; sizeBytes: number }>;

let cachedFiles: Files | null = null;
let loadError: string | null = null;

function loadFiles(): Files {
  if (cachedFiles) return cachedFiles;
  if (loadError) throw new Error(loadError);
  let raw: string[];
  try {
    raw = readdirSync(DIST_DIR);
  } catch {
    loadError = `构建产物目录不存在：${DIST_DIR}\n请先运行 npm run build 再执行产物门禁。`;
    throw new Error(loadError);
  }
  // .js.map 以 .map 结尾不会被 endsWith('.js') 命中，所以只需要一层过滤
  cachedFiles = raw
    .filter((f) => f.endsWith('.js'))
    .map((f) => ({
      name: f,
      sizeBytes: statSync(join(DIST_DIR, f)).size,
    }))
    .sort((a, b) => b.sizeBytes - a.sizeBytes);
  return cachedFiles;
}

function requireFiles(): Files {
  // 每个用例都调用一次，确保产物缺失时每个用例都 FAIL（不是文件级 0 test，也不是 skipped）
  return loadFiles();
}

describe('构建产物门禁：防止旧 history 大包回退', () => {
  it('存在构建产物（请先运行 npm run build）', () => {
    const files = requireFiles();
    expect(files.length).toBeGreaterThan(10);
  });

  it('history-index 索引层存在且体积合理（> 100KB, < 600KB raw）', () => {
    const files = requireFiles();
    const indexChunk = files.find((f) => f.name.startsWith('history-index-'));
    expect(indexChunk).toBeDefined();
    expect(indexChunk!.sizeBytes).toBeGreaterThan(100_000);
    expect(indexChunk!.sizeBytes).toBeLessThan(600_000);
  });

  it('DetailPanel chunk < 80KB raw（证明没有把全量 history 拽进来）', () => {
    const files = requireFiles();
    const detailChunks = files.filter((f) => f.name.startsWith('DetailPanel-'));
    expect(detailChunks.length).toBeGreaterThan(0);
    for (const chunk of detailChunks) {
      expect(chunk.sizeBytes).toBeLessThan(80_000);
    }
  });

  it('首屏 index chunk < 350KB raw（证明首屏没塞全量数据）', () => {
    const files = requireFiles();
    // 主入口特征：以 index- 开头且 > 100KB（其他 index- 前缀的小 chunk 是 rollup 分割）
    const mainIndex = files.filter(
      (f) => f.name.startsWith('index-') && f.sizeBytes > 100_000,
    )[0];
    expect(mainIndex).toBeDefined();
    expect(mainIndex!.sizeBytes).toBeLessThan(350_000);
  });

  it('era 正文分片都存在且都是独立文件（按需加载的证明）', () => {
    const files = requireFiles();
    const eraNames = [
      'prehistoric',
      'ancient',
      'classical',
      'medieval',
      'earlyModern',
      'industrial',
      'modern',
    ];
    for (const era of eraNames) {
      const eraChunk = files.find((f) => f.name.startsWith(`${era}-`));
      expect(eraChunk, `${era} 正文分片应该存在`).toBeDefined();
      // 正文分片都应该 > 10KB（有实际内容）
      expect(eraChunk!.sizeBytes).toBeGreaterThan(10_000);
    }
  });

  it('history 类分片除 history-index 外没有 > 400KB 的（防止全量大包回潮）', () => {
    const files = requireFiles();
    // history-index 约 470KB raw 是正常的（首屏索引层）
    // 其他 history-* 分片如果 > 400KB 说明可能把全量数据拽进来了
    const historyChunks = files.filter(
      (f) => f.name.startsWith('history-') && !f.name.startsWith('history-index-'),
    );
    const oversized = historyChunks.filter((f) => f.sizeBytes > 400_000);
    expect(
      oversized,
      `history 分片超过 400KB: ${oversized.map((f) => `${f.name} (${(f.sizeBytes / 1024).toFixed(1)}KB)`).join(', ')}`,
    ).toHaveLength(0);
  });

  it('> 100KB chunk 清单（断言消息承载，失败时自动打印）', () => {
    const files = requireFiles();
    const big = files.filter((f) => f.sizeBytes > 100_000);
    const list = big
      .map((f) => `  ${f.name.padEnd(45)} ${(f.sizeBytes / 1024).toFixed(1).padStart(8)} KB`)
      .join('\n');
    const msg = `\n=== Chunk > 100KB 清单 ===\n${list}\n`;
    expect(big.length, msg).toBeGreaterThan(0);
  });
});

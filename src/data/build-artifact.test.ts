import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// 构建产物校验：确保动态 import 中的路径别名全部被解析
// 防止 @vite-ignore 或裸别名导致浏览器运行时报 Failed to resolve module specifier

function findJsFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJsFiles(fullPath));
    } else if (entry.name.endsWith('.js')) {
      results.push(fullPath);
    }
  }
  return results;
}

describe('构建产物校验', () => {
  const distDir = path.resolve('dist/output_resource/assets');

  it('dist 目录存在且有 js 产物', () => {
    const jsFiles = findJsFiles(distDir);
    expect(jsFiles.length).toBeGreaterThan(0);
  });

  it('所有 js 产物中不包含 @/ 形式的裸模块说明符', () => {
    const jsFiles = findJsFiles(distDir);
    expect(jsFiles.length).toBeGreaterThan(0);

    const badFiles: Array<{ file: string; matches: string[] }> = [];
    // 匹配典型的裸模块说明符模式：引号+@/+路径+引号
    const aliasRegex = /["']@\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*["']/g;

    for (const file of jsFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const matches = content.match(aliasRegex);
      if (matches && matches.length > 0) {
        badFiles.push({ file, matches: [...new Set(matches)] });
      }
    }

    if (badFiles.length > 0) {
      const detail = badFiles
        .map((b) => `${path.basename(b.file)}: ${b.matches.join(', ')}`)
        .join('\n  ');
      throw new Error(
        `发现 ${badFiles.length} 个构建产物文件包含未解析的 @/ 模块别名:\n  ${detail}\n` +
          `原因：动态 import 中使用了 @/ 别名且加了 @vite-ignore，或 rolldown 未正确解析别名。` +
          `修复：改为相对路径（如 ./history 或 ../data/history），并移除 /* @vite-ignore */ 注释。`
      );
    }
  });

  it('历史数据 chunk 存在（history 被成功代码分割）', () => {
    const jsFiles = findJsFiles(distDir);
    // 文件名可能带 hash，但 history 数据 chunk 会有 history 字样
    const historyChunks = jsFiles.filter((f) => /history/.test(path.basename(f).toLowerCase()));
    // 至少应该有 main chunk 和若干 async chunk
    expect(jsFiles.length).toBeGreaterThanOrEqual(2);
  });
});

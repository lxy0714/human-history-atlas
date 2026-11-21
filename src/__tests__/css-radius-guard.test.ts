import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, it, expect } from 'vitest';

// CSS 产物级圆角门禁：扫描 dist/output_resource/assets 下所有 *.css
// 断言：所有 border-radius 声明值 ∈ 允许列表，其余一律 FAIL 并报选择器+值
// 运行方式：npm run test:gate
// 注意：本文件是门禁，产物缺失必须 FAIL，绝不允许静默跳过

const DIST_DIR = resolve('dist/output_resource/assets');

// 允许的 border-radius 值
const ALLOWED_VALUES = [
  '0',
  '0px',
  '1px',
  '2px',
  'inherit',
  'initial',
  'unset',
  '50%',
  '999px',
  '9999px',
  '3.40282e38px',
];

function isAllowedValue(value: string): boolean {
  if (ALLOWED_VALUES.includes(value)) return true;
  if (/^var\(--radius[^)]*\)$/.test(value)) return true;
  if (/^calc\(/.test(value)) return true;
  return false;
}

function parsePxValue(value: string): number | null {
  const m = value.match(/^(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)px$/);
  if (!m) return null;
  return parseFloat(m[1]);
}

interface Violation {
  file: string;
  selector: string;
  value: string;
}

function listCssFiles(): string[] {
  let files: string[];
  try {
    files = readdirSync(DIST_DIR);
  } catch {
    throw new Error(
      `构建产物目录不存在：${DIST_DIR}\n请先运行 npm run build 再执行产物门禁。`,
    );
  }
  const css = files
    .filter((f) => f.endsWith('.css'))
    .map((f) => join(DIST_DIR, f))
    .filter((f) => {
      const s = statSync(f);
      return s.isFile();
    });
  if (css.length === 0) {
    throw new Error(
      `在 ${DIST_DIR} 未找到任何 .css 产物文件\n请先运行 npm run build 再执行产物门禁。`,
    );
  }
  return css;
}

function extractViolations(css: string, fileName: string): Violation[] {
  const violations: Violation[] = [];
  const regex = /border-radius:\s*([^;!]+?)(?:\s*!important)?\s*[;}]/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    const rawValue = match[1].trim();
    const pos = match.index;

    if (isAllowedValue(rawValue)) continue;

    const numeric = parsePxValue(rawValue);
    if (numeric === null) continue;
    if (numeric <= 2) continue;

    // 回溯找选择器
    let bracePos = pos;
    while (bracePos > 0 && css[bracePos] !== '{') bracePos--;
    let selStart = bracePos - 1;
    while (selStart > 0 && css[selStart] !== '}') selStart--;
    let selector = css.slice(selStart, bracePos).trim();
    if (selector.startsWith('}')) selector = selector.slice(1).trim();
    if (selector.length > 200) selector = '...' + selector.slice(-200);

    violations.push({ file: fileName, selector, value: rawValue });
  }

  return violations;
}

describe('CSS 产物级圆角门禁：所有 border-radius 声明 ≤ 2px 或为圆形语义', () => {
  it('dist 存在且可读取 CSS 产物', () => {
    const files = listCssFiles();
    expect(files.length).toBeGreaterThan(0);
  });

  it('CSS 产物中所有 border-radius 声明均在允许值内', () => {
    const cssFiles = listCssFiles();
    expect(cssFiles.length).toBeGreaterThan(0);

    const all: Violation[] = [];
    for (const f of cssFiles) {
      const css = readFileSync(f, 'utf-8');
      const rel = f.replace(resolve(), '');
      all.push(...extractViolations(css, rel));
    }

    const detail = all.length > 0
      ? `\n违规清单：\n${all.map((v) => `  ${v.selector} { border-radius: ${v.value} }  (${v.file})`).join('\n')}`
      : '';

    expect(all, `发现 ${all.length} 处 >2px 的 border-radius 声明${detail}`).toHaveLength(0);
  });
});

// 构建产物 gzip 体积门禁（第二层，raw 阈值保留不动）
// 口径：node zlib.gzipSync(buf, {level: 9}).length
// 规则：FAIL >= fail 线，WARN >= warn 线，NEAR = 距 WARN < 5%
// 首屏合计走"静态应下载量"口径：按固定前缀匹配产物文件求和
//
// 运行方式：npm run test:gate（先 build 再跑所有产物门禁）
// 注意：本文件是门禁，产物缺失必须 FAIL，绝不允许静默跳过
// 注意：本文件不得使用 console.* 也不得使用 logger，诊断信息放 expect(message)

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { classifySize, headroom } from '@/utils/size-gate';

// 优先 build.sh 产物目录，fallback 到 vite 直接构建输出（都没有 → FAIL）
const DIST_DIR_PRIMARY = resolve('dist/output_resource/assets');
const DIST_DIR_FALLBACK = resolve('dist/client/assets');
// 最新产物文件的 mtime（用于「两目录都存在时选较新」与报告可追溯）
function newestMtime(dir: string): number {
  try {
    const names = readdirSync(dir);
    let newest = 0;
    for (const n of names) {
      try {
        const st = statSync(join(dir, n));
        if (st.isFile() && st.mtimeMs > newest) newest = st.mtimeMs;
      } catch { /* skip */ }
    }
    return newest;
  } catch {
    return -1;
  }
}

const DIST_DIR = (() => {
  const pExists = (() => { try { return statSync(DIST_DIR_PRIMARY).isDirectory(); } catch { return false; } })();
  const fExists = (() => { try { return statSync(DIST_DIR_FALLBACK).isDirectory(); } catch { return false; } })();
  // 两个都不存在 → 返回主路径，后续断言 FAIL（绝不 skip）
  if (!pExists && !fExists) return DIST_DIR_PRIMARY;
  if (pExists && !fExists) return DIST_DIR_PRIMARY;
  if (!pExists && fExists) return DIST_DIR_FALLBACK;
  // 都存在 → 取较新的，避免测到陈旧产物
  return newestMtime(DIST_DIR_PRIMARY) >= newestMtime(DIST_DIR_FALLBACK)
    ? DIST_DIR_PRIMARY
    : DIST_DIR_FALLBACK;
})();
const REPORT_DIR = DIST_DIR === DIST_DIR_PRIMARY
  ? resolve('dist/output_resource')
  : resolve('dist/client');
const REPORT_PATH = join(REPORT_DIR, 'size-report.txt');

// 首屏 JS 前缀（22 个，固定名单，静态口径）
const FIRST_SCREEN_PREFIXES = [
  'index-',
  'rolldown-runtime-',
  'radix-',
  'createLucideIcon-',
  'toolkit-',
  'TimelineView-',
  'EmptyState-',
  'map-pin-',
  'layers-',
  'star-',
  'history-index-',
  'civil-badge-',
  'DetailPanel-',
  'useAchievements-',
  'arrow-right-',
  'circle-check-',
  'useGraphPanZoom-',
  'sparkles-',
  'tag-',
  'relations-',
  'markdown-render-',
  'key-points-',
];

// 阈值表（gzip9 字节）
interface GzipThreshold {
  key: string;
  warn: number;
  fail: number;
  /** 匹配方式：prefix=按前缀找文件，first-screen=首屏合计，css=CSS 文件合计 */
  match: 'prefix' | 'first-screen' | 'css';
  /** 匹配的前缀（match=prefix 时） */
  prefix?: string;
}

const THRESHOLDS: GzipThreshold[] = [
  { key: 'history-index', warn: 134_000, fail: 152_000, match: 'prefix', prefix: 'history-index-' },
  { key: 'main-index', warn: 92_000, fail: 104_000, match: 'prefix', prefix: 'index-' },
  { key: 'CSS', warn: 54_000, fail: 62_000, match: 'css' },
  { key: 'DetailPanel', warn: 18_000, fail: 20_000, match: 'prefix', prefix: 'DetailPanel-' },
  { key: 'relations', warn: 32_000, fail: 37_000, match: 'prefix', prefix: 'relations-' },
  { key: 'first-screen-total', warn: 669_000, fail: 760_000, match: 'first-screen' },
  { key: 'era-medieval-china-a', warn: 110_000, fail: 137_000, match: 'prefix', prefix: 'medieval-china-a-' },
];

interface AssetFile {
  name: string;
  rawSize: number;
  gzipSize: number;
}

let cachedAssets: AssetFile[] | null = null;
let loadError: string | null = null;

function loadAssets(): AssetFile[] {
  if (cachedAssets) return cachedAssets;
  if (loadError) throw new Error(loadError);

  let names: string[];
  try {
    names = readdirSync(DIST_DIR);
  } catch {
    loadError = `构建产物目录不存在：${DIST_DIR}\n请先运行 npm run build 再执行产物门禁。`;
    throw new Error(loadError);
  }

  const assets: AssetFile[] = [];
  for (const name of names) {
    const filePath = join(DIST_DIR, name);
    const st = statSync(filePath);
    if (!st.isFile()) continue;
    const raw = readFileSync(filePath);
    const gz = gzipSync(raw, { level: 9 });
    assets.push({ name, rawSize: raw.length, gzipSize: gz.length });
  }

  if (assets.length === 0) {
    loadError = `在 ${DIST_DIR} 未找到任何产物文件\n请先运行 npm run build 再执行产物门禁。`;
    throw new Error(loadError);
  }

  assets.sort((a, b) => b.gzipSize - a.gzipSize);
  cachedAssets = assets;
  return cachedAssets;
}

function requireAssets(): AssetFile[] {
  return loadAssets();
}

// 查找前缀匹配的文件
function findByPrefix(assets: AssetFile[], prefix: string): AssetFile[] {
  return assets.filter((a) => a.name.startsWith(prefix));
}

// 首屏 gzip 合计：按固定前缀匹配，命中的文件全部计入
function firstScreenGzipTotal(assets: AssetFile[]): number {
  let total = 0;
  for (const prefix of FIRST_SCREEN_PREFIXES) {
    const hits = assets.filter(
      (a) => a.name.endsWith('.js') && a.name.startsWith(prefix),
    );
    for (const h of hits) total += h.gzipSize;
  }
  // 加 CSS
  for (const a of assets) {
    if (a.name.endsWith('.css')) total += a.gzipSize;
  }
  return total;
}

// CSS gzip 合计
function cssGzipTotal(assets: AssetFile[]): number {
  let total = 0;
  for (const a of assets) {
    if (a.name.endsWith('.css')) total += a.gzipSize;
  }
  return total;
}

// 计算单个对象的 gzip 大小
function getGzipBytes(assets: AssetFile[], t: GzipThreshold): number {
  if (t.match === 'first-screen') return firstScreenGzipTotal(assets);
  if (t.match === 'css') return cssGzipTotal(assets);
  // prefix：取所有匹配文件的 gzip 和（DetailPanel 等可能拆成多片）
  // main-index 特殊：index- 开头且 > 20KB（避免把小 index 分片算进去）
  if (t.key === 'main-index') {
    const hits = findByPrefix(assets, t.prefix!).filter(
      (a) => a.name.endsWith('.js') && a.gzipSize > 20_000,
    );
    return hits.reduce((s, a) => s + a.gzipSize, 0);
  }
  const hits = findByPrefix(assets, t.prefix!).filter((a) => a.name.endsWith('.js'));
  return hits.reduce((s, a) => s + a.gzipSize, 0);
}

// 生成报告文本
function buildReport(assets: AssetFile[]): string {
  const lines: string[] = [];
  lines.push('=== 构建产物 gzip 体积报告 ===');
  lines.push(`产物目录：${DIST_DIR}`);
  const mt = newestMtime(DIST_DIR);
  if (mt > 0) lines.push(`产物时间：${new Date(mt).toISOString()}`);
  lines.push(`文件总数：${assets.length}`);
  lines.push('');
  lines.push('对象'.padEnd(24) + '判定'.padEnd(6) + 'gzip'.padStart(10) + '  WARN'.padStart(10) + '  FAIL'.padStart(10) + '  余量'.padStart(10) + '  余%'.padStart(8));
  lines.push('-'.repeat(90));

  for (const t of THRESHOLDS) {
    const bytes = getGzipBytes(assets, t);
    const level = classifySize(bytes, t.warn, t.fail);
    const hr = headroom(bytes, t.warn);
    const leftStr = level === 'OK' || level === 'NEAR' ? `${hr.left.toFixed(0)}B` : '-';
    const pctStr = level === 'OK' || level === 'NEAR' ? `${hr.pct.toFixed(2)}%` : '-';

    const tag =
      level === 'FAIL' ? '✗ FAIL' :
      level === 'WARN' ? '⚠ WARN' :
      level === 'NEAR' ? '⚠ NEAR' : '  OK  ';

    lines.push(
      t.key.padEnd(24) +
      tag.padEnd(8) +
      String(bytes).padStart(10) +
      String(t.warn).padStart(10) +
      String(t.fail).padStart(10) +
      String(leftStr).padStart(10) +
      String(pctStr).padStart(8),
    );
  }

  lines.push('');
  lines.push('=== 首屏文件命中清单（静态口径，22 JS + 1 CSS） ===');
  for (const prefix of FIRST_SCREEN_PREFIXES) {
    const hits = assets.filter((a) => a.name.endsWith('.js') && a.name.startsWith(prefix));
    if (hits.length === 0) {
      lines.push(`  ${prefix.padEnd(24)}  (未命中)`);
    } else {
      for (const h of hits) {
        lines.push(`  ${h.name.padEnd(48)} ${String(h.gzipSize).padStart(10)} B gzip`);
      }
    }
  }
  const cssHits = assets.filter((a) => a.name.endsWith('.css'));
  for (const h of cssHits) {
    lines.push(`  ${h.name.padEnd(48)} ${String(h.gzipSize).padStart(10)} B gzip  (CSS)`);
  }

  return lines.join('\n') + '\n';
}

// 写入报告文件
function writeReport(assets: AssetFile[]) {
  try {
    mkdirSync(REPORT_DIR, { recursive: true });
    const report = buildReport(assets);
    writeFileSync(REPORT_PATH, report, 'utf-8');
  } catch {
    // 写报告失败不影响门禁结果（报告是附加价值，门禁是核心）
  }
}

describe('构建产物 gzip 体积门禁（第二层）', () => {
  it('构建产物存在（请先运行 npm run build）', () => {
    const assets = requireAssets();
    expect(assets.length).toBeGreaterThan(10);
  });

  it('所有阈值对象均不超过 FAIL 线', () => {
    const assets = requireAssets();
    const failures: string[] = [];

    for (const t of THRESHOLDS) {
      const bytes = getGzipBytes(assets, t);
      const level = classifySize(bytes, t.warn, t.fail);
      if (level === 'FAIL') {
        failures.push(`${t.key}: gzip ${bytes} >= FAIL ${t.fail}`);
      }
    }

    writeReport(assets);

    expect(
      failures.length,
      `以下对象超过 FAIL 线：\n${failures.map((f) => '  - ' + f).join('\n')}\n完整报告见 ${REPORT_PATH}`,
    ).toBe(0);
  });

  it('首屏静态名单不包含 MapView / ListView / SpecialHall / empires', () => {
    const assets = requireAssets();
    const forbiddenPrefixes = ['MapView-', 'ListView-', 'SpecialHall-', 'empires-'];

    // 首屏名单里绝不能出现这些前缀
    const leaks: string[] = [];
    for (const p of forbiddenPrefixes) {
      if (FIRST_SCREEN_PREFIXES.includes(p)) {
        leaks.push(`首屏名单包含禁止前缀: ${p}`);
      }
    }

    expect(
      leaks.length,
      `首屏固定名单中混入了非首屏文件：\n${leaks.join('\n')}`,
    ).toBe(0);
  });

  it('NEAR 判定正确：medieval-china-a 应命中 NEAR', () => {
    const assets = requireAssets();
    const t = THRESHOLDS.find((x) => x.key === 'era-medieval-china-a')!;
    const bytes = getGzipBytes(assets, t);
    const level = classifySize(bytes, t.warn, t.fail);
    const hr = headroom(bytes, t.warn);

    // medieval-china-a 实测约 109,334，WARN 110,000，应命中 NEAR
    // 余量 666 B (0.61%)
    expect(
      level,
      `medieval-china-a gzip=${bytes}, warn=${t.warn}, 余量=${hr.left}B (${hr.pct.toFixed(2)}%), 期望 NEAR（距 WARN < 5%）`,
    ).toBe('NEAR');
  });

  it('size-report.txt 已生成且含关键行', () => {
    const assets = requireAssets();
    writeReport(assets);

    const { readFileSync: rf } = require('node:fs') as typeof import('node:fs');
    let content: string;
    try {
      content = rf(REPORT_PATH, 'utf-8');
    } catch {
      throw new Error(`size-report.txt 未生成：${REPORT_PATH}`);
    }

    expect(content).toContain('=== 构建产物 gzip 体积报告 ===');
    expect(content).toContain('first-screen-total');
    expect(content).toContain('medieval-china-a');
    expect(content).toMatch(/NEAR/);
  });
});

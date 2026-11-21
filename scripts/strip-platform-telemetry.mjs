#!/usr/bin/env node
/**
 * strip-platform-telemetry.mjs
 *
 * 把平台构建注入的遥测 / 平台上下文脚本从构建产物 HTML 中摘掉，
 * 用于开源独立部署（保留代码分割与懒加载，不像 standalone 那样内联成单 chunk）。
 *
 * 背景：@lark-apaas/coding-preset-vite-react 在非 standalone 模式下会注入
 *   1. 外链 performance SDK（sf3-scmcdn-cn.feishucdn.com）
 *   2. Slardar APM 引导（lf3-short.ibytedapm.com）
 *   3. Tea / LogAnalytics 采集（lf3-cdn-tos.bytescm.com）
 *   4. viewContext：window.appId / userId / tenantId = "{{占位符}}"
 * 这些是平台侧埋点，独立部署既不需要、也不应把访客数据发给第三方。
 *
 * 用法：
 *   npm run build
 *   node scripts/strip-platform-telemetry.mjs            # 默认处理 dist/output/index.html
 *   node scripts/strip-platform-telemetry.mjs path/to.html
 *
 * 幂等：重复执行不会二次改动。
 * 安全：只删脚本标签，不改任何业务代码；JSON-LD 结构化数据保留。
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const target = resolve(process.argv[2] || 'dist/output/index.html');

if (!existsSync(target)) {
  console.error(`[strip-telemetry] 找不到文件：${target}`);
  console.error('[strip-telemetry] 请先执行 npm run build');
  process.exit(1);
}

const original = readFileSync(target, 'utf8');

// 命中任一特征即判定为平台遥测 / 平台上下文脚本
const TELEMETRY_SIGNATURES = [
  'sf3-scmcdn-cn.feishucdn.com',
  'ibytedapm.com',
  'bytescm.com',
  'LogAnalyticsObject',
  'slardarScript',
  'window.appId',
  'window.tenantId',
];

let removed = 0;
let html = original.replace(
  /<script\b[^>]*>[\s\S]*?<\/script>/gi,
  (block) => {
    // 结构化数据不是遥测，保留
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(block)) return block;
    if (TELEMETRY_SIGNATURES.some((sig) => block.includes(sig))) {
      removed += 1;
      return '';
    }
    return block;
  },
);

// 折叠删除后留下的空行，保持 HTML 整洁
html = html.replace(/\n{3,}/g, '\n\n');

// 平台会在服务端把 {{appName}} 等占位符替换成真实值；静态托管没有这一步，
// 不处理的话浏览器标题会 literally 显示 "{{appName}}"。这里填回项目自身的值。
const PLACEHOLDERS = {
  '{{appName}}': '全球历史全景 · 人类文明时间地图',
  '{{appDescription}}':
    '从人类起源到21世纪，763个历史节点串联全球文明——时间轴、卫星地图、百科列表、专题馆四视图。',
  '{{appAvatar}}': '/favicon.svg',
};
let filled = 0;
for (const [token, value] of Object.entries(PLACEHOLDERS)) {
  const parts = html.split(token);
  if (parts.length > 1) {
    filled += parts.length - 1;
    html = parts.join(value);
  }
}
if (filled > 0) {
  console.log(`[strip-telemetry] 已回填 ${filled} 处平台占位符（appName / appDescription / appAvatar）`);
}

// 平台把 Google Fonts 反代到 miaoda.feishu.cn/fonts，构建产物里的
// preconnect 与 stylesheet 都指向它。独立部署不应依赖平台主机：
// 路径结构一致，/fonts/css2?... 等价于 fonts.googleapis.com/css2?...
// 注意：MIAODA_FONTS_MIRROR_OFF=1 在实测中并未移除这些 link，故在此兜底。
const FONT_MIRROR = 'https://miaoda.feishu.cn/fonts';
let fonts = 0;
if (html.includes(FONT_MIRROR)) {
  fonts = html.split(FONT_MIRROR).length - 1;
  html = html.split(`${FONT_MIRROR}/css2`).join('https://fonts.googleapis.com/css2');
  html = html.split(FONT_MIRROR).join('https://fonts.googleapis.com');
  // 字体文件实际来自 gstatic，补一条 preconnect 省一次握手
  if (!html.includes('fonts.gstatic.com')) {
    html = html.replace(
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    );
  }
  console.log(`[strip-telemetry] 已把 ${fonts} 处平台字体镜像改写为 Google Fonts 官方源`);
}

if (removed === 0 && filled === 0 && fonts === 0) {
  console.log('[strip-telemetry] 未发现平台遥测脚本，产物已是干净的（或已处理过）');
  process.exit(0);
}

writeFileSync(target, html, 'utf8');

const before = Buffer.byteLength(original, 'utf8');
const after = Buffer.byteLength(html, 'utf8');
console.log(`[strip-telemetry] 已移除 ${removed} 个平台脚本`);
console.log(`[strip-telemetry] ${target}`);
const delta = after - before;
console.log(`[strip-telemetry] ${before} → ${after} 字节（${delta >= 0 ? '+' : ''}${delta}）`);

// 复核：确认目标主机确已消失
const remaining = ['feishucdn.com', 'ibytedapm.com', 'bytescm.com', 'miaoda.feishu.cn'].filter((h) =>
  html.includes(h),
);
if (remaining.length > 0) {
  console.warn(`[strip-telemetry] ⚠ 仍残留主机引用：${remaining.join(', ')}`);
  console.warn('[strip-telemetry] 可能来自 CSS / 字体镜像，请检查 MIAODA_FONTS_MIRROR_OFF=1');
  process.exit(2);
}
console.log('[strip-telemetry] ✓ 复核通过：产物中已无平台遥测主机');
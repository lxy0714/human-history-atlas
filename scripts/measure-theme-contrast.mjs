// 从构建产物 CSS 中提取五套主题变量，按 WCAG 相对亮度计算对比度
// 口径：sRGB 线性化 → 0.2126R+0.7152G+0.0722B，(L1+0.05)/(L2+0.05)
// 带 alpha 的颜色先与背景合成再算

import { readFileSync, readdirSync } from 'node:fs';

const dir = 'dist/client/assets';
const cssFile = readdirSync(dir).find((f) => f.endsWith('.css'));
const css = readFileSync(`${dir}/${cssFile}`, 'utf-8');

function hexToRgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const a = h.length === 8 ? parseInt(h.substr(6, 2), 16) / 255 : 1;
  return [
    parseInt(h.substr(0, 2), 16) / 255,
    parseInt(h.substr(2, 2), 16) / 255,
    parseInt(h.substr(4, 2), 16) / 255,
    a,
  ];
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) return [l, l, l, 1];
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3), 1];
}

function parseColor(v) {
  if (!v) return null;
  v = v.trim();
  if (v.startsWith('#')) return hexToRgb(v);
  const m = v.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*\)/);
  if (m) return hslToRgb(+m[1], +m[2], +m[3]);
  const m2 = v.match(/hsl\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%\s*\)/);
  if (m2) return hslToRgb(+m2[1], +m2[2], +m2[3]);
  return null;
}

function over(fg, bg) {
  const a = fg[3];
  return [
    fg[0] * a + bg[0] * (1 - a),
    fg[1] * a + bg[1] * (1 - a),
    fg[2] * a + bg[2] * (1 - a),
    1,
  ];
}

function luminance(c) {
  const lin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
}

function contrast(c1, c2) {
  const l1 = luminance(c1), l2 = luminance(c2);
  const [L, D] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (L + 0.05) / (D + 0.05);
}

// 提取每个主题块的变量
const themeNames = ['museum', 'ink', 'parchment', 'xuanzhi', 'bamboo'];
const blocks = {};
for (const name of themeNames) {
  const re = new RegExp(`html\\[data-theme=["']?${name}["']?\\]\\s*\\{([^}]*)\\}`, 's');
  const m = css.match(re);
  if (!m) { blocks[name] = null; continue; }
  const vars = {};
  for (const line of m[1].split(';')) {
    const mm = line.match(/--([\w-]+)\s*:\s*(.+)/);
    if (mm) vars[mm[1]] = mm[2].trim();
  }
  blocks[name] = vars;
}

// 默认 :root（museum 生效前的兜底，也应满足）
console.log('产物 CSS: ' + cssFile);
console.log('');
console.log('主题        data-theme  body背景     正文/背景  --border  --border/背景  header下边框  header/背景  主色/焦点环');
console.log('-'.repeat(130));

const results = [];
for (const name of themeNames) {
  const v = blocks[name];
  if (!v) { console.log(name, '未找到主题块'); continue; }
  const bg = parseColor(v['background']);
  const fg = parseColor(v['foreground']);
  const borderRaw = parseColor(v['border']);
  const primary = parseColor(v['primary']);
  const ring = parseColor(v['ring']);

  const borderActual = over(borderRaw, bg);
  const headerActual = over(borderRaw, bg); // header 现用 border-border

  const r = {
    theme: name,
    bgHex: v['background'],
    fgCr: contrast(fg, bg),
    borderHex: v['border'],
    borderCr: contrast(borderActual, bg),
    headerCr: contrast(headerActual, bg),
    ringHex: v['ring'],
    primaryCr: contrast(primary, bg),
    ringCr: contrast(ring, bg),
  };
  results.push(r);

  console.log(
    name.padEnd(11) +
    name.padEnd(11) +
    v['background'].padEnd(14) +
    r.fgCr.toFixed(2).padStart(9) +
    v['border'].padEnd(12) +
    r.borderCr.toFixed(2).padStart(13) +
    v['border'].padEnd(14) +
    r.headerCr.toFixed(2).padStart(11) +
    v['ring'].padEnd(12) +
    r.ringCr.toFixed(2).padStart(11),
  );
}

console.log('');
console.log('=== 判定（要求 border / header ≥3.0，羊皮纸 primary ≥3.0） ===');
let allPass = true;
for (const r of results) {
  const bOk = r.borderCr >= 3.0;
  const hOk = r.headerCr >= 3.0;
  const pOk = r.primaryCr >= 3.0;
  const ok = bOk && hOk && pOk;
  if (!ok) allPass = false;
  console.log(
    `${r.theme.padEnd(11)} border ${bOk ? 'PASS' : 'FAIL'} (${r.borderCr.toFixed(2)})  ` +
    `header ${hOk ? 'PASS' : 'FAIL'} (${r.headerCr.toFixed(2)})  ` +
    `primary ${pOk ? 'PASS' : 'FAIL'} (${r.primaryCr.toFixed(2)})` +
    (ok ? '' : '   <-- 未达标'),
  );
}
console.log('');
console.log(allPass ? '全部达标 ✓' : '存在未达标项 ✗');

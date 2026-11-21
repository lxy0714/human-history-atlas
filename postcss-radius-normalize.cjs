/**
 * PostCSS 插件：圆角归一化
 *
 * 把所有 CSS 中的 border-radius 值统一到 2px 以内。
 * 作用于全部 CSS（包括第三方库如 leaflet / lark toolkit），
 * 确保产物层零 >2px 的非圆形 border-radius 源声明。
 *
 * 规则：
 * - 0 / 0px / 1px / 2px → 不动
 * - 圆形/胶囊值（50% / 999px / 9999px / 3.40282e38px）→ 不动
 * - var(--radius-*) / var(--radius-pill) → 不动
 * - inherit / initial / unset → 不动
 * - calc(...) → 不动（交给运行时）
 * - 其余 > 2px 的像素值 → 改写为 2px，保留 !important 标记
 *
 * 同时处理 border-top-left-radius / border-top-right-radius /
 * border-bottom-left-radius / border-bottom-right-radius 四个单边属性。
 */

const CIRCLE_VALUES = new Set([
  '50%',
  '999px',
  '9999px',
  '3.40282e38px',
]);

const PASS_VALUES = new Set(['0', '0px', '1px', '2px', 'inherit', 'initial', 'unset']);

function isSingleValueAllowed(value) {
  if (PASS_VALUES.has(value)) return true;
  if (CIRCLE_VALUES.has(value)) return true;
  if (/^var\(--radius[^)]*\)$/.test(value)) return true;
  if (/^calc\(/.test(value)) return true;
  return false;
}

/**
 * 解析 border-radius 值，返回是否需要归一化到 2px。
 * border-radius 语法：水平半径 [/ 垂直半径]
 * 水平半径支持 1-4 个值（top-left top-right bottom-right bottom-left）
 * 只要最大半径 > 2px 且不是圆形语义值，就归一化
 */
function shouldNormalize(value) {
  const trimmed = value.trim();
  if (!trimmed) return false;

  // 分离水平 / 垂直半径
  const parts = trimmed.split('/');
  if (parts.length > 2) return false; // 不合法，跳过

  const [horizontal, vertical] = parts;
  const horizValues = horizontal.trim().split(/\s+/);
  const vertValues = vertical ? vertical.trim().split(/\s+/) : horizValues;

  if (horizValues.length > 4 || vertValues.length > 4) return false;

  // 检查所有值
  const allValues = [...horizValues, ...vertValues];
  let hasPixel = false;
  for (const v of allValues) {
    if (isSingleValueAllowed(v)) continue;
    const pxMatch = v.match(/^(\d+(?:\.\d+)?(?:e[+-]?\d+)?)px$/);
    if (pxMatch) {
      const num = parseFloat(pxMatch[1]);
      if (num > 2) {
        hasPixel = true;
      } else {
        // ≤2px 允许
        continue;
      }
    } else {
      // 非像素非白名单值（百分比、em、rem 等），不确定，跳过
      return false;
    }
  }

  return hasPixel;
}

function normalizeValue(value) {
  // 简单像素值直接替换
  const singlePx = value.trim().match(/^(\d+(?:\.\d+)?(?:e[+-]?\d+)?)px$/);
  if (singlePx && parseFloat(singlePx[1]) > 2 && !CIRCLE_VALUES.has(value.trim())) {
    return '2px';
  }

  // 多值情况：每个 >2px 的像素值都改成 2px
  const trimmed = value.trim();
  const parts = trimmed.split('/');
  const normalizeSegment = (seg) =>
    seg
      .trim()
      .split(/\s+/)
      .map((v) => {
        if (isSingleValueAllowed(v)) return v;
        const m = v.match(/^(\d+(?:\.\d+)?(?:e[+-]?\d+)?)px$/);
        if (m && parseFloat(m[1]) > 2) return '2px';
        return v;
      })
      .join(' ');

  return parts.map(normalizeSegment).join(' / ');
}

const RADIUS_PROPS = [
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
];

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-radius-normalize',
    Declaration(decl) {
      if (!RADIUS_PROPS.includes(decl.prop)) return;
      if (shouldNormalize(decl.value)) {
        decl.value = normalizeValue(decl.value);
      }
    },
  };
};

module.exports.postcss = true;

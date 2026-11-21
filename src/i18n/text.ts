// EXPORTS: smartTrim, bilingualHaystack
// 双语文本工具：截断与检索 haystack
//
// 为什么需要它：站内的截断阈值（4/5/6/8 字）是按汉字信息密度定的。
// 英文标题长度通常是中文的 3–5 倍，直接沿用会把 "The Renaissance"
// 切成 "The R…"，既不可读也丢失辨识度。这里按文字体系自适应。

/**
 * 语言自适应截断。
 * @param text 待截断文本（可能是中文，也可能是英文译名）
 * @param zhMax 中文态的最大字符数（沿用原有设计阈值）
 *
 * 拉丁文本放宽到 3 倍且不低于 12 字符，并尽量在词边界断开，
 * 避免把单词劈成两半。
 */
export function smartTrim(text: string, zhMax: number): string {
  if (!text) return '';
  const isLatin = !/[\u4e00-\u9fff]/.test(text);
  const max = isLatin ? Math.max(zhMax * 3, 12) : zhMax;
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  if (!isLatin) return cut + '…';
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut) + '…';
}

/**
 * 检索用的合并文本：中文原文 + 当前语言译名。
 *
 * 关键：站内的关键词表、路径名、用户输入都可能是中文。
 * 若只用译名检索，切到英文后中文关键词会全部失配（城市记忆、
 * 六度关联、文明对比等都会「查不到」）。这里始终两边都查。
 */
export function bilingualHaystack(original: string, localized: string): string {
  return original === localized ? original : `${original} ${localized}`;
}
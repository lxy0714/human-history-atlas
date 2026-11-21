// EXPORTS: renderInlineMarkdown, cleanBlockMarkers, splitFirstCharForDropCap, stripInlineMarkers
import type { ReactNode } from 'react';

/**
 * 清洗描述文本中的块级 Markdown 标记，使这些标记在渲染后不可见。
 * 处理：行首的 `- ` / `* ` / `# ` / `## ` / `### ` / `> `
 * 同时统一中文标点周围的空格：`**词** :` → `词：`（全角冒号紧贴）
 */
export function cleanBlockMarkers(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      // 移除行首的无序列表标记（- 或 * + 空格）
      let cleaned = line.replace(/^\s*[-*]\s+/, '');
      // 移除行首的标题标记（# ~ ###### + 空格）
      cleaned = cleaned.replace(/^\s*#{1,6}\s+/, '');
      // 移除行首的引用标记（> + 空格）
      cleaned = cleaned.replace(/^\s*>\s+/, '');
      return cleaned;
    })
    .join('\n')
    // 统一 "**词** : " 或 "**词** :" → "词："（中文语境下的标点规范化）
    .replace(/\*\*([^*]+)\*\*\s*:\s*/g, '$1：')
    // 行内的反引号 `code` → 去掉反引号保留文字
    .replace(/`([^`]+)`/g, '$1')
    // [文字](链接) → 保留文字
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/**
 * 纯文本清洗：移除所有内联 markdown 标记（**粗体**、*斜体*、`code`、[链接](url)），保留文字内容。
 * 用于卡片简介、搜索摘要、tooltip 等不做富文本渲染的场景，保证不出现裸 **。
 *
 * 例：
 *   "**蒂卡尔**是玛雅最大的城市" → "蒂卡尔是玛雅最大的城市"
 *   "孔子（*丘*，字仲尼）"       → "孔子（丘，字仲尼）"
 *   "点击[这里](url)查看"       → "点击这里查看"
 */
export function stripInlineMarkers(text: string): string {
  return text
    // **粗体** → 保留文字（先处理双 *，避免跟单 * 冲突）
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // *斜体*（前后不能是 *，避免匹配到 ** 的一半）
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1$2')
    // `code` → 保留文字
    .replace(/`([^`]+)`/g, '$1')
    // [文字](链接) → 保留文字
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/**
 * 极简内联富文本渲染器：只支持 **粗体** 和 *斜体*。
 * 未闭合的标记原样保留，不会吞字。
 * 返回 ReactNode 数组，可直接放在 JSX 中渲染。
 */
export function renderInlineMarkdown(text: string): ReactNode[] {
  const result: ReactNode[] = [];
  let i = 0;
  let keyIdx = 0;
  let buffer = '';

  const flushBuffer = () => {
    if (buffer.length > 0) {
      result.push(buffer);
      buffer = '';
    }
  };

  while (i < text.length) {
    // 检测 **粗体**
    if (text[i] === '*' && text[i + 1] === '*') {
      const closeIdx = findClosingMarker(text, i + 2, '**');
      if (closeIdx !== -1) {
        flushBuffer();
        const content = text.substring(i + 2, closeIdx);
        result.push(<strong key={`b-${keyIdx++}`}>{renderInlineMarkdown(content)}</strong>);
        i = closeIdx + 2;
        continue;
      }
    }

    // 检测 *斜体*（注意不能跟 ** 冲突，上面已经处理了）
    if (text[i] === '*' && text[i + 1] !== '*' && text[i - 1] !== '*') {
      const closeIdx = findClosingSingleAsterisk(text, i + 1);
      if (closeIdx !== -1) {
        flushBuffer();
        const content = text.substring(i + 1, closeIdx);
        result.push(<em key={`i-${keyIdx++}`}>{renderInlineMarkdown(content)}</em>);
        i = closeIdx + 1;
        continue;
      }
    }

    buffer += text[i];
    i++;
  }

  flushBuffer();
  return result;
}

function findClosingMarker(text: string, start: number, marker: string): number {
  let i = start;
  while (i <= text.length - marker.length) {
    if (text.substring(i, i + marker.length) === marker) {
      return i;
    }
    i++;
  }
  return -1;
}

function findClosingSingleAsterisk(text: string, start: number): number {
  let i = start;
  while (i < text.length) {
    if (text[i] === '*' && text[i - 1] !== '*' && text[i + 1] !== '*') {
      return i;
    }
    i++;
  }
  return -1;
}

/**
 * 从 markdown 文本中拆分出"第一个可见字符"和"剩余 markdown 文本"。
 * 用于竖排首字下沉：下沉的是真实字符（不是 *、`、[ 等标记），
 * 剩余文本补齐开头标记，保证交给 renderInlineMarkdown 后仍能正确解析。
 *
 * 例：
 *   "**蒂卡尔**是..." → { first: '蒂', rest: '**卡尔**是...' } （strong 标记补齐）
 *   "玛雅文明..."    → { first: '马', rest: '雅文明...' }
 *   "*帕伦克*..."    → { first: '帕', rest: '*伦克*...' }   （em 标记补齐）
 *   "`代码`abc"     → { first: '代', rest: '`码`abc' }     （code 标记补齐）
 */
export function splitFirstCharForDropCap(text: string): { first: string; rest: string } {
  if (text.length === 0) return { first: '', rest: '' };

  // **粗体**
  if (text[0] === '*' && text[1] === '*') {
    const closeIdx = findClosingMarker(text, 2, '**');
    if (closeIdx !== -1 && closeIdx > 2) {
      return { first: text[2], rest: `**${text.substring(3, closeIdx)}**${text.substring(closeIdx + 2)}` };
    }
  }
  // *斜体*
  if (text[0] === '*' && text[1] !== '*') {
    const closeIdx = findClosingSingleAsterisk(text, 1);
    if (closeIdx !== -1 && closeIdx > 1) {
      return { first: text[1], rest: `*${text.substring(2, closeIdx)}*${text.substring(closeIdx + 1)}` };
    }
  }
  // `code`
  if (text[0] === '`') {
    const closeIdx = text.indexOf('`', 1);
    if (closeIdx !== -1 && closeIdx > 1) {
      return { first: text[1], rest: `\`${text.substring(2, closeIdx)}\`${text.substring(closeIdx + 1)}` };
    }
  }
  // [链接](url) — 首字是链接文字首字，剩余保留完整链接结构
  if (text[0] === '[') {
    const closeBracket = text.indexOf(']', 1);
    if (closeBracket !== -1 && closeBracket > 1) {
      return {
        first: text[1],
        rest: `[${text.substring(2, closeBracket)}]${text.substring(closeBracket + 1)}`,
      };
    }
  }
  // 普通字符
  return { first: text[0], rest: text.substring(1) };
}

// EXPORTS: useNodeI18n, getNodeTitleLang, getNodeSummaryLang, formatNodeYearLang
// 节点内容双语 hook：标题、摘要、年份格式化、正文回退
// 英文缺失时回退中文，并标记 isFallback 供 UI 标注

import { useMemo } from 'react';
import { useI18n } from '@/i18n';
import type { I18nLang } from '@/i18n/types';
import { formatYearBilingual } from '@/i18n/format-year';
import { EN_NODE_META } from './en-node-meta';
import { getCivilizationName, getCategoryName, getEraName, getEraDescription } from './content-i18n';
import type { IHistoryNode } from '@/data/history';

export { getCivilizationName, getCategoryName, getEraName, getEraDescription };

export interface NodeI18n {
  title: string;
  summary: string;
  isTitleFallback: boolean;
  isSummaryFallback: boolean;
}

/**
 * 按语言取节点标题与摘要。
 * 英文缺失时回退中文，返回的 fallback 标志供 UI 标注。
 */
export function getNodeTitleLang(node: IHistoryNode, lang: I18nLang): { text: string; isFallback: boolean } {
  if (lang === 'zh-CN') return { text: node.title, isFallback: false };
  const meta = EN_NODE_META[node.id];
  if (meta?.titleEn) return { text: meta.titleEn, isFallback: false };
  return { text: node.title, isFallback: true };
}

export function getNodeSummaryLang(node: IHistoryNode, lang: I18nLang): { text: string; isFallback: boolean } {
  if (lang === 'zh-CN') return { text: node.summary, isFallback: false };
  const meta = EN_NODE_META[node.id];
  if (meta?.summaryEn) return { text: meta.summaryEn, isFallback: false };
  return { text: node.summary, isFallback: true };
}

/**
 * 节点级别的 hook：一次性返回标题、摘要、回退状态。
 */
export function useNodeI18n(node: IHistoryNode): NodeI18n {
  const { lang } = useI18n();
  return useMemo(() => {
    const titleResult = getNodeTitleLang(node, lang);
    const summaryResult = getNodeSummaryLang(node, lang);
    return {
      title: titleResult.text,
      summary: summaryResult.text,
      isTitleFallback: titleResult.isFallback,
      isSummaryFallback: summaryResult.isFallback,
    };
  }, [node, lang]);
}

/** 年份格式化（按语言口径） */
export function formatNodeYearLang(year: number, lang: I18nLang): string {
  return formatYearBilingual(year, lang);
}

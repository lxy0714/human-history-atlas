// EXPORTS: useI18n, I18nProvider, lookup, pickLocalizedName, pickNodeField
// i18n 核心：React Context + Provider + useI18n hook
// 设计目标：
//   - 中文默认态零额外语言包文件（首屏体积不变）
//   - 英文语言包与英文节点元数据动态 import，按需加载
//   - 切换即时生效，不需刷新
//   - 持久化到 scopedStorage

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { localizeYearDisplay } from './year-display';
import { setYearFormatLang } from '@/pages/HomePage/year-utils';
import { safeScopedStorage } from '@/lib/safeScopedStorage';
import type { I18nDict, I18nLang } from './types';

const STORAGE_KEY = 'app-lang';

// —— 翻译取值工具（纯函数，便于测试）——

/**
 * 按点路径从字典里取值。找不到返回 undefined。
 * 例: lookup({ nav: { title: 'xxx' }}, 'nav.title') → 'xxx'
 */
export function lookup(dict: I18nDict, path: string): string | undefined {
  const parts = path.split('.');
  let current: unknown = dict;
  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    const obj = current as Record<string, unknown>;
    if (!(part in obj)) return undefined;
    current = obj[part];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * t() 工厂：给一个字典，返回 (key, fallback) => string
 * 命中字典返回翻译；未命中返回 fallback（中文原文）。
 */
function makeTranslator(dict: I18nDict | null) {
  return function t(key: string, fallback: string): string {
    if (!dict) return fallback;
    const val = lookup(dict, key);
    return val ?? fallback;
  };
}

// —— Context ——

/** 可被 nt/ns 取值的对象形状：只要求可能带 id 与 title/summary */
export interface LocalizableNode {
  id?: string;
  title?: string;
  summary?: string;
}

/** 英文节点元数据表形状（与 EN_NODE_META 一致，此处只做类型约束避免运行时循环依赖） */
export type NodeMetaMap = Record<string, { titleEn?: string; summaryEn?: string }>;

interface I18nContextValue {
  lang: I18nLang;
  setLang: (lang: I18nLang) => void;
  t: (key: string, fallback: string) => string;
  /** 取本地化名称：英文态优先 nameEn，缺失回退中文 name。用于 ERAS / CATEGORIES / CIVILIZATIONS */
  ln: (entry: { name: string; nameEn?: string } | undefined | null, fallback?: string) => string;
  /** 取节点标题：英文态查 EN_NODE_META.titleEn，未译或非节点对象原样返回 */
  nt: (node: LocalizableNode | undefined | null) => string;
  /** 取节点摘要：英文态查 EN_NODE_META.summaryEn，未译或非节点对象原样返回 */
  ns: (node: LocalizableNode | undefined | null) => string;
  /** 取本地化年份显示串：英文态转换数据里预存的中文 yearDisplay */
  ny: (yearDisplay: string | undefined | null) => string;
  isLoading: boolean; // 切换语言时加载包的短暂 loading 态
}

/** ln() 纯函数实现，便于单测 */
export function pickLocalizedName(
  lang: I18nLang,
  entry: { name: string; nameEn?: string } | undefined | null,
  fallback = '',
): string {
  if (!entry) return fallback;
  if (lang !== 'zh-CN' && entry.nameEn) return entry.nameEn;
  return entry.name ?? fallback;
}

/**
 * nt()/ns() 纯函数实现，便于单测。
 *
 * 关键设计：按 id 查表。传入的对象若不是历史节点（没有 id，或 id 不在英文表里），
 * 一律原样返回它自己的 title/summary。这让全站批量接线是安全的——
 * 成就、路径、词典条目等同名 .title 字段不会被误伤。
 */
export function pickNodeField(
  lang: I18nLang,
  metaMap: NodeMetaMap | null,
  node: LocalizableNode | undefined | null,
  field: 'title' | 'summary',
): string {
  const original = node?.[field] ?? '';
  if (lang === 'zh-CN' || !metaMap || !node?.id) return original;
  const meta = metaMap[node.id];
  const translated = field === 'title' ? meta?.titleEn : meta?.summaryEn;
  return translated || original;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// —— 语言包动态加载 ——

// 语言包模块缓存，避免重复 import
const dictCache = new Map<I18nLang, I18nDict | null>();
const loadingPromises = new Map<I18nLang, Promise<I18nDict | null>>();

async function loadDict(lang: I18nLang): Promise<I18nDict | null> {
  if (lang === 'zh-CN') return null; // 中文是默认源文案，不需要字典
  const cached = dictCache.get(lang);
  if (cached !== undefined) return cached;
  const pending = loadingPromises.get(lang);
  if (pending) return pending;
  const promise = import('./en-US')
    .then((mod) => {
      const dict = mod.enUS as I18nDict;
      dictCache.set(lang, dict);
      loadingPromises.delete(lang);
      return dict;
    })
    .catch(() => {
      dictCache.set(lang, null);
      loadingPromises.delete(lang);
      return null;
    });
  loadingPromises.set(lang, promise);
  return promise;
}

// 英文节点元数据：同样按需加载，中文首屏不背这个体积
let nodeMetaCache: NodeMetaMap | null = null;
let nodeMetaPromise: Promise<NodeMetaMap | null> | null = null;

async function loadNodeMeta(lang: I18nLang): Promise<NodeMetaMap | null> {
  if (lang === 'zh-CN') return null;
  if (nodeMetaCache) return nodeMetaCache;
  if (nodeMetaPromise) return nodeMetaPromise;
  nodeMetaPromise = import('@/data/i18n/en-node-meta')
    .then((mod) => {
      nodeMetaCache = mod.EN_NODE_META as NodeMetaMap;
      nodeMetaPromise = null;
      return nodeMetaCache;
    })
    .catch(() => {
      nodeMetaPromise = null;
      return null;
    });
  return nodeMetaPromise;
}

// —— 初始语言判定 ——

function getInitialLang(): I18nLang {
  if (typeof window === 'undefined') return 'zh-CN';
  const saved = safeScopedStorage.getItem(STORAGE_KEY);
  if (saved === 'zh-CN' || saved === 'en-US') return saved;
  // 首次访问根据浏览器语言猜一下，猜不中默认中文
  const nav = window.navigator?.language?.toLowerCase() ?? '';
  if (nav.startsWith('en')) return 'zh-CN'; // 保守：默认中文，让用户主动切
  return 'zh-CN';
}

// —— Provider ——

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<I18nLang>(() => getInitialLang());
  const [dict, setDict] = useState<I18nDict | null>(null);
  const [nodeMeta, setNodeMeta] = useState<NodeMetaMap | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 在 render 体内同步设置：Provider 先于子组件渲染，formatYear 的 100+ 调用点
  // 因此无需逐点传 lang 即可拿到正确语言。
  setYearFormatLang(lang);

  // 首次挂载：若非中文，并行加载语言包与英文节点元数据
  useEffect(() => {
    let cancelled = false;
    if (lang === 'zh-CN') {
      setDict(null);
      setNodeMeta(null);
      return;
    }
    setIsLoading(true);
    Promise.all([loadDict(lang), loadNodeMeta(lang)]).then(([d, m]) => {
      if (!cancelled) {
        setDict(d);
        setNodeMeta(m);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // 同步 <html lang>：读屏、断词、字体回退都依赖它
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
  }, [lang]);

  const setLang = useCallback((newLang: I18nLang) => {
    setLangState(newLang);
    safeScopedStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  const t = useMemo(() => makeTranslator(dict), [dict]);

  const ln = useMemo(
    () => (entry: { name: string; nameEn?: string } | undefined | null, fallback = '') =>
      pickLocalizedName(lang, entry, fallback),
    [lang],
  );

  const nt = useMemo(
    () => (node: LocalizableNode | undefined | null) => pickNodeField(lang, nodeMeta, node, 'title'),
    [lang, nodeMeta],
  );

  const ns = useMemo(
    () => (node: LocalizableNode | undefined | null) => pickNodeField(lang, nodeMeta, node, 'summary'),
    [lang, nodeMeta],
  );

  const ny = useMemo(
    () => (yearDisplay: string | undefined | null) => localizeYearDisplay(yearDisplay ?? '', lang),
    [lang],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, ln, nt, ns, ny, isLoading }),
    [lang, setLang, t, ln, nt, ns, ny, isLoading],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// —— Hook ——

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // 没包 Provider 时退化为中文直出（保证任何环境都不 crash）
    return {
      lang: 'zh-CN' as I18nLang,
      setLang: () => {},
      t: (_key: string, fallback: string) => fallback,
      ln: (entry: { name: string; nameEn?: string } | undefined | null, fallback = '') =>
        entry?.name ?? fallback,
      nt: (node: LocalizableNode | undefined | null) => node?.title ?? '',
      ns: (node: LocalizableNode | undefined | null) => node?.summary ?? '',
      ny: (yearDisplay: string | undefined | null) => yearDisplay ?? '',
      isLoading: false,
    };
  }
  return ctx;
}
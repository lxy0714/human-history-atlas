// EXPORTS: useI18n, I18nProvider
// i18n 核心：React Context + Provider + useI18n hook
// 设计目标：
//   - 中文默认态零额外语言包文件（首屏体积不变）
//   - 英文语言包动态 import，按需加载
//   - 切换即时生效，不需刷新
//   - 持久化到 scopedStorage

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
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

interface I18nContextValue {
  lang: I18nLang;
  setLang: (lang: I18nLang) => void;
  t: (key: string, fallback: string) => string;
  isLoading: boolean; // 切换语言时加载包的短暂 loading 态
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
  const [isLoading, setIsLoading] = useState(false);

  // 首次挂载：若非中文，加载对应语言包
  useEffect(() => {
    let cancelled = false;
    if (lang === 'zh-CN') {
      setDict(null);
      return;
    }
    setIsLoading(true);
    loadDict(lang).then((d) => {
      if (!cancelled) {
        setDict(d);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const setLang = useCallback((newLang: I18nLang) => {
    setLangState(newLang);
    safeScopedStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  const t = useMemo(() => makeTranslator(dict), [dict]);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t, isLoading }),
    [lang, setLang, t, isLoading],
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
      isLoading: false,
    };
  }
  return ctx;
}

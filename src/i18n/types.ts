// EXPORTS: I18nLang, I18nDict, I18nProviderProps

export type I18nLang = 'zh-CN' | 'en-US';

/**
 * 嵌套语言字典。叶子值为字符串，中间层为对象。
 * 用 Record<string, unknown> 而非递归类型，简化类型约束。
 */
export type I18nDict = Record<string, unknown>;

export interface I18nProviderProps {
  children: React.ReactNode;
}

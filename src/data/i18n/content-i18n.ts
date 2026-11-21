// EXPORTS: getCivilizationName, getCategoryName, getEraName, getEraDescription
// 内容层纯函数（不依赖 React / i18n provider，纯数据驱动）
// 测试可直接 import，不会触发 client-toolkit-lite

import type { I18nLang } from '@/i18n/types';
import { CIVILIZATIONS, CATEGORIES, ERAS } from '@/data/history-index';
import type { CivilizationKey, CategoryKey } from '@/data/history';

/** 文明名（英文缺失时回退中文） */
export function getCivilizationName(key: CivilizationKey, lang: I18nLang): string {
  if (lang === 'zh-CN') return CIVILIZATIONS[key]?.name ?? key;
  return CIVILIZATIONS[key]?.nameEn ?? CIVILIZATIONS[key]?.name ?? key;
}

/** 分类名 */
export function getCategoryName(key: CategoryKey, lang: I18nLang): string {
  if (lang === 'zh-CN') return CATEGORIES[key]?.name ?? key;
  return CATEGORIES[key]?.nameEn ?? CATEGORIES[key]?.name ?? key;
}

/** 时代名 */
export function getEraName(eraId: string, lang: I18nLang): string {
  const era = ERAS.find((e) => e.id === eraId);
  if (!era) return eraId;
  if (lang === 'zh-CN') return era.name;
  return (era as unknown as { nameEn?: string }).nameEn ?? era.name;
}

/** 时代描述（暂未翻译，全部回退中文） */
export function getEraDescription(eraId: string, lang: I18nLang): string {
  const era = ERAS.find((e) => e.id === eraId);
  if (!era) return '';
  return era.description;
}

// 专题馆子模块懒加载映射
import { lazy } from 'react';
import { lazyWithRetry } from '@/utils/lazy';

// 重型 echarts 模块
export const LazyCivilizationAtlas = lazyWithRetry(
  () => import('./specials/CivilizationAtlas'),
);
export const LazyFullRelationGraph = lazyWithRetry(
  () => import('./specials/FullRelationGraph'),
);
export const LazyRelationshipGraph = lazyWithRetry(
  () => import('./specials/RelationshipGraph'),
);

// 重型交互模块
export const LazyPersonEgoGraph = lazyWithRetry(
  () => import('./specials/PersonEgoGraph'),
);
export const LazyCausalChains = lazyWithRetry(() => import('./specials/CausalChains'));
export const LazyCityMemory = lazyWithRetry(() => import('./specials/CityMemory'));
export const LazyCivilizationCompare = lazyWithRetry(
  () => import('./specials/CivilizationCompare'),
);
export const LazyEmpireComparison = lazyWithRetry(
  () => import('./specials/EmpireComparison'),
);
export const LazyHistoryQuiz = lazyWithRetry(() => import('./specials/HistoryQuiz'));
export const LazyLearningHall = lazyWithRetry(() => import('./specials/LearningHall'));
export const LazyLineageHall = lazyWithRetry(() => import('./specials/LineageHall'));
export const LazySixDegrees = lazyWithRetry(() => import('./specials/SixDegrees'));
export const LazyCityRiseFall = lazyWithRetry(() => import('./specials/CityRiseFall'));
export const LazySpeciesSpread = lazyWithRetry(() => import('./specials/SpeciesSpread'));
export const LazyCommTransport = lazyWithRetry(() => import('./specials/CommTransport'));
export const LazyPlagueHistory = lazyWithRetry(() => import('./specials/PlagueHistory'));
export const LazyLegalHistory = lazyWithRetry(() => import('./specials/LegalHistory'));
export const LazyInventionsTimeline = lazyWithRetry(
  () => import('./specials/InventionsTimeline'),
);
export const LazyDailyLife = lazyWithRetry(() => import('./specials/DailyLife'));

// 较轻量模块（也做懒加载，首屏不加载）
export const LazyFavoritesList = lazyWithRetry(
  () => import('./specials/FavoritesList'),
);
export const LazyTimeCapsule = lazyWithRetry(() => import('./specials/TimeCapsule'));
export const LazyFashionTimeline = lazyWithRetry(
  () => import('./specials/FashionTimeline'),
);
export const LazyWeaponTimeline = lazyWithRetry(
  () => import('./specials/WeaponTimeline'),
);
export const LazyTodayInHistory = lazyWithRetry(
  () => import('./specials/TodayInHistory'),
);
export const LazyFunFacts = lazyWithRetry(() => import('./specials/FunFacts'));
export const LazyQuotes = lazyWithRetry(() => import('./specials/Quotes'));
export const LazyRankings = lazyWithRetry(() => import('./specials/Rankings'));
export const LazyEraConverter = lazyWithRetry(() => import('./specials/EraConverter'));

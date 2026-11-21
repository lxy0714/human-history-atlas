// EXPORTS: loadHistoryIndex, getHistoryIndex, getIndexLoadError, reloadHistoryIndex,
//   loadNodeBody, loadEraBody, getBody, getEraBodyLoadError, reloadEraBody, loadAllBodies,
//   findNodeIndexById, getRandomNodeIdFromIndex, hasFullTextSearch, isFullTextReady,
//   useHistoryDataLoader, loadNodeBodyBilingual, BilingualBodyResult
// 历史数据二级分片加载器
// 首屏只加载索引层（~120KB gzip），正文按 shard（era + civilization）按需动态 import
// 全文搜索时才加载全部正文

import { logger } from '@lark-apaas/client-toolkit-lite';
import type { IHistoryNodeIndex, IEra, CivilizationKey, CategoryKey } from './history-index';
import { SHARD_BODY_IMPORTS } from './shard-body-map';
import { EN_SHARD_BODY_IMPORTS } from './en-shard-body-map';
import { ERA_SHARD_KEYS } from './era-shard-map';

export type { IHistoryNodeIndex, IEra, CivilizationKey, CategoryKey };

type HistoryIndexData = {
  ALL_HISTORY_NODES_INDEX: IHistoryNodeIndex[];
  HISTORY_NODES_INDEX: IHistoryNodeIndex[];
  ERAS: IEra[];
  CIVILIZATIONS: Record<CivilizationKey, { name: string; color: string }>;
  CATEGORIES: Record<CategoryKey, { name: string; icon: string }>;
  CIVILIZATION_COLORS: Record<CivilizationKey, string>;
};

type BodyMap = Record<string, string>;

export type BilingualBodyResult = {
  text: string | null;
  /** 实际返回的正文语言，可能是 zh-CN（回退）或 en-US */
  lang: 'zh-CN' | 'en-US';
  /** 是否因为英文缺失回退到了中文 */
  isFallback: boolean;
};

// 英文正文 shard 缓存 + in-flight
const cachedEnShards: Record<string, BodyMap> = {};
const enShardPromises: Record<string, Promise<BodyMap> | null> = {};
const enShardLoadErrors: Record<string, string> = {};

async function importEnShardWithTimeout(shardKey: string): Promise<BodyMap> {
  const importer = EN_SHARD_BODY_IMPORTS[shardKey];
  if (!importer) {
    // 该 shard 尚未翻译，返回空 map → 调用方据此回退中文
    return {};
  }
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`English shard ${shardKey} load timeout`));
    }, LOAD_TIMEOUT_MS);
    importer()
      .then((mod) => {
        clearTimeout(timeoutId);
        resolve(mod.BODY_MAP || {});
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

async function doLoadEnShard(shardKey: string): Promise<BodyMap> {
  // 未登记的 shard 直接返回空
  if (!EN_SHARD_BODY_IMPORTS[shardKey]) return {};

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = 800 * Math.pow(3, attempt - 1);
        await new Promise((r) => setTimeout(r, delay));
      }
      const bodyMap = await importEnShardWithTimeout(shardKey);
      enShardLoadErrors[shardKey] = '';
      logger.info(`英文正文分片 ${shardKey} 加载成功，共 ${Object.keys(bodyMap).length} 个节点`);
      return bodyMap;
    } catch (err) {
      lastError = err;
      logger.error(`英文正文分片 ${shardKey} 加载失败（第 ${attempt + 1} 次）: ${String(err)}`);
    }
  }
  const msg = lastError instanceof Error ? lastError.message : String(lastError);
  enShardLoadErrors[shardKey] = msg || 'unknown';
  // 英文 shard 加载失败时也返回空，调用方回退中文，不让用户看空白
  return {};
}

function loadEnShard(shardKey: string): Promise<BodyMap> {
  if (enShardPromises[shardKey]) return enShardPromises[shardKey];
  if (cachedEnShards[shardKey]) return Promise.resolve(cachedEnShards[shardKey]);

  enShardPromises[shardKey] = doLoadEnShard(shardKey).then((bodyMap) => {
    cachedEnShards[shardKey] = bodyMap;
    enShardPromises[shardKey] = null;
    return bodyMap;
  });

  return enShardPromises[shardKey];
}

// ========== 双语正文加载 ==========

/**
 * 加载单个节点的双语正文。
 * - lang = 'zh-CN'：直接走中文 shard，isFallback = false
 * - lang = 'en-US'：先尝试英文 shard，有就返回 en + isFallback=false；
 *   没有就回退中文 + isFallback=true
 * 中文态不会加载任何英文 shard（首屏体积零影响）。
 */
export async function loadNodeBodyBilingual(
  nodeId: string,
  lang: 'zh-CN' | 'en-US',
): Promise<BilingualBodyResult> {
  // 中文态：直接走原逻辑
  if (lang === 'zh-CN') {
    const text = await loadNodeBody(nodeId);
    return { text, lang: 'zh-CN', isFallback: false };
  }

  // 英文态：先确保索引加载，拿到 shardKey
  if (!cachedIndex) await loadHistoryIndex();
  const shardKey = getShardKeyForNode(nodeId);

  if (!shardKey) {
    // 没有 shardKey 的节点（无正文）直接返回 null
    return { text: null, lang: 'en-US', isFallback: false };
  }

  // 尝试加载英文 shard
  const enMap = await loadEnShard(shardKey);
  const enText = enMap[nodeId];

  if (enText) {
    return { text: enText, lang: 'en-US', isFallback: false };
  }

  // 英文缺失，回退中文
  const zhText = await loadNodeBody(nodeId);
  return {
    text: zhText,
    lang: 'zh-CN',
    isFallback: true,
  };
}

// ========== 索引层加载 ==========

let indexPromise: Promise<HistoryIndexData> | null = null;
let cachedIndex: HistoryIndexData | null = null;
let indexLoadError: string | null = null;
const MAX_RETRIES = 2;
const LOAD_TIMEOUT_MS = 15000;

function importIndexWithTimeout(): Promise<HistoryIndexData> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`历史索引加载超时（${LOAD_TIMEOUT_MS / 1000}秒）`));
    }, LOAD_TIMEOUT_MS);

    import('./history-index')
      .then((mod) => {
        clearTimeout(timeoutId);
        resolve({
          ALL_HISTORY_NODES_INDEX: mod.ALL_HISTORY_NODES_INDEX,
          HISTORY_NODES_INDEX: mod.HISTORY_NODES_INDEX,
          ERAS: mod.ERAS,
          CIVILIZATIONS: mod.CIVILIZATIONS,
          CATEGORIES: mod.CATEGORIES,
          CIVILIZATION_COLORS: mod.CIVILIZATION_COLORS,
        });
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

async function doLoadIndex(): Promise<HistoryIndexData> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = 800 * Math.pow(3, attempt - 1);
        logger.info(`历史索引加载第 ${attempt} 次重试，等待 ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }

      const data = await importIndexWithTimeout();
      indexLoadError = null;
      logger.info(`历史索引加载成功，共 ${data.ALL_HISTORY_NODES_INDEX.length} 个节点（尝试 ${attempt + 1} 次）`);
      return data;
    } catch (err) {
      lastError = err;
      logger.error(`历史索引加载失败（第 ${attempt + 1} 次）: ${String(err)}`);
    }
  }

  const msg = lastError instanceof Error ? lastError.message : String(lastError);
  indexLoadError = msg || '未知错误';
  throw new Error(`历史索引加载失败：${indexLoadError}`);
}

export function loadHistoryIndex(): Promise<HistoryIndexData> {
  if (indexPromise) return indexPromise;

  indexPromise = doLoadIndex().then((data) => {
    cachedIndex = data;
    return data;
  });

  return indexPromise;
}

export function reloadHistoryIndex(): Promise<HistoryIndexData> {
  indexPromise = null;
  cachedIndex = null;
  indexLoadError = null;
  return loadHistoryIndex();
}

export function getHistoryIndex(): HistoryIndexData | null {
  return cachedIndex;
}

export function getIndexLoadError(): string | null {
  return indexLoadError;
}

// ========== 正文层加载（按 shard） ==========

const shardPromises: Record<string, Promise<BodyMap> | null> = {};
const cachedShards: Record<string, BodyMap> = {};
const shardLoadErrors: Record<string, string> = {};
// nodeId -> shardKey 的快速查找缓存（索引加载后填充）
let nodeShardCache: Record<string, string> = {};

function importShardWithTimeout(shardKey: string): Promise<BodyMap> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`正文分片 ${shardKey} 加载超时（${LOAD_TIMEOUT_MS / 1000}秒）`));
    }, LOAD_TIMEOUT_MS);

    const importer = SHARD_BODY_IMPORTS[shardKey];
    if (!importer) {
      clearTimeout(timeoutId);
      reject(new Error(`未知正文分片: ${shardKey}`));
      return;
    }

    importer()
      .then((mod) => {
        clearTimeout(timeoutId);
        resolve(mod.BODY_MAP);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

async function doLoadShard(shardKey: string): Promise<BodyMap> {
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        const delay = 800 * Math.pow(3, attempt - 1);
        logger.info(`正文分片 ${shardKey} 加载第 ${attempt} 次重试，等待 ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }

      const bodyMap = await importShardWithTimeout(shardKey);
      shardLoadErrors[shardKey] = '';
      logger.info(`正文分片 ${shardKey} 加载成功，共 ${Object.keys(bodyMap).length} 个节点（尝试 ${attempt + 1} 次）`);
      return bodyMap;
    } catch (err) {
      lastError = err;
      logger.error(`正文分片 ${shardKey} 加载失败（第 ${attempt + 1} 次）: ${String(err)}`);
    }
  }

  const msg = lastError instanceof Error ? lastError.message : String(lastError);
  shardLoadErrors[shardKey] = msg || '未知错误';
  throw new Error(`正文分片 ${shardKey} 加载失败：${shardLoadErrors[shardKey]}`);
}

/**
 * 加载某个 shard 的正文，同一 shard 只请求一次（内存缓存 + in-flight 去重）
 */
function loadShard(shardKey: string): Promise<BodyMap> {
  if (shardPromises[shardKey]) return shardPromises[shardKey];
  if (cachedShards[shardKey]) return Promise.resolve(cachedShards[shardKey]);

  shardPromises[shardKey] = doLoadShard(shardKey).then((bodyMap) => {
    cachedShards[shardKey] = bodyMap;
    shardPromises[shardKey] = null;
    return bodyMap;
  });

  return shardPromises[shardKey];
}

/**
 * 强制重新加载某个 shard
 */
function reloadShard(shardKey: string): Promise<BodyMap> {
  shardPromises[shardKey] = null;
  delete cachedShards[shardKey];
  delete shardLoadErrors[shardKey];
  return loadShard(shardKey);
}

// ========== 节点级正文加载（新 API） ==========

/**
 * 根据节点 id 获取 shardKey。必须先加载索引。
 */
function getShardKeyForNode(nodeId: string): string | null {
  // 先查快速缓存
  if (nodeShardCache[nodeId]) return nodeShardCache[nodeId];

  if (!cachedIndex) return null;

  // 从索引里找并填充缓存
  const node = cachedIndex.ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === nodeId);
  if (node && node.shardKey) {
    nodeShardCache[nodeId] = node.shardKey;
    return node.shardKey;
  }
  return null;
}

/**
 * 加载单个节点的正文。
 * 自动根据索引中的 shardKey 定位到对应分片，同 shard 内节点复用缓存。
 */
export async function loadNodeBody(nodeId: string): Promise<string | null> {
  // 先看已有 shard 缓存里有没有
  for (const bodyMap of Object.values(cachedShards)) {
    if (bodyMap[nodeId]) return bodyMap[nodeId];
  }

  // 确保索引已加载
  if (!cachedIndex) await loadHistoryIndex();

  const shardKey = getShardKeyForNode(nodeId);
  if (!shardKey) {
    logger.warn(`未找到节点 ${nodeId} 的 shardKey`);
    return null;
  }

  const bodyMap = await loadShard(shardKey);
  return bodyMap[nodeId] ?? null;
}

// ========== Era 级正文加载（兼容 API） ==========

/**
 * 加载某个时代的全部正文（该 era 所有 shard 合并）。
 * 新代码建议用 loadNodeBody 按需加载单个节点。
 */
export function loadEraBody(eraId: string): Promise<BodyMap> {
  const shardKeys = ERA_SHARD_KEYS[eraId] || [];
  if (shardKeys.length === 0) {
    return Promise.resolve({});
  }

  return Promise.all(shardKeys.map((k) => loadShard(k))).then((shardMaps) => {
    const merged: BodyMap = {};
    for (const m of shardMaps) Object.assign(merged, m);
    return merged;
  });
}

/**
 * 强制重新加载某个时代的正文（该 era 所有 shard 都重试）
 */
export function reloadEraBody(eraId: string): Promise<BodyMap> {
  const shardKeys = ERA_SHARD_KEYS[eraId] || [];
  return Promise.all(shardKeys.map((k) => reloadShard(k))).then((shardMaps) => {
    const merged: BodyMap = {};
    for (const m of shardMaps) Object.assign(merged, m);
    return merged;
  });
}

/**
 * 同步获取某个节点的正文；未加载返回 null。
 * 保留 eraId 参数用于兼容，实际按 shardKey 定位。
 */
export function getBody(nodeId: string, _eraId?: string): string | null {
  // 先查快速缓存
  const shardKey = nodeShardCache[nodeId];
  if (shardKey && cachedShards[shardKey]) {
    return cachedShards[shardKey][nodeId] ?? null;
  }

  // 退而遍历所有已加载 shard
  for (const bodyMap of Object.values(cachedShards)) {
    if (bodyMap[nodeId]) return bodyMap[nodeId];
  }
  return null;
}

/**
 * 获取某个时代的正文加载错误；未失败返回 null
 */
export function getEraBodyLoadError(eraId: string): string | null {
  const shardKeys = ERA_SHARD_KEYS[eraId] || [];
  for (const k of shardKeys) {
    if (shardLoadErrors[k]) return shardLoadErrors[k];
  }
  return null;
}

// ========== 全文搜索：加载全部正文 ==========

let allBodiesPromise: Promise<BodyMap> | null = null;
let allBodiesCached: BodyMap | null = null;

/**
 * 加载全部时代的正文（用于全文搜索），合并成一个大 map
 */
export function loadAllBodies(): Promise<BodyMap> {
  if (allBodiesCached) return Promise.resolve(allBodiesCached);
  if (allBodiesPromise) return allBodiesPromise;

  allBodiesPromise = Promise.all(
    Object.keys(SHARD_BODY_IMPORTS).map((k) =>
      loadShard(k).then((bodyMap) => ({ key: k, bodyMap })),
    ),
  ).then((results) => {
    const merged: BodyMap = {};
    for (const { bodyMap } of results) {
      Object.assign(merged, bodyMap);
    }
    allBodiesCached = merged;
    allBodiesPromise = null;
    logger.info(`全部正文加载完成，共 ${Object.keys(merged).length} 个节点，${results.length} 个分片`);
    return merged;
  });

  return allBodiesPromise;
}

/**
 * 全文搜索是否已就绪
 */
export function isFullTextReady(): boolean {
  return allBodiesCached !== null;
}

// ========== 便捷方法 ==========

// 节点 id 兼容映射
const ID_LEGACY_MAP: Record<string, string> = {
  'ancient-minoan-civilization': 'minos-civilization',
  'indus-valley': 'indus-valley-civilization',
  'mycenaean': 'mycenaean-civilization',
  'war-trojan': 'trojan-war',
  'person-laozi': 'laozi',
  'person-confucius': 'confucius',
  'idea-renaissance-chinese': 'china-baijia',
  'shang-yang-reform': 'china-shangyang',
  'building-petra': 'landmark-petra',
  'war-changping': 'china-changping',
  'person-xiangyu': 'xiang-yu',
  'building-great-wall': 'landmark-great-wall',
  'war-chu-han': 'china-chu-han',
  'event-xiangyu-liubang-chu-han': 'china-chu-han-contention',
  'rome-constantine': 'person-constantine',
  'china-kaiyuan-shengshi': 'event-kaiyuan',
  'event-an-shi': 'an-shi-rebellion',
  'five-dynasties': 'dynasty-wudaishi',
  'war-crusades': 'crusades',
  'person-yuefei': 'yue-fei',
  'idea-renaissance': 'renaissance',
  'person-wangyangming': 'wang-yangming',
  'person-elizabeth-i': 'elizabeth-i',
  'war-thirty-years': 'thirty-years-war',
  'person-peter-the-great': 'peter-great',
  'thinker-voltaire': 'person-voltaire',
  'thinker-rousseau': 'person-rousseau',
  'idea-enlightenment': 'enlightenment',
  'war-waterloo': 'waterloo',
  'war-opium': 'event-opium-war',
  'us-civil-war-detail': 'war-american-civil',
  'person-sunzhongshan': 'sun-yat-sen',
  'person-roosevelt': 'roosevelt',
  'event-xinhai': 'xinhai-revolution',
  'war-wwi': 'world-war-1',
  'econ-great-depression': 'great-depression',
  'economy-1929-depression': 'great-depression',
  'war-wwii': 'world-war-2',
  'stalingrad-battle': 'war-stalingrad',
  'cuban-missile-crisis-deep': 'cuban-missile-crisis',
};

export function findNodeIndexById(id: string): IHistoryNodeIndex | null {
  if (!cachedIndex) return null;
  const actualId = ID_LEGACY_MAP[id] ?? id;
  return cachedIndex.ALL_HISTORY_NODES_INDEX.find((n) => n && n.id === actualId) ?? null;
}

export function getRandomNodeIdFromIndex(): string {
  if (!cachedIndex) return '';
  const valid = cachedIndex.ALL_HISTORY_NODES_INDEX.filter((n) => n);
  if (valid.length === 0) return '';
  return valid[Math.floor(Math.random() * valid.length)]?.id ?? '';
}

/**
 * 预加载索引（空闲时调用）
 */
export function preloadHistoryIndex(): void {
  void loadHistoryIndex();
}

// ========== 旧 API 兼容（供现有代码平滑过渡） ==========

export function loadHistoryData(): Promise<HistoryIndexData> {
  return loadHistoryIndex();
}

export function getHistoryData(): HistoryIndexData | null {
  return cachedIndex;
}

export function reloadHistoryData(): Promise<HistoryIndexData> {
  return reloadHistoryIndex();
}

export function getLoadError(): string | null {
  return indexLoadError;
}

export function findNodeById(id: string): IHistoryNodeIndex | null {
  return findNodeIndexById(id);
}

export function getRandomNodeIdFromData(): string {
  return getRandomNodeIdFromIndex();
}

export function preloadHistoryData(): void {
  preloadHistoryIndex();
}

// React hook 兼容
export function useHistoryDataLoader() {
  return {
    loadHistoryIndex,
    getHistoryIndex,
    getIndexLoadError,
    reloadHistoryIndex,
    loadEraBody,
    getBody,
    isFullTextReady,
    loadAllBodies,
  };
}

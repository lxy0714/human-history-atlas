# 数据格式

[English](DATA-FORMAT.md) · **简体中文**

人类文明时间地图 · [返回 README](../README.zh-CN.md)

---

schema **就是**编辑契约。本页记录每个字段、每个枚举，以及测试强制的每一条规则。

下面所有类型都取自本仓库中实际存在的 `src/data/history.ts` 与 `src/data/history-index.ts`。

## 一、`IHistoryNode` —— 完整节点

```ts
export interface IHistoryNode {
  id: string;
  title: string;
  year: number;              // 负数=公元前，用于排序
  yearDisplay: string;       // 展示用文字
  civilization: CivilizationKey;
  categories: CategoryKey[];
  eraId: string;
  type?: HistoryNodeType;    // 默认 event
  location?: { lat: number; lng: number };
  summary: string;           // 一句话摘要
  description: string;       // 详细介绍 300-800 字
  imageEra: string;          // 对应时代图片 key
  relatedNodeIds: string[];
  important?: boolean;       // 更大的圆点；驱动放映机事件流
  disputed?: string;         // 学术争议说明（如有）
  keyPoints?: string[];      // 核心记忆点 3-5 条
}
```

### 字段规则

| 字段 | 必填 | 规则 |
|---|---|---|
| `id` | ✅ | 763 个节点中唯一。kebab-case、纯 ASCII。**重复 id 会让测试失败。** |
| `title` | ✅ | 展示名。不要求唯一（开发期合并过 39 组同名节点，但不同事件合法地同名是允许的）。 |
| `year` | ✅ | 有符号整数。负数=公元前。**这是排序键**——绝不能是字符串。 |
| `yearDisplay` | ✅ | 人类可读。全站口径：去小数点、去 `k` 缩写、千分位。英文格式化走 `src/i18n/format-year.ts`。 |
| `civilization` | ✅ | 十个 key 之一（第三节）。 |
| `categories` | ✅ | 六个 key 的数组（第四节）。可以多个。 |
| `eraId` | ✅ | 七个 id 之一（第二节）。必须与 `year` 一致。 |
| `type` | — | 五个之一（第五节）。默认 `event`。 |
| `location` | — | **只有** `{ lat, lng }`——没有 `name` 字段。483 个节点有它，这些会上地图。 |
| `summary` | ✅ | 一句话。显示在卡片上。 |
| `description` | ✅ | 300–800 字。与长文正文（第六节）是两回事。 |
| `imageEra` | ✅ | 时代图片 key。 |
| `relatedNodeIds` | ✅ | **必须非空。** 孤立节点会让完整性测试失败。引用的每个 id 都必须存在——悬空引用同样失败。不许自引用。 |
| `important` | — | 布尔。**缺失即为 false**——该键是省略而非写 `false`。576 个节点带它。 |
| `disputed` | — | 描述学术分歧的自由文本。**请用它**，而不是悄悄选边站。 |
| `keyPoints` | — | 3–5 条短句。 |

> **`disputed` 很重要。** 内容库是 AI 辅助写作，行文未必会给出应有的保留。这个字段是记录"学界存在分歧"的结构化位置。如果你在更正一个有争议的年代，优先加 `disputed`，而不是把一个笃定主张换成另一个笃定主张。

## 二、时代 —— 七个

取自 `history-index.ts` 的 `ERAS`。每条含：`id`、`name`、`nameEn`、`startYear`、`endYear`、`description`、`bgFrom`、`bgTo`、`accent`。

| id | name | nameEn | startYear | endYear | 节点 |
|---|---|---|---|---|---|
| `prehistoric` | 史前时代 | Prehistoric | -3000000 | -4000 | 10 |
| `ancient` | 古代文明 | Ancient Civilizations | -4000 | -500 | 80 |
| `classical` | 古典时代 | Classical Era | -500 | 500 | 173 |
| `medieval` | 中世纪 | Medieval | 500 | 1500 | 246 |
| `earlyModern` | 大航海与近代 | Early Modern | 1500 | 1800 | 108 |
| `industrial` | 工业时代 | Industrial Era | 1800 | 1945 | 70 |
| `modern` | 现代 | Modern | 1945 | 至今 | 76 |

**合计 763。** 注意 `ancient` 结束于**公元前 500 年**，不是前 800——该边界与 `classical` 共用。

`bgFrom` / `bgTo` / `accent` 是驱动时代色带渐变的十六进制色。例（`prehistoric`）：`#2a1f15` → `#1a1410`，强调色 `#8b7355`。

> **每个时代的 `nameEn` 都已存在**，但部分视图尚未消费它。见[翻译进度第四节](TRANSLATION-STATUS.zh-CN.md)。

## 三、文明 —— 十个

```ts
type CivilizationKey =
  | 'china' | 'europe' | 'middleEast' | 'southAsia' | 'eastAsia'
  | 'america' | 'africa' | 'centralAsia' | 'oceania' | 'global';
```

| Key | 名称 | 节点 | 颜色 |
|---|---|---|---|
| `china` | 中国 | 270 | `#c0392b` |
| `europe` | 欧洲 | 226 | `#2c3e80` |
| `america` | 美洲 | 50 | `#27ae60` |
| `middleEast` | 中东 | 47 | `#d4a843` |
| `africa` | 非洲 | 46 | `#a0522d` |
| `eastAsia` | 东亚其他 | 39 | `#16a085` |
| `global` | 全球 | 25 | — |
| `centralAsia` | 中亚 | 23 | — |
| `southAsia` | 南亚 | 22 | `#e67e22` |
| `oceania` | 大洋洲 | 15 | — |

`global` 用于真正跨文明的事件（大流行、世界大战、气候事件），不是"我拿不准"的垃圾桶。

## 四、分类 —— 六个

```ts
type CategoryKey = 'politics' | 'military' | 'science' | 'culture' | 'myth' | 'artifact';
```

| Key | name | nameEn |
|---|---|---|
| `politics` | 政治 | Politics |
| `military` | 军事 | Military |
| `science` | 科技 | Science & Tech |
| `culture` | 文化 | Culture |
| `myth` | 神话 | Mythology |
| `artifact` | 文物 | Artifact |

`CATEGORIES` 的类型是 `Record<CategoryKey, { name, nameEn, icon }>`。**六个都已经有 `nameEn`。**

分类是多对多的标签轴，与 `type` 相互独立。

## 五、节点类型 —— 五个

```ts
type HistoryNodeType = 'event' | 'person' | 'myth' | 'dynasty' | 'artifact';
```

可选，默认 `event`。它驱动图标与部分筛选，**与 `categories` 不同**——一个节点可以是 `type: 'person'` 而 `categories: ['politics', 'military']`。

## 六、正文 —— 长文层

正文**不在** `IHistoryNode` 里，在分片中：

```
src/data/bodies/shards/*.ts        # 中文，29 个时代分片
src/data/bodies/en/shards/*.ts     # 英文，目前 2 个分片
```

每个分片导出：

```ts
export const BODY_MAP: Record<string, string> = {
  'node-id': '长文正文…',
};
```

节点所属分片通过索引条目上的 `shardKey` 定位。`hasBody` 表示是否有正文——**当前 763 个节点全为 `true`**。

中文内容库总量：**2,611,914 字**。

### 分片体积上限

单分片软上限 **110,000 字节 gzip**。`medieval-china-a` 当前 **109,334**——余量 666 字节。往那儿加正文就会踩门禁。去拆分片，别抬上限。

## 七、生成的索引

```ts
export interface IHistoryNodeIndex extends IHistoryNode {
  hasBody?: boolean;
  shardKey?: string;
}
```

`history-index.ts` 由 `scripts/generate-body-shards.mts` **自动生成**，文件头写明了。**永远别手改。**

导出项：

| 导出 | 内容 |
|---|---|
| `ERAS` | 7 个时代定义 |
| `HISTORY_NODES_INDEX` | 精选子集 |
| `ALL_HISTORY_NODES_INDEX` | 全部 763 |
| `CIVILIZATIONS` | 10 个 key，含名称与颜色 |
| `CATEGORIES` | 6 个 key，含中文名、英文名、图标 |
| `CIVILIZATION_COLORS` | 颜色查询表 |
| `ERA_IDS` | id 列表 |

### ⚠ 计数陷阱

该文件里有**两个节点数组**。整文件数 `"id"` 会得到 **1005** 而不是 763：精选子集重复计入了条目，另外还有 7 个时代 id。

**计数前务必先切到 `ALL_HISTORY_NODES_INDEX` 段：**

```python
s = open('src/data/history-index.ts', encoding='utf-8').read()
arr = s[s.index('ALL_HISTORY_NODES_INDEX'):]
print(arr.count('"id":'))   # 763
```

开发期正是这个错误产生过一个"998 节点"的假数。写在这里，免得你重蹈覆辙。

## 八、关联

每个节点上的 `relatedNodeIds: string[]`。图按**无向、去重**处理：

- 763 个节点上共 **2,396 组唯一对**。
- 零悬空引用（每个目标 id 都存在）。
- 零自环。
- 零孤立节点（每个节点至少 1 条关联）。

四条属性全部由测试强制。关联在所有视图中走**单一统一路径**消费——早期版本存在分歧的消费逻辑，后来做了收敛。

## 九、双语 overlay

翻译以**只装已译部分的 overlay** 存储，绝不复制完整记录。

### 节点元数据

```ts
// src/data/i18n/en-node-meta.ts
export interface EnNodeMeta {
  titleEn: string;
  summaryEn: string;
}
export const EN_NODE_META: Record<string, EnNodeMeta> = { /* 133 个节点 */ };
```

id 不存在 → 运行时回退中文。**不要加空条目。**

### 正文

```ts
// src/data/en-shard-body-map.ts
export const EN_SHARD_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
  'prehistoric-others': () => import('./bodies/en/shards/prehistoric-others'),
  'ancient-others':     () => import('./bodies/en/shards/ancient-others'),
};
export const TRANSLATED_EN_SHARDS: string[] = Object.keys(EN_SHARD_BODY_IMPORTS);
```

未登记的分片 → 回退中文并给出明确界面提示。

`loadNodeBodyBilingual(nodeId, lang)` 返回含 `isFallback` 的 `BilingualBodyResult`。

## 十、新增节点 —— 完整清单

1. 唯一的 kebab-case ASCII `id`。
2. `year` 为有符号整数；`yearDisplay` 遵循全站口径。
3. `eraId` 与 `year` 一致；`civilization` 与 `categories` 取自枚举。
4. `summary`（一句话）与 `description`（300–800 字）。
5. **至少一条合法的 `relatedNodeIds`。**
6. 要上地图就加 `location: { lat, lng }`。
7. 该进放映机事件流就加 `important: true`。
8. 学界有分歧就加 `disputed`。
9. 正文加进正确分片——**注意体积上限**。
10. 重新生成：`npx tsx scripts/generate-body-shards.mts`。
11. 验证：`npm test && npm run build && npm run test:gate`。

## 十一、其他数据集

专题馆在 `src/data/` 下各有自己的文件与形状：

`empires.ts` · `city-history.ts` · `daily-life.ts` · `glossary.ts` · `learning-paths.ts` · `empire-comparison.ts` · 以及测验/成就数据。

它们独立于 `IHistoryNode`，但遵循同样原则：带类型、入库、有测试覆盖、重的做懒加载。

---

下一篇：[架构说明](ARCHITECTURE.zh-CN.md) · [自行修改教程](CUSTOMIZATION.zh-CN.md) · [开源贡献指南](CONTRIBUTING.zh-CN.md)
# Data Format

**English** · [简体中文](DATA-FORMAT.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

The schema **is** the editorial contract. This page documents every field, every enum, and every rule the tests enforce.

All types below are quoted from `src/data/history.ts` and `src/data/history-index.ts` as they exist in this repository.

## 1. `IHistoryNode` — the full node

```ts
export interface IHistoryNode {
  id: string;
  title: string;
  year: number;              // negative = BCE; used for sorting
  yearDisplay: string;       // display text
  civilization: CivilizationKey;
  categories: CategoryKey[];
  eraId: string;
  type?: HistoryNodeType;    // default 'event'
  location?: { lat: number; lng: number };
  summary: string;           // one-sentence summary
  description: string;       // 300–800 characters
  imageEra: string;          // era image key
  relatedNodeIds: string[];
  important?: boolean;       // larger dot; drives projector event stream
  disputed?: string;         // scholarly dispute note, if any
  keyPoints?: string[];      // 3–5 memory anchors
}
```

### Field rules

| Field | Required | Rule |
|---|---|---|
| `id` | ✅ | Unique across all 763 nodes. kebab-case, ASCII. **Duplicate ids fail the test suite.** |
| `title` | ✅ | Display name. Not required to be unique (39 duplicate-title groups were merged during development, but distinct events may legitimately share a name). |
| `year` | ✅ | Signed integer. Negative = BCE. **This is the sort key** — never a string. |
| `yearDisplay` | ✅ | Human-readable. Site convention: no decimal points, no `k` abbreviation, thousands separators. English formatting goes through `src/i18n/format-year.ts`. |
| `civilization` | ✅ | One of ten keys (§3). |
| `categories` | ✅ | Array of the six keys (§4). May be multiple. |
| `eraId` | ✅ | One of seven ids (§2). Must be consistent with `year`. |
| `type` | — | One of five (§5). Defaults to `event`. |
| `location` | — | `{ lat, lng }` **only** — there is no `name` field. Present on 483 nodes; those appear on the map. |
| `summary` | ✅ | One sentence. Shown on cards. |
| `description` | ✅ | 300–800 characters. Distinct from the long-form body (§6). |
| `imageEra` | ✅ | Era image key. |
| `relatedNodeIds` | ✅ | **Must be non-empty.** Orphan nodes fail the integrity tests. Every referenced id must exist — dangling references fail too. No self-references. |
| `important` | — | Boolean. **Absent means false** — the key is omitted rather than set to `false`. 576 nodes carry it. |
| `disputed` | — | Free text describing scholarly disagreement. **Use this** instead of silently picking a side. |
| `keyPoints` | — | 3–5 short strings. |

> **`disputed` matters.** The corpus is AI-assisted and its prose does not reliably hedge. This field is the structured place to record that scholars disagree. If you are correcting a contested date, prefer adding `disputed` over replacing one confident claim with another.

## 2. Eras — seven

From `ERAS` in `history-index.ts`. Each entry: `id`, `name`, `nameEn`, `startYear`, `endYear`, `description`, `bgFrom`, `bgTo`, `accent`.

| id | name | nameEn | startYear | endYear | Nodes |
|---|---|---|---|---|---|
| `prehistoric` | 史前时代 | Prehistoric | -3000000 | -4000 | 10 |
| `ancient` | 古代文明 | Ancient Civilizations | -4000 | -500 | 80 |
| `classical` | 古典时代 | Classical Era | -500 | 500 | 173 |
| `medieval` | 中世纪 | Medieval | 500 | 1500 | 246 |
| `earlyModern` | 大航海与近代 | Early Modern | 1500 | 1800 | 108 |
| `industrial` | 工业时代 | Industrial Era | 1800 | 1945 | 70 |
| `modern` | 现代 | Modern | 1945 | present | 76 |

**Total 763.** Note that `ancient` ends at **500 BCE**, not 800 BCE — the boundary is shared with `classical`.

`bgFrom` / `bgTo` / `accent` are hex colours driving the era band gradient. Example (`prehistoric`): `#2a1f15` → `#1a1410`, accent `#8b7355`.

> **`nameEn` already exists for every era**, but some views do not consume it yet. See [Translation Status §4](TRANSLATION-STATUS.md).

## 3. Civilisations — ten

```ts
type CivilizationKey =
  | 'china' | 'europe' | 'middleEast' | 'southAsia' | 'eastAsia'
  | 'america' | 'africa' | 'centralAsia' | 'oceania' | 'global';
```

| Key | Name | Nodes | Colour |
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

`global` is for genuinely cross-civilisational nodes (pandemics, world wars, climate events), not a dumping ground for "I could not decide".

## 4. Categories — six

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

`CATEGORIES` is `Record<CategoryKey, { name, nameEn, icon }>`. **All six already carry `nameEn`.**

Categories are a many-to-many tagging axis, independent of `type`.

## 5. Node types — five

```ts
type HistoryNodeType = 'event' | 'person' | 'myth' | 'dynasty' | 'artifact';
```

Optional; defaults to `event`. This drives iconography and some filtering, and is **distinct from `categories`** — a node can be `type: 'person'` with `categories: ['politics', 'military']`.

## 6. Bodies — the long-form layer

Bodies are **not** in `IHistoryNode`. They live in shards:

```
src/data/bodies/shards/*.ts        # Chinese, 29 era shards
src/data/bodies/en/shards/*.ts     # English, 2 shards so far
```

Each shard exports:

```ts
export const BODY_MAP: Record<string, string> = {
  'node-id': 'long-form prose…',
};
```

A node's shard is located via `shardKey` on the index entry. `hasBody` indicates whether prose exists — **currently `true` for all 763 nodes**.

Total Chinese corpus: **2,611,914 characters**.

### Shard size limit

Soft limit **110,000 bytes gzip** per shard. `medieval-china-a` is at **109,334** — 666 bytes of headroom. Add prose there and the gate trips. Split the shard; do not raise the limit.

## 7. The generated index

```ts
export interface IHistoryNodeIndex extends IHistoryNode {
  hasBody?: boolean;
  shardKey?: string;
}
```

`history-index.ts` is **AUTO-GENERATED** by `scripts/generate-body-shards.mts`. Its header says so. **Never hand-edit.**

Exports:

| Export | Contents |
|---|---|
| `ERAS` | 7 era definitions |
| `HISTORY_NODES_INDEX` | curated subset |
| `ALL_HISTORY_NODES_INDEX` | all 763 |
| `CIVILIZATIONS` | 10 keys with names and colours |
| `CATEGORIES` | 6 keys with names, English names, icons |
| `CIVILIZATION_COLORS` | colour lookup |
| `ERA_IDS` | id list |

### ⚠ Counting trap

The file contains **two node arrays**. Counting `"id"` across the whole file gives **1005**, not 763: the curated subset duplicates entries, and there are 7 era ids as well.

**Always slice to `ALL_HISTORY_NODES_INDEX` before counting:**

```python
s = open('src/data/history-index.ts', encoding='utf-8').read()
arr = s[s.index('ALL_HISTORY_NODES_INDEX'):]
print(arr.count('"id":'))   # 763
```

This mistake produced a wrong "998 nodes" figure during development. It is documented so you do not repeat it.

## 8. Relations

`relatedNodeIds: string[]` on each node. The graph is treated as **undirected and deduplicated**:

- **2,396 unique pairs** across 763 nodes.
- Zero dangling references (every target id exists).
- Zero self-loops.
- Zero orphans (every node has ≥1 relation).

All four properties are test-enforced. Relations are consumed through a **single unified path** across all views — an earlier version had divergent consumption logic, which was consolidated.

## 9. Bilingual overlays

Translation is stored as **overlays containing only what is translated**, never as duplicated full records.

### Node metadata

```ts
// src/data/i18n/en-node-meta.ts
export interface EnNodeMeta {
  titleEn: string;
  summaryEn: string;
}
export const EN_NODE_META: Record<string, EnNodeMeta> = { /* 133 nodes */ };
```

Absent id → runtime falls back to Chinese. **Do not add empty entries.**

### Bodies

```ts
// src/data/en-shard-body-map.ts
export const EN_SHARD_BODY_IMPORTS: Record<string, () => Promise<{ BODY_MAP: Record<string, string> }>> = {
  'prehistoric-others': () => import('./bodies/en/shards/prehistoric-others'),
  'ancient-others':     () => import('./bodies/en/shards/ancient-others'),
};
export const TRANSLATED_EN_SHARDS: string[] = Object.keys(EN_SHARD_BODY_IMPORTS);
```

Unregistered shard → Chinese fallback with an explicit UI notice.

`loadNodeBodyBilingual(nodeId, lang)` returns `BilingualBodyResult` including `isFallback`.

## 10. Adding a node — complete checklist

1. Unique kebab-case ASCII `id`.
2. `year` as a signed integer; `yearDisplay` following the site convention.
3. `eraId` consistent with `year`; `civilization` and `categories` from the enums.
4. `summary` (one sentence) and `description` (300–800 chars).
5. **At least one valid `relatedNodeIds` entry.**
6. `location: { lat, lng }` if it should appear on the map.
7. `important: true` if it belongs in the projector stream.
8. `disputed` if scholars disagree.
9. Body added to the correct shard — **watch the size limit**.
10. Regenerate: `npx tsx scripts/generate-body-shards.mts`.
11. Verify: `npm test && npm run build && npm run test:gate`.

## 11. Other datasets

The special halls have their own files under `src/data/`, each with its own shape:

`empires.ts` · `city-history.ts` · `daily-life.ts` · `glossary.ts` · `learning-paths.ts` · `empire-comparison.ts` · and the quiz/achievement data.

They are independent of `IHistoryNode` but follow the same principles: typed, checked in, test-covered, and lazy-loaded where heavy.

---

Next: [Architecture](ARCHITECTURE.md) · [Customization](CUSTOMIZATION.md) · [Contributing](CONTRIBUTING.md)
# Translation Status & Roadmap

**English** · [简体中文](TRANSLATION-STATUS.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

**The goal is full bilingual coverage, including the entire corpus. That goal is not met.** This page states exactly where things stand, with numbers you can regenerate yourself, and what is left.

Last measured: **2026-11-21**, against the source in this repository.

## 1. Summary

| Layer | Chinese | English | Coverage |
|---|---|---|---|
| UI dictionary | complete | **539 keys / 58 groups** | partial |
| Components with no hardcoded Chinese | — | **55 of 137** `.tsx` | **40.1%** |
| Node titles + summaries | 763 / 763 | **133 / 763** | **17.4%** |
| Long-form bodies | 763 / 763 (2,611,914 chars) | **15 / 763** (7,649 words) | **2.0%** |

**Read that last row again.** 98% of the corpus is still Chinese-only. This is the honest state of the project's headline goal.

## 2. How fallback works — nothing fails silently

The system is designed so that missing translation is **visible and graceful**, never broken:

- **UI strings:** `t(key, fallback)` returns the Chinese fallback when a key is absent. You see Chinese, never a raw key like `common.filter`.
- **Node metadata:** `EN_NODE_META` contains *only* translated nodes. An untranslated node is simply absent from the overlay, so the runtime uses the Chinese title and summary.
- **Node bodies:** `loadNodeBodyBilingual(nodeId, lang)` returns a `BilingualBodyResult` with an `isFallback` flag. When English is unavailable, `DetailPanel` renders the Chinese body **plus an explicit notice card: "English version not yet available."**

That notice is a deliberate feature. **Do not remove it to make coverage look better.** A reader deserves to know they are reading a fallback.

**Performance note:** the English dictionary is dynamically imported. A Chinese-only session downloads **zero** extra bytes for i18n.

## 3. Exactly what is translated

### 3.1 UI dictionary — `src/i18n/en-US.ts`

**539 leaf keys across 58 groups.** Covers the core reading path: header navigation, detail panel, map view, timeline, list view, swimlanes, special hall, projector, empty states, theme switcher, sidebar, bottom tab bar, time slider, loading screen, chunk-load error view, compare panel, civilisation badge, error boundary.

### 3.2 Components — 55 of 137 clean

**82 `.tsx` files still contain hardcoded Chinese.** Note that "contains Chinese" is not the same as "untranslated" — some of those occurrences are comments, fallback literals passed to `t()` (which is correct and required), or data. But the count is the honest upper bound on remaining work.

### 3.3 Node metadata — 133 nodes

In `src/data/i18n/en-node-meta.ts`, each with `titleEn` and `summaryEn`. Prioritised by `important: true` first, then representative nodes per era.

### 3.4 Bodies — 15 nodes, 7,649 English words

| Shard | Nodes | English words |
|---|---|---|
| `prehistoric-others` | 10 | 4,257 |
| `ancient-others` | 5 | 3,392 |
| **Total** | **15** | **7,649** |

The five `ancient-others` nodes are: `egypt-unification`, `sumer`, `babylon`, `indus-valley-civilization`, `minos-civilization`.

Both shards are registered in `src/data/en-shard-body-map.ts`. All other shards fall back.

## 4. Verified defects in the current English mode

These were found by **actually switching the interface to English in a browser and reading the DOM** — not by inspecting code. They are real and open.

| Defect | Detail | Severity |
|---|---|---|
| **Era names not translated** | 史前时代 / 古代文明 / 古典时代 / 中世纪 render in Chinese in English mode, **even though `ERAS` already carries `nameEn`** (`Prehistoric`, `Ancient Civilizations`, …). The data is there; the rendering does not consume it. | High — cheap fix, high visibility |
| **Category names not translated** | 政治 / 军事 / 科技 / 文化 / 神话 / 文物 still Chinese, **even though `CATEGORIES` already carries `nameEn`** (`Politics`, `Military`, `Science & Tech`, …). Same wiring gap as era names. | High |
| **`html lang` not updated** | `document.documentElement.lang` stays `zh-CN` after switching to English | Medium — screen readers and hyphenation use it |
| Scattered UI literals | 筛选 (one instance), 播放, 时代目录, 舒适, 紧凑, and count strings like `共 763 个历史节点`, `7 个时代`, `共 238 个节点` | Medium |
| Node titles | Expected — only 133/763 have English metadata | Known gap, not a defect |

The era-name and category-name items are the best first contributions available: the translations already exist in the data, so the work is wiring, not translating.

## 5. Regenerate these numbers yourself

Do not trust this table — it will drift. Regenerate:

```bash
npx tsx scripts/translation-progress.ts
```

Or measure directly:

```bash
# Components still containing Chinese
python3 - <<'PY'
import re, pathlib
tsx = list(pathlib.Path('src').rglob('*.tsx'))
hard = [f for f in tsx if re.search(r'[\u4e00-\u9fff]', f.read_text(encoding='utf-8'))]
print(f'{len(tsx)-len(hard)} of {len(tsx)} clean')
PY

# Node metadata entries
grep -cE "^\s*'[a-z0-9-]+':\s*\{" src/data/i18n/en-node-meta.ts

# English body shards
ls src/data/bodies/en/shards/
```

**Any PR that changes coverage must update this page with regenerated numbers.**

## 6. Roadmap

Ordered by value-per-effort, not by ease.

### Phase 1 — wire up what already exists
*Small effort, large visible improvement.*

- [ ] Consume `ERAS[].nameEn` in every view that renders era names
- [ ] Consume `CATEGORIES[].nameEn` — all six already have English names in the data
- [ ] Update `document.documentElement.lang` on language change
- [ ] Sweep the remaining scattered literals listed in §4

### Phase 2 — finish the interface
*Medium effort.*

- [ ] Work through the 82 components still containing hardcoded Chinese
- [ ] Verify each in a browser at 1280px and 390px, in both languages
- [ ] Target: zero user-visible Chinese in English mode except content fallback

### Phase 3 — metadata to full coverage
*630 nodes remaining.*

Suggested order, prioritising what readers hit first:

1. All 576 `important` nodes (currently 133 done, so ~443 remaining)
2. Remaining nodes era by era, largest eras first: medieval (246), classical (173), earlyModern (108)
3. Long tail: modern (76), industrial (70), ancient (80), prehistoric (10)

### Phase 4 — the corpus
*748 nodes, ~2.6 million characters. This is the long haul.*

Realistically this is **years of contributor effort**, not a sprint. Suggested batching:

- One shard per PR, reviewed by a human who knows the period.
- Prioritise by reader traffic rather than by chronology — the most-opened nodes first.
- **Quality over speed.** An unreviewed machine-translated shard is worse than an honest Chinese fallback, because it looks authoritative and is not.

The project will not pretend this is nearly done. It is roughly **2% done**.

### Phase 5 — beyond two languages

The overlay pattern generalises. See [Customization §5.5](CUSTOMIZATION.md). No third language is planned by the maintainer; contributions welcome.

## 7. Translation conventions

Established and expected:

- **Names:** standard English renderings. Qin Shi Huang, Mesopotamia, Ashurbanipal. Not novel romanisations.
- **Dates:** BCE / CE, with thousands separators, via `src/i18n/format-year.ts`. Do not hand-format years.
- **Fidelity:** translation must not add, remove or soften historical claims. If the Chinese is wrong, file a factual correction — do not silently fix it in the English.
- **Register:** encyclopedic, museum-label tone. Same as the Chinese.
- **No emoji.** Site-wide rule.

## 8. How to help right now

If you have ten minutes: fix one item from Phase 1.
If you have an hour: translate one node's metadata and body, properly, with review.
If you have a weekend: take a whole shard.

Read [Contributing](CONTRIBUTING.md) and [Customization §5](CUSTOMIZATION.md), then open a PR.

---

Next: [Contributing](CONTRIBUTING.md) · [Customization](CUSTOMIZATION.md) · [Data Format](DATA-FORMAT.md)
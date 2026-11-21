# Translation Status & Roadmap

**English** · [简体中文](TRANSLATION-STATUS.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

**The goal is full bilingual coverage, including the entire corpus. The interface and all node metadata now meet it; the long-form corpus does not.** This page states exactly where things stand, with numbers you can regenerate yourself, and what is left.

Last measured: **2026-11-21**, against the source in this repository.

## 1. Summary

| Layer | Chinese | English | Coverage |
|---|---|---|---|
| UI dictionary | complete | **539 keys / 58 groups** | partial |
| Components with no hardcoded Chinese | — | **55 of 137** `.tsx` | **40.1%** |
| Node titles + summaries | 763 nodes | **763 / 763** | **100%** |
| Era / category / civilisation names | 7 + 6 + 10 | **23 / 23** | **100%** |
| Long-form bodies | 763 nodes (~810,738 chars) | **15 / 763** (7,649 words) | **2.0%** |

**Read that last row again.** 98% of the long-form corpus is still Chinese-only. Titles, summaries and every taxonomy label are fully bilingual; the essays are not. That is the honest state of the project's headline goal.

### A note on the corpus size

Earlier revisions of this page quoted **2,611,914 characters**. That figure was wrong: it counted both `src/data/bodies/<era>.ts` and `src/data/bodies/shards/*.ts`, which hold **the same text** — the era files are generated aggregates of the shards. Counting unique content only:

| Source | Chinese characters |
|---|---|
| `bodies/shards/*.ts` (22 shards, authoritative) | 810,738 |
| `bodies/<era>.ts` (7 generated aggregates) | 810,602 — duplicate, not additional |

The real translation workload is therefore **~810k characters**, not 2.6M. Still large, but a third of what was previously claimed.

## 2. How fallback works — nothing fails silently

The system is designed so that missing translation is **visible and graceful**, never broken:

- **UI strings:** `t(key, fallback)` returns the Chinese fallback when a key is absent. You see Chinese, never a raw key like `common.filter`.
- **Taxonomy labels:** `ln(entry, fallback)` prefers `entry.nameEn` in English mode and falls back to `entry.name`.
- **Node metadata:** `nt(node)` / `ns(node)` look up `EN_NODE_META` **by node id**. Any object without a matching id — achievements, learning paths, glossary entries — returns its own `title` / `summary` untouched. This is what makes site-wide wiring safe.
- **Node bodies:** `loadNodeBodyBilingual(nodeId, lang)` returns a `BilingualBodyResult` with an `isFallback` flag. When English is unavailable, `DetailPanel` renders the Chinese body **plus an explicit notice card: "English version not yet available."**

That notice is a deliberate feature. **Do not remove it to make coverage look better.** A reader deserves to know they are reading a fallback.

**Performance note:** the English dictionary *and* `EN_NODE_META` are both dynamically imported. A Chinese-only session downloads **zero** extra bytes for i18n, so the first-screen bundle gate is unaffected by translation coverage.

## 3. Exactly what is translated

### 3.1 UI dictionary — `src/i18n/en-US.ts`

**539 leaf keys across 58 groups.** Covers the core reading path: header navigation, detail panel, map view, timeline, list view, swimlanes, special hall, projector, empty states, theme switcher, sidebar, bottom tab bar, time slider, loading screen, chunk-load error view, compare panel, civilisation badge, error boundary.

### 3.2 Components — 55 of 137 clean

**82 `.tsx` files still contain hardcoded Chinese.** Note that "contains Chinese" is not the same as "untranslated" — some of those occurrences are comments, fallback literals passed to `t()` (which is correct and required), or data. But the count is the honest upper bound on remaining work.

**137 title/summary render sites across 41 components are now wired** through `nt()` / `ns()`, so node titles and summaries render in English wherever they appear.

### 3.3 Node metadata — 763 of 763 nodes

In `src/data/i18n/en-node-meta.ts`, each with `titleEn` and `summaryEn`, grouped by era. Verified to be a **bijection with `ALL_HISTORY_NODES_INDEX`**: 763 ids, 0 missing, 0 extra, 0 entries containing residual Chinese.

### 3.4 Taxonomy labels — all 23

`ERAS` (7), `CATEGORIES` (6) and `CIVILIZATIONS` (10) all carry `nameEn` and are consumed via `ln()`.

### 3.5 Bodies — 15 nodes, 7,649 English words

| Shard | Nodes | English words |
|---|---|---|
| `prehistoric-others` | 10 | 4,257 |
| `ancient-others` | 5 | 3,392 |
| **Total** | **15** | **7,649** |

The five `ancient-others` nodes are: `egypt-unification`, `sumer`, `babylon`, `indus-valley-civilization`, `minos-civilization`.

Both shards are registered in `src/data/en-shard-body-map.ts`. All other shards fall back.

## 4. Defects found and fixed

These were found by **actually switching the interface to English in a browser and reading the DOM**, then confirmed in code. All are now closed in source; `npm test`, `npm run build` and `npm run test:gate` pass.

| Defect | Root cause | Status |
|---|---|---|
| Era names not translated | `ERAS[].nameEn` existed but no view consumed it | **Fixed** via `ln()` |
| Category names not translated | Same wiring gap for `CATEGORIES[].nameEn` | **Fixed** via `ln()` |
| Civilisation names not translated | `CIVILIZATIONS` type annotation lacked `nameEn`, so the field was rejected | **Fixed** — type widened, 10 names added |
| `html lang` not updated | No effect syncing `document.documentElement.lang` | **Fixed** in `I18nProvider` |
| **Translated metadata never rendered** | `useNodeI18n` / `getNodeTitleLang` existed but **no component called them** — even the previously translated nodes displayed Chinese | **Fixed** — 137 render sites wired |
| **Search broke in English mode** | Keyword tables are Chinese; matching against the translated title alone made every Chinese query miss | **Fixed** via `bilingualHaystack()` — both languages always searched |
| **English labels truncated to nonsense** | Cut limits (4/5/6/8) were calibrated for Chinese density; `The Renaissance` became `The R…` | **Fixed** via `smartTrim()` — Latin text gets 3× budget and word-boundary cuts |
| City Memory lost nodes in English mode | Same keyword-matching defect as search | **Fixed** — dual matching, translator passed as a parameter |

### Still open

| Item | Detail | Severity |
|---|---|---|
| Scattered UI literals | 筛选 (one instance), 播放, 时代目录, 舒适, 紧凑, and count strings like `共 763 个历史节点`, `7 个时代`, `共 238 个节点` | Medium |
| Long-form bodies | 748 nodes still Chinese-only, with an explicit fallback notice | Known gap, not a defect |

## 5. Regenerate these numbers yourself

Do not trust this table — it will drift. Regenerate:

```bash
# Components still containing Chinese
python3 - <<'PY'
import re, pathlib
tsx = list(pathlib.Path('src').rglob('*.tsx'))
hard = [f for f in tsx if re.search(r'[\u4e00-\u9fff]', f.read_text(encoding='utf-8'))]
print(f'{len(tsx)-len(hard)} of {len(tsx)} clean')
PY

# Node metadata entries
grep -cE "^  '[^']+': \{ titleEn:" src/data/i18n/en-node-meta.ts

# Unique corpus size (shards only — do NOT add the era aggregates)
python3 - <<'PY'
import re, pathlib
n = sum(len(re.findall(r'[\u4e00-\u9fff]', p.read_text(encoding='utf-8')))
        for p in pathlib.Path('src/data/bodies/shards').glob('*.ts'))
print(n)
PY

# English body shards
ls src/data/bodies/en/shards/
```

**Any PR that changes coverage must update this page with regenerated numbers.**

## 6. Roadmap

Ordered by value-per-effort, not by ease.

### Phase 1 — wire up what already exists ✅ done

- [x] Consume `ERAS[].nameEn` in every view that renders era names
- [x] Consume `CATEGORIES[].nameEn` — all six already had English names in the data
- [x] Consume `CIVILIZATIONS[].nameEn`
- [x] Update `document.documentElement.lang` on language change
- [x] Wire node titles and summaries — the helpers existed but were never called
- [ ] Sweep the remaining scattered literals listed in §4

### Phase 2 — finish the interface
*Medium effort. This is the current front line.*

- [ ] Work through the 82 components still containing hardcoded Chinese
- [ ] Verify each in a browser at 1280px and 390px, in both languages
- [ ] Target: zero user-visible Chinese in English mode except content fallback

### Phase 3 — metadata to full coverage ✅ done

- [x] All 763 nodes have `titleEn` and `summaryEn`
- [x] Id set verified identical to `ALL_HISTORY_NODES_INDEX`

### Phase 4 — the corpus
*748 nodes, ~810k characters. This is the long haul.*

Suggested batching:

- One shard per PR, reviewed by a human who knows the period.
- Start with `medieval-china-a` (52 nodes, 70,559 chars): it is the largest shard **and** the only one flagged NEAR the bundle gate's soft limit, so translating and splitting can be done together.
- Prioritise by reader traffic rather than by chronology — the most-opened nodes first.
- **Quality over speed.** An unreviewed machine-translated shard is worse than an honest Chinese fallback, because it looks authoritative and is not.

### Phase 5 — beyond two languages

The overlay pattern generalises. See [Customization §5.5](CUSTOMIZATION.md). No third language is planned by the maintainer; contributions welcome.

## 7. Translation conventions

Established and expected:

- **Names:** standard English renderings. Qin Shi Huang, Mesopotamia, Ashurbanipal. Not novel romanisations.
- **Dates:** BCE / CE, with thousands separators, via `src/i18n/format-year.ts`. Do not hand-format years.
- **Fidelity:** translation must not add, remove or soften historical claims. If the Chinese is wrong, file a factual correction — do not silently fix it in the English.
- **Myth is labelled as myth.** Legendary figures are rendered as legend, never asserted as documented history.
- **Register:** encyclopedic, museum-label tone. Same as the Chinese.
- **No emoji.** Site-wide rule.
- **Never break Chinese matching.** Any filter, search or keyword table must use `bilingualHaystack()`, not the translated string alone.
- **Never hard-cut English by Chinese character limits.** Use `smartTrim()`.

## 8. How to help right now

If you have ten minutes: sweep one scattered literal from §4.
If you have an hour: translate one node's body, properly, with review.
If you have a weekend: take a whole shard.

Read [Contributing](CONTRIBUTING.md) and [Customization §5](CUSTOMIZATION.md), then open a PR.

---

Next: [Contributing](CONTRIBUTING.md) · [Customization](CUSTOMIZATION.md) · [Data Format](DATA-FORMAT.md)
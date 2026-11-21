# Architecture

**English** · [简体中文](ARCHITECTURE.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

This document explains how the application is put together and **why** the non-obvious decisions were made. If you only read one section, read §3 (loading) and §7 (invariants).

## 1. Shape of the system

```
┌─────────────────────────────────────────────────────────┐
│  Static host (any)                                      │
│  index.html + assets/  — no server, no database         │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
┌───────▼────────┐                 ┌────────▼─────────┐
│  First screen  │                 │  Lazy chunks     │
│  23 files      │                 │  views + bodies  │
│  index + era   │                 │  29 era shards   │
│  metadata      │                 │  4 heavy views   │
└───────┬────────┘                 └────────┬─────────┘
        │                                   │
        └─────────────────┬─────────────────┘
                          │
              ┌───────────▼───────────┐
              │  Typed TS data layer  │
              │  history.ts (source)  │
              │  history-index.ts     │
              │  (generated)          │
              └───────────────────────┘
```

**There is no backend.** Content is TypeScript, compiled into JS chunks, fetched as static files. This is the single most consequential architectural choice, and §2 explains it.

## 2. Content-as-code

The 2.61-million-character corpus lives in `src/data/` as typed TypeScript, not in a database.

**What this buys:**

- Every factual correction is a **reviewable diff**. In a history project, auditability of edits is worth more than editorial convenience.
- Relations are **type-checked**. A dangling `relatedNodeIds` entry is a compile/test error, not a runtime surprise.
- The whole atlas is a **static artefact**. Anyone can host it, fork it, or archive it. No migration, no dump, no API keys.
- Content and code version together. A checkout at any commit is a complete, coherent atlas.

**What it costs:**

- No editing UI. Contributors need git.
- Repository size is large (the corpus dominates).
- Adding content requires a rebuild.

For this project the trade is correct. For a wiki with thousands of casual editors it would not be.

### The three data tiers

| Tier | File | Loaded | Contains |
|---|---|---|---|
| **Index** | `history-index.ts` (**generated**) | First screen | id, title, year, civilisation, categories, era, location, summary, relation ids, `hasBody`, `shardKey` |
| **Full nodes** | `history.ts` | On demand | Everything above plus full descriptions |
| **Bodies** | `bodies/shards/*.ts` | On node open | Long-form prose, keyed by node id |

`history-index.ts` carries a header stating it is **AUTO-GENERATED** by `scripts/generate-body-shards.mts`. Never hand-edit it. Edit `history.ts` and regenerate.

The index exports `ERAS`, `HISTORY_NODES_INDEX` (a curated subset), `ALL_HISTORY_NODES_INDEX` (all 763), `CIVILIZATIONS`, `CATEGORIES`, `CIVILIZATION_COLORS`, `ERA_IDS`.

> **Counting trap:** `HISTORY_NODES_INDEX` and `ALL_HISTORY_NODES_INDEX` are two arrays in the same file. Counting `"id"` occurrences across the whole file yields **1005**, not 763 — the curated subset is counted twice, plus 7 era ids. Always slice to `ALL_HISTORY_NODES_INDEX` before counting.

## 3. Loading strategy — the performance core

### 3.1 First screen: exactly 23 files

A clean load fetches **23 files** (22 JS + 1 CSS). This is asserted by a test, not aspirational.

Four heavy chunks are **explicitly forbidden** on first screen:

- `MapView`
- `ListView`
- `SpecialHall`
- `empires`
- `HistoryProjector`

They were originally being prefetched, costing **10.63%** of first-screen transfer for views the user might never open. Removing that prefetch was a measured win.

### 3.2 Body shards

Long-form prose is split into **29 era shards**, with secondary splitting where a shard grew too large. Opening a node fetches only its shard.

`IHistoryNodeIndex extends IHistoryNode` with two extra fields:

- `hasBody?: boolean` — whether prose exists (currently true for all 763)
- `shardKey?: string` — which shard to fetch

### 3.3 Two-tier gzip gates

Every budget has a **WARN** and a **FAIL** threshold, measured with `gzipSync(level 9)`:

| Artefact | WARN | FAIL |
|---|---|---|
| `history-index` | 134,000 | 152,000 |
| main `index` | 92,000 | 104,000 |
| CSS | 54,000 | 62,000 |
| First-screen total | 669,000 | 760,000 |

Individual shards have a 110,000 soft limit. **`medieval-china-a` currently sits at 109,334 — 666 bytes (0.61%) of headroom.** It is flagged NEAR and needs splitting.

**Measuring correctly matters:** use `curl -H 'Accept-Encoding: gzip'`. Node's `fetch` auto-decompresses, and `curl --compressed` may negotiate brotli — both give you the wrong number for a gzip budget.

### 3.4 The gate fails when it cannot measure

An earlier version of the gate silently passed when build artefacts were absent. That is worse than no gate, because it produces false confidence. **The gate now fails** if it cannot read what it is supposed to measure.

Run `npm run build` before `npm run test:gate`.

## 4. Views

Four views over one dataset, all reading the same index and the same relation graph:

| View | Component | Chunk |
|---|---|---|
| Timeline | `TimelineView` | first screen |
| Map | `MapView` | lazy (forbidden on first screen) |
| List | `ListView` | lazy (forbidden) |
| Special Hall | `SpecialHall` | lazy (forbidden) |

Plus `SwimLaneView`, `DetailPanel`, `ComparePanel`, `HistoryProjector`.

`DetailPanel` is shared — opening a node from the timeline, the map or the list produces the same panel. This is deliberate: the views are lenses, not separate applications.

## 5. Internationalisation

```
src/i18n/
├── index.tsx        Provider, useI18n, t(key, fallback)
├── zh-CN.ts         source of truth
├── en-US.ts         dynamically imported
├── format-year.ts   BCE/CE + thousands separators
└── types.ts
```

Three design decisions:

1. **`t(key, fallback)` always takes a Chinese fallback.** A missing key renders Chinese, never a raw key string. Nothing fails silently.
2. **English is dynamically imported.** A Chinese-only session pays **zero** extra bytes. This keeps the first-screen budget intact.
3. **Content translation uses overlays, not duplication.** `EN_NODE_META` (133 nodes) and `EN_SHARD_BODY_IMPORTS` (2 shards) contain *only* what is translated. Absent entries fall back at runtime.

`loadNodeBodyBilingual(nodeId, lang)` returns `BilingualBodyResult` with `isFallback: true` when English is unavailable; `DetailPanel` renders an explicit notice. **The notice is a feature.**

See [Translation Status](TRANSLATION-STATUS.md) for coverage.

## 6. Theming and shape language

Five themes as CSS custom-property blocks in `src/index.css`: `museum` (default), `ink`, `parchment`, `xuanzhi`, `bamboo`. Persisted via `next-themes` and `safeScopedStorage`.

**Contrast is measured, not eyeballed.** Hairlines, focus rings and the header border must reach WCAG 3:1 in every theme. Semi-transparent colours must be alpha-composited over the actual background before computing the ratio — measuring raw rgba gives a wrong answer. The header bottom border measures **3.21**.

**The 2px rule is enforced at build time.** `postcss-radius-normalize.cjs` rewrites every non-circular radius >2px to 2px. Writing `rounded-lg` in a component does not survive the build. Circular values (`50%`, `999px`, `9999px`) are exempt.

## 7. Invariants — do not regress these

Each of these was a real bug, root-caused and fixed. They are listed because they are easy to undo by accident.

### 7.1 Map container must keep `isolation: isolate`

**Symptom:** every History Projector control, including the exit button, was unclickable.

**Root cause:** the map container had `z-index: auto`, which **does not establish a stacking context**. Leaflet's map-pane (`z-index: 400`) therefore escaped the container and painted over the projector's control bar (`z-index: 10`).

**Fix:** `isolation: isolate` on the container, creating a stacking context that contains Leaflet's z-indices.

Raising the control bar's z-index would have been a patch, not a fix — the next Leaflet layer would escape again.

### 7.2 Projector overlay must keep `createPortal` to `document.body`

**Symptom:** the projector was unclickable for **2–4 seconds** after opening.

**Root cause:** an ancestor `motion.div` wrote a `transform`. A transformed ancestor becomes the containing block for `position: fixed`, so the "full-screen" overlay resolved against that ancestor instead of the viewport, and its hit region was wrong until the animation settled.

**Fix:** portal the overlay to `document.body`, outside any transformed ancestor.

### 7.3 Projector event stream must stay purely derived

The event log and the year readout are **pure functions of `currentYear`**. There is deliberately **no `AnimatePresence`** in that path.

**Why:** an exit animation retains the old children for its duration. After a reset, stale events stayed on screen while the year cursor had already jumped. Deriving everything from one state value makes that class of bug impossible.

### 7.4 First-screen file count and forbidden chunks

23 files, and the four heavy views must not appear. Asserted by test.

**Note on measuring:** view state is persisted, so a session that previously opened the map will prefetch differently. To count correctly: switch to timeline view, **then reload**, then count immediately.

### 7.5 Data integrity

Zero orphan nodes, zero dangling relation references, zero self-loops, zero duplicate ids. All test-enforced. 76 orphans were found and fixed during development; the test exists so they cannot come back.

### 7.6 Touch targets ≥44×44, icons unchanged

Hit areas were enlarged **by padding, not by scaling the icon**. The visual density is intentional; only the reachable area grew.

## 8. Resilience

**Chunk-load self-healing.** A lazy chunk can fail to load — typically mid-deployment, when `index.html` points at hashes the CDN no longer has. The handler:

1. Retries once automatically.
2. If still failing, renders a localized explanation with a manual reload button (146×44).
3. **Never** enters an infinite reload loop.

**Error boundaries.** `ViewErrorBoundary` wraps each view so one broken view does not take down the atlas.

## 9. Testing

| Suite | Count | Covers |
|---|---|---|
| `npm test` | **154** (16 files) | Data integrity, relations, i18n, components, formatting |
| `npm run test:gate` | **17** (4 files) | Build artefacts, first-screen count, gzip budgets |

Both verified passing on this repository. Zero skipped tests — a skipped test is a gate that is not running.

The gates read **real build output**, not estimates.

## 10. Build pipeline

`npm run build` → `bash scripts/build.sh`:

1. `vite build` → `dist/client/`
2. `public/*` + HTML + `routes.json` → `dist/output/`
3. `assets/` → `dist/output_resource/`
4. `shared/static/` (minus code files) → `dist/output_static/`
5. capabilities → `dist/output_capabilities/`
6. remove `dist/client/`

The split reflects a platform CDN convention. **For ordinary static hosting you merge `output/` and `output_resource/assets/` into one directory** — see [Deployment §5](DEPLOYMENT.md).

Three build modes exist (platform default / standalone / clean web). They differ in code splitting and telemetry. **This matters more than any other build detail** — see [Deployment §4](DEPLOYMENT.md).

---

Next: [Data Format](DATA-FORMAT.md) · [Customization](CUSTOMIZATION.md) · [Deployment](DEPLOYMENT.md)
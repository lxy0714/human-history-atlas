# Changelog

**English** · [简体中文](CHANGELOG.zh-CN.md)

Human History Atlas · [Back to README](README.md)

---

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**A note on build numbers.** During development the application was hosted on an app platform that assigned sequential build numbers. Those numbers appear below because they are the only reliable identifiers for the pre-open-source history. They are **not** version numbers, and they do not continue after open-sourcing. From `1.0.0` onward, versions are the repository's own.

## [Unreleased]

### Fixed

- **The four main views are browser-verified to contain no Chinese in English mode.** Timeline, satellite map, encyclopedia and Special Hall were each switched to English and every visible text node walked; each returned only the header brand mark `史` (a logo, deliberately untranslated). Previously `tsc`, `eslint`, the unit tests and the build were all green while the page was still full of Chinese — the defect was only visible by reading the rendered DOM.
- **First-screen constants were missing English names.** `history-constants.ts` carried a second copy of `CIVILIZATIONS` and `CATEGORIES` without `nameEn`. Components importing from it rendered Chinese even with correct `ln()` wiring. Both copies now agree, with a new test locking parity against future drift.
- **Year display strings are fully bilingual.** New `src/i18n/year-display.ts` converts the stored Chinese `yearDisplay` strings, covering dynasties, parentheticals, century ranges, bare years, full dates and verbs; **763/763 with zero fallback**, locked by a test. Nodes carry only `year` and no end year, so ranges cannot be recomputed — hence deterministic string conversion.
- **Fixed an order-of-magnitude error.** `约300万年前` was rendered as `300 million years ago`; it is `3 million`. Caught by the new test.
- **`formatYear` / `yearsAgo` are now language-aware at the source**, so all 100+ call sites switch without per-site changes. The Chinese output is byte-for-byte unchanged.
- **Restored 8 dictionary keys corrupted by an earlier batch script** (the string literal `'swimlane.title'` had become `'nt(swimlane)'`), which made English mode fall back to Chinese silently. Added a "no missing keys" test.
- **Search now matches both languages.** Summary and year previously matched only the translation, so Chinese queries returned nothing in English mode. Four files affected.
- **Empires and capitals are fully bilingual**: `nameEn` added and wired for 37 empires and 33 capitals.
- **All 27 Special Hall cards** gained English titles and blurbs; **all 7 era descriptions** gained English, added at the generator source `history.ts` so regenerating the index does not drop them.

### Changed

- **The strip script now rewrites the font mirror.** Measurement showed `MIAODA_FONTS_MIRROR_OFF=1` does not remove the three `miaoda.feishu.cn/fonts` links; the script previously exited 2 on every clean build. It now rewrites them to the real Google Fonts origin and adds a `gstatic` preconnect. Idempotent, with a passing re-check.
- **Removed the platform watermark.** `vite.config.ts` uses `define` to set the client build target to `standalone`, so `AppContainer` no longer renders the platform badge. **Code splitting is fully preserved (109 chunks)**, unlike the real standalone build target.
- Removed 8 one-off `.tmp.ts` scripts that had been committed, and blocked the pattern in `.gitignore`.
- Tests grew from 154 to **171**, with three new suites: constants parity, zero missing dictionary keys, zero year-display fallback.

### Known outstanding work

- **Long-form bilingual coverage is incomplete.** The interface, metadata, years and taxonomy labels are fully bilingual and browser-verified; **English bodies still cover only 15/763 nodes** (~810,000 characters left to translate). Full corpus translation is the project's largest open task.
- The 27 sub-applications inside Special Hall, the long-form area of the detail panel, and the mobile bottom tab bar have not each had an English-mode DOM measurement.
- `medieval-china-a` shard sits at **109,334 bytes gzip** against a 110,000 soft limit — **666 bytes (0.61%) of headroom**. Needs splitting.
- Site-wide audit of sub-44px touch targets on mobile not completed.
- `document.documentElement.lang` stays `zh-CN` after switching the interface to English. Real accessibility defect, confirmed by browser inspection, not yet fixed.
- Era names and category names (人物 / 事件 / 朝代 / 文物·建筑 / 神话) still render in Chinese in English mode, despite `nameEn` existing in the era data. Confirmed by browser inspection.
- Chunk-load self-healing: "restore exact reading position after reload" lacks clean verification evidence.

## [1.0.0] — 2026-11-21

**First open-source release.** The application is published to GitHub under a dual licence, with a full bilingual documentation set.

### Added

- **Public repository** `lxy0714/human-history-atlas`, containing the complete source and the full 2.61-million-character corpus.
- **Dual licensing:** [MIT](LICENSE) for code, [CC BY-SA 4.0](LICENSE-CONTENT) for historical prose, with an explicit scope statement in each file so the boundary is unambiguous.
- **Bilingual documentation set** — every page in both English and Simplified Chinese: product introduction, project about, sources & inspiration, architecture, data format, deployment guide, customization guide, contributing guide, translation status, third-party notices, and this changelog.
- **`scripts/strip-platform-telemetry.mjs`** — removes the four platform telemetry/context scripts injected by the upstream Vite preset, and fills the `{{appName}}` / `{{appDescription}}` / `{{appAvatar}}` placeholders that the platform would otherwise substitute at serve time. Idempotent; preserves JSON-LD; verifies its own result and exits non-zero if platform hosts remain. This is what makes a **clean, code-split public web build** possible (Mode C in the deployment guide).

### Fixed

- **`package-lock.json` was unusable outside the original platform.** All 812 `resolved` entries pointed at `registry.npmmirror.com` (766) or the platform-internal `miaoda-release-npm-cache.feishu.cn` (46). The latter now returns an HTML 404 page, so `npm install` failed with **`EINTEGRITY`** — and changing `.npmrc` alone did not help, because lockfile `resolved` URLs override the configured registry. All hosts rewritten to `https://registry.npmjs.org`; tarball paths are identical across these hosts, so **no version and no integrity hash was altered**. `.npmrc` updated to match. **Without this fix the deployment guide would have been fiction.**
- **Stale node count in `index.html`.** Metadata, Open Graph tags, Twitter tags and JSON-LD all claimed **747** nodes. Actual count is **763**. Corrected in all five places.
- **Fabricated `aggregateRating` removed.** The JSON-LD carried `ratingValue: 5, ratingCount: 1` with no underlying review data. Removed rather than adjusted — a public repository should not ship invented ratings.
- **Non-existent `twitter:site` handle removed** (`@global_history`).

### Verified for this release

Every claim below was produced by running the command, not by assertion:

| Check | Result |
|---|---|
| `npm install` (repaired lockfile) | exit 0 |
| `npm test` | **154 passed**, 16 files, 0 skipped |
| `npm run build` | exit 0 |
| `npm run test:gate` | **17 passed**, 4 files |
| `MIAODA_BUILD_TARGET=standalone` build | exit 0, single 7,308,509-byte IIFE, no platform hosts |
| Mode C build + strip script | 4 scripts removed, 6 placeholders filled, **107 JS chunks preserved**, no platform hosts |
| Static deployment smoke test | App renders; era counts 10 / 80 / 173 / 246 / 108 / 70 / 76 correct |
| English switcher (real click) | Header switches to Full / Timeline / World Map / Encyclopedia / Special Hall / Theme · Museum |

### Documented limitations (newly disclosed, not newly introduced)

- Console errors on plain static hosts (`Failed to init time offset`, `Error fetching published app info`, `Log export failed: 501`) originate from the platform toolkit requesting endpoints a static host does not provide. **Confirmed non-fatal** — the app renders and functions correctly. Documented in the deployment guide rather than hidden.
- The upstream preset rewrites Google Fonts to a platform mirror by default. The mirror is publicly reachable and functional, but `MIAODA_FONTS_MIRROR_OFF=1` is documented for those who want direct Google Fonts.
- Standalone mode intentionally disables code splitting so output can open from `file://`. The trade-off is now documented instead of surprising people.

## Pre-open-source development history

The application was developed on a hosted app platform from **August 2026**, under a numbered plan of **38 tracked items**. The record below is grouped by theme rather than by build, because the platform's build numbers were not reliable version identifiers.

### Content

- **Added** long-form bodies for every remaining short node. All **763** nodes now have prose; enforced by test.
- **Added** nodes for under-represented civilisations — Africa, Central Asia, the Americas, Oceania — specifically to correct a Europe-weighted first version.
- **Deepened** 20–30 core nodes to long-form treatment.
- **Changed** corpus to its current shape: 2,611,914 Chinese characters across 29 era shards.

### Data integrity

- **Fixed** 39 groups of duplicate-titled nodes, merged.
- **Fixed** 76 orphan nodes by adding relations; **added** a test forbidding regressions.
- **Changed** relation consumption to a single unified path across all views.
- **Verified** 2,396 unique relation pairs, zero dangling references, zero self-loops, zero duplicate ids.

### Correctness

- **Fixed** a P0 failure in which all online history data failed to load.
- **Fixed** P0 bugs and memory leaks; extracted duplicated logic.
- **Changed** year display to one site-wide convention: no decimal points, no `k` abbreviation, thousands separators, bilingual BCE/CE.
- **Fixed** theme switcher overlapping the header's right-side buttons.
- **Fixed** a 10px detail-panel alignment offset.

### Performance

- **Removed** four non-first-screen view chunks from prefetch: **−10.63%** first-screen transfer.
- **Added** shard-level lazy loading for long-form bodies (29 era shards), with secondary splitting to bound shard size.
- **Added** a two-tier gzip size gate (`gzipSync` level 9) with WARN and FAIL thresholds per artefact.
- **Fixed** the gate silently skipping when build artefacts were absent — it now **fails**.
- **Established** the first-screen contract: exactly **23 files** on a clean load, with `MapView` / `ListView` / `SpecialHall` / `empires` / `HistoryProjector` explicitly forbidden.

### Resilience

- **Added** chunk-load self-healing: one automatic retry, then a localized explanation and a manual reload button. Never an infinite refresh loop.

### Accessibility and visual design

- **Changed** all non-circular corner radii to **2px**, enforced at build time by a PostCSS plugin.
- **Raised** hairline and focus-ring contrast across all five themes to **WCAG 3:1**, measured with alpha compositing.
- **Enlarged** touch targets to ≥44×44 by padding, **without** enlarging icons.
- **Removed** all emoji site-wide.
- **Added** five themes: museum, ink, parchment, xuanzhi, bamboo.

### The History Projector (item 38, closed at build 144)

- **Fixed — root cause:** the map container had `z-index: auto`, which does not establish a stacking context. Leaflet's map-pane (`z-index: 400`) escaped and covered the control bar (`z-index: 10`), making **every control including the exit button unclickable**. Fix: `isolation: isolate`.
- **Fixed — root cause:** an ancestor `motion.div` wrote a `transform`, making `position: fixed` resolve against that ancestor rather than the viewport. The overlay was unclickable for **2–4 seconds** after opening. Fix: `createPortal` to `document.body`.
- **Changed** the event stream and top year cursor to be **purely derived from `currentYear`**, removing `AnimatePresence` so no exit animation can retain stale events after a reset.
- **Changed** the map to lock to playback, with full interaction disabled during play.
- **Enlarged** control hit areas to ≥44 (1x button 64×44, civilisation combobox 144×44).
- **Fixed** a prefetch size regression detected during verification (70,952 bytes).

### Bilingual groundwork (three rounds, immediately before open-sourcing)

- **Added** i18n infrastructure: Provider, `useI18n`, `t(key, fallback)` with Chinese fallback so nothing fails silently.
- **Added** `en-US.ts` (**539 leaf keys across 58 groups**), dynamically imported so Chinese-only sessions download zero extra bytes.
- **Added** a header language switcher with portal rendering, overflow flipping, arrow-key navigation, ARIA menu semantics and persisted choice.
- **Added** bilingual year formatting (BCE/CE, thousands separators).
- **Added** `EN_NODE_META` overlay — **133 nodes** with `titleEn` / `summaryEn`. Untranslated nodes are simply absent and fall back at runtime.
- **Added** shard-level bilingual body loading: `loadNodeBodyBilingual(nodeId, lang)` returning `BilingualBodyResult` with an `isFallback` flag, and an explicit **"English version not yet available"** notice in the detail panel.
- **Added** English body shards — **15 nodes, 7,649 English words** (`prehistoric-others` 10 nodes / 4,257 words; `ancient-others` 5 nodes / 3,392 words).
- **Added** `scripts/translation-progress.ts` for regenerating coverage numbers.
- **Added** 17 i18n unit tests (137 → **154** total).
- **Fixed** an unescaped apostrophe in "Punic Wars" and 49 duplicate keys in `en-node-meta.ts`.

---

## Versioning policy from here

- **MAJOR** — breaking changes to the data schema, or a restructuring that invalidates existing forks.
- **MINOR** — new nodes, new views, new themes, new locales, meaningful translation batches.
- **PATCH** — factual corrections, bug fixes, translation fixes, documentation.

Translation progress alone will normally ship as MINOR, and every batch must update [Translation Status](docs/TRANSLATION-STATUS.md) with regenerated numbers.
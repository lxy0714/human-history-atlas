# Human History Atlas

**An interactive, museum-style atlas of human civilisation — 763 historical nodes across seven eras, explored through timeline, satellite map, encyclopedia and themed halls.**

[简体中文](README.zh-CN.md) · **English**

[Product Overview](docs/PRODUCT.md) · [Deployment](docs/DEPLOYMENT.md) · [Customization](docs/CUSTOMIZATION.md) · [Sources & Inspiration](docs/SOURCES-AND-INSPIRATION.md) · [Changelog](CHANGELOG.md) · [Translation Status](docs/TRANSLATION-STATUS.md)

---

> ### ⚠️ Read this first: the interface is bilingual, the corpus is not
>
> Chinese is complete. In English, **the four main views are browser-verified to contain no Chinese, and every node title, summary, year and taxonomy label is translated**; the long-form articles are not, and ship with an explicit fallback. Nothing is silently machine-translated or faked.
>
> Scope note: the 27 sub-applications inside Special Hall and the long-form area of the detail panel have not each had the same measurement.
>
> | Layer | Chinese | English |
> |---|---|---|
> | Visible copy, four main views | 100% | **no Chinese** (browser-verified; only the `史` brand mark remains) |
> | UI dictionary | 100% | **580 keys, none missing** (test-locked) |
> | Year display strings | 763 nodes | **763 / 763 — 100%** (test-locked) |
> | Empire names / capitals | 37 / 33 | **37 / 37 · 33 / 33 — 100%** |
> | Special Hall cards | 27 | **27 / 27 — 100%** |
> | Node titles & summaries | 763 nodes | **763 / 763 — 100%** |
> | Era / category / civilisation names | 23 | **23 / 23 — 100%** |
> | Long-form article bodies | ~810,738 characters | 15 / 763 nodes; remainder falls back to Chinese **with a visible notice** |
>
> See [Translation Status](docs/TRANSLATION-STATUS.md) for the exact, regenerable numbers and the roadmap. If you switch to English and see Chinese text inside an article, that is the documented fallback, not a bug.

---

## What this is

Human History Atlas is a **read-only interactive history encyclopedia**. It is not a CMS, not a wiki, and has no backend: every byte of content ships as typed TypeScript data, and the whole thing builds to static files you can host anywhere.

It was built around one idea: **history is better understood as a shape than as a list.** Dates alone tell you nothing about simultaneity — that the Han dynasty and the Roman Empire rose and fell in parallel, that the Maya were building cities while Europe was in its medieval period. So the same 763 nodes can be read four different ways, and the connections between them are first-class data rather than afterthoughts.

### Four ways to read the same corpus

| View | What it is for |
|---|---|
| **Timeline** | Chronological reading, era by era, with a scrollable spine and per-node cards |
| **World Map** | Geographic reading over Esri satellite imagery — 483 positioned markers, drag and zoom freely |
| **Encyclopedia List** | Search-and-filter reading, by civilization, category, era and keyword |
| **Special Halls** | Curated cross-cutting exhibitions (empires, cities, daily life, glossary, learning paths, and more) |

### Features

- **763 nodes, all with long-form articles.** Distribution: Prehistoric 10 · Ancient 80 · Classical 173 · Medieval 246 · Early Modern 108 · Industrial 70 · Modern 76.
- **Ten civilizations**, deliberately including the ones most timelines skip: China 270 · Europe 226 · Americas 50 · Middle East 47 · Africa 46 · East Asia 39 · Global 25 · Central Asia 23 · South Asia 22 · Oceania 15.
- **2,396 unique relation pairs** between nodes — typed relations plus explicit cross-references, deduplicated. No orphan nodes, no dangling references, no self-loops.
- **History Projector** — a full-screen playback mode that advances a year cursor from 3,000,000 BCE to the present, accumulating a running log of significant events on the map. The map is locked to the playback; every control is keyboard- and touch-reachable.
- **Five themes**, each a deliberate reading environment rather than a colour swap: Museum (dark wood), Ink (OLED black-gold), Parchment (warm antique), Xuanzhi (plain white for long reading), Bamboo (green-black Han slips).
- **Vertical classical layout** — a right-to-left vertical reading mode for the Chinese corpus, in the manner of thread-bound books.
- **Civilization swimlanes**, quiz with achievements, learning paths, glossary, city histories, daily-life essays, empire comparison.
- **Bilingual interface** with persistent language choice and honest content fallback (see the notice above).
- **Accessible by measurement, not by claim**: every theme's hairlines and header borders meet WCAG 3:1; mobile tap targets are ≥44×44; the theme and language menus are full `role=menu` implementations with arrow-key, Home/End and layered Escape handling.

### Engineering characteristics

This project treats performance and correctness as features, and gates them in CI:

- **Layered data loading.** A lightweight index loads first; article bodies are split into 29 era shards and fetched on demand; a second level of splitting keeps any single shard bounded.
- **First-screen budget enforced by tests.** A clean load fetches **23 files**; the four heaviest non-first-screen chunks are explicitly forbidden from the first screen and a test fails if they appear.
- **Two-tier gzip gates.** Every budget has a WARN and a FAIL threshold, measured with `gzipSync(level 9)`. Missing build artifacts **fail** the gate rather than silently skipping it.
- **Chunk-load self-healing.** If a lazily loaded shard fails (typically mid-deploy), the app retries once automatically, then shows a localized explanation with a manual reload button — never an infinite reload loop.
- **Shape language enforced at build time.** A PostCSS plugin rewrites every non-circular border radius above 2px to 2px, so the square, exhibition-label aesthetic cannot silently drift.
- **154 unit tests + 17 gate tests**, zero skipped.

## Quick start

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
npm run dev
```

Then open the address the dev server prints.

```bash
npm run build      # static output
npm test           # 154 unit tests
npm run test:gate  # 17 build-artifact / budget gates
npm run lint       # typecheck + eslint
```

**Requirements:** Node.js 20 or newer (developed on Node 22), npm 10+.

Full instructions, static hosting, sub-path deployment and troubleshooting: **[Deployment Guide](docs/DEPLOYMENT.md)**.

## Repository layout

```
src/
├── data/                  # the entire corpus, as typed TS
│   ├── history.ts             # full node definitions + types
│   ├── history-index.ts       # generated lightweight index (first screen)
│   ├── bodies/shards/         # 29 long-form article shards (lazy)
│   ├── empires.ts, city-history.ts, daily-life.ts, glossary.ts, ...
│   └── *.test.ts              # data integrity tests
├── i18n/                  # zh-CN.ts, en-US.ts (English loaded on demand)
├── pages/HomePage/        # the four views, detail panel, projector
├── components/ui/         # shadcn/ui primitives
├── lib/                   # loaders, storage, theme, formatting
└── index.css              # theme variables for all five themes
scripts/                   # build, shard generation, measurement, gates
docs/                      # the bilingual documentation you are reading
```

## Documentation

Every document exists in both languages.

| Document | English | 中文 |
|---|---|---|
| Product overview | [PRODUCT.md](docs/PRODUCT.md) | [简体中文](docs/PRODUCT.zh-CN.md) |
| About this project | [ABOUT.md](docs/ABOUT.md) | [简体中文](docs/ABOUT.zh-CN.md) |
| Sources & inspiration | [SOURCES-AND-INSPIRATION.md](docs/SOURCES-AND-INSPIRATION.md) | [简体中文](docs/SOURCES-AND-INSPIRATION.zh-CN.md) |
| Architecture | [ARCHITECTURE.md](docs/ARCHITECTURE.md) | [简体中文](docs/ARCHITECTURE.zh-CN.md) |
| Data format | [DATA-FORMAT.md](docs/DATA-FORMAT.md) | [简体中文](docs/DATA-FORMAT.zh-CN.md) |
| Deployment guide | [DEPLOYMENT.md](docs/DEPLOYMENT.md) | [简体中文](docs/DEPLOYMENT.zh-CN.md) |
| Customization guide | [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) | [简体中文](docs/CUSTOMIZATION.zh-CN.md) |
| Contributing | [CONTRIBUTING.md](docs/CONTRIBUTING.md) | [简体中文](docs/CONTRIBUTING.zh-CN.md) |
| Translation status & roadmap | [TRANSLATION-STATUS.md](docs/TRANSLATION-STATUS.md) | [简体中文](docs/TRANSLATION-STATUS.zh-CN.md) |
| Third-party notices | [THIRD-PARTY-NOTICES.md](docs/THIRD-PARTY-NOTICES.md) | [简体中文](docs/THIRD-PARTY-NOTICES.zh-CN.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) | [简体中文](CHANGELOG.zh-CN.md) |

## Licensing

This repository is **dual-licensed**, because code and prose are different kinds of work:

- **Code** — [MIT](LICENSE). Use it, fork it, sell it, just keep the notice.
- **Historical content** (everything under `src/data/` that is prose: articles, summaries, glossary, essays) — [CC BY-SA 4.0](LICENSE-CONTENT). Attribution required; derivatives must carry the same licence.
- **Third-party assets are not covered by either.** Esri satellite tiles and Google-hosted fonts remain under their own terms. See [Third-Party Notices](docs/THIRD-PARTY-NOTICES.md) before you deploy publicly or commercially.

## Contributing

Contributions are welcome — especially **English translations**, which are the largest outstanding gap, and **historical corrections**, which matter more than anything else in a history project.

Please read [Contributing](docs/CONTRIBUTING.md) first. Corrections to historical facts should cite a source; the corpus is AI-assisted writing over established historical consensus, not a transcription of any single reference work, and it can be wrong.

## Honest limitations

- English coverage is partial, as detailed at the top of this file.
- The corpus is **AI-assisted writing**. Facts follow mainstream historical consensus, but wording, emphasis and selection are machine-generated and human-reviewed only in part. Treat it as a study aid, not a citable authority. See [Sources & Inspiration](docs/SOURCES-AND-INSPIRATION.md).
- Satellite imagery requires network access and is subject to Esri's terms; the map is not usable offline.
- No backend, no accounts, no cross-device sync. Reading position, theme and language persist in the current browser only.
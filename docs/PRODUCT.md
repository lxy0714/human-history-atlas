# Product Introduction

**English** · [简体中文](PRODUCT.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

## 1. The problem this product solves

Most ways of consuming history on a screen share one flaw: **they flatten time into a list.**

A textbook gives you chapters. A wiki gives you an article per topic. A video gives you a narrative. All three are excellent at depth and terrible at *simultaneity*. They cannot answer, at a glance:

- What else was happening on Earth in the year the Qin unified China?
- Was the Maya collapse before or after the Norman Conquest?
- Which civilisations were at their peak at the same moment — and did they know about each other?

Those are not trivia questions. Simultaneity is the backbone of historical understanding: it is what turns "the Roman Empire fell" into "the western half of the Roman Empire fragmented while the eastern half continued for another thousand years, and while Tang China was the largest polity on the planet."

Human History Atlas is built to make that structure **visible and manipulable**.

## 2. What it is

A **display-only interactive history atlas**. Concretely:

- **763 historical nodes**, each with a long-form article. Not stubs — the corpus is 2.61 million Chinese characters of prose.
- **Four views over one dataset.** You are never looking at different content; you are looking at the same content through different lenses.
- **Relations as first-class data.** 2,396 unique node pairs, typed and bidirectional, so "what connects to this" is a query, not a guess.
- **No backend.** Everything ships as typed TypeScript. The whole thing compiles to static files.

### What it deliberately is not

| Not this | Why |
|---|---|
| A wiki | No editing UI, no accounts, no revision history. Content is code, reviewed via pull requests. |
| A CMS | No database, no admin panel. This keeps deployment trivial and the content versioned. |
| An authoritative reference | The corpus is AI-assisted writing over mainstream consensus. See [Sources & Inspiration](SOURCES-AND-INSPIRATION.md). |
| A course | Learning paths exist, but there is no grading, no cohort, no progression lock. |

## 3. The four views

### 3.1 Timeline — reading in sequence

The default view. A vertical spine with era bands; nodes hang off it as cards showing year, civilisation badge, categories and summary.

- **Era grouping** with sticky era headers, so you always know where you are in 3 million years.
- **Filter by civilisation, category, era, keyword** — filters compose.
- **Click any node** to open the detail panel with the full article.
- **Jump navigation** to move between eras without scrolling through everything.

Best for: first-time reading, chronological study, "walk me through the Bronze Age".

### 3.2 World Map — reading in space

The same nodes plotted on **Esri satellite imagery** via Leaflet — 483 geolocated markers.

- **Free pan and zoom**, no artificial bounds. You can zoom to a single site or out to the whole planet.
- **Era filtering** so the map shows one period at a time instead of 3 million years of overlap.
- **Marker styling by civilisation**, with a legend.
- **Click a marker** → same detail panel as the timeline.

Best for: understanding geography as cause. Why Mesopotamia and Egypt both sit on rivers; why the Steppe empires look the way they do; how far the Polynesian expansion actually reached.

> Requires network access. Map tiles come from Esri and are subject to their terms — see [Third-Party Notices](THIRD-PARTY-NOTICES.md).

### 3.3 Encyclopedia List — reading by query

A dense, searchable list. Same filters as the timeline, but optimised for scanning rather than narrative flow.

Best for: lookup. "Show me everything tagged `military` in `medieval` for `middleEast`."

### 3.4 Special Hall — reading across time

Curated exhibitions that cut *across* eras instead of following them. Each is its own dataset and its own layout:

| Exhibition | What it does |
|---|---|
| **Empires** | Rise-and-fall spans of major polities, comparable on one axis |
| **Empire Comparison** | Side-by-side structural comparison of selected empires |
| **City History** | Individual cities traced across their whole existence |
| **Daily Life** | What ordinary people ate, wore, worked at and feared, period by period |
| **Glossary** | Terms, concepts and vocabulary with definitions |
| **Learning Paths** | Sequenced reading routes through the corpus |
| **Quiz & Achievements** | Self-testing, including short-answer questions, with an achievement system |

Best for: thematic study, and for breaking out of the tyranny of chronology.

## 4. Signature features

### 4.1 The History Projector

A full-screen presentation mode. A year cursor advances from **3,000,000 BCE to the present**, and as it moves:

- the map shows what existed at that moment;
- an event log accumulates significant events in step with the cursor;
- playback can be paused, scrubbed, sped up or reset.

Design constraints that are enforced by tests, not just intended:

- The map is **locked to playback** — user panning cannot desynchronise it from the cursor.
- The event log and the year readout are **purely derived from `currentYear`**. There is no exit-animation layer that can hold stale events on screen after a reset.
- Every control has a **≥44×44 px hit area**, so it works on a phone.
- The overlay is portalled to `document.body`, so no ancestor transform can trap it or delay its interactivity.

Best for: teaching, screen recording, and the simple pleasure of watching 3 million years go by.

### 4.2 Five themes, five reading environments

These are not colour swaps. Each is a deliberate reading context, and each was contrast-measured:

| Theme | Character | Use case |
|---|---|---|
| **Museum** | Dark wood vitrine, warm gold | Default. Evening reading, exhibition feel |
| **Ink** | OLED black and gold | Night, OLED screens, maximum contrast |
| **Parchment** | Warm aged paper | Long-form reading, low eye strain in daylight |
| **Xuanzhi** | Plain white rice paper | Cleanest long read, print-like |
| **Bamboo** | Blue-green ink on bamboo slip | Classical Chinese aesthetic |

All five pass **WCAG 3:1** on hairlines, focus rings and the header border — measured with alpha compositing, not eyeballed.

### 4.3 Vertical classical reading

A right-to-left, top-to-bottom vertical text mode for Chinese content, styled after thread-bound books. This is a genuine layout mode, not a CSS rotation trick.

### 4.4 Civilisation swimlanes

Parallel horizontal lanes, one per civilisation, sharing a time axis. This is the most direct answer to the simultaneity problem in §1: you see ten civilisations breathing at once.

### 4.5 Bilingual interface

Chinese and English, switchable from the header, persisted per browser. English content falls back to Chinese **with an explicit on-screen notice** wherever a translation does not yet exist.

> **Coverage is incomplete.** See [Translation Status](TRANSLATION-STATUS.md) for exact numbers.

## 5. Who it is for

- **Students** who need the shape of a period before the details will stick.
- **Teachers** who want a projector mode and a map instead of a slide deck.
- **Writers and game designers** doing period research and needing fast cross-civilisation context.
- **The generally curious** — the corpus is written to be read, not indexed.
- **Developers** who want a substantial, well-tested React + Vite codebase with real performance gates to study or fork.

## 6. Content scope, precisely

**By era**

| Era | Span | Nodes |
|---|---|---|
| Prehistoric | 3,000,000 BCE – 4000 BCE | 10 |
| Ancient Civilisations | 4000 BCE – 500 BCE | 80 |
| Classical | 500 BCE – 500 CE | 173 |
| Medieval | 500 – 1500 | 246 |
| Early Modern | 1500 – 1800 | 108 |
| Industrial | 1800 – 1945 | 70 |
| Modern | 1945 – present | 76 |

**By civilisation**

China 270 · Europe 226 · Americas 50 · Middle East 47 · Africa 46 · East Asia (other) 39 · Global 25 · Central Asia 23 · South Asia 22 · Oceania 15.

The distribution is intentionally not Europe-weighted. Africa, Central Asia, the Americas and Oceania were specifically expanded during development because a timeline that skips them is not a human timeline.

**Other counts:** 576 nodes flagged `important` · 763 nodes with a long-form body (100%) · 2,396 unique relation pairs · 483 map markers.

## 7. Product principles

1. **Structure before detail.** Every view exists to reveal a relationship, not to display a record.
2. **No silent failure.** Missing translation, failed chunk load, unreadable build artefacts — each surfaces visibly and is handled, never papered over.
3. **Performance is a feature with a test.** A first-screen budget that is not enforced by CI is a wish. Ours fails the build.
4. **Honesty about provenance.** The corpus states plainly that it is AI-assisted and may contain errors. A history product that hides its sourcing is worse than useless.
5. **Reachability.** 44px touch targets, keyboard-navigable menus, measured contrast, mobile bottom tabs. Accessibility is verified, not asserted.

## 8. Current limitations

Stated plainly, because a product page that only lists strengths is marketing:

- **English is incomplete.** UI partially translated; 133/763 nodes have English metadata; 15/763 nodes have English bodies. Everything else falls back to Chinese with a notice.
- **AI-assisted corpus.** Follows mainstream consensus but is not peer-reviewed and may contain errors. Do not cite it as an authority.
- **Map needs network.** No offline tiles.
- **No sync.** Reading position, theme and language live in this browser only.
- **No user accounts, no comments, no annotations.** By design.

---

Next: [Architecture](ARCHITECTURE.md) · [Deployment](DEPLOYMENT.md) · [Customization](CUSTOMIZATION.md)
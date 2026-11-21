# About This Project

**English** · [简体中文](ABOUT.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

## What this is

Human History Atlas (人类文明时间地图, also titled 全球历史全景 in the interface) is an interactive, museum-styled atlas of human history: **763 nodes across seven eras and ten civilisations**, readable as a timeline, a satellite map, an encyclopedia list, or a set of curated exhibitions.

It is a single-page static application. No backend, no database, no accounts. The entire 2.61-million-character corpus ships as typed TypeScript and compiles to files you can host anywhere.

- **Author:** 吕祥宇 ([@lxy0714](https://github.com/lxy0714))
- **Repository:** <https://github.com/lxy0714/human-history-atlas>
- **Licences:** code [MIT](../LICENSE), content [CC BY-SA 4.0](../LICENSE-CONTENT)
- **Started:** August 2026
- **Open-sourced:** November 2026

## Why it exists

The project began from a specific frustration: **every digital history resource I used was good at depth and bad at simultaneity.**

You can read a superb article about the Han dynasty and a superb article about the Roman Empire and still have no felt sense that they were contemporaries — that they were the two largest polities on the planet at the same time, at opposite ends of a continent, largely unaware of each other's scale. Encyclopedias give you nodes. History is edges.

So the founding constraint was: **relations are data, not decoration.** Every node must connect to something. Every connection must be typed and traversable. That constraint is now enforced by a test that fails the build if a single orphan node appears.

The second constraint was **coverage honesty**. It is easy to build a "world history" timeline that is 70% Europe. The ten-civilisation split — with Africa, Central Asia, the Americas and Oceania deliberately expanded — was a correction applied after the first version, because the first version had exactly that problem.

## How it was built

This project was developed through a long, iterative process with an AI coding agent, under a numbered development plan that eventually ran to **38 tracked items**. That process is worth describing honestly, because it shaped the codebase's most distinctive feature.

### The plan covered, among others

- **Content expansion** — filling gaps in under-represented civilisations; deepening core nodes to long-form; completing every remaining short node.
- **Data integrity** — deduplicating 39 groups of same-titled nodes; unifying how relations are consumed; finding and connecting 76 orphan nodes; fixing dangling references.
- **Correctness** — P0 bugs and memory leaks; a total failure of online history data loading; year-display inconsistencies across the site.
- **Performance** — removing four non-first-screen chunks from prefetch (−10.63%); splitting long-form bodies into 29 era shards; establishing a two-tier gzip budget gate.
- **Accessibility and visual verification** — measured contrast across five themes; ≥44px touch targets; multi-width visual checks at five breakpoints.
- **The History Projector** — the last and hardest item, closed at build 144.

### What that process taught, and what it left behind

The most useful thing to know about this codebase: **its tests exist because claims kept turning out to be false.**

Repeatedly during development, a fix was reported as complete and measurement showed it was not. A gate was reported as passing and turned out to be silently skipping. A build number was reported and was consistently off by two. The response was not to trust harder — it was to make every claimed property **mechanically checkable**:

- The bundle gate **fails** when it cannot read build artefacts, rather than passing quietly.
- The first-screen test asserts an exact file count (**23**) and explicitly forbids the four heaviest non-first-screen chunks.
- Data-integrity tests assert zero orphans, zero dangling relations, zero self-loops, zero duplicate ids.
- The projector's event stream is **purely derived** from `currentYear`, so no animation layer can hold stale state after a reset.

If you fork this project, that discipline is the part most worth keeping.

### Two bugs worth recording

Both were root-caused rather than patched, and both must not regress:

1. **Every projector control was unclickable.** Not a z-index typo — the map container had `z-index: auto`, which does not establish a stacking context, so Leaflet's map-pane (`z-index: 400`) escaped and covered the control bar (`z-index: 10`). Fix: `isolation: isolate` on the container.
2. **The projector was unclickable for 2–4 seconds after opening.** An ancestor `motion.div` wrote a `transform`, which makes `position: fixed` resolve against that ancestor instead of the viewport. Fix: `createPortal` the overlay to `document.body`.

Neither is obvious from the symptom. Both are documented in [Customization §6](CUSTOMIZATION.md) so a future contributor does not undo them.

## Current state, honestly

**What works and is verified:**

- 763 nodes, all with long-form bodies; 2,396 unique relation pairs; 483 map markers.
- Four views, five themes, vertical classical reading, swimlanes, special halls, quiz and achievements.
- The History Projector, with locked map playback and reachable controls.
- **154 unit tests and 17 build gates, all passing**, verified by running them.
- Clean install, build and static deployment, verified end-to-end including a browser check.

**What is incomplete:**

- **Bilingual coverage.** The interface is partially translated; 133/763 nodes have English metadata; 15/763 nodes have English bodies. Everything else falls back to Chinese with an explicit notice. The user's goal is full bilingual coverage including the corpus — that is a long-term effort, not a finished feature. See [Translation Status](TRANSLATION-STATUS.md).
- **Corpus accuracy.** AI-assisted writing, partially reviewed. Errors exist. See [Sources & Inspiration](SOURCES-AND-INSPIRATION.md).
- **One shard near its size ceiling** (`medieval-china-a`, 666 bytes of headroom). Splitting it is outstanding work.
- **A site-wide sub-44px touch-target audit on mobile** has not been completed.
- **`document.documentElement.lang` does not update** when the interface language switches — observed during verification, a real accessibility defect, still open.

These are listed because a project page that only lists strengths is marketing, and this is not marketing.

## Why open source

Three reasons:

1. **A history corpus should be correctable.** Closed content accumulates errors silently. An open repo turns every factual mistake into an issue someone can file with a source.
2. **The engineering is reusable.** Content-as-code, enforced performance gates, shard-level lazy loading with graceful fallback, and a bilingual overlay pattern that degrades honestly — these work for any dated, categorised corpus, not just history.
3. **The bilingual gap is too large for one person.** 2.61 million characters will not be translated by a single author in any reasonable timeframe. It needs contributors.

## How to get involved

- **Translate.** The largest gap. Start with [Translation Status](TRANSLATION-STATUS.md) and [Customization §5](CUSTOMIZATION.md).
- **Correct facts.** The most valuable contribution. Bring a source.
- **Fork it.** Change the subject entirely — art history, a fictional world, a company timeline. The views are subject-agnostic. See [Customization §7](CUSTOMIZATION.md).
- **Report bugs.** Especially accessibility and mobile ones.

Read [Contributing](CONTRIBUTING.md) first.

## Contact

Issues and pull requests on [the repository](https://github.com/lxy0714/human-history-atlas) are the intended channel. There is no mailing list, no Discord and no support address — this is a personal project, maintained as time allows.

---

Next: [Product Introduction](PRODUCT.md) · [Sources & Inspiration](SOURCES-AND-INSPIRATION.md) · [Changelog](../CHANGELOG.md)
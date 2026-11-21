# Contributing

**English** · [简体中文](CONTRIBUTING.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

Contributions are welcome. This page tells you what kind are most useful, how to make them, and what will get a pull request rejected.

## 1. What this project needs most

In priority order:

1. **English translation.** The largest gap by far. 630 of 763 nodes have no English metadata; 748 have no English body. See [Translation Status](TRANSLATION-STATUS.md).
2. **Factual corrections.** In a history project this outranks everything else in importance, even if it is second in volume. Bring a source.
3. **Accessibility fixes.** Known open defects are listed in the changelog. Mobile touch-target auditing is unfinished.
4. **Bug reports with reproduction steps.** Especially ones that only appear at a specific viewport or in a specific theme.
5. **Documentation improvements** in either language.

What the project does **not** need: a rewrite in a different framework, a new state-management library, a database backend, or a redesign. Those are not gaps; they are choices.

## 2. Before you start

```bash
git clone https://github.com/lxy0714/human-history-atlas.git
cd human-history-atlas
npm install
npm test           # must show 154 passed before you change anything
npm run build
npm run test:gate  # must show 17 passed
```

If any of these fail on a clean checkout, **that is a bug — file it** before working around it. See the [Deployment Guide](DEPLOYMENT.md) for known install issues.

## 3. Contribution types

### 3.1 Factual correction

**This is the most valuable thing you can do.** The corpus is AI-assisted writing and contains errors. See [Sources & Inspiration](SOURCES-AND-INSPIRATION.md).

Use the **Factual correction** issue template, or open a PR directly. Either way you must provide:

| Required | Example |
|---|---|
| Node id | `qin-unification` |
| Current text | the exact sentence as it appears |
| Corrected text | your replacement |
| **Source** | a scholarly work, primary document, archaeological report, or institutional publication |
| Why the source is authoritative | one sentence |

**What does not count as a source:** another encyclopedia, another AI's output, an unsourced blog post, or "everyone knows". If scholarship genuinely disagrees, say so and cite both positions — the fix may be to add hedging rather than to change a date.

Corrections with sources get merged. Corrections without them get discussed. The project would rather be corrected than defended.

### 3.2 Translation

Read [Customization §5](CUSTOMIZATION.md) for the exact mechanics. Summary:

- **UI strings** → add the key to both `zh-CN.ts` and `en-US.ts`, then use `t('group.key', '中文fallback')`. Always pass the fallback.
- **Node title/summary** → add an entry to `src/data/i18n/en-node-meta.ts`.
- **Node body** → add to a shard under `src/data/bodies/en/shards/`, then register it in `en-shard-body-map.ts`.

Rules:

- Use standard English renderings for personal and place names (Qin Shi Huang, not Qinshihuang; Mesopotamia, not Mesopotamiya).
- **Do not add or remove historical information** while translating. Translation is not editing. If you spot a factual error mid-translation, file it separately.
- **Do not machine-translate a whole shard and submit it unreviewed.** The project already has machine-generated content; what it needs from contributors is *reviewed* content. If you use MT as a draft, say so in the PR and confirm you reviewed every sentence.
- **Never add empty or placeholder entries** to make coverage numbers look better. Absent entries fall back honestly; fake entries lie.
- **Do not remove the "English version not yet available" notice.** It is a feature.

Batch size: a PR covering one shard or one era is ideal. A PR touching 200 nodes will be asked to split.

### 3.3 Code

- Match the existing style. `npm run lint` must pass.
- **Do not weaken a gate to make your change pass.** If the size gate fails, your change is too big — split a shard, do not raise the threshold.
- **Do not add a dependency** without discussing it first. The bundle budget is real.
- Add or update tests for behaviour changes. The suite is at 154; it should not go down.
- Keep the two documented projector fixes intact: `isolation: isolate` on the map container, and `createPortal` to `document.body` for the overlay. See [Customization §6](CUSTOMIZATION.md).

### 3.4 Documentation

Every doc has an English and a Chinese counterpart. **If you change one, change both**, or state clearly in the PR that the counterpart is pending. A doc pair that has drifted is worse than a missing doc.

The two versions should be *equivalent*, not word-for-word identical. Idiomatic Chinese and idiomatic English are the goal.

## 4. Pull request checklist

- [ ] `npm run lint` passes
- [ ] `npm test` passes, count ≥ 154
- [ ] `npm run build` exits 0
- [ ] `npm run test:gate` passes, 17 gates
- [ ] If you edited `history.ts`, you regenerated the index (`npx tsx scripts/generate-body-shards.mts`) and committed the result
- [ ] If you added a node: unique id, valid `eraId`, valid `civilization`, at least one relation, body present
- [ ] If you translated: no placeholder entries, fallback notice intact, coverage numbers regenerated
- [ ] If you changed a doc: both language versions updated
- [ ] You looked at it in a browser at 1280px **and** 390px, in two themes, in both languages
- [ ] If you touched the projector: exit button responds to a **real click** immediately after opening

That last item matters more than it looks. Programmatic `.click()` bypasses hit-testing and will pass on an overlay a human cannot actually click. This project shipped that exact bug once.

## 5. Commit messages

Conventional commits:

```
feat(data): add 12 Oceanic nodes for the medieval era
fix(projector): restore isolation on map container
docs(deployment): document standalone single-chunk trade-off
i18n(en): translate ancient-others shard (5 nodes)
fix(data): correct founding date of Carthage, with source
```

Types: `feat`, `fix`, `docs`, `i18n`, `test`, `refactor`, `perf`, `chore`.

For factual corrections, put the source in the commit body.

## 6. Review expectations

This is a personal project maintained as time allows. There is no SLA. A PR may sit for a while. That is not rejection.

What gets a PR rejected quickly:

- Weakened gates or deleted tests
- Unreviewed machine translation presented as human work
- Factual changes without sources
- Fabricated data (invented ratings, invented counts, placeholder translations)
- Emoji reintroduced
- Non-circular corner radii other than 2px
- Scope creep — a translation PR that also refactors the loader

## 7. Reporting bugs

Use the **Bug report** template. Include:

- What you did, what you expected, what happened
- Viewport width and theme
- Language (zh / en)
- Browser and OS
- Console output
- Whether it reproduces on a clean reload

For visual bugs, a screenshot is worth more than a paragraph.

## 8. Code of conduct

Be direct about the work and decent to the person. Historical disagreement is welcome and expected — this corpus covers contested ground and reasonable people read it differently. Argue with evidence.

Harassment, personal attacks, and discrimination are not tolerated in any form. Maintainers may close or lock threads that cross that line.

## 9. Licensing of contributions

By submitting a contribution you agree that:

- **Code** contributions are licensed under [MIT](../LICENSE).
- **Content and translation** contributions are licensed under [CC BY-SA 4.0](../LICENSE-CONTENT).

You must have the right to submit what you submit. **Do not paste text from a copyrighted book, a paywalled article, or another encyclopedia.** Facts are not copyrightable; someone else's prose is.

---

Next: [Translation Status](TRANSLATION-STATUS.md) · [Customization](CUSTOMIZATION.md) · [Sources & Inspiration](SOURCES-AND-INSPIRATION.md)
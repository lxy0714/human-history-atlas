# Customization Guide

**English** · [简体中文](CUSTOMIZATION.zh-CN.md)

Human History Atlas · [Back to README](../README.md)

---

This guide is for people who want to **make this project their own**: change the content, change the look, add a language, or strip it down to a different subject entirely.

Every recipe below names the exact file to edit and the command that verifies the change. Read [Data Format](DATA-FORMAT.md) first if you plan to touch content.

## 1. Golden rules before you edit anything

1. **`src/data/history-index.ts` is AUTO-GENERATED.** Its header says so. Never hand-edit it — your change will be destroyed on the next regeneration. Edit `src/data/history.ts`, then regenerate (§2.4).
2. **Run the gates after every content change.** `npm test && npm run build && npm run test:gate`. The data-integrity tests catch dangling relations, orphan nodes and duplicate ids; the bundle gates catch size regressions. They exist because this corpus broke in exactly those ways during development.
3. **One shard is already near its ceiling.** `medieval-china-a` measures **109,334 bytes gzip** against a 110,000 soft limit — **666 bytes of headroom (0.61%)**. Adding prose to a node in that shard will trip the gate. Split the shard instead of raising the threshold (§2.5).
4. **Do not weaken a gate to make your change pass.** If a gate fails, your change is too big or wrong-shaped. That is the gate doing its job.

## 2. Editing historical content

### 2.1 Change a node's title, year, summary or relations

Edit `src/data/history.ts`. Find the node by its `id`.

```ts
{
  id: 'qin-unification',
  title: '秦统一六国',
  year: -221,
  yearDisplay: '前221年',
  civilization: 'china',
  categories: ['dynasty', 'event'],
  type: 'event',
  eraId: 'classical',
  location: { lat: 34.34, lng: 108.94 },
  summary: '…',
  relatedNodeIds: ['…'],
  important: true,
}
```

Field meanings are in [Data Format](DATA-FORMAT.md).

Then:

```bash
npm run build && npm test
```

### 2.2 Change a node's long-form body

Bodies do **not** live in `history.ts`. They live in shards under `src/data/bodies/shards/`, keyed by node id. Find which shard holds your node:

```bash
grep -rl "'your-node-id'" src/data/bodies/shards/
```

Edit the prose there. Bodies are plain strings (with light markup), so this is the easiest kind of contribution.

### 2.3 Add a brand-new node

1. Add the node object to `src/data/history.ts`.
2. Give it a unique `id` (kebab-case, ASCII).
3. Set `eraId` to one of the seven valid ids, and `civilization` to one of the ten valid keys.
4. Add at least one entry to `relatedNodeIds` — **orphan nodes fail the integrity tests**.
5. Add its body to the appropriate shard.
6. Regenerate the index (§2.4) and run the gates.

If the node has coordinates it will appear on the map automatically. If it has `important: true` it will appear in the History Projector event stream.

### 2.4 Regenerate the index and shards

```bash
npx tsx scripts/generate-body-shards.mts
```

This rewrites `src/data/history-index.ts` and the shard assignment. Commit the regenerated files together with your source edit — they are checked in, not built at deploy time.

### 2.5 Split an oversized shard

When a shard trips the size gate:

1. Create a sibling shard file, e.g. `medieval-china-b.ts`, exporting `BODY_MAP`.
2. Move a coherent block of nodes into it (keep dynasties/periods together — do not split mid-topic).
3. Register the new shard in the loader's shard map.
4. Regenerate (§2.4) and re-run the gate.

**Do not raise the threshold.** The thresholds encode a real first-screen budget.

## 3. Changing the look

### 3.1 The five themes

Theme tokens live in `src/index.css` as CSS custom properties, one block per theme:

| Key | Name | Character |
|---|---|---|
| `museum` | 博物馆 | Dark wood vitrine, warm gold (default) |
| `ink` | 墨夜 | OLED black and gold |
| `parchment` | 羊皮纸 | Warm aged paper |
| `xuanzhi` | 宣纸 | Plain white rice paper |
| `bamboo` | 竹简 | Blue-green ink on bamboo |

To retune a theme, edit its variable block. To add a sixth, copy a block, give it a new key, and register it in the theme switcher's list.

**Constraint you must keep:** hairlines, focus rings and the header border must reach **WCAG 3:1** against their background in *every* theme. When a colour is semi-transparent, composite it over the actual background before computing the ratio — measuring the raw rgba value gives a wrong answer.

### 3.2 Typography

`src/index.css` and `src/typography.css` define:

```css
--font-display: 'ZCOOL XiaoWei', serif;   /* headings */
--font-sans:    'Noto Sans SC', sans-serif;
--font-serif:   'Noto Serif SC', serif;
```

Body text is 13px and labels 10px by deliberate design — this is a dense reference interface, not a blog. If you change these, re-check the mobile layouts.

### 3.3 The 2px shape language

All non-circular corners are forced to **2px** by a PostCSS plugin (`postcss-radius-normalize.cjs`). Writing `rounded-lg` in a component will not survive the build. This is intentional: the visual identity is museum labels and hairlines, not soft cards.

Circular elements (`50%`, `999px`, `9999px`) are exempt.

To relax it, edit the plugin — but understand you are changing the product's identity, not fixing a bug.

### 3.4 Icons and emoji

The project uses `lucide-react`. **Emoji were deliberately removed site-wide.** Do not reintroduce them.

Hit areas were enlarged to ≥44×44 **without enlarging the icons themselves** — padding, not scale. Keep that distinction.

## 4. Fonts

Fonts are loaded from Google Fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
```

**To self-host** (recommended for China-mainland deployments, offline use, or privacy):

1. Download the three families' WOFF2 files.
2. Put them in `public/fonts/`.
3. Replace the `<link>` with local `@font-face` rules in `src/index.css`.
4. Build with `MIAODA_FONTS_MIRROR_OFF=1` so the preset does not rewrite your URLs.

Note that Noto Sans SC and Noto Serif SC are large CJK families. Subset them to the characters you actually use, or accept a multi-megabyte font payload.

Licensing: both Noto families and ZCOOL XiaoWei are open-licensed; see [Third-Party Notices](THIRD-PARTY-NOTICES.md).

## 5. Adding or completing a translation

This is the **highest-value contribution** the project can receive. See [Translation Status](TRANSLATION-STATUS.md) for what is missing.

### 5.1 How the i18n system works

```
src/i18n/
├── index.tsx      # Provider + useI18n hook + t(key, fallback)
├── zh-CN.ts       # Chinese dictionary (source of truth)
├── en-US.ts       # English dictionary, dynamically imported
├── types.ts
└── format-year.ts # bilingual year formatting (BCE/CE, thousands separators)
```

- `t(key, fallback)` returns the translation, or the fallback if the key is absent. **Nothing fails silently** — an untranslated key shows Chinese, it does not show a raw key.
- The English dictionary is **dynamically imported**, so a Chinese-only session downloads zero extra bytes.
- Language choice persists via `safeScopedStorage`.

### 5.2 Translate a UI string

1. Find the hardcoded Chinese in the component.
2. Add a key to `src/i18n/zh-CN.ts` under the right group.
3. Add the same key to `src/i18n/en-US.ts`.
4. Replace the literal with `t('group.key', '原中文')`.

```tsx
// before
<button>筛选</button>

// after
<button>{t('common.filter', '筛选')}</button>
```

Always pass the Chinese fallback — it is what keeps the app usable if a key is missing.

### 5.3 Translate a node's title and summary

Add an entry to `src/data/i18n/en-node-meta.ts`:

```ts
export const EN_NODE_META: Record<string, EnNodeMeta> = {
  'qin-unification': {
    titleEn: 'Qin Unifies the Six States',
    summaryEn: '…',
  },
};
```

Only translated nodes appear here. Untranslated nodes are simply absent and fall back to Chinese at runtime. **Do not add empty or placeholder entries.**

Translation conventions already established in this file: use standard English renderings for personal and place names; do not add or remove historical information.

### 5.4 Translate a node's long-form body

1. Create or extend a shard under `src/data/bodies/en/shards/`, exporting `BODY_MAP` keyed by node id.
2. Register the shard in `src/data/en-shard-body-map.ts`:

```ts
export const EN_SHARD_BODY_IMPORTS = {
  'prehistoric-others': () => import('./bodies/en/shards/prehistoric-others'),
  'ancient-others':     () => import('./bodies/en/shards/ancient-others'),
  'your-new-shard':     () => import('./bodies/en/shards/your-new-shard'),
};
```

Unregistered shards fall back to Chinese automatically, and `DetailPanel` renders an explicit **"English version not yet available"** notice. That notice is a feature — do not remove it to make coverage look better.

### 5.5 Add a third language

1. Copy `en-US.ts` to e.g. `ja-JP.ts` and translate.
2. Register the locale in `src/i18n/index.tsx` (type, dynamic import, switcher entry).
3. Add `titleJa` / `summaryJa` support to the node-meta overlay, or generalise the overlay to be locale-keyed.
4. Add a body-shard map for the locale.

The existing structure is two-language but not two-language-*only*; the overlay pattern generalises.

### 5.6 Check your progress

```bash
npx tsx scripts/translation-progress.ts
```

## 6. Changing the map

The basemap is Esri World Imagery, configured in the map view component:

```
https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}
```

To use a different basemap (OpenStreetMap, a historical map overlay, a self-hosted tile server), replace that URL template and update the attribution string. **Attribution is a legal requirement, not a courtesy** — see [Third-Party Notices](THIRD-PARTY-NOTICES.md).

Two constraints established by hard-won debugging:

- The map container must keep **`isolation: isolate`**. Without it, Leaflet's map-pane (`z-index: 400`) escapes the container's stacking context and covers the projector's control bar (`z-index: 10`), making every control — including the exit button — unclickable.
- The projector overlay must keep **`createPortal` to `document.body`**. An ancestor with a `transform` makes `position: fixed` resolve against that ancestor instead of the viewport, which previously left the overlay unclickable for 2–4 seconds after opening.

Both are regressions that were fixed once. Do not undo them.

## 7. Rebranding the project

To turn this into a different atlas (art history, a fictional world, a company timeline):

1. Replace content in `src/data/history.ts` and the body shards.
2. Redefine `ERAS`, `CIVILIZATIONS` and `CATEGORIES` — these are the three axes everything else filters on.
3. Update `index.html`: title, description, keywords, Open Graph tags, JSON-LD.
4. Replace `public/favicon.svg`.
5. Update the dictionaries in `src/i18n/`.
6. Update the theme names if the museum metaphor no longer fits.

The four views, the projector, the relation graph and the performance gates are all subject-agnostic. They will work for any dated, categorised, geolocated corpus.

## 8. Verify your change

```bash
npm run lint       # types + eslint
npm test           # 154 tests: data integrity, i18n, components
npm run build
npm run test:gate  # 17 gates: first-screen file count, gzip budgets
```

Then **look at it in a browser**. Tests do not catch visual regressions. Check at 1280px and at 390px, in at least two themes, and in both languages.

If you touched the projector: open it, let it play, scrub, reset, and confirm the exit button responds to a **real click** immediately. Programmatic `.click()` bypasses hit-testing and will happily "pass" on an overlay that a human cannot actually click.

---

Next: [Data Format](DATA-FORMAT.md) · [Contributing](CONTRIBUTING.md) · [Translation Status](TRANSLATION-STATUS.md)
# TrailVolt — Master Image Integration Plan

*Created: April 2026. Covers all images generated in master batch + pre-existing approved images.*
*This plan is written before visual review. Final insertion decisions are made after reviewing generated images.*

---

## Integration Principles

1. **Only images from `ai-assets/images/master/`** may be inserted in this phase — after visual approval.
2. **Never insert directly** — copy approved file to `assets/images/` first, then HTML reflects that.
3. **Preserve all existing HTML structure** — only `src` attributes and placeholder div content may change.
4. **Pattern A pages** (`about.html`, `shop.html`, `modules.html`): `<picture>` elements already wired with `.webp` srcsets — zero HTML changes needed, just copy the file.
5. **Pattern B pages** (`index.html`, `product.html`): placeholder divs exist — require targeted `<img>` injection.
6. **Never touch CSS, JS, or non-image-related HTML**.
7. **Line-card images** in `index.html` use `.line-card-v2__img` divs — inject `<picture>` element inside.

---

## Tier 1 — Homepage Critical (Insert First)

These 3 images are the highest-priority homepage slots not yet filled:

### 1. `line-card-everyday.webp` — index.html, line 236 area
- **Status:** Already generated in `ai-assets/images/` (pre-master). Visually strong — approved.
- **Action:** Copy to `assets/images/line-card-everyday.webp`, inject `<picture>` into `.line-card-v2__img` div.
- **HTML target:** `.line-card-v2:nth-child(1) .line-card-v2__img`
- **Inject:**
```html
<picture>
  <source srcset="assets/images/line-card-everyday.webp" type="image/webp">
  <img src="assets/images/line-card-everyday.svg"
       alt="Professional walking through Dublin with TrailVolt Everyday 22L Core Black — morning commute"
       width="480" height="320"
       loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</picture>
```

### 2. `line-card-travel.webp` — index.html, line 266 area
- **Status:** Generated in master batch. Requires visual review before insertion.
- **Action:** If approved: copy to `assets/images/`, inject `<picture>` into `.line-card-v2:nth-child(2) .line-card-v2__img`.
- **Alt text:** "Traveller at airport departure gate with TrailVolt Travel 30L Slate Grey — carry-on ready"

### 3. `line-card-trail.webp` — index.html, line 296 area
- **Status:** Generated in master batch (hardened negative prompt for text-on-pack). Requires visual review.
- **Action:** If text-free and approved: copy to `assets/images/`, inject `<picture>`.
- **Alt text:** "Hiker on Irish mountain trail with TrailVolt Trail 28L Forest Green — Wild Atlantic Way terrain"
- **Critical check:** Verify ZERO text anywhere on pack surface before approval.

---

## Tier 2 — Homepage Secondary Slots

### 4. `pack-detail-material.webp` — index.html, feature showcase section
- **Status:** Generated in master batch.
- **HTML target:** `.feature-showcase__img` div (currently has label text)
- **Action:** If approved, inject `<img>` replacing the label div content.
- **Inject:**
```html
<img src="assets/images/pack-detail-material.webp"
     alt="TrailVolt Core Pack detail — 600D ballistic nylon weave texture, YKK zipper pull, module attachment rail"
     width="480" height="400"
     loading="lazy" decoding="async"
     style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
```

### 5. `sustainability-repair.webp` — index.html, sustainability band section
- **Status:** Generated in master batch.
- **HTML target:** `.sustain-band__img` div (currently has label text)
- **Action:** If approved, inject `<img>` replacing label content.

---

## Tier 3 — Shop Product Cards (Pattern A — File Copy Only)

All shop.html and modules.html image slots use `<picture>` elements already wired. Copying the `.webp` file to `assets/images/` activates the slot automatically. Zero HTML changes needed.

| Image | Status | Action |
|-------|--------|--------|
| `pack-trail-forest.webp` | Generated (master) | Review → copy to assets/images/ |
| `pack-travel-black.webp` | Generated (master) | Review → copy to assets/images/ |
| `pack-everyday-slate.webp` | Generated (master) | Review → copy to assets/images/ |
| `module-phone.webp` | Generated (master) | Review → copy to assets/images/ |
| `module-tech.webp` | Generated (master) | Review → copy to assets/images/ |
| `module-power.webp` | Generated (master) | Review → copy to assets/images/ |
| `module-bottle.webp` | Generated (master) | Review → copy to assets/images/ |

---

## Tier 4 — Product Configurator (Pattern B — HTML injection needed)

### `product-everyday.webp` — product.html
- **HTML target:** `#product-main-photo` `<img>` element — `src` attribute currently points to SVG
- **Action:** Replace SVG `src` with `assets/images/product-everyday.webp`
- **Note:** JavaScript dynamically swaps this `src` when the user selects Travel or Trail line — only the default Everyday src needs changing here.

---

## Tier 5 — Tribe Cards (Pattern A — File Copy Only)

tribe.html uses `<picture>` elements. No HTML changes needed.

| Image | Status | Action |
|-------|--------|--------|
| `tribe-aoife.webp` | Generated (master) | Review → copy to assets/images/ |
| `tribe-marco.webp` | Generated (master) | Review → copy to assets/images/ |
| `tribe-sarah.webp` | Generated (master) | Review → copy to assets/images/ |

---

## Tier 6 — Sustainability Page (Pattern A — File Copy Only)

| Image | Status | Action |
|-------|--------|--------|
| `sustainability-repair.webp` | Generated (master) | Review → copy to assets/images/ |

---

## Images That Need Manual Review Before Insertion

| Image | Risk Level | What to Check |
|-------|-----------|----------------|
| `line-card-trail.webp` | CRITICAL | Zero text anywhere on pack body — previous version had "TRAILVOLT" in amber on the pack |
| `line-card-travel.webp` | MEDIUM | Slate Grey colourway must be clearly grey (not black); airport environment must be specific |
| `pack-trail-forest.webp` | MEDIUM | Forest Green (#2D5016) must be correct — not olive, not black-appearing |
| `pack-detail-material.webp` | LOW | Module rail must be clearly visible as a structural element, not a random line |
| `sustainability-repair.webp` | LOW | Hardware must look premium — no cheap-looking items |

---

## Images Pending (Not Yet Generated in Master Batch)

These were not included in the current generation batch. Planned for future batches:

| Image | Page | Next Batch |
|-------|------|------------|
| `pack-everyday-forest.webp` | shop.html | master_2 extension |
| `pack-travel-slate.webp` | shop.html | master_2 extension |
| `pack-trail-black.webp` | shop.html | master_2 extension |
| `pack-travel-custom.webp` | shop.html | master_2 extension |
| `module-shoe.webp` | shop.html + modules.html | master_3 extension |
| `module-clothing.webp` | shop.html + modules.html | master_3 extension |
| `module-document.webp` | shop.html + modules.html | master_3 extension |
| `module-rain.webp` | shop.html + modules.html | master_3 extension |
| `product-travel.webp` | product.html | master_3 |
| `product-trail.webp` | product.html | master_3 |
| `shop-bundles.webp` | shop.html | master_1 extension |
| `about-wicklow.webp` | about.html | master_5 |
| `about-workshop.webp` | about.html | master_5 |
| `about-airport.webp` | about.html | master_5 |
| `about-workshop-early.webp` | about.html | master_5 |
| `tribe-tomas.webp` | tribe.html | master_4 extension |
| `tribe-nadia.webp` | tribe.html | master_4 extension |
| `tribe-james.webp` | tribe.html | master_4 extension |
| All UGC images (9) | tribe.html | master_6 |
| All OG images (6) | meta tags all pages | master_7 |
| `sustainability-repair.webp` | sustainability.html | master_5 |

---

## Recommended Insertion Order After Visual Review

1. Homepage hero slots (line cards 1-3) — highest conversion impact
2. Homepage secondary (material detail, sustainability band)
3. Shop product cards (copies only — zero HTML risk)
4. Product configurator default image
5. Module cards (copies only)
6. Tribe cards (copies only)
7. About page images (copies only)
8. Sustainability page (copy only)

---

## HTML Injection Templates

### Template A: Line card `<picture>` injection (index.html)
```html
<!-- Insert INSIDE the .line-card-v2__img div, replacing any existing content -->
<picture>
  <source srcset="assets/images/FILENAME.webp" type="image/webp">
  <img src="assets/images/FILENAME.svg"
       alt="ALT_TEXT"
       width="480" height="320"
       loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</picture>
```

### Template B: Feature/sustainability `<img>` injection (index.html)
```html
<!-- Replace the label div content entirely -->
<img src="assets/images/FILENAME.webp"
     alt="ALT_TEXT"
     width="WIDTH" height="HEIGHT"
     loading="lazy" decoding="async"
     style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
```

### Template C: Product configurator src replacement (product.html)
```html
<!-- Only change the src attribute of #product-main-photo -->
<!-- Before: src="assets/images/product-everyday.svg" -->
<!-- After:  src="assets/images/product-everyday.webp" -->
```
Note: The `<picture>` wrapper is not needed for product.html since JS dynamically swaps `src` — keep the `<img>` element as-is, just change the default src.

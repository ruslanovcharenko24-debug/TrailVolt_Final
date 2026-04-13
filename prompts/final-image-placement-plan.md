# TrailVolt — Final Image Placement Plan

*Created: April 2026. Based on direct HTML audit of index.html, about.html, shop.html.*

---

## Overview

4 images approved. The HTML structure uses two patterns:
- **Pattern A — `<picture>` element:** `about.html` and `shop.html` already have `<picture>` + `<source srcset="assets/images/filename.webp">` + `<img src="assets/images/filename.svg">`. These pages are already wired correctly. The `.webp` files simply do not exist yet in `assets/images/`. Copying the files there activates the picture element automatically — **no HTML changes needed** for these files.
- **Pattern B — Placeholder `<div>` or external URL:** `index.html` uses a `placehold.co` URL for the hero and text-content divs for the modular system and founder sections. These require targeted HTML edits to inject real `<img>` elements.

---

## Placement Table

| Image | HTML File | Section | Current State | Action Required | Safe Now |
|-------|-----------|---------|---------------|-----------------|----------|
| `hero-pack-main.webp` | index.html | Hero — right panel | `placehold.co` external URL in `<img src>` | Replace `src` with `assets/images/hero-pack-main.webp`, add `width`/`height`, improve alt | Yes |
| `modular-system-diagram.webp` | index.html | Modular System Explainer | Text placeholder inside `.modular-section__img-inner` div | Inject `<img>` tag into the inner div, replace text content | Yes |
| `about-founder.webp` | about.html | Founder Story — right column | `<picture>` with `srcset="assets/images/about-founder.webp"` targeting missing file; SVG fallback active | Copy file to `assets/images/` — **no HTML change needed** | Yes |
| `about-founder.webp` | index.html | Founder teaser section | Text placeholder inside `.founder-section__img-label` div | Inject `<img>` tag inside `.founder-section__img` div | Yes |
| `pack-everyday-black.webp` | shop.html | Everyday Line — Best Seller card | `<picture>` with `srcset="assets/images/pack-everyday-black.webp"` targeting missing file; SVG fallback active | Copy file to `assets/images/` — **no HTML change needed** | Yes |
| `line-card-trail.webp` | index.html | Trail line card | No `<img>` in `.line-card-v2__img` div | **SKIPPED — image NEEDS REGENERATION (text on pack)** | No |

---

## Placement Details

### 1. `hero-pack-main.webp` — index.html, line 149

**Current markup:**
```html
<img src="https://placehold.co/600x700/0B1626/3FFFAB?text=TrailVolt+Core+Pack"
     alt="TrailVolt Core Pack modular backpack"
     loading="eager"
     style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);">
```

**New markup:**
```html
<img src="assets/images/hero-pack-main.webp"
     alt="TrailVolt Core Pack modular backpack in Core Black — module attachment rail visible"
     width="600" height="700"
     loading="eager"
     decoding="async"
     style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);">
```

**Why safe:** Replaces an external placeholder URL. The image path is relative to the page. The existing `style` attribute is preserved. `loading="eager"` is preserved (correct for above-the-fold). `width`/`height` and `decoding="async"` are added for performance. Alt text improved to reflect actual image content.

**Alt text update:** Yes — improved to mention Core Black colourway and module rail.

---

### 2. `modular-system-diagram.webp` — index.html, lines 396-398

**Current markup:**
```html
<div class="modular-section__img">
  <div class="modular-section__img-inner">
    System Image<br>TrailVolt modular<br>attachment system
  </div>
  ...floating badges...
```

**New markup:**
```html
<div class="modular-section__img">
  <div class="modular-section__img-inner">
    <img src="assets/images/modular-system-diagram.webp"
         alt="TrailVolt modular system — Core Pack with all 8 snap-on modules arranged around it"
         width="560" height="560"
         loading="lazy"
         decoding="async"
         style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
  </div>
  ...floating badges preserved...
```

**Why safe:** The inner div currently holds only text placeholder content. Replacing text with an `<img>` that uses `object-fit:cover` and `border-radius:inherit` will render correctly inside the existing CSS container. The floating badges outside the inner div are preserved.

**Alt text:** Added — describes the radial system layout.

---

### 3. `about-founder.webp` — about.html (no HTML change)

**Current markup (lines 128-134):**
```html
<picture>
  <source srcset="assets/images/about-founder.webp" type="image/webp">
  <img src="assets/images/about-founder.svg"
       alt="Ruslan, founder of TrailVolt, in the Dublin design studio"
       width="560" height="480"
       loading="lazy" decoding="async">
</picture>
```

**Action:** Copy `ai-assets/images/final/about-founder.webp` → `assets/images/about-founder.webp`

**HTML change needed:** None. The `<picture>` element already prefers the `.webp` source. Once the file exists, the browser will use it automatically.

**Alt text status:** Already good — "Ruslan, founder of TrailVolt, in the Dublin design studio"

---

### 4. `about-founder.webp` — index.html, founder teaser section (line 711)

**Current markup:**
```html
<div class="founder-section__img">
  <div class="founder-section__img-label">Founder Photo<br>Ruslan · Dublin, 2026</div>
</div>
```

**New markup:**
```html
<div class="founder-section__img">
  <img src="assets/images/about-founder.webp"
       alt="Ruslan, founder of TrailVolt, working on a pack prototype in his Dublin studio"
       width="560" height="480"
       loading="lazy"
       decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</div>
```

**Why safe:** Replaces a text-label placeholder div with a real image. The outer `founder-section__img` div retains its CSS class and sizing. The text label is removed (it was only a dev placeholder). The image uses `object-fit:cover` and `border-radius:inherit` to fit the existing container style.

---

### 5. `pack-everyday-black.webp` — shop.html, line 154 (no HTML change)

**Current markup:**
```html
<picture>
  <source srcset="assets/images/pack-everyday-black.webp" type="image/webp">
  <img src="assets/images/pack-everyday-black.svg"
       alt="TrailVolt Everyday 22L Core Black"
       width="400" height="300"
       loading="lazy" decoding="async">
</picture>
```

**Action:** Copy `ai-assets/images/final/pack-everyday-black.webp` → `assets/images/pack-everyday-black.webp`

**HTML change needed:** None.

**Alt text status:** Adequate. Could be improved to "TrailVolt Everyday 22L Core Black modular backpack — module attachment rail visible" but not required now.

---

## Skipped Placements

| Image | Page | Reason |
|-------|------|--------|
| `line-card-trail.webp` | index.html | NEEDS REGENERATION — "TRAILVOLT" text appears on pack body. Cannot be used in site HTML. |
| Line card images (everyday, travel) | index.html | No approved images in this wave for these line cards. |
| OG image tags | All pages | OG images not generated in this wave. |
| product.html configurator images | product.html | Not generated in this wave. |

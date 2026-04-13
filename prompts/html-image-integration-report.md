# TrailVolt — HTML Image Integration Report

*Created: April 2026. Documents all HTML changes made during Phase 6.*

---

## HTML Files Modified

| File | Changes Made |
|------|-------------|
| `index.html` | 3 changes — hero image, modular diagram, founder teaser |
| `about.html` | 0 HTML changes — `<picture>` already wired; `.webp` file copied to activate |
| `shop.html` | 0 HTML changes — `<picture>` already wired; `.webp` file copied to activate |

---

## Images Inserted or Replaced

### 1. `index.html` — Hero image (line 149)

**Type:** Replacement

**Before:**
```html
<img src="https://placehold.co/600x700/0B1626/3FFFAB?text=TrailVolt+Core+Pack"
     alt="TrailVolt Core Pack modular backpack"
     loading="eager"
     style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);">
```

**After:**
```html
<img src="assets/images/hero-pack-main.webp"
     alt="TrailVolt Core Pack modular backpack in Core Black — module attachment rail visible"
     width="600" height="700"
     loading="eager" decoding="async"
     style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-xl);">
```

**What changed:** External `placehold.co` URL replaced with local `assets/images/hero-pack-main.webp`. `width`/`height` attributes added for layout stability (CLS prevention). `decoding="async"` added for render performance. Alt text improved to describe actual image content. `loading="eager"` preserved — correct for above-the-fold. Existing `style` attribute preserved unchanged.

---

### 2. `index.html` — Modular system diagram (line 396)

**Type:** Injection (text placeholder replaced with `<img>`)

**Before:**
```html
<div class="modular-section__img-inner">
  System Image<br>TrailVolt modular<br>attachment system
</div>
```

**After:**
```html
<div class="modular-section__img-inner">
  <img src="assets/images/modular-system-diagram.webp"
       alt="TrailVolt modular system — Core Pack with all 8 snap-on modules arranged around it"
       width="560" height="560"
       loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</div>
```

**What changed:** Text placeholder removed. `<img>` injected inside existing `.modular-section__img-inner` div. The outer `.modular-section__img` div and the floating badges below it are fully preserved and unchanged. `loading="lazy"` used (below-the-fold). `border-radius:inherit` carries through container rounding.

---

### 3. `index.html` — Founder teaser section (line 711)

**Type:** Injection (label div replaced with `<img>`)

**Before:**
```html
<div class="founder-section__img">
  <div class="founder-section__img-label">Founder Photo<br>Ruslan · Dublin, 2026</div>
</div>
```

**After:**
```html
<div class="founder-section__img">
  <img src="assets/images/about-founder.webp"
       alt="Ruslan, founder of TrailVolt, working on a pack prototype in his Dublin studio"
       width="560" height="480"
       loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</div>
```

**What changed:** Dev label placeholder div removed. `<img>` injected directly inside `.founder-section__img`. Outer div class and structure preserved. `loading="lazy"` used (below-the-fold). Alt text describes the actual image content.

---

### 4. `about.html` — Founder portrait (no HTML change)

**Type:** File activation (no markup change)

The `<picture>` element on `about.html` (lines 128–134) already had:
```html
<source srcset="assets/images/about-founder.webp" type="image/webp">
```

The `.webp` file was missing, so browsers fell back to the `.svg` placeholder. Copying `about-founder.webp` to `assets/images/` activates the webp source automatically. No HTML was modified.

---

### 5. `shop.html` — Pack Everyday Black card (no HTML change)

**Type:** File activation (no markup change)

The `<picture>` element on `shop.html` (line 154) already had:
```html
<source srcset="assets/images/pack-everyday-black.webp" type="image/webp">
```

Same pattern as above — copying the `.webp` to `assets/images/` activates it. No HTML was modified.

---

## Skipped Placements

| Image | Page | Reason |
|-------|------|--------|
| `line-card-trail.webp` | index.html | NEEDS REGENERATION — "TRAILVOLT" text rendered on pack body. Blocked from site use. |
| `line-card-everyday.webp` | index.html | Not generated in this wave. Existing `.line-card-v2__img` div has no `<img>` slot — no safe injection without knowing CSS background-image intent. |
| `line-card-travel.webp` | index.html | Same as above. Not generated in this wave. |
| OG `<meta>` tags | All pages | OG images not generated in this wave. Meta tags not modified. |
| `product.html` configurator | product.html | Configurator images not generated in this wave. JS-swapped image src values not modified. |

---

## Follow-up Recommendations

1. **Line card images** — the `.line-card-v2__img` divs in `index.html` currently have no image element. Once `line-card-everyday.webp` and `line-card-travel.webp` are generated (and `line-card-trail.webp` regenerated without text), each card needs a `<picture>` element injected inside its `line-card-v2__img` div.

2. **`about.html` alt text** — the existing `alt="Ruslan, founder of TrailVolt, in the Dublin design studio"` is adequate and was not changed. After site launch, consider updating to "Ruslan, founder of TrailVolt, examining hardware components at his Dublin workshop" to be more specific.

3. **shop.html `pack-everyday-black` alt text** — currently `alt="TrailVolt Everyday 22L Core Black"`. Could be improved to "TrailVolt Everyday 22L Core Black modular backpack with module attachment rail" but is functional as-is.

4. **Hero image Wave 2** — `hero-pack-main.webp` is approved but flagged for improved regeneration (missing mint glow, module rail needs stronger definition). When Wave 2 hero is generated and approved, replace `assets/images/hero-pack-main.webp` in-place — no HTML change required.

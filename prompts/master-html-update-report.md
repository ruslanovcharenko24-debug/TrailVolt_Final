# TrailVolt — Master HTML Update Report

*Created: April 2026. Phase 8 of the master visual integration pipeline.*
*Branch: feature/visual-integration*

---

## Summary

Safe partial HTML integration of approved images into the live website. All changes are targeted — only `src` attributes and placeholder div content were modified. No CSS, JS, or structural HTML was changed.

---

## Files Copied to assets/images/

| File | Source | Pattern | Notes |
|------|--------|---------|-------|
| `line-card-everyday.webp` | ai-assets/images/ (pre-master) | B | Dublin Georgian terrace, woman walking, approved |
| `line-card-travel.webp` | ai-assets/images/master/ | B | Airport terminal, man mid-stride, slate grey pack |
| `line-card-trail.webp` | ai-assets/images/master/ | B | Wicklow Mountains, hiker from behind, ZERO text on pack ✓ |
| `sustainability-repair.webp` | ai-assets/images/master/ | B | Hardware knolling flat lay, YKK components |
| `shop-bundles.webp` | ai-assets/images/master/ | A | System flatlay with mint connection lines |
| `module-phone.webp` | ai-assets/images/master/ | A | Phone module, clean studio |
| `module-tech.webp` | ai-assets/images/master/ | A | Tech cable organizer, open view |
| `module-power.webp` | ai-assets/images/master/ | A | Power bank module, mint LED dots |
| `module-bottle.webp` | ai-assets/images/master/ | A | Bottle holder with steel thermos |
| `pack-everyday-black.webp` | ai-assets/images/product-regenerated/ | A | Embossed badge, 3/4 angle, module rail |
| `pack-everyday-slate.webp` | ai-assets/images/product-regenerated/ | A | Clear tonal badge, frontal, module rail |
| `pack-travel-black.webp` | ai-assets/images/product-regenerated/ | A | Badge upper-right, clamshell zip visible |
| `pack-trail-forest.webp` | ai-assets/images/product-regenerated/ | A | Woven badge, fixed (no baked text) |
| `product-everyday.webp` | ai-assets/images/product-regenerated/ | B | Aluminium nameplate, module rail dominant |

**Total: 14 files copied.**

---

## HTML Changes — index.html

### Line Card 1: Everyday (line 236)

Injected `<picture>` as first child of `.line-card-v2__img`. Removed empty `.line-card-v2__img-label` div. Capacity badge and line tag spans preserved.

```html
<picture>
  <source srcset="assets/images/line-card-everyday.webp" type="image/webp">
  <img src="assets/images/line-card-everyday.webp"
       alt="Professional walking through Dublin with TrailVolt Everyday 22L Core Black — morning commute"
       width="480" height="320" loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</picture>
```

### Line Card 2: Travel (line 273)

Same pattern. `line-card-travel.webp` from master batch.

```html
<picture>
  <source srcset="assets/images/line-card-travel.webp" type="image/webp">
  <img src="assets/images/line-card-travel.webp"
       alt="Traveller at airport departure gate with TrailVolt Travel 30L Slate Grey — carry-on ready"
       width="480" height="320" loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</picture>
```

### Line Card 3: Trail (line 310)

Same pattern. `line-card-trail.webp` from master batch — passed critical text check (zero text on pack body).

```html
<picture>
  <source srcset="assets/images/line-card-trail.webp" type="image/webp">
  <img src="assets/images/line-card-trail.webp"
       alt="Hiker on Irish mountain trail with TrailVolt Trail 28L Forest Green — Wild Atlantic Way terrain"
       width="480" height="320" loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</picture>
```

### Sustainability Band (line 665)

Replaced `.sustain-band__img-label` placeholder div with `<img>` element directly inside `.sustain-band__img`.

```html
<img src="assets/images/sustainability-repair.webp"
     alt="TrailVolt premium hardware — YKK zipper pulls, buckles, and repair components — lifetime repair commitment"
     width="480" height="400" loading="lazy" decoding="async"
     style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
```

### Feature Showcase — INTENTIONALLY SKIPPED

`pack-detail-material.webp` (master batch) has AI-baked "TrailVolt CORE BLACK" text in the bottom-right corner — a visual artefact, not the real logo. This image must be regenerated with a stricter negative prompt before it can be used. The `.feature-showcase__img-label` placeholder remains.

---

## HTML Changes — product.html

### Product Configurator Default Image (line 169)

Updated `<img>` fallback `src` from `.svg` to `.webp`. The `<source srcset>` was already wired to the webp.

```html
<!-- Before -->
<img id="product-main-photo" src="assets/images/product-everyday.svg" ...>

<!-- After -->
<img id="product-main-photo" src="assets/images/product-everyday.webp" ...>
```

The `product-everyday.webp` used is from `ai-assets/images/product-regenerated/` — the version with the aluminium nameplate branding integrated into the product design.

---

## Pattern A Activations (shop.html, modules.html — zero HTML changes)

All Pattern A pages (`shop.html`, `modules.html`) already have `<picture>` elements with `<source srcset="assets/images/FILENAME.webp">` pre-wired. Copying the `.webp` files to `assets/images/` activates these slots automatically.

| Slot | Status |
|------|--------|
| `pack-everyday-black.webp` | Now active in shop.html |
| `pack-everyday-slate.webp` | Now active in shop.html |
| `pack-travel-black.webp` | Now active in shop.html |
| `pack-trail-forest.webp` | Now active in shop.html |
| `module-phone.webp` | Now active in shop.html + modules.html |
| `module-tech.webp` | Now active in shop.html + modules.html |
| `module-power.webp` | Now active in shop.html + modules.html |
| `module-bottle.webp` | Now active in shop.html + modules.html |
| `shop-bundles.webp` | Now active in shop.html bundles section |

---

## What Was NOT Changed

- No CSS touched
- No JS touched
- No structural HTML modified
- Feature showcase placeholder left intact (image issue)
- No tribe images inserted (not yet approved for site)
- No about page images inserted (not yet generated)
- No OG meta images updated (not yet generated)
- `product-travel.webp` and `product-trail.webp` not yet generated

# TrailVolt — Follow-up Wave HTML Activation Report

*Created: April 2026.*

---

## Changes Made

### index.html — Feature Showcase (1 change)

Replaced `.feature-showcase__img-label` placeholder div with `<img>` element. This slot was intentionally left empty in the previous wave because the old `pack-detail-material.webp` had AI-baked text. Now resolved.

```html
<!-- Before -->
<div class="feature-showcase__img">
  <div class="feature-showcase__img-label">Product Image<br>Detail shot — materials &amp; construction</div>
</div>

<!-- After -->
<div class="feature-showcase__img">
  <img src="assets/images/pack-detail-material.webp"
       alt="TrailVolt Core Pack detail — 600D ballistic nylon weave texture, YKK zipper pull, module attachment rail"
       width="480" height="400" loading="lazy" decoding="async"
       style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">
</div>
```

### assets/js/product.js — Configurator Image Swap Paths (1 change, 2 paths updated)

The JS swaps the `<img src>` directly when the user selects a line in the product configurator. Updated travel and trail from non-existent `.svg` fallbacks to the newly generated `.webp` files.

```javascript
// Before
everyday: 'assets/images/product-everyday.svg',
travel:   'assets/images/product-travel.svg',
trail:    'assets/images/product-trail.svg',

// After
everyday: 'assets/images/product-everyday.webp',
travel:   'assets/images/product-travel.webp',
trail:    'assets/images/product-trail.webp',
```

The product.html `<picture>` element already has `<source srcset="assets/images/product-everyday.webp">` wired for the initial load. No product.html changes needed.

---

## Pattern A Activations (0 HTML changes — file copy only)

shop.html and modules.html already have `<picture>` elements with srcsets pre-wired. The following slots are now active by virtue of the copied `.webp` files:

| File | Pages Activated |
|------|----------------|
| `pack-everyday-forest.webp` | shop.html |
| `pack-travel-slate.webp` | shop.html |
| `pack-travel-custom.webp` | shop.html |
| `pack-trail-black.webp` | shop.html |
| `module-shoe.webp` | shop.html + modules.html |
| `module-document.webp` | shop.html + modules.html |
| `module-rain.webp` | shop.html + modules.html |

---

## Not Changed

- No CSS touched
- No layout HTML touched
- No other JS files touched
- No pages other than index.html + product.js modified
- `pack-trail-slate.webp` and `module-clothing.webp` slots remain on SVG fallback pending regeneration

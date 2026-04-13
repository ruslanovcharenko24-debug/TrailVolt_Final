# TrailVolt — Image Dimension & Slot Fit Report

*Created: April 2026. Slot-by-slot dimension analysis.*

---

## Methodology

CSS slot ratios were read directly from `assets/css/main.css`. Image dimensions were measured from actual webp file headers. "Fit quality" is the ratio of image AR to slot AR — values near 1.00 are ideal.

---

## Slot Dimension Reference Table

| CSS Selector | Slot Ratio | Slot Type | Source Line |
|---|---|---|---|
| `.hero-split__product-img` | 3:4 (0.75) | Portrait | CSS:2673 |
| `.line-card-v2__img` | 4:3 (1.33) | Landscape | CSS:2923 |
| `.modular-section__img` | 4:5 (0.80) | Portrait | CSS:3178 |
| `.feature-showcase__img` | 3:4 (0.75) | Portrait | CSS:3244 |
| `.sustain-band__img` | 4:3 (1.33) | Landscape | CSS:3418 |
| `.founder-section__img` | 3:4 (0.75) | Portrait | CSS:3487 |
| `.card__image` | 4:3 (1.33) | Landscape | CSS:871 |
| `.product-main-img` | 3:4 (0.75) | Portrait | CSS:3754 |
| `.tribe-card__img` | ~2:1 (fixed 200px h) | Wide landscape | CSS:4740 |
| `.portrait-img` | 3:4 (0.75) | Portrait | CSS:5350 |
| UGC `.ugc-img` | ~1:1 (300×300 attrs) | Square | tribe.html |

---

## Per-Slot Analysis

---

### SLOT: Hero Pack Image (index.html)
- **CSS:** `.hero-split__product-img` → `aspect-ratio: 3/4` (0.75)
- **File:** `hero-pack-main.webp` — 1024×1024 (ratio 1.00)
- **Fit ratio:** 1.00 / 0.75 = **1.33** — image is 33% wider than slot expects
- **Crop behaviour:** `object-fit: cover` — 25% trimmed from top AND bottom of image
- **Desktop risk:** MEDIUM — pack head/handles at very top of frame and feet at very bottom will be cut
- **Mobile risk:** MEDIUM — same proportional crop at all viewport widths (container scales)
- **Suggested fix:** Regenerate at `1024×1536` (ratio 0.67, closer to 0.75 slot) — or generate at exactly `819×1024` to match 0.80 aspect
- **Recommended generation size:** `1024×1536` (API size available)
- **Safety status:** ⚠️ PROBLEMATIC — visible crop on main hero image

---

### SLOT: Line Card — Everyday (index.html)
- **CSS:** `.line-card-v2__img` → `aspect-ratio: 4/3` (1.33)
- **File:** `line-card-everyday.webp` — 1024×1024 (ratio 1.00)
- **Fit ratio:** 1.00 / 1.33 = **0.75** — image is narrower than slot; sides will not fill
- **Crop behaviour:** `object-fit: cover` — ~25% cropped from left AND right sides
- **Desktop risk:** MEDIUM — lifestyle scene sides trimmed
- **Mobile risk:** LOW — stacking on mobile makes this card narrower, less problematic
- **Recommended generation size:** `1536×1024` (landscape, 1.50 — closest available to 1.33)
- **Safety status:** ⚠️ PROBLEMATIC — significant side crop on everyday lifestyle image

---

### SLOT: Line Cards — Travel & Trail (index.html)
- **CSS:** `.line-card-v2__img` → `aspect-ratio: 4/3` (1.33)
- **Files:** `line-card-travel.webp`, `line-card-trail.webp` — 1536×1024 (ratio 1.50)
- **Fit ratio:** 1.50 / 1.33 = **1.13** — image is 13% wider than slot
- **Crop behaviour:** ~6.5% trimmed from each side
- **Desktop risk:** LOW — subject in centre will survive crop
- **Mobile risk:** LOW
- **Safety status:** ✅ SAFE — acceptable mild crop

---

### SLOT: Modular System Diagram (index.html)
- **CSS:** `.modular-section__img` → `aspect-ratio: 4/5` (0.80)
- **File:** `modular-system-diagram.webp` — 1024×1024 (ratio 1.00)
- **Fit ratio:** 1.00 / 0.80 = **1.25** — image is 25% wider than slot
- **Crop behaviour:** ~11% trimmed from left AND right
- **Desktop risk:** MEDIUM — if pack/modules extend to image edges, peripheral modules will be cut
- **Mobile risk:** MEDIUM — same proportion
- **Recommended generation size:** `1024×1280` (if this API size were available — closest approximation 1024×1024 padded, or prompt subject to stay 20% in from edges)
- **Safety status:** ⚠️ MODERATE — diagram may be truncated on sides

---

### SLOT: Feature Showcase Material (index.html)
- **CSS:** `.feature-showcase__img` → `aspect-ratio: 3/4` (0.75)
- **File:** `pack-detail-material.webp` — 1024×1024 (ratio 1.00)
- **Fit ratio:** 1.00 / 0.75 = **1.33** — same problem as hero
- **Crop behaviour:** 25% from top AND bottom
- **Desktop risk:** HIGH — macro detail shot relies on showing specific elements at top (rail slots) and bottom (zipper/weave). Both ends may be cropped.
- **Mobile risk:** HIGH
- **Recommended generation size:** `1024×1536`
- **Safety status:** ❌ PROBLEMATIC — high crop risk for detail content

---

### SLOT: Sustain Band (index.html)
- **CSS:** `.sustain-band__img` → `aspect-ratio: 4/3` (1.33)
- **File:** `sustainability-repair.webp` — 1536×1024 (ratio 1.50)
- **Fit ratio:** 1.50 / 1.33 = **1.13** — mild overshoot
- **Crop behaviour:** ~6.5% from each side — minimal
- **Safety status:** ✅ SAFE

---

### SLOT: Founder Quote (index.html + about.html)
- **CSS:** `.founder-section__img` → `aspect-ratio: 3/4` (0.75)
- **File:** `about-founder.webp` — 1024×1536 (ratio 0.67)
- **Fit ratio:** 0.67 / 0.75 = **0.89** — image is slightly taller than slot; small amount cropped from top or bottom
- **Desktop risk:** LOW — portrait image in portrait slot, proportions close
- **Safety status:** ✅ SAFE (best-matched existing image on site)

---

### SLOT: Shop / Module Cards (shop.html, modules.html)
- **CSS:** `.card__image` → `aspect-ratio: 4/3` (1.33)
- **Files:** All pack/module webps — 1536×1024 (ratio 1.50)
- **Fit ratio:** 1.50 / 1.33 = **1.13** — consistent mild overreach
- **Crop behaviour:** ~6.5% from each side for all cards
- **Safety status:** ✅ SAFE — subject centred in all shop pack/module cards; side crop acceptable

---

### SLOT: Product Configurator (product.html)
- **CSS:** `.product-main-img` → `aspect-ratio: 3/4` (0.75)
- **Files:** `product-everyday.webp`, `product-travel.webp`, `product-trail.webp` — all 1024×1024 (1.00)
- **Fit ratio:** 1.00 / 0.75 = **1.33** — same as hero/feature-showcase
- **Crop behaviour:** 25% from top AND bottom of pack image
- **Desktop risk:** HIGH — configurator panel is the primary conversion element. Showing a cropped pack is a significant UX/commercial problem.
- **Mobile risk:** HIGH — on mobile the product image panel is prominent; crop is visible
- **Recommended generation size:** `1024×1536`
- **Safety status:** ❌ CRITICAL PROBLEM — highest-conversion page showing cropped products

---

### SLOT: Tribe Member Cards (tribe.html)
- **CSS:** `.tribe-card__img` → fixed `height: 200px`, natural width from grid (~400px) → effective ~2:1
- **Files to be promoted:** `tribe-aoife.webp`, `tribe-marco.webp`, `tribe-sarah.webp` — 1536×1024 (ratio 1.50)
- **Fit ratio:** 1.50 / 2.00 = **0.75** — image narrower than slot (will fill with black bars on sides, or object-fit:cover fills)
- **Desktop risk:** LOW — fixed height 200px, object-fit:cover fills horizontally
- **Safety status:** ✅ ACCEPTABLE — close enough for tribe card portrait format

---

### SLOT: About Page Portrait Grid (about.html)
- **CSS:** `.portrait-img` → `aspect-ratio: 3/4` (0.75), `object-fit: cover`
- **Files needed:** `about-wicklow.webp`, `about-workshop-early.webp`, `about-airport.webp`
- **Currently:** SVG only (no webp)
- **Recommended generation size:** `1024×1536` (portrait 2:3 — fits 3:4 slot with minimal top/bottom crop)
- **Safety status:** N/A (files missing)

---

### SLOT: About Workshop Process Photo (about.html)
- **CSS:** `class="about-process-img"` — no specific CSS rule found; likely renders at natural size
- **HTML attrs:** `width="560" height="480"` → approx 7:6 (1.17 landscape)
- **File needed:** `about-workshop.webp`
- **Recommended generation size:** `1536×1024` (3:2 landscape) — closest to 7:6 available from API
- **Safety status:** N/A (file missing)

---

### SLOT: UGC Grid (tribe.html)
- **HTML attrs:** `width="300" height="300"` → 1:1 square
- **Files needed:** 9 ugc-*.webp images
- **Recommended generation size:** `1024×1024` (1:1 square)
- **Safety status:** N/A (all files missing)

---

## Dimension Summary Table

| Image | Current Size | Slot Ratio | Match | Fix |
|-------|-------------|-----------|-------|-----|
| hero-pack-main.webp | 1024×1024 | 3:4 | ❌ 25% crop | Regen 1024×1536 |
| line-card-everyday.webp | 1024×1024 | 4:3 | ❌ 25% crop | Regen 1536×1024 |
| line-card-travel.webp | 1536×1024 | 4:3 | ✅ mild | OK |
| line-card-trail.webp | 1536×1024 | 4:3 | ✅ mild | OK |
| modular-system-diagram.webp | 1024×1024 | 4:5 | ⚠️ 11% crop | Regen 1024×1024 with safe margins |
| pack-detail-material.webp | 1024×1024 | 3:4 | ❌ 25% crop | Regen 1024×1536 |
| sustainability-repair.webp | 1536×1024 | 4:3 | ✅ mild | OK |
| about-founder.webp | 1024×1536 | 3:4 | ✅ close | OK |
| product-everyday.webp | 1024×1024 | 3:4 | ❌ 25% crop | Regen 1024×1536 |
| product-travel.webp | 1024×1024 | 3:4 | ❌ 25% crop | Regen 1024×1536 |
| product-trail.webp | 1024×1024 | 3:4 | ❌ 25% crop | Regen 1024×1536 |
| pack-*.webp (shop/modules) | 1536×1024 | 4:3 | ✅ mild | OK |
| module-*.webp | 1536×1024 | 4:3 | ✅ mild | OK |
| shop-bundles.webp | 1536×1024 | 4:3 | ✅ mild | OK |

**Images needing regeneration for dimension fit:** 6 (hero, line-card-everyday, pack-detail-material, product-everyday, product-travel, product-trail)
**Images at severe crop risk right now:** product-everyday/travel/trail (configurator), pack-detail-material (feature showcase)

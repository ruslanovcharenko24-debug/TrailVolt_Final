# TrailVolt — Image Quality Audit

*Created: April 2026. Assessment of all webp images across assets/ and ai-assets/.*

---

## Audit Legend

- **APPROVED** — suitable for current or future site use, no known issues
- **USABLE_BUT_NOT_OPTIMAL** — active on site, minor quality or dimension concern, not urgent
- **NEEDS_REGENERATION** — compositional issue, wrong dimensions, brand failure, or known quality problem
- **NOT_RECOMMENDED** — in ai-assets only, not promoted, failed review; do not copy to assets/images/

---

## LIVE FILES — assets/images/

### Hero & Core Pack

**`hero-pack-main.webp`** — 1024×1024
- Usage: index.html hero section
- Live: YES
- Aspect vs slot: Square (1:1) vs portrait container (3:4) — significant mismatch
- Notes: object-fit:cover will crop 25% from top/bottom. Pack head/base at risk.
- Status: **USABLE_BUT_NOT_OPTIMAL** — regeneration at 1024×1536 would improve

---

### Line Cards

**`line-card-everyday.webp`** — 1024×1024
- Usage: index.html Everyday line card
- Live: YES
- Aspect vs slot: Square (1:1) vs landscape (4:3) — moderate mismatch
- Notes: Sides of lifestyle scene will be cropped. Central subject probably safe.
- Status: **USABLE_BUT_NOT_OPTIMAL** — regeneration at 1536×1024 would improve

**`line-card-travel.webp`** — 1536×1024
- Usage: index.html Travel line card
- Live: YES
- Aspect vs slot: 3:2 vs 4:3 — mild crop only
- Status: **APPROVED**

**`line-card-trail.webp`** — 1536×1024
- Usage: index.html Trail line card
- Live: YES
- Aspect vs slot: 3:2 vs 4:3 — mild crop only
- Status: **APPROVED**

---

### Modular System

**`modular-system-diagram.webp`** — 1024×1024
- Usage: index.html modular system section
- Live: YES
- Aspect vs slot: Square (1:1) vs 4:5 portrait — sides will be cropped
- Notes: If diagram fills the square frame to edges, left/right portions will be cut in the portrait container.
- Status: **USABLE_BUT_NOT_OPTIMAL** — regeneration at 1024×1280 (4:5) would be ideal

---

### Feature / Material Detail

**`pack-detail-material.webp`** — 1024×1024
- Usage: index.html feature-showcase section
- Live: YES
- Aspect vs slot: Square (1:1) vs portrait (3:4) — significant mismatch
- Notes: Top zipper rail and bottom nylon weave at risk from vertical crop. High priority regeneration candidate.
- Status: **NEEDS_REGENERATION** — regenerate at 1024×1536 for correct portrait fit

---

### Pack Product Cards (Shop / Pattern A)

**`pack-everyday-black.webp`** — 1536×1024
- Usage: shop.html, pattern A
- Live: YES
- Aspect vs slot: 3:2 vs 4:3 — mild crop
- Brand fit: Matte black rubber badge, correct embossed treatment
- Status: **APPROVED**

**`pack-everyday-slate.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Slate Grey, embossed badge
- Status: **APPROVED**

**`pack-everyday-forest.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Forest Green, woven badge — excellent
- Status: **APPROVED**

**`pack-travel-black.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Core Black Travel 30L, correct form
- Status: **APPROVED**

**`pack-travel-slate.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Slate Grey colourway, travel form correct
- Status: **APPROVED**

**`pack-travel-custom.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Two modules physically mounted — strongest modular concept shot
- Status: **APPROVED** ★ (highest commercial value image on site)

**`pack-trail-forest.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Forest Green Trail, woven badge
- Status: **APPROVED**

**`pack-trail-black.webp`** — 1536×1024
- Usage: shop.html
- Live: YES
- Brand fit: Trail black, slightly dark but on-brand
- Status: **APPROVED**

---

### Product Configurator

**`product-everyday.webp`** — 1024×1024
- Usage: product.html (default + JS swap), configurator initial state
- Live: YES
- Aspect vs slot: Square (1:1) vs portrait (3:4) — significant mismatch
- Notes: Configurator slot is clearly portrait; square pack image will be cropped top and bottom. Pack handle/top badge at risk.
- Status: **NEEDS_REGENERATION** — regenerate at 1024×1536

**`product-travel.webp`** — 1024×1024
- Usage: product.html (JS swap when Travel line selected)
- Live: YES
- Same mismatch as product-everyday
- Status: **NEEDS_REGENERATION** — regenerate at 1024×1536

**`product-trail.webp`** — 1024×1024
- Usage: product.html (JS swap when Trail line selected)
- Live: YES
- Same mismatch as product-everyday
- Status: **NEEDS_REGENERATION** — regenerate at 1024×1536

---

### Sustainability

**`sustainability-repair.webp`** — 1536×1024
- Usage: index.html sustain-band, sustainability.html
- Live: YES (both pages)
- Aspect vs slot: 3:2 vs 4:3 — mild crop, acceptable
- Brand fit: Hardware/repair detail, on-brand
- Status: **APPROVED**

---

### Modules (Live in shop.html + modules.html)

**`module-phone.webp`** — 1536×1024 — **APPROVED**
**`module-tech.webp`** — 1536×1024 — **APPROVED**
**`module-power.webp`** — 1536×1024 — **APPROVED**
**`module-shoe.webp`** — 1536×1024 — **APPROVED** (excellent ventilation mesh detail)
**`module-document.webp`** — 1536×1024 — **APPROVED** (RFID interior visible)
**`module-bottle.webp`** — 1536×1024 — **APPROVED**
**`module-rain.webp`** — 1536×1024 — **APPROVED** ★ (mint reflective stripes — strongest brand moment)

---

### About & Founder

**`about-founder.webp`** — 1024×1536
- Usage: index.html founder section, about.html hero
- Live: YES (both pages)
- Aspect vs slot: 2:3 (0.67) vs 3:4 (0.75) — close match, acceptable
- Status: **APPROVED**

---

## AI-ASSETS ONLY — Not Live

### `ai-assets/images/master/` — Generated, partially promoted

**`tribe-aoife.webp`** — 1536×1024
- Target: tribe.html tribe-card slot (200px fixed height, ~400px wide → 2:1)
- Live: NO — in master only
- Dimension vs slot: 3:2 vs 2:1 — slight letterbox or crop; acceptable for fixed-height card
- Status: **APPROVED** — FILE_COPY_ONLY win, copy to assets/images/

**`tribe-marco.webp`** — 1536×1024
- Same assessment as tribe-aoife
- Status: **APPROVED** — FILE_COPY_ONLY win

**`tribe-sarah.webp`** — 1536×1024
- Same assessment
- Status: **APPROVED** — FILE_COPY_ONLY win

**`line-card-trail.webp`** (master) — already promoted to assets/images/ ✅
**`line-card-travel.webp`** (master) — already promoted ✅
**`pack-detail-material.webp`** (master) — version with baked AI text — NOT_RECOMMENDED (superseded by followup version)

---

### `ai-assets/images/product-regenerated/` — Generated, partially promoted

**`pack-everyday-black.webp`** — already promoted ✅
**`pack-everyday-slate.webp`** — already promoted ✅
**`pack-trail-forest.webp`** — already promoted ✅
**`pack-travel-black.webp`** — already promoted ✅
**`product-everyday.webp`** (product-regen) — 1024×1024 — same dimension issue as live version; already promoted as the better badge-integrated version

---

### `ai-assets/images/followup/` — Generated, 10/12 promoted

**`pack-trail-slate.webp`** — MOLLE webbing instead of front-face slot rail; copper zip accent
- Status: **NOT_RECOMMENDED** — regenerate before promoting

**`module-clothing.webp`** — Handle loop instead of rail attachment clip; no compression visible
- Status: **NOT_RECOMMENDED** — regenerate before promoting

---

## Quality Concern Summary

| File | Issue | Priority |
|------|-------|----------|
| `product-everyday.webp` | 1:1 in 3:4 slot — crops pack | HIGH |
| `product-travel.webp` | 1:1 in 3:4 slot — crops pack | HIGH |
| `product-trail.webp` | 1:1 in 3:4 slot — crops pack | HIGH |
| `pack-detail-material.webp` | 1:1 in 3:4 slot — crops detail | HIGH |
| `hero-pack-main.webp` | 1:1 in 3:4 slot — crops hero | MEDIUM |
| `line-card-everyday.webp` | 1:1 in 4:3 slot — side crop | MEDIUM |
| `modular-system-diagram.webp` | 1:1 in 4:5 slot — side crop | MEDIUM |
| `pack-trail-slate.webp` | Wrong module system, off-brand zip | CRITICAL (not live) |
| `module-clothing.webp` | Wrong attachment hardware | CRITICAL (not live) |

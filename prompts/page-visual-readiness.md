# TrailVolt — Page Visual Readiness

*Created: April 2026.*

---

## Readiness Scale

- **Complete slot:** webp exists, active, acceptable quality, acceptable dimension fit
- **Incomplete slot:** missing file, placeholder, known quality failure, severe size mismatch, or SVG-only fallback

---

## index.html

| Metric | Value |
|--------|-------|
| Total visual slots | 13 |
| Complete | 4 |
| Incomplete | 9 |
| **Visual readiness** | **31%** |

**Complete slots:**
1. line-card-travel.webp ✅ (mild crop, acceptable)
2. line-card-trail.webp ✅ (mild crop, acceptable)
3. sustainability-repair.webp ✅ (sustain-band)
4. about-founder.webp ✅ (founder section)

**Incomplete / blocking:**
- hero-pack-main.webp: 1:1 in 3:4 slot — SIZE_MISMATCH
- line-card-everyday.webp: 1:1 in 4:3 slot — SIZE_MISMATCH
- modular-system-diagram.webp: 1:1 in 4:5 slot — SIZE_MISMATCH
- pack-detail-material.webp: 1:1 in 3:4 slot — SIZE_MISMATCH (feature-showcase)
- 5× tribe-photo-1–5: PLACEHOLDER (text labels only, no `<img>` elements wired)

**What blocks full completion:**
- Regeneration of hero, line-card-everyday, modular-system-diagram, pack-detail-material at correct portrait/landscape ratios
- Generation and HTML injection of 5 homepage tribe community photos

---

## product.html

| Metric | Value |
|--------|-------|
| Total visual slots | 3 |
| Complete | 0 |
| Incomplete (active but mismatched) | 3 |
| **Visual readiness** | **0%** (functional) / **50%** (images exist but wrong size) |

**Incomplete / blocking:**
- All 3 product configurator images (everyday, travel, trail): 1024×1024 in 3:4 slot
- All are active with content but pack heads/bases are cropped
- This is the highest-conversion page on the site

**What blocks full completion:**
- Regeneration of all 3 product images at 1024×1536

---

## shop.html

| Metric | Value |
|--------|-------|
| Total visual slots | 19 |
| Complete | 17 |
| Incomplete | 2 |
| **Visual readiness** | **89%** |

**Incomplete / blocking:**
- pack-trail-slate.webp: MANUAL REVIEW — MOLLE webbing issue (SVG showing)
- module-clothing.webp: MANUAL REVIEW — wrong hardware (SVG showing)

**What blocks full completion:**
- Regeneration of pack-trail-slate and module-clothing

---

## about.html

| Metric | Value |
|--------|-------|
| Total visual slots | 5 |
| Complete | 1 |
| Incomplete | 4 |
| **Visual readiness** | **20%** |

**Complete:**
- about-founder.webp ✅ (hero portrait)

**Incomplete / blocking:**
- about-wicklow.webp: MISSING
- about-workshop-early.webp: MISSING
- about-airport.webp: MISSING
- about-workshop.webp: MISSING

**What blocks full completion:**
- Generation of 4 lifestyle/founder images

---

## sustainability.html

| Metric | Value |
|--------|-------|
| Total visual slots | 1 |
| Complete | 1 |
| Incomplete | 0 |
| **Visual readiness** | **100%** |

**Notes:** Page is text-heavy with one image slot which is filled. No blocking issues.

---

## tribe.html

| Metric | Value |
|--------|-------|
| Total visual slots | 15 |
| Complete | 0 |
| Incomplete | 15 |
| **Visual readiness** | **0%** |

**Incomplete / blocking:**
- 3 tribe cards (aoife/marco/sarah): webp in ai-assets/master but NOT promoted — FILE_COPY_ONLY win
- 3 tribe cards (tomas/nadia/james): not generated — REGENERATION_NEEDED
- 9 UGC images: none generated — REGENERATION_NEEDED (×9)

**What blocks full completion:**
- Immediate: Copy 3 master tribe images to assets/images/
- Then: Generate 3 more tribe portraits
- Then: Generate 9 UGC images

---

## modules.html

| Metric | Value |
|--------|-------|
| Total visual slots | 8 |
| Complete | 7 |
| Incomplete | 1 |
| **Visual readiness** | **87.5%** |

**Incomplete / blocking:**
- module-clothing.webp: MANUAL REVIEW — not promoted (same as shop.html blocking issue)

**What blocks full completion:**
- Regeneration of module-clothing

---

## Site-Wide Summary

| Page | Slots | Complete | % Ready | Blocking Issue |
|------|-------|----------|---------|----------------|
| index.html | 13 | 4 | 31% | 4 size mismatches + 5 tribe placeholders |
| product.html | 3 | 0 | 0% | All 3 images wrong ratio |
| shop.html | 19 | 17 | 89% | 2 manual review items |
| about.html | 5 | 1 | 20% | 4 images not generated |
| sustainability.html | 1 | 1 | 100% | — |
| tribe.html | 15 | 0 | 0% | 3 not promoted, 12 not generated |
| modules.html | 8 | 7 | 87.5% | 1 manual review item |
| **TOTAL** | **64** | **30** | **47%** | — |

---

## Easiest Wins (Sorted by Effort / Impact)

1. **tribe-aoife/marco/sarah** — FILE COPY only, 3 images, immediate improvement to tribe.html (effort: minimal)
2. **pack-trail-slate + module-clothing** — 2 regenerations to complete shop.html + modules.html (effort: low, 2 API calls)
3. **about.html 4 images** — 4 regenerations to lift about.html from 20% to 100% (effort: medium, 4 API calls)
4. **product configurator 3 images** — 3 regenerations at 1024×1536 to fix highest-conversion page (effort: medium, 3 API calls)
5. **tribe portrait tomas/nadia/james** — 3 regenerations (effort: medium, 3 API calls)
6. **UGC 9 images** — 9 regenerations (effort: high, 9 API calls)
7. **Index dimension fixes (hero/everyday/modular/detail)** — 4 regenerations (effort: medium, 4 API calls)

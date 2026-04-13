# TrailVolt — Full Visual Slot Audit

*Created: April 2026. Complete page-by-page slot inspection.*

---

## Audit Legend

- **COMPLETE** — webp file exists, active, acceptable quality and fit
- **MISSING** — no webp file exists anywhere, only SVG fallback showing
- **PLACEHOLDER** — no image at all, only CSS div with text label
- **SVG_FALLBACK** — webp generated (in ai-assets/), not yet promoted to assets/images/
- **SIZE_MISMATCH** — file exists and is active but image ratio diverges significantly from CSS container ratio
- **NEEDS_REGENERATION** — file exists but is known to have a compositional or quality issue
- **MANUAL_REVIEW** — flagged in previous review cycle, not promoted, SVG showing

---

## PAGE: index.html

### Slot 1 — Hero Pack Image
- **Section:** `.hero-split__product-img`
- **Referenced file:** `assets/images/hero-pack-main.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image type:** Real webp image
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 3/4` (portrait 0.75)
- **Fit analysis:** Square image rendered in portrait container. object-fit:cover will crop ~25% from top and bottom of image. Product head/bottom may be cut off.
- **Crop risk:** HIGH — pack top (handles) and bottom (feet) likely cropped
- **Mobile risk:** MEDIUM — container scales down, same proportional crop
- **Status: SIZE_MISMATCH**

### Slot 2 — Line Card: Everyday
- **Section:** `.line-card-v2__img` (Everyday card)
- **Referenced file:** `assets/images/line-card-everyday.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 4/3` (landscape 1.33)
- **Fit analysis:** Square image in wider landscape container. object-fit:cover will crop ~25% from left and right of image.
- **Crop risk:** MEDIUM — sides of scene cropped, composition may be centred enough to survive
- **Status: SIZE_MISMATCH**

### Slot 3 — Line Card: Travel
- **Section:** `.line-card-v2__img` (Travel card)
- **Referenced file:** `assets/images/line-card-travel.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1536×1024 (ratio 1.50 — landscape)
- **CSS container:** `aspect-ratio: 4/3` (1.33)
- **Fit analysis:** Image is wider than container by 12.5%. Slight crop on left/right. Subject likely centred so low risk.
- **Crop risk:** LOW
- **Status: COMPLETE** (minor dimension mismatch, acceptable)

### Slot 4 — Line Card: Trail
- **Section:** `.line-card-v2__img` (Trail card)
- **Referenced file:** `assets/images/line-card-trail.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1536×1024 (ratio 1.50)
- **CSS container:** `aspect-ratio: 4/3` (1.33)
- **Fit analysis:** Same as Travel — slight side crop. Acceptable.
- **Crop risk:** LOW
- **Status: COMPLETE** (minor mismatch, acceptable)

### Slot 5 — Modular System Diagram
- **Section:** `.modular-section__img-inner`
- **Referenced file:** `assets/images/modular-system-diagram.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 4/5` (portrait 0.80)
- **Fit analysis:** Square image in portrait container. object-fit:cover crops left/right sides (~11%). Diagram may be truncated.
- **Crop risk:** MEDIUM — if diagram extends to edges, content will be cut
- **Status: SIZE_MISMATCH** (moderate — diagram cropped on sides)

### Slot 6 — Feature Showcase (Material Detail)
- **Section:** `.feature-showcase__img`
- **Referenced file:** `assets/images/pack-detail-material.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 3/4` (portrait 0.75)
- **Fit analysis:** Square image in tall portrait container. object-fit:cover (set inline) crops ~25% from top and bottom. The material macro shot may lose the zipper at bottom or rail at top.
- **Crop risk:** HIGH — critical detail content at edges of square frame will be lost
- **Status: SIZE_MISMATCH** (significant — regeneration recommended at 1024×1536)

### Slot 7 — Sustain Band (Repair/Sustainability)
- **Section:** `.sustain-band__img`
- **Referenced file:** `assets/images/sustainability-repair.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1536×1024 (ratio 1.50)
- **CSS container:** `aspect-ratio: 4/3` (1.33)
- **Fit analysis:** Slight side crop. Subject likely centred. Low risk.
- **Crop risk:** LOW
- **Status: COMPLETE**

### Slot 8 — Founder Quote Photo
- **Section:** `.founder-section__img`
- **Referenced file:** `assets/images/about-founder.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1024×1536 (ratio 0.67 — portrait)
- **CSS container:** `aspect-ratio: 3/4` (0.75 portrait)
- **Fit analysis:** Image is narrower/taller than slot. object-fit:cover crops a small amount from the top/bottom. Very close match.
- **Crop risk:** LOW
- **Status: COMPLETE**

### Slots 9–13 — Tribe Community Photos (index.html homepage section)
- **Section:** `.tribe-photo__inner` (5 boxes)
- **Referenced file:** None — pure CSS div with text label
- **File exists:** N/A
- **Active on site:** N/A (no `<img>` element present at all)
- **Image type:** PLACEHOLDER — `.tribe-photo__label` text only
- **Notes:** These are separate from the tribe.html page tribe-card photos. These 5 slots are still text placeholders. No `<img>` elements have been wired into these divs.
- **Status: PLACEHOLDER** (×5)

---

## PAGE: product.html

### Slot 1 — Product Configurator Main Image (Everyday)
- **Section:** `#product-main-photo` / `.product-main-img`
- **Referenced file:** `assets/images/product-everyday.webp`
- **File exists:** YES
- **Active on site:** YES
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 3/4` (0.75 portrait)
- **Fit analysis:** Square image rendered in tall portrait container. object-fit:cover crops ~25% from top and bottom. Pack head and base significantly cut.
- **Crop risk:** HIGH — pack is a tall object; the top third and bottom third of pack may be cropped
- **Status: SIZE_MISMATCH** (significant)

### Slot 2 — Product Configurator Main Image (Travel) — JS swap
- **Referenced file:** `assets/images/product-travel.webp`
- **File exists:** YES
- **Active on site:** YES (when Travel line selected)
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 3/4` (0.75 portrait)
- **Same mismatch as Slot 1**
- **Status: SIZE_MISMATCH**

### Slot 3 — Product Configurator Main Image (Trail) — JS swap
- **Referenced file:** `assets/images/product-trail.webp`
- **File exists:** YES
- **Active on site:** YES (when Trail line selected)
- **Image dimensions:** 1024×1024 (ratio 1.00 — square)
- **CSS container:** `aspect-ratio: 3/4` (0.75 portrait)
- **Same mismatch as Slot 1**
- **Status: SIZE_MISMATCH**

---

## PAGE: shop.html

*Card image container: `.card__image` — CSS `aspect-ratio: 4/3` (1.33 landscape). All pack/module webp images are 1536×1024 (1.50). Mild crop on sides. Acceptable for card display format.*

### Pack Cards — Everyday Line
| Slot | File | Exists | Status |
|------|------|--------|--------|
| Everyday Core Black | `pack-everyday-black.webp` | YES ✅ | COMPLETE |
| Everyday Slate Grey | `pack-everyday-slate.webp` | YES ✅ | COMPLETE |
| Everyday Forest Green | `pack-everyday-forest.webp` | YES ✅ | COMPLETE |

### Pack Cards — Travel Line
| Slot | File | Exists | Status |
|------|------|--------|--------|
| Travel Core Black | `pack-travel-black.webp` | YES ✅ | COMPLETE |
| Travel Slate Grey | `pack-travel-slate.webp` | YES ✅ | COMPLETE |
| Travel Custom Build | `pack-travel-custom.webp` | YES ✅ | COMPLETE |

### Pack Cards — Trail Line
| Slot | File | Exists | Status |
|------|------|--------|--------|
| Trail Forest Green | `pack-trail-forest.webp` | YES ✅ | COMPLETE |
| Trail Core Black | `pack-trail-black.webp` | YES ✅ | COMPLETE |
| **Trail Slate Grey** | `pack-trail-slate.webp` | **NO ❌** | **MANUAL_REVIEW → MISSING** |

*Note: `pack-trail-slate.webp` exists in `ai-assets/images/followup/` but was not promoted due to MOLLE webbing issue (wrong module representation) and off-brand copper zip accent. SVG fallback is showing on site.*

### Module Cards
| Slot | File | Exists | Status |
|------|------|--------|--------|
| Phone Module | `module-phone.webp` | YES ✅ | COMPLETE |
| Tech Organizer | `module-tech.webp` | YES ✅ | COMPLETE |
| Power Bank | `module-power.webp` | YES ✅ | COMPLETE |
| Shoe Module | `module-shoe.webp` | YES ✅ | COMPLETE |
| **Clothing Cube** | `module-clothing.webp` | **NO ❌** | **MANUAL_REVIEW → MISSING** |
| Document Sleeve | `module-document.webp` | YES ✅ | COMPLETE |
| Bottle Holder | `module-bottle.webp` | YES ✅ | COMPLETE |
| Rain Cover | `module-rain.webp` | YES ✅ | COMPLETE |

*Note: `module-clothing.webp` exists in `ai-assets/images/followup/` but was not promoted due to handle instead of rail clip.*

### Bundle Section
| Slot | File | Exists | Status |
|------|------|--------|--------|
| Shop Bundles | `shop-bundles.webp` | YES ✅ | COMPLETE |

---

## PAGE: about.html

*About hero uses a 2-column grid. Photo grid 3 uses `.portrait-img` with `aspect-ratio: 3/4` and `object-fit: cover`. Workshop image uses class `about-process-img` (no specific aspect-ratio CSS found, uses natural image proportions via width:560 height:480 attr).*

### Slot 1 — Founder Portrait (Hero)
- **Referenced file:** `assets/images/about-founder.webp`
- **File exists:** YES ✅
- **Image dimensions:** 1024×1536 (0.67 portrait)
- **HTML attributes:** width="560" height="480" (3:2 landscape in attrs, but actual image is portrait)
- **Status: COMPLETE** (image is portrait, may render with natural dimensions rather than forced 3:2 from attrs since no height CSS constraint found)

### Slot 2 — Wicklow Mountains Testing Photo
- **Referenced file:** `assets/images/about-wicklow.webp`
- **File exists:** NO ❌ (only `about-wicklow.svg` in assets/images/)
- **Current display:** SVG placeholder
- **HTML attrs:** width="300" height="400" — portrait slot
- **CSS:** `.portrait-img { aspect-ratio: 3/4 }` — confirms portrait intent
- **Status: MISSING**

### Slot 3 — Workshop Early (Prototypes)
- **Referenced file:** `assets/images/about-workshop-early.webp`
- **File exists:** NO ❌ (only SVG fallback)
- **Current display:** SVG placeholder
- **HTML attrs:** width="300" height="400" — portrait slot
- **Status: MISSING**

### Slot 4 — Dublin Airport Photo
- **Referenced file:** `assets/images/about-airport.webp`
- **File exists:** NO ❌ (only SVG fallback)
- **Current display:** SVG placeholder
- **HTML attrs:** width="300" height="400" — portrait slot
- **Status: MISSING**

### Slot 5 — Workshop Process Photo
- **Referenced file:** `assets/images/about-workshop.webp`
- **File exists:** NO ❌ (only SVG fallback)
- **Current display:** SVG placeholder
- **HTML attrs:** width="560" height="480" — landscape slot (approx 7:6)
- **Class:** `about-process-img` (no specific CSS aspect ratio found — renders at natural size / HTML attrs)
- **Status: MISSING**

---

## PAGE: sustainability.html

### Slot 1 — Repair/Sustainability Image
- **Referenced file:** `assets/images/sustainability-repair.webp`
- **File exists:** YES ✅
- **Image dimensions:** 1536×1024 (1.50)
- **CSS container:** Not found as named class — likely in section with inline styles or pattern-B picture element
- **Status: COMPLETE**

*Note: sustainability.html has only ONE main image slot identified. The rest of the page appears to be text-heavy with icons/checklists.*

---

## PAGE: tribe.html

*Tribe member card images: `.tribe-card__img` — fixed height 200px, width from grid (approx 400px → 2:1 aspect). HTML attrs: width="400" height="200" — confirms 2:1 intent.*

*UGC grid images: 300×300 px HTML attrs — 1:1 square.*

### Tribe Member Cards (6 total)
| Slot | File | In assets/images/ | In ai-assets/ | Status |
|------|------|-------------------|---------------|--------|
| Aoife Murphy | `tribe-aoife.webp` | NO ❌ | YES (master, 1536×1024) | **SVG_FALLBACK** |
| Marco Lazzarini | `tribe-marco.webp` | NO ❌ | YES (master, 1536×1024) | **SVG_FALLBACK** |
| Sarah Kim | `tribe-sarah.webp` | NO ❌ | YES (master, 1536×1024) | **SVG_FALLBACK** |
| Tomas Rivera | `tribe-tomas.webp` | NO ❌ | NO | **MISSING** |
| Nadia Voronova | `tribe-nadia.webp` | NO ❌ | NO | **MISSING** |
| James Thornton | `tribe-james.webp` | NO ❌ | NO | **MISSING** |

*Note: tribe-aoife/marco/sarah are generated in ai-assets/images/master/ but were never promoted to assets/images/. These are a FILE_COPY_ONLY win — no regeneration needed.*

### UGC Grid (9 slots — all MISSING)
| Slot | File | Status |
|------|------|--------|
| Aoife at Cliffs of Moher | `ugc-aoife-cliffs.webp` | MISSING |
| Marco in Lisbon Airport | `ugc-marco-airport.webp` | MISSING |
| Sarah cycling in Dublin | `ugc-sarah-cycling.webp` | MISSING |
| Tomas on Pyrenees trail | `ugc-tomas-trail.webp` | MISSING |
| Nadia at Amsterdam café | `ugc-nadia-amsterdam.webp` | MISSING |
| James at London Bridge | `ugc-james-london.webp` | MISSING |
| Modules laid flat | `ugc-modules-flat.webp` | MISSING |
| Pack against mountain | `ugc-pack-mountain.webp` | MISSING |
| Pack in overhead bin | `ugc-pack-overhead.webp` | MISSING |

---

## PAGE: modules.html

*Module detail panels use `.card__image`-style picture elements. Same 1536×1024 vs 4:3 mild mismatch as shop.html — acceptable.*

| Slot | File | Exists | Status |
|------|------|--------|--------|
| Phone Module | `module-phone.webp` | YES ✅ | COMPLETE |
| Tech Organizer | `module-tech.webp` | YES ✅ | COMPLETE |
| Power Bank | `module-power.webp` | YES ✅ | COMPLETE |
| Shoe Module | `module-shoe.webp` | YES ✅ | COMPLETE |
| **Clothing Cube** | `module-clothing.webp` | **NO ❌** | **MISSING** |
| Document Sleeve | `module-document.webp` | YES ✅ | COMPLETE |
| Bottle Holder | `module-bottle.webp` | YES ✅ | COMPLETE |
| Rain Cover | `module-rain.webp` | YES ✅ | COMPLETE |

---

## Slot Count Summary

| Page | Total Slots | Complete | Missing/Placeholder | Size Mismatch |
|------|-------------|----------|---------------------|---------------|
| index.html | 13 | 4 | 5 (placeholders) | 4 |
| product.html | 3 | 0 | 0 | 3 |
| shop.html | 19 | 17 | 2 | 0 (mild only) |
| about.html | 5 | 1 | 4 | 0 |
| sustainability.html | 1 | 1 | 0 | 0 |
| tribe.html | 15 | 0 | 15 | 0 |
| modules.html | 8 | 7 | 1 | 0 |
| **TOTAL** | **64** | **30** | **27** | **7** |

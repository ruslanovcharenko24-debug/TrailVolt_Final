# TrailVolt — Unresolved Visual Gaps

*Created: April 2026. Focused list of all unresolved visual problems.*

---

## CRITICAL PRIORITY

---

### GAP-01 — pack-trail-slate.webp: Wrong Module System
- **Page:** shop.html
- **Section:** Trail Line pack cards
- **File expected:** `assets/images/pack-trail-slate.webp`
- **Problem type:** Wrong composition (MOLLE webbing instead of front-face slot rail)
- **Current state:** `ai-assets/images/followup/pack-trail-slate.webp` exists but NOT promoted — SVG fallback showing on site
- **Priority: CRITICAL**
- **Why it matters:** Trail line has 3 colourways — Forest Green and Core Black are live. Slate Grey shows a broken SVG placeholder. The product line appears incomplete in the shop. Additionally, the existing generated version misrepresents the core TrailVolt product differentiator (slot rail system).
- **Image type needed:** Studio product — Trail 28L Slate Grey, front-face horizontal slot rail clearly visible, no MOLLE webbing, no copper/orange zip
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1536×1024 (3:2) for shop card slot (4:3 container, mild crop acceptable)

---

### GAP-02 — module-clothing.webp: Wrong Hardware
- **Page:** shop.html + modules.html
- **Section:** Modules section
- **File expected:** `assets/images/module-clothing.webp`
- **Problem type:** Wrong attachment hardware (handle loop instead of rail clip); no compression visible
- **Current state:** `ai-assets/images/followup/module-clothing.webp` exists but NOT promoted — SVG showing on both pages
- **Priority: CRITICAL**
- **Why it matters:** Clothing Cube is the only module missing a webp on both shop.html and modules.html. Creates visible product gap. Wrong hardware misrepresents the modular attachment system — same core brand failure as pack-trail-slate.
- **Image type needed:** Module card — Clothing Cube with compression zip on front face, rail attachment clip (not handle loop) visible on back, square matte black case
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1536×1024 (3:2)

---

## HIGH PRIORITY

---

### GAP-03 — product-everyday.webp / product-travel.webp / product-trail.webp: Square in Portrait Slot
- **Page:** product.html
- **Section:** Product configurator main image panel
- **Files:** `product-everyday.webp`, `product-travel.webp`, `product-trail.webp`
- **Problem type:** Wrong dimensions — 1024×1024 (1:1) in `aspect-ratio: 3/4` container
- **Current state:** Files exist and are active but display cropped (25% lost from top/bottom)
- **Priority: HIGH**
- **Why it matters:** The product configurator is the highest-conversion page on the site. Pack handles at top and base at bottom are likely cut off. The pack appears truncated in the most important commercial slot. All three line variants have this problem.
- **Image type needed:** Studio product — same composition as current but regenerated at 1024×1536 portrait format
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1024×1536 (portrait 2:3) — matches slot 3:4 better than current 1:1
- **HTML update needed:** No — `src` paths stay the same, only files change

---

### GAP-04 — pack-detail-material.webp: Square in Portrait Slot
- **Page:** index.html
- **Section:** Feature showcase
- **File:** `assets/images/pack-detail-material.webp`
- **Problem type:** Wrong dimensions — 1024×1024 (1:1) in `aspect-ratio: 3/4` container
- **Current state:** Active but crops ~25% from top and bottom
- **Priority: HIGH**
- **Why it matters:** The feature-showcase section is meant to communicate premium material quality through a close-up detail shot. Significant crop may be cutting the zipper detail at bottom or the module rail at top — the exact elements that prove TrailVolt quality.
- **Image type needed:** Material close-up macro — same content but regenerated at 1024×1536
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1024×1536 (portrait)

---

### GAP-05 — tribe.html tribe-aoife/marco/sarah: Generated But Not Promoted
- **Page:** tribe.html
- **Section:** Tribe member cards (6 cards)
- **Files:** `tribe-aoife.webp`, `tribe-marco.webp`, `tribe-sarah.webp`
- **Problem type:** Files exist in `ai-assets/images/master/` but were never copied to `assets/images/`
- **Current state:** SVG placeholder showing for 3 of 6 tribe members
- **Priority: HIGH**
- **Why it matters:** Tribe page shows 6 community member cards. 3 already have images generated. These are an immediate zero-cost win — no regeneration needed, just file copy. Without promotion the page looks broken.
- **Fix type: FILE_COPY_ONLY**
- **Source:** `ai-assets/images/master/tribe-aoife.webp` → `assets/images/tribe-aoife.webp` (×3)

---

### GAP-06 — tribe.html tribe-tomas/nadia/james: Not Generated
- **Page:** tribe.html
- **Section:** Tribe member cards
- **Files:** `tribe-tomas.webp`, `tribe-nadia.webp`, `tribe-james.webp`
- **Problem type:** Missing file — no webp generated anywhere
- **Current state:** SVG placeholder showing
- **Priority: HIGH**
- **Why it matters:** Tribe page is entirely SVG/placeholder state. Blocking full tribe page completion.
- **Image type needed:** Lifestyle portrait — head/shoulders or 3/4 shot of person with pack, 400×200 (2:1) crop-safe composition
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1536×1024 (3:2) or 1024×512 — tribe card is fixed 200px height × ~400px width

---

### GAP-07 — tribe.html UGC grid: All 9 Missing
- **Page:** tribe.html
- **Section:** UGC gallery (#TrailVoltTribe)
- **Files:** ugc-aoife-cliffs, ugc-marco-airport, ugc-sarah-cycling, ugc-tomas-trail, ugc-nadia-amsterdam, ugc-james-london, ugc-modules-flat, ugc-pack-mountain, ugc-pack-overhead
- **Problem type:** No webp files generated anywhere — all 9 slots SVG
- **Current state:** 9 SVG placeholders in 3×3 grid
- **Priority: HIGH** (tribe page has zero real images — page appears entirely unfinished)
- **Image type needed:** Lifestyle photography — UGC-style, person in real environment with pack visible, square crop (1:1)
- **Fix type: REGENERATION_NEEDED**
- **Target ratio:** 1024×1024 (square) for 300×300 slot

---

### GAP-08 — about.html: 4 Missing Images
- **Page:** about.html
- **Section:** Photo grid 3 (wicklow/workshop-early/airport) + process section (workshop)
- **Files:** `about-wicklow.webp`, `about-workshop-early.webp`, `about-airport.webp`, `about-workshop.webp`
- **Problem type:** No webp files generated — SVG fallbacks showing
- **Current state:** All 4 showing SVG placeholders
- **Priority: HIGH** (about page is 20% visually complete — only founder portrait is live)
- **Image type needed:**
  - about-wicklow: Lifestyle/founder — person on mountain trail testing pack (portrait, 3:4)
  - about-workshop-early: Founder/trust — workshop table with prototype packs (portrait, 3:4)
  - about-airport: Lifestyle — person at airport departure gate with pack (portrait, 3:4)
  - about-workshop: Founder/trust — wider workshop view, stitching/materials in progress (landscape approx 7:6 based on HTML attrs 560×480)
- **Fix type: REGENERATION_NEEDED** (×4)
- **Target ratio:** 3 × portrait 1024×1536 (wicklow, workshop-early, airport) + 1 × landscape 1024×768 (workshop)

---

## MEDIUM PRIORITY

---

### GAP-09 — hero-pack-main.webp: Square in Portrait Slot
- **Page:** index.html
- **Section:** Hero split — product image
- **File:** `assets/images/hero-pack-main.webp`
- **Problem type:** 1024×1024 (1:1) in `aspect-ratio: 3/4` container
- **Current state:** Active, cropped 25% from top/bottom
- **Priority: MEDIUM** (hero is visible, product is recognisable, just not ideally framed)
- **Fix type: REGENERATION_NEEDED** — regenerate at 1024×1536
- **HTML update needed:** No

---

### GAP-10 — line-card-everyday.webp: Square in Landscape Slot
- **Page:** index.html
- **Section:** Choose Your Line — Everyday card
- **File:** `assets/images/line-card-everyday.webp`
- **Problem type:** 1024×1024 (1:1) in `aspect-ratio: 4/3` container
- **Current state:** Active, side-cropped
- **Priority: MEDIUM** (card is functional, lifestyle scene may be centered enough)
- **Fix type: REGENERATION_NEEDED** — regenerate at 1536×1024
- **HTML update needed:** No

---

### GAP-11 — modular-system-diagram.webp: Square in Portrait Slot
- **Page:** index.html
- **Section:** The Module System
- **File:** `assets/images/modular-system-diagram.webp`
- **Problem type:** 1024×1024 (1:1) in `aspect-ratio: 4/5` container
- **Current state:** Active, sides cropped (~11%)
- **Priority: MEDIUM** (diagram likely centred, may survive crop)
- **Fix type: REGENERATION_NEEDED** — regenerate at 1024×1280 (4:5)
- **HTML update needed:** No

---

### GAP-12 — index.html: 5 Tribe Placeholder Boxes
- **Page:** index.html
- **Section:** Community / Tribe section (homepage preview)
- **Current state:** 5 `.tribe-photo__inner` divs with text labels — no `<img>` elements at all
- **Priority: MEDIUM** (homepage community section shows empty dark boxes with text)
- **Fix type: REGENERATION_AND_HTML_UPDATE** — need lifestyle images + HTML injection into placeholder divs
- **Image type needed:** Lifestyle — similar to UGC style (people with packs in urban/trail/travel settings)
- **Note:** These are a DIFFERENT set from tribe.html tribe-cards. These are homepage community teaser photos.

---

## LOW PRIORITY

---

### GAP-13 — sustainability.html: Additional Image Slots
- **Page:** sustainability.html
- **Section:** Materials, lifecycle, packaging sections
- **Current state:** Only 1 image (sustainability-repair.webp) active. All other content is text/icons.
- **Priority: LOW** — page has 1 working image, remaining content is text-based, no broken slots
- **Fix type:** N/A for now — assess if additional image slots should be added to the page

---

## Gap Count by Priority

| Priority | Count |
|----------|-------|
| CRITICAL | 2 |
| HIGH | 6 |
| MEDIUM | 4 |
| LOW | 1 |
| **TOTAL** | **13** |

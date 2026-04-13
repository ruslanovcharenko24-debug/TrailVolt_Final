# TrailVolt — Final Visual Audit Summary

*Created: April 2026. Master summary of full visual audit.*

---

## 1. TOTAL VISUAL SLOTS ACROSS THE SITE

**64 total visual slots** across 7 pages (index, product, shop, about, sustainability, tribe, modules).

---

## 2. COMPLETE SLOTS

**30 complete** — webp file exists, is active, and has acceptable fit.

---

## 3. INCOMPLETE SLOTS

**34 incomplete**, broken down as:
- 15 MISSING (no webp generated anywhere)
- 9 SVG_FALLBACK (generated in ai-assets but never promoted)
- 5 PLACEHOLDER (no `<img>` element at all — homepage tribe section)
- 7 SIZE_MISMATCH (file active but significant dimension crop)

---

## 4. PLACEHOLDERS

**5 placeholders** — index.html tribe section. These are CSS gradient divs with text labels; no `<img>` or `<picture>` elements present.

---

## 5. IMAGES NEEDING REGENERATION

**21 images** need regeneration before their slots can be called complete:

**Wrong ratio (existing images — HIGH urgency):**
- `product-everyday.webp` — regen at 1024×1536
- `product-travel.webp` — regen at 1024×1536
- `product-trail.webp` — regen at 1024×1536
- `pack-detail-material.webp` — regen at 1024×1536

**Wrong composition (generated but rejected):**
- `pack-trail-slate.webp` — regen (MOLLE webbing, copper zip)
- `module-clothing.webp` — regen (handle instead of rail clip)

**Not yet generated:**
- `about-wicklow.webp`
- `about-workshop-early.webp`
- `about-airport.webp`
- `about-workshop.webp`
- `tribe-tomas.webp`
- `tribe-nadia.webp`
- `tribe-james.webp`
- `ugc-aoife-cliffs.webp`
- `ugc-marco-airport.webp`
- `ugc-sarah-cycling.webp`
- `ugc-tomas-trail.webp`
- `ugc-nadia-amsterdam.webp`
- `ugc-james-london.webp`
- `ugc-modules-flat.webp`
- `ugc-pack-mountain.webp`
- `ugc-pack-overhead.webp`

**Medium urgency dimension fixes:**
- `hero-pack-main.webp` — regen at 1024×1536
- `line-card-everyday.webp` — regen at 1536×1024
- `modular-system-diagram.webp` — regen at 1024×1024 with safe margins (or 1024×1280 if available)

---

## 6. IMAGES NEEDING HTML CHANGES

**2 HTML updates needed** beyond file work:
1. **index.html tribe section** (5 placeholder divs) — needs `<img>` elements wired into `.tribe-photo__inner` divs after images are generated
2. **No other HTML changes needed** — all other slots already use `<picture>` with `.webp` srcset wired; file copy alone activates them

---

## 7. TEN MOST IMPORTANT UNRESOLVED VISUAL ISSUES

**Ranked by commercial impact + page visibility:**

1. **Product configurator images wrong ratio** (product.html) — All 3 line images are 1:1 in a 3:4 portrait slot. The highest-conversion page on the site shows cropped packs. Pack tops/bottoms cut off. Revenue impact.

2. **pack-trail-slate.webp missing + wrong composition** (shop.html) — Trail line is the flagship outdoor product. The Slate Grey colourway shows a broken SVG placeholder AND the existing generated version misrepresents the product with MOLLE webbing.

3. **module-clothing.webp missing + wrong hardware** (shop.html + modules.html) — The Clothing Cube is the only module missing a webp across two pages. Wrong hardware was generated (handle vs rail clip).

4. **tribe.html = 0% complete** — Entire tribe page shows SVG placeholders. Social proof section is completely broken. 3 images are already generated and waiting in ai-assets (aoife/marco/sarah) — trivially easy to fix partially.

5. **pack-detail-material.webp wrong ratio** (index.html feature showcase) — The premium material proof shot is 1:1 in a 3:4 slot, cropping ~25% from top/bottom. The zipper detail and rail slots — the precise visual proof of quality — may be cut.

6. **about.html 80% incomplete** — Only the founder portrait exists. Four story images showing the brand's journey (Wicklow testing, workshop, airport, early prototypes) are all SVG placeholders. About page has zero visual storytelling.

7. **hero-pack-main.webp wrong ratio** (index.html hero) — The very first image a visitor sees is a square pack in a portrait slot. Pack handles at top and feet at bottom may be cropped.

8. **index.html tribe section = 5 placeholders** — Homepage community section shows 5 dark boxes with text labels. No social proof imagery at all on the homepage.

9. **line-card-everyday.webp wrong ratio** (index.html) — Everyday is the lead/entry-level product line. Its line card image is square in a landscape slot — sides cropped.

10. **modular-system-diagram.webp wrong ratio** (index.html) — Core brand explainer image (showing how modules attach) rendered in a portrait slot, cropping the sides of the diagram.

---

## 8. BEST NEXT BATCH TO GENERATE

**Recommended: "Fix Batch" — 11 images in a single targeted generation run**

These 11 images are either CRITICAL fixes or HIGH-VALUE easy wins:

| # | Filename | Why | Size |
|---|----------|-----|------|
| 1 | `pack-trail-slate.webp` | Completes Trail line in shop | 1536×1024 |
| 2 | `module-clothing.webp` | Completes modules on 2 pages | 1536×1024 |
| 3 | `product-everyday.webp` | Fix configurator crop (regen) | 1024×1536 |
| 4 | `product-travel.webp` | Fix configurator crop (regen) | 1024×1536 |
| 5 | `product-trail.webp` | Fix configurator crop (regen) | 1024×1536 |
| 6 | `about-wicklow.webp` | About page portrait 1 of 4 | 1024×1536 |
| 7 | `about-workshop-early.webp` | About page portrait 2 of 4 | 1024×1536 |
| 8 | `about-airport.webp` | About page portrait 3 of 4 | 1024×1536 |
| 9 | `about-workshop.webp` | About page landscape 4 of 4 | 1536×1024 |
| 10 | `tribe-tomas.webp` | Tribe member 4 of 6 | 1536×1024 |
| 11 | `tribe-nadia.webp` | Tribe member 5 of 6 | 1536×1024 |

**Plus immediately before running any generation:**
- FILE COPY (no generation needed): `ai-assets/images/master/tribe-aoife.webp → assets/images/`
- FILE COPY: `ai-assets/images/master/tribe-marco.webp → assets/images/`
- FILE COPY: `ai-assets/images/master/tribe-sarah.webp → assets/images/`

---

## 9. EASIEST WINS

**Immediate zero-cost wins (file copy only):**
1. `tribe-aoife.webp` — copy from master → instant improvement on tribe.html
2. `tribe-marco.webp` — copy from master → instant improvement on tribe.html
3. `tribe-sarah.webp` — copy from master → instant improvement on tribe.html

**One-regeneration wins (single image, high impact):**
4. `pack-trail-slate.webp` — completes entire Trail line in shop
5. `module-clothing.webp` — completes all modules across 2 pages
6. `tribe-james.webp` — completes the 6th tribe member (3 already have images)

---

## 10. HIGHEST COMMERCIAL PRIORITIES

**Ranked purely by revenue/conversion impact:**

1. **product.html configurator images** — the configurator is where purchases happen; cropped pack images directly hurt conversion
2. **shop.html pack-trail-slate + module-clothing** — every missing product card is a potential lost sale
3. **index.html hero crop fix** — first image a user sees; quality signal for the brand
4. **index.html feature-showcase crop fix** — material quality proof shot is a trust signal
5. **tribe.html** — social proof is a conversion driver; zero real images = zero credibility

---

## RECOMMENDED NEXT PROMPT INPUT

The section below is written to directly inform the next image generation prompt.

---

### Next Generation Batch — "fix-wave"

**Batch name:** `fix-wave`
**Output dir:** `ai-assets/images/fix-wave/`
**Prompts file:** `image-prompts-fix-wave.json`
**Script flag:** `--fix-wave`

---

#### Image 1: `pack-trail-slate.webp`
- **Page:** shop.html — Trail Line / Slate Grey colourway card
- **Role:** Studio product card — Trail 28L Slate Grey
- **Issue being fixed:** Previous version had MOLLE webbing instead of front-face slot rail, plus copper zip accent
- **Required:** Trail 28L in Slate Grey (#607D8B, cool grey-blue), 3/4 angle, dark navy background. Module attachment rail is a HORIZONTAL STRIP of machined rectangular slots on the FRONT FACE of the pack — not webbing, not straps, not side-mounted. Badge: woven fabric patch, sage-green thread on darker green or grey ground, small and integrated. Zip: YKK in matte black or dark gunmetal — NO copper, NO orange.
- **Negative:** MOLLE webbing, PALS webbing, side straps, tactical straps, orange zip, copper zip, brown zip, floating logo
- **Ratio:** 1536×1024

#### Image 2: `module-clothing.webp`
- **Page:** shop.html + modules.html — Modules section / Clothing Cube card
- **Role:** Module card — Clothing Organizer Cube
- **Issue being fixed:** Previous version had a metallic handle loop instead of a rail attachment clip, and no compression visible
- **Required:** Square matte black cube, 1536×1024, dark navy background. Front face has a compression zip that visually suggests packing tension (stitching slightly raised or visible bulge). Back face or side has a rail attachment clip — stainless rectangular clip mechanism, NOT a handle, NOT a loop, NOT webbing. The clip is a flat horizontal sliding mechanism. No text on the cube.
- **Negative:** handle, loop, carry handle, top handle, webbing strap, logo watermark, text on fabric
- **Ratio:** 1536×1024

#### Image 3: `product-everyday.webp` (REGEN — PORTRAIT)
- **Page:** product.html — configurator main image (Everyday line default)
- **Role:** Studio product — full-height portrait for 3:4 slot
- **Issue being fixed:** Previous was 1:1 square, cropped 25% in portrait slot
- **Required:** Everyday 22L Core Black, near-frontal angle with 10–15 degree tilt. FULL PACK visible from top handle to base feet, with breathing room above and below — pack must not be cropped by frame. Aluminium nameplate badge on upper-right front panel. Module rail visible. Dark navy background. Mint glow at base.
- **Ratio:** 1024×1536
- **Critical:** The pack top handle AND the pack base must both be fully within the frame with margin. The 1024×1536 format leaves room for this.

#### Image 4: `product-travel.webp` (REGEN — PORTRAIT)
- **Page:** product.html — configurator main image (Travel line)
- **Role:** Studio product — full-height portrait for 3:4 slot
- **Required:** Travel 30L, Core Black preferred (or Slate Grey). Taller, more rectangular form than Everyday. FULL PACK visible top to base with margin. Same aluminium nameplate, module rail, dark navy background, mint glow. Clamshell side zip subtly visible.
- **Ratio:** 1024×1536

#### Image 5: `product-trail.webp` (REGEN — PORTRAIT)
- **Page:** product.html — configurator main image (Trail line)
- **Role:** Studio product — full-height portrait for 3:4 slot
- **Required:** Trail 28L Forest Green (#2D5016). FULL PACK visible top to base with margin. Woven fabric badge in sage-green thread. More rugged/technical silhouette. Module rail horizontal slots on front face. Dark navy background.
- **Ratio:** 1024×1536

#### Image 6: `about-wicklow.webp`
- **Page:** about.html — photo grid (portrait slot 1 of 3)
- **Role:** Lifestyle/founder — outdoor testing, brand origin story
- **Required:** Single person (founder figure, dark-haired male, 30s, practical outdoor clothing) carrying an early TrailVolt prototype pack — matte black or navy fabric — on a mountain trail in green Irish highland terrain (Wicklow Mountains: dark heather, granite boulders, overcast sky). Pack visible and recognisable. Candid/documentary feel.
- **No text on pack or in image**
- **Ratio:** 1024×1536 (portrait for .portrait-img slot)

#### Image 7: `about-workshop-early.webp`
- **Page:** about.html — photo grid (portrait slot 2 of 3)
- **Role:** Founder/trust — early prototype stage, product origin
- **Required:** Workshop table top-down or slight angle view. Multiple early pack prototype panels in various states — deconstructed fabric sections, rolled nylon, YKK zippers laid flat, pencil sketches or pattern papers. Hands visible (optional). No current finished product — this is the early stage. Warm workshop lighting (tungsten/daylight mix).
- **Ratio:** 1024×1536

#### Image 8: `about-airport.webp`
- **Page:** about.html — photo grid (portrait slot 3 of 3)
- **Role:** Lifestyle/founder — the origin moment at Dublin Airport
- **Required:** Person (same founder figure) at a modern airport terminal. Departure gate in background — blurred, bokeh. Person looking forward/to side, wearing a prototype-era or current TrailVolt Travel 30L Slate Grey on their back. Clean and deliberate shot. Sense of movement and purpose.
- **Ratio:** 1024×1536

#### Image 9: `about-workshop.webp`
- **Page:** about.html — process section (landscape slot)
- **Role:** Founder/trust — current workshop, production/quality
- **Required:** Workshop interior — wider environmental shot. Industrial sewing machine prominent, pattern papers or fabric rolls in background, shelves with pack components. Not cluttered — purposeful, premium small-batch production feel. Warm directional lighting. No person required (or partial, hands only).
- **Ratio:** 1536×1024

#### Image 10: `tribe-tomas.webp`
- **Page:** tribe.html — tribe member card (Tomas Rivera, Trail Runner, Pamplona)
- **Role:** Lifestyle portrait — tribe member photo
- **Required:** Active male (late 20s / early 30s, Spanish appearance), trail running gear, TrailVolt Trail 28L Forest Green visible on his back or beside him. Mountain or trail environment background (Pyrenees or similar rocky terrain). Energy and movement.
- **Ratio:** 1536×1024 (tribe card is 200px fixed height, 3:2 fills safely)

#### Image 11: `tribe-nadia.webp`
- **Page:** tribe.html — tribe member card (Nadia Voronova, Freelance Developer, Amsterdam)
- **Role:** Lifestyle portrait — tribe member photo
- **Required:** Female (late 20s, Eastern European appearance), working at a café or co-working space. TrailVolt Everyday 22L Slate Grey on chair beside her or on her back. Amsterdam or generic European urban café environment. Laptop, coffee. Bright natural window light.
- **Ratio:** 1536×1024

---

**After generating fix-wave batch:**
- Review all 11 images
- Promote approved images to `assets/images/`
- Copy tribe-aoife/marco/sarah from master immediately (zero cost)
- HTML update only for index.html tribe placeholders (after tribe images are ready)

# TrailVolt — Logo Placement Strategy

*Created: April 2026. Based on visual inspection of all generated images.*
*Source folders assessed: ai-assets/images/master/ (16 images), ai-assets/images/final/ (4 images), ai-assets/images/ root (2 relevant images)*

---

## Decision Framework

| Category | Logo Decision | Reasoning |
|----------|--------------|-----------|
| Studio product shots (clean background) | REQUIRED | Primary commercial assets — logo = authenticity mark |
| System / modular diagrams | REQUIRED | Marketing/shop use — brand ownership needed |
| Module product cards | REQUIRED | Individual product commerce assets |
| Shop bundles / hero flatlays | REQUIRED | Highest-visibility shop assets |
| Lifestyle (city/travel/trail) — person prominent | NOT RECOMMENDED | Overcrowds editorial feel; lifestyle images must breathe |
| Tribe portraits | NOT RECOMMENDED | Documentary authenticity is the point — logo kills it |
| Founder portrait | NOT RECOMMENDED | Same reasoning as tribe — must feel real |
| Detail close-ups WITH baked AI text | NOT RECOMMENDED | AI-generated text already present — competing marks |
| Documentary knolling / repair hardware | OPTIONAL | Gear-focused still life; brand mark adds authenticity if tasteful |

---

## Image-by-Image Decisions

### From `ai-assets/images/master/`

---

#### `shop-bundles.webp` — **REQUIRED**
- **Visual**: Dark navy studio flatlay of the full TrailVolt system — Core Pack centre with 4 modules arranged around it, electric mint connection lines
- **Reason**: Highest-priority shop marketing asset. System diagram-level composition. Clearly staged as commercial material.
- **Placement**: Bottom-right corner
- **Size ratio**: 17% of image width (~260px on 1536w image)
- **Opacity**: 90%
- **Background handling**: Dark navy — use white logo variant
- **Note**: Mint connection lines in image centre — corner placement is safe and unobstructed

---

#### `pack-travel-black.webp` — **REQUIRED**
- **Visual**: Clean studio 3/4-angle shot of Travel 30L in Core Black. No text. Dark navy background, subtle moody lighting.
- **Reason**: Shop product card asset. Clean studio — exactly where a premium brand mark belongs.
- **Placement**: Bottom-right corner
- **Size ratio**: 17% (~260px on 1536w)
- **Opacity**: 90%
- **Background handling**: Dark — white logo
- **Note**: Pack occupies centre-left; bottom-right corner is clear negative space

---

#### `pack-everyday-slate.webp` — **REQUIRED**
- **Visual**: Frontal studio shot of Everyday 22L in Slate Grey. Module rail clearly visible as horizontal element. No text. Clean.
- **Reason**: Shop product card. Module rail is the key visual differentiator — logo confirms brand ownership.
- **Placement**: Bottom-right corner
- **Size ratio**: 17% (~260px on 1536w)
- **Opacity**: 90%
- **Background handling**: Dark grey-blue — white logo
- **Note**: Frontal composition, pack centred, corners are open

---

#### `product-everyday.webp` — **REQUIRED**
- **Visual**: Square 1024×1024, near-frontal studio shot. Core Black. Module rail slots strongly visible. Subtle electric mint glow behind pack. No text.
- **Reason**: Primary product configurator asset. Most prominent individual product image. Logo essential.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (~205px on 1024w square)
- **Opacity**: 90%
- **Background handling**: Very dark — white logo
- **Note**: Square format — slightly larger logo ratio appropriate; mint glow is behind pack, bottom-right is clear

---

#### `module-phone.webp` — **REQUIRED**
- **Visual**: Clean studio shot of Phone Module (black case with flap, snap button, hint of green phone edge). Dark navy background.
- **Reason**: Module product card. Individual commerce asset.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (~205px on 1024w)
- **Opacity**: 88%
- **Background handling**: Dark — white logo
- **Note**: Module occupies centre; corners are clean

---

#### `module-tech.webp` — **REQUIRED**
- **Visual**: Tech Cable Organizer shown open at 3/4 angle — cables, adapters, pen, elastic loops visible. Clean studio, dark navy.
- **Reason**: Module product card asset.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (~205px on 1024w... wait, this is likely 1536×1024 landscape — use 17%)
- **Opacity**: 88%
- **Background handling**: Dark — white logo

---

#### `module-power.webp` — **REQUIRED**
- **Visual**: Extreme close-up of Power Bank module — matte black, USB-A + USB-C ports, three electric mint LED indicator dots. Near-square or portrait crop.
- **Reason**: Module product card. The mint LED dots are the brand's "Volt" visual literalism — this is a signature product shot.
- **Placement**: Bottom-right corner
- **Size ratio**: 20%
- **Opacity**: 88%
- **Background handling**: Dark — white logo
- **Note**: Mint dots in lower-left of module — logo in bottom-right is compositionally separated

---

#### `module-bottle.webp` — **REQUIRED**
- **Visual**: Bottle Holder Module with steel thermos bottle installed. Dark navy background. Module attachment clip visible. Clean.
- **Reason**: Module product card asset.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (if 1024×1024) or 17% (if 1536×1024)
- **Opacity**: 88%
- **Background handling**: Dark — white logo

---

#### `sustainability-repair.webp` — **OPTIONAL (include)**
- **Visual**: Hardware flat lay / knolling shot — YKK zipper pulls, buckle, thread reel, nylon swatch, adjustment hardware. Very dark teal/navy background. Precise, minimal layout.
- **Reason**: Gear-focused editorial. The YKK-branded zipper pull in the image already signals quality hardware — a logo overlay in the bottom corner reinforces brand ownership without overcrowding.
- **Placement**: Bottom-right corner (clear space below and right of the hardware arrangement)
- **Size ratio**: 17% (~260px if 1536w, or 20% if 1024×1024)
- **Opacity**: 85% (slightly softer — editorial rather than product catalogue feel)
- **Background handling**: Dark — white logo
- **Note**: Logo placement here says "we made these quality decisions" — appropriate for sustainability page use

---

#### `tribe-marco.webp` — **OPTIONAL (include)**
- **Visual**: Male traveller mid-stride in bright airport terminal (Barcelona El Prat). Slate grey pack. Man facing forward-left. FIDS boards visible (D15/D14).
- **Reason**: The only tribe image where subtle branding is defensible — Marco is depicted as a "power user" archetype, and the airport terminal interior has enough ambient light and clear sky/wall space in the upper-right background.
- **Placement**: Bottom-right corner (terminal floor visible, minimal clutter)
- **Size ratio**: 14% — smaller than usual, lifestyle context demands restraint
- **Opacity**: 75% — deliberately softer on lifestyle imagery
- **Background handling**: Light terminal floor / bright — dark logo variant appropriate
- **Note**: If the dark logo reads poorly after rendering, drop tribe-marco from branded output — do not force it

---

#### `pack-trail-forest.webp` — **NOT RECOMMENDED**
- **Visual**: Studio shot of Trail 28L in Forest Green. **AI has baked "TRAILVOLT" text directly onto the pack face** (white embossed text visible on upper chest area).
- **Reason**: AI-generated text on the pack body conflicts directly with a logo overlay. Two competing brand marks would look unprofessional. Additionally, the baked-in text is AI-rendered (imperfect quality) — this image needs to be flagged as potentially unsuitable for production use regardless of logo.
- **Decision**: NOT RECOMMENDED — skip branding; flag for visual re-review before site use

---

#### `pack-detail-material.webp` — **NOT RECOMMENDED**
- **Visual**: Extreme close-up of ballistic nylon weave + module rail + YKK zipper pull. **AI has baked "TrailVolt" + "CORE BLACK" text in the bottom-right corner** (appears as rendered wordmark overlay).
- **Reason**: Bottom-right is exactly where the logo would be placed — a second logo mark would collide. More critically, the AI-baked text is not the real logo and should not coexist with the real one. This image may not be suitable for production use.
- **Decision**: NOT RECOMMENDED — skip branding; flag for re-generation or crop

---

#### `line-card-trail.webp` — **NOT RECOMMENDED**
- **Visual**: Lifestyle hiking shot — male figure from behind, Wicklow Mountains moody sky, pack on his back. No text on pack (PASSED critical check).
- **Reason**: Documentary lifestyle composition. Logo would feel commercial and forced on a pure environmental shot. This image works because it feels authentic — a brand mark would undermine exactly what makes it effective.
- **Decision**: NOT RECOMMENDED — leave clean for site use

---

#### `line-card-travel.webp` — **NOT RECOMMENDED**
- **Visual**: Airport terminal lifestyle — male traveller from behind, mid-stride, slate grey pack. Bright interior, yellow FIDS signs.
- **Reason**: Same reasoning as trail — documentary lifestyle shot. Logo is inappropriate. The yellow airport signage already creates enough visual noise in the composition.
- **Decision**: NOT RECOMMENDED — leave clean

---

#### `tribe-aoife.webp` — **NOT RECOMMENDED**
- **Visual**: Wild Atlantic Way coastal landscape — woman on cliff path, ocean + sea stacks behind, brooding sky. Panoramic feel.
- **Reason**: Documentary/landscape. This image must feel like a real person on a real cliff in real weather — not a branded campaign asset. Logo would instantly commercialise it and destroy the emotional effect.
- **Decision**: NOT RECOMMENDED

---

#### `tribe-sarah.webp` — **NOT RECOMMENDED**
- **Visual**: Dublin Georgian terrace street — woman cycling, black helmet, black pack, golden hour light. Cyclist lifestyle shot.
- **Reason**: Tribe portrait / lifestyle. Same as aoife — must remain documentary-clean.
- **Decision**: NOT RECOMMENDED

---

### From `ai-assets/images/final/`

---

#### `hero-pack-main.webp` — **REQUIRED**
- **Visual**: Clean studio frontal/near-frontal shot of Core Pack in Core Black. Dark navy background. No text. Module rail visible.
- **Reason**: Primary hero product asset — highest-visibility single product image on the site. Logo is essential.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (~205px — this appears to be 1024×1024 square-ish)
- **Opacity**: 90%
- **Background handling**: Dark — white logo

---

#### `modular-system-diagram.webp` — **REQUIRED**
- **Visual**: Top-down flatlay of full modular system — pack centre with 7+ modules arranged around it, electric mint connection lines radiating out.
- **Reason**: Core marketing asset — the modular system visualised. Used across shop, homepage. Needs brand ownership.
- **Placement**: Bottom-right corner
- **Size ratio**: 20% (~205px on 1024w)
- **Opacity**: 88%
- **Background handling**: Dark — white logo

---

#### `pack-everyday-black.webp` — **REQUIRED**
- **Visual**: Studio 3/4-angle shot of Everyday 22L in Core Black. Module rail prominently visible as horizontal system element. No text. Strong moody lighting.
- **Reason**: Primary studio product shot. Module rail clearly visible — this is the "hero product card" composition.
- **Placement**: Bottom-right corner
- **Size ratio**: 17% (appears wider/landscape)
- **Opacity**: 90%
- **Background handling**: Dark — white logo

---

#### `about-founder.webp` — **NOT RECOMMENDED**
- **Visual**: Founder at workshop desk — examining module hardware, pencil in hand, laptop open, modules/backpack in foreground. Natural ambient light from window. Authentic working scene.
- **Reason**: Documentary founder portrait. Authenticity is the entire point of this image. Any brand overlay instantly makes it feel like a staged advertisement, not a real founder moment.
- **Decision**: NOT RECOMMENDED — must remain clean

---

### From `ai-assets/images/` (root, pre-master)

---

#### `line-card-everyday.webp` — **NOT RECOMMENDED**
- **Visual**: Dublin Georgian terrace street — woman in blazer walking, black pack, golden hour warmth.
- **Reason**: Lifestyle editorial shot. Same reasoning as other line-card images.
- **Decision**: NOT RECOMMENDED

---

## Summary Table

| Image | Source | Decision | Placement | Logo Variant |
|-------|--------|----------|-----------|--------------|
| `shop-bundles.webp` | master | REQUIRED | bottom-right | white |
| `pack-travel-black.webp` | master | REQUIRED | bottom-right | white |
| `pack-everyday-slate.webp` | master | REQUIRED | bottom-right | white |
| `product-everyday.webp` | master | REQUIRED | bottom-right | white |
| `module-phone.webp` | master | REQUIRED | bottom-right | white |
| `module-tech.webp` | master | REQUIRED | bottom-right | white |
| `module-power.webp` | master | REQUIRED | bottom-right | white |
| `module-bottle.webp` | master | REQUIRED | bottom-right | white |
| `hero-pack-main.webp` | final | REQUIRED | bottom-right | white |
| `modular-system-diagram.webp` | final | REQUIRED | bottom-right | white |
| `pack-everyday-black.webp` | final | REQUIRED | bottom-right | white |
| `sustainability-repair.webp` | master | OPTIONAL ✓ | bottom-right | white |
| `tribe-marco.webp` | master | OPTIONAL ✓ | bottom-right | dark (light bg) |
| `pack-trail-forest.webp` | master | NOT RECOMMENDED | — | — |
| `pack-detail-material.webp` | master | NOT RECOMMENDED | — | — |
| `line-card-trail.webp` | master | NOT RECOMMENDED | — | — |
| `line-card-travel.webp` | master | NOT RECOMMENDED | — | — |
| `tribe-aoife.webp` | master | NOT RECOMMENDED | — | — |
| `tribe-sarah.webp` | master | NOT RECOMMENDED | — | — |
| `about-founder.webp` | final | NOT RECOMMENDED | — | — |
| `line-card-everyday.webp` | root | NOT RECOMMENDED | — | — |

**Total to brand: 13 images** (11 REQUIRED + 2 OPTIONAL)
**Total to skip: 8 images**

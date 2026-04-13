# TrailVolt — Logo Branding Report

*Created: April 2026. Post-execution report for the apply-logo.js pipeline.*
*Pipeline run: 13 images branded, 0 failures, 8 intentionally left unbranded.*

---

## Logo Asset Selected

**`Brand /TrailVolt_logo_primary.png`**
- Format: PNG, RGBA (true alpha transparency)
- Dimensions: 2400 × 1200 px
- Variant used for dark backgrounds: Programmatic white version (RGB channels set to 255, alpha mask preserved)
- Variant used for light backgrounds: Original dark navy version
- Result: Logo renders crisply at all target sizes — triangle mark, "TrailVolt" wordmark, and "ONE PACK. EVERY HORIZON." tagline all legible

---

## Branded Assets (13 images)

### REQUIRED — Studio Product & Diagram Assets (11 images)

| Image | Source | Logo Size | Position | Opacity | Visual Result |
|-------|--------|-----------|----------|---------|---------------|
| `pack-everyday-slate.webp` | master | 261×131px | bottom-right | 90% | Excellent — frontal composition, module rail prominent, logo in clean dark corner |
| `shop-bundles.webp` | master | 261×131px | bottom-right | 90% | Excellent — system flatlay with mint lines, logo in clear negative space |
| `product-everyday.webp` | master | 205×103px | bottom-right | 90% | Strong — square format, module rail slots visible, logo below pack |
| `pack-everyday-black.webp` | final | 261×131px | bottom-right | 90% | Strong — 3/4 angle, module rail prominent, restrained placement |
| `pack-travel-black.webp` | master | 261×131px | bottom-right | 90% | Clean — studio black, moody lighting, logo well-separated from pack |
| `hero-pack-main.webp` | final | 205×103px | bottom-right | 90% | Clean — primary hero product shot, corner placement reads premium |
| `modular-system-diagram.webp` | final | 205×103px | bottom-right | 88% | Clean — mint connection lines central, logo at bottom-right corner |
| `module-power.webp` | master | 300×150px | bottom-right | 88% | Good — mint LED dots on module left, logo at right — zero conflict |
| `module-phone.webp` | master | 300×150px | bottom-right | 88% | Good — module centre-left, logo clear at bottom-right |
| `module-tech.webp` | master | 261×131px | bottom-right | 88% | Good — open organiser composition, logo in clear background |
| `module-bottle.webp` | master | 300×150px | bottom-right | 88% | Good — bottle holder clean composition, logo unobstructed |

### OPTIONAL — Editorial Assets (2 images)

| Image | Source | Logo Size | Position | Opacity | Visual Result |
|-------|--------|-----------|----------|---------|---------------|
| `sustainability-repair.webp` | master | 261×131px | bottom-right | 85% | Effective — hardware knolling has clear dark teal space at bottom-right; logo reinforces brand quality promise |
| `tribe-marco.webp` | master | 215×108px | bottom-right | 75% | Acceptable — dark logo on light airport floor; restrained size/opacity keeps lifestyle authenticity intact; tagline may be hard to read at very small display sizes |

---

## Intentionally Unbranded (8 images)

### Lifestyle / Documentary — No Logo (6 images)

| Image | Reason |
|-------|--------|
| `line-card-trail.webp` | Documentary hiking lifestyle — logo would commercialise a scene that must feel authentic |
| `line-card-travel.webp` | Airport lifestyle — yellow FIDS signage already creates visual noise; logo redundant |
| `tribe-aoife.webp` | Wild Atlantic Way landscape portrait — pure documentary; brand mark destroys emotional weight |
| `tribe-sarah.webp` | Dublin street cycling portrait — tribe imagery must remain editorial-clean |
| `about-founder.webp` | Founder working scene — authenticity IS the asset; logo instantly makes it feel staged |
| `line-card-everyday.webp` | Dublin Georgian street lifestyle — same reasoning as all line-card lifestyle images |

### Problematic AI-Baked Text — Cannot Brand (2 images)

| Image | Issue | Recommended Action |
|-------|-------|--------------------|
| `pack-trail-forest.webp` | AI has baked "TRAILVOLT" text directly onto the pack face (white embossed letters on Forest Green fabric) | **Flag for regeneration** — competing AI text + real logo = unprofessional double-mark; also the baked text is AI-rendered (imperfect quality) |
| `pack-detail-material.webp` | AI has baked "TrailVolt" + "CORE BLACK" text in the bottom-right corner — exactly where the logo would be placed | **Flag for regeneration** — corner text directly blocks logo placement; baked-in text is not the real logo |

> **Critical flag**: These two images should NOT be used on the website in their current form. The AI text is not the real TrailVolt mark. Schedule regeneration with stronger negative prompts: `text overlay, brand name text, wordmark, "TrailVolt" text, CORE BLACK label, embossed lettering, printed words on product`

---

## Visual Quality Assessment

### Strongest Branded Assets (Recommended for Website First)

1. **`pack-everyday-slate.webp`** — Best overall composition for logo overlay. Frontal product shot with visible module rail + white logo at 90% in clean corner = exactly what premium product photography with brand authentication looks like. Strongest single image in the branded set.

2. **`shop-bundles.webp`** — System flatlay with electric mint lines + real logo = the definitive TrailVolt brand statement. Use this on the shop hero section.

3. **`product-everyday.webp`** — Module rail slots clearly visible + logo below pack on dark background. Use for product configurator and as the default product-everyday.webp when this slot is filled.

4. **`pack-everyday-black.webp`** — Best 3/4-angle studio shot with module rail prominent. Ready for homepage hero use after integration.

5. **`modular-system-diagram.webp`** — The modular system diagram branded = the brand's most technically informative asset, now with ownership mark. Use on homepage modular section.

### Acceptable Assets (Secondary Priority)

6. `pack-travel-black.webp` — Solid studio shot. Use for shop Travel product card.
7. `hero-pack-main.webp` — Clean frontal. Works as hero fallback or OG image base.
8. `module-power.webp` — Strongest individual module shot (mint LED dots = brand energy).
9. `sustainability-repair.webp` — Use on sustainability page with logo. Restrained and appropriate.

### Use With Caution

10. `tribe-marco.webp` — Logo acceptable here, but verify it reads correctly at web display size (600-800px wide). If the tagline ("ONE PACK. EVERY HORIZON.") is illegible, downscale the logo further or drop it from this image.

---

## Pipeline Output Summary

```
Logo asset:     Brand /TrailVolt_logo_primary.png (RGBA, 2400×1200)
Logo variants:  White (for dark backgrounds) + Original dark (for light backgrounds)
Output folder:  ai-assets/images/branded/
Manifest:       ai-assets/images/branded/manifest.json

Branded:        13 images ✓
  — REQUIRED:   11 images
  — OPTIONAL:    2 images
Skipped:         8 images (intentional)
Failed:          0 images

package.json:   Updated — "brand:images" script added, "sharp": "^0.33.5" dependency added
```

---

## Recommended Next Steps

1. **Visual review**: Open `ai-assets/images/branded/` in Finder/VS Code and review each file
2. **Prioritise for promotion**: `pack-everyday-slate`, `shop-bundles`, `product-everyday`, `pack-everyday-black`, `modular-system-diagram` are strongest — promote these first
3. **Flag for regeneration**: `pack-trail-forest.webp` and `pack-detail-material.webp` — add stronger anti-text negative prompts
4. **Promote to assets/images/**: Copy approved branded files to `assets/images/` following the integration plan in `prompts/master-image-integration-plan.md`
5. **Do NOT commit. Do NOT push. Do NOT modify website HTML until visual review is complete.**

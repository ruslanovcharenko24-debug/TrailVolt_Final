# TrailVolt — Product Branding Regeneration Report

*Created: April 2026.*
*Supersedes: ai-assets/images/branded/ (watermark overlay approach — deprecated)*
*New output: ai-assets/images/product-regenerated/*

---

## Why This Regeneration Was Necessary

The previous pipeline (`scripts/apply-logo.js`) applied the TrailVolt logo as a composited corner overlay — a floating watermark. This is not how premium product brands represent themselves. The logo must be part of the product object: a physical badge, patch, or nameplate that a real customer could touch.

---

## What Changed

### Phase 1 — Overlay Pipeline Disabled

`scripts/apply-logo.js` has been marked as deprecated in its file header. The `brand:images` npm script still exists for reference but should not be used for any website-facing assets.

### Phase 2 — Prompts Updated

A new prompts file was created: `prompts/image-prompts-product-regen.json`

The `image-prompts-master.json` existing prompts were NOT modified — the regen file is a standalone set of 5 prompts used exclusively for this regeneration run.

**Logo integration language used in each prompt:**

| Image | Logo Element Specified |
|-------|----------------------|
| `pack-everyday-black.webp` | Matte black embossed rubber badge, upper-left front panel, ~40mm wide, tonal against fabric, flush relief |
| `pack-everyday-slate.webp` | Gunmetal grey embossed rubber badge, upper-left front panel, ~40mm wide, slightly darker than slate fabric |
| `pack-travel-black.webp` | Matte black embossed rubber badge, upper-right front panel, ~40mm wide, tonal against black |
| `pack-trail-forest.webp` | Woven fabric badge, upper-left front panel, ~45mm wide, dark green ground with lighter sage-green thread — outdoor heritage construction |
| `product-everyday.webp` | Brushed anodized aluminium nameplate, ~38mm wide, debossed triangle + wordmark, satin finish, 1mm proud of surface — engineering aesthetic matching the module rail |

All prompts explicitly stated: the badge is a physical moulded/woven/machined element — NOT a sticker, NOT a print, NOT a floating overlay.

All prompts' negative prompts explicitly excluded: `watermark overlay, digital text overlay, large printed brand name across pack body, sticker-style logo, floating logo element, text in corners`

### Phase 3 — Generation

- **Script:** `npm run generate:images:product-regen`
- **Mode:** `--product-regen` (new mode added to `generate-images.js`)
- **Prompts file:** `prompts/image-prompts-product-regen.json`
- **Output directory:** `ai-assets/images/product-regenerated/`
- **Model:** gpt-image-1, quality: high
- **Result:** 5 generated, 0 failed

---

## Visual Results — Per Image Assessment

### `pack-everyday-slate.webp` ★★★★★ STRONGEST

The standout result of the entire batch. The TrailVolt badge renders with perfect clarity — inverted triangle above the "TRAILVOLT" wordmark, in a slightly darker tonal gunmetal badge against the slate grey panel. The badge sits flush on the upper-left front panel exactly as specified. Module rail clearly visible as a horizontal element. Colourway is correct: deliberate cool grey-blue, clearly distinct from black. The overall image reads like a Bellroy or Aer product photo — exactly the reference quality tier this project needs.

**Status: Ready to promote to assets/images/ after sign-off.**

---

### `pack-trail-forest.webp` ★★★★☆ MAJOR IMPROVEMENT

Critical fix: the previous master version had "TRAILVOLT" text AI-baked large across the pack face — a brand policy violation. This version has a proper small badge in the upper-left (triangle mark above "TRAILVOLT" wordmark, rendered as a dark panel element). No rogue text anywhere on the pack body. Forest Green colourway correct (#2D5016 deep natural green, not olive). Module rail visible in the lower-mid area. The pack form correctly reads as larger and more technical than the Everyday. The badge reads as a woven/embossed label — consistent with outdoor heritage brand construction.

**Status: Significant improvement. Ready for review. Recommend as the new production version.**

---

### `product-everyday.webp` ★★★★☆ STRONG

Square format, near-frontal. Module rail slots are the dominant feature — 7 rectangular connection slots sharply defined. The TrailVolt nameplate appears just above the module rail, right-of-centre — a small rectangular metallic element consistent with the "precision engineering" brief. The subtle electric mint glow at the base reads correctly (whisper, not shout). This is the strongest configurator image generated so far: the module rail and nameplate together communicate exactly what makes TrailVolt different from a generic backpack.

**Status: Ready to promote to assets/images/ as primary product-everyday.webp.**

---

### `pack-travel-black.webp` ★★★★☆ STRONG

Travel 30L visibly taller and more rectangular than Everyday — scale reads correctly. The badge is rendered on the upper-right front panel (matte black on black — very tonal, subtly visible from the light catching the badge relief). Module rail visible as a horizontal strip in the lower-front area. Clean structured form. The all-black tonal badge approach is aesthetically correct for a premium black product — the brand mark is there for those who look, not announced to those who don't.

**Status: Ready to promote. Use as primary pack-travel-black.webp.**

---

### `pack-everyday-black.webp` ★★★☆☆ GOOD — NOTE

Solid studio shot: 3/4 angle, module rail clearly visible, correct form. The badge on the upper-right panel appears as a very small dark square element — nearly invisible due to the all-black tonal approach (matte black badge on matte black fabric). This is aesthetically premium but the badge identity (triangle + wordmark) may not be clearly readable even at close inspection. The image is usable and correct in spirit, but compared to the slate grey version where the badge reads clearly, the black-on-black version communicates brand presence through product quality alone rather than through a legible mark.

**Note**: If clearer badge visibility is required for black colourway, consider re-generating with a specification for a subtle gunmetal grey badge (slightly off-black) rather than same-tone black badge.

**Status: Usable. Consider a minor re-generation pass if badge legibility is a priority for black colourway.**

---

## Comparison: Before vs After

| Image | Before (master/) | After (product-regenerated/) |
|-------|-----------------|------------------------------|
| `pack-trail-forest.webp` | "TRAILVOLT" AI-text baked large across pack face — unusable | Small badge upper-left, no body text — correct |
| `pack-everyday-slate.webp` | No logo present | Clear tonal rubber badge, upper-left — excellent |
| `pack-travel-black.webp` | No logo present | Subtle matte badge upper-right — correct |
| `pack-everyday-black.webp` | No logo present | Very tonal dark badge — present but subtle |
| `product-everyday.webp` | No logo present | Small aluminium nameplate above module rail — correct |

---

## Pipeline Changes Made

| File | Change |
|------|--------|
| `scripts/apply-logo.js` | Marked as DEPRECATED in file header — watermark approach |
| `scripts/generate-images.js` | Added `--product-regen` mode (new flag, new prompts path, new output dir) |
| `package.json` | Added `generate:images:product-regen` and `generate:images:product-regen:force` scripts |
| `prompts/image-prompts-product-regen.json` | NEW — 5 product-integrated branding prompts |
| `ai-assets/images/product-regenerated/` | NEW directory — 5 regenerated images + manifest.json |

---

## Recommended Priority for Promotion

1. **`pack-everyday-slate.webp`** — Promote first. Strongest logo integration result.
2. **`product-everyday.webp`** — Promote to product configurator slot.
3. **`pack-trail-forest.webp`** — Promote. Replaces the broken master version.
4. **`pack-travel-black.webp`** — Promote. Solid and correct.
5. **`pack-everyday-black.webp`** — Promote or re-generate for clearer badge.

---

## What NOT to Do

- Do NOT use `scripts/apply-logo.js` for any website assets
- Do NOT use images from `ai-assets/images/branded/` on the website
- Do NOT use `ai-assets/images/master/pack-trail-forest.webp` — it has AI-baked text on the pack body
- Do NOT commit or push anything yet
- Do NOT modify website HTML until visual approval is confirmed

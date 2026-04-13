# TrailVolt — Regeneration Report

*Created: April 2026. All decisions grounded in brand-visual-foundation.md and direct HTML audit.*

---

## Summary

| Item | Value |
|------|-------|
| **Assets selected for regeneration** | 5 |
| **Prompts file** | `prompts/image-prompts-regeneration.json` |
| **Output directory** | `ai-assets/images/regenerated/` |
| **Original test files** | Preserved in `ai-assets/images/` — NOT overwritten |
| **Command to run** | `npm run generate:images:regenerate` |

---

## The 5 Selected Assets

| Rank | Filename | Page | Section |
|------|----------|------|---------|
| 1 | `hero-pack-main.webp` | index.html | Homepage hero |
| 2 | `modular-system-diagram.webp` | index.html | Modular system explainer |
| 3 | `about-founder.webp` | about.html | Founder story |
| 4 | `pack-everyday-black.webp` | shop.html | Best seller product card |
| 5 | `line-card-trail.webp` | index.html | Trail line card |

---

## Why These 5 Were Selected

### Selection Logic

These 5 assets were chosen because they collectively represent the four brand pillars that must be established before any other image:

1. **Product identity** (`hero-pack-main.webp`) — the brand's handshake. Every visitor sees this. Zero visual identity without it.
2. **Product thesis** (`modular-system-diagram.webp`) — the "aha moment" image. Without it, the modular concept lives only in text, and the entire product differentiator is invisible.
3. **Brand trust** (`about-founder.webp`) — press traffic and first-time buyers need a face. Without this, TrailVolt is an anonymous DTC brand, not a product born from real obsession.
4. **Revenue anchor** (`pack-everyday-black.webp`) — the best-selling product card. A weak image here is a direct, measurable revenue cost.
5. **Audience completeness** (`line-card-trail.webp`) — the Trail line speaks to a distinct buyer segment. Without a strong trail image, that entire segment is unaddressed by any visual asset.

### What Was Left Out and Why

- **line-card-everyday.webp** — was one of the original 3 test images; included in the original test batch but left for Wave 2 to focus on assets not yet attempted properly
- **line-card-travel.webp** — important, but the Travel buyer is well-served by text copy; the Trail buyer has no visual at all without this card
- **product-everyday.webp** — critical configurator image, but requires the hero product shot to exist and be approved first

---

## Weaknesses Being Corrected

### `hero-pack-main.webp` — What Was Wrong

The test output was generated before the brand-visual-foundation.md existed. The original prompt lacked:
- **Module attachment rail** — the front-face connection system that makes TrailVolt visually distinct from any generic backpack. Without this, the image shows a backpack indistinguishable from thousands of others.
- **Nylon texture specificity** — 600D ballistic nylon crosshatch weave is a visible, premium material detail. AI models default to smooth or rubber-like fabric.
- **Mint glow as directional light** — the original prompt likely produced either no mint or an over-saturated colour wash. The new prompt specifies: single low-powered light from behind/below, catching the bottom edge and module rail only.
- **Correct background** — must be pure dark navy (#0B1626), not black, not charcoal, not grey.
- **Proportional accuracy** — 22L has specific proportions. The test output may have produced an oversized or flat pack shape.

### `modular-system-diagram.webp` — What Was Wrong

Generating a clean radial layout of 8 distinct product accessories is one of the most complex image generation tasks in this brief. The test output likely:
- Merged or distorted modules into generic accessory blobs
- Showed fewer than 8 modules or repeated shapes
- Produced mint connection lines as flat graphic arrows instead of photographic light threads
- Lacked the central pack's module attachment rail
- Had an unbalanced or cluttered composition

The new prompt explicitly names and describes all 8 modules by their function and physical appearance, specifies the light-painting aesthetic for connection lines, and demands clean radial spacing.

### `about-founder.webp` — What Was Wrong

The original prompt described a "founder portrait" without sufficient specificity. The test output likely produced:
- A corporate headshot or smiling-at-camera pose
- Generic startup office or clean studio setting — not a Dublin workshop
- No prototype props or material samples
- Perfect, even lighting — the opposite of the candid editorial style required
- Possible AI face artefacts (uncanny valley features, extra fingers near props)

The new prompt specifies: Eastern European appearance, early 30s, mid-task (not posed), Dublin workshop setting with raw materials, natural window light, Monocle-magazine editorial quality.

### `pack-everyday-black.webp` — What Was Wrong

The test version was not in the original 3 test images — it has never been generated. The risks in the original prompt were:
- Generic black backpack without the module attachment rail
- Smooth or plastic-looking nylon rendering
- Plastic-looking YKK pulls
- Incorrect background (grey or black instead of navy)
- Flat, unlit surfaces hiding the material quality

The new prompt specifies: crosshatch weave pattern (2mm spacing), matte gunmetal hardware, three-light setup for texture relief, navy gradient background, 22L proportions.

### `line-card-trail.webp` — What Was Wrong

The original prompt was not in the test 3 — but the risks were clear from brand analysis:
- Alpine terrain default (Alps, Rockies) instead of Irish/Scottish highlands
- Forest Green colourway appearing as black or generic olive
- No module visibility (Bottle Holder Module was not specified)
- Hiker too small in frame, pack barely visible
- Sunshine/clear sky instead of Irish overcast maritime weather

The new prompt specifies: Wicklow Mountains or Wild Atlantic Way terrain, hex code for Forest Green (#2D5016), Bottle Holder Module with water bottle visible, overcast-to-golden-hour lighting, DWR water-bead surface effect.

---

## New Visual Quality Target

Each of the 5 images must pass the following bar before being used on the site:

| Check | Standard |
|-------|----------|
| **Publication quality** | Could appear in Gear Patrol, Monocle, or The Independent without looking like AI |
| **Module rail visible** | In all product shots: the front attachment face is distinguishable as a design feature |
| **Material texture** | Nylon weave is legible — not smooth, not plastic, not rubber |
| **Hardware precision** | YKK pulls read as matte metal hardware — not injection-moulded plastic |
| **Colour accuracy** | Core Black is dark matte, Forest Green is deep #2D5016, Navy is #0B1626 |
| **Mint restraint** | Electric mint appears as a single directional accent — not a colour wash |
| **No AI artefacts** | No distorted zippers, no impossible reflections, no melting hardware |
| **Authentic motion** | Lifestyle shots: subject in motion or at work — never posed, never camera-facing |
| **Environment specificity** | Dublin, Wicklow Mountains, or Wild Atlantic Way — not generic alpine or tropical |

---

## What to Review After Generation

Review the regenerated files in this order:

1. **`hero-pack-main.webp`** — zoom into the front face: is the module attachment rail visible and precise? Is the nylon texture legible? Is the mint glow a subtle edge, not a wash?
2. **`modular-system-diagram.webp`** — count the modules: are all 8 present and distinct? Do the connection lines look photographic or like flat graphic arrows?
3. **`about-founder.webp`** — is the subject looking at the camera? (Should not be.) Does the setting look like a workshop? Are the hands/fingers rendered correctly?
4. **`pack-everyday-black.webp`** — is the module front face visible? Does the nylon have visible weave texture? Is the background dark navy (not grey or black)?
5. **`line-card-trail.webp`** — is the Forest Green clearly green (not black or olive)? Is there a module visible on the pack? Does the terrain look Irish (not alpine)?

If any image fails its primary check, note the failure and it will be targeted for individual re-prompting in the next wave.

---

## Files Created or Updated

| File | Status | Description |
|------|--------|-------------|
| `prompts/regeneration-priority.md` | **Created** | 5 priority assets with commercial/emotional rationale and failure analysis |
| `prompts/image-prompts-regeneration.json` | **Created** | 5 significantly stronger prompts with `what_must_be_improved_vs_test_version` field |
| `scripts/generate-images.js` | **Updated** | Added `--regenerate` flag: reads regeneration prompts, saves to `regenerated/`, separate manifest |
| `package.json` | **Updated** | Added `generate:images:regenerate` npm script |
| `prompts/regeneration-report.md` | **Created** | This file |

---

## Command to Run Next

```bash
npm run generate:images:regenerate
```

This will:
- Read `prompts/image-prompts-regeneration.json` (5 prompts)
- Generate all 5 images using gpt-image-1 at `quality: high`
- Save outputs to `ai-assets/images/regenerated/`
- Create/update `ai-assets/images/regenerated/manifest.json`
- Print regeneration mode terminal output with per-image status
- NOT modify or overwrite any files in `ai-assets/images/`

**Estimated generation time:** 5–10 minutes (1–2 minutes per image at gpt-image-1 high quality)
**Estimated API cost:** ~$0.40–$1.00 per image depending on dimensions and complexity

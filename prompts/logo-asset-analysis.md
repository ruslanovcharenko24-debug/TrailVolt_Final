# TrailVolt — Logo Asset Analysis

*Created: April 2026. For use by the apply-logo.js branding pipeline.*

---

## Files Found in Brand Folder

Location: `Brand /` (note: trailing space in folder name — must be quoted in all shell commands)

| File | Format | Dimensions | Alpha | Usable for Overlay |
|------|--------|------------|-------|--------------------|
| `TrailVolt_logo_primary.png` | PNG | 2400 × 1200 px | YES (RGBA, 4 channels) | **YES — primary choice** |
| `TrailVolt_logo_primary.jpg` | JPEG | 2400 × 1200 px | NO (RGB, 3 channels) | No — no transparency |

---

## Logo Description (Visual Inspection)

- **Mark**: Inverted equilateral triangle, hand-drawn stroke quality, slightly imperfect — authentic rather than perfect
- **Wordmark**: "TrailVolt" in deep navy/grey-blue two-tone; bold weight
- **Tagline**: "ONE PACK. EVERY HORIZON." in tracked uppercase beneath the wordmark
- **Background**: Transparent (RGBA alpha channel)
- **Ink colour**: Deep navy (#0D1B2A) — essentially same colour universe as studio background (#0B1626)
- **Aspect ratio**: 2:1 (landscape)
- **DPI**: 72 dpi (screen-optimised)

---

## Best File for Overlay Use

**`TrailVolt_logo_primary.png`** — the only viable choice:
- Has true RGBA transparency → can be composited directly onto any background
- 2400px wide → can be scaled down to any target size with no quality loss
- JPEG alternative has no transparency → would produce a white box on images

---

## Preprocessing Required

### Problem: Dark Logo on Dark Backgrounds
The logo ink is deep navy (#0D1B2A). Almost all TrailVolt product/studio images use a dark navy background (#0B1626). A dark navy logo on a dark navy background = invisible overlay.

### Solution: Programmatic White Variant
The branding script (`apply-logo.js`) must generate a **white version** of the logo at runtime:
1. Load PNG → extract RGBA raw pixel buffer
2. For all pixels where alpha > 0: set R=255, G=255, B=255 (white)
3. Keep alpha channel unchanged
4. Reconstruct as PNG buffer

This preserves the exact transparency mask of the original logo but renders it in white — clean and crisp against dark studio backgrounds.

### Background Detection Logic
For each target image, sample a 200×200 crop from the bottom-right corner (where the logo will be placed). Calculate average luminance. If luminance < 128: use white logo variant. If luminance ≥ 128: use original dark logo.

In practice, nearly all TrailVolt studio shots will use the white variant. Light-background lifestyle shots (airport, street, coastal) should not receive logo overlays at all.

---

## Recommended Usage Rules

### Dark Backgrounds (Studio / Product / Diagram shots)
- Use: White logo variant
- Opacity: 90%
- Position: Bottom-right corner (most layouts have negative space here)
- Exception: Bottom-left if composition places subject in bottom-right

### Light Backgrounds (Lifestyle / Editorial)
- Logo overlays are NOT recommended on lifestyle images — see placement strategy
- If used: Original dark logo at 70% opacity, bottom corner with clear negative space

### Founder / Tribe Portraits
- NEVER apply logo to founder or tribe portraits — destroys documentary authenticity
- These images must remain clean

---

## Recommended Size Rules

| Image Width | Logo Width (approx) | Logo Height (auto) | Margin from Edge |
|-------------|--------------------|--------------------|------------------|
| 1024px      | 200px              | 100px              | 40px             |
| 1536px      | 260px              | 130px              | 50px             |
| 2400px+     | 320px              | 160px              | 64px             |

**Formula**: `logoWidth = Math.min(Math.round(imageWidth * 0.17), 300)`

**Minimum size**: Never below 120px wide — wordmark becomes illegible
**Maximum size**: Never above 320px wide on any asset — must feel secondary to the product

---

## Recommended Safe Margin from Edges

- **Bottom margin**: 4% of image height (min 36px)
- **Right margin**: 3.5% of image width (min 36px)
- **Clear zone**: Logo must not overlap any product surface, face, or key composition element

---

## Logo Placement Summary

The TrailVolt logo — with its hand-drawn triangle mark and bold wordmark — reads as a mark of quality authentication, not an advertisement. Applied correctly in a bottom corner at restrained scale and 90% opacity, it signals premium brand ownership without dominating the image. Applied incorrectly (too large, centred, on lifestyle/portrait imagery), it undermines the brand's authenticity ethos.

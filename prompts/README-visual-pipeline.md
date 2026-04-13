# TrailVolt Visual Production Pipeline

## Overview

This document describes the AI visual content pipeline prepared for the TrailVolt website.
Generation has **not** yet been triggered. This is the planning and preparation stage only.

---

## Files Created

| File | Purpose |
|------|---------|
| `prompts/visual-map.json` | Full audit of every visual slot across all HTML pages |
| `prompts/image-prompts.json` | Production-ready image generation prompts for OpenAI |
| `prompts/video-prompts.json` | Future video slot definitions for Runway API |
| `prompts/README-visual-pipeline.md` | This file |
| `ai-assets/images/` | Target output directory for generated images |
| `ai-assets/video/` | Target output directory for generated videos |
| `.env` | API key placeholder file (not committed) |

---

## Visual Asset Summary

### Image Slots Found: 40

**Breakdown by page:**

| Page | Image Slots | Priority |
|------|-------------|----------|
| `index.html` | 5 | HIGH — hero, 3 line cards, modular diagram |
| `shop.html` | 10 | HIGH/MEDIUM — 9 product cards + 1 bundle |
| `about.html` | 6 | HIGH/MEDIUM — founder portrait, 4 story photos, workshop |
| `tribe.html` | 15 | MEDIUM/LOW — 6 member portraits, 9 UGC photos |
| `sustainability.html` | 1 | MEDIUM — repair kit visual |
| `product.html` | 3 | HIGH — 3 line configurator images |
| `Social/OG (all pages)` | 4+ | HIGH/MEDIUM — social preview images |

---

### Video Slots Found: 8

| Video | Page | Priority |
|-------|------|---------|
| `hero-pack-reveal.mp4` | index.html | HIGH |
| `hero-modular-snap.mp4` | index.html | HIGH |
| `lifestyle-commute-loop.mp4` | index.html | MEDIUM |
| `lifestyle-trail-hero.mp4` | index.html / tribe.html | MEDIUM |
| `product-pack-360.mp4` | product.html | HIGH |
| `about-workshop-process.mp4` | about.html | MEDIUM |
| `tribe-ugc-collage-reel.mp4` | tribe.html | LOW |
| `sustainability-longevity-visual.mp4` | sustainability.html | LOW |

---

## Pages by Visual Priority

1. **index.html** — Critical. Hero image, three line cards, and modular diagram are above-the-fold with no real images yet. Placeholders currently in use.
2. **product.html** — Critical. Product configurator requires high-quality product images for all three lines.
3. **shop.html** — High. Nine product cards currently using SVG placeholders. Buyers rely on product images to make decisions.
4. **about.html** — High. Founder portrait and story photos are central to brand trust.
5. **tribe.html** — Medium. Member portraits and UGC gallery support social proof.
6. **sustainability.html** — Medium. Repair kit visual supports the longevity narrative.

---

## Recommended Generation Order

Generate in this sequence for maximum early impact:

### Tier 1 — Generate First (highest conversion impact)
1. `hero-pack-main.webp` — Homepage hero product shot
2. `product-everyday.webp` — Everyday line configurator image
3. `product-travel.webp` — Travel line configurator image
4. `product-trail.webp` — Trail line configurator image
5. `pack-everyday-black.webp` — Shop card: Everyday Core Black (best seller)
6. `pack-travel-black.webp` — Shop card: Travel Core Black
7. `pack-trail-black.webp` — Shop card: Trail Core Black
8. `og-index.jpg` — Social preview for homepage sharing

### Tier 2 — Generate Next (brand story and secondary conversions)
9. `about-founder.webp` — Brand trust and founder story
10. `modular-system-diagram.webp` — Explains the core product proposition
11. `line-card-everyday.webp` — Homepage line card
12. `line-card-trail.webp` — Homepage line card
13. `line-card-travel.webp` — Homepage line card
14. `pack-everyday-slate.webp` — Shop card colour variant
15. `pack-everyday-forest.webp` — Shop card colour variant
16. `about-workshop.webp` — Process credibility image

### Tier 3 — Complete (community and supporting content)
17. `sustainability-repair.webp`
18. `about-wicklow.webp`, `about-workshop-early.webp`, `about-airport.webp`
19. Six tribe member portraits (`tribe-*.webp`)
20. Nine UGC gallery images (`ugc-*.webp`)
21. Remaining colour variants and OG images

### Tier 4 — Video (requires source images from Tier 1 and 2)
22. `hero-pack-reveal.mp4` (requires hero-pack-main.webp)
23. `product-pack-360.mp4` (requires product-everyday.webp)
24. `hero-modular-snap.mp4` (requires modular-system-diagram.webp)
25. Remaining video loops

---

## How to Use These Files

### To generate images (OpenAI):
```
# Install dependency
npm install openai

# Set your key
echo "OPENAI_API_KEY=your_key_here" > .env

# Run the generation script (to be built in scripts/)
node scripts/generate-images.js
```

### To generate videos (Runway):
```
# Set your key
RUNWAY_API_KEY=your_key_here (add to .env)

# Run the video generation script (to be built in scripts/)
node scripts/generate-videos.js
```

### Output locations:
- Images → `ai-assets/images/`
- Videos → `ai-assets/video/`

---

## Brand Style Reference

**Palette:** Dark Navy `#0B1626` · Electric Mint `#3FFFAB` · White `#FFFFFF`

**Tone:** Premium. Modern. Adventurous. Practical. Aspirational but not pretentious.

**References:** Arc'teryx campaign photography, Aer product imagery, Peak Design editorial style.

**Never:** Generic stock photos. Bright artificial colours. Posed corporate smiles. Cheap-looking gear.

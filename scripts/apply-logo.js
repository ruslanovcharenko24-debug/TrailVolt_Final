/**
 * TrailVolt — Logo Branding Pipeline [WATERMARK APPROACH — DEPRECATED]
 *
 * This script applies the logo as a corner overlay/watermark.
 * This approach has been superseded by the product-integrated branding approach
 * where the logo appears as part of the product construction (fabric patch,
 * embossed badge, or engraved metal detail).
 *
 * See: prompts/image-prompts-product-regen.json for the correct approach.
 * Run: npm run generate:images:product-regen
 *
 * This script is preserved for reference but should NOT be used for
 * any assets destined for the website.
 *
 * Original usage (deprecated):
 *   npm run brand:images
 *
 * Sources:
 *   - Logo:   Brand /TrailVolt_logo_primary.png  (RGBA, 2400×1200)
 *   - Images: ai-assets/images/master/ + ai-assets/images/final/
 *   - Output: ai-assets/images/branded/
 *
 * See prompts/logo-placement-strategy.md for per-image decisions.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// ─── Paths ────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');

const LOGO_PATH   = join(ROOT, 'Brand ', 'TrailVolt_logo_primary.png');
const BRANDED_DIR = join(ROOT, 'ai-assets', 'images', 'branded');
const MANIFEST    = join(BRANDED_DIR, 'manifest.json');

// ─── Image targets (from prompts/logo-placement-strategy.md) ─────────────────
//
// decision:  'required' | 'optional'
// source:    relative path from ROOT
// placement: 'bottom-right' | 'bottom-left'
// logoBg:    'dark' (use white logo) | 'light' (use original dark logo)
// opacity:   0–255 (255 = fully opaque)
// sizeRatio: fraction of image width for logo width (0.14–0.20)

const TARGETS = [
  // ── REQUIRED ──────────────────────────────────────────────────────────────
  {
    filename:  'shop-bundles.webp',
    source:    'ai-assets/images/master/shop-bundles.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,   // ~90%
    sizeRatio: 0.17,
  },
  {
    filename:  'pack-travel-black.webp',
    source:    'ai-assets/images/master/pack-travel-black.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,
    sizeRatio: 0.17,
  },
  {
    filename:  'pack-everyday-slate.webp',
    source:    'ai-assets/images/master/pack-everyday-slate.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,
    sizeRatio: 0.17,
  },
  {
    filename:  'product-everyday.webp',
    source:    'ai-assets/images/master/product-everyday.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,
    sizeRatio: 0.20,
  },
  {
    filename:  'module-phone.webp',
    source:    'ai-assets/images/master/module-phone.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   225,   // ~88%
    sizeRatio: 0.20,
  },
  {
    filename:  'module-tech.webp',
    source:    'ai-assets/images/master/module-tech.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   225,
    sizeRatio: 0.17,
  },
  {
    filename:  'module-power.webp',
    source:    'ai-assets/images/master/module-power.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   225,
    sizeRatio: 0.20,
  },
  {
    filename:  'module-bottle.webp',
    source:    'ai-assets/images/master/module-bottle.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   225,
    sizeRatio: 0.20,
  },
  {
    filename:  'hero-pack-main.webp',
    source:    'ai-assets/images/final/hero-pack-main.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,
    sizeRatio: 0.20,
  },
  {
    filename:  'modular-system-diagram.webp',
    source:    'ai-assets/images/final/modular-system-diagram.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   225,
    sizeRatio: 0.20,
  },
  {
    filename:  'pack-everyday-black.webp',
    source:    'ai-assets/images/final/pack-everyday-black.webp',
    decision:  'required',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   230,
    sizeRatio: 0.17,
  },
  // ── OPTIONAL ──────────────────────────────────────────────────────────────
  {
    filename:  'sustainability-repair.webp',
    source:    'ai-assets/images/master/sustainability-repair.webp',
    decision:  'optional',
    placement: 'bottom-right',
    logoBg:    'dark',
    opacity:   217,   // ~85%
    sizeRatio: 0.17,
  },
  {
    filename:  'tribe-marco.webp',
    source:    'ai-assets/images/master/tribe-marco.webp',
    decision:  'optional',
    placement: 'bottom-right',
    logoBg:    'light', // light airport terminal background
    opacity:   191,     // ~75%
    sizeRatio: 0.14,
  },
];

// ─── Logo constants ───────────────────────────────────────────────────────────

const LOGO_ASPECT = 2400 / 1200; // 2.0
const MARGIN_RATIO = 0.04;        // 4% of shorter image dimension for margin

// ─── Build white logo variant from original RGBA PNG ─────────────────────────

async function buildWhiteLogo(logoBuffer) {
  const { data, info } = await sharp(logoBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3];
    if (alpha > 10) {
      pixels[i]     = 255; // R
      pixels[i + 1] = 255; // G
      pixels[i + 2] = 255; // B
      // alpha channel preserved as-is
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();
}

// ─── Resize logo to target pixel width ───────────────────────────────────────

async function resizeLogo(logoBuffer, targetWidth) {
  const targetHeight = Math.round(targetWidth / LOGO_ASPECT);
  return sharp(logoBuffer)
    .resize(targetWidth, targetHeight, { fit: 'fill' })
    .toBuffer();
}

// ─── Calculate logo overlay geometry ─────────────────────────────────────────

function calcPlacement(imageWidth, imageHeight, logoWidth, placement) {
  const logoHeight = Math.round(logoWidth / LOGO_ASPECT);
  const marginH    = Math.max(Math.round(imageWidth * MARGIN_RATIO), 32);
  const marginV    = Math.max(Math.round(imageHeight * MARGIN_RATIO), 32);

  let left, top;

  if (placement === 'bottom-right') {
    left = imageWidth  - logoWidth  - marginH;
    top  = imageHeight - logoHeight - marginV;
  } else if (placement === 'bottom-left') {
    left = marginH;
    top  = imageHeight - logoHeight - marginV;
  } else {
    // Default: bottom-right
    left = imageWidth  - logoWidth  - marginH;
    top  = imageHeight - logoHeight - marginV;
  }

  return { left, top, logoHeight };
}

// ─── Apply opacity to logo buffer ────────────────────────────────────────────

async function applyOpacity(logoBuffer, opacity) {
  if (opacity >= 255) return logoBuffer;

  const { data, info } = await sharp(logoBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  const ratio  = opacity / 255;

  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 3] = Math.round(pixels[i + 3] * ratio);
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();
}

// ─── Load manifest ────────────────────────────────────────────────────────────

function loadManifest() {
  if (existsSync(MANIFEST)) {
    try { return JSON.parse(readFileSync(MANIFEST, 'utf-8')); }
    catch { return []; }
  }
  return [];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('══════════════════════════════════════════════════');
  console.log('  TrailVolt — Logo Branding Pipeline');
  console.log('══════════════════════════════════════════════════');
  console.log(`  Logo:   Brand /TrailVolt_logo_primary.png`);
  console.log(`  Output: ai-assets/images/branded/`);
  console.log(`  Images: ${TARGETS.length} selected for branding`);
  console.log('──────────────────────────────────────────────────');
  console.log('');

  // Validate logo exists
  if (!existsSync(LOGO_PATH)) {
    console.error(`  ERROR: Logo not found at: ${LOGO_PATH}`);
    console.error(`  Check that the Brand folder has a trailing space in its name.`);
    process.exit(1);
  }

  // Create output directory
  mkdirSync(BRANDED_DIR, { recursive: true });

  // Load original logo
  const originalLogoBuffer = readFileSync(LOGO_PATH);
  console.log(`  Logo loaded: TrailVolt_logo_primary.png (2400×1200 RGBA)`);

  // Build white variant
  const whiteLogoBuffer = await buildWhiteLogo(originalLogoBuffer);
  console.log(`  White logo variant built.`);
  console.log('');

  const manifest = loadManifest();
  const results  = { branded: [], failed: [] };

  for (const target of TARGETS) {
    const sourcePath = join(ROOT, target.source);
    const outputPath = join(BRANDED_DIR, target.filename);

    if (!existsSync(sourcePath)) {
      console.error(`  SKIP (not found): ${target.filename}`);
      results.failed.push({ filename: target.filename, reason: 'source not found' });
      continue;
    }

    console.log(`  Branding: ${target.filename} [${target.decision.toUpperCase()}]`);

    try {
      // Get image metadata
      const meta = await sharp(sourcePath).metadata();
      const { width: imgW, height: imgH } = meta;

      // Calculate logo size
      const logoWidth  = Math.min(Math.round(imgW * target.sizeRatio), 300);
      const { left, top, logoHeight } = calcPlacement(imgW, imgH, logoWidth, target.placement);

      // Select logo variant
      const baseLogoBuffer = target.logoBg === 'dark' ? whiteLogoBuffer : originalLogoBuffer;

      // Resize to target dimensions
      const resized = await resizeLogo(baseLogoBuffer, logoWidth);

      // Apply opacity
      const withOpacity = await applyOpacity(resized, target.opacity);

      // Composite onto source image
      await sharp(sourcePath)
        .composite([{
          input: withOpacity,
          left,
          top,
          blend: 'over',
        }])
        .webp({ quality: 92, effort: 4 })
        .toFile(outputPath);

      console.log(`    Saved → ai-assets/images/branded/${target.filename}`);
      console.log(`    Logo: ${logoWidth}×${logoHeight}px | Position: (${left}, ${top}) | Opacity: ${Math.round(target.opacity / 255 * 100)}%`);

      results.branded.push(target.filename);

      // Update manifest
      const entry = {
        filename:      target.filename,
        source_image:  target.source,
        logo_file_used: 'Brand /TrailVolt_logo_primary.png',
        logo_variant:  target.logoBg === 'dark' ? 'white' : 'original-dark',
        placement:     target.placement,
        size_rule:     `${Math.round(target.sizeRatio * 100)}% of image width (${logoWidth}px)`,
        opacity:       `${Math.round(target.opacity / 255 * 100)}%`,
        decision:      target.decision,
        generated_at:  new Date().toISOString(),
      };

      const idx = manifest.findIndex(e => e.filename === target.filename);
      if (idx >= 0) manifest[idx] = entry;
      else          manifest.push(entry);

      writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf-8');

    } catch (err) {
      console.error(`    ERROR: ${err.message}`);
      results.failed.push({ filename: target.filename, reason: err.message });
    }

    console.log('');
  }

  // ─── Summary ───────────────────────────────────────────────────────────────

  console.log('══════════════════════════════════════════════════');
  console.log('  Branding complete.');
  console.log('──────────────────────────────────────────────────');
  console.log(`  Logo selected:    TrailVolt_logo_primary.png (RGBA white variant for dark BG)`);
  console.log(`  Branded:          ${results.branded.length} image(s)`);
  console.log(`  Failed / skipped: ${results.failed.length} image(s)`);
  console.log(`  Output folder:    ai-assets/images/branded/`);

  if (results.branded.length > 0) {
    console.log('');
    console.log('  Branded files created:');
    results.branded.forEach(f => console.log(`    ✓ ${f}`));
  }

  if (results.failed.length > 0) {
    console.log('');
    console.log('  Failed:');
    results.failed.forEach(f => console.log(`    ✗ ${f.filename} — ${f.reason}`));
  }

  console.log('');
  console.log(`  Manifest: ai-assets/images/branded/manifest.json`);
  console.log('');
  console.log('  NEXT STEP: Visual review of branded/ folder before promoting to assets/images/');
  console.log('  Do NOT commit. Do NOT push. Do NOT modify website HTML yet.');
  console.log('══════════════════════════════════════════════════');
  console.log('');

  if (results.failed.length > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

/**
 * TrailVolt — Social Media Asset Generator
 *
 * Generates brand-consistent image assets for TrailVolt's internal
 * social profile pages (Instagram, TikTok, YouTube).
 *
 * Uses the project's existing OpenAI DALL-E 3 pipeline.
 * Outputs to assets/images/social/ with clear filename conventions.
 *
 * Usage:
 *   node scripts/generate-social-assets.js
 *   node scripts/generate-social-assets.js --force   (regenerate existing)
 */

import 'dotenv/config';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname }                        from 'path';
import { fileURLToPath }                        from 'url';
import OpenAI                                   from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const FORCE     = process.argv.includes('--force');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── Brand context injected into every prompt ─────────────────────────────
const BRAND =
  'TrailVolt premium modular outdoor backpack brand. ' +
  'Visual identity: deep navy blue (#0B1626) backgrounds, electric mint green (#3FFFAB) accents, ' +
  'clean premium editorial photography. ' +
  'Product: modular backpack system with snap-on modules (phone, tech, power, shoe modules). ' +
  'Aesthetic: modern, outdoor-tech, cinematic, professional — not sportswear, not street. ' +
  'Target audience: urban professionals and weekend adventurers. ' +
  'Photography style: editorial, product-first, specific real locations, never posed, never stock.';

// ─── Asset definitions ────────────────────────────────────────────────────
const ASSETS = [

  // ── Shared ──────────────────────────────────────────────────────────────
  {
    filename: 'shared/avatar.png',
    size:     '1024x1024',
    prompt:
      `${BRAND} ` +
      'Square social media profile avatar. ' +
      'Centered TrailVolt logo treatment: "TrailVolt" wordmark in bold Montserrat-style type, ' +
      '"Volt" portion in electric mint green (#3FFFAB), "Trail" in white. ' +
      'Deep navy (#0B1626) background. ' +
      'Subtle mint glow halo behind the text. ' +
      'Clean geometric border frame. ' +
      'Professional brand identity, suitable for Instagram/YouTube/TikTok avatar circle crop.',
  },
  {
    filename: 'shared/cover-wide.png',
    size:     '1792x1024',
    prompt:
      `${BRAND} ` +
      'Wide hero cover image for social media channel art. ' +
      'A TrailVolt Core Pack (premium dark technical backpack) photographed against deep navy blue backdrop. ' +
      'The pack is lit dramatically from the left with a mint-green rim light on the right edge. ' +
      'Stainless steel modular attachment rail visible on the front panel. ' +
      '"ONE PACK. EVERY HORIZON." text overlay in white uppercase Montserrat, ' +
      'with "EVERY HORIZON." in electric mint green. ' +
      'Cinematic, premium, wide landscape crop.',
  },

  // ── Instagram ────────────────────────────────────────────────────────────
  {
    filename: 'instagram/post-1-core-pack.png',
    size:     '1024x1024',
    prompt:
      `${BRAND} ` +
      'Instagram square product post. ' +
      'The TrailVolt Core Pack in Core Black (22L Everyday configuration) standing upright on a wet granite trail at dawn. ' +
      'Wicklow Mountains, Ireland backdrop, early morning mist. ' +
      'Mint green accent visible in the attachment rail. ' +
      'Three snap-on modules attached: chest phone module, tech organiser, power bank. ' +
      'No human subject — pure product hero shot. ' +
      'Golden hour light from the left, deep shadows on the right. ' +
      'Editorial premium quality, landscape trail setting, could appear in Gear Patrol magazine.',
  },
  {
    filename: 'instagram/post-2-modules.png',
    size:     '1024x1024',
    prompt:
      `${BRAND} ` +
      'Instagram square product post. ' +
      'Flat-lay overhead shot on deep navy surface: ' +
      'TrailVolt Core Pack in the center, surrounded by 5 snap-on modules laid out symmetrically: ' +
      'chest phone module (top left), tech organiser (top right), power bank 10000mAh (bottom left), ' +
      'shoe module (bottom right), RFID document sleeve (top center). ' +
      'Each module slightly offset from the pack with a mint-green connection indicator glowing. ' +
      'Clean studio lighting, no harsh shadows. ' +
      'Looks like a high-end gear spread from Monocle or Uncrate.',
  },

  // ── TikTok ───────────────────────────────────────────────────────────────
  {
    filename: 'tiktok/thumb-1-snap.png',
    size:     '1024x1024',
    prompt:
      `${BRAND} ` +
      'TikTok video thumbnail, vertical/square crop. ' +
      'Close-up action shot: human hand snapping a TrailVolt module (chest phone module) ' +
      'onto the stainless steel attachment rail of the Core Pack. ' +
      'The snap click moment — fingers just making contact with the rail. ' +
      'Blurred dark navy background, sharp focus on the connection point. ' +
      'Mint green electric spark/glow effect at the connection point. ' +
      'Bold white text overlay at bottom: "SNAP. DONE." in heavy caps. ' +
      'Dynamic, punchy, social-first visual energy.',
  },
  {
    filename: 'tiktok/thumb-2-one-pack.png',
    size:     '1024x1024',
    prompt:
      `${BRAND} ` +
      'TikTok video thumbnail. ' +
      'A side-by-side split composition: ' +
      'Left half — a person at an office desk, smart casual, MacBook, the TrailVolt pack by the chair. ' +
      'Right half — same person on a mountain trail, same TrailVolt pack, same mint rail, now with trail modules. ' +
      'Center dividing line in electric mint (#3FFFAB). ' +
      'Top text: "Same Pack." (white), Bottom text: "Every Life." (mint green). ' +
      'Bold, split-screen lifestyle storytelling, TikTok ratio.',
  },

  // ── YouTube ───────────────────────────────────────────────────────────────
  {
    filename: 'youtube/thumb-1-hero-video.png',
    size:     '1792x1024',
    prompt:
      `${BRAND} ` +
      'YouTube video thumbnail, widescreen 16:9. ' +
      'Dramatic editorial hero shot: the TrailVolt Core Pack suspended mid-air against a deep navy-to-midnight-blue gradient. ' +
      'Modules attached and glowing faintly with mint-green highlights. ' +
      'Bottom third: bold white title text "ONE PACK. EVERY HORIZON." ' +
      '"EVERY HORIZON." in electric mint green. ' +
      'Top right corner: TrailVolt logo watermark (small). ' +
      'YouTube thumbnail quality: high contrast, punchy, clear at small thumbnail size. ' +
      'Cinematic product reveal aesthetic.',
  },
  {
    filename: 'youtube/thumb-2-modules-explained.png',
    size:     '1792x1024',
    prompt:
      `${BRAND} ` +
      'YouTube video thumbnail, widescreen 16:9. ' +
      'Explainer video thumbnail style. ' +
      'TrailVolt Core Pack center-left, with 6 individual modules arranged in a fan pattern on the right, ' +
      'each connected to the pack by a mint-green dotted line. ' +
      'Labels float beside each module in white Space Grotesk font: ' +
      '"Phone Module", "Tech Organiser", "Power Bank", "Shoe Module", "Document Sleeve". ' +
      'Navy background with a subtle grid texture. ' +
      'Title text: "EVERY MODULE EXPLAINED" in white, "8 Snap-Ons. Zero Compromise." below in grey. ' +
      'Clean explainer-video thumbnail energy, premium.',
  },
  {
    filename: 'youtube/cover-channel-art.png',
    size:     '1792x1024',
    prompt:
      `${BRAND} ` +
      'YouTube channel art banner, very wide crop (safe zone center). ' +
      'Deep navy blue (#0B1626) gradient background. ' +
      'Left third: TrailVolt Core Pack hero product shot at an angle. ' +
      'Center safe zone: "TrailVolt" wordmark large, "Volt" in mint green. ' +
      'Tagline below: "Premium Modular Gear. Real Use. Real Terrain." in Space Grotesk. ' +
      'Subtle mint grid lines and geometric accents as background texture. ' +
      'Right third: small montage thumbnails of Dublin, mountains, airport. ' +
      'Cinematic wide banner. Channel art is designed to look great on desktop, tablet, mobile.',
  },
];

// ─── Generator ────────────────────────────────────────────────────────────
async function generate(asset) {
  const outPath = join(ROOT, 'assets', 'images', 'social', asset.filename);

  if (!FORCE && existsSync(outPath)) {
    console.log(`  ↷  Skipping (exists): ${asset.filename}`);
    return true;
  }

  // Ensure subfolder exists
  mkdirSync(dirname(outPath), { recursive: true });

  try {
    console.log(`  ⟳  Generating: ${asset.filename}`);
    const response = await openai.images.generate({
      model:           'dall-e-3',
      prompt:          asset.prompt,
      n:               1,
      size:            asset.size,
      quality:         'standard',
      response_format: 'b64_json',
    });
    writeFileSync(outPath, Buffer.from(response.data[0].b64_json, 'base64'));
    console.log(`  ✓  Saved: assets/images/social/${asset.filename}`);
    return true;
  } catch (err) {
    console.error(`  ✗  Failed: ${asset.filename} — ${err.message}`);
    return false;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY not set in .env');
    process.exit(1);
  }

  console.log('\nTrailVolt — Social Media Asset Generator');
  console.log(`Generating ${ASSETS.length} assets via DALL-E 3…`);
  console.log('─'.repeat(52));

  let ok = 0;
  for (const asset of ASSETS) {
    const success = await generate(asset);
    if (success) ok++;
  }

  console.log(`\n${ok}/${ASSETS.length} assets ready in assets/images/social/`);
  if (ok < ASSETS.length) {
    console.log('  Tip: missing assets will fall back to CSS placeholders in HTML.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });

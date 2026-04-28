/**
 * TrailVolt — Loyalty Earn-Points Icon Generator
 *
 * Generates 4 minimal brand-consistent PNG icons for the
 * "Every Action Counts" section on the Basecamp Loyalty page.
 *
 * Outputs: assets/images/loyalty/icon-*.png
 * Run:     node scripts/generate-loyalty-icons.js
 */

import 'dotenv/config';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'assets', 'images', 'loyalty');

mkdirSync(OUTPUT_DIR, { recursive: true });

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) { console.error('ERROR: OPENAI_API_KEY not set'); process.exit(1); }

const openai = new OpenAI({ apiKey });

// ─── Icon definitions ─────────────────────────────────────────────────────────

const ICONS = [
  {
    filename: 'icon-core-pack.png',
    label:    'Buy a Core Pack',
    prompt:
      'Minimal premium icon: a technical outdoor backpack silhouette, pure flat design, single centered object. ' +
      'Deep navy background (#0B1626). The backpack outline drawn in clean white strokes with a single electric ' +
      'mint green (#3FFFAB) accent line on the front rail. Ultra-minimal, geometric, no shadows, no gradients, ' +
      'no text, no clutter. Centered with generous negative space. Think: luxury outdoor brand icon, ' +
      'high-contrast, UI-ready. 512x512.',
  },
  {
    filename: 'icon-module.png',
    label:    'Buy Any Module',
    prompt:
      'Minimal premium icon: a small rectangular module clicking onto a surface, flat snap-on concept. ' +
      'Pure flat design, deep navy background (#0B1626). The module shape drawn in white geometric strokes, ' +
      'with a small electric mint green (#3FFFAB) connection/click indicator. Ultra-minimal, no gradients, ' +
      'no shadows, no text. Centered with generous negative space. Think: premium tech accessory icon, ' +
      'UI-ready. 512x512.',
  },
  {
    filename: 'icon-review.png',
    label:    'Leave a Review',
    prompt:
      'Minimal premium icon: five stars in a clean horizontal row. Deep navy background (#0B1626). ' +
      'Four stars outlined in white, the fifth star fully filled in electric mint green (#3FFFAB). ' +
      'Pure flat geometric design, perfectly even spacing, no shadows, no gradients, no text. ' +
      'Centered with generous negative space. Think: premium brand rating icon, UI-ready. 512x512.',
  },
  {
    filename: 'icon-refer.png',
    label:    'Refer a Friend',
    prompt:
      'Minimal premium icon: two simple human silhouettes connected by a clean directional arrow between them. ' +
      'Deep navy background (#0B1626). Silhouettes drawn in white minimal strokes, arrow in electric mint green ' +
      '(#3FFFAB). Pure flat design, geometric, ultra-minimal, no gradients, no shadows, no text. ' +
      'Centered with generous negative space. Think: modern sharing/referral icon for premium brand. ' +
      'UI-ready. 512x512.',
  },
];

// ─── Generate ─────────────────────────────────────────────────────────────────

async function generate(icon) {
  const outPath = join(OUTPUT_DIR, icon.filename);
  if (existsSync(outPath)) {
    console.log(`  ↷  Skipping (exists): ${icon.filename}`);
    return true;
  }
  try {
    console.log(`  ⟳  Generating: ${icon.filename} — ${icon.label}`);
    const response = await openai.images.generate({
      model:           'dall-e-3',
      prompt:          icon.prompt,
      n:               1,
      size:            '1024x1024',
      quality:         'standard',
      response_format: 'b64_json',
    });
    const b64 = response.data[0].b64_json;
    writeFileSync(outPath, Buffer.from(b64, 'base64'));
    console.log(`  ✓  Saved: assets/images/loyalty/${icon.filename}`);
    return true;
  } catch (err) {
    console.error(`  ✗  Failed: ${icon.filename} — ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('\nTrailVolt — Loyalty Icon Generator');
  console.log('────────────────────────────────────');
  let ok = 0;
  for (const icon of ICONS) {
    const success = await generate(icon);
    if (success) ok++;
  }
  console.log(`\n${ok}/${ICONS.length} icons ready in assets/images/loyalty/`);
  if (ok < ICONS.length) {
    console.log('  Note: SVG fallback icons are embedded in the HTML for any missing files.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });

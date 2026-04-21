/**
 * TrailVolt — Assessment 2 Campaign Asset Generation
 * MMED7013 | Ruslan Ovcharenko | R00272695
 *
 * Generates 5 background images for the podcast launch campaign:
 *  - 3 Instagram carousel frame backgrounds (1024×1024)
 *  - 1 Google Display Ad background (1024×1024)
 *  - 1 A4 Print Ad background portrait (1024×1536)
 *
 * Outputs to: Assessment 2/Advertising Assets/Working Files/backgrounds/
 *
 * Usage:
 *   node scripts/generate-assessment2.js
 *   node scripts/generate-assessment2.js --force   (overwrite existing)
 */

import 'dotenv/config';
import { writeFileSync, existsSync, statSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const FORCE = process.argv.includes('--force');

const OUTPUT_DIR = join(
  ROOT,
  '../../MTU/Lectures/MTU University/2 kurs 2 semestr/Content cretion/Assessment 2/Advertising Assets/Working Files/backgrounds'
);

mkdirSync(OUTPUT_DIR, { recursive: true });

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey.trim() === '') {
  console.error('ERROR: OPENAI_API_KEY is not set in .env');
  process.exit(1);
}

const openai = new OpenAI({ apiKey });

// ── Campaign background prompts ───────────────────────────────────────────────

const PROMPTS = [
  {
    filename: 'carousel-bg-frame1.png',
    size: '1024x1024',
    label: 'Carousel Frame 1 — Hook (square)',
    prompt: `Cinematic editorial outdoor photograph, dark and moody atmosphere. A premium matte-black modular backpack with electric mint-green zipper accents rests on a weathered granite boulder overlooking an enormous mountain valley at blue hour. The sky is deep navy (#0B1626) fading to dark indigo above the peaks. A thin electric mint rim light catches the edge of the pack fabric, creating a subtle glow. The composition is clean and minimal — the pack occupies lower-centre, peaks fill the upper two thirds. The scene is foggy and atmospheric, with distant ridgelines barely visible. Shot on medium-format camera, f/2.8, ultra-sharp, cinematic depth of field, grain texture. No text, no watermarks, no logos, no people, no hands. Editorial outdoor gear photography, Gear Patrol magazine aesthetic.`
  },
  {
    filename: 'carousel-bg-frame2.png',
    size: '1024x1024',
    label: 'Carousel Frame 2 — Podcast / Journey (square)',
    prompt: `Cinematic editorial travel photograph. Over-the-shoulder view of a lone traveller standing at the floor-to-ceiling window of a modern, minimal airport terminal at dusk. The traveller wears a premium matte-black modular backpack with a subtle mint-green accent on the shoulder strap. Outside the enormous window: an empty runway, a dramatic blue-orange gradient sky at sunset, distant aircraft silhouettes. The interior is dark, slightly underexposed — dark navy flooring, minimal concrete columns. The mood is calm, purposeful, intelligent. Shot with shallow depth of field, slightly wide angle, anamorphic lens flare on the window glass. No text, no watermarks, no visible faces. Cinematic, premium, editorial travel photography.`
  },
  {
    filename: 'carousel-bg-frame3.png',
    size: '1024x1024',
    label: 'Carousel Frame 3 — CTA / Listen Now (square)',
    prompt: `Overhead editorial flat-lay photograph on dark slate stone surface. Arranged artfully: a premium matte-black modular backpack opened slightly to reveal an interior organiser system, one pair of minimal matte-black wireless earbuds in their charging case, a folded topographic trail map, a simple black passport, a sprig of heather. Composition is minimal and clean, styled like a Kinfolk magazine spread. The slate background is dark grey with a slight navy tint. A very subtle electric mint colour accent appears in the earbuds' small indicator light. Soft top-down studio lighting. Objects arranged at slight diagonal. No text, no watermarks, no logos visible. Ultra-sharp, overhead, product editorial photography, modern premium minimalism.`
  },
  {
    filename: 'display-ad-bg.png',
    size: '1024x1024',
    label: 'Display Ad 300×250 background (square)',
    prompt: `Minimal editorial product photograph, dark navy background. Side profile of a premium slim modular backpack in matte core black, floating centred against a seamless deep navy (#0B1626) gradient background. A precise electric mint rim light on the right edge traces the silhouette of the pack — clean, cinematic, glowing. The composition is spare and graphic: pack on left-centre, negative space on right for text overlay. Extremely clean, almost graphic design aesthetic rather than full photography. Very shallow depth of field, studio lighting, luxury goods photography quality. No text, no watermarks, no people, no hands. Single subject, ultra-minimal composition.`
  },
  {
    filename: 'print-ad-bg.png',
    size: '1024x1536',
    label: 'A4 Print Ad background (portrait)',
    prompt: `Dramatic cinematic landscape photograph, portrait orientation. Wide view of a lone hiker's silhouette standing on the highest ridge of a mountain range at the exact moment between last light and darkness — the horizon glows a deep electric mint-to-teal gradient, while the sky above fades from dark navy to deep indigo. The silhouette is small, centred-left in the lower third, facing the glowing horizon. In front of the silhouette the trail descends out of frame. The upper three quarters of the frame is dark navy sky, creating space for text overlay. Shot with a wide-angle lens at 16mm equivalent. Awe-inspiring, expansive, epic scale. Cinematic grain. No text, no watermarks. The emotional register is: freedom, capability, achievement, and the quiet confidence of someone who has chosen how to move through the world.`
  }
];

// ── Generation ────────────────────────────────────────────────────────────────

async function generate(item) {
  const outPath = join(OUTPUT_DIR, item.filename);

  if (!FORCE && existsSync(outPath)) {
    try {
      if (statSync(outPath).size > 0) {
        console.log(`  Skipped (exists): ${item.filename}`);
        return true;
      }
    } catch { /* fall through */ }
  }

  console.log(`  Generating: ${item.label}`);

  const response = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: item.prompt,
    n: 1,
    size: item.size,
    quality: 'high',
    output_format: 'png',
  });

  const b64 = response.data[0].b64_json;
  if (!b64) throw new Error(`No image data returned for ${item.filename}`);

  const buf = Buffer.from(b64, 'base64');
  writeFileSync(outPath, buf);
  console.log(`  Saved: ${item.filename}  (${(buf.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function main() {
  console.log('');
  console.log('══════════════════════════════════════════════════════');
  console.log('  TrailVolt — Assessment 2 Campaign Image Generation');
  console.log('  MMED7013 | Podcast Launch | "The Horizon Edit"');
  console.log('══════════════════════════════════════════════════════');
  console.log(`  Model:   gpt-image-1 (quality: high)`);
  console.log(`  Assets:  ${PROMPTS.length} campaign background images`);
  console.log(`  Output:  ${OUTPUT_DIR}`);
  console.log(`  Mode:    ${FORCE ? 'FORCE (overwrite)' : 'skip existing'}`);
  console.log('──────────────────────────────────────────────────────');
  console.log('');

  let generated = 0, skipped = 0, failed = 0;

  for (const item of PROMPTS) {
    try {
      const wasGenerated = await generate(item);
      if (wasGenerated) {
        const path = join(OUTPUT_DIR, item.filename);
        const existed = !FORCE && existsSync(path);
        if (!existed) generated++;
        else skipped++;
      }
    } catch (err) {
      console.error(`  ERROR: ${item.filename} — ${err.message}`);
      failed++;
    }
  }

  console.log('');
  console.log('══════════════════════════════════════════════════════');
  console.log('  Generation complete.');
  console.log(`  Generated: ${generated}   Skipped: ${skipped}   Failed: ${failed}`);
  console.log('══════════════════════════════════════════════════════');
  console.log('');
  if (failed === 0) {
    console.log('  Next step: run composite_ads.py to build finished assets.');
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

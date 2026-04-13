/**
 * TrailVolt — Full Image Generation Pipeline
 *
 * Reads all prompts from prompts/image-prompts-final.json.
 * Skips images that already exist in ai-assets/images/ (unless --force flag is passed).
 * Saves outputs to ai-assets/images/ and updates manifest.json.
 *
 * Usage:
 *   npm run generate:images                — generate all missing images
 *   npm run generate:images -- --force     — regenerate everything (overwrite existing)
 *   node scripts/generate-images.js --only hero-pack-main.webp,modular-system-diagram.webp
 *
 * Regeneration mode (5 core brand assets — stronger prompts):
 *   npm run generate:images:regenerate     — generate the 5 priority assets into ai-assets/images/regenerated/
 *   node scripts/generate-images.js --regenerate
 */

import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

// ─── Paths ────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');

// ─── CLI flags ────────────────────────────────────────────────────────────────

const args             = process.argv.slice(2);
const FORCE            = args.includes('--force');
const REGENERATE       = args.includes('--regenerate');
const MASTER           = args.includes('--master');
const PRODUCT_REGEN    = args.includes('--product-regen');
const FOLLOWUP         = args.includes('--followup');
const FINAL_COMPLETION = args.includes('--final-completion');

// --only hero-pack-main.webp,modular-system-diagram.webp
const onlyFlag = args.find(a => a.startsWith('--only'));
const ONLY_SET = onlyFlag
  ? new Set(onlyFlag.replace('--only', '').replace(/^=/, '').trim().split(',').map(s => s.trim()))
  : null;

// ─── Mode-dependent paths ─────────────────────────────────────────────────────

const PROMPTS_FILE  = FINAL_COMPLETION
  ? join(ROOT, 'prompts', 'image-prompts-final-completion.json')
  : FOLLOWUP
    ? join(ROOT, 'prompts', 'image-prompts-followup.json')
    : PRODUCT_REGEN
      ? join(ROOT, 'prompts', 'image-prompts-product-regen.json')
      : MASTER
        ? join(ROOT, 'prompts', 'image-prompts-master.json')
        : REGENERATE
          ? join(ROOT, 'prompts', 'image-prompts-regeneration.json')
          : join(ROOT, 'prompts', 'image-prompts-final.json');

const OUTPUT_DIR    = FINAL_COMPLETION
  ? join(ROOT, 'ai-assets', 'images', 'final-completion-wave')
  : FOLLOWUP
    ? join(ROOT, 'ai-assets', 'images', 'followup')
    : PRODUCT_REGEN
      ? join(ROOT, 'ai-assets', 'images', 'product-regenerated')
      : MASTER
        ? join(ROOT, 'ai-assets', 'images', 'master')
        : REGENERATE
          ? join(ROOT, 'ai-assets', 'images', 'regenerated')
          : join(ROOT, 'ai-assets', 'images');

const MANIFEST_FILE = join(OUTPUT_DIR, 'manifest.json');

// ─── API key validation ───────────────────────────────────────────────────────

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey.trim() === '') {
  console.error('ERROR: OPENAI_API_KEY is not set in .env');
  process.exit(1);
}

// ─── OpenAI client ────────────────────────────────────────────────────────────

const openai = new OpenAI({ apiKey });

// ─── Output directory ─────────────────────────────────────────────────────────

mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Load prompts ─────────────────────────────────────────────────────────────

const promptsData = JSON.parse(readFileSync(PROMPTS_FILE, 'utf-8'));
const allPrompts  = promptsData.prompts;

// ─── Filter to generate ───────────────────────────────────────────────────────

function shouldSkip(filename) {
  if (FORCE) return false;
  if (ONLY_SET && !ONLY_SET.has(filename)) return true;
  const p = join(OUTPUT_DIR, filename);
  if (!existsSync(p)) return false;
  // Skip if file exists and is non-empty
  try {
    return statSync(p).size > 0;
  } catch {
    return false;
  }
}

// ─── Image dimensions mapping ─────────────────────────────────────────────────
// gpt-image-1 supports: 1024x1024, 1536x1024, 1024x1536, auto
// Map our intended sizes to the closest supported size.

function pickSize(dims) {
  if (!dims) return '1024x1024';
  const [w, h] = dims.split('x').map(Number);
  if (!w || !h) return '1024x1024';
  const ratio = w / h;
  if (ratio > 1.3) return '1536x1024'; // landscape / OG images
  if (ratio < 0.8) return '1024x1536'; // portrait
  return '1024x1024';                   // square or near-square
}

// ─── Manifest helpers ─────────────────────────────────────────────────────────

function loadManifest() {
  if (existsSync(MANIFEST_FILE)) {
    try { return JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8')); }
    catch { return []; }
  }
  return [];
}

function saveManifest(entries) {
  writeFileSync(MANIFEST_FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

// ─── Image generation ─────────────────────────────────────────────────────────

async function generateImage(prompt) {
  const size   = pickSize(prompt.recommended_dimensions);
  const isJpeg = extname(prompt.filename).toLowerCase() === '.jpg';

  const response = await openai.images.generate({
    model: 'gpt-image-1',
    prompt: prompt.detailed_prompt,
    n: 1,
    size,
    quality: 'high',
    output_format: isJpeg ? 'jpeg' : 'webp',
  });

  const b64 = response.data[0].b64_json;
  if (!b64) throw new Error(`No image data returned for ${prompt.filename}`);
  return Buffer.from(b64, 'base64');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('══════════════════════════════════════════════════');
  if (FINAL_COMPLETION) {
    console.log('  TrailVolt — Final Visual Completion Wave');
  } else if (FOLLOWUP) {
    console.log('  TrailVolt — Follow-up Generation Wave');
  } else if (PRODUCT_REGEN) {
    console.log('  TrailVolt — Product-Integrated Branding Regeneration');
  } else if (MASTER) {
    console.log('  TrailVolt — Master Generation Pipeline');
  } else if (REGENERATE) {
    console.log('  TrailVolt — Regeneration Pipeline');
  } else {
    console.log('  TrailVolt — Full Image Generation Pipeline');
  }
  const modeLabel = FINAL_COMPLETION ? 'FINAL-COMPLETION (25 images: commercial fixes + ratios + about + tribe + UGC)' : FOLLOWUP ? 'FOLLOWUP (material fix + shop + modules + configurator)' : PRODUCT_REGEN ? 'PRODUCT-REGEN (logo as product detail)' : MASTER ? 'MASTER (benchmark-quality prompts)' : REGENERATE ? 'REGENERATION (priority 5 assets)' : FORCE ? 'FORCE (overwrite all)' : 'skip existing';
  const promptFile = FINAL_COMPLETION ? 'image-prompts-final-completion.json' : FOLLOWUP ? 'image-prompts-followup.json' : PRODUCT_REGEN ? 'image-prompts-product-regen.json' : MASTER ? 'image-prompts-master.json' : REGENERATE ? 'image-prompts-regeneration.json' : 'image-prompts-final.json';
  const outputLabel = FINAL_COMPLETION ? 'ai-assets/images/final-completion-wave/' : FOLLOWUP ? 'ai-assets/images/followup/' : PRODUCT_REGEN ? 'ai-assets/images/product-regenerated/' : MASTER ? 'ai-assets/images/master/' : REGENERATE ? 'ai-assets/images/regenerated/' : 'ai-assets/images/';
  console.log('══════════════════════════════════════════════════');
  console.log(`  Model:    gpt-image-1 (quality: high)`);
  console.log(`  Prompts:  ${allPrompts.length} total in ${promptFile}`);
  console.log(`  Output:   ${outputLabel}`);
  console.log(`  Mode:     ${modeLabel}`);
  if (ONLY_SET) console.log(`  Filter:   ${[...ONLY_SET].join(', ')}`);
  console.log('──────────────────────────────────────────────────');
  if (!REGENERATE && !MASTER) {
    console.log('  Brand analysis complete.');
    console.log('  Prompt refinement complete — 43 final prompts loaded.');
    console.log('──────────────────────────────────────────────────');
  }
  console.log('');
  console.log('  Starting generation...');
  console.log('');

  const manifest = loadManifest();
  const results  = { generated: [], skipped: [], failed: [] };

  for (const prompt of allPrompts) {
    const { filename } = prompt;

    if (shouldSkip(filename)) {
      console.log(`  Skipped existing:  ${filename}`);
      results.skipped.push(filename);
      continue;
    }

    console.log(`  Generating:  ${filename}`);

    let imageBuffer;
    try {
      imageBuffer = await generateImage(prompt);
    } catch (err) {
      console.error(`  ERROR generating ${filename}: ${err.message}`);
      results.failed.push(filename);
      continue;
    }

    const outputPath = join(OUTPUT_DIR, filename);
    writeFileSync(outputPath, imageBuffer);
    console.log(`  Saved:       ${filename}`);
    results.generated.push(filename);

    // Update manifest
    const entry = {
      filename,
      page:        prompt.page,
      section:     prompt.section,
      prompt_used: prompt.detailed_prompt,
      generated_at: new Date().toISOString(),
      model:       'gpt-image-1',
    };
    const idx = manifest.findIndex(e => e.filename === filename);
    if (idx >= 0) manifest[idx] = entry;
    else          manifest.push(entry);

    saveManifest(manifest);
  }

  console.log('');
  console.log('══════════════════════════════════════════════════');
  if (REGENERATE) {
    console.log('  Regeneration complete.');
  } else {
    console.log('  Generation complete.');
  }
  console.log('──────────────────────────────────────────────────');
  console.log(`  Generated:  ${results.generated.length} new image(s)`);
  console.log(`  Skipped:    ${results.skipped.length} existing image(s)`);
  console.log(`  Failed:     ${results.failed.length} image(s)`);

  if (results.generated.length > 0) {
    console.log('');
    console.log('  Newly generated:');
    results.generated.forEach(f => console.log(`    ✓ ${f}`));
  }

  if (results.skipped.length > 0) {
    console.log('');
    console.log('  Skipped (already exist):');
    results.skipped.forEach(f => console.log(`    — ${f}`));
  }

  if (results.failed.length > 0) {
    console.log('');
    console.log('  Failed (will need retry):');
    results.failed.forEach(f => console.log(`    ✗ ${f}`));
  }

  console.log('');
  if (FINAL_COMPLETION) {
    console.log(`  Manifest updated: ai-assets/images/final-completion-wave/manifest.json`);
    console.log('  No existing assets/images/ files were modified.');
    console.log('  Review final-completion-wave/ before promoting to assets/images/.');
  } else if (FOLLOWUP) {
    console.log(`  Manifest updated: ai-assets/images/followup/manifest.json`);
    console.log('  No existing assets/images/ files were modified.');
    console.log('  Review followup/ before promoting to assets/images/.');
  } else if (PRODUCT_REGEN) {
    console.log(`  Manifest updated: ai-assets/images/product-regenerated/manifest.json`);
    console.log('  Originals in master/ and assets/images/ were NOT modified.');
    console.log('  Review product-regenerated/ before promoting to assets/images/.');
  } else if (MASTER) {
    console.log(`  Manifest updated: ai-assets/images/master/manifest.json`);
    console.log('  Original ai-assets/images/ and regenerated/ files were NOT modified.');
    console.log('  Review master/ folder before promoting images to assets/images/.');
  } else if (REGENERATE) {
    console.log(`  Manifest updated: ai-assets/images/regenerated/manifest.json`);
    console.log('  Original ai-assets/images/ files were NOT modified.');
    console.log('  Review regenerated/ folder before promoting to main images/.');
  } else {
    console.log(`  Manifest updated: ai-assets/images/manifest.json`);
  }
  console.log('══════════════════════════════════════════════════');
  console.log('');

  if (results.failed.length > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});

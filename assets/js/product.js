/* ============================================================
   TrailVolt — Product Configurator JS
   product.js — Premium redesign
   ============================================================ */

'use strict';

/* ── Price helper ── */
function fmtPrice(eurAmount) {
  return window.TVi18n ? TVi18n.formatPrice(eurAmount) : '€' + eurAmount;
}
function fmtPricePlus(eurAmount) {
  return '+' + fmtPrice(eurAmount);
}

/* ── i18n helper ── */
const _t = (key, fallback) => (window.TVi18n ? TVi18n.t(key) : (fallback !== undefined ? fallback : key));

/* ── i18n key maps (link LINES/COLORS/MODULES to TV_TRANSLATIONS keys) ── */
const LINES_I18N = {
  everyday: { name: 'lines.everyday.name', cat: 'lines.everyday.cat', tagline: 'lines.everyday.tagline', tags: ['cfg.tag.everyday.1', 'cfg.tag.everyday.2', 'cfg.tag.everyday.3'] },
  travel:   { name: 'lines.travel.name',   cat: 'lines.travel.cat',   tagline: 'lines.travel.tagline',   tags: ['cfg.tag.travel.1', 'cfg.tag.travel.2', 'cfg.tag.travel.3'] },
  trail:    { name: 'lines.trail.name',    cat: 'lines.trail.cat',    tagline: 'lines.trail.tagline',    tags: ['cfg.tag.trail.1', 'cfg.tag.trail.2', 'cfg.tag.trail.3'] },
};

const COLORS_I18N = {
  'core-black':   { name: 'cfg.color.core_black',   note: 'cfg.color.core_black.note' },
  'slate-grey':   { name: 'cfg.color.slate_grey',   note: 'cfg.color.slate_grey.note' },
  'forest-green': { name: 'cfg.color.forest_green', note: 'cfg.color.forest_green.note' },
  'custom-build': { name: 'cfg.color.custom',       note: 'cfg.color.custom.note' },
};

const MODULES_I18N = {
  'mod-phone':    { name: 'modules.phone.name',    desc: 'modules.phone.desc' },
  'mod-tech':     { name: 'modules.tech.name',     desc: 'modules.tech.desc' },
  'mod-power':    { name: 'modules.power.name',    desc: 'modules.power.desc' },
  'mod-shoe':     { name: 'modules.shoe.name',     desc: 'modules.shoe.desc' },
  'mod-clothing': { name: 'modules.clothing.name', desc: 'modules.clothing.desc' },
  'mod-doc':      { name: 'modules.doc.name',      desc: 'modules.doc.desc' },
  'mod-bottle':   { name: 'modules.bottle.name',   desc: 'modules.bottle.desc' },
  'mod-rain':     { name: 'modules.rain.name',     desc: 'modules.rain.desc' },
};

/* ── Configuration Data ── */
const LINES = {
  everyday: {
    id:          'everyday',
    name:        'Everyday',
    category:    'Urban Carry',
    capacity:    '22L',
    tagline:     'Built for the rhythm of the city.',
    description: 'Engineered for the daily commute and everything between. A padded 16" laptop compartment, rapid-access front panel, optional insulated lunch pocket, and an ecosystem of snap-on modules that evolve as your day does. Structured organisation without the weight.',
    dimensions:  '47 × 30 × 16 cm',
    weight:      '1.1 kg',
    material:    'Ballistic nylon shell, YKK zippers, padded airflow back panel',
    features:    ['16" padded laptop sleeve', 'Rapid-access front organiser', 'Insulated lunch compartment', 'Magnetic top carry handle', 'Side water bottle pocket'],
    tags:        ['Daily Carry', 'Commute', 'Laptop'],
    basePrice:   159,
    image:       'TrailVolt Core Pack — Everyday 22L',
  },
  travel: {
    id:          'travel',
    name:        'Travel',
    category:    'Cabin-Ready',
    capacity:    '30L',
    tagline:     'Every airline. Every destination.',
    description: 'Built to pass as cabin luggage on every major airline while holding more than you expect. Clamshell opening, a detachable 8L day bag, lockable zip system, and modular organisation cubes that make packing and unpacking effortless wherever you land.',
    dimensions:  '54 × 34 × 20 cm',
    weight:      '1.4 kg',
    material:    'Ripstop nylon, weatherproof coating, polished aluminium zippers',
    features:    ['IATA cabin-compliant 54×34×20', 'Clamshell flat-open design', 'Detachable 8L day bag', 'Luggage trolley pass-through', 'Lockable zip system'],
    tags:        ['Cabin Carry', 'Travel', 'Modular'],
    basePrice:   159,
    image:       'TrailVolt Core Pack — Travel 30L',
  },
  trail: {
    id:          'trail',
    name:        'Trail',
    category:    'All-Terrain',
    capacity:    '28L',
    tagline:     'Built for terrain. Ready for anywhere.',
    description: 'For the weekends that demand more. DWR-coated Cordura shell, load-distributing shoulder harness, 3L hydration sleeve, and reinforced base. Engineered for terrain that tests your gear — still compatible with every module in the system for post-trail versatility.',
    dimensions:  '52 × 32 × 18 cm',
    weight:      '1.3 kg',
    material:    '500D Cordura, DWR coating, reinforced waterproof base',
    features:    ['3L hydration sleeve', 'DWR weather-resistant coating', 'Load-distribution harness', 'Trekking pole loops', 'Emergency whistle sternum strap'],
    tags:        ['Outdoor', 'Trail', 'Weather-Ready'],
    basePrice:   159,
    image:       'TrailVolt Core Pack — Trail 28L',
  },
};

const COLORS = {
  'core-black':    { name: 'Core Black',    note: 'Our most versatile finish — pairs with everything.',        hex: '#1a1a1a' },
  'slate-grey':    { name: 'Slate Grey',    note: 'Cool mid-tone. A modern update on the classic.',             hex: '#6b7d8e' },
  'forest-green':  { name: 'Forest Green',  note: 'Deep, muted, confident. Built for the outdoors.',            hex: '#2d5a3d' },
  'custom-build':  { name: 'Custom Build',  note: 'Choose your colour combination at checkout — coming soon.', hex: null      },
};

const MODULES = [
  { id: 'mod-phone',    name: 'Chest Phone Module',       price: 29, desc: 'Magnetic chest-mount for instant phone access. No bag opening required.' },
  { id: 'mod-tech',     name: 'Tech Organiser Module',    price: 35, desc: 'Cable management, earbuds pocket, SD card slots and a pen loop.' },
  { id: 'mod-power',    name: 'Power Bank Module',        price: 39, desc: 'Integrated 10,000mAh USB-A/C power bank with passthrough cable port.' },
  { id: 'mod-shoe',     name: 'Shoe Module',              price: 32, desc: 'Ventilated, isolated compartment. Attaches to the base. Keeps mud separate.' },
  { id: 'mod-clothing', name: 'Clothing Organiser Cube',  price: 25, desc: 'Compression cube for a clean change of clothes or gym kit.' },
  { id: 'mod-doc',      name: 'Hidden Document Sleeve',   price: 19, desc: 'RFID-blocking slim sleeve flush against the back panel. Passports stay invisible.' },
  { id: 'mod-bottle',   name: 'Bottle Holder Module',     price: 18, desc: 'Side-swing holder for 1L bottles or travel flasks. Retracts flush when empty.' },
  { id: 'mod-rain',     name: 'Rain Cover Module',        price: 22, desc: 'Tucked in its own base pocket. Rolls out in seconds for full pack protection.' },
];

/* Module icons (inline SVG paths) */
const MODULE_ICONS = {
  'mod-phone':    '<path d="M12 18h.01"/><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>',
  'mod-tech':     '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  'mod-power':    '<rect x="2" y="7" width="18" height="11" rx="1"/><path d="M22 11v3"/><path d="M7 12h4"/><path d="M9 10v4"/>',
  'mod-shoe':     '<path d="M3 14l2-6h12l2 6"/><path d="M3 14c0 1.1.9 2 2 2h12a2 2 0 002-2"/><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2"/>',
  'mod-clothing': '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>',
  'mod-doc':      '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/>',
  'mod-bottle':   '<path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 01-.672 2.219l-.656.984A4 4 0 007 10.212V20a2 2 0 002 2h6a2 2 0 002-2v-9.789a4 4 0 00-.672-2.219l-.656-.984A4 4 0 0115 4.788V2"/>',
  'mod-rain':     '<path d="M20 17.58A5 5 0 0018 8h-1.26A8 8 0 104 15.25"/><line x1="8" y1="16" x2="8" y2="21"/><line x1="8" y1="21" x2="6" y2="21"/><line x1="12" y1="18" x2="12" y2="23"/><line x1="12" y1="23" x2="10" y2="23"/><line x1="16" y1="16" x2="16" y2="21"/><line x1="16" y1="21" x2="14" y2="21"/>',
};

/* ── State ── */
const state = {
  step:         1,
  line:         null,
  color:        null,
  modules:      new Set(),
  totalPrice:   159,
  basePrice:    159,
  modulesTotal: 0,
};

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.configurator')) return;

  renderLineCards();
  renderColorSwatches();
  renderModuleCards();
  renderBuildReview();
  updatePriceDisplay();
  bindStepNavigation();
  bindAddToCart();
  initProductTabs();
  showStep(1);
  checkURLParams();

  // Re-render dynamic content on language change
  document.addEventListener('tv:langchange', () => {
    renderLineCards();
    // Re-select previously chosen line
    if (state.line) {
      document.querySelectorAll('.line-option').forEach(card => {
        card.classList.toggle('selected', card.dataset.line === state.line);
        card.setAttribute('aria-pressed', card.dataset.line === state.line);
      });
    }
    renderColorSwatches();
    if (state.color) {
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.color === state.color);
      });
      const labelEl = document.getElementById('selected-color-label');
      if (labelEl && state.color) labelEl.textContent = _t(COLORS_I18N[state.color]?.name, COLORS[state.color]?.name || '');
    }
    renderModuleCards();
    state.modules.forEach(modId => {
      const card = document.querySelector(`[data-module-id="${modId}"]`);
      if (card) { card.classList.add('selected'); card.setAttribute('aria-checked', 'true'); }
    });
    if (state.step === 4) renderBuildReview();
    updateConfigPills();
  });
});

function checkURLParams() {
  const params = new URLSearchParams(window.location.search);
  const line = params.get('line');
  if (line && LINES[line]) {
    selectLine(line);
  }
}

/* ============================================================
   STEP NAVIGATION
   ============================================================ */
function showStep(stepNum) {
  state.step = stepNum;

  // Show/hide step panels (look for .config-step OR .config-step-v2)
  document.querySelectorAll('.config-step, .config-step-v2').forEach((panel, i) => {
    const sn = i + 1;
    panel.classList.toggle('active', sn === stepNum);
    panel.style.display = ''; // let CSS handle via .active
  });

  // Update progress steps
  document.querySelectorAll('.config-progress__step').forEach((step, i) => {
    const sn = i + 1;
    step.classList.toggle('active',    sn === stepNum);
    step.classList.toggle('completed', sn < stepNum);
  });

  // Also update legacy step indicators if present
  document.querySelectorAll('.step-indicator').forEach((ind, i) => {
    const sn = i + 1;
    ind.classList.toggle('active',    sn === stepNum);
    ind.classList.toggle('completed', sn < stepNum);
  });

  // Update progress fill bar
  const fill = document.querySelector('.config-progress__fill');
  if (fill) {
    const pct = ((stepNum - 1) / 3) * 100;
    fill.style.width = pct + '%';
  }

  if (stepNum === 4) renderBuildReview();
  updateConfigPills();

  // Scroll to configurator
  const conf = document.querySelector('.configurator');
  if (conf) {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    const top  = conf.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function bindStepNavigation() {
  document.querySelectorAll('[data-next-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.nextStep);
      if (!validateStep(state.step)) return;
      showStep(next);
    });
  });

  document.querySelectorAll('[data-prev-step]').forEach(btn => {
    btn.addEventListener('click', () => showStep(parseInt(btn.dataset.prevStep)));
  });

  // Progress steps clickable
  document.querySelectorAll('.config-progress__step').forEach((step, i) => {
    step.addEventListener('click', () => {
      const sn = i + 1;
      if (sn <= state.step) showStep(sn);
    });
  });
}

function validateStep(step) {
  if (step === 1 && !state.line) {
    showStepError(_t('product.err.choose_line', 'Choose a line to continue.'));
    return false;
  }
  if (step === 2 && !state.color) {
    showStepError(_t('product.err.choose_colour', 'Choose a colour to continue.'));
    return false;
  }
  return true;
}

function showStepError(msg) {
  const existing = document.querySelector('.step-error');
  if (existing) existing.remove();
  const err = document.createElement('p');
  err.className = 'step-error';
  err.textContent = msg;
  err.style.cssText = 'color:var(--color-error);font-size:13px;font-weight:700;margin-top:10px;font-family:var(--font-accent);';
  const activeStep = document.querySelector('.config-step-v2.active, .config-step[style*="block"]');
  if (activeStep) activeStep.appendChild(err);
  setTimeout(() => err.remove(), 3000);
}

/* ============================================================
   CONFIG SUMMARY PILLS (visual panel)
   ============================================================ */
function updateConfigPills() {
  const container = document.querySelector('.config-summary-pills');
  if (!container) return;

  const pills = [];

  if (state.line) {
    const l = LINES[state.line];
    const lName = _t(LINES_I18N[state.line]?.name, l.name);
    pills.push(`<span class="config-pill">${lName} · ${l.capacity}</span>`);
  }

  if (state.color) {
    const c = COLORS[state.color];
    const cName = _t(COLORS_I18N[state.color]?.name, c.name);
    pills.push(`<span class="config-pill">${cName}</span>`);
  }

  state.modules.forEach(modId => {
    const m = MODULES.find(x => x.id === modId);
    if (m) {
      const mName = _t(MODULES_I18N[modId]?.name, m.name);
      pills.push(`<span class="config-pill config-pill--module">${mName}</span>`);
    }
  });

  container.innerHTML = pills.join('') || `<span style="font-family:var(--font-accent);font-size:11px;color:var(--color-grey-400);">${_t('product.config.hint', 'Configure below →')}</span>`;
}

/* ============================================================
   STEP 1: LINE SELECTOR
   ============================================================ */
function renderLineCards() {
  const container = document.getElementById('line-cards');
  if (!container) return;

  container.innerHTML = Object.values(LINES).map(line => {
    const i18n    = LINES_I18N[line.id] || {};
    const name    = _t(i18n.name,    line.name);
    const tagline = _t(i18n.tagline, line.tagline);
    const tags    = (i18n.tags || []).map((k, idx) => _t(k, line.tags[idx]));
    return `
      <div class="line-option line-option--${line.id}" data-line="${line.id}" tabindex="0" role="button" aria-pressed="false">
        <div class="line-option__img">${name[0]}</div>
        <div class="line-option__body">
          <div class="line-option__header">
            <span class="line-option__name">${name}</span>
            <span class="line-option__capacity">${line.capacity}</span>
          </div>
          <p class="line-option__tagline">${tagline}</p>
          <div class="line-option__features">
            ${tags.map(tag => `<span class="line-option__feature-tag">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="line-option__radio"></div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.line-option').forEach(card => {
    const activate = () => selectLine(card.dataset.line);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}

function selectLine(lineId) {
  state.line = lineId;
  const lineData = LINES[lineId];
  if (!lineData) return;

  state.basePrice = lineData.basePrice;
  recalcPrice();

  document.querySelectorAll('.line-option').forEach(card => {
    const sel = card.dataset.line === lineId;
    card.classList.toggle('selected', sel);
    card.setAttribute('aria-pressed', sel);
  });

  // Update product image on line selection
  const lineImages = {
    everyday: 'https://placehold.co/500x560/0B1626/3FFFAB?text=Everyday+22L',
    travel:   'https://placehold.co/500x560/1a3a2a/3FFFAB?text=Travel+30L',
    trail:    'https://placehold.co/500x560/374754/3FFFAB?text=Trail+28L',
  };
  const photo = document.getElementById('product-main-photo');
  if (photo && lineImages[lineId]) photo.src = lineImages[lineId];

  updateConfigPills();
}

/* ============================================================
   STEP 2: COLOR SELECTOR
   ============================================================ */
function renderColorSwatches() {
  const container = document.getElementById('color-swatches');
  if (!container) return;

  container.innerHTML = Object.entries(COLORS).map(([id, color]) => {
    const i18n = COLORS_I18N[id] || {};
    const name = _t(i18n.name, color.name);
    const note = _t(i18n.note, color.note);
    return `
      <div class="color-option" data-color="${id}" tabindex="0" role="button" aria-label="${_t('cfg.aria.select_color', 'Select')} ${name}">
        <div class="color-option__swatch color-option__swatch--${id}"></div>
        <div class="color-option__info">
          <div class="color-option__name">${name}</div>
          <div class="color-option__note">${note}</div>
        </div>
        <div class="color-option__radio"></div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.color-option').forEach(opt => {
    const activate = () => selectColor(opt.dataset.color);
    opt.addEventListener('click', activate);
    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}

function selectColor(colorId) {
  state.color = colorId;
  const colorData = COLORS[colorId];

  document.querySelectorAll('.color-option').forEach(opt => {
    const sel = opt.dataset.color === colorId;
    opt.classList.toggle('selected', sel);
    opt.setAttribute('aria-pressed', sel);
  });

  // Legacy label support
  const labelEl = document.getElementById('selected-color-label');
  if (labelEl && colorData) labelEl.textContent = _t(COLORS_I18N[colorId]?.name, colorData.name);

  // Update product visual panel color theme
  const mainImg = document.getElementById('product-image-main');
  if (mainImg) {
    mainImg.classList.remove('color-theme--core-black', 'color-theme--slate-grey', 'color-theme--forest-green', 'color-theme--custom');
    const themeMap = {
      'core-black':   'color-theme--core-black',
      'slate-grey':   'color-theme--slate-grey',
      'forest-green': 'color-theme--forest-green',
      'custom-build': 'color-theme--custom',
    };
    if (themeMap[colorId]) mainImg.classList.add(themeMap[colorId]);
  }

  updateConfigPills();
}

/* ============================================================
   STEP 3: MODULE SELECTOR
   ============================================================ */
function renderModuleCards() {
  const container = document.getElementById('module-cards');
  if (!container) return;

  container.innerHTML = MODULES.map(mod => {
    const i18n = MODULES_I18N[mod.id] || {};
    const name = _t(i18n.name, mod.name);
    const desc = _t(i18n.desc, mod.desc);
    return `
      <div class="module-toggle" data-module-id="${mod.id}" tabindex="0" role="checkbox" aria-checked="false">
        <div class="module-toggle__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${MODULE_ICONS[mod.id] || '<circle cx="12" cy="12" r="10"/>'}
          </svg>
        </div>
        <div class="module-toggle__body">
          <div class="module-toggle__name">${name}</div>
          <div class="module-toggle__desc">${desc}</div>
        </div>
        <div class="module-toggle__right">
          <div class="module-toggle__price">${fmtPricePlus(mod.price)}</div>
          <div class="module-toggle__check">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="2 7 6 11 12 3"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.module-toggle').forEach(card => {
    const activate = () => toggleModule(card.dataset.moduleId, card);
    card.addEventListener('click', activate);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });
}

function toggleModule(moduleId, card) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return;

  if (state.modules.has(moduleId)) {
    state.modules.delete(moduleId);
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  } else {
    state.modules.add(moduleId);
    card.classList.add('selected');
    card.setAttribute('aria-checked', 'true');
  }

  recalcPrice();
  updateConfigPills();
}

/* ============================================================
   STEP 4: BUILD REVIEW
   ============================================================ */
function renderBuildReview() {
  const container = document.getElementById('build-review');
  if (!container) return;

  const lineData   = state.line  ? LINES[state.line]   : null;
  const colorData  = state.color ? COLORS[state.color] : null;
  const selectedMods = MODULES.filter(m => state.modules.has(m.id));

  const notSel = `<em style="color:var(--color-grey-400);font-style:normal;">${_t('product.review.not_sel', 'Not selected')}</em>`;
  const lineLabel  = lineData
    ? `${_t(LINES_I18N[state.line]?.name, lineData.name)} · ${lineData.capacity}`
    : notSel;
  const colorLabel = colorData
    ? _t(COLORS_I18N[state.color]?.name, colorData.name)
    : notSel;

  const incompleteWarning = (!state.line || !state.color)
    ? `<div style="background:rgba(255,120,71,0.08);border:1px solid rgba(255,120,71,0.2);border-radius:10px;padding:12px 16px;margin-bottom:16px;font-family:var(--font-accent);font-size:12px;color:var(--color-ember);font-weight:600;">
         ${!state.line
           ? _t('product.review.back_line',   '← Go back to Step 1 to choose your line.')
           : _t('product.review.back_colour', '← Go back to Step 2 to choose your colour.')}
       </div>`
    : '';

  container.innerHTML = `
    ${incompleteWarning}
    <div class="build-review-v2">
      <div class="build-review-v2__row">
        <span class="build-review-v2__label">${_t('product.review.line', 'Line')}</span>
        <span class="build-review-v2__value">${lineLabel}</span>
      </div>
      <div class="build-review-v2__row">
        <span class="build-review-v2__label">${_t('product.review.colour', 'Colour')}</span>
        <span class="build-review-v2__value">${colorLabel}</span>
      </div>
      <div class="build-review-v2__row">
        <span class="build-review-v2__label">${_t('product.review.core', 'Core Pack')}</span>
        <span class="build-review-v2__value">${fmtPrice(state.basePrice)}</span>
      </div>
      ${selectedMods.length > 0 ? selectedMods.map(m => {
        const modName = _t(MODULES_I18N[m.id]?.name, m.name);
        return `
          <div class="build-review-v2__row">
            <span class="build-review-v2__label">${modName}</span>
            <span class="build-review-v2__value">+${fmtPrice(m.price)}</span>
          </div>
        `;
      }).join('') : `
        <div class="build-review-v2__row">
          <span class="build-review-v2__label">${_t('product.review.mods', 'Modules')}</span>
          <span class="build-review-v2__value" style="color:var(--color-grey-400);">${_t('product.review.no_mods', 'None — add above')}</span>
        </div>
      `}
      <div class="build-review-v2__total-row">
        <span class="build-review-v2__total-label">${_t('product.total', 'Total')}</span>
        <span class="build-review-v2__total-price price-display__amount">${fmtPrice(state.totalPrice)}</span>
      </div>
    </div>
  `;
}

/* ============================================================
   PRICE CALCULATION
   ============================================================ */
function recalcPrice() {
  state.modulesTotal = MODULES
    .filter(m => state.modules.has(m.id))
    .reduce((sum, m) => sum + m.price, 0);
  state.totalPrice = state.basePrice + state.modulesTotal;
  updatePriceDisplay();
}

function updatePriceDisplay() {
  document.querySelectorAll('.price-display__amount').forEach(el => {
    el.textContent = fmtPrice(state.totalPrice);
    el.classList.add('updated');
    setTimeout(() => el.classList.remove('updated'), 800);
  });

  const inline = document.getElementById('inline-price');
  if (inline) inline.textContent = fmtPrice(state.totalPrice);

  // Update sticky visual panel price
  const panelPrice = document.querySelector('.product-live-price__amount');
  if (panelPrice) {
    panelPrice.textContent = fmtPrice(state.totalPrice);
    panelPrice.classList.add('updated');
    setTimeout(() => panelPrice.classList.remove('updated'), 800);
  }
}

/* ============================================================
   ADD TO CART
   ============================================================ */
function bindAddToCart() {
  document.querySelectorAll('#add-to-cart-btn, .btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.line) {
        showStep(1);
        showStepError(_t('product.err.cart_line', 'Choose a line before adding to cart.'));
        return;
      }
      if (!state.color) {
        showStep(2);
        showStepError(_t('product.err.cart_colour', 'Choose a colour before adding to cart.'));
        return;
      }

      const lineData  = LINES[state.line];
      const colorData = COLORS[state.color];
      const mods      = MODULES.filter(m => state.modules.has(m.id));

      const item = {
        id:             'tv-build-' + Date.now(),
        name:           'TrailVolt Core Pack',
        line:           `${_t(LINES_I18N[state.line]?.name, lineData.name)} ${lineData.capacity}`,
        color:          _t(COLORS_I18N[state.color]?.name, colorData.name),
        modules:        mods.map(m => ({ id: m.id, name: _t(MODULES_I18N[m.id]?.name, m.name), price: m.price })),
        basePrice:      state.basePrice,
        modulesTotal:   state.modulesTotal,
        totalPrice:     state.totalPrice,
        quantity:       1,
        configSummary:  buildConfigSummary(lineData, colorData, mods),
      };

      if (window.TVCart) window.TVCart.addToCart(item);
      showAddedConfirmation();
    });
  });
}

function buildConfigSummary(line, color, mods) {
  const lName = _t(LINES_I18N[line.id]?.name, line.name);
  const cName = _t(COLORS_I18N[state.color]?.name, color.name);
  let s = `${lName} ${line.capacity} / ${cName}`;
  if (mods.length > 0) s += ' + ' + mods.map(m => _t(MODULES_I18N[m.id]?.name, m.name)).join(', ');
  return s;
}

function showAddedConfirmation() {
  const existing = document.getElementById('added-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'added-toast';
  toast.innerHTML = `
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;flex-shrink:0;">
      <polyline points="2 8 6 12 14 4"/>
    </svg>
    <span>${_t('product.toast.added', 'Added to cart')}</span>
    <a href="cart.html" style="color:var(--color-navy);font-weight:800;text-decoration:underline;margin-left:4px;">${_t('product.toast.view', 'View cart →')}</a>
  `;
  toast.style.cssText = `
    position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(20px);
    background:var(--color-mint);color:var(--color-navy);
    padding:13px 24px;border-radius:100px;
    font-family:var(--font-accent);font-weight:700;font-size:14px;
    box-shadow:0 8px 32px rgba(63,255,171,0.4);z-index:9999;
    display:flex;align-items:center;gap:8px;white-space:nowrap;
    opacity:0;transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 350);
  }, 3800);
}

/* ============================================================
   PRODUCT PAGE TABS
   ============================================================ */
function initProductTabs() {
  // Handle .tab-btn / .tab-panel (existing) and .product-tab-btn / .product-tab-panel (new)
  const selectors = [
    { btns: '.product-tab-btn',  panels: '.product-tab-panel' },
    { btns: '.tab-btn',          panels: '.tab-panel'         },
  ];

  selectors.forEach(({ btns, panels }) => {
    const btnEls   = document.querySelectorAll(btns);
    const panelEls = document.querySelectorAll(panels);
    if (!btnEls.length) return;

    btnEls.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btnEls.forEach(b => b.classList.remove('active'));
        panelEls.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab
          ? document.querySelector(`[data-panel="${btn.dataset.tab}"]`)
          : panelEls[i];
        if (target) target.classList.add('active');
      });
    });

    if (btnEls[0])   btnEls[0].classList.add('active');
    if (panelEls[0]) panelEls[0].classList.add('active');
  });
}

/* ── Expose globally ── */
window.TVProduct = { state, LINES, COLORS, MODULES, showStep, selectLine, selectColor, toggleModule, recalcPrice };

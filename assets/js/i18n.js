/* ============================================================
   TrailVolt — Internationalisation Engine
   i18n.js
   Depends on: translations.js (must load first)
   ============================================================ */

'use strict';

(function () {

  /* ── Constants ── */
  const LANG_KEY  = 'tv_lang';
  const SUPPORTED = ['en', 'fr', 'de', 'es', 'zh', 'ja'];
  const DEFAULT   = 'en';

  /* ── Currency config (EUR base prices) ── */
  const CURRENCY = {
    en: { symbol: '$',  rate: 1.08, before: true,  sep: ',' },
    fr: { symbol: '€',  rate: 1.00, before: false, sep: '\u202F' },
    de: { symbol: '€',  rate: 1.00, before: false, sep: '.' },
    es: { symbol: '€',  rate: 1.00, before: false, sep: '.' },
    zh: { symbol: '¥',  rate: 7.80, before: true,  sep: ',' },
    ja: { symbol: '¥',  rate: 162,  before: true,  sep: ',' },
  };

  /* ── Language detection ── */
  function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').toLowerCase().split('-')[0];
    return SUPPORTED.includes(browser) ? browser : DEFAULT;
  }

  /* ── Translation lookup ── */
  function t(key, lang) {
    if (!lang) lang = getLang();
    const dict     = (TV_TRANSLATIONS && TV_TRANSLATIONS[lang])      || {};
    const fallback = (TV_TRANSLATIONS && TV_TRANSLATIONS[DEFAULT])   || {};
    return dict[key] !== undefined ? dict[key] : (fallback[key] !== undefined ? fallback[key] : key);
  }

  /* ── Price formatter ── */
  function formatPrice(eurAmount, lang) {
    if (!lang) lang = getLang();
    const cfg       = CURRENCY[lang] || CURRENCY.en;
    const converted = Math.round(eurAmount * cfg.rate);
    const formatted = converted.toLocaleString('en').replace(/,/g, cfg.sep);
    return cfg.before ? cfg.symbol + formatted : formatted + '\u00A0' + cfg.symbol;
  }

  /* ── Apply translations to DOM ── */
  function applyTranslations(lang) {

    /* textContent / innerHTML */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      if (!val || val === key) return;
      /* Use innerHTML only when translation contains tags */
      if (val.indexOf('<') !== -1) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    /* Input / textarea placeholders */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'), lang);
    });

    /* aria-label */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'), lang));
    });

    /* data-price → formatted price */
    document.querySelectorAll('[data-price]').forEach(function (el) {
      var eur = parseFloat(el.getAttribute('data-price'));
      if (!isNaN(eur)) el.textContent = formatPrice(eur, lang);
    });

    /* Desktop listbox options — aria-selected */
    document.querySelectorAll('#lang-dropdown .lang-option').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    /* Mobile group buttons — aria-pressed */
    document.querySelectorAll('.lang-switcher--mobile .lang-option').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    /* Update current lang label in toggle */
    var currentLabel = document.getElementById('lang-current');
    if (currentLabel) currentLabel.textContent = lang.toUpperCase();

    /* Update <html lang=""> */
    document.documentElement.setAttribute('lang', lang);
  }

  /* ── Set language ── */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
    document.dispatchEvent(new CustomEvent('tv:langchange', { detail: { lang: lang } }));
  }

  /* ── Language switcher toggle ── */
  function initSwitcher() {
    var toggle   = document.getElementById('lang-switcher-toggle');
    var dropdown = document.getElementById('lang-dropdown');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    /* Close on dropdown option click */
    dropdown.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    /* Mobile lang switcher buttons (outside dropdown) */
    document.querySelectorAll('.lang-switcher--mobile .lang-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Init ── */
  function init() {
    var lang = getLang();
    applyTranslations(lang);
    initSwitcher();
  }

  /* ── Public API ── */
  window.TVi18n = {
    t:           t,
    getLang:     getLang,
    setLang:     setLang,
    formatPrice: formatPrice,
    init:        init,
  };

})();

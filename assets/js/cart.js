/* ============================================================
   TrailVolt — Cart Manager
   cart.js
   Cart state management using localStorage
   ============================================================ */

'use strict';

const CART_KEY  = 'tv_cart';
const PROMO_KEY = 'tv_promo';

/* ── i18n helper ── */
const _ct = (key, fallback) => (window.TVi18n ? TVi18n.t(key) : (fallback !== undefined ? fallback : key));

/* ── Module name i18n keys ── */
const CART_MODULE_NAMES = {
  'mod-phone':    'modules.phone.name',
  'mod-tech':     'modules.tech.name',
  'mod-power':    'modules.power.name',
  'mod-shoe':     'modules.shoe.name',
  'mod-clothing': 'modules.clothing.name',
  'mod-doc':      'modules.doc.name',
  'mod-bottle':   'modules.bottle.name',
  'mod-rain':     'modules.rain.name',
};

/* ============================================================
   PROMO CODE DATA
   ============================================================ */

const PROMO_CODES = {
  'BASECAMP10': 0.10,
  'TRAIL20':    0.20,
  'VOLT15':     0.15,
  'TRIBE25':    0.25,
};

/**
 * Apply a promo code — validates and saves to localStorage
 * @param {string} code
 * @returns {{ success: boolean, message: string, discount?: number }}
 */
function applyPromoCode(code) {
  const normalised = (code || '').trim().toUpperCase();

  if (!normalised) {
    return { success: false, message: _ct('promo.empty', 'Please enter a promo code.') };
  }

  if (!PROMO_CODES[normalised]) {
    return { success: false, message: _ct('promo.not_found', 'Code not found. Try BASECAMP10 for 10% off.') };
  }

  const discount = PROMO_CODES[normalised];
  localStorage.setItem(PROMO_KEY, JSON.stringify({ code: normalised, discount }));

  const pct = Math.round(discount * 100);
  const appliedMsg = _ct('promo.applied', '% discount applied!');
  return { success: true, message: `${pct}${appliedMsg}`, discount };
}

/**
 * Get current promo discount info
 * @returns {{ code: string, discount: number, amount: number } | null}
 */
function getPromoDiscount() {
  try {
    const raw = localStorage.getItem(PROMO_KEY);
    if (!raw) return null;
    const promo = JSON.parse(raw);
    if (!promo || !promo.code || !promo.discount) return null;
    const subtotal = getCartSubtotal();
    return {
      code:     promo.code,
      discount: promo.discount,
      amount:   subtotal * promo.discount,
    };
  } catch {
    return null;
  }
}

/**
 * Remove the active promo code
 */
function removePromoCode() {
  localStorage.removeItem(PROMO_KEY);
}

/* ============================================================
   CART STATE
   ============================================================ */

/**
 * Get all cart items from localStorage
 * @returns {Array} cart items
 */
function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save cart items to localStorage
 * @param {Array} items
 */
function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

/**
 * Add item to cart
 * @param {Object} item - { id, name, line, color, modules, basePrice, modulesTotal, totalPrice, quantity, configSummary }
 */
function addToCart(item) {
  const items = getCartItems();

  // Check if identical config exists (same id/line/color/modules)
  const existing = items.find(i => i.id === item.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    existing.totalPrice = existing.basePrice + (existing.modulesTotal || 0);
  } else {
    items.push({
      id: item.id || generateId(),
      name: item.name || 'TrailVolt Core Pack',
      line: item.line || 'Everyday',
      color: item.color || 'Core Black',
      modules: item.modules || [],
      basePrice: item.basePrice || 159,
      modulesTotal: item.modulesTotal || 0,
      totalPrice: item.totalPrice || item.basePrice || 159,
      quantity: item.quantity || 1,
      configSummary: item.configSummary || '',
      addedAt: Date.now(),
    });
  }

  saveCartItems(items);
  updateCartCount();
  triggerCartAnimation();
}

/**
 * Remove item from cart by id
 * @param {string} id
 */
function removeFromCart(id) {
  const items = getCartItems().filter(i => i.id !== id);
  saveCartItems(items);
  updateCartCount();
}

/**
 * Update quantity of item
 * @param {string} id
 * @param {number} qty
 */
function updateQuantity(id, qty) {
  const items = getCartItems();
  const item = items.find(i => i.id === id);
  if (!item) return;

  if (qty <= 0) {
    removeFromCart(id);
    return;
  }
  item.quantity = qty;
  saveCartItems(items);
  updateCartCount();
}

/**
 * Clear entire cart
 */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

/**
 * Get cart subtotal (sum of totalPrice * quantity, before discount)
 * @returns {number}
 */
function getCartSubtotal() {
  return getCartItems().reduce((sum, item) => {
    return sum + (item.totalPrice * (item.quantity || 1));
  }, 0);
}

/**
 * Get cart total with shipping and promo discount applied
 * @param {string} shippingMethod
 * @returns {Object} { subtotal, discountAmount, discountCode, total, shipping }
 */
function getCartTotal(shippingMethod) {
  const subtotal = getCartSubtotal();
  let shipping = 0;
  if (shippingMethod === 'express') {
    shipping = 12.99;
  } else if (shippingMethod === 'standard') {
    shipping = subtotal >= 100 ? 0 : 5.99;
  }

  const promo = getPromoDiscount();
  const discountAmount = promo ? promo.amount : 0;
  const discountCode   = promo ? promo.code : null;

  return {
    subtotal,
    discountAmount,
    discountCode,
    shipping,
    total: Math.max(0, subtotal - discountAmount) + shipping,
  };
}

/* ============================================================
   CART RENDERING — cart.html
   ============================================================ */

/**
 * Render cart to #cart-items-container and #cart-summary
 */
function renderCart() {
  const container       = document.getElementById('cart-items-container');
  const emptyState      = document.getElementById('cart-empty');
  const summaryContainer = document.getElementById('cart-summary-container');

  if (!container) return;

  const items = getCartItems();

  if (items.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'flex';
    if (summaryContainer) summaryContainer.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (summaryContainer) summaryContainer.style.display = 'block';

  container.innerHTML = items.map(item => buildCartItemHTML(item)).join('');

  // Bind events
  bindCartEvents(container);

  // Update summary
  renderCartSummary();

  // Render upsell
  renderCartUpsell();

  // Render promo section
  renderPromoSection();
}

function buildCartItemHTML(item) {
  const moduleNames = (item.modules || [])
    .map(m => _ct(CART_MODULE_NAMES[m.id], m.name))
    .join(', ') || _ct('cart.item.no_mods', 'No modules');
  const linePrice = formatPrice(item.totalPrice * (item.quantity || 1));
  const colourLabel   = _ct('cart.item.colour',    'Colour');
  const modulesLabel  = _ct('cart.item.modules',   'Modules');
  const baseOnlyLabel = _ct('cart.item.base_only', 'Base pack only');
  const removeLabel   = _ct('cart.remove',         'Remove');

  return `
    <article class="cart-item" data-id="${escapeHtml(item.id)}">
      <div class="cart-item__image">
        <div class="img-placeholder" style="font-size:9px; min-height:80px;">
          ${escapeHtml(item.name)}<br>${escapeHtml(item.line)}
        </div>
      </div>
      <div class="cart-item__details">
        <h3 class="cart-item__name">${escapeHtml(item.name)} — ${escapeHtml(item.line)}</h3>
        <p class="cart-item__config">
          ${colourLabel}: ${escapeHtml(item.color)}<br>
          ${item.modules && item.modules.length > 0 ? modulesLabel + ': ' + escapeHtml(moduleNames) : baseOnlyLabel}
        </p>
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="decrement" data-id="${escapeHtml(item.id)}" aria-label="Decrease quantity">−</button>
          <span class="qty-value" data-qty="${escapeHtml(item.id)}">${item.quantity || 1}</span>
          <button class="qty-btn" data-action="increment" data-id="${escapeHtml(item.id)}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item__price-col">
        <span class="cart-item__price" data-item-price="${escapeHtml(item.id)}">${linePrice}</span>
        <button class="cart-item__remove" data-remove="${escapeHtml(item.id)}">${removeLabel}</button>
      </div>
    </article>
  `;
}

function bindCartEvents(container) {
  // Quantity buttons
  container.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const items = getCartItems();
      const item = items.find(i => i.id === id);
      if (!item) return;
      const newQty = (item.quantity || 1) + (action === 'increment' ? 1 : -1);
      updateQuantity(id, newQty);
      renderCart();
    });
  });

  // Remove buttons
  container.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.remove;
      removeFromCart(id);
      renderCart();
    });
  });
}

/**
 * Render promo code section inside #cart-promo-container
 */
function renderPromoSection() {
  const container = document.getElementById('cart-promo-container');
  if (!container) return;

  const promo = getPromoDiscount();

  const promoLabel    = _ct('cart.promo.label',       'Promo Code');
  const promoRemove   = _ct('cart.promo.remove',      'Remove');
  const promoApply    = _ct('cart.promo.apply',       'Apply');
  const promoPlaceholder = _ct('cart.promo.placeholder', 'e.g. BASECAMP10');
  const promoPctOff   = _ct('cart.promo.pct_off',    '% off');

  if (promo) {
    // Show applied state
    container.innerHTML = `
      <div class="promo-section">
        <p class="promo-section__label">${promoLabel}</p>
        <div class="promo-applied-row">
          <span class="promo-applied-code">${escapeHtml(promo.code)}</span>
          <span class="promo-applied-discount">−${Math.round(promo.discount * 100)}${promoPctOff}</span>
          <button class="promo-remove-btn" id="promo-remove-btn" aria-label="${promoRemove}" title="${promoRemove}">✕</button>
        </div>
      </div>
    `;
    document.getElementById('promo-remove-btn').addEventListener('click', () => {
      removePromoCode();
      renderCart();
    });
  } else {
    // Show input state
    container.innerHTML = `
      <div class="promo-section">
        <p class="promo-section__label">${promoLabel}</p>
        <div class="promo-input-row">
          <input type="text" id="promo-code-input" class="promo-input" placeholder="${promoPlaceholder}" autocapitalize="characters" aria-label="${promoLabel}" />
          <button id="promo-apply-btn" class="promo-apply-btn">${promoApply}</button>
        </div>
        <p id="promo-msg" class="promo-msg" aria-live="polite"></p>
      </div>
    `;
    document.getElementById('promo-apply-btn').addEventListener('click', () => {
      const input = document.getElementById('promo-code-input');
      const msg   = document.getElementById('promo-msg');
      const result = applyPromoCode(input.value);
      msg.textContent = result.message;
      msg.className = 'promo-msg ' + (result.success ? 'promo-msg--success' : 'promo-msg--error');
      if (result.success) {
        setTimeout(() => renderCart(), 600);
      }
    });
    // Allow Enter key
    document.getElementById('promo-code-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('promo-apply-btn').click();
    });
  }
}

function renderCartSummary() {
  const subtotalEl  = document.getElementById('cart-subtotal');
  const shippingEl  = document.getElementById('cart-shipping');
  const totalEl     = document.getElementById('cart-total');
  const discountRow = document.getElementById('cart-discount-row');

  const totals = getCartTotal('standard');

  if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
  if (shippingEl) {
    shippingEl.textContent = totals.shipping === 0 ? _ct('cart.shipping.free', 'Free') : formatPrice(totals.shipping);
  }
  if (totalEl) totalEl.textContent = formatPrice(totals.total);

  // Discount row
  if (discountRow) {
    if (totals.discountAmount > 0) {
      discountRow.style.display = 'flex';
      const labelEl  = discountRow.querySelector('.cart-discount-label');
      const amountEl = discountRow.querySelector('.cart-discount-amount');
      if (labelEl)  labelEl.textContent  = `${_ct('cart.discount', 'Promo')} (${totals.discountCode})`;
      if (amountEl) amountEl.textContent = '−' + formatPrice(totals.discountAmount);
    } else {
      discountRow.style.display = 'none';
    }
  }
}

function renderCartUpsell() {
  const upsellContainer = document.getElementById('cart-upsell');
  if (!upsellContainer) return;

  const cartItems = getCartItems();
  const addedModuleIds = cartItems.flatMap(i => (i.modules || []).map(m => m.id));

  const allModules = [
    { id: 'mod-phone',    name: 'Chest Phone Module',        price: 29, desc: 'Keep your phone accessible on the move.' },
    { id: 'mod-tech',     name: 'Tech Organizer Module',     price: 35, desc: 'Cables, adapters, and earbuds — sorted.' },
    { id: 'mod-power',    name: 'Power Bank Module',         price: 39, desc: 'Integrated 10,000mAh charging on the go.' },
    { id: 'mod-shoe',     name: 'Shoe Module',               price: 32, desc: 'Isolated compartment for gym shoes or sandals.' },
    { id: 'mod-clothing', name: 'Clothing Organizer Cube',   price: 25, desc: 'Pack light, stay organised.' },
  ];

  const suggestions = allModules
    .filter(m => !addedModuleIds.includes(m.id))
    .slice(0, 3);

  if (suggestions.length === 0) {
    upsellContainer.style.display = 'none';
    return;
  }

  upsellContainer.innerHTML = `
    <h3 style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-navy);margin-bottom:var(--space-6);">
      ${_ct('cart.upsell.title', 'Complete Your System')}
    </h3>
    <p style="color:var(--color-grey-500);font-size:var(--text-sm);margin-bottom:var(--space-6);">${_ct('cart.upsell.subtitle', 'Most buyers add 1–2 modules.')}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--space-5);">
      ${suggestions.map(mod => {
        const modName = _ct(CART_MODULE_NAMES[mod.id], mod.name);
        return `
          <div style="background:var(--color-white);border:2px solid var(--color-grey-200);border-radius:var(--radius-lg);padding:var(--space-5);">
            <p style="font-weight:700;font-size:var(--text-base);color:var(--color-navy);margin-bottom:var(--space-1);">${escapeHtml(modName)}</p>
            <p style="font-size:var(--text-xs);color:var(--color-grey-500);margin-bottom:var(--space-3);">${escapeHtml(mod.desc)}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span style="font-family:var(--font-accent);font-weight:700;color:var(--color-navy);">${formatPrice(mod.price)}</span>
              <button class="btn btn--primary btn--sm" onclick="quickAddModule('${mod.id}','${escapeHtml(modName)}',${mod.price})">${_ct('cart.add', 'Add')}</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

/* ── Quick add module from upsell ── */
window.quickAddModule = function(id, name, price) {
  addToCart({
    id: 'standalone-' + id + '-' + Date.now(),
    name: name,
    line: 'Module',
    color: '—',
    modules: [],
    basePrice: price,
    modulesTotal: 0,
    totalPrice: price,
    quantity: 1,
    configSummary: 'Standalone module',
  });
  renderCart();
};

/* ============================================================
   CART COUNT UPDATE
   ============================================================ */
function updateCartCount() {
  const badges = document.querySelectorAll('.nav__cart-count');
  const items = getCartItems();
  const count = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

/* ── Visual feedback on add to cart ── */
function triggerCartAnimation() {
  const cartBtn = document.querySelector('.nav__cart-btn');
  if (!cartBtn) return;
  cartBtn.classList.add('cart-pulse');
  setTimeout(() => cartBtn.classList.remove('cart-pulse'), 600);
}

/* ============================================================
   UTILITIES
   ============================================================ */
function formatPrice(amount) {
  if (window.TVi18n) {
    return TVi18n.formatPrice(Number(amount));
  }
  return '€' + Number(amount).toFixed(2).replace(/\.00$/, '');
}

function generateId() {
  return 'tv-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   CHECKOUT — order summary
   ============================================================ */
function renderCheckoutSummary() {
  const container  = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl    = document.getElementById('checkout-total');
  const discountEl = document.getElementById('checkout-discount-row');

  const items = getCartItems();

  if (container) {
    if (items.length === 0) {
      container.innerHTML = `<p style="color:rgba(255,255,255,0.5);font-size:14px;">${_ct('cart.empty.title', 'Your cart is empty')}</p>`;
    } else {
      container.innerHTML = items.map(item => `
        <div class="order-sidebar__item">
          <span class="order-sidebar__item-name">
            ${escapeHtml(item.name)} — ${escapeHtml(item.line)}
            ${item.quantity > 1 ? ' ×' + item.quantity : ''}
          </span>
          <span class="order-sidebar__item-price">${formatPrice(item.totalPrice * (item.quantity || 1))}</span>
        </div>
      `).join('');
    }
  }

  const shippingMethod = document.querySelector('input[name="shipping"]:checked');
  const method  = shippingMethod ? shippingMethod.value : 'standard';
  const totals  = getCartTotal(method);

  if (subtotalEl) subtotalEl.textContent = formatPrice(totals.subtotal);
  if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? _ct('cart.shipping.free', 'Free') : formatPrice(totals.shipping);
  if (totalEl)    totalEl.textContent    = formatPrice(totals.total);

  // Discount row in checkout sidebar
  if (discountEl) {
    if (totals.discountAmount > 0) {
      discountEl.style.display = 'flex';
      const labelEl  = discountEl.querySelector('.order-sidebar__item-name');
      const amountEl = discountEl.querySelector('.order-sidebar__item-price');
      if (labelEl)  labelEl.textContent  = `${_ct('cart.discount', 'Promo')} (${totals.discountCode})`;
      if (amountEl) amountEl.textContent = '−' + formatPrice(totals.discountAmount);
    } else {
      discountEl.style.display = 'none';
    }
  }

  // Render checkout promo section
  renderCheckoutPromoSection();
}

/**
 * Render promo code section in the checkout sidebar
 */
function renderCheckoutPromoSection() {
  const container = document.getElementById('checkout-promo-container');
  if (!container) return;

  const promo = getPromoDiscount();

  const coPromoLabel  = _ct('co.promo.label',       _ct('cart.promo.label', 'Promo Code'));
  const coPromoRemove = _ct('cart.promo.remove',     'Remove');
  const coPromoApply  = _ct('co.promo.apply',        _ct('cart.promo.apply', 'Apply'));
  const coPromoPlaceholder = _ct('co.promo.placeholder', _ct('cart.promo.placeholder', 'e.g. BASECAMP10'));
  const coPctOff      = _ct('cart.promo.pct_off',   '% off');

  if (promo) {
    container.innerHTML = `
      <div class="promo-section" style="background:rgba(255,255,255,0.06);border:1px solid rgba(63,255,171,0.2);">
        <p class="promo-section__label" style="color:rgba(255,255,255,0.5);">${coPromoLabel}</p>
        <div class="promo-applied-row" style="background:rgba(63,255,171,0.08);border-color:rgba(63,255,171,0.25);">
          <span class="promo-applied-code" style="color:var(--color-white);">${escapeHtml(promo.code)}</span>
          <span class="promo-applied-discount">−${Math.round(promo.discount * 100)}${coPctOff}</span>
          <button class="promo-remove-btn" id="checkout-promo-remove" aria-label="${coPromoRemove}">✕</button>
        </div>
      </div>
    `;
    document.getElementById('checkout-promo-remove').addEventListener('click', () => {
      removePromoCode();
      renderCheckoutSummary();
    });
  } else {
    container.innerHTML = `
      <div class="promo-section" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
        <p class="promo-section__label" style="color:rgba(255,255,255,0.5);">${coPromoLabel}</p>
        <div class="promo-input-row">
          <input type="text" id="checkout-promo-input" class="promo-input" placeholder="${coPromoPlaceholder}"
            style="background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.15);color:var(--color-white);"
            autocapitalize="characters" aria-label="${coPromoLabel}" />
          <button id="checkout-promo-apply" class="promo-apply-btn">${coPromoApply}</button>
        </div>
        <p id="checkout-promo-msg" class="promo-msg" aria-live="polite"></p>
      </div>
    `;
    document.getElementById('checkout-promo-apply').addEventListener('click', () => {
      const input  = document.getElementById('checkout-promo-input');
      const msg    = document.getElementById('checkout-promo-msg');
      const result = applyPromoCode(input.value);
      msg.textContent = result.message;
      msg.className = 'promo-msg ' + (result.success ? 'promo-msg--success' : 'promo-msg--error');
      if (result.success) setTimeout(() => renderCheckoutSummary(), 600);
    });
    document.getElementById('checkout-promo-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('checkout-promo-apply').click();
    });
  }
}

/* ── Expose globally ── */
window.TVCart = {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartItems,
  getCartSubtotal,
  getCartTotal,
  clearCart,
  renderCart,
  updateCartCount,
  renderCheckoutSummary,
  formatPrice,
  generateId,
  applyPromoCode,
  getPromoDiscount,
  removePromoCode,
};

/* ── Init on cart/checkout pages ── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  if (document.getElementById('cart-items-container')) {
    renderCart();
  }

  if (document.getElementById('checkout-items')) {
    renderCheckoutSummary();

    // Update totals when shipping changes
    document.querySelectorAll('input[name="shipping"]').forEach(input => {
      input.addEventListener('change', renderCheckoutSummary);
    });
  }
});

/* ── Re-render on language change ── */
document.addEventListener('tv:langchange', () => {
  if (document.getElementById('cart-items-container')) renderCart();
  if (document.getElementById('checkout-items'))        renderCheckoutSummary();
});

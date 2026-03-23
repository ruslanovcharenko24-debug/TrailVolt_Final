/* ============================================================
   TrailVolt — Stripe Checkout
   checkout.js
   ============================================================ */

// ⚠️ Replace with your real Stripe publishable key before going live
const STRIPE_PK = 'pk_test_51234567890abcdefghij';

let stripe, elements, cardElement;

function initStripe() {
  if (typeof Stripe === 'undefined') {
    console.error('Stripe.js failed to load.');
    return;
  }

  stripe = Stripe(STRIPE_PK);
  elements = stripe.elements();

  cardElement = elements.create('card', {
    style: {
      base: {
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#0B1626',
        '::placeholder': { color: '#9AAAB8' },
      },
      invalid: { color: '#E53E3E' },
    },
  });

  cardElement.mount('#card-element');

  cardElement.on('change', (event) => {
    const errorEl = document.getElementById('card-errors');
    if (!errorEl) return;
    if (event.error) {
      errorEl.textContent = event.error.message;
      errorEl.style.display = 'block';
    } else {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  });
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('place-order-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Processing…';
  }

  // Create Payment Method via Stripe (card data never touches our server)
  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: document.getElementById('card-name')?.value || '',
      email: document.getElementById('co-email')?.value || '',
    },
  });

  if (error) {
    const errorEl = document.getElementById('card-errors');
    if (errorEl) {
      errorEl.textContent = error.message;
      errorEl.style.display = 'block';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Complete Order';
    }
    return;
  }

  // Send only the payment_method_id + order data to the server
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        first_name:  document.getElementById('co-first')?.value || '',
        last_name:   document.getElementById('co-last')?.value || '',
        email:       document.getElementById('co-email')?.value || '',
        phone:       document.getElementById('co-phone')?.value || '',
        address_line1: document.getElementById('co-address1')?.value || '',
        address_line2: document.getElementById('co-address2')?.value || '',
        city:          document.getElementById('co-city')?.value || '',
        postal_code:   document.getElementById('co-eircode')?.value || '',
        county:        document.getElementById('co-county')?.value || '',
        country:       document.getElementById('co-country')?.value || '',
        cart_items:    JSON.parse(localStorage.getItem('tv_cart') || '[]'),
        promo_code:    localStorage.getItem('tv_promo') || null,
      }),
    });

    const result = await response.json();

    if (result.success) {
      localStorage.removeItem('tv_cart');
      localStorage.removeItem('tv_promo');
      window.location.href = '/order-confirmation.html?order_id=' + result.order_id;
    } else {
      const errorEl = document.getElementById('card-errors');
      if (errorEl) {
        errorEl.textContent = result.error || 'Payment failed. Please try again.';
        errorEl.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Complete Order';
      }
    }
  } catch (err) {
    const errorEl = document.getElementById('card-errors');
    if (errorEl) {
      errorEl.textContent = 'Network error: ' + err.message;
      errorEl.style.display = 'block';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Complete Order';
    }
  }
}

function initCheckout() {
  initStripe();

  // Attach submit handler to the checkout form wrapper
  // The existing place-order-btn handles validation; we intercept after it passes
  const placeBtn = document.getElementById('place-order-btn');
  if (placeBtn) {
    // Replace the existing click handler by wrapping it
    placeBtn.addEventListener('click', async (e) => {
      // Let the existing inline validation run first (terms check, required fields)
      // Only proceed if Stripe is initialised and card method is active
      const isCardMethod = document.getElementById('card-fields-wrapper')?.style.display !== 'none';
      if (!isCardMethod || !stripe || !cardElement) return;

      // Prevent the inline "simulate processing" from running
      e.stopImmediatePropagation();

      await handleCheckoutSubmit(e);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCheckout);
} else {
  initCheckout();
}

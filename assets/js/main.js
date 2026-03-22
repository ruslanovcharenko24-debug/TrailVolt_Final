/* ============================================================
   TrailVolt — Main JS
   main.js
   Shared utilities, navigation, animations, forms
   ============================================================ */

'use strict';

/* ── DOMContentLoaded entry ── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.TVi18n) TVi18n.init();   // must run first — sets text before paint
  initNav();
  initStickyNav();
  initSmoothScroll();
  initFaqAccordion();
  initIntersectionAnimations();
  initEmailSignup();
  updateCartCountBadge();
  highlightActiveNavLink();
  initContactForm();
  initCookieBanner();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on outside click
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeMobileNav();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  function closeMobileNav() {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }
}

/* ── Sticky nav color change on scroll ── */
function initStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Highlight active nav link based on current page ── */
function highlightActiveNavLink() {
  const links = document.querySelectorAll('.nav__link');
  const path = window.location.pathname.split('/').pop() || 'index.html';
  // checkout.html maps to shop for active state
  const activeMap = { 'checkout.html': 'cart.html' };
  const activePath = activeMap[path] || path;
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (linkPage === activePath) {
      link.classList.add('active');
    }
  });
}


/* ── SMOOTH SCROLL ─────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   FAQ / GENERIC ACCORDION
   ============================================================ */
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body   = item.querySelector('.accordion-body');
    if (!header || !body) return;

    header.setAttribute('aria-expanded', 'false');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      accordionItems.forEach(other => {
        other.classList.remove('open');
        const otherBody = other.querySelector('.accordion-body');
        const otherHeader = other.querySelector('.accordion-header');
        if (otherBody) otherBody.style.maxHeight = null;
        if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ============================================================
   INTERSECTION OBSERVER ANIMATIONS
   ============================================================ */
function initIntersectionAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('fade-in'))
            : [];
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ============================================================
   EMAIL SIGNUP
   ============================================================ */
function initEmailSignup() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', handleEmailSignup);
  });

  document.querySelectorAll('[data-email-form]').forEach(form => {
    form.addEventListener('submit', handleEmailSignup);
  });
}

function handleEmailSignup(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button[type="submit"]');
  if (!input) return;

  const email = input.value.trim();
  if (!isValidEmail(email)) {
    const errMsg = window.TVi18n
      ? TVi18n.t('err.email.invalid')
      : 'Please enter a valid email address.';
    showFormMessage(form, errMsg, 'error');
    return;
  }

  // Simulate async
  if (btn) {
    btn.disabled = true;
    btn.textContent = '…';
  }

  setTimeout(() => {
    const successMsg = window.TVi18n
      ? TVi18n.t('signup.success')
      : "You're in! Check your inbox for 10% off your first order.";
    showFormMessage(form, successMsg, 'success');
    input.value = '';
    if (btn) {
      btn.disabled = false;
      btn.textContent = window.TVi18n ? TVi18n.t('signup.cta') : 'Get 10% Off';
    }
    // Store in localStorage
    localStorage.setItem('tv_subscribed', email);
  }, 1200);
}

function showFormMessage(form, message, type) {
  let msg = form.querySelector('.form-msg');
  if (!msg) {
    msg = document.createElement('p');
    msg.className = 'form-msg';
    form.appendChild(msg);
  }
  msg.textContent = message;
  msg.style.cssText = `
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${type === 'success' ? 'var(--color-mint)' : 'var(--color-error)'};
    font-family: var(--font-accent);
  `;
  setTimeout(() => {
    msg.remove();
  }, 6000);
}

/* ============================================================
   CART COUNT BADGE
   ============================================================ */
function updateCartCountBadge() {
  const badges = document.querySelectorAll('.nav__cart-count');
  const count = getCartItemCount();

  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  });
}

function getCartItemCount() {
  try {
    const cart = JSON.parse(localStorage.getItem('tv_cart') || '[]');
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
}

/* ============================================================
   TABS
   ============================================================ */
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '[data-tabs]');

  containers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels  = container.querySelectorAll('.tab-panel');

    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });

    // Activate first
    if (buttons[0]) buttons[0].classList.add('active');
    if (panels[0]) panels[0].classList.add('active');
  });
}

/* ── Export for use in other modules ── */
window.TVMain = {
  updateCartCountBadge,
  getCartItemCount,
  initTabs,
  initFaqAccordion,
  showFormMessage,
  isValidEmail,
};

/* ── Helpers ── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Contact form ── */
function initContactForm() {
  const contactForm = document.querySelector('[data-contact-form]');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '…';
    }
    setTimeout(() => {
      const success = document.querySelector('.contact-success');
      if (success) {
        success.style.display = 'block';
        contactForm.style.display = 'none';
      } else {
        const msg = window.TVi18n
          ? TVi18n.t('contact.success')
          : "Message sent! We'll get back to you within 24 hours.";
        showFormMessage(contactForm, msg, 'success');
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = window.TVi18n ? TVi18n.t('contact.send') : 'Send Message';
      }
    }, 1500);
  });
}

/* ── Cookie Consent Banner ── */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('tv_cookie_consent')) {
    banner.remove();
    return;
  }
  banner.style.display = 'flex';
  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('tv_cookie_consent', 'accepted');
    banner.style.transition = 'opacity 0.3s ease';
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  });
  banner.querySelector('.cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem('tv_cookie_consent', 'declined');
    banner.style.transition = 'opacity 0.3s ease';
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  });
}

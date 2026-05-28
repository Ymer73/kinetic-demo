/* ════════════════════════════════════════════════════════════
   ENHANCE 2026 — JS layer pour micro-interactions premium
   - 3D tilt sur cards (mousemove)
   - Haptic feedback léger sur taps mobile
   - Ripple position dynamique sur boutons
   - Parallax léger sur le scroll
   - Smooth page transitions entre liens internes
   ════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const isTouch = window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ──────── 1. Floating blobs (DOM injection) ────────
  function injectBlobs() {
    if (document.querySelector('.e26-blob')) return;
    ['e26-b1', 'e26-b2', 'e26-b3'].forEach(c => {
      const div = document.createElement('div');
      div.className = `e26-blob ${c}`;
      div.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(div, document.body.firstChild);
    });
  }

  // ──────── 2. 3D Tilt on cards (desktop only, hors .spotm) ────────
  function setup3DTilt() {
    if (isTouch || reduceMotion) return;
    const tiltSel = '.cover-card, .fed-card, .sport-card, .disc-card, .article';
    document.body.addEventListener('mousemove', (e) => {
      const card = e.target.closest(tiltSel);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = -py * 6;
      const ry = px * 6;
      card.style.transform = `translateY(-6px) scale(1.012) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }, { passive: true });
    document.body.addEventListener('mouseleave', () => {
      document.querySelectorAll(tiltSel).forEach(c => c.style.transform = '');
    });
    // Reset card transform when leaving it
    document.body.addEventListener('mouseout', (e) => {
      const card = e.target.closest(tiltSel);
      if (card && !card.contains(e.relatedTarget)) {
        card.style.transform = '';
      }
    });
  }

  // ──────── 3. Haptic feedback léger sur tap (mobile) ────────
  function setupHaptics() {
    if (!isTouch || !navigator.vibrate) return;
    const hapticSel = '.btn, .nav-link, .cover-card, .spotm, .fed-card, .sport-card, .disc-card, .bottom-tab, button, a.cta-primary';
    document.body.addEventListener('touchstart', (e) => {
      if (e.target.closest(hapticSel)) {
        navigator.vibrate(8);
      }
    }, { passive: true });
  }

  // ──────── 4. Ripple position dynamique sur boutons ────────
  function setupRipple() {
    document.body.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('.btn, button');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--ripple-x', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--ripple-y', `${e.clientY - rect.top}px`);
    }, { passive: true });
    document.body.addEventListener('touchstart', (e) => {
      const btn = e.target.closest('.btn, button');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const t = e.touches[0];
      btn.style.setProperty('--ripple-x', `${t.clientX - rect.left}px`);
      btn.style.setProperty('--ripple-y', `${t.clientY - rect.top}px`);
    }, { passive: true });
  }

  // ──────── 5. Parallax léger sur éléments [data-parallax] ────────
  function setupParallax() {
    if (reduceMotion) return;
    const items = document.querySelectorAll('[data-parallax]');
    if (!items.length) return;
    let ticking = false;
    function update() {
      const scrollY = window.scrollY;
      items.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        el.style.transform = `translateY(${scrollY * speed * -0.1}px)`;
      });
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // ──────── 6. Smooth page transitions (fade out au clic interne) ────────
  function setupPageTransitions() {
    if (reduceMotion) return;
    document.body.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      // Skip external links, anchors, mailto, tel, javascript
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
      if (a.target === '_blank') return;
      // Fade out body then navigate
      e.preventDefault();
      document.body.style.transition = 'opacity .25s ease, transform .25s ease';
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(-6px)';
      setTimeout(() => { window.location.href = href; }, 220);
    });
  }

  // ──────── 7. Reveal au scroll (boost les data-reveal existants) ────────
  function setupRevealBoost() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => obs.observe(el));
  }

  // ──────── INIT ────────
  function init() {
    injectBlobs();
    setupRipple();
    setup3DTilt();
    setupHaptics();
    setupParallax();
    setupRevealBoost();
    setupPageTransitions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

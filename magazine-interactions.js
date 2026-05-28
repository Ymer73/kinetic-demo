// ─── KINETIC MAGAZINE — Interactions Vanilla JS ───
// Converti depuis magazine-interactions.jsx (supprime la dépendance React)

function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  const onMove = (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  };
  const tick = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  const onHoverIn = (e) => {
    const t = e.target.closest('[data-cursor]');
    if (!t) return;
    ring.setAttribute('data-mode', t.getAttribute('data-cursor'));
    const label = t.getAttribute('data-cursor-label');
    if (label) ring.setAttribute('data-label', label);
  };
  const onHoverOut = (e) => {
    const t = e.target.closest('[data-cursor]');
    if (!t) return;
    ring.removeAttribute('data-mode');
    ring.removeAttribute('data-label');
  };

  window.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', onHoverIn);
  document.addEventListener('mouseout', onHoverOut);
  requestAnimationFrame(tick);
}

function initProgress() {
  const bar = document.querySelector('.read-progress');
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  els.forEach(el => io.observe(el));
}

function initMarqueeVelocity() {
  const tracks = document.querySelectorAll('.marquee-track');
  if (!tracks.length) return;
  let lastY = window.scrollY;
  let lastT = performance.now();
  let velocity = 0;

  const tick = () => {
    const y = window.scrollY;
    const t = performance.now();
    const v = (y - lastY) / Math.max(t - lastT, 1);
    velocity += (v - velocity) * 0.1;
    lastY = y; lastT = t;
    const speed = 1 + Math.min(Math.abs(velocity) * 4, 5);
    const dir = velocity < -0.05 ? -1 : 1;
    tracks.forEach(tr => {
      tr.style.animationDuration = `${36 / speed}s`;
      tr.style.animationDirection = dir < 0 ? 'reverse' : 'normal';
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Magnetic effect — appliqué directement sur un élément DOM
function applyMagnetic(el, strength = 0.35) {
  if (!el) return;
  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
}

// Tilt 3D — appliqué directement sur un élément DOM
function applyTilt(el, max = 8) {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const rx = (0.5 - (e.clientY - r.top) / r.height) * max;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * max;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
}

function initBoxTilt() {
  const box = document.querySelector('.hero-title .box');
  if (!box) return;
  window.addEventListener('mousemove', (e) => {
    const r = box.getBoundingClientRect();
    const rx = Math.max(-15, Math.min(15, -(e.clientY - (r.top + r.height / 2)) / 80));
    const ry = Math.max(-15, Math.min(15, (e.clientX - (r.left + r.width / 2)) / 80));
    box.style.setProperty('--tilt-x', `${rx}deg`);
    box.style.setProperty('--tilt-y', `${ry}deg`);
  });
}

function initBoxClick() {
  const box = document.querySelector('.hero-title .box');
  if (!box) return;
  box.addEventListener('click', () => {
    box.style.transition = 'transform .35s cubic-bezier(.34, 1.56, .64, 1)';
    box.style.transform = 'rotate(-12deg) scale(1.1)';
    setTimeout(() => { box.style.transform = ''; }, 350);
  });
}

Object.assign(window, {
  initCursor, initProgress, initReveal, initMarqueeVelocity,
  applyMagnetic, applyTilt, initBoxTilt, initBoxClick,
});

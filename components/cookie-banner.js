(function () {
  const KEY = 'kinetic_cookie_consent';
  if (localStorage.getItem(KEY)) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'false');
  banner.setAttribute('aria-label', 'Gestion des cookies');
  banner.setAttribute('aria-live', 'polite');

  banner.innerHTML = `
    <div class="cb-text">
      <strong>Kinetic utilise des cookies</strong>
      <span>Uniquement pour mémoriser ta progression dans le quiz et tes préférences. Aucune donnée publicitaire.</span>
    </div>
    <div class="cb-actions">
      <button class="cb-btn cb-accept" type="button">Accepter</button>
      <button class="cb-btn cb-refuse" type="button">Continuer sans accepter</button>
      <a href="cookies.html" class="cb-link">En savoir plus</a>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    #cookie-banner {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      background: rgba(14,11,31,.96);
      backdrop-filter: blur(24px) saturate(1.4);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 20px;
      padding: 18px 24px;
      color: white;
      font-family: 'Inter', -apple-system, system-ui, sans-serif;
      font-size: 13px;
      max-width: min(700px, calc(100vw - 32px));
      box-shadow: 0 16px 48px rgba(0,0,0,.4);
      animation: cbSlideIn .4s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes cbSlideIn {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    #cookie-banner.cb-hiding {
      animation: cbSlideOut .25s ease forwards;
    }
    @keyframes cbSlideOut {
      to { opacity: 0; transform: translateX(-50%) translateY(16px); }
    }
    .cb-text { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px; }
    .cb-text strong { font-weight: 700; font-size: 14px; }
    .cb-text span { opacity: .7; line-height: 1.4; }
    .cb-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
    .cb-btn {
      padding: 10px 18px; border-radius: 100px; border: none;
      font-family: inherit; font-size: 13px; font-weight: 700;
      cursor: pointer; transition: all .15s; white-space: nowrap;
    }
    .cb-accept { background: #FF5A1F; color: white; }
    .cb-accept:hover { background: #E34A10; }
    .cb-accept:focus-visible { outline: 3px solid white; outline-offset: 2px; }
    .cb-refuse { background: rgba(255,255,255,.1); color: white; border: 1px solid rgba(255,255,255,.18); }
    .cb-refuse:hover { background: rgba(255,255,255,.18); }
    .cb-refuse:focus-visible { outline: 3px solid white; outline-offset: 2px; }
    .cb-link { font-size: 12px; color: rgba(255,255,255,.5); text-decoration: underline; white-space: nowrap; }
    .cb-link:hover { color: rgba(255,255,255,.8); }
    @media (max-width: 900px) {
      /* Sur mobile, le bottom-nav flottant occupe le bas — on remonte le banner cookies */
      #cookie-banner {
        bottom: calc(88px + env(safe-area-inset-bottom));
        border-radius: 18px;
        padding: 16px 18px;
        max-width: calc(100vw - 24px);
      }
    }
    @media (max-width: 600px) {
      #cookie-banner { padding: 14px 16px; font-size: 12px; gap: 12px; }
      .cb-actions { width: 100%; justify-content: stretch; }
      .cb-btn { flex: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      #cookie-banner, #cookie-banner.cb-hiding { animation: none; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(banner);

  function dismiss(value) {
    try { localStorage.setItem(KEY, value); } catch(e){}
    banner.classList.add('cb-hiding');
    banner.addEventListener('animationend', () => banner.remove(), { once: true });
    // Fallback if animationend doesn't fire
    setTimeout(() => { if (banner.parentNode) banner.remove(); }, 400);
  }

  banner.querySelector('.cb-accept').addEventListener('click', () => dismiss('accepted'));
  banner.querySelector('.cb-refuse').addEventListener('click', () => dismiss('refused'));
})();

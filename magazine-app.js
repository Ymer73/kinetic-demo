// ─── KINETIC MAGAZINE — App bootstrap Vanilla JS ───

(function () {
  const root = document.getElementById('root');
  if (!root) return;

  // ── Render ──────────────────────────────────────────────────────────────────
  root.innerHTML = [
    '<main id="main-content">',
    renderHero(heroData, issueData),
    renderGeoBlock(),
    renderMarquee(marqueeItems),
    renderSportOfMonth(sportOfMonth, issueData),
    renderNewSection(newItems, issueData),
    renderAides(aidesData, issueData),
    renderChiffres(chiffresData),
    renderFooter(footerData, issueData),
    '</main>',
  ].join('\n');

  // ── Geo block logic ─────────────────────────────────────────────────────────
  (function initGeoBlock() {
    const form = document.getElementById('geo-form');
    if (!form) return;
    const cpInput   = document.getElementById('geo-cp');
    const locateBtn = document.getElementById('geo-locate');
    const errEl     = document.getElementById('geo-error');

    function showErr(msg)   { errEl.textContent = msg; }
    function clearErr()     { errEl.textContent = ''; }
    function goToMap(dept)  {
      if (!dept) { showErr("Département introuvable, réessaie avec un code postal."); return; }
      window.location.href = `map.html?dept=${dept}`;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErr();
      const cp = (cpInput.value || '').trim();
      if (!/^[0-9]{5}$/.test(cp)) {
        showErr("Saisis un code postal à 5 chiffres ou clique sur \"Me localiser\".");
        cpInput.focus();
        return;
      }
      const dept = (typeof getDeptFromCP === 'function') ? getDeptFromCP(cp) : cp.slice(0, 2);
      goToMap(dept);
    });

    locateBtn.addEventListener('click', () => {
      clearErr();
      if (!navigator.geolocation) {
        showErr("Géoloc indisponible sur ton navigateur. Saisis ton code postal.");
        return;
      }
      const originalLabel = locateBtn.innerHTML;
      locateBtn.disabled = true;
      locateBtn.setAttribute('aria-busy', 'true');
      locateBtn.innerHTML = '<span class="geo-btn-label">Localisation…</span>';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          const dept = (typeof getDeptFromCoords === 'function')
            ? getDeptFromCoords(lat, lng)
            : null;
          goToMap(dept);
        },
        () => {
          locateBtn.disabled = false;
          locateBtn.removeAttribute('aria-busy');
          locateBtn.innerHTML = originalLabel;
          showErr("Impossible de te localiser. Saisis ton code postal manuellement.");
          cpInput.focus();
        },
        { timeout: 8000, maximumAge: 60000 }
      );
    });
  })();

  // ── Inject video modal into body ─────────────────────────────────────────────
  const modalHTML = `
<div id="video-modal" class="vid-modal" role="dialog" aria-modal="true" aria-label="Lecteur vidéo" style="display:none">
  <div class="vid-modal-backdrop"></div>
  <div class="vid-modal-inner">
    <div class="vid-modal-wrap">
      <video id="vid-modal-video" preload="none" playsinline></video>
      <div class="vid-modal-controls">
        <button class="vid-ctrl vid-ctrl-restart" aria-label="Revenir au début">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3.96"/></svg>
        </button>
        <button class="vid-ctrl vid-ctrl-play" aria-label="Play/Pause">
          <svg class="ico-play" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          <svg class="ico-pause" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <button class="vid-ctrl vid-ctrl-mute" aria-label="Couper/rétablir le son">
          <svg class="ico-sound-on" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          <svg class="ico-sound-off" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true" style="display:none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        </button>
        <div class="vid-progress-wrap" role="progressbar" aria-label="Progression">
          <div class="vid-progress-bar"><div class="vid-progress-fill"></div></div>
        </div>
      </div>
    </div>
    <button class="vid-modal-close" aria-label="Fermer la vidéo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Inject modal styles
  const modalStyles = `
<style>
/* ── Video thumbnail ── */
.spotm-thumb {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px;
  cursor: pointer;
  background: linear-gradient(135deg, rgba(14,11,31,.55) 0%, rgba(46,26,122,.4) 100%);
  transition: background .2s;
}
.spotm-thumb:hover { background: linear-gradient(135deg, rgba(14,11,31,.7) 0%, rgba(46,26,122,.6) 100%); }
.spotm-thumb:hover .spotm-thumb-icon { transform: scale(1.15); }
.spotm-thumb-icon {
  width: 72px; height: 72px;
  background: rgba(255,255,255,.18);
  backdrop-filter: blur(8px);
  border: 2px solid rgba(255,255,255,.35);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1);
}
.spotm-thumb-label {
  font-family: 'Bebas Neue', Impact, sans-serif;
  font-size: 18px; letter-spacing: .12em;
  color: white; text-transform: uppercase;
}
.spotm-thumb-sub {
  font-size: 12px; color: rgba(255,255,255,.6);
  letter-spacing: .05em; text-transform: uppercase;
}

/* ── Video modal ── */
.vid-modal {
  position: fixed; inset: 0;
  z-index: 2000;
  align-items: center; justify-content: center;
  padding: 20px;
}
.vid-modal.is-open { display: flex !important; }
.vid-modal-backdrop {
  position: absolute; inset: 0;
  background: rgba(14,11,31,.92);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  animation: fadeIn .25s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.vid-modal-inner {
  position: relative; z-index: 1;
  width: 100%; max-width: 960px;
  animation: scaleIn .3s cubic-bezier(.34,1.56,.64,1);
}
@keyframes scaleIn { from { transform: scale(.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.vid-modal-wrap {
  background: #0E0B1F;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
.vid-modal-wrap video {
  width: 100%; display: block;
  max-height: 80vh; object-fit: contain;
  background: #000;
}
.vid-modal-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: rgba(14,11,31,.95);
  backdrop-filter: blur(8px);
}
.vid-ctrl {
  width: 44px; height: 44px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 50%;
  color: white;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .15s;
  flex-shrink: 0;
}
.vid-ctrl:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.3); transform: scale(1.08); }
.vid-ctrl-play {
  width: 52px; height: 52px;
  background: var(--orange, #FF5A1F);
  border-color: var(--orange, #FF5A1F);
}
.vid-ctrl-play:hover { background: #e04a0f; border-color: #e04a0f; }
.vid-progress-wrap {
  flex: 1;
  padding: 0 4px;
}
.vid-progress-bar {
  height: 4px;
  background: rgba(255,255,255,.15);
  border-radius: 100px;
  overflow: hidden;
  cursor: pointer;
}
.vid-progress-bar:hover { height: 6px; margin: -1px 0; }
.vid-progress-fill {
  height: 100%; width: 0%;
  background: var(--orange, #FF5A1F);
  border-radius: 100px;
  transition: width .1s linear;
}
.vid-modal-close {
  position: absolute;
  top: -48px; right: 0;
  width: 40px; height: 40px;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 50%;
  color: white;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .15s;
}
.vid-modal-close:hover { background: rgba(255,255,255,.25); transform: rotate(90deg); }
</style>`;
  document.head.insertAdjacentHTML('beforeend', modalStyles);

  // ── Video modal logic ────────────────────────────────────────────────────────
  const modal     = document.getElementById('video-modal');
  const modalVid  = document.getElementById('vid-modal-video');
  const playBtn   = modal.querySelector('.vid-ctrl-play');
  const muteBtn   = modal.querySelector('.vid-ctrl-mute');
  const restartBtn= modal.querySelector('.vid-ctrl-restart');
  const closeBtn  = modal.querySelector('.vid-modal-close');
  const progress  = modal.querySelector('.vid-progress-fill');
  const progressBar = modal.querySelector('.vid-progress-bar');
  const backdrop  = modal.querySelector('.vid-modal-backdrop');

  function openVideoModal(src) {
    if (!modalVid.src || !modalVid.src.endsWith(src)) {
      modalVid.src = src;
    }
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('is-open'));
    modalVid.play();
    syncPlayUI();
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    modal.classList.remove('is-open');
    modalVid.pause();
    document.body.style.overflow = '';
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }

  function syncPlayUI() {
    const playing = !modalVid.paused;
    playBtn.querySelector('.ico-play').style.display  = playing ? 'none' : '';
    playBtn.querySelector('.ico-pause').style.display = playing ? '' : 'none';
    playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  }

  function syncMuteUI() {
    muteBtn.querySelector('.ico-sound-on').style.display  = modalVid.muted ? 'none' : '';
    muteBtn.querySelector('.ico-sound-off').style.display = modalVid.muted ? '' : 'none';
    muteBtn.setAttribute('aria-label', modalVid.muted ? 'Rétablir le son' : 'Couper le son');
  }

  playBtn.addEventListener('click', () => {
    modalVid.paused ? modalVid.play() : modalVid.pause();
  });
  muteBtn.addEventListener('click', () => {
    modalVid.muted = !modalVid.muted;
    syncMuteUI();
  });
  restartBtn.addEventListener('click', () => {
    modalVid.currentTime = 0;
    modalVid.play();
    syncPlayUI();
  });
  closeBtn.addEventListener('click', closeVideoModal);
  backdrop.addEventListener('click', closeVideoModal);

  modalVid.addEventListener('play',  syncPlayUI);
  modalVid.addEventListener('pause', syncPlayUI);
  modalVid.addEventListener('timeupdate', () => {
    if (modalVid.duration) {
      progress.style.width = (modalVid.currentTime / modalVid.duration * 100) + '%';
    }
  });
  modalVid.addEventListener('ended', () => { progress.style.width = '100%'; syncPlayUI(); });

  progressBar.addEventListener('click', e => {
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (modalVid.duration) modalVid.currentTime = pct * modalVid.duration;
  });

  // Keyboard: Espace = play/pause, Échap = fermer, M = mute
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeVideoModal();
    if (e.key === ' ') { e.preventDefault(); modalVid.paused ? modalVid.play() : modalVid.pause(); }
    if (e.key === 'm' || e.key === 'M') { modalVid.muted = !modalVid.muted; syncMuteUI(); }
  });

  // Clic sur le thumbnail → ouvre le modal
  document.addEventListener('click', e => {
    const thumb = e.target.closest('.spotm-thumb[data-video]');
    if (thumb) openVideoModal(thumb.dataset.video);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const thumb = e.target.closest('.spotm-thumb[data-video]');
      if (thumb) { e.preventDefault(); openVideoModal(thumb.dataset.video); }
    }
  });

  // ── Autres interactions ──────────────────────────────────────────────────────
  initCursor();
  initProgress();
  initReveal();
  initMarqueeVelocity();
  initBoxTilt();
  initBoxClick();

  // Magnetic sur les boutons CTA principaux
  document.querySelectorAll('.hero-cta-row .btn, .spotm-cta-row .btn').forEach(el => applyMagnetic(el));

  // Tilt 3D sur les cards "Nouveau"
  document.querySelectorAll('.new-card').forEach(el => applyTilt(el, 10));
})();

/**
 * ma-fiche.js
 * Page privée d'auto-déclaration via lien magique.
 *
 * Flow :
 * 1. Lit le token depuis ?t=... dans l'URL
 * 2. Appelle /validate-token sur le worker pour obtenir club_id + dep
 * 3. Charge la fiche du club depuis clubs/dept-XX.json (public)
 * 4. Pré-remplit le formulaire avec les valeurs connues
 * 5. À la soumission, renvoie le token au worker (qui re-vérifie)
 */
(function () {
  'use strict';

  const ENDPOINT = window.KINETIC_CLAIM_ENDPOINT
    || 'https://kinetic-claim.shiny-sun-bb38.workers.dev';

  // ─── DOM refs ─────────────────────────────────────────────────
  const $loading = document.getElementById('mf-loading');
  const $error = document.getElementById('mf-error');
  const $errorMsg = document.getElementById('mf-error-msg');
  const $formState = document.getElementById('mf-form-state');
  const $clubName = document.getElementById('mf-club-name');
  const $clubMeta = document.getElementById('mf-club-meta');
  const $form = document.getElementById('mf-form');
  const $submitBtn = document.getElementById('mf-submit');
  const $status = document.getElementById('mf-status');
  const $equipesList = document.getElementById('mf-equipes-list');
  const $planningList = document.getElementById('mf-planning-list');
  const $addEquipe = document.getElementById('mf-add-equipe');
  const $addPlanning = document.getElementById('mf-add-planning');

  // ─── Constantes ───────────────────────────────────────────────
  const GENRES = ['Mixte', 'H', 'F'];
  const CATEGORIES = ['Enfant', 'U10', 'U13', 'U15', 'U18', 'Senior', 'Vétéran'];
  const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  // ─── State ────────────────────────────────────────────────────
  let token = null;
  let clubId = null;
  let dep = null;
  let club = null;

  // ─── Helpers ──────────────────────────────────────────────────
  function showError(msg) {
    $loading.style.display = 'none';
    $formState.style.display = 'none';
    $error.style.display = 'block';
    if (msg) $errorMsg.textContent = msg;
  }
  function showForm() {
    $loading.style.display = 'none';
    $error.style.display = 'none';
    $formState.style.display = 'block';
  }
  function setStatus(type, msg) {
    $status.className = 'mf-status ' + (type || '');
    $status.textContent = msg || '';
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[m]));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  // ─── Rows dynamiques ──────────────────────────────────────────
  function addEquipe(data) {
    data = data || {};
    const row = document.createElement('div');
    row.className = 'mf-team-row';
    row.innerHTML = `
      <input type="text" placeholder="Nom (ex: Seniors H)" class="mf-eq-nom" maxlength="60" value="${escapeHtml(data.nom || '')}" />
      <select class="mf-eq-genre">${GENRES.map(g => `<option ${data.genre === g ? 'selected' : ''}>${g}</option>`).join('')}</select>
      <select class="mf-eq-cat">${CATEGORIES.map(c => `<option ${data.categorie === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
      <button type="button" class="mf-remove-btn" aria-label="Supprimer">×</button>
    `;
    row.querySelector('.mf-remove-btn').addEventListener('click', () => row.remove());
    $equipesList.appendChild(row);
  }
  function addPlanning(data) {
    data = data || {};
    const row = document.createElement('div');
    row.className = 'mf-plan-row';
    row.innerHTML = `
      <input type="text" placeholder="Équipe (ex: U13)" class="mf-pl-eq" maxlength="60" value="${escapeHtml(data.equipe || '')}" />
      <select class="mf-pl-jour">${JOURS.map(j => `<option ${data.jour === j ? 'selected' : ''}>${j}</option>`).join('')}</select>
      <input type="time" class="mf-pl-debut" value="${escapeAttr(data.debut || '')}" />
      <input type="time" class="mf-pl-fin" value="${escapeAttr(data.fin || '')}" />
      <button type="button" class="mf-remove-btn" aria-label="Supprimer">×</button>
    `;
    row.querySelector('.mf-remove-btn').addEventListener('click', () => row.remove());
    $planningList.appendChild(row);
  }
  $addEquipe.addEventListener('click', () => addEquipe());
  $addPlanning.addEventListener('click', () => addPlanning());

  // ─── Pre-fill ─────────────────────────────────────────────────
  function prefill(c) {
    const setVal = (id, v) => { const el = document.getElementById(id); if (el && v != null && v !== '') el.value = v; };
    setVal('mf-tel', c.tel || '');
    setVal('mf-email', c.email || '');
    setVal('mf-web', c.web || '');
    setVal('mf-instagram', c.instagram || '');
    setVal('mf-facebook', c.facebook || '');
    setVal('mf-tiktok', c.tiktok || '');
    setVal('mf-youtube', c.youtube || '');
    setVal('mf-nb-licencies', c.nb_licencies || '');
    setVal('mf-annee', c.annee_licencies || '');

    if (Array.isArray(c.equipes) && c.equipes.length) {
      c.equipes.forEach(eq => addEquipe(eq));
    } else {
      addEquipe();
    }
    if (Array.isArray(c.planning) && c.planning.length) {
      c.planning.forEach(pl => addPlanning(pl));
    } else {
      addPlanning();
    }
  }

  // ─── Init : vérifier token + charger club ─────────────────────
  async function init() {
    const params = new URLSearchParams(location.search);
    token = params.get('t');
    if (!token) {
      showError('Aucun token dans l\'URL. Utilisez le lien que vous avez reçu par email.');
      return;
    }

    // 1. Valider le token
    let tokenInfo;
    try {
      const res = await fetch(ENDPOINT + '/validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      tokenInfo = await res.json();
      if (!res.ok || !tokenInfo.valid) {
        showError(tokenInfo.reason === 'token expiré'
          ? 'Ce lien a expiré. Contactez-nous pour en recevoir un nouveau.'
          : 'Ce lien n\'est plus valide.');
        return;
      }
    } catch (e) {
      showError('Impossible de contacter le serveur. Réessayez dans quelques minutes.');
      return;
    }
    clubId = tokenInfo.club_id;
    dep = tokenInfo.dep;

    // 2. Charger la fiche du club
    try {
      const res = await fetch(`clubs/dept-${encodeURIComponent(dep)}.json`);
      if (!res.ok) throw new Error('json HTTP ' + res.status);
      const data = await res.json();
      const clubs = data.clubs || [];
      club = clubs.find(c => c.id === clubId);
      if (!club) {
        showError('Club introuvable dans la base. Contactez-nous pour vérifier.');
        return;
      }
    } catch (e) {
      showError('Impossible de charger la fiche du club.');
      return;
    }

    // 3. Pré-remplir
    $clubName.textContent = club.nom || clubId;
    const meta = [club.disc, club.ville].filter(Boolean).join(' · ');
    $clubMeta.textContent = meta || '';
    document.title = `Compléter la fiche - ${club.nom || clubId} - Kinetic`;
    prefill(club);
    showForm();
  }

  // ─── Submit ──────────────────────────────────────────────────
  $form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', '');

    const fd = new FormData($form);
    const data = {
      token,
      club_id: clubId,
      dep,
      club_nom: club?.nom || '',
      submitted_at: new Date().toISOString(),
      contact: {
        nom: fd.get('contact_nom')?.toString().trim(),
        role: fd.get('contact_role')?.toString().trim() || null,
        email: fd.get('contact_email')?.toString().trim()
      },
      tel: fd.get('tel')?.toString().trim() || null,
      email: fd.get('email')?.toString().trim() || null,
      web: fd.get('web')?.toString().trim() || null,
      instagram: fd.get('instagram')?.toString().trim() || null,
      facebook: fd.get('facebook')?.toString().trim() || null,
      tiktok: fd.get('tiktok')?.toString().trim() || null,
      youtube: fd.get('youtube')?.toString().trim() || null,
      nb_licencies: fd.get('nb_licencies') ? parseInt(fd.get('nb_licencies'), 10) : null,
      annee_licencies: fd.get('annee_licencies') ? parseInt(fd.get('annee_licencies'), 10) : null,
      equipes: [...$equipesList.children].map(row => ({
        nom: row.querySelector('.mf-eq-nom')?.value.trim() || '',
        genre: row.querySelector('.mf-eq-genre')?.value || 'Mixte',
        categorie: row.querySelector('.mf-eq-cat')?.value || 'Senior'
      })).filter(eq => eq.nom),
      planning: [...$planningList.children].map(row => ({
        equipe: row.querySelector('.mf-pl-eq')?.value.trim() || '',
        jour: row.querySelector('.mf-pl-jour')?.value || '',
        debut: row.querySelector('.mf-pl-debut')?.value || '',
        fin: row.querySelector('.mf-pl-fin')?.value || ''
      })).filter(pl => pl.equipe && pl.jour && pl.debut),
      enrichi_par: 'club_self'
    };

    if (!data.contact.nom || !data.contact.email) {
      setStatus('error', 'Votre nom et votre email sont requis.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.email)) {
      setStatus('error', 'Email invalide.');
      return;
    }

    // Cloudflare Turnstile (audit 2026-05-28) : recupere le token et l'envoie au Worker
    const turnstileResponse = (window.turnstile && typeof window.turnstile.getResponse === 'function')
      ? window.turnstile.getResponse()
      : (document.querySelector('input[name="cf-turnstile-response"]')?.value || '');
    if (!turnstileResponse) {
      setStatus('error', 'Validation anti-spam non complete. Re-essaie dans une seconde.');
      return;
    }
    data.turnstile_token = turnstileResponse;

    $submitBtn.disabled = true;
    setStatus('loading', 'Envoi en cours...');

    try {
      const res = await fetch(ENDPOINT + '/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Erreur ${res.status} : ${text || 'soumission refusée'}`);
      }
      const json = await res.json().catch(() => ({}));
      setStatus('success',
        'Merci ! Vos infos ont été envoyées. ' +
        'Elles seront publiées après une vérification rapide. ' +
        'Vous pouvez fermer cette page.'
      );
      $submitBtn.textContent = 'Envoyé ✓';
      $submitBtn.style.background = 'var(--green)';
    } catch (err) {
      console.error('[ma-fiche]', err);
      setStatus('error', err.message || 'Une erreur est survenue. Réessaye plus tard.');
      $submitBtn.disabled = false;
    }
  });

  init();
})();

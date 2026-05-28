(function () {
  const script = document.currentScript;
  // Footer unifié sur toutes les pages : on force le footer "legacy" (glass clair) partout
  // pour rester cohérent avec index.html / map.html / sport.html.
  const isMockup = false;

  // ─── FOOTER WTTJ-style (mockup) ───
  const mockupHTML = `
<footer class="k-footer" role="contentinfo">
  <div class="k-footer-grid">
    <div class="col">
      <div class="bebas" style="font-size:32px; letter-spacing:.04em; color:white;">
        <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:var(--km-orange,#FF5A1F);margin-right:8px;vertical-align:middle;"></span>
        KINETIC
      </div>
      <p class="brand-blurb">"Le sport, mais fun." Le bottin sportif de la France. 290 disciplines, 126 000 clubs, 128 fédérations. Indépendant, gratuit, sans pub.</p>
      <div class="k-socials">
        <a href="https://instagram.com/kineticstudio.fr" aria-label="Instagram" target="_blank" rel="noopener">📷</a>
        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener">💼</a>
        <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener">▶</a>
        <a href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noopener">♪</a>
      </div>
    </div>
    <div class="col">
      <h4>Tu cherches un sport</h4>
      <ul>
        <li><a href="trouver-club.html">Trouver un club</a></li>
        <li><a href="explorer-sports.html">Explorer les sports</a></li>
        <li><a href="map.html">Carte de France</a></li>
        <li><a href="nouveautes.html">Nouveautés</a></li>
        <li><a href="sports-du-mois.html">Le mag du mois</a></li>
      </ul>
    </div>
    <div class="col">
      <h4>Tu pratiques déjà</h4>
      <ul>
        <li><a href="federations.html">Fédérations</a></li>
        <li><a href="aide-passsport.html">Pass'Sport 100€</a></li>
        <li><a href="aide-sport-ordonnance.html">Sport sur ordonnance</a></li>
        <li><a href="aide-mutuelles.html">Mutuelles bien-être</a></li>
        <li><a href="handisport.html">Parasport</a></li>
      </ul>
    </div>
    <div class="col">
      <h4>Kinetic</h4>
      <ul>
        <li><a href="about.html">Le concept</a></li>
        <li><a href="contact-presse.html">Presse</a></li>
        <li><a href="newsletter.html">Newsletter</a></li>
        <li><a href="mentions-legales.html">Mentions légales</a></li>
        <li><a href="cgu.html">CGU · Cookies</a></li>
      </ul>
    </div>
  </div>
  <div class="k-footer-bottom">
    <span>© 2026 Kinetic Studio. Tous droits réservés.</span>
    <span>Made in France · v3.0 · 🌐 FR</span>
  </div>
</footer>`;

  // ─── FOOTER LEGACY (anciennes pages) ───
  const legacyHTML = `
<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo" aria-label="Kinetic">KINETIC</div>
      <p>La plateforme qui te matche avec ton sport idéal parmi 290 sports et 126 fédérations.</p>
    </div>
    <div class="footer-col">
      <h4>Explorer</h4>
      <a href="explorer-sports.html">Explorer des sports</a>
      <a href="trouver-club.html">Trouver un club</a>
      <a href="nouveautes.html">Nouveautés</a>
      <a href="map.html">Carte</a>
      <a href="handisport.html">Parasport</a>
    </div>
    <div class="footer-col">
      <h4>Outils</h4>
      <a href="federations.html">Fédérations</a>
      <a href="aide-passsport.html">Pass'Sport 100€</a>
      <a href="aide-sport-ordonnance.html">Sport sur ordonnance</a>
      <a href="aide-mutuelles.html">Mutuelles bien-être</a>
      <a href="about.html">À propos</a>
    </div>
    <div class="footer-col">
      <h4>Légal</h4>
      <a href="mentions-legales.html">Mentions légales</a>
      <a href="cgu.html">CGU</a>
      <a href="confidentialite.html">Confidentialité</a>
      <a href="cookies.html">Cookies</a>
      <a href="contact-presse.html">Contact presse</a>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2026 Kinetic. Born for speed.</div>
    <div>Made in France · v3.0</div>
  </div>
</footer>`;

  script.insertAdjacentHTML('beforebegin', isMockup ? mockupHTML : legacyHTML);
})();

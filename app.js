// ============================================
// KINETIC DEMO - Logique commune
// ============================================

// Helper: clamp d'une valeur entre min et max
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// === HOMEPAGE: grille des sports ===
function renderSportsGrid(elementId) {
  const grid = document.getElementById(elementId);
  if (!grid) return;
  grid.innerHTML = SPORTS.map(s => `
    <a href="sport.html?s=${s.slug}" class="sport-card fade-up" style="--sport-color: ${s.color};">
      <span class="sport-card-emoji">${s.emoji}</span>
      <div class="sport-card-name">${s.name}</div>
      <div class="sport-card-tagline">${s.tagline}</div>
    </a>
  `).join('');
}

// === QUIZ ===
let currentStep = 0;
let answers = {};

function initQuiz() {
  currentStep = 0;
  answers = {};
  showQuestion();
}

function showQuestion() {
  const q = QUESTIONS[currentStep];
  if (!q) {
    // Quiz terminé, on enregistre et redirige
    sessionStorage.setItem('kinetic_demo_answers', JSON.stringify(answers));
    window.location.href = 'results.html';
    return;
  }
  document.getElementById('step-counter').textContent = `QUESTION ${currentStep + 1} / ${QUESTIONS.length}`;
  document.getElementById('progress-bar').style.width = `${((currentStep + 1) / QUESTIONS.length) * 100}%`;
  document.getElementById('question-title').textContent = q.title;
  document.getElementById('question-subtitle').textContent = q.subtitle;
  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = q.options.map((o, i) => `
    <button class="quiz-option fade-up delay-${Math.min(i+1, 3)}" onclick="answerQuestion('${q.key}', ${JSON.stringify(o.value).replace(/"/g, '&quot;')})">
      <span class="emoji">${o.emoji}</span>
      <span>${o.label}</span>
    </button>
  `).join('');
  // Reset animation
  const wrap = document.getElementById('question-wrap');
  wrap.classList.remove('fade-up');
  void wrap.offsetWidth;
  wrap.classList.add('fade-up');
}

function answerQuestion(key, value) {
  answers[key] = value;
  currentStep++;
  showQuestion();
}

// === RESULTS: scoring ===
function scoreSport(sport, ans) {
  let score = 0;
  // Match intensité (sur 30)
  if (ans.intensity) score += 30 - Math.abs(sport.intensity - ans.intensity) * 6;
  // Match social (sur 25)
  if (ans.social) score += 25 - Math.abs(sport.social - ans.social) * 5;
  // Match outdoor (sur 25)
  if (ans.outdoor) score += 25 - Math.abs(sport.outdoor - ans.outdoor) * 5;
  // Match skill (sur 20)
  if (ans.skill) score += 20 - Math.abs(sport.skill - ans.skill) * 4;
  // Bonus vibe
  if (ans.vibe === 'discipline' && sport.skill >= 4) score += 8;
  if (ans.vibe === 'fun' && sport.social >= 4) score += 8;
  if (ans.vibe === 'perf' && sport.intensity >= 4) score += 8;
  return clamp(Math.round(score), 0, 100);
}

function renderResults() {
  const raw = sessionStorage.getItem('kinetic_demo_answers');
  const ans = raw ? JSON.parse(raw) : { intensity: 3, social: 3, outdoor: 3, skill: 3, vibe: 'fun' };
  const scored = SPORTS.map(s => ({ ...s, score: scoreSport(s, ans) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const list = document.getElementById('results-list');
  list.innerHTML = scored.map((s, i) => `
    <a href="sport.html?s=${s.slug}" class="result-card ${i === 0 ? 'top' : ''} fade-up delay-${Math.min(i+1, 3)}" style="--sport-color: ${s.color};">
      <span class="result-emoji">${s.emoji}</span>
      <div class="result-info">
        <div class="result-name">${s.name}</div>
        <div class="result-tagline">${s.tagline}</div>
        <span class="result-score">${s.score}% match</span>
      </div>
    </a>
  `).join('');
}

// === SPORT PAGE ===
function renderSportPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('s') || 'escalade';
  const sport = SPORTS.find(s => s.slug === slug) || SPORTS[0];

  document.title = `${sport.name} · Kinetic Studio`;
  document.getElementById('sport-emoji').textContent = sport.emoji;
  document.getElementById('sport-name').textContent = sport.name;
  document.getElementById('sport-tagline').textContent = sport.tagline;
  document.getElementById('sport-description').textContent = sport.description;

  // Stats avec barres
  const statsEl = document.getElementById('sport-stats');
  const stats = [
    { label: 'Intensité', value: sport.intensity },
    { label: 'Social', value: sport.social },
    { label: 'Outdoor', value: sport.outdoor },
    { label: 'Technique', value: sport.skill }
  ];
  statsEl.innerHTML = stats.map(s => `
    <div class="sport-stat" style="--sport-color: ${sport.color};">
      <div class="sport-stat-label">${s.label}</div>
      <div class="sport-stat-bars">
        ${[1,2,3,4,5].map(n => `<div class="bar ${n <= s.value ? 'fill' : ''}"></div>`).join('')}
      </div>
    </div>
  `).join('');

  // Hero color
  document.getElementById('sport-hero').style.borderBottom = `3px solid ${sport.color}`;

  // Clubs
  const clubsEl = document.getElementById('clubs-list');
  clubsEl.innerHTML = sport.clubs.map(c => `
    <div class="club-card">
      <div>
        <div class="club-name">${c.name}</div>
        <div class="club-meta">
          <span>📍 ${c.city}</span>
          <span>🎯 ${c.level}</span>
        </div>
      </div>
      <div class="club-price">${c.price}</div>
    </div>
  `).join('');
}

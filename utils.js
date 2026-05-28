// ─── KINETIC shared utilities ─────────────────────────────────────────────────

// ── Dept code helpers ─────────────────────────────────────────────────────────

/**
 * Returns the 2-3 char dept code from a French GPS position.
 * Covers métropole + Corse (2A/2B). Falls back to '75' if nothing matched.
 */
function getDeptFromCoords(lat, lng) {
  const DEPTS = [
    ['75', 48.81, 48.91, 2.22, 2.47], ['92', 48.78, 48.95, 2.15, 2.32],
    ['93', 48.83, 48.98, 2.32, 2.62], ['94', 48.70, 48.87, 2.29, 2.57],
    ['77', 48.27, 49.09, 2.39, 3.56], ['78', 48.48, 49.10, 1.44, 2.16],
    ['91', 48.28, 48.79, 1.90, 2.60], ['95', 48.92, 49.26, 1.62, 2.55],
    ['13', 43.16, 43.94, 4.59, 5.83], ['33', 44.19, 45.58, -1.21, 0.04],
    ['69', 45.46, 46.31, 4.47, 5.40], ['59', 50.03, 51.09, 2.28, 4.27],
    ['31', 42.69, 43.98, 0.67, 2.14], ['06', 43.43, 44.37, 6.64, 7.72],
    ['67', 47.42, 49.07, 6.89, 8.24], ['44', 46.59, 47.99, -2.55, -0.54],
    ['34', 43.19, 44.26, 2.88, 4.22], ['35', 47.61, 48.79, -2.29, -0.58],
    ['76', 49.24, 50.07, 0.01, 1.90], ['57', 48.52, 49.81, 5.93, 7.64],
    ['38', 44.58, 45.90, 4.71, 6.40], ['29', 47.49, 48.76, -5.14, -3.30],
    ['62', 50.02, 51.01, 1.51, 3.24], ['56', 47.27, 48.13, -3.81, -1.79],
    ['64', 42.78, 43.89, -1.80, -0.05], ['01', 45.60, 46.53, 4.73, 6.03],
    ['63', 45.01, 46.35, 2.42, 4.01], ['42', 45.14, 46.33, 3.72, 4.90],
    ['49', 46.87, 47.97, -1.61, 0.25], ['74', 45.66, 46.44, 5.78, 7.05],
    ['37', 46.73, 47.76, 0.04, 1.49], ['84', 43.66, 44.52, 4.58, 5.76],
    ['73', 45.05, 46.00, 5.75, 7.23], ['45', 47.41, 48.51, 1.21, 3.10],
    ['80', 49.43, 50.35, 1.39, 3.27], ['54', 48.43, 49.66, 5.46, 7.03],
    ['83', 42.98, 43.87, 5.56, 6.97], ['85', 46.27, 47.22, -2.30, -0.55],
    ['72', 47.65, 48.55, -0.16, 0.91], ['81', 43.46, 44.20, 1.54, 2.93],
    // Corse — must come before generic fallback
    ['2A', 41.36, 42.09, 8.54, 9.56], ['2B', 41.90, 43.03, 8.80, 9.75],
  ];
  for (const [dep, minLat, maxLat, minLng, maxLng] of DEPTS) {
    if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) return dep;
  }
  return '75';
}

/**
 * Normalise un code dept depuis un code postal ou code INSEE.
 * Gère les cas Corse 2A/2B : cp 20200 → 2A, cp 20600 → 2B.
 * @param {string|number} cp
 * @returns {string}
 */
function getDeptFromCP(cp) {
  const s = String(cp).trim();
  if (s.startsWith('2A') || s.startsWith('2B')) return s.slice(0, 2);
  if (s.length >= 5) {
    const prefix = s.slice(0, 5);
    const num = parseInt(prefix, 10);
    if (num >= 20000 && num <= 20190) return '2A';
    if (num >= 20200 && num <= 20999) return '2B';
  }
  const twoDigit = s.slice(0, 2);
  if (s.startsWith('97') && s.length >= 3) return s.slice(0, 3);
  return twoDigit;
}

// ── Haversine (memoized) ──────────────────────────────────────────────────────

const _distCache = new Map();

/**
 * Returns distance in km between two GPS points.
 * Results are memoized by club id if provided.
 */
function haversine(lat1, lon1, lat2, lon2, clubId) {
  if (clubId !== undefined && _distCache.has(clubId)) return _distCache.get(clubId);
  const R = 6371;
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  if (clubId !== undefined) _distCache.set(clubId, d);
  return d;
}

function clearDistCache() { _distCache.clear(); }

// ── Dept JSON loader with loading UI ─────────────────────────────────────────

/**
 * Fetches a dept clubs JSON file and shows a loading indicator in `container`.
 * Returns array of clubs, or [] on error.
 * @param {string} deptCode
 * @param {Element} container  — element to show spinner in while loading
 * @returns {Promise<object[]>}
 */
async function loadDeptClubs(deptCode, container) {
  if (container) {
    container.innerHTML = `
      <div class="dept-loading" role="status" aria-live="polite">
        <div class="dept-spinner"></div>
        <span>Recherche des clubs dans le département ${deptCode.toUpperCase()}…</span>
      </div>`;
  }
  try {
    const resp = await fetch(`clubs/dept-${deptCode}.json`);
    if (resp.ok) {
      const data = await resp.json();
      // Dept JSON files are direct arrays, not {clubs:[...]} objects
      return Array.isArray(data) ? data : (data.clubs || []);
    }
    // Try split files (dept-XX-1.json …)
    const parts = [];
    for (let i = 1; i <= 5; i++) {
      const r = await fetch(`clubs/dept-${deptCode}-${i}.json`);
      if (!r.ok) break;
      const d = await r.json();
      parts.push(...(Array.isArray(d) ? d : (d.clubs || [])));
    }
    return parts;
  } catch {
    return [];
  }
}

// ── Quiz state ────────────────────────────────────────────────────────────────

const QUIZ_KEY = 'kinetic_quiz_v3';
const QUIZ_SCHEMA = ['answers', 'sequence', 'remaining', 'step'];

/**
 * Safely reads quiz state from sessionStorage.
 * Returns null (and wipes corrupt data) if the stored value is invalid.
 */
function safeGetQuizState() {
  try {
    const raw = sessionStorage.getItem(QUIZ_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (!state || typeof state !== 'object') throw new Error('not an object');
    for (const key of QUIZ_SCHEMA) {
      if (!(key in state)) throw new Error(`missing key: ${key}`);
    }
    if (!Array.isArray(state.answers) || !Array.isArray(state.sequence)) throw new Error('bad arrays');
    if (typeof state.step !== 'number') throw new Error('bad step');
    return state;
  } catch {
    sessionStorage.removeItem(QUIZ_KEY);
    return null;
  }
}

function safeSetQuizState(state) {
  try { sessionStorage.setItem(QUIZ_KEY, JSON.stringify(state)); } catch { /* quota exceeded */ }
}

function clearQuizState() { sessionStorage.removeItem(QUIZ_KEY); }

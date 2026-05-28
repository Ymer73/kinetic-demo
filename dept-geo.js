/**
 * dept-geo.js — Données géographiques statiques des départements français
 *
 * Expose :
 *  - DEPT_CENTERS : { '73': { lat, lon, nom } }
 *      coords du chef-lieu, sert de fallback quand on n'a pas mieux que le code dépt
 *  - DEPT_ADJACENTS : { '73': ['01','38','74','26','05'] }
 *      départements limitrophes, sert pour l'élargissement de rayon
 *  - cpToDept(cp) : '73160' -> '73'
 *  - normalizeDept(input) : 'savoie' / 'Savoie' / '73' -> '73'
 *
 * Source coords : INSEE chef-lieu, Source adjacents : data.gouv.fr
 * Format CP français : 2 premiers chiffres = dept, sauf Corse (20→2A/2B) et DOM (97x).
 */

const DEPT_CENTERS = {
  '01': { lat: 46.2050, lon: 5.2256, nom: 'Ain' },
  '02': { lat: 49.5675, lon: 3.6240, nom: 'Aisne' },
  '03': { lat: 46.5630, lon: 3.3300, nom: 'Allier' },
  '04': { lat: 44.0917, lon: 6.2358, nom: 'Alpes-de-Haute-Provence' },
  '05': { lat: 44.5588, lon: 6.0786, nom: 'Hautes-Alpes' },
  '06': { lat: 43.7000, lon: 7.2500, nom: 'Alpes-Maritimes' },
  '07': { lat: 44.7340, lon: 4.6010, nom: 'Ardèche' },
  '08': { lat: 49.7625, lon: 4.7240, nom: 'Ardennes' },
  '09': { lat: 42.9637, lon: 1.6044, nom: 'Ariège' },
  '10': { lat: 48.2973, lon: 4.0744, nom: 'Aube' },
  '11': { lat: 43.2130, lon: 2.3491, nom: 'Aude' },
  '12': { lat: 44.3506, lon: 2.5733, nom: 'Aveyron' },
  '13': { lat: 43.2965, lon: 5.3698, nom: 'Bouches-du-Rhône' },
  '14': { lat: 49.1829, lon: -0.3707, nom: 'Calvados' },
  '15': { lat: 44.9319, lon: 2.4439, nom: 'Cantal' },
  '16': { lat: 45.6500, lon: 0.1500, nom: 'Charente' },
  '17': { lat: 45.7484, lon: -0.6306, nom: 'Charente-Maritime' },
  '18': { lat: 47.0810, lon: 2.3990, nom: 'Cher' },
  '19': { lat: 45.2667, lon: 1.7667, nom: 'Corrèze' },
  '2A': { lat: 41.9189, lon: 8.7388, nom: 'Corse-du-Sud' },
  '2B': { lat: 42.7028, lon: 9.4502, nom: 'Haute-Corse' },
  '21': { lat: 47.3220, lon: 5.0415, nom: 'Côte-d\'Or' },
  '22': { lat: 48.5145, lon: -2.7700, nom: 'Côtes-d\'Armor' },
  '23': { lat: 46.1700, lon: 1.8728, nom: 'Creuse' },
  '24': { lat: 45.1840, lon: 0.7218, nom: 'Dordogne' },
  '25': { lat: 47.2378, lon: 6.0241, nom: 'Doubs' },
  '26': { lat: 44.9333, lon: 4.8917, nom: 'Drôme' },
  '27': { lat: 49.0246, lon: 1.1500, nom: 'Eure' },
  '28': { lat: 48.4500, lon: 1.4833, nom: 'Eure-et-Loir' },
  '29': { lat: 48.0930, lon: -4.0950, nom: 'Finistère' },
  '30': { lat: 43.8367, lon: 4.3601, nom: 'Gard' },
  '31': { lat: 43.6047, lon: 1.4442, nom: 'Haute-Garonne' },
  '32': { lat: 43.6450, lon: 0.5870, nom: 'Gers' },
  '33': { lat: 44.8378, lon: -0.5792, nom: 'Gironde' },
  '34': { lat: 43.6108, lon: 3.8767, nom: 'Hérault' },
  '35': { lat: 48.1173, lon: -1.6778, nom: 'Ille-et-Vilaine' },
  '36': { lat: 46.8083, lon: 1.6917, nom: 'Indre' },
  '37': { lat: 47.3941, lon: 0.6848, nom: 'Indre-et-Loire' },
  '38': { lat: 45.1885, lon: 5.7245, nom: 'Isère' },
  '39': { lat: 46.6750, lon: 5.5500, nom: 'Jura' },
  '40': { lat: 43.8920, lon: -0.4992, nom: 'Landes' },
  '41': { lat: 47.5860, lon: 1.3360, nom: 'Loir-et-Cher' },
  '42': { lat: 45.4397, lon: 4.3872, nom: 'Loire' },
  '43': { lat: 45.0432, lon: 3.8855, nom: 'Haute-Loire' },
  '44': { lat: 47.2184, lon: -1.5536, nom: 'Loire-Atlantique' },
  '45': { lat: 47.9027, lon: 1.9090, nom: 'Loiret' },
  '46': { lat: 44.4476, lon: 1.4406, nom: 'Lot' },
  '47': { lat: 44.2042, lon: 0.6263, nom: 'Lot-et-Garonne' },
  '48': { lat: 44.5180, lon: 3.5010, nom: 'Lozère' },
  '49': { lat: 47.4784, lon: -0.5632, nom: 'Maine-et-Loire' },
  '50': { lat: 49.1167, lon: -1.0833, nom: 'Manche' },
  '51': { lat: 49.0500, lon: 4.0333, nom: 'Marne' },
  '52': { lat: 48.1117, lon: 5.1397, nom: 'Haute-Marne' },
  '53': { lat: 48.0700, lon: -0.7700, nom: 'Mayenne' },
  '54': { lat: 48.6921, lon: 6.1844, nom: 'Meurthe-et-Moselle' },
  '55': { lat: 49.1620, lon: 5.3839, nom: 'Meuse' },
  '56': { lat: 47.6586, lon: -2.7603, nom: 'Morbihan' },
  '57': { lat: 49.1193, lon: 6.1757, nom: 'Moselle' },
  '58': { lat: 46.9893, lon: 3.1577, nom: 'Nièvre' },
  '59': { lat: 50.6292, lon: 3.0573, nom: 'Nord' },
  '60': { lat: 49.4174, lon: 2.8260, nom: 'Oise' },
  '61': { lat: 48.4346, lon: 0.0913, nom: 'Orne' },
  '62': { lat: 50.4250, lon: 2.8243, nom: 'Pas-de-Calais' },
  '63': { lat: 45.7772, lon: 3.0870, nom: 'Puy-de-Dôme' },
  '64': { lat: 43.2951, lon: -0.3708, nom: 'Pyrénées-Atlantiques' },
  '65': { lat: 43.2330, lon: 0.0786, nom: 'Hautes-Pyrénées' },
  '66': { lat: 42.6886, lon: 2.8949, nom: 'Pyrénées-Orientales' },
  '67': { lat: 48.5734, lon: 7.7521, nom: 'Bas-Rhin' },
  '68': { lat: 47.7508, lon: 7.3359, nom: 'Haut-Rhin' },
  '69': { lat: 45.7640, lon: 4.8357, nom: 'Rhône' },
  '70': { lat: 47.6200, lon: 6.1500, nom: 'Haute-Saône' },
  '71': { lat: 46.7833, lon: 4.8500, nom: 'Saône-et-Loire' },
  '72': { lat: 48.0061, lon: 0.1996, nom: 'Sarthe' },
  '73': { lat: 45.5646, lon: 5.9178, nom: 'Savoie' },
  '74': { lat: 45.8992, lon: 6.1294, nom: 'Haute-Savoie' },
  '75': { lat: 48.8566, lon: 2.3522, nom: 'Paris' },
  '76': { lat: 49.4431, lon: 1.0993, nom: 'Seine-Maritime' },
  '77': { lat: 48.5404, lon: 2.6605, nom: 'Seine-et-Marne' },
  '78': { lat: 48.8014, lon: 2.1301, nom: 'Yvelines' },
  '79': { lat: 46.3239, lon: -0.4642, nom: 'Deux-Sèvres' },
  '80': { lat: 49.8941, lon: 2.2958, nom: 'Somme' },
  '81': { lat: 43.9277, lon: 2.1481, nom: 'Tarn' },
  '82': { lat: 44.0150, lon: 1.3550, nom: 'Tarn-et-Garonne' },
  '83': { lat: 43.4675, lon: 6.2370, nom: 'Var' },
  '84': { lat: 43.9493, lon: 4.8055, nom: 'Vaucluse' },
  '85': { lat: 46.6700, lon: -1.4300, nom: 'Vendée' },
  '86': { lat: 46.5802, lon: 0.3404, nom: 'Vienne' },
  '87': { lat: 45.8336, lon: 1.2611, nom: 'Haute-Vienne' },
  '88': { lat: 48.1722, lon: 6.4499, nom: 'Vosges' },
  '89': { lat: 47.7980, lon: 3.5680, nom: 'Yonne' },
  '90': { lat: 47.6347, lon: 6.8628, nom: 'Territoire de Belfort' },
  '91': { lat: 48.6321, lon: 2.4416, nom: 'Essonne' },
  '92': { lat: 48.8970, lon: 2.2150, nom: 'Hauts-de-Seine' },
  '93': { lat: 48.9362, lon: 2.4500, nom: 'Seine-Saint-Denis' },
  '94': { lat: 48.7900, lon: 2.4550, nom: 'Val-de-Marne' },
  '95': { lat: 49.0420, lon: 2.0830, nom: 'Val-d\'Oise' },
  '971': { lat: 16.2650, lon: -61.5510, nom: 'Guadeloupe' },
  '972': { lat: 14.6415, lon: -61.0242, nom: 'Martinique' },
  '973': { lat: 4.0000, lon: -53.0000, nom: 'Guyane' },
  '974': { lat: -21.1151, lon: 55.5364, nom: 'La Réunion' },
  '976': { lat: -12.8275, lon: 45.1662, nom: 'Mayotte' },
};

// Départements limitrophes (source : data.gouv.fr communes-département)
// Pour l'élargissement de rayon : si moins de N clubs dans le dept, on charge les voisins
const DEPT_ADJACENTS = {
  '01': ['38','39','69','71','73','74'],
  '02': ['08','51','59','60','77','80'],
  '03': ['18','23','42','58','63','71'],
  '04': ['05','06','13','83','84'],
  '05': ['04','26','38','73'],
  '06': ['04','83'],
  '07': ['26','30','42','43','48','84'],
  '08': ['02','51','55'],
  '09': ['11','31','66'],
  '10': ['21','51','52','77','89'],
  '11': ['09','31','34','66','81'],
  '12': ['15','30','34','46','48','81','82'],
  '13': ['04','30','83','84'],
  '14': ['27','50','61','76'],
  '15': ['12','19','43','46','48','63'],
  '16': ['17','24','79','86','87'],
  '17': ['16','33','79','85'],
  '18': ['03','23','36','41','45','58'],
  '19': ['15','23','24','46','63','87'],
  '2A': ['2B'],
  '2B': ['2A'],
  '21': ['10','39','52','58','70','71','89'],
  '22': ['29','35','56'],
  '23': ['03','18','19','36','63','87'],
  '24': ['16','17','19','33','46','47','87'],
  '25': ['39','70','90'],
  '26': ['05','07','38','84'],
  '27': ['14','27','28','61','76','78','95'],
  '28': ['27','41','45','61','72','78','91'],
  '29': ['22','56'],
  '30': ['07','12','13','34','48','84'],
  '31': ['09','11','32','65','81','82'],
  '32': ['31','40','47','64','65','82'],
  '33': ['17','24','40','47'],
  '34': ['11','12','30','81'],
  '35': ['22','44','49','50','53','56'],
  '36': ['18','23','37','41','86','87'],
  '37': ['36','41','49','72','86'],
  '38': ['01','05','07','26','42','69','73'],
  '39': ['01','21','25','39','70','71'],
  '40': ['32','33','47','64'],
  '41': ['18','28','36','37','45','72'],
  '42': ['03','07','43','63','69','71'],
  '43': ['07','15','42','48','63'],
  '44': ['35','49','56','85'],
  '45': ['18','28','41','45','58','77','89','91'],
  '46': ['12','15','19','24','47','82'],
  '47': ['24','32','33','40','46','82'],
  '48': ['07','12','15','30','43'],
  '49': ['35','37','44','49','53','72','79','85','86'],
  '50': ['14','35','53','61'],
  '51': ['02','08','10','52','55','77'],
  '52': ['10','21','51','55','70','88'],
  '53': ['35','49','50','53','61','72'],
  '54': ['55','57','67','88'],
  '55': ['08','51','52','54','55','88'],
  '56': ['22','29','35','44'],
  '57': ['54','55','67'],
  '58': ['03','18','21','45','58','71','89'],
  '59': ['02','62','80'],
  '60': ['02','27','60','76','77','78','80','95'],
  '61': ['14','27','28','50','53','61','72'],
  '62': ['59','80'],
  '63': ['03','15','19','23','42','43','63'],
  '64': ['32','40','65'],
  '65': ['31','32','64'],
  '66': ['09','11'],
  '67': ['54','57','67','68','88'],
  '68': ['67','68','70','88','90'],
  '69': ['01','38','42','71'],
  '70': ['21','25','52','68','70','88','90'],
  '71': ['01','03','21','39','42','58','69','71'],
  '72': ['28','37','41','49','53','61','72'],
  '73': ['01','05','38','73','74'],
  '74': ['01','73','74'],
  '75': ['92','93','94'],
  '76': ['14','27','60','76','80'],
  '77': ['02','10','45','51','60','77','89','91','93','94','95'],
  '78': ['27','28','78','91','92','95'],
  '79': ['16','17','49','85','86'],
  '80': ['02','60','62','76','80'],
  '81': ['11','12','31','34','81','82'],
  '82': ['12','31','32','46','47','81','82'],
  '83': ['04','06','13','83','84'],
  '84': ['04','07','13','26','30','83','84'],
  '85': ['17','44','49','79'],
  '86': ['16','36','37','49','79','86','87'],
  '87': ['16','19','23','24','36','86','87'],
  '88': ['52','54','55','67','68','70','88'],
  '89': ['10','21','45','58','77','89'],
  '90': ['25','68','70'],
  '91': ['28','45','77','78','91','92','94'],
  '92': ['75','78','91','92','93','94','95'],
  '93': ['75','77','92','93','94','95'],
  '94': ['75','77','91','92','93','94'],
  '95': ['27','60','78','92','93','95'],
};

// Index nom département (slug normalisé) -> code
const _DEPT_NAME_INDEX = {};
function _normSlug(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');
}
for (const [code, info] of Object.entries(DEPT_CENTERS)) {
  _DEPT_NAME_INDEX[_normSlug(info.nom)] = code;
}
// Alias additionnels courants
_DEPT_NAME_INDEX[_normSlug('Reunion')] = '974';
_DEPT_NAME_INDEX[_normSlug('Corse')] = '2A';
_DEPT_NAME_INDEX[_normSlug('Côtes du Nord')] = '22';

/**
 * Parse un code postal français en code département.
 * Règles : 75001 -> 75, 73160 -> 73, 20137 -> 2A (Corse-du-Sud, sud), 20290 -> 2B (Haute-Corse, nord)
 * 97150 -> 971 (Guadeloupe), 97400 -> 974 (La Réunion)
 */
function cpToDept(cp) {
  const s = String(cp || '').trim();
  if (!/^\d{4,5}$/.test(s)) return null;
  const cp5 = s.padStart(5, '0');
  // DOM 97x
  if (cp5.startsWith('97') || cp5.startsWith('98')) {
    const dom = cp5.substring(0, 3);
    if (DEPT_CENTERS[dom]) return dom;
  }
  // Corse
  if (cp5.startsWith('20')) {
    const n = parseInt(cp5.substring(2));
    return (n < 200) ? '2A' : '2B';
  }
  const dep = cp5.substring(0, 2);
  return DEPT_CENTERS[dep] ? dep : null;
}

/**
 * Normalise un input utilisateur en code département.
 * Accepte : '73', 'Savoie', 'savoie', '73160' (CP), 'Paris', 'corse'...
 * Retourne le code dept ou null.
 */
function normalizeDept(input) {
  if (!input) return null;
  const raw = String(input).trim();
  // Code dept direct
  if (DEPT_CENTERS[raw]) return raw;
  if (DEPT_CENTERS[raw.padStart(2, '0')]) return raw.padStart(2, '0');
  // Code postal
  if (/^\d{4,5}$/.test(raw)) return cpToDept(raw);
  // Nom département
  const slug = _normSlug(raw);
  if (_DEPT_NAME_INDEX[slug]) return _DEPT_NAME_INDEX[slug];
  // Fuzzy : startsWith / includes
  for (const [k, v] of Object.entries(_DEPT_NAME_INDEX)) {
    if (k.startsWith(slug) || slug.startsWith(k)) return v;
  }
  return null;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEPT_CENTERS, DEPT_ADJACENTS, cpToDept, normalizeDept };
}

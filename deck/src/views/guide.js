import { icon, mountSprite } from '../icons/icon.js';
import { PALETTE } from '../data/palette.js';

export function renderGuide(root, { curriculum, progress }) {
  mountSprite(document); root.innerHTML = ''; root.className = 'guide';
  const ids = curriculum.labs.flatMap(l => l.steps.map(s => s.id));
  const nav = document.createElement('nav'); nav.className = 'guide-nav';
  curriculum.acts.forEach(a => { const link = document.createElement('a'); link.href = `#${a.slug}`; link.textContent = `${a.slug}/`; nav.append(link); });
  const count = document.createElement('p'); count.className = 'guide-count'; const paintCount = () => count.textContent = `${progress.doneCount(ids)} / ${ids.length}`;
  const palette = document.createElement('div'); palette.className = 'palette-swatches'; PALETTE.forEach(({name, hex}) => { const s = document.createElement('span'); s.className = 'swatch'; s.style.background = hex; s.title = `${name}: ${hex}`; s.textContent = name; palette.append(s); });
  const main = document.createElement('main');
  curriculum.acts.forEach(act => { const sec = document.createElement('section'); sec.id = act.slug; const h = document.createElement('h2'); h.className = 'u-section-heading'; h.textContent = act.slug; sec.append(h);
    curriculum.labs.filter(l => l.actId === act.id).forEach(lab => { const box = document.createElement('article'); box.className = 'lab'; const lh = document.createElement('h3'); lh.textContent = `Lab ${lab.n} — ${lab.title} · ${lab.minutes} min`; const ol = document.createElement('ol');
      lab.steps.forEach(s => { const li = document.createElement('li'); li.className = `step${s.warn ? ' is-warn' : ''}`; const cb = document.createElement('input'); cb.type = 'checkbox'; cb.dataset.step = s.id; cb.checked = progress.isDone(s.id); cb.addEventListener('change', () => { progress.toggle(s.id); paintCount(); }); const label = document.createElement('label'); if (s.icons.length) label.append(icon(s.icons[0], 18)); label.append(` ${s.text}`); li.append(cb, label); ol.append(li); }); box.append(lh, ol); sec.append(box); }); main.append(sec); });
  const ref = document.createElement('section'); ref.className = 'reference'; curriculum.groups.forEach(g => { const h = document.createElement('h3'); h.textContent = `${g.letter}. ${g.title}`; ref.append(h); g.topics.forEach(t => { const card = document.createElement('div'); card.className = 'topic'; card.dataset.tier = String(t.tier); t.icons.forEach(n => card.append(icon(n, 18))); card.append(` ${t.text}`); ref.append(card); }); }); main.append(ref); root.append(nav, count, palette, main); paintCount();
  function search(query) { const q = query.trim().toLowerCase(); let matches = 0; root.querySelectorAll('.topic, .step').forEach(el => { const hit = !q || el.textContent.toLowerCase().includes(q); el.hidden = !hit; if (hit) matches++; }); return matches; }
  return { search, setTheme: name => { document.documentElement.dataset.theme = name; } };
}

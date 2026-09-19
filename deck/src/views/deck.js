import { icon, mountSprite } from '../icons/icon.js';

function slide(kind, build) {
  const el = document.createElement('section');
  el.className = 'slide'; el.dataset.kind = kind; build(el); return el;
}
function iconRow(names) {
  const row = document.createElement('div'); row.className = 'icon-row';
  names.forEach(name => row.append(icon(name, 40))); return row;
}

export function renderDeck(root, { curriculum, follow }) {
  mountSprite(document); root.innerHTML = ''; root.className = 'deck';
  const slides = [], labsByAct = {};
  curriculum.labs.forEach(lab => (labsByAct[lab.actId] ??= []).push(lab));
  curriculum.acts.forEach(act => {
    slides.push({ kind: 'act', actId: act.id, el: slide('act', el => {
      const h = document.createElement('h2'); h.className = 'u-section-heading'; h.textContent = act.slug;
      const p = document.createElement('p'); p.className = 'act-title'; p.textContent = act.title; el.append(h, p);
    }) });
    act.beats.forEach(beat => slides.push({ kind: 'beat', actId: act.id, el: slide('beat', el => {
      if (beat.icons.length) el.append(iconRow(beat.icons));
      const p = document.createElement('p'); p.className = 'beat'; p.textContent = beat.text; el.append(p);
    }) }));
    (labsByAct[act.id] ?? []).forEach(lab => slides.push({ kind: 'lab', actId: act.id, el: slide('lab', el => {
      const h = document.createElement('h3'); h.className = 'lab-title'; h.textContent = `Lab ${lab.n} — ${lab.title} · ${lab.minutes} min`;
      const ol = document.createElement('ol');
      lab.steps.forEach(step => { const li = document.createElement('li'); if (step.warn) li.className = 'is-warn'; if (step.icons.length) li.append(icon(step.icons[0], 28)); li.append(` ${step.text}`); ol.append(li); });
      el.append(h, ol);
    }) }));
  });
  const actById = Object.fromEntries(curriculum.acts.map(act => [act.id, act]));
  slides.forEach((entry, i) => {
    entry.el.dataset.act = actById[entry.actId].slug;
    entry.el.dataset.position = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    entry.el.setAttribute('aria-label', `${actById[entry.actId].title}, slide ${i + 1} of ${slides.length}`);
  });
  const stage = document.createElement('div'); stage.className = 'stage'; slides.forEach(s => stage.append(s.el)); root.append(stage);
  let index = 0;
  const pill = document.createElement('button'); pill.className = 'rejoin-pill'; pill.type = 'button'; pill.textContent = 'Rejoin presenter';
  pill.addEventListener('click', () => { follow.rejoin(); paint(); });
  function paint() { slides.forEach((s, i) => s.el.classList.toggle('is-active', i === index)); if (follow.state === 'free') root.append(pill); else pill.remove(); }
  function goTo(i) { index = Math.max(0, Math.min(slides.length - 1, i)); if (follow.slide !== index) follow.navigate(index); paint(); }
  const onKey = e => { if (e.key === 'ArrowRight') goTo(index + 1); if (e.key === 'ArrowLeft') goTo(index - 1); };
  document.addEventListener('keydown', onKey); paint();
  return { slides, goTo, current: () => index, destroy: () => document.removeEventListener('keydown', onKey) };
}

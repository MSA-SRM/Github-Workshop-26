const TIERS = new Set([1, 2, 3]);

function checkIcons(icons, where, errors) {
  if (!Array.isArray(icons)) errors.push(`${where}: icons must be an array`);
  else for (const i of icons) {
    if (typeof i !== 'string' || !i) errors.push(`${where}: bad icon name`);
  }
}

export function validateCurriculum(c) {
  const errors = [];
  const actIds = new Set();
  const stepIds = new Set();

  for (const a of c.acts ?? []) {
    if (actIds.has(a.id)) errors.push(`duplicate act id ${a.id}`);
    actIds.add(a.id);
    if (typeof a.start !== 'number' || typeof a.end !== 'number' || a.end <= a.start) {
      errors.push(`act ${a.id}: end must be greater than start`);
    }
    for (const b of a.beats ?? []) {
      if (!TIERS.has(b.tier)) errors.push(`act ${a.id}: beat tier must be 1, 2 or 3`);
      checkIcons(b.icons, `act ${a.id} beat`, errors);
    }
  }

  for (const l of c.labs ?? []) {
    if (!actIds.has(l.actId)) errors.push(`lab ${l.id}: unknown act ${l.actId}`);
    if (typeof l.minutes !== 'number' || l.minutes <= 0) {
      errors.push(`lab ${l.id}: minutes must be positive`);
    }
    for (const s of l.steps ?? []) {
      if (stepIds.has(s.id)) errors.push(`duplicate step id ${s.id}`);
      stepIds.add(s.id);
      if (!s.text) errors.push(`lab ${l.id}: step ${s.id} has no text`);
      checkIcons(s.icons, `lab ${l.id} step ${s.id}`, errors);
    }
  }

  for (const g of c.groups ?? []) {
    for (const t of g.topics ?? []) {
      if (!TIERS.has(t.tier)) errors.push(`group ${g.letter}: topic tier must be 1, 2 or 3`);
      checkIcons(t.icons, `group ${g.letter} topic`, errors);
    }
  }

  return { ok: errors.length === 0, errors };
}

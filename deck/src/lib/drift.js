const TOLERANCE_MIN = 2;

export function computeDrift({ acts, actId, elapsedMs }) {
  const act = acts.find(a => a.id === actId);
  if (!act) throw new Error(`Unknown act: ${actId}`);

  const elapsedMin = elapsedMs / 60_000;
  const expectedMin = act.start;
  const driftMin = Math.round(elapsedMin - expectedMin);

  let state = 'on-track';
  if (driftMin > TOLERANCE_MIN) state = 'behind';
  else if (driftMin < -TOLERANCE_MIN) state = 'ahead';

  const label =
    state === 'on-track' ? 'on track'
    : state === 'behind' ? `${driftMin} min behind`
    : `${Math.abs(driftMin)} min ahead`;

  return { expectedMin, elapsedMin, driftMin, state, label };
}

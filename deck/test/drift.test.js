import { describe, it, expect } from 'vitest';
import { computeDrift } from '../src/lib/drift.js';
import { ACTS } from '../src/data/curriculum.js';

const at = (actId, min) => computeDrift({ acts: ACTS, actId, elapsedMs: min * 60_000 });

describe('computeDrift', () => {
  it('is on track when elapsed matches the act start', () => {
    const d = at('a2', 21);
    expect(d.state).toBe('on-track');
    expect(d.driftMin).toBe(0);
  });

  it('reports behind when the clock is past the act start', () => {
    const d = at('a2', 27);
    expect(d.state).toBe('behind');
    expect(d.driftMin).toBe(6);
    expect(d.label).toBe('6 min behind');
  });

  it('reports ahead when the clock is short of the act start', () => {
    const d = at('a4', 39);
    expect(d.state).toBe('ahead');
    expect(d.driftMin).toBe(-6);
    expect(d.label).toBe('6 min ahead');
  });

  it('treats a two-minute gap as on track', () => {
    expect(at('a2', 23).state).toBe('on-track');
    expect(at('a2', 19).state).toBe('on-track');
  });

  it('treats a three-minute gap as drifting', () => {
    expect(at('a2', 24).state).toBe('behind');
  });

  it('labels on-track plainly', () => {
    expect(at('a2', 21).label).toBe('on track');
  });

  it('rounds partial minutes to the nearest whole minute', () => {
    const d = computeDrift({ acts: ACTS, actId: 'a2', elapsedMs: 25.6 * 60_000 });
    expect(d.driftMin).toBe(5);
  });

  it('throws on an unknown act', () => {
    expect(() => at('nope', 0)).toThrow(/nope/);
  });
});

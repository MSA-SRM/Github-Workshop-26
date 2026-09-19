import { describe, it, expect } from 'vitest';
import { ACTS, CURRICULUM } from '../src/data/curriculum.js';
import { validateCurriculum } from '../src/data/schema.js';

describe('acts', () => {
  it('has exactly 8 acts numbered 0..7', () => {
    expect(ACTS).toHaveLength(8);
    expect(ACTS.map(a => a.n)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it('starts at 0 and ends at 90 minutes', () => {
    expect(ACTS[0].start).toBe(0);
    expect(ACTS.at(-1).end).toBe(90);
  });

  it('has contiguous windows with no gaps or overlaps', () => {
    for (let i = 1; i < ACTS.length; i++) {
      expect(ACTS[i].start).toBe(ACTS[i - 1].end);
    }
  });

  it('sums to exactly 90 minutes', () => {
    const total = ACTS.reduce((s, a) => s + (a.end - a.start), 0);
    expect(total).toBe(90);
  });

  it('gives every act a lowercase hyphenated slug', () => {
    for (const a of ACTS) expect(a.slug).toMatch(/^[a-z][a-z-]*[a-z]$/);
  });

  it('gives every act at least one beat', () => {
    for (const a of ACTS) expect(a.beats.length).toBeGreaterThan(0);
  });

  it('passes schema validation', () => {
    expect(validateCurriculum(CURRICULUM)).toEqual({ ok: true, errors: [] });
  });
});

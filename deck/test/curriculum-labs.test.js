import { describe, it, expect } from 'vitest';
import { ACTS, LABS } from '../src/data/curriculum.js';

describe('labs', () => {
  it('has exactly 9 labs numbered 1..9', () => {
    expect(LABS).toHaveLength(9);
    expect(LABS.map(l => l.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('attaches every lab to a real act', () => {
    const ids = new Set(ACTS.map(a => a.id));
    for (const l of LABS) expect(ids.has(l.actId)).toBe(true);
  });

  it('gives every lab at least two steps', () => {
    for (const l of LABS) expect(l.steps.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps each lab within its act window', () => {
    const byId = Object.fromEntries(ACTS.map(a => [a.id, a]));
    for (const l of LABS) {
      expect(l.minutes).toBeLessThanOrEqual(byId[l.actId].end - byId[l.actId].start);
    }
  });

  it('keeps the labs in an act within that act window in total', () => {
    const byId = Object.fromEntries(ACTS.map(a => [a.id, a]));
    const sums = {};
    for (const l of LABS) sums[l.actId] = (sums[l.actId] ?? 0) + l.minutes;
    for (const [actId, mins] of Object.entries(sums)) {
      expect(mins).toBeLessThan(byId[actId].end - byId[actId].start);
    }
  });

  it('marks the commit-to-main pitfall as a warning step', () => {
    const l5 = LABS.find(l => l.id === 'l5');
    expect(l5.steps.some(s => s.warn === true)).toBe(true);
  });

  it('gives every step a globally unique id', () => {
    const ids = LABS.flatMap(l => l.steps.map(s => s.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

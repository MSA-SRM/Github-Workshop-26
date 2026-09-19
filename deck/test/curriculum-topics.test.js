import { describe, it, expect } from 'vitest';
import { GROUPS } from '../src/data/curriculum.js';

const EXPECTED = {
  A: 9, B: 10, C: 9, D: 12, E: 7, F: 6, G: 8, H: 10, I: 12, J: 6, K: 6, L: 7,
  M: 8, N: 11, O: 8, P: 6, Q: 8, R: 5, S: 6, T: 6, U: 7, V: 6, W: 5,
};

describe('topic inventory', () => {
  it('has 23 groups lettered A..W', () => {
    expect(GROUPS).toHaveLength(23);
    expect(GROUPS.map(g => g.letter)).toEqual(Object.keys(EXPECTED));
  });

  it('matches the expected topic count in every group', () => {
    for (const g of GROUPS) {
      expect(`${g.letter}:${g.topics.length}`).toBe(`${g.letter}:${EXPECTED[g.letter]}`);
    }
  });

  it('totals 178 topics', () => {
    expect(GROUPS.reduce((s, g) => s + g.topics.length, 0)).toBe(178);
  });

  it('splits into 36 / 77 / 65 across the three tiers', () => {
    const all = GROUPS.flatMap(g => g.topics);
    const count = t => all.filter(x => x.tier === t).length;
    expect([count(1), count(2), count(3)]).toEqual([36, 77, 65]);
  });

  it('gives every topic at least one icon', () => {
    for (const g of GROUPS) for (const t of g.topics) {
      expect(t.icons.length, `${g.letter}: ${t.text}`).toBeGreaterThan(0);
    }
  });
});

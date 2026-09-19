import { describe, it, expect } from 'vitest';
import { validateCurriculum } from '../src/data/schema.js';

const minimal = {
  acts: [{ id: 'a0', n: 0, slug: 'open', title: 'Open', start: 0, end: 90,
           beats: [{ text: 'hello', icons: ['repo'], tier: 2 }] }],
  labs: [{ id: 'l1', n: 1, actId: 'a0', title: 'Lab', minutes: 4,
           steps: [{ id: 'l1s1', text: 'do it', icons: [] }] }],
  groups: [{ letter: 'A', title: 'Foundations',
             topics: [{ text: 'what is git', icons: ['git-branch'], tier: 2 }] }],
};

describe('validateCurriculum', () => {
  it('accepts a well-formed curriculum', () => {
    expect(validateCurriculum(minimal)).toEqual({ ok: true, errors: [] });
  });

  it('rejects a tier outside 1..3', () => {
    const bad = structuredClone(minimal);
    bad.groups[0].topics[0].tier = 4;
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/tier/);
  });

  it('rejects a lab referencing an unknown act', () => {
    const bad = structuredClone(minimal);
    bad.labs[0].actId = 'nope';
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/unknown act/);
  });

  it('rejects duplicate step ids', () => {
    const bad = structuredClone(minimal);
    bad.labs[0].steps.push({ id: 'l1s1', text: 'again', icons: [] });
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/duplicate step id/);
  });

  it('rejects an act whose end precedes its start', () => {
    const bad = structuredClone(minimal);
    bad.acts[0].end = -1;
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/end/);
  });

  it('rejects a duplicate act id', () => {
    const bad = structuredClone(minimal);
    bad.acts.push(structuredClone(bad.acts[0]));
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/duplicate act id/);
  });

  it('rejects a lab with non-positive minutes', () => {
    const bad = structuredClone(minimal);
    bad.labs[0].minutes = 0;
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/minutes/);
  });

  it('rejects a step with no text', () => {
    const bad = structuredClone(minimal);
    bad.labs[0].steps[0].text = '';
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/no text/);
  });

  it('rejects bad icons', () => {
    const bad = structuredClone(minimal);
    bad.groups[0].topics[0].icons = 'repo';
    const r = validateCurriculum(bad);
    expect(r.ok).toBe(false);
    expect(r.errors.join()).toMatch(/icons must be an array/);
  });
});

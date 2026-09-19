import { describe, it, expect } from 'vitest';
import { createProgress } from '../src/lib/progress.js';

function memoryStorage() {
  const m = new Map();
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: k => m.delete(k),
  };
}

const throwingStorage = {
  getItem() { throw new Error('denied'); },
  setItem() { throw new Error('denied'); },
  removeItem() { throw new Error('denied'); },
};

describe('progress', () => {
  it('starts with nothing done', () => {
    const p = createProgress(memoryStorage());
    expect(p.isDone('l1s1')).toBe(false);
  });

  it('toggles a step on and off', () => {
    const p = createProgress(memoryStorage());
    expect(p.toggle('l1s1')).toBe(true);
    expect(p.isDone('l1s1')).toBe(true);
    expect(p.toggle('l1s1')).toBe(false);
    expect(p.isDone('l1s1')).toBe(false);
  });

  it('persists across instances sharing a storage', () => {
    const s = memoryStorage();
    createProgress(s).toggle('l5s4');
    expect(createProgress(s).isDone('l5s4')).toBe(true);
  });

  it('counts completed steps from a list', () => {
    const p = createProgress(memoryStorage());
    p.toggle('a'); p.toggle('c');
    expect(p.doneCount(['a', 'b', 'c'])).toBe(2);
  });

  it('works when storage throws on every call', () => {
    const p = createProgress(throwingStorage);
    expect(p.isDone('x')).toBe(false);
    expect(p.toggle('x')).toBe(true);
    expect(p.isDone('x')).toBe(true);
  });

  it('recovers from corrupt stored data', () => {
    const s = memoryStorage();
    s.setItem('u26:progress', '{not json');
    const p = createProgress(s);
    expect(p.isDone('x')).toBe(false);
  });

  it('clears everything on reset', () => {
    const p = createProgress(memoryStorage());
    p.toggle('a');
    p.reset();
    expect(p.isDone('a')).toBe(false);
  });
});

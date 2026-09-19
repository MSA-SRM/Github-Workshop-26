import { describe, it, expect, vi } from 'vitest';
import { createFollow } from '../src/lib/follow.js';

function fakeTransport() {
  let cb = null;
  return {
    subscribe(fn) { cb = fn; return () => { cb = null; }; },
    publish: vi.fn(),
    emit(i) { cb?.(i); },
  };
}

describe('createFollow', () => {
  it('starts in following state', () => {
    const f = createFollow({ transport: fakeTransport(), onChange: () => {} });
    expect(f.state).toBe('following');
  });

  it('tracks the presenter while following', () => {
    const t = fakeTransport();
    const f = createFollow({ transport: t, onChange: () => {} });
    t.emit(5);
    expect(f.slide).toBe(5);
  });

  it('releases to free on local navigation', () => {
    const t = fakeTransport();
    const f = createFollow({ transport: t, onChange: () => {} });
    f.navigate(2);
    expect(f.state).toBe('free');
    expect(f.slide).toBe(2);
  });

  it('ignores the presenter once free', () => {
    const t = fakeTransport();
    const f = createFollow({ transport: t, onChange: () => {} });
    f.navigate(2);
    t.emit(9);
    expect(f.slide).toBe(2);
  });

  it('snaps back to the presenter on rejoin', () => {
    const t = fakeTransport();
    const f = createFollow({ transport: t, onChange: () => {} });
    t.emit(7);
    f.navigate(2);
    f.rejoin();
    expect(f.state).toBe('following');
    expect(f.slide).toBe(7);
  });

  it('degrades silently when there is no transport', () => {
    const changes = [];
    const f = createFollow({ transport: null, onChange: s => changes.push(s) });
    expect(f.state).toBe('degraded');
    expect(changes.every(s => typeof s.error === 'undefined')).toBe(true);
  });

  it('degrades silently when subscribe throws', () => {
    const bad = { subscribe() { throw new Error('no socket'); }, publish() {} };
    const f = createFollow({ transport: bad, onChange: () => {} });
    expect(f.state).toBe('degraded');
  });

  it('allows navigation while degraded', () => {
    const f = createFollow({ transport: null, onChange: () => {} });
    f.navigate(4);
    expect(f.slide).toBe(4);
    expect(f.state).toBe('degraded');
  });

  it('never returns to following from degraded on rejoin', () => {
    const f = createFollow({ transport: null, onChange: () => {} });
    f.rejoin();
    expect(f.state).toBe('degraded');
  });

  it('unsubscribes on destroy', () => {
    const t = fakeTransport();
    const f = createFollow({ transport: t, onChange: () => {} });
    f.destroy();
    t.emit(3);
    expect(f.slide).toBe(0);
  });
});

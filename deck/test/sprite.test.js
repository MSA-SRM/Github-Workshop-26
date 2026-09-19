import { describe, it, expect } from 'vitest';
import { SPRITE, ICON_NAMES } from '../src/icons/sprite.js';
import { icon, mountSprite } from '../src/icons/icon.js';
import { CURRICULUM } from '../src/data/curriculum.js';

function referencedIcons() {
  const c = CURRICULUM;
  return new Set([
    ...c.acts.flatMap(a => a.beats.flatMap(b => b.icons)),
    ...c.labs.flatMap(l => l.steps.flatMap(s => s.icons)),
    ...c.groups.flatMap(g => g.topics.flatMap(t => t.icons)),
  ]);
}

describe('octicon sprite', () => {
  it('contains every icon the curriculum references', () => {
    const missing = [...referencedIcons()].filter(n => !ICON_NAMES.includes(n));
    expect(missing).toEqual([]);
  });

  it('contains no icons the curriculum never references', () => {
    const used = referencedIcons();
    expect(ICON_NAMES.filter(n => !used.has(n))).toEqual([]);
  });

  it('embeds symbols rather than remote references', () => {
    expect(SPRITE).toContain('<symbol id="oct-repo"');
    const withoutNamespace = SPRITE.split('http://www.w3.org/2000/svg').join('');
    expect(withoutNamespace).not.toMatch(/https?:\/\//);
  });

  it('renders an svg that points at a sprite symbol', () => {
    mountSprite(document);
    const el = icon('repo', 32);
    expect(el.tagName.toLowerCase()).toBe('svg');
    expect(el.getAttribute('width')).toBe('32');
    expect(el.querySelector('use').getAttribute('href')).toBe('#oct-repo');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('throws on an unknown icon name', () => {
    expect(() => icon('not-a-real-icon')).toThrow(/not-a-real-icon/);
  });
});

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { PALETTE, PALETTE_NAMES } from '../src/data/palette.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const css = () => readFileSync(resolve(__dirname, '../src/styles/tokens.css'), 'utf8');

describe('palette', () => {
  it('has the six Universe accents in order', () => {
    expect(PALETTE_NAMES).toEqual(['acid', 'lime', 'purple', 'pink', 'teal', 'indigo']);
  });

  it('uses the exact Universe hex values', () => {
    expect(Object.fromEntries(PALETTE.map(p => [p.name, p.hex]))).toEqual({
      acid: '#23ea57', lime: '#cdf041', purple: '#8b40f5',
      pink: '#ed55ba', teal: '#26ede2', indigo: '#4a5ce5',
    });
  });
});

describe('tokens.css', () => {
  it('defines the canvas and accent tokens', () => {
    const c = css();
    expect(c).toMatch(/--u-canvas:\s*#090d0a/);
    expect(c).toMatch(/--u-accent:\s*#23ea57/);
    expect(c).toMatch(/--u-text-accent:\s*#5fed83/);
  });

  it('defines a token for every palette colour', () => {
    const c = css();
    for (const p of PALETTE) {
      expect(c, p.name).toMatch(new RegExp(`--u-${p.name}:\\s*${p.hex}`, 'i'));
    }
  });

  it('gives the deck a body size of at least 28px', () => {
    expect(css()).toMatch(/--u-deck-body:\s*(2[89]|[3-9]\d)px/);
  });

  it('defines a light mode for the guide', () => {
    expect(css()).toContain('[data-theme="light"]');
  });
});

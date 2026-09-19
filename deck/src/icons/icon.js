import { SPRITE, ICON_NAMES } from './sprite.js';

const NS = 'http://www.w3.org/2000/svg';

export function mountSprite(doc) {
  if (doc.getElementById('oct-sprite-host')) return;
  const host = doc.createElement('div');
  host.id = 'oct-sprite-host';
  host.setAttribute('aria-hidden', 'true');
  host.innerHTML = SPRITE;
  doc.body.prepend(host);
}

export function icon(name, size = 24) {
  if (!ICON_NAMES.includes(name)) throw new Error(`Unknown octicon: ${name}`);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('oct');
  const use = document.createElementNS(NS, 'use');
  use.setAttribute('href', `#oct-${name}`);
  svg.append(use);
  return svg;
}

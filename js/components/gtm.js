import { isMeasuredHost } from '../core/environment.js';

const GTM_CONTAINER_ID = 'GTM-MNRGGGF9';
const GTM_URL = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

// Same reason as the Clarity loader: the snippet Google hands out is an inline
// <script>, and the page CSP has no `script-src 'unsafe-inline'`. Google's own
// recommendation is a per-request nonce, which a static site on GitHub Pages
// cannot produce — there is no server to generate one. Serving the loader from
// 'self' is the remaining way to run GTM without opening inline scripts.
//
// The container name stays the default `dataLayer`, so the vendor snippet's
// `&l=` suffix (for a renamed layer) is dropped rather than always empty.
export function initGtm() {
  if (!isMeasuredHost()) return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = GTM_URL;
    document.head.appendChild(script);
  } catch {
    // A hardened or extension-frozen `dataLayer` must not take the page down.
  }
}

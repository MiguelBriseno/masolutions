import { isMeasuredHost } from '../core/environment.js';

const CLARITY_PROJECT_ID = 'y95cif49iw';
const CLARITY_TAG_URL = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;

// Microsoft Clarity ships its loader as an inline <script>, which the page CSP
// blocks: there is no `script-src 'unsafe-inline'` and adding one to admit an
// analytics tag would also admit every injected script. The vendor snippet is
// therefore transcribed here, in a file served from 'self', and only the tag
// host is allowed in the CSP.
export function initClarity() {
  if (!isMeasuredHost()) return;

  // Privacy extensions and enterprise policy scripts neutralize known analytics
  // globals by redefining them as non-writable, as a getter with no setter, or
  // as a throwing Proxy. Modules are strict mode, so both the read and the
  // assignment below can throw — which is why the duplicate-load guard sits
  // inside the try and not before it. Analytics is not worth taking the page
  // down for, and a throw escaping here would also skip initGtm().
  try {
    if (window.clarity) return;

    // Queue shim: calls made before the tag downloads are replayed by Clarity
    // from `.q`. It stays a `function` because it forwards `arguments` — an
    // arrow function has none.
    window.clarity = function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = CLARITY_TAG_URL;
    document.head.appendChild(script);
  } catch {
    // Nothing to recover: the visitor simply is not measured.
  }
}

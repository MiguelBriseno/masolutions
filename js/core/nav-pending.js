// Classic script, loaded render-blocking from <head> on purpose: it must run
// before the first paint, which no module can promise.
//
// The phone header collapses its links behind the menu button only once
// navbar.js has bound that button (.nav[data-enhanced]). On its own that rule
// paints the long, wrapped header first and then collapses it, shifting the
// whole page up (CLS ~0.12 on a throttled phone). data-nav-pending lets the CSS
// collapse the header from the first frame instead.
//
// It is only a promise, so it expires. By `load` every module has run or
// failed: if navbar.js enhanced the nav, its own attribute takes over; if it
// never ran, removing this one brings the links and the header CTA back, so a
// failed module still cannot leave a phone visitor without navigation.
document.documentElement.setAttribute('data-nav-pending', '');

window.addEventListener(
  'load',
  () => document.documentElement.removeAttribute('data-nav-pending'),
  { once: true },
);

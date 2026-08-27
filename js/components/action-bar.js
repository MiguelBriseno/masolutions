/* Fixed call to action for narrow viewports.

   It is parked off screen whenever the hero or the contact section is visible:
   both already show the same button, and a floating copy of a control the
   reader can see anyway is just something covering the page.

   The bar is styled `display: none` above 860px, so on a desktop the observers
   below simply keep toggling an attribute nobody renders — cheaper than
   tearing the whole thing down and rebuilding it on every resize. */
export function initActionBar() {
  const bar = document.querySelector('.action-bar');
  if (!bar) return;

  const hero = document.getElementById('top');
  const contact = document.getElementById('contacto');
  if (!hero && !contact) return;

  const visible = new Set();

  const sync = () => {
    const hidden = visible.size > 0;
    bar.toggleAttribute('data-hidden', hidden);
    // `inert` takes the links out of the tab order and the accessibility tree
    // while the bar is off screen, without touching how it renders — so the
    // slide-out transition still runs, unlike toggling `hidden`.
    bar.toggleAttribute('inert', hidden);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      sync();
    },
    { threshold: 0 }
  );

  [hero, contact].filter(Boolean).forEach((section) => observer.observe(section));

  // Nothing else to do here. The bar ships parked — `data-hidden inert` are on
  // the element in index.html — because this module is deferred and the first
  // observer callback is a frame away: parking it from JavaScript would leave
  // the bar painted on screen and then visibly slide it out on every load.
  // From here the observer owns the state and removes both attributes the
  // moment the hero scrolls away.
}

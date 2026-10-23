/* The hero's integration diagram: starts the packets once the page has loaded
   and pauses everything while the hero is off screen.

   Two things the stylesheet cannot do on its own:

   - The packets ride SMIL <animateMotion>, and a browser starts an inline
     SVG's SMIL timeline at the document `load` event — after every image and
     font. Until then a packet with no position of its own sits at the SVG
     origin, a stray dot in the diagram's corner. So the packets are hidden
     until `data-animating` is set here, at `load`; their negative `begin`s
     then place them mid-line from the first frame.
   - An infinite animation inside an SVG repaints the whole SVG every frame,
     and nothing stops it when the reader has scrolled to the contact form.
     Pausing the SMIL clock and the CSS pulse while the hero is out of view
     keeps the diagram from costing a paint loop for the whole session.

   Without this module the diagram still renders complete and still: the
   packets never appear, which is the same picture reduced motion gets. */
export function initHeroDiagram() {
  const svg = document.querySelector('.hero__diagram');
  if (!svg) return;

  const start = () => svg.setAttribute('data-animating', '');
  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start, { once: true });
  }

  // The hero section, not the SVG: the diagram is hidden below 1100px, and an
  // element with no box never intersects, which would pause it for good.
  const hero = document.getElementById('top');
  if (!hero || typeof svg.pauseAnimations !== 'function') return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        svg.unpauseAnimations();
      } else {
        svg.pauseAnimations();
      }
      svg.toggleAttribute('data-paused', !entry.isIntersecting);
    },
    { threshold: 0 }
  );
  observer.observe(hero);
}

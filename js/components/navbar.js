const MOBILE_QUERY = '(max-width: 860px)';

/* Active-section highlighting. Unchanged in behaviour: the observer marks the
   link whose section is crossing the middle band of the viewport. */
function initActiveLink(nav) {
  const links = nav.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length === 0 || links.length === 0) return;

  const linkFor = new Map();
  links.forEach((link) => linkFor.set(link.getAttribute('href'), link));

  // Only sections that actually have a link take part: #top, #testimonios and
  // #contacto have none, and letting them through would clear the highlight
  // for as long as they are on screen.
  const tracked = [...sections].filter((section) => linkFor.has(`#${section.id}`));
  if (tracked.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const current = linkFor.get(`#${entry.target.id}`);
        links.forEach((link) => link.classList.toggle('active', link === current));
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  tracked.forEach((section) => observer.observe(section));
}

/* The header only earns its border and shadow once something is scrolling
   underneath it. A 1px sentinel at the top of the document answers that with an
   IntersectionObserver instead of a scroll listener reading scrollY on every
   frame to flip one boolean. */
function initHeaderState() {
  const header = document.querySelector('.site-header');
  const sentinel = document.querySelector('.header-sentinel');
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('site-header--scrolled', !entry.isIntersecting),
    { threshold: 0 }
  );

  observer.observe(sentinel);
}

/* Mobile disclosure menu.
   `aria-expanded` on the button is the single source of truth for the open
   state, so the markup, the CSS (which keys off the same attribute for the
   hamburger-to-X transform) and assistive technology can never disagree. */
function initMobileMenu(nav) {
  const toggle = nav.querySelector('.nav__toggle');
  const menu = nav.querySelector('.nav__menu');
  if (!toggle || !menu) return;

  const mobile = window.matchMedia(MOBILE_QUERY);

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
    menu.toggleAttribute('data-open', open);
  };

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Every link is an in-page anchor, so leaving the panel open would park it
  // over the section the visitor just asked to see.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('.nav__link')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });

  document.addEventListener('click', (event) => {
    if (!isOpen() || nav.contains(event.target)) return;
    setOpen(false);
  });

  // Above the breakpoint the panel's CSS stops applying and the links go back
  // to being a row, so the open state has to be dropped with it — otherwise
  // rotating a phone leaves the button stuck reporting "expanded".
  mobile.addEventListener('change', (event) => {
    if (!event.matches) setOpen(false);
  });

  // Last line on purpose: everything above has to have bound before the CSS is
  // allowed to collapse the links behind the button. header.css hides the menu
  // and the header CTA only under [data-enhanced], so until this runs the nav
  // stays in its plain, always-visible form.
  nav.setAttribute('data-enhanced', '');
}

export function initNavbar() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Ordered by consequence of failure. The menu is the only one of the three
  // that owns navigation itself, so it binds before anything that could throw
  // and take the rest of this function down with it; the highlight and the
  // header's scrolled state are both decoration by comparison.
  initMobileMenu(nav);
  initActiveLink(nav);
  initHeaderState();
}

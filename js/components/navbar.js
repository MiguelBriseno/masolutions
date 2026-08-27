export function initNavbar() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

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

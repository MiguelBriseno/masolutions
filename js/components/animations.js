const ANIMATED_GROUPS = [
  { selector: '.service-card', delay: 100 },
  { selector: '.process__step', delay: 120 },
  { selector: '.project-card', delay: 120 },
  { selector: '.testimonial-card', delay: 100 },
  { selector: '.faq__grid > *', delay: 60 },
];

const STAGGER_CAP = 4;

export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const delayFor = new WeakMap();

  ANIMATED_GROUPS.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add('animate-on-scroll');
      delayFor.set(element, delay);
    });
  });

  const animated = document.querySelectorAll('.animate-on-scroll');
  if (animated.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      // Stagger only within the batch entering the viewport together. Indexing
      // across the whole document would leave a lone card waiting out the delay
      // of every sibling above it — very visible in a one-column phone layout.
      const entering = entries.filter((entry) => entry.isIntersecting);

      entering.forEach((entry, index) => {
        const step = delayFor.get(entry.target) ?? 0;
        entry.target.style.transitionDelay = `${Math.min(index, STAGGER_CAP) * step}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  animated.forEach((element) => observer.observe(element));
}

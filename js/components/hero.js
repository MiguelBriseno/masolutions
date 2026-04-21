import { getPhrases } from '../core/i18n.js';

export function initHero() {
  const dynamicText = document.getElementById('hero-dynamic-text');
  if (!dynamicText) return;

  let currentIndex = 0;

  dynamicText.textContent = getPhrases()[currentIndex];

  setInterval(() => {
    const phrases = getPhrases();
    currentIndex = (currentIndex + 1) % phrases.length;

    dynamicText.classList.add('hero-dynamic--out');

    setTimeout(() => {
      dynamicText.textContent = phrases[currentIndex];
      dynamicText.classList.remove('hero-dynamic--out');
      dynamicText.classList.add('hero-dynamic--in');

      setTimeout(() => {
        dynamicText.classList.remove('hero-dynamic--in');
      }, 200);
    }, 200);
  }, 2200);

  document.addEventListener('langchange', () => {
    const phrases = getPhrases();
    currentIndex = 0;
    dynamicText.textContent = phrases[currentIndex];
  });
}

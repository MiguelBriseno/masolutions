import { initHero } from '../components/hero.js';
import { initNavbar } from '../components/navbar.js';
import { initAnimations } from '../components/animations.js';
import { initContactForm } from '../components/contact-form.js';
import { applyLang } from './i18n.js';

function initFooterYear() {
  const span = document.getElementById('footer-year');
  if (!span) return;
  span.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang('es');
  initNavbar();
  initHero();
  initAnimations();
  initContactForm();
  initFooterYear();
});

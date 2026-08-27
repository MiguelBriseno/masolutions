import { initNavbar } from '../components/navbar.js';
import { initAnimations } from '../components/animations.js';
import { initContactForm } from '../components/contact-form.js';

function initFooterYear() {
  const span = document.getElementById('footer-year');
  if (!span) return;
  span.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
  initContactForm();
  initFooterYear();
});

import { initNavbar } from '../components/navbar.js';
import { initAnimations } from '../components/animations.js';
import { initContactForm } from '../components/contact-form.js';
import { initActionBar } from '../components/action-bar.js';
import { initClarity } from '../components/analytics.js';
import { initGtm } from '../components/gtm.js';

function initFooterYear() {
  const span = document.getElementById('footer-year');
  if (!span) return;
  span.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAnimations();
  initContactForm();
  initActionBar();
  initFooterYear();
  // Last: a third-party tag must never come before the page's own behaviour.
  initClarity();
  initGtm();
});

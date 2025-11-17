import { initHero } from "../components/hero.js";
import { initNavbar } from "../components/navbar.js";

function initFooterYear() {
  const span = document.getElementById("footer-year");
  if (!span) return;
  span.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHero();
  initFooterYear();
});
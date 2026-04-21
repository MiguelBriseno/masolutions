import { getLang, applyLang } from '../core/i18n.js';

export function initNavbar() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const langToggle = document.getElementById('lang-toggle');
  const header = document.querySelector('.site-header');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('nav__menu--open');
      toggle.classList.toggle('nav__toggle--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('nav__menu--open');
        toggle.classList.remove('nav__toggle--open');
        document.body.style.overflow = '';
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('nav__menu--open');
      toggle.classList.remove('nav__toggle--open');
      document.body.style.overflow = '';
    }
  });

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
  }

  if (langToggle) {
    updateLangUI(langToggle, getLang());

    langToggle.addEventListener('click', () => {
      const newLang = getLang() === 'es' ? 'en' : 'es';
      applyLang(newLang);
      updateLangUI(langToggle, newLang);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
          document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.remove('active');
        }
      });
    });
  }
}

function updateLangUI(button, lang) {
  button.setAttribute('data-lang', lang);
  const textSpan = button.querySelector('.nav__lang-text');
  if (textSpan) textSpan.textContent = lang.toUpperCase();
}

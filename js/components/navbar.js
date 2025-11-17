let currentLang = "es";

export function initNavbar() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  const langToggle = document.getElementById("lang-toggle");

  // Menú móvil
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("nav__menu--open");
      toggle.classList.toggle("nav__toggle--open", isOpen);
    });

    menu.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("nav__link")) {
        menu.classList.remove("nav__menu--open");
        toggle.classList.remove("nav__toggle--open");
      }
    });
  }

  // Botón de idioma
  if (langToggle) {
    // inicializamos UI por si acaso
    updateLangUI(langToggle, currentLang);

    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "es" ? "en" : "es";
      updateLangUI(langToggle, currentLang);

      // Aquí después puedes disparar la lógica
      // para cambiar textos de toda la página.
      console.log("Idioma actual:", currentLang);
    });
  }
}

function updateLangUI(button, lang) {
  button.setAttribute("data-lang", lang);
  const textSpan = button.querySelector(".nav__lang-text");
  if (textSpan) {
    textSpan.textContent = lang.toUpperCase();
  }
}

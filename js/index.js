document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const menuContainer = document.querySelector('.menu__container');
  const menuLinks = document.querySelectorAll('.item__link');

  // Funcionalidad del menú hamburguesa
  if (hamburger && menuContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menuContainer.classList.toggle('active');
      
      // Prevenir scroll del body cuando el menú está abierto
      document.body.classList.toggle('menu-open');
    });

    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menuContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (event) => {
      const isClickInsideMenu = menuContainer.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideMenu && !isClickOnHamburger && menuContainer.classList.contains('active')) {
        hamburger.classList.remove('active');
        menuContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        menuContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Animación de contadores para las cards
  const cards = document.querySelectorAll('.card');

  const animateCount = (el, target) => {
    let current = 0;
    const increment = target / 100;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + (target === 93 ? "%" : "");
        clearInterval(interval);
      } else {
        el.textContent = Math.ceil(current);
      }
    }, 15);
  };

  const observerCards = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('show');

        const numberEl = card.querySelector('.card__subtitle');
        const target = +numberEl.dataset.target;
        animateCount(numberEl, target);

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(card => observerCards.observe(card));

  // Logo click handler
  const button = document.querySelector("#logo");
  if (button) {
    button.addEventListener('click', () => {
      window.location = "./index.html";
    });
  }

  // Slider functionality
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const dots = document.querySelectorAll('.dot');

  let index = 0;
  const visible = 3;
  const total = images.length;

  function updateSlider() {
    const slideWidth = images[0].offsetWidth + 20;
    const maxIndex = total - visible;
    if (index > maxIndex) index = 0;

    slides.style.transform = `translateX(-${index * slideWidth}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  setInterval(() => {
    index++;
    updateSlider();
  }, 3000);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });
  });

  updateSlider();

  // Animación para el subtitle
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          subtitle.classList.add("show");
          observer.unobserve(subtitle);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(subtitle);
  }

  // *** NUEVA FUNCIONALIDAD: Animaciones para projects__container ***
  const projectsContainer = document.querySelector('.projects__container');
  
  if (projectsContainer) {
    const projectsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          
          // Agregar clase show al contenedor principal
          container.classList.add('show');
          
          // Animar elementos individuales con delays escalonados
          const leftSection = container.querySelector('.container__left');
          const rightSection = container.querySelector('.container__right');
          
          if (leftSection) {
            setTimeout(() => {
              leftSection.classList.add('show');
            }, 200);
          }
          
          if (rightSection) {
            setTimeout(() => {
              rightSection.classList.add('show');
            }, 400);
          }
          
          // Animar párrafos individualmente
          const paragraphs = container.querySelectorAll('.left__paragraph');
          paragraphs.forEach((paragraph, index) => {
            setTimeout(() => {
              paragraph.classList.add('show');
            }, 600 + (index * 200));
          });
          
          observer.unobserve(container);
        }
      });
    }, { 
      threshold: 0.3, // Se activa cuando el 30% del elemento es visible
      rootMargin: '0px 0px -50px 0px' // Margen para activar un poco antes
    });

    projectsObserver.observe(projectsContainer);
  }

  // Optimización: Cleanup de will-change después de las animaciones
  const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
  
  setTimeout(() => {
    elementsWithWillChange.forEach(el => {
      el.style.willChange = 'auto';
    });
  }, 2000); // Después de que terminen las animaciones iniciales
});
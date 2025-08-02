document.addEventListener("DOMContentLoaded", () => {
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

        // Animar el número del card
        const numberEl = card.querySelector('.card__subtitle');
        const target = +numberEl.dataset.target;
        animateCount(numberEl, target);

        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(card => observerCards.observe(card));


  const button = document.querySelector("#logo");
  if (button) {
    button.addEventListener('click', () => {
      window.location = "./index.php";
    });
  }

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
});

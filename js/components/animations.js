export function initAnimations() {
  // First, add animate-on-scroll class to all elements that need it
  // This MUST happen before setting up the IntersectionObserver
  
  // Stats items
  document.querySelectorAll('.stats__item').forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 100}ms`;
  });

  // Service cards
  document.querySelectorAll('.service-card').forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 100}ms`;
  });

  // Testimonial cards
  document.querySelectorAll('.testimonial-card').forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 100}ms`;
  });

  // Project cards
  document.querySelectorAll('.project-card').forEach((item, index) => {
    item.classList.add('animate-on-scroll');
    item.style.transitionDelay = `${index * 100}ms`;
  });

  // Hero content animation - starts visible
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.classList.add('animate-on-scroll', 'visible');
  }

  // Now set up the IntersectionObserver AFTER classes are added
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Special handling for stats numbers
        if (entry.target.classList.contains('stats__item')) {
          animateStats(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Check for elements already in viewport
  setTimeout(() => {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        observer.observe(el);
      }
    });
  }, 100);
}

function animateStats(item) {
  const numberEl = item.querySelector('.stats__number');
  if (!numberEl) return;

  const target = parseInt(numberEl.dataset.count, 10);
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (easeOutQuart)
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (target - start) * easeOut);
    
    numberEl.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

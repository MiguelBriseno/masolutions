export function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: bots fill this, humans don't — silently abort
    const honeypot = form.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value.trim()) {
      form.reset();
      return;
    }

    // Basic validation
    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const mensaje = form.querySelector('#mensaje');

    if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError('Por favor ingresa un email válido');
      return;
    }

    // Show loading state
    form.classList.add('loading');
    
    try {
      // Submit the form
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Show success message
        form.reset();
        successMessage.classList.add('show');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      } else {
        showError('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
      }
    } catch (error) {
      showError('Hubo un problema al enviar el mensaje. Intenta de nuevo.');
    } finally {
      form.classList.remove('loading');
    }
  });

  function showError(message) {
    let errorEl = form.querySelector('.form__error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form__error';
      form.insertBefore(errorEl, form.firstChild);
    }
    errorEl.textContent = message;
    errorEl.classList.add('show');

    setTimeout(() => {
      errorEl.classList.remove('show');
    }, 4000);
  }

  // Real-time validation feedback
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });
    
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

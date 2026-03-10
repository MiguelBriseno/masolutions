export function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
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
    // Create or update error message
    let errorEl = form.querySelector('.form__error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form__error';
      errorEl.style.cssText = 'padding: 0.75rem; border-radius: 0.5rem; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #f87171; text-align: center; font-weight: 500; margin-bottom: 1rem;';
      form.insertBefore(errorEl, form.firstChild);
    }
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    
    // Hide error after 4 seconds
    setTimeout(() => {
      errorEl.style.display = 'none';
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

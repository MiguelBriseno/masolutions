import { t } from '../core/i18n.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const honeypot = form.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value.trim()) {
      form.reset();
      return;
    }

    const nombre = form.querySelector('#nombre');
    const email = form.querySelector('#email');
    const mensaje = form.querySelector('#mensaje');

    if (!nombre.value.trim() || !email.value.trim() || !mensaje.value.trim()) {
      showError(t('contact.errorRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      showError(t('contact.errorEmail'));
      return;
    }

    form.classList.add('loading');

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        successMessage.classList.add('show');
        setTimeout(() => successMessage.classList.remove('show'), 5000);
      } else {
        showError(t('contact.errorSend'));
      }
    } catch {
      showError(t('contact.errorSend'));
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
    setTimeout(() => errorEl.classList.remove('show'), 4000);
  }

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

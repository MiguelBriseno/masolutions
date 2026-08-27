const MESSAGES = {
  required: 'Complete los campos obligatorios antes de enviar.',
  email: 'Ingrese un correo electrónico válido.',
  send: 'No pudimos enviar la solicitud. Intente nuevamente en unos minutos.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const successName = document.getElementById('form-success-name');
  const resetButton = document.getElementById('form-reset');

  if (!form || !success) return;

  const nombre = form.querySelector('#nombre');
  const email = form.querySelector('#email');
  const detalle = form.querySelector('#detalle');

  // Without every required field the handler cannot validate, and swallowing
  // the submit would leave the user with no feedback and no native fallback.
  if (!nombre || !email || !detalle) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const honeypot = form.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value.trim()) {
      form.reset();
      return;
    }

    if (!nombre.value.trim() || !email.value.trim() || !detalle.value.trim()) {
      showError(MESSAGES.required);
      return;
    }

    if (!EMAIL_PATTERN.test(email.value)) {
      showError(MESSAGES.email);
      return;
    }

    form.classList.add('loading');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        showError(MESSAGES.send);
        return;
      }

      if (successName) successName.textContent = nombre.value.trim() || 'por escribirnos';
      clearForm();
      form.hidden = true;
      success.hidden = false;
      // Focus lived on the submit button, which is now hidden; move it into the
      // panel so keyboard navigation continues from here instead of <body>.
      (resetButton || success).focus();
    } catch {
      showError(MESSAGES.send);
    } finally {
      form.classList.remove('loading');
    }
  });

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      clearForm();
      success.hidden = true;
      form.hidden = false;
      nombre.focus();
    });
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => {
      const invalid = field.hasAttribute('required') && !field.value.trim();
      field.classList.toggle('form__control--invalid', invalid);
    });

    field.addEventListener('input', () => {
      field.classList.remove('form__control--invalid');
    });
  });

  // form.reset() restores values but fires no input event, so the invalid
  // markers set on blur would survive into the next, empty form.
  function clearForm() {
    form.reset();
    clearError();
    form.querySelectorAll('.form__control--invalid').forEach((field) => {
      field.classList.remove('form__control--invalid');
    });
  }

  function clearError() {
    form.querySelector('.form__error')?.remove();
  }

  function showError(message) {
    let errorEl = form.querySelector('.form__error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form__error';
      errorEl.setAttribute('role', 'alert');
      form.insertBefore(errorEl, form.firstChild);
    }
    errorEl.textContent = message;
  }
}

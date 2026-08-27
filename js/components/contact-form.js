const MESSAGES = {
  required: 'Complete los campos obligatorios antes de enviar.',
  email: 'Ingrese un correo electrónico válido.',
  send: 'No pudimos enviar la solicitud. Intente nuevamente en unos minutos.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The form action stays the plain endpoint so a no-JS submit still works;
// fetch needs the /ajax/ variant, which is the only one that reports failure.
// Works for both the address form and the opaque-hash form of the action.
function ajaxEndpoint(action) {
  const url = new URL(action, window.location.href);
  if (!url.pathname.startsWith('/ajax/')) url.pathname = `/ajax${url.pathname}`;
  return url.toString();
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const successName = document.getElementById('form-success-name');
  const resetButton = document.getElementById('form-reset');

  if (!form || !success) return;

  const nombre = form.querySelector('#nombre');
  const email = form.querySelector('#email');
  const detalle = form.querySelector('#detalle');
  const submitButton = form.querySelector('[type="submit"]');

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
    // .loading sets pointer-events: none, which stops the mouse but not a
    // second Enter press while the request is still in flight.
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(ajaxEndpoint(form.action), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      // FormSubmit answers 200 with a page even when it drops the message —
      // an unconfirmed address, a spam rejection. Only the AJAX endpoint's
      // JSON says what actually happened, so response.ok is not the test.
      const result = await response.json().catch(() => null);
      if (!response.ok || String(result?.success) !== 'true') {
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
      if (submitButton) submitButton.disabled = false;
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

const MESSAGES = {
  summary: 'Revise los campos marcados antes de enviar.',
  send: 'No pudimos enviar la solicitud. Intente nuevamente en unos minutos.',
};

// Both sides reject empty labels ("a@.com", "a..b@c.com") and the TLD must be
// alphabetic. Enough to catch real typos without rejecting valid addresses.
const EMAIL_PATTERN = /^[^\s@.]+(\.[^\s@.]+)*@[^\s@.]+(\.[^\s@.]+)*\.[a-zA-Z]{2,}$/;

// Letters from any alphabet plus the punctuation names actually use.
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*$/u;

// Digits and the separators people type; anything else is a typo, not a phone.
const PHONE_CHARS = /^[+()\d\s.-]+$/;

// One validator per field id. Each returns the message to show, or '' when the
// value is acceptable. An optional field returns '' for an empty value.
const VALIDATORS = {
  nombre(value) {
    if (!value) return 'Escriba su nombre y apellido.';
    if (value.length < 3) return 'El nombre es demasiado corto.';
    if (!NAME_PATTERN.test(value)) {
      return 'El nombre solo admite letras, espacios, apóstrofos y guiones.';
    }
    return '';
  },

  telefono(value) {
    if (!value) return '';
    if (!PHONE_CHARS.test(value)) {
      return 'El teléfono solo admite dígitos y los signos + ( ) - .';
    }

    const digits = value.replace(/\D/g, '');

    // An explicit country code that is not México: only E.164 length applies,
    // because national numbering rules elsewhere are not ours to guess.
    if (value.startsWith('+') && !digits.startsWith('52')) {
      return digits.length >= 8 && digits.length <= 15
        ? ''
        : 'Escriba el número completo, con el código de país.';
    }

    // 52 followed by more than ten digits is the country code, not the number.
    const national =
      digits.startsWith('52') && digits.length > 10 ? digits.slice(2) : digits;

    if (national.length !== 10) {
      return 'Escriba los 10 dígitos con clave local. Ejemplo: 33 1217 0122.';
    }
    return '';
  },

  email(value) {
    if (!value) return 'Escriba su correo electrónico.';
    if (!EMAIL_PATTERN.test(value)) {
      return 'Ese correo no es válido. Revise la arroba y el dominio.';
    }
    return '';
  },

  detalle(value) {
    if (!value) return 'Cuéntenos brevemente qué necesita.';
    if (value.length < 20) {
      return 'Necesitamos algo más de detalle: al menos 20 caracteres.';
    }
    return '';
  },
};

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
  const successEmail = document.getElementById('form-success-email');
  const resetButton = document.getElementById('form-reset');

  if (!form || !success) return;

  const fields = Object.keys(VALIDATORS)
    .map((id) => form.querySelector(`#${id}`))
    .filter(Boolean);

  const nombre = form.querySelector('#nombre');
  const email = form.querySelector('#email');
  const submitButton = form.querySelector('[type="submit"]');

  // Without every field the handler cannot validate, and swallowing the submit
  // would leave the user with no feedback and no native fallback.
  if (fields.length !== Object.keys(VALIDATORS).length) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const honeypot = form.querySelector('[name="_honey"]');
    if (honeypot && honeypot.value.trim()) {
      form.reset();
      return;
    }

    // filter, not find: every field has to be marked, not just the first one.
    const invalid = fields.filter((field) => {
      const message = validate(field);
      showFieldError(field, message);
      return Boolean(message);
    });

    if (invalid.length) {
      showError(MESSAGES.summary);
      invalid[0].focus();
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
      if (successEmail) successEmail.textContent = email.value.trim() || 'su correo';
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

  fields.forEach((field) => {
    field.addEventListener('blur', () => showFieldError(field, validate(field)));

    field.addEventListener('input', () => {
      // Re-check only a field already flagged. Complaining while someone is
      // still typing the first characters is noise, not help.
      if (field.classList.contains('form__control--invalid')) {
        showFieldError(field, validate(field));
      }
    });
  });

  function validate(field) {
    return VALIDATORS[field.id](field.value.trim());
  }

  function showFieldError(field, message) {
    field.classList.toggle('form__control--invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');

    const feedback = document.getElementById(`${field.id}-error`);
    if (!feedback) return;
    feedback.textContent = message;
    feedback.hidden = !message;
  }

  // form.reset() restores values but fires no input event, so the messages set
  // on blur would survive into the next, empty form.
  function clearForm() {
    form.reset();
    clearError();
    fields.forEach((field) => showFieldError(field, ''));
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

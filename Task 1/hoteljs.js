// Mobile menu (basic toggle)
const menuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

// Booking form with inline validation
const form = document.getElementById('bookingForm');
const validators = {
  name: v => v.trim() !== '',
  email: v => /^\S+@\S+\.\S+$/.test(v),
  checkin: v => !!v,
  checkout: v => !!v,
  room: v => v !== ''
};

function setError(field, message) {
  const errorEl = document.querySelector(`.error[data-for="${field}"]`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('active');
  }
}

function clearError(field) {
  const errorEl = document.querySelector(`.error[data-for="${field}"]`);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('active');
  }
}

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;
  const data = {};
  ['name', 'email', 'checkin', 'checkout', 'room'].forEach(field => {
    const input = document.getElementById(field);
    const value = input?.value || '';
    if (!validators[field](value)) {
      valid = false;
      setError(field, `Please enter a valid ${field}.`);
    } else {
      clearError(field);
      data[field] = value.trim();
    }
  });

  if (data.checkin && data.checkout) {
    if (new Date(data.checkout) <= new Date(data.checkin)) {
      valid = false;
      setError('checkout', 'Check-out must be after check-in.');
    }
  }

  if (!valid) return;

  const nights = Math.ceil((new Date(data.checkout) - new Date(data.checkin)) / (1000 * 60 * 60 * 24));
  const summary = `
Booking Confirmed!
Name: ${data.name}
Email: ${data.email}
Room: ${data.room}
Check-in: ${data.checkin}
Check-out: ${data.checkout}
Duration: ${nights} night(s)
  `.trim();

  alert(summary);
  form.reset();
});

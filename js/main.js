// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.header__menu-toggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    nav.querySelectorAll('.header__nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form submission via Formspree
  document.querySelectorAll('.get-in-touch__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.get-in-touch__form-btn');
      var status = form.querySelector('.get-in-touch__form-status');
      btn.disabled = true;
      btn.textContent = 'Sending...';
      status.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          status.textContent = 'Message sent! I\'ll get back to you soon.';
          status.className = 'get-in-touch__form-status get-in-touch__form-status--success';
          status.style.display = 'block';
          form.reset();
        } else {
          return response.json().then(function (data) {
            throw new Error(data.errors ? data.errors.map(function (err) { return err.message; }).join(', ') : 'Submission failed');
          });
        }
      }).catch(function (err) {
        status.textContent = 'Something went wrong. Please try again or email directly.';
        status.className = 'get-in-touch__form-status get-in-touch__form-status--error';
        status.style.display = 'block';
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = 'Send Message';
      });
    });
  });

  // Smooth scroll offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = document.querySelector('.header').offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});

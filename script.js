/* Moma's Care Cleaning — interactions */
(function () {
  'use strict';

  /* ---- current year in footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- sticky header shadow ---- */
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav ---- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---- scroll spy for nav links ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      return el ? { link: link, el: el } : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          var match = sections.filter(function (s) { return s.el === entry.target; })[0];
          if (match) match.link.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---- reveal on scroll ---- */
  var revealTargets = document.querySelectorAll(
    '.hero-copy, .hero-media, .highlight-grid li, .service-card, .story-media, .story-copy, .g-item, .faq-intro, .faq-list details, .estimate-copy, .estimate-form-wrap, .services-foot'
  );

  if ('IntersectionObserver' in window) {
    Array.prototype.forEach.call(revealTargets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    var revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    Array.prototype.forEach.call(revealTargets, function (el) { revealer.observe(el); });
  }

  /* ---- FAQ accordion: keep one open at a time ---- */
  var faqItems = document.querySelectorAll('.faq-list details');
  Array.prototype.forEach.call(faqItems, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqItems, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---- estimate form (demo only, sends nothing) ---- */
  var form = document.getElementById('estimate-form');
  var note = document.getElementById('form-note');

  function setError(input, message) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.add('has-error');
    if (!field.querySelector('.field-error')) {
      var span = document.createElement('span');
      span.className = 'field-error';
      span.textContent = message;
      field.appendChild(span);
    }
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.remove('has-error');
    var err = field.querySelector('.field-error');
    if (err) err.remove();
    input.removeAttribute('aria-invalid');
  }

  if (form && note) {
    var required = [
      { el: document.getElementById('name'), msg: 'Please add a name so we know who to ask for.' },
      { el: document.getElementById('phone'), msg: 'Add a phone number — we confirm estimates by phone.' }
    ];

    required.forEach(function (f) {
      if (!f.el) return;
      f.el.addEventListener('input', function () { clearError(f.el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      required.forEach(function (f) {
        if (!f.el) return;
        if (!f.el.value.trim()) {
          setError(f.el, f.msg);
          valid = false;
        } else {
          clearError(f.el);
        }
      });

      if (!valid) {
        note.classList.remove('is-ready');
        note.innerHTML = '<strong>Almost there:</strong> fill in the highlighted fields, then call (267) 990-2478 with your details.';
        return;
      }

      var service = document.getElementById('service');
      var details = document.getElementById('details');
      var summary =
        'Request ready: ' +
        (service ? service.value : 'Cleaning service') +
        (details && details.value.trim() ? ' — ' + details.value.trim() : '') +
        '.';

      note.classList.add('is-ready');
      note.innerHTML =
        '<strong>' +
        summary +
        '</strong> This demo form does not send your information. Call ' +
        '<a href="tel:+12679902478">(267) 990-2478</a> to request your free estimate.';
    });
  }
})();

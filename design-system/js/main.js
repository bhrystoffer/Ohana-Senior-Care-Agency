/* ============================================================
   MAIN — Ohana Senior Care Agency V2
   Shared UI behaviors: stat counters, form tabs, validation.
   ============================================================ */

(function () {
  'use strict';

  /* ── Stat Counter Animation ─────────────────────────────── */
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      els.forEach(el => {
        el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
      });
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = parseFloat(el.dataset.count);
        const suffix   = el.dataset.suffix || '';
        const prefix   = el.dataset.prefix || '';
        const decimals = (el.dataset.count.split('.')[1] || '').length;
        const duration = 1600;
        const start    = performance.now();

        function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          // ease-out quart
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.6 });

    els.forEach(el => observer.observe(el));
  }

  /* ── Form Tab Switching ─────────────────────────────────── */
  function initFormTabs() {
    document.querySelectorAll('[data-tabs]').forEach(container => {
      const tabs   = container.querySelectorAll('.form-tab');
      const panels = container.querySelectorAll('.form-panel');

      function activate(idx) {
        tabs.forEach((t, i) => {
          t.classList.toggle('is-active', i === idx);
          t.setAttribute('aria-selected', i === idx);
        });
        panels.forEach((p, i) => {
          p.classList.toggle('is-active', i === idx);
        });
      }

      tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i)));
      activate(0); // default to first tab
    });
  }

  /* ── Inline Form Validation ─────────────────────────────── */
  function initValidation() {
    document.querySelectorAll('form[data-validate]').forEach(form => {
      const required = form.querySelectorAll('[required]');

      required.forEach(input => {
        input.addEventListener('blur', () => checkField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-error')) checkField(input);
        });
      });

      form.addEventListener('submit', e => {
        let valid = true;
        required.forEach(input => { if (!checkField(input)) valid = false; });
        if (!valid) { e.preventDefault(); scrollToFirstError(form); }
      });
    });
  }

  function checkField(input) {
    const field = input.closest('.field');
    const err   = field?.querySelector('.field-error');
    const empty = !input.value.trim();

    input.classList.toggle('is-error',   empty);
    input.classList.toggle('is-success', !empty);
    if (err) err.hidden = !empty;
    return !empty;
  }

  function scrollToFirstError(form) {
    const first = form.querySelector('.is-error');
    first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    first?.focus();
  }

  /* ── Smooth anchor links ────────────────────────────────── */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── Init all ────────────────────────────────────────────── */
  function init() {
    initCounters();
    initFormTabs();
    initValidation();
    initSmoothAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

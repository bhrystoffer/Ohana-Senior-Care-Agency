/* ============================================================
   SCROLL REVEAL — Ohana Senior Care Agency V2
   Observes .reveal elements and adds .is-visible when in view.
   Respects prefers-reduced-motion.
   ============================================================ */

(function () {
  'use strict';

  const SELECTOR    = '.reveal';
  const ROOT_MARGIN = '0px 0px -56px 0px';
  const THRESHOLD   = 0.08;

  function init() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip animation entirely for reduced-motion users
    if (prefersReduced) {
      document.querySelectorAll(SELECTOR).forEach(el => el.classList.add('is-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll(SELECTOR).forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: ROOT_MARGIN, threshold: THRESHOLD }
    );

    document.querySelectorAll(SELECTOR).forEach(el => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

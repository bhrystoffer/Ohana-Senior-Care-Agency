/* ============================================================
   NAVIGATION — Ohana Senior Care Agency V2
   Handles: scroll compact, mobile drawer, dropdowns, active links.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    const header    = document.querySelector('.site-header');
    const hamburger = document.querySelector('.nav-hamburger');
    const drawer    = document.querySelector('.nav-drawer');
    const overlay   = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.nav-has-dropdown');

    if (!header) return;

    /* ── Scroll compact ─────────────────────────────────────── */
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load

    /* ── Mobile drawer ──────────────────────────────────────── */
    function openDrawer() {
      drawer?.classList.add('is-open');
      overlay?.classList.add('is-visible');
      hamburger?.classList.add('is-open');
      hamburger?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer?.classList.remove('is-open');
      overlay?.classList.remove('is-visible');
      hamburger?.classList.remove('is-open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger?.addEventListener('click', () => {
      drawer?.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });

    overlay?.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDrawer();
    });

    /* ── Desktop dropdowns ──────────────────────────────────── */
    dropdowns.forEach(parent => {
      const trigger = parent.querySelector('.nav-dropdown-trigger');

      trigger?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = parent.classList.contains('is-open');
        // Close all others
        dropdowns.forEach(d => d !== parent && d.classList.remove('is-open'));
        parent.classList.toggle('is-open', !isOpen);
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('is-open'));
    });

    // Trap focus inside dropdown when open
    dropdowns.forEach(parent => {
      parent.addEventListener('keydown', e => {
        if (e.key === 'Escape') parent.classList.remove('is-open');
      });
    });

    /* ── Active page link highlight ─────────────────────────── */
    const path = window.location.pathname;
    document.querySelectorAll('.nav-link, .nav-drawer__link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '/' && path.startsWith(href)) {
        link.classList.add('is-active');
      }
      if (href === '/' && path === '/') {
        link.classList.add('is-active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================================
   LOGO CAROUSEL — Ohana Senior Care Agency V2
   Duplicates logo items for seamless CSS-driven infinite loop.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    document.querySelectorAll('.logo-track').forEach(track => {
      const items = Array.from(track.children);
      if (!items.length) return;

      // Duplicate for seamless loop (CSS animation moves -50%)
      items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

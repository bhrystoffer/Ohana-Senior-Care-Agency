/* ============================================================
   FAQ Accordion — Ohana Senior Care Agency V2
   One-open-at-a-time accordion. Keyboard accessible.
   ============================================================ */
(function () {
  'use strict';

  document.querySelectorAll('.faq-accordion').forEach(function (accordion) {
    var triggers = Array.from(accordion.querySelectorAll('.faq-accordion__trigger'));

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Collapse all items in this accordion
        triggers.forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
          var body = document.getElementById(t.getAttribute('aria-controls'));
          if (body) body.classList.remove('is-open');
        });

        // Expand the clicked item if it was collapsed
        if (!isExpanded) {
          trigger.setAttribute('aria-expanded', 'true');
          var body = document.getElementById(trigger.getAttribute('aria-controls'));
          if (body) body.classList.add('is-open');
        }
      });
    });
  });
})();

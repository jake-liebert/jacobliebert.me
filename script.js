/* ============================================================
   Jake Liebert — Executive Luxe
   Minimal, near-still interaction layer. No frameworks, no CDN.
   - Subtle fade-up reveals via IntersectionObserver
   - Sticky masthead hairline on scroll
   - Active-section nav highlighting
   - Snappy tabular tick-up on the proof band (motion-gated)
   Reduced-motion users get the final state instantly.
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  function revealAll() {
    revealEls.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Render everything at final state. Nothing stays hidden.
    revealAll();
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });

    // Failsafe: if anything is still hidden shortly after load, show it.
    window.addEventListener('load', function () {
      window.setTimeout(function () {
        revealEls.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && !el.classList.contains('is-in')) {
            el.classList.add('is-in');
          }
        });
      }, 600);
    });
  }

  /* ---------- Proof-band tick-up (tabular, easeOutExpo) ----------
     HTML already contains the final literal values, so under reduced
     motion or without IntersectionObserver we leave them untouched. */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 900;
    var start = null;

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutExpo — snappy, mechanical settle
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      var val = Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(frame);
  }

  function animatePair(el) {
    // "4 → 15" — tick the second number up; keep the arrow markup.
    var pair = el.getAttribute('data-pair').split('|');
    var from = parseInt(pair[0], 10);
    var to = parseInt(pair[1], 10);
    var dur = 900;
    var start = null;

    function render(second) {
      el.innerHTML =
        from +
        ' <span class="arrow" aria-hidden="true">→</span> ' +
        second;
    }

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      render(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(frame);
      else render(to);
    }
    requestAnimationFrame(frame);
  }

  var statEls = Array.prototype.slice.call(
    document.querySelectorAll('.proof-num')
  );

  if (!prefersReducedMotion && 'IntersectionObserver' in window && statEls.length) {
    var countObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.hasAttribute('data-count')) animateCount(el);
          else if (el.hasAttribute('data-pair')) animatePair(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach(function (el) {
      countObserver.observe(el);
    });
  }
  // Reduced motion / no IO: literal HTML final values remain. Nothing to do.

  /* ---------- Sticky masthead hairline ---------- */
  var masthead = document.querySelector('.masthead');
  if (masthead) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        masthead.classList.add('is-scrolled');
      } else {
        masthead.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Active section nav highlighting ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.masthead-nav a')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = '#' + entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'is-active',
                link.getAttribute('href') === id
              );
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();

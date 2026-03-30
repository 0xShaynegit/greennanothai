/**
 * Green Nano Thai - main.js
 * Production-ready vanilla JS. Zero dependencies except GSAP (CDN).
 * Author: Kai (Simon Team) | 28/03/2026
 * QA Fix: nav toggle class corrected nav__menu--open - is-open (Quentin, 28/03/2026)
 */

(function () {
  'use strict';

  // ─── Reduced Motion ───────────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── DOMContentLoaded Entry Point ─────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initSpotlight();
    initMagneticButtons();
    initScrollReveal();
    initMobileNav();
    initFaqAccordion();
    initSmoothScroll();
    initFooterYear();
    initContactFormToLine();
  });

  // ─── 1. Nav Scroll Behaviour ──────────────────────────────────────────────
  // Adds .nav--scrolled when window.scrollY > 60px.
  // Uses rAF-based throttle to keep scroll handler performant.
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 60) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on load to catch mid-page refreshes
    onScroll();
  }

  // ─── 2. Spotlight Effect (Hero) ───────────────────────────────────────────
  // Tracks mouse over .hero and updates --mouse-x / --mouse-y on the element.
  // Smooth lerp at factor 0.08 for silky follow on the spotlight div.
  function initSpotlight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    if (prefersReducedMotion) return;

    let targetX = 50;
    let targetY = 40;
    let currentX = 50;
    let currentY = 40;
    let rafId = null;
    let isHovering = false;

    function lerp(a, b, t) {
      return a + (b - a) * t;
    }

    function tick() {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);

      hero.style.setProperty('--mouse-x', currentX.toFixed(2) + '%');
      hero.style.setProperty('--mouse-y', currentY.toFixed(2) + '%');

      if (isHovering || Math.abs(currentX - targetX) > 0.05 || Math.abs(currentY - targetY) > 0.05) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
      isHovering = true;

      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }, { passive: true });

    hero.addEventListener('mouseleave', function () {
      isHovering = false;
      targetX = 50;
      targetY = 40;
    });
  }

  // ─── 3. Magnetic Buttons ──────────────────────────────────────────────────
  // Elements with [data-magnetic] translate toward the cursor.
  // Formula: translate(x * 0.28px, y * 0.35px) - reset on mouseleave via CSS transition.
  function initMagneticButtons() {
    const magnets = document.querySelectorAll('[data-magnetic]');
    if (!magnets.length) return;
    if (prefersReducedMotion) return;

    magnets.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.28) + 'px, ' + (y * 0.35) + 'px)';
      });

      el.addEventListener('mouseleave', function () {
        // CSS transition on .btn handles spring-back to origin
        el.style.transform = '';
      });
    });
  }

  // ─── 4. Scroll Reveal (IntersectionObserver) ──────────────────────────────
  // Adds .is-visible to [data-reveal] elements when 15% enters the viewport.
  // One-shot - unobserves after first trigger.
  // If reduced motion is preferred, marks everything visible immediately.
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (!revealEls.length) return;

    if (prefersReducedMotion) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ─── 5. Mobile Nav Toggle ─────────────────────────────────────────────────
  // Toggles aria-expanded and .is-open on .nav__links.
  // Traps focus when menu is open.
  // Closes on Escape or click outside.
  function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__links');
    const nav = document.querySelector('.nav');
    if (!toggle || !menu) return;

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      trapFocus(nav);
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      releaseFocus();
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on click outside nav
    document.addEventListener('click', function (e) {
      if (isOpen() && nav && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // ── Focus trap helpers ──────────────────────────────────────────────────
    const FOCUSABLE = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    let _keydownTrap = null;

    function trapFocus(container) {
      releaseFocus();

      const focusable = Array.from(container.querySelectorAll(FOCUSABLE));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      _keydownTrap = function (e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', _keydownTrap);
    }

    function releaseFocus() {
      if (_keydownTrap) {
        document.removeEventListener('keydown', _keydownTrap);
        _keydownTrap = null;
      }
    }
  }

  // ─── 6. FAQ Accordion Enhancement ────────────────────────────────────────
  // Progressive enhancement on <details>/<summary>.
  // Smooth max-height animation and accordion (one-open-at-a-time) behaviour.
  // Only activates on pages that contain .faq-section.
  function initFaqAccordion() {
    const faqSection = document.querySelector('.faq-section');
    if (!faqSection) return;

    const allDetails = Array.from(faqSection.querySelectorAll('details'));
    if (!allDetails.length) return;

    allDetails.forEach(function (details) {
      const summary = details.querySelector('summary');
      const content = details.querySelector('.faq-answer, p, div:not(summary)');
      if (!summary) return;

      // Wrap inner content in an animatable container if not already
      let body = details.querySelector('.faq__body');
      if (!body && content) {
        body = document.createElement('div');
        body.className = 'faq__body';
        // Move all children except summary into body
        Array.from(details.children).forEach(function (child) {
          if (child !== summary) {
            body.appendChild(child);
          }
        });
        details.appendChild(body);
      }

      summary.addEventListener('click', function (e) {
        e.preventDefault();

        const isCurrentlyOpen = details.hasAttribute('open');

        if (prefersReducedMotion) {
          // No animation - collapse others, toggle current
          allDetails.forEach(function (d) {
            if (d !== details) d.removeAttribute('open');
          });
          if (isCurrentlyOpen) {
            details.removeAttribute('open');
          } else {
            details.setAttribute('open', '');
          }
          return;
        }

        if (isCurrentlyOpen) {
          // Collapse this item
          animateClose(details);
        } else {
          // Collapse all others first, then open this one
          allDetails.forEach(function (d) {
            if (d !== details && d.hasAttribute('open')) {
              animateClose(d);
            }
          });
          animateOpen(details);
        }
      });
    });

    function animateOpen(details) {
      const body = details.querySelector('.faq__body');
      details.setAttribute('open', '');

      if (!body) return;

      body.style.maxHeight = '0px';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height 320ms cubic-bezier(0.23, 1, 0.32, 1)';

      requestAnimationFrame(function () {
        body.style.maxHeight = body.scrollHeight + 'px';
      });

      body.addEventListener('transitionend', function handler() {
        body.style.maxHeight = 'none'; // Allow natural reflow after open
        body.removeEventListener('transitionend', handler);
      });
    }

    function animateClose(details) {
      const body = details.querySelector('.faq__body');
      if (!body) {
        details.removeAttribute('open');
        return;
      }

      body.style.maxHeight = body.scrollHeight + 'px';
      body.style.overflow = 'hidden';
      body.style.transition = 'max-height 280ms cubic-bezier(0.23, 1, 0.32, 1)';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          body.style.maxHeight = '0px';
        });
      });

      body.addEventListener('transitionend', function handler() {
        details.removeAttribute('open');
        body.style.maxHeight = '';
        body.style.overflow = '';
        body.style.transition = '';
        body.removeEventListener('transitionend', handler);
      });
    }
  }

  // ─── 7. Smooth Scroll ─────────────────────────────────────────────────────
  // Intercepts all anchor clicks with href="#..." and scrolls with 80px offset.
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // Set focus to target for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  // ─── 8. Footer Year ───────────────────────────────────────────────────────
  // Writes the current year into #footer-year.
  function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
  }

  // ─── 9. Contact Form to LINE ──────────────────────────────────────────────
  // Submits contact form data to LINE application.
  function initContactFormToLine() {
    const form = document.querySelector('form[aria-label="Contact form"]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect form data
      const name = form.querySelector('#field-name').value;
      const email = form.querySelector('#field-email').value;
      const phone = form.querySelector('#field-phone').value;
      const property = form.querySelector('#field-property').value;
      const pest = form.querySelector('#field-pest').value;
      const message = form.querySelector('#field-message').value;

      // Build message for LINE
      const lineMessage = encodeURIComponent(
        'Free Pest Inspection Request:\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + phone + '\n' +
        'Property: ' + property + '\n' +
        'Pest Concern: ' + pest + '\n' +
        'Additional Details: ' + (message || 'None') + '\n\n' +
        'Please confirm availability for inspection.'
      );

      // Redirect to LINE with message
      window.location.href = 'https://line.me/R/ti/p/@greennanothai?message=' + lineMessage;
    });
  }

})();

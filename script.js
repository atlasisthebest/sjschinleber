document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const marketingBox = document.getElementById('marketingBox');

  // Scroll-based header style
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Scroll reveal observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const index = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function observeReveals() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      revealObserver.observe(el);
    });
  }

  function switchTab(tabId) {
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });

    siteNav.classList.remove('open');

    // Re-trigger handwriting and marketing box animation when returning to home
    if (tabId === 'home') {
      const letters = document.querySelectorAll('.hw-word span');
      marketingBox.classList.remove('visible');
      letters.forEach(letter => {
        letter.style.animation = 'none';
        letter.offsetHeight;
        letter.style.animation = '';
      });
      animateHandwriting();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-observe reveals in the new tab
    requestAnimationFrame(() => {
      observeReveals();
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  // Handwriting animation
  function animateHandwriting() {
    const letters = document.querySelectorAll('.hw-word span');
    letters.forEach((letter, i) => {
      letter.style.animationDelay = `${i * 0.09}s`;
    });
    marketingBox.classList.remove('visible');
    setTimeout(() => {
      marketingBox.classList.add('visible');
    }, 1200);
  }
  animateHandwriting();

  // Initial reveal observation
  observeReveals();

  // Contact form handling
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const subject = form.querySelector('#subject').value || 'Website Contact';
      const message = form.querySelector('#message').value;

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:sschinleber@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }
});

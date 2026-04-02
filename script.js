document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-tab]');
  const panels = document.querySelectorAll('.tab-panel');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  function switchTab(tabId) {
    // Update panels
    panels.forEach(panel => {
      panel.classList.toggle('active', panel.id === tabId);
    });

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.tab === tabId);
    });

    // Close mobile menu
    siteNav.classList.remove('open');

    // Re-trigger handwriting animation when returning to home
    if (tabId === 'home') {
      const letters = document.querySelectorAll('.hw-word span');
      letters.forEach(letter => {
        letter.style.animation = 'none';
        letter.offsetHeight;
        letter.style.animation = '';
      });
      animateHandwriting();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle all tab links (nav links, buttons, inline links)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });

  // Handwriting animation — stagger each letter
  function animateHandwriting() {
    const letters = document.querySelectorAll('.hw-word span');
    letters.forEach((letter, i) => {
      letter.style.animationDelay = `${i * 0.25}s`;
    });
  }
  animateHandwriting();

  // Contact form handling — opens user's email client with fields pre-filled
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

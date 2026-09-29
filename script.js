const filterButtons = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');
const yearEl = document.getElementById('year');
const navLinks = document.querySelectorAll('.main-nav a');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const particleHost = document.getElementById('particles');

if (particleHost) {
  const particleCount = 30;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    const size = (Math.random() * 4 + 2).toFixed(2);
    const duration = (Math.random() * 16 + 12).toFixed(2);
    const left = (Math.random() * 100).toFixed(2);
    const delay = (Math.random() * 10).toFixed(2);
    const driftX = `${((Math.random() * 80) - 40).toFixed(2)}px`;

    particle.className = 'particle';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.bottom = '-20px';
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.setProperty('--drift-x', driftX);

    particleHost.appendChild(particle);
  }
}

const setActiveNavLink = (link) => {
  navLinks.forEach((navLink) => navLink.classList.toggle('active', navLink === link));
};

navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  const isCurrentPageLink = href && href !== '#' && window.location.pathname.endsWith(href);

  if (isCurrentPageLink) {
    setActiveNavLink(link);
  }

  link.addEventListener('click', () => setActiveNavLink(link));
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    postCards.forEach((card) => {
      const category = card.dataset.category;
      const shouldShow = selected === 'all' || category === selected;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = newsletterForm.querySelector('button');
    const input = newsletterForm.querySelector('input');

    if (input && input.value.trim()) {
      button.textContent = 'Subscribed';
      button.disabled = true;
      input.value = '';
      input.placeholder = 'Thanks for joining!';
    }
  });
}

// Quiz functionality moved to Google Forms embedded iframe
// The custom quiz form has been replaced with an embedded Google Form

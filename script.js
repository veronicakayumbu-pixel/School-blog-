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

const quizForm = document.querySelector('.quiz-form');

if (quizForm) {
  const questions = quizForm.querySelectorAll('.quiz-question');
  const resultBox = quizForm.querySelector('.quiz-result');
  const resetButton = quizForm.querySelector('.quiz-reset-btn');

  const resetQuiz = () => {
    questions.forEach((question) => {
      const selected = question.querySelector('input:checked');
      const feedback = question.querySelector('.question-feedback');
      if (selected) selected.checked = false;
      if (feedback) {
        feedback.textContent = '';
        feedback.classList.remove('correct', 'error');
      }
    });

    if (resultBox) {
      resultBox.textContent = '';
      resultBox.hidden = true;
    }
  };

  if (resetButton) {
    resetButton.addEventListener('click', resetQuiz);
  }

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let score = 0;

    questions.forEach((question) => {
      const selected = question.querySelector('input:checked');
      const feedback = question.querySelector('.question-feedback');
      const correctAnswer = question.dataset.answer;
      const correctLabel = question.dataset.correctLabel || 'the correct answer';

      if (!selected) {
        if (feedback) {
          feedback.textContent = 'Please choose an answer.';
          feedback.classList.remove('correct');
          feedback.classList.add('error');
        }
        return;
      }

      const isCorrect = selected.value === correctAnswer;
      if (feedback) {
        feedback.textContent = isCorrect
          ? 'Correct! Great job.'
          : `Not quite. The correct answer is ${correctLabel}.`;
        feedback.classList.toggle('correct', isCorrect);
        feedback.classList.toggle('error', !isCorrect);
      }

      if (isCorrect) score += 1;
    });

    if (resultBox) {
      resultBox.hidden = false;
      resultBox.textContent = `Your score: ${score} / ${questions.length}`;
    }
  });
}

document.documentElement.classList.add('motion-ready');

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main section[id], #top')];
const navLinks = [...nav.querySelectorAll('a')];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => {
    if (link.hasAttribute('aria-current')) return;
    link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-20% 0px -65%', threshold: [0, .25, .5] });
sections.forEach((section) => observer.observe(section));

const contactModal = document.querySelector('#contact-form');
const openContactButtons = document.querySelectorAll('.js-open-contact');
const closeContactButton = contactModal.querySelector('.modal-close');

openContactButtons.forEach((button) => button.addEventListener('click', () => {
  contactModal.showModal();
}));

closeContactButton.addEventListener('click', () => contactModal.close());
contactModal.addEventListener('click', (event) => {
  if (event.target === contactModal) contactModal.close();
});

const query = new URLSearchParams(window.location.search);
if (query.get('sent') === '1') {
  const toast = document.querySelector('.success-toast');
  toast.classList.add('is-visible');
  window.history.replaceState({}, '', `${window.location.pathname}${window.location.hash}`);
  window.setTimeout(() => toast.classList.remove('is-visible'), 7000);
}

const motionSelectors = [
  '.section-heading',
  '.strength-main > h2',
  '.strength-main > .lead',
  '.business-title > p',
  '.trouble-grid article',
  '.reason-grid article',
  '.service-grid article',
  '.flow-list li',
  '.faq-list details',
  '.president-message',
  '.contact-panel > div',
  '.message-motto',
  '.footer-main > *'
];

const motionElements = [...document.querySelectorAll(motionSelectors.join(','))];
motionElements.forEach((element) => element.classList.add('motion-reveal'));

[
  '.trouble-grid article',
  '.reason-grid article',
  '.service-grid article',
  '.flow-list li',
  '.faq-list details',
  '.contact-panel > *',
  '.footer-main > *'
].forEach((selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.style.setProperty('--motion-delay', `${Math.min(index, 5) * 65}ms`);
  });
});

if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      motionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  motionElements.forEach((element) => motionObserver.observe(element));
} else {
  motionElements.forEach((element) => element.classList.add('is-visible'));
}

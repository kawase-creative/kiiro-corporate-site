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
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
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

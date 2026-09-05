const root = document.documentElement;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

const savedTheme = localStorage.getItem('academic-theme');
if (savedTheme) root.dataset.theme = savedTheme;

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('academic-theme', next);
  themeToggle.innerHTML = `<i data-lucide="${next === 'dark' ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
  themeToggle.setAttribute('aria-label', next === 'dark' ? '切换浅色模式' : '切换深色模式');
  renderIcons();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '打开菜单' : '关闭菜单');
  mobileNav.hidden = isOpen;
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'menu' : 'x'}" aria-hidden="true"></i>`;
  renderIcons();
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
  renderIcons();
}));

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.publication').forEach((item) => {
      item.hidden = button.dataset.year !== 'all' && item.dataset.year !== button.dataset.year;
    });
  });
});

const newsToggle = document.querySelector('#news-toggle');
newsToggle?.addEventListener('click', () => {
  const olderNews = document.querySelector('.older-news');
  const willOpen = olderNews.hidden;
  olderNews.hidden = !willOpen;
  newsToggle.setAttribute('aria-expanded', String(willOpen));
  newsToggle.childNodes[0].textContent = willOpen ? '收起较早动态 ' : '查看更早动态 ';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  });
}, { rootMargin: '-30% 0px -62% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();
renderIcons();

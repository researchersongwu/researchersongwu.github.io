(function () {
  const navLinks = [...document.querySelectorAll('.side-nav a')];
  const sections = navLinks.map((link) => ({ link, element: document.querySelector(link.hash) })).filter((item) => item.element);

  function updateNavigation() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 50) {
      navLinks.forEach((link) => link.classList.remove('active'));
      sections.at(-1)?.link.classList.add('active');
      return;
    }
    const scrollPosition = window.scrollY + 200;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.element.offsetTop <= scrollPosition) current = section;
    });
    navLinks.forEach((link) => link.classList.remove('active'));
    current?.link.classList.add('active');
  }

  window.addEventListener('scroll', updateNavigation, { passive: true });
  updateNavigation();
})();

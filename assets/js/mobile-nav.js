/* Alt sayfalardaki mobil menü açma / kapama davranışı. */
(() => {
  const button = document.querySelector('header .mobile-menu');
  const menu = document.querySelector('header .menu');
  if (!button || !menu) return;
  const close = () => {
    menu.classList.remove('mobile-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Menüyü aç');
    button.textContent = '☰';
  };
  button.addEventListener('click', () => {
    const open = menu.classList.toggle('mobile-open');
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
    button.textContent = open ? '×' : '☰';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !button.contains(e.target)) close();
  });
})();

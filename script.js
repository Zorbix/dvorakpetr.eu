const navigation = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
function updateNavigation() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  const current = atBottom ? sections.at(-1) : [...sections].reverse().find(section => section.getBoundingClientRect().top <= window.innerHeight * 0.4) || sections[0];
  for (const link of navigation) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
});

menuToggle.addEventListener('click', () => {
  const open = !mainNav.classList.contains('open');
  mainNav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      entry.target.querySelectorAll('[data-progress]').forEach(bar => {
        bar.style.width = `${bar.dataset.progress}%`;
      });
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const hero = document.querySelector('.hero');
if (hero) {
  hero.querySelectorAll('[data-progress]').forEach(bar => {
    setTimeout(() => {
      bar.style.width = `${bar.dataset.progress}%`;
    }, 500);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

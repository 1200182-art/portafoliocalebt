/* ══════════════════════════════════════════
   main.js — Portafolio Caleb Josué Trujillo
   ══════════════════════════════════════════ */

/* ── Nav scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Burger menú móvil ── */
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

/* Cerrar menú al hacer clic en un link */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Reveal on scroll ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ── Animar barras de competencias ── */
const skillFills = document.querySelectorAll('.comp-skill-fill');
if (skillFills.length) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));
}

/* ── Resaltar enlace del menú según la página actual ── */
function highlightCurrentPage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
}
highlightCurrentPage();

/* ── Lightbox para galería de proyectos ── */
const galleryItems = document.querySelectorAll('.proy-gallery-item');
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-img');
const modalCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');

if (galleryItems.length && modal) {
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h3')?.innerText || '';
      const desc = item.querySelector('p')?.innerText || '';
      modal.style.display = 'flex';
      modalImg.src = img.src;
      modalCaption.innerHTML = `<strong>${title}</strong><br>${desc}`;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
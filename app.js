/* =============================================
   PORTFOLIO – app.js
   Nav scroll · Mobile menu · Fade-in · PDF export · SW registration
   ============================================= */

/* -------- Navbar scroll effect -------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* -------- Mobile hamburger -------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Close mobile menu on link click */
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* Close mobile menu on outside click */
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* -------- Active nav link on scroll -------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* -------- Fade-in on scroll -------- */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

/* -------- PDF Download -------- */
function downloadPDF() {
  const btn = document.getElementById('download-pdf-nav');
  const originalText = btn ? btn.innerHTML : '';

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="animation:spin 1s linear infinite">
        <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
      </svg>
      Generating…`;
  }

  /* Elements to hide in the PDF */
  const hideSelectors = [
    '.navbar',
    '.hero-cta',
    '#download-pdf-nav',
    '.contact-card.download-card',
    '.footer',
  ];
  const hidden = hideSelectors.flatMap((sel) => [...document.querySelectorAll(sel)]);
  hidden.forEach((el) => el.style.setProperty('display', 'none', 'important'));

  const opt = {
    margin:     [12, 14, 12, 14],
    filename:   'Ramekhchhoeng_Final.pdf',
    image:      { type: 'jpeg', quality: 0.97 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0f0f13',
      logging: false,
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  html2pdf()
    .set(opt)
    .from(document.body)
    .save()
    .then(() => {
      hidden.forEach((el) => el.style.removeProperty('display'));
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    })
    .catch((err) => {
      console.error('PDF generation failed:', err);
      hidden.forEach((el) => el.style.removeProperty('display'));
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    });
}

/* Expose to inline onclick handlers */
window.downloadPDF = downloadPDF;

/* Add spin keyframes */
const style = document.createElement('style');
style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(style);

/* -------- PWA: Service Worker -------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('[SW] Registered:', reg.scope))
      .catch((err) => console.warn('[SW] Registration failed:', err));
  });
}

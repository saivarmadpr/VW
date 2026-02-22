import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CinematicScene } from './scene/index.js';

gsap.registerPlugin(ScrollTrigger);

let lenis, scene;

/* ========================================
   LENIS SMOOTH SCROLL
   ======================================== */
function initLenis() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

/* ========================================
   3D SCENE
   ======================================== */
function initScene() {
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;
  scene = new CinematicScene(canvas);

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,
    onUpdate: (self) => {
      scene.setScroll(self.progress);
      const overlay = document.getElementById('hero-overlay');
      if (overlay) {
        overlay.style.opacity = 1 - self.progress * 1.8;
      }
    },
  });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    onLeave: () => {
      const canvas = document.getElementById('scene-canvas');
      if (canvas) canvas.style.opacity = '0';
    },
    onEnterBack: () => {
      const canvas = document.getElementById('scene-canvas');
      if (canvas) canvas.style.opacity = '1';
    },
  });
}

/* ========================================
   LOADER
   ======================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  const ring = document.getElementById('loader-ring-fill');
  const countEl = document.getElementById('loader-count');
  const enterOverlay = document.getElementById('enter-overlay');
  const circ = 2 * Math.PI * 45;
  if (ring) { ring.style.strokeDasharray = circ; ring.style.strokeDashoffset = circ; }

  const dur = 2400, start = Date.now();
  function tick() {
    const raw = Math.min((Date.now() - start) / dur, 1);
    const eased = 1 - Math.pow(2, -10 * raw);
    const prog = Math.round(eased * 100);
    if (countEl) countEl.textContent = prog;
    if (ring) ring.style.strokeDashoffset = circ * (1 - eased);
    if (prog < 100) requestAnimationFrame(tick);
    else setTimeout(() => { loader.classList.add('hidden'); enterOverlay.classList.add('visible'); }, 400);
  }
  requestAnimationFrame(tick);
}

/* ========================================
   ENTER SITE
   ======================================== */
function initEnterSite() {
  const btn = document.getElementById('enter-btn');
  const overlay = document.getElementById('enter-overlay');
  const nav = document.getElementById('nav');
  const dots = document.getElementById('insight-dots');

  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.classList.add('hidden');
    setTimeout(() => {
      if (lenis) lenis.start();
      if (nav) nav.classList.add('visible');
      if (dots) dots.classList.add('visible');
      animateHero();
      startTyping();
    }, 600);
  });
}

/* ========================================
   TYPING
   ======================================== */
function startTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = [
    'Security+ Certified  |  AWS Cloud Practitioner',
    'Threat Detection & Incident Response',
    'Cloud Security & Compliance Auditing',
    'Building Defense-in-Depth Architectures',
  ];
  let pi = 0, ci = 0, del = false;
  function type() {
    const p = phrases[pi];
    if (!del) {
      el.textContent = p.substring(0, ci + 1); ci++;
      if (ci === p.length) { setTimeout(() => { del = true; type(); }, 2400); return; }
      setTimeout(type, 45 + Math.random() * 25);
    } else {
      el.textContent = p.substring(0, ci - 1); ci--;
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 350); return; }
      setTimeout(type, 20);
    }
  }
  setTimeout(type, 700);
}

/* ========================================
   HERO TEXT ANIMATIONS
   ======================================== */
function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('.hero-badge span, .hero-badge-dot', { y: 30, opacity: 0, duration: 1.2, stagger: 0.08 })
    .from('.hero-line', { y: 140, opacity: 0, duration: 1.5, stagger: 0.18 }, '-=0.8')
    .from('.hero-tagline', { y: 20, opacity: 0, duration: 1 }, '-=0.7')
    .from('.hero-scroll-hint', { y: 30, opacity: 0, duration: 1 }, '-=0.6');
}

/* ========================================
   ORB PARALLAX
   ======================================== */
function initOrbParallax() {
  gsap.to('.orb-1', { y: -300, x: 100, scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 2 } });
  gsap.to('.orb-2', { y: -500, x: -80, scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 3 } });
  gsap.to('.orb-3', { y: -400, x: 60, scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 2.5 } });
}

/* ========================================
   SECTION ANIMATIONS
   ======================================== */
function initSectionReveals() {
  document.querySelectorAll('.section').forEach((sec) => {
    const num = sec.querySelector('.section-number');
    const heading = sec.querySelector('.section-heading');
    const intro = sec.querySelector('.section-intro');
    const pre = sec.querySelector('.section-pre');
    const content = sec.querySelector('.section-content');

    const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' } });
    if (num) tl.from(num, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' });
    if (pre) tl.from(pre, { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6');
    if (heading) tl.from(heading.querySelectorAll('.line'), { y: 100, opacity: 0, duration: 1.2, stagger: 0.14, ease: 'expo.out' }, '-=0.6');
    if (intro) tl.from(intro, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6');
    if (content) tl.from(content, { y: 60, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.5');
  });
}

function initDetailAnims() {
  // About
  gsap.from('.terminal-card', { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.s01-content', start: 'top 70%', toggleActions: 'play none none reverse' } });
  gsap.from('.stat-card', { y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'expo.out',
    scrollTrigger: { trigger: '.stat-grid', start: 'top 75%', toggleActions: 'play none none reverse', onEnter: animateCounters } });

  // Skills
  gsap.from('.skill-category', { y: 70, opacity: 0, scale: 0.95, stagger: 0.15, duration: 1.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.skills-grid', start: 'top 75%', toggleActions: 'play none none reverse',
      onEnter() { document.querySelectorAll('.skill-bar').forEach((b) => gsap.to(b, { width: b.dataset.width + '%', duration: 2, ease: 'expo.out', delay: 0.4 })); } } });

  // Experience
  gsap.from('.timeline-item', { x: -80, opacity: 0, stagger: 0.25, duration: 1.3, ease: 'expo.out',
    scrollTrigger: { trigger: '.timeline', start: 'top 70%', toggleActions: 'play none none reverse' } });

  // Projects
  gsap.from('.project-card', { y: 70, opacity: 0, scale: 0.92, stagger: 0.15, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '.projects-grid', start: 'top 75%', toggleActions: 'play none none reverse' } });

  // Marquee
  gsap.from('#marquee-section', { opacity: 0, y: 30, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '#marquee-section', start: 'top 85%', toggleActions: 'play none none reverse' } });

  // Certs
  gsap.from('.cert-card', { y: 50, opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.certs-grid', start: 'top 75%', toggleActions: 'play none none reverse' } });
  gsap.from('.edu-card', { x: -60, opacity: 0, stagger: 0.2, duration: 1.1, ease: 'expo.out',
    scrollTrigger: { trigger: '.education-blocks', start: 'top 75%', toggleActions: 'play none none reverse' } });

  // Connect
  gsap.from('.connect-card', { y: 60, opacity: 0, scale: 0.92, stagger: 0.1, duration: 0.9, ease: 'expo.out',
    scrollTrigger: { trigger: '.connect-grid', start: 'top 75%', toggleActions: 'play none none reverse' } });

  // Footer
  gsap.from('#footer > *', { y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: 'expo.out',
    scrollTrigger: { trigger: '#footer', start: 'top 85%', toggleActions: 'play none none reverse' } });
}

function animateCounters() {
  document.querySelectorAll('.stat-value').forEach((el) => {
    const t = parseInt(el.dataset.count);
    gsap.to(el, { textContent: t, duration: 2.2, ease: 'power2.out', snap: { textContent: 1 },
      onUpdate() { el.textContent = Math.round(parseFloat(el.textContent)); } });
  });
}

/* ========================================
   NAV COUNTER
   ======================================== */
function initSectionCounter() {
  const el = document.getElementById('nav-current');
  ['hero','section-01','section-02','section-03','section-04','section-05','section-06'].forEach((id, i) => {
    const t = document.getElementById(id); if (!t) return;
    const n = String(i).padStart(2, '0');
    ScrollTrigger.create({ trigger: t, start: 'top center', end: 'bottom center',
      onEnter: () => (el.textContent = n), onEnterBack: () => (el.textContent = n) });
  });
}

/* ========================================
   DOTS
   ======================================== */
function initDots() {
  const dots = document.querySelectorAll('.dot');
  const ids = ['section-01','section-02','section-03','section-04','section-05','section-06'];
  dots.forEach((d) => { d.addEventListener('click', () => {
    const t = document.getElementById(ids[parseInt(d.dataset.index) - 1]);
    if (t) lenis.scrollTo(t, { duration: 2 });
  }); });
  ids.forEach((id, i) => { ScrollTrigger.create({ trigger: `#${id}`, start: 'top center', end: 'bottom center',
    onEnter: () => setA(i), onEnterBack: () => setA(i) }); });
  function setA(idx) { dots.forEach((d, i) => d.classList.toggle('active', i === idx)); }
}

/* ========================================
   NOTE MODAL
   ======================================== */
function initNoteModal() {
  const btn = document.getElementById('nav-note-btn');
  const m = document.getElementById('note-modal');
  const c = document.getElementById('note-close');
  btn.addEventListener('click', () => { m.classList.add('open'); lenis.stop(); });
  c.addEventListener('click', () => { m.classList.remove('open'); lenis.start(); });
  m.addEventListener('click', (e) => { if (e.target === m) { m.classList.remove('open'); lenis.start(); } });
}

/* ========================================
   FINAL TERMINAL TYPING
   ======================================== */
function initFinalTerminal() {
  const el = document.getElementById('final-terminal-text');
  if (!el) return;

  ScrollTrigger.create({
    trigger: '.final-terminal',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const lines = ['$ echo "Thanks for visiting."', 'Thanks for visiting.', '$ echo "Let\'s build something secure."', "Let's build something secure.", '$ _'];
      let li = 0, chi = 0, out = '';
      function t() {
        if (li >= lines.length) return;
        const l = lines[li]; out += l[chi]; el.textContent = out; chi++;
        if (chi >= l.length) { out += '\n'; li++; chi = 0; setTimeout(t, li % 2 === 0 ? 400 : 100); }
        else setTimeout(t, l.startsWith('$') ? 35 : 15);
      }
      setTimeout(t, 500);
    },
  });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();

  try { initScene(); } catch (e) { console.error('Scene init failed:', e); }

  initLoader();
  initEnterSite();

  try { initNoteModal(); } catch (e) { console.error('Note modal init failed:', e); }

  ScrollTrigger.addEventListener('refresh', () => lenis?.resize());

  setTimeout(() => {
    try {
      initOrbParallax();
      initSectionReveals();
      initDetailAnims();
      initSectionCounter();
      initDots();
      initFinalTerminal();
    } catch (e) { console.error('Animation init failed:', e); }
    ScrollTrigger.refresh();
  }, 100);
});

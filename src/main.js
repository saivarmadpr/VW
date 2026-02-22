import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ========================================
   LENIS SMOOTH SCROLL
   ======================================== */
let lenis;

function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

/* ========================================
   MATRIX RAIN
   ======================================== */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:,.<>?/~`!αβγδεζηθικλμνξπρστυφχψω';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 16, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF88';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  draw();
}

/* ========================================
   LOADING SCREEN
   ======================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderCount = document.getElementById('loader-count');
  const enterOverlay = document.getElementById('enter-overlay');

  let progress = 0;
  const duration = 2500;
  const startTime = Date.now();

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function updateLoader() {
    const elapsed = Date.now() - startTime;
    const raw = Math.min(elapsed / duration, 1);
    progress = Math.round(easeOutExpo(raw) * 100);

    loaderCount.innerHTML = `${progress}<span class="loader-pct">%</span>`;
    loaderBar.style.width = progress + '%';

    if (progress < 100) {
      requestAnimationFrame(updateLoader);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        enterOverlay.classList.add('visible');
      }, 400);
    }
  }

  requestAnimationFrame(updateLoader);
}

/* ========================================
   ENTER SITE
   ======================================== */
function initEnterSite() {
  const enterBtn = document.getElementById('enter-btn');
  const enterOverlay = document.getElementById('enter-overlay');
  const nav = document.getElementById('nav');
  const insightDots = document.getElementById('insight-dots');

  enterBtn.addEventListener('click', () => {
    enterOverlay.classList.add('hidden');
    setTimeout(() => {
      lenis.start();
      nav.classList.add('visible');
      insightDots.classList.add('visible');
      animateHero();
      startTypingAnimation();
    }, 600);
  });
}

/* ========================================
   TYPING ANIMATION
   ======================================== */
function startTypingAnimation() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Security+ Certified | AWS Cloud Practitioner',
    'Threat Detection & Incident Response',
    'Cloud Security & Compliance Auditing',
    'Building Defense-in-Depth Architectures',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; type(); }, 2200);
        return;
      }
      setTimeout(type, 50 + Math.random() * 30);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 25);
    }
  }

  setTimeout(type, 800);
}

/* ========================================
   HERO ANIMATIONS
   ======================================== */
function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.from('.hero-subtitle span', {
    y: 30,
    opacity: 0,
    duration: 1.2,
  })
    .from('.hero-title-line', {
      y: 120,
      opacity: 0,
      duration: 1.4,
      stagger: 0.15,
    }, '-=0.8')
    .from('.hero-tagline', {
      y: 20,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from('.hero-scroll', {
      y: 30,
      opacity: 0,
      duration: 1,
    }, '-=0.6');

  gsap.to('.hero-title-line', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: (i) => (i + 1) * -80,
    opacity: 0,
    stagger: 0.05,
  });

  gsap.to('.hero-subtitle', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '40% top',
      scrub: 1,
    },
    y: -60,
    opacity: 0,
  });

  gsap.to('.hero-scroll', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '30% top',
      scrub: 1,
    },
    opacity: 0,
  });
}

/* ========================================
   SECTION SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section:not(.hero)');

  sections.forEach((section) => {
    const number = section.querySelector('.section-number');
    const heading = section.querySelector('.section-heading');
    const intro = section.querySelector('.section-intro');
    const pre = section.querySelector('.section-pre');
    const content = section.querySelector('.section-content');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    if (number) {
      tl.from(number, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' });
    }
    if (pre) {
      tl.from(pre, { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6');
    }
    if (heading) {
      const lines = heading.querySelectorAll('.line');
      tl.from(lines, { y: 80, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out' }, '-=0.6');
    }
    if (intro) {
      tl.from(intro, { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.6');
    }
    if (content) {
      tl.from(content, { y: 50, opacity: 0, duration: 1, ease: 'expo.out' }, '-=0.5');
    }
  });

  initSection01Animations();
  initSection02Animations();
  initSection03Animations();
  initSection04Animations();
  initSection05Animations();
  initSection06Animations();
}

/* ---- Section 01: About ---- */
function initSection01Animations() {
  gsap.from('.terminal-card', {
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.s01-left',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.stat-card', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.stat-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      onEnter: () => animateCounters(),
    },
  });

  gsap.from('.contact-strip', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.contact-strip',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ---- Stat Counters ---- */
function animateCounters() {
  document.querySelectorAll('.stat-value').forEach((el) => {
    const target = parseInt(el.dataset.count);
    gsap.to(el, {
      textContent: target,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function () {
        el.textContent = Math.round(parseFloat(el.textContent));
      },
    });
  });
}

/* ---- Section 02: Skills ---- */
function initSection02Animations() {
  gsap.from('.skill-category', {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      onEnter: () => animateSkillBars(),
    },
  });
}

function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach((bar) => {
    const w = bar.dataset.width;
    gsap.to(bar, {
      width: w + '%',
      duration: 1.8,
      ease: 'expo.out',
      delay: 0.3,
    });
  });
}

/* ---- Section 03: Experience ---- */
function initSection03Animations() {
  gsap.from('.timeline::before', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 1.5,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.timeline-item', {
    x: -60,
    opacity: 0,
    stagger: 0.3,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ---- Section 04: Projects ---- */
function initSection04Animations() {
  gsap.from('.project-card', {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ---- Section 05: Certs & Education ---- */
function initSection05Animations() {
  gsap.from('.cert-card', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.certs-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.edu-card', {
    x: -50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.education-blocks',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ---- Section 06: Connect ---- */
function initSection06Animations() {
  gsap.from('.connect-card', {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.connect-grid',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.final-terminal', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.final-terminal',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      onEnter: () => typeFinalTerminal(),
    },
  });
}

/* ---- Final Terminal Typing ---- */
function typeFinalTerminal() {
  const el = document.getElementById('final-terminal-text');
  if (!el || el.dataset.typed) return;
  el.dataset.typed = 'true';

  const lines = [
    '$ echo "Thanks for visiting my portfolio."',
    'Thanks for visiting my portfolio.',
    '$ echo "Let\'s build something secure together."',
    "Let's build something secure together.",
    '$ _',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let output = '';

  function typeChar() {
    if (lineIdx >= lines.length) return;

    const line = lines[lineIdx];
    output += line[charIdx];
    el.textContent = output;
    charIdx++;

    if (charIdx >= line.length) {
      output += '\n';
      lineIdx++;
      charIdx = 0;
      setTimeout(typeChar, lineIdx % 2 === 0 ? 400 : 100);
    } else {
      const isCommand = line.startsWith('$');
      setTimeout(typeChar, isCommand ? 35 : 15);
    }
  }

  setTimeout(typeChar, 500);
}

/* ========================================
   SECTION COUNTER IN NAV
   ======================================== */
function initSectionCounter() {
  const navCurrent = document.getElementById('nav-current');
  const sectionMap = [
    { el: document.getElementById('hero'), num: '00' },
    { el: document.getElementById('section-01'), num: '01' },
    { el: document.getElementById('section-02'), num: '02' },
    { el: document.getElementById('section-03'), num: '03' },
    { el: document.getElementById('section-04'), num: '04' },
    { el: document.getElementById('section-05'), num: '05' },
    { el: document.getElementById('section-06'), num: '06' },
  ];

  sectionMap.forEach(({ el, num }) => {
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => (navCurrent.textContent = num),
      onEnterBack: () => (navCurrent.textContent = num),
    });
  });
}

/* ========================================
   INSIGHT DOTS
   ======================================== */
function initInsightDots() {
  const dots = document.querySelectorAll('.dot');
  const sectionIds = [
    'section-01', 'section-02', 'section-03',
    'section-04', 'section-05', 'section-06',
  ];

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index) - 1;
      const target = document.getElementById(sectionIds[idx]);
      if (target) lenis.scrollTo(target, { offset: 0, duration: 2 });
    });
  });

  sectionIds.forEach((id, i) => {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(i),
      onEnterBack: () => setActiveDot(i),
    });
  });

  function setActiveDot(activeIndex) {
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }
}

/* ========================================
   NOTE MODAL
   ======================================== */
function initNoteModal() {
  const noteBtn = document.getElementById('nav-note-btn');
  const noteModal = document.getElementById('note-modal');
  const noteClose = document.getElementById('note-close');

  noteBtn.addEventListener('click', () => {
    noteModal.classList.add('open');
    lenis.stop();
  });

  noteClose.addEventListener('click', () => {
    noteModal.classList.remove('open');
    lenis.start();
  });

  noteModal.addEventListener('click', (e) => {
    if (e.target === noteModal) {
      noteModal.classList.remove('open');
      lenis.start();
    }
  });
}

/* ========================================
   MARQUEE SCROLL SPEED EFFECT
   ======================================== */
function initMarqueeScrollEffect() {
  const marqueeSection = document.getElementById('marquee-section');
  if (!marqueeSection) return;

  gsap.from(marqueeSection, {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: marqueeSection,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ========================================
   PARALLAX
   ======================================== */
function initParallax() {
  gsap.utils.toArray('.section').forEach((section) => {
    gsap.to(section, {
      backgroundPositionY: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/* ========================================
   FOOTER
   ======================================== */
function initFooterAnimation() {
  const footer = document.getElementById('footer');
  gsap.from(footer.children, {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: footer,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initLenis();
  initLoader();
  initEnterSite();
  initNoteModal();

  ScrollTrigger.addEventListener('refresh', () => lenis?.resize());

  setTimeout(() => {
    initScrollAnimations();
    initSectionCounter();
    initInsightDots();
    initParallax();
    initMarqueeScrollEffect();
    initFooterAnimation();
    ScrollTrigger.refresh();
  }, 100);
});

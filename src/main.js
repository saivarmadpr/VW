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
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ========================================
   SCROLL REVEAL — IntersectionObserver
   ======================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ========================================
   HERO ANIMATIONS
   ======================================== */
function animateHero() {
  const tl = gsap.timeline({ delay: 0.3 });

  // Animate title lines
  tl.from('.hero-title .line', {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.15,
  });

  // Animate bottom elements
  tl.from(
    '.hero-tagline',
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'expo.out',
    },
    '-=0.5'
  );

  tl.from(
    '.hero-scroll-btn',
    {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.4)',
    },
    '-=0.6'
  );

  // Parallax orbs on scroll
  gsap.to('.hero .ambient-orb:nth-child(1)', {
    y: -100,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  gsap.to('.hero .ambient-orb:nth-child(2)', {
    y: -60,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

/* ========================================
   PORTFOLIO SECTION ANIMATIONS
   ======================================== */
function animatePortfolio() {
  // Heading animation
  gsap.from('.portfolio-heading', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.portfolio-header',
      start: 'top 80%',
    },
  });

  // Stagger project cards
  gsap.from('.portfolio-item', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 75%',
    },
  });
}

/* ========================================
   FEATURED SECTION ANIMATIONS
   ======================================== */
function animateFeatured() {
  gsap.from('.featured-image-wrap', {
    x: -80,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.featured-grid',
      start: 'top 70%',
    },
  });

  gsap.from('.featured-content', {
    x: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.featured-grid',
      start: 'top 70%',
    },
  });
}

/* ========================================
   CAPABILITIES ANIMATIONS
   ======================================== */
function animateCapabilities() {
  gsap.from('.capability-item', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.capabilities-list',
      start: 'top 75%',
    },
  });

  gsap.from('.capabilities-heading', {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.capabilities-right',
      start: 'top 75%',
    },
  });
}

/* ========================================
   TESTIMONIAL CAROUSEL
   ======================================== */
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoPlayTimer;

  function goToSlide(index) {
    // Hide current
    slides[currentSlide].style.display = 'none';
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    // Show new
    slides[currentSlide].style.display = 'block';
    dots[currentSlide].classList.add('active');

    // Animate in
    gsap.from(slides[currentSlide].querySelector('.testimonial-quote'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
    });
    gsap.from(slides[currentSlide].querySelector('.testimonial-bio'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'expo.out',
      delay: 0.15,
    });
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  // Dot click handlers
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      clearInterval(autoPlayTimer);
      goToSlide(parseInt(dot.dataset.dot));
      autoPlayTimer = setInterval(nextSlide, 5000);
    });
  });

  // Auto-play
  autoPlayTimer = setInterval(nextSlide, 5000);
}

/* ========================================
   FOOTER ANIMATION
   ======================================== */
function animateFooter() {
  gsap.from('.footer-heading', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer-cta',
      start: 'top 80%',
    },
  });

  gsap.from('.footer-email', {
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: {
      trigger: '.footer-cta',
      start: 'top 75%',
    },
  });
}

/* ========================================
   NAV SCROLL EFFECT
   ======================================== */
function initNavEffect() {
  const nav = document.getElementById('nav');

  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      if (self.direction === -1) {
        nav.style.transform = 'translateY(0)';
      }
    },
  });
}

/* ========================================
   SMOOTH SCROLL LINKS
   ======================================== */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    });
  });
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initScrollReveal();
  animateHero();
  animatePortfolio();
  animateFeatured();
  animateCapabilities();
  initTestimonialCarousel();
  animateFooter();
  initNavEffect();
  initSmoothScrollLinks();
});

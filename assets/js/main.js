/**
 * Cap Plastic Now - Interactive GSAP & Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 1. Mobile Menu Functionality
  initMobileMenu();

  // 2. Hero Timeline Animations
  initHeroAnimations();

  // 3. ScrollTrigger Reveal Animations
  initScrollAnimations();

  // 4. Live Counter Animations
  initCounters();

  // 5. Interactive Impact Calculator
  initImpactCalculator();

  // 6. Interactive Petition Form
  initPetitionForm();

  // 7. FAQ Accordion
  initAccordion();

  // 8. Floating Elements / Ambient Animation
  initFloatingElements();
});

/* ==========================================================================
   1. Mobile Menu
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  let isOpen = false;

  if (!menuToggle || !mobileMenu) return;

  const tl = gsap.timeline({ paused: true });
  tl.to(mobileMenu, {
    y: 0,
    opacity: 1,
    duration: 0.4,
    ease: 'power3.out',
    display: 'block'
  }).from('.mobile-nav-link', {
    y: 20,
    opacity: 0,
    stagger: 0.08,
    duration: 0.3,
    ease: 'power2.out'
  }, '-=0.2');

  menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      tl.play();
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      tl.reverse();
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) {
        isOpen = false;
        tl.reverse();
      }
    });
  });
}

/* ==========================================================================
   2. Hero Entrance Animation
   ========================================================================== */
function initHeroAnimations() {
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTL
    .from('#mainHeader', {
      y: -60,
      opacity: 0,
      duration: 0.8
    })
    .from('.hero-badge', {
      scale: 0.8,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-title-line', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    }, '-=0.3')
    .from('.hero-desc', {
      y: 25,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-cta-group', {
      y: 20,
      opacity: 0,
      duration: 0.5
    }, '-=0.3')
    .from('.hero-stat-card', {
      y: 35,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12
    }, '-=0.3')
    .from('.hero-visual-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.2)'
    }, '-=0.5');
}

/* ==========================================================================
   3. ScrollTrigger Animations
   ========================================================================== */
function initScrollAnimations() {
  // Section Headers
  gsap.utils.toArray('.section-reveal-header').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Stagger Cards
  gsap.utils.toArray('.card-grid-stagger').forEach((grid) => {
    const cards = grid.querySelectorAll('.stagger-item');
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });

  // Timeline / Step items
  gsap.utils.toArray('.step-item').forEach((step, index) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: index % 2 === 0 ? -40 : 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Parallax background blobs
  gsap.to('.ambient-blob-1', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5
    },
    y: 300,
    rotation: 45
  });

  gsap.to('.ambient-blob-2', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2
    },
    y: -300,
    rotation: -45
  });
}

/* ==========================================================================
   4. Live Number Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute('data-counter'));
    const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';

    const counterObj = { val: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (decimals > 0) {
              counter.textContent = prefix + counterObj.val.toFixed(decimals) + suffix;
            } else {
              counter.textContent = prefix + Math.floor(counterObj.val).toLocaleString() + suffix;
            }
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. Interactive Impact Calculator
   ========================================================================== */
function initImpactCalculator() {
  const slider = document.getElementById('capSlider');
  const sliderValLabel = document.getElementById('sliderValLabel');
  const metricCo2 = document.getElementById('metricCo2');
  const metricPlastic = document.getElementById('metricPlastic');
  const metricOcean = document.getElementById('metricOcean');

  if (!slider) return;

  function updateMetrics(percentage) {
    sliderValLabel.textContent = percentage + '%';

    // Baseline calculation models (estimates in million metric tons)
    // 75% cap target = ~180M tons virgin plastic prevented by 2040
    const tonsSaved = ((percentage / 100) * 240).toFixed(1);
    const co2Saved = ((percentage / 100) * 580).toFixed(1);
    const oceanSaved = ((percentage / 100) * 85).toFixed(1);

    animateValue(metricPlastic, tonsSaved, 'M Tons');
    animateValue(metricCo2, co2Saved, 'M MT CO₂');
    animateValue(metricOcean, oceanSaved, 'M Tons');
  }

  function animateValue(element, endVal, suffix) {
    if (!element) return;
    const currentVal = parseFloat(element.getAttribute('data-current') || '0');
    const target = parseFloat(endVal);

    const obj = { val: currentVal };
    gsap.to(obj, {
      val: target,
      duration: 0.5,
      ease: 'power1.out',
      onUpdate: () => {
        element.textContent = obj.val.toFixed(1) + ' ' + suffix;
        element.setAttribute('data-current', obj.val);
      }
    });
  }

  slider.addEventListener('input', (e) => {
    updateMetrics(e.target.value);
  });

  // Initial trigger
  updateMetrics(slider.value);
}

/* ==========================================================================
   6. Interactive Petition Form
   ========================================================================== */
function initPetitionForm() {
  const form = document.getElementById('petitionForm');
  const successBox = document.getElementById('petitionSuccess');
  const signatureDisplay = document.getElementById('signatureCountDisplay');
  const progressBar = document.getElementById('signatureProgressBar');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span class="inline-block animate-spin mr-2">⏳</span> Adding your voice...`;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;

      // Update signature counter
      if (signatureDisplay) {
        const currentCount = parseInt(signatureDisplay.getAttribute('data-raw') || '1845230', 10);
        const newCount = currentCount + 1;
        signatureDisplay.setAttribute('data-raw', newCount);
        signatureDisplay.textContent = newCount.toLocaleString();

        // Increment progress bar slightly
        if (progressBar) {
          const pct = Math.min(100, (newCount / 2000000) * 100).toFixed(2);
          progressBar.style.width = pct + '%';
        }
      }

      // Hide form & show animated celebration
      gsap.to(form, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        onComplete: () => {
          form.classList.add('hidden');
          if (successBox) {
            successBox.classList.remove('hidden');
            gsap.from(successBox, {
              scale: 0.9,
              opacity: 0,
              duration: 0.4,
              ease: 'back.out(1.4)'
            });
          }
        }
      });
    }, 900);
  });
}

/* ==========================================================================
   7. Accordion Toggle
   ========================================================================== */
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion-trigger');

  accordions.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.accordion-item');
      const content = parent.querySelector('.accordion-content');
      const icon = trigger.querySelector('.accordion-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all other open items
      document.querySelectorAll('.accordion-item').forEach((item) => {
        if (item !== parent) {
          const otherContent = item.querySelector('.accordion-content');
          const otherIcon = item.querySelector('.accordion-icon');
          if (otherContent && !otherContent.classList.contains('hidden')) {
            gsap.to(otherContent, {
              height: 0,
              opacity: 0,
              duration: 0.25,
              onComplete: () => {
                otherContent.classList.add('hidden');
                otherContent.style.height = 'auto';
              }
            });
            if (otherIcon) gsap.to(otherIcon, { rotation: 0, duration: 0.25 });
          }
        }
      });

      if (isOpen) {
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            content.classList.add('hidden');
            content.style.height = 'auto';
          }
        });
        if (icon) gsap.to(icon, { rotation: 0, duration: 0.25 });
      } else {
        content.classList.remove('hidden');
        content.style.height = '0px';
        content.style.opacity = '0';
        gsap.to(content, {
          height: 'auto',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
        if (icon) gsap.to(icon, { rotation: 180, duration: 0.25 });
      }
    });
  });
}

/* ==========================================================================
   8. Floating Ambient Elements
   ========================================================================== */
function initFloatingElements() {
  gsap.to('.float-element-slow', {
    y: 18,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  gsap.to('.float-element-fast', {
    y: -14,
    rotation: 3,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

/**
 * Aaron Garments | Youth-Driven Menswear & Retail Network Logic
 * Led by Founder, CEO & MD Aaron.
 * Features 15+ Retail Stores (22,000+ Sq. Ft.), Chennai Central DC (10,000 Sq. Ft.),
 * Worldwide & Pan-India Sourcing, Royal White & Gold Theme, WhatsApp Widget.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initActiveNavScrollSpy();
  initAnimatedCounters();
  initBrandFilters();
  initBranchFiltersAndSearch();
  initBrandModals();
  initContactForm();
  initSmoothScroll();
  initWhatsAppWidget();
  
  // Advanced 3D Wow Animations
  init3DTiltCards();
  initGoldParticleCanvas();
  initInteractive3DSwiper();
});

/* ==========================================================================
   0. Theme Switcher (Royal White & Gold Theme vs Dark Theme)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const toggleIcon = document.getElementById('theme-toggle-icon');
  const toggleText = document.getElementById('theme-toggle-text');

  const mobileToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  const mobileToggleText = document.getElementById('mobile-theme-toggle-text');

  // Check saved theme or default to 'light' (White Theme)
  const savedTheme = localStorage.getItem('aaron_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aaron_theme', 'light');

      if (toggleIcon) toggleIcon.className = 'fas fa-sun text-amber-500';
      if (toggleText) toggleText.textContent = 'White Theme';
      if (toggleBtn) {
        toggleBtn.className = 'nav-theme-btn w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full text-xs font-bold flex items-center justify-center space-x-2 transition-all duration-300 focus:outline-none';
      }

      if (mobileToggleBtn) {
        mobileToggleBtn.innerHTML = '<i class="fas fa-sun text-amber-500"></i><span id="mobile-theme-toggle-text">White Theme</span>';
        mobileToggleBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 border border-amber-300 bg-white text-slate-800 shadow-sm';
      }
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('aaron_theme', 'dark');

      if (toggleIcon) toggleIcon.className = 'fas fa-moon text-amber-400';
      if (toggleText) toggleText.textContent = 'Dark Theme';
      if (toggleBtn) {
        toggleBtn.className = 'nav-theme-btn w-9 h-9 sm:w-auto sm:px-3.5 sm:py-2 rounded-full text-xs font-bold flex items-center justify-center space-x-2 transition-all duration-300 focus:outline-none';
      }

      if (mobileToggleBtn) {
        mobileToggleBtn.innerHTML = '<i class="fas fa-moon text-amber-400"></i><span id="mobile-theme-toggle-text">Dark Theme</span>';
        mobileToggleBtn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-2 border border-slate-700 bg-slate-900 text-gray-200 shadow-sm';
      }
    }

    window.dispatchEvent(new Event('themeChanged'));
  }

  function toggle() {
    const isCurrentlyLight = document.documentElement.classList.contains('light');
    applyTheme(isCurrentlyLight ? 'dark' : 'light');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', toggle);
}

/* ==========================================================================
   1. Header Scroll Glassmorphism Effect
   ========================================================================== */
function initHeaderScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function updateNavbar() {
    const isLight = document.documentElement.classList.contains('light');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
      if (isLight) {
        navbar.classList.add('bg-white/95', 'shadow-md', 'border-amber-200/60');
        navbar.classList.remove('bg-slate-950/95', 'border-amber-500/20');
      } else {
        navbar.classList.add('bg-slate-950/95', 'shadow-gold-lg', 'border-amber-500/40');
        navbar.classList.remove('bg-white/95', 'border-amber-200/60');
      }
    } else {
      navbar.classList.remove('scrolled', 'shadow-md', 'shadow-gold-lg');
      if (isLight) {
        navbar.classList.add('bg-white/95', 'border-amber-200/30');
        navbar.classList.remove('bg-slate-950/95', 'border-amber-500/40');
      } else {
        navbar.classList.add('bg-slate-950/95', 'border-amber-500/20');
        navbar.classList.remove('bg-white/95', 'border-amber-200/30');
      }
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  window.addEventListener('themeChanged', updateNavbar);
  updateNavbar();
}

/* ==========================================================================
   2. Mobile Drawer Navigation Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   2b. Active Navigation Capsule ScrollSpy
   ========================================================================== */
function initActiveNavScrollSpy() {
  const navCapsuleItems = document.querySelectorAll('.nav-capsule-item');
  if (!navCapsuleItems.length) return;

  const sections = [];
  navCapsuleItems.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const section = document.querySelector(hash);
      if (section) {
        sections.push({ link, element: section });
      }
    }
  });

  function updateActivePill() {
    const scrollPos = window.scrollY + 120;
    let current = null;

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].element.offsetTop;
      const height = sections[i].element.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sections[i];
        break;
      }
    }

    navCapsuleItems.forEach(link => link.classList.remove('active-pill'));
    if (current) {
      current.link.classList.add('active-pill');
    }
  }

  window.addEventListener('scroll', updateActivePill, { passive: true });
  updateActivePill();
}

/* ==========================================================================
   3. Floating WhatsApp Chat Widget Tooltip Dismiss/Toggle
   ========================================================================== */
function initWhatsAppWidget() {
  const widget = document.getElementById('wa-floating-widget');
  const closeTooltipBtn = document.getElementById('wa-tooltip-close');
  const tooltip = document.getElementById('wa-tooltip');

  if (closeTooltipBtn && tooltip) {
    closeTooltipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tooltip.classList.add('hidden');
    });
  }
}

/* ==========================================================================
   4. 3D Mouse Perspective Tilt Effect for Cards
   ========================================================================== */
function init3DTiltCards() {
  const tiltElements = document.querySelectorAll('.tilt-3d-card');

  tiltElements.forEach(card => {
    let glare = card.querySelector('.glare-overlay');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'glare-overlay absolute inset-0 pointer-events-none rounded-3xl opacity-0 transition-opacity duration-300 z-20';
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(247, 208, 112, 0.25) 0%, rgba(255, 255, 255, 0) 70%)';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(247, 208, 112, 0.3) 0%, rgba(0, 0, 0, 0) 65%)`;

      const depthLayers = card.querySelectorAll('.depth-3d-layer');
      depthLayers.forEach(layer => {
        const depth = layer.getAttribute('data-depth') || 20;
        layer.style.transform = `translateZ(${depth}px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      glare.style.opacity = '0';

      const depthLayers = card.querySelectorAll('.depth-3d-layer');
      depthLayers.forEach(layer => {
        layer.style.transform = 'translateZ(0px)';
        layer.style.transition = 'transform 0.5s ease';
      });
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
      const depthLayers = card.querySelectorAll('.depth-3d-layer');
      depthLayers.forEach(layer => {
        layer.style.transition = 'none';
      });
    });
  });
}

/* ==========================================================================
   5. Golden Interactive Particle Canvas
   ========================================================================== */
function initGoldParticleCanvas() {
  const canvas = document.getElementById('gold-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.color = Math.random() > 0.3 ? '#D4AF37' : '#F7D070';
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#D4AF37';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 110) * 0.2;
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   6. Interactive 3D Brand Card Swiper
   ========================================================================== */
function initInteractive3DSwiper() {
  const brandCards = document.querySelectorAll('.brand-card');

  brandCards.forEach(card => {
    const img = card.querySelector('img');
    if (img) {
      card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.12) rotate(-1deg)';
        img.style.transition = 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
      });
      card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
      });
    }
  });
}

/* ==========================================================================
   7. Animated Numerical Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  if (!counterElements.length) return;

  const observerOptions = {
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNumber = parseInt(target.getAttribute('data-target'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        animateValue(target, 0, targetNumber, 2200, prefix, suffix);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  counterElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * (end - start) + start);
    obj.textContent = `${prefix}${currentValue}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = `${prefix}${end}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   8. Brand Filter Tabs
   ========================================================================== */
function initBrandFilters() {
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  const brandCards = document.querySelectorAll('.brand-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500', 'text-slate-950', 'shadow-gold-glow', 'active-tab');
        b.classList.add('bg-slate-900/80', 'text-gray-300', 'hover:text-amber-400');
      });

      btn.classList.remove('bg-slate-900/80', 'text-gray-300', 'hover:text-amber-400');
      btn.classList.add('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500', 'text-slate-950', 'shadow-gold-glow', 'active-tab');

      const filterValue = btn.getAttribute('data-filter');

      brandCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'perspective(1000px) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'perspective(1000px) scale(0.9)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   9. State & Branch Matrix Search & Filter (Vellore & Tirupur Included)
   ========================================================================== */
function initBranchFiltersAndSearch() {
  const branchSearchInput = document.getElementById('branch-search');
  const branchFilterSelect = document.getElementById('branch-type-filter');
  const stateBtns = document.querySelectorAll('.state-filter-btn');
  const branchItems = document.querySelectorAll('.branch-item');
  const branchCountBadge = document.getElementById('visible-branch-count');

  if (!branchItems.length) return;

  let activeState = 'all';

  stateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stateBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500', 'text-slate-950', 'font-bold', 'active-tab');
        b.classList.add('bg-slate-900/80', 'text-gray-300');
      });

      btn.classList.remove('bg-slate-900/80', 'text-gray-300');
      btn.classList.add('bg-gradient-to-r', 'from-amber-400', 'to-yellow-500', 'text-slate-950', 'font-bold', 'active-tab');

      activeState = btn.getAttribute('data-state');
      filterBranches();
    });
  });

  function filterBranches() {
    const searchTerm = branchSearchInput ? branchSearchInput.value.toLowerCase().trim() : '';
    const selectedType = branchFilterSelect ? branchFilterSelect.value : 'all';

    let count = 0;

    branchItems.forEach(item => {
      const name = (item.getAttribute('data-name') || '').toLowerCase();
      const city = (item.getAttribute('data-city') || '').toLowerCase();
      const state = item.getAttribute('data-state') || '';
      const type = item.getAttribute('data-type') || '';

      const matchesSearch = !searchTerm || name.includes(searchTerm) || city.includes(searchTerm);
      const matchesType = (selectedType === 'all' || type === selectedType);
      const matchesState = (activeState === 'all' || state === activeState);

      if (matchesSearch && matchesType && matchesState) {
        item.classList.remove('hidden');
        count++;
      } else {
        item.classList.add('hidden');
      }
    });

    if (branchCountBadge) {
      branchCountBadge.textContent = `${count} Locations Displayed`;
    }
  }

  if (branchSearchInput) branchSearchInput.addEventListener('input', filterBranches);
  if (branchFilterSelect) branchFilterSelect.addEventListener('change', filterBranches);

  // Initialize initial count and display
  filterBranches();
}

/* ==========================================================================
   10. Brand Details Modal System
   ========================================================================== */
const brandModalData = {
  garments: {
    title: "Aaron Garments",
    subtitle: "Fast-Moving Youth Fashion & Modern Menswear (Retail & Wholesale)",
    image: "./assets/images/aaron_garments.png",
    branches: "15+ Retail Stores (22,000+ Sq. Ft.) across TN & AP",
    description: "Our flagship youth menswear line created specifically for what young buyers want next. Fast style turns, modern fits, and premium combed cotton fabrics designed and developed for our own retail store network.",
    highlights: [
      "Youth-Driven Menswear Tailored to Emerging Trends",
      "15+ Retail Stores (22,000+ Sq. Ft.) across Tamil Nadu & Andhra Pradesh",
      "Official GSTIN: 33CTEPA7543P2ZF (Tax Invoice & B2B)",
      "Worldwide & Pan-India Sourcing (10,000 Sq. Ft. Chennai Central DC)"
    ],
    manager: "Wholesale & Retail Desk: +91 8637476998"
  },
  clubs: {
    title: "Aaron Clubs Edition",
    subtitle: "High-Style Party Shirts, Streetwear & Designer Denims",
    image: "./assets/images/aaron_clubs.png",
    branches: "Featured in All 15+ Retail Outlets (22,000+ Sq. Ft.)",
    description: "Bold partywear and youth clubwear designed to create non-stop store visibility and walk-in buzz. Featuring dynamic prints, stretch denims, and casual club jackets.",
    highlights: [
      "High-Energy Party Shirts & Modern Clubwear",
      "Designer Stretch Denims & Streetwear Fits",
      "Non-Stop Marketing & High Footfall Momentum",
      "Direct Dispatch from 10,000 Sq. Ft. Chennai Central DC"
    ],
    manager: "Partywear & Wholesale Desk: +91 8637476998"
  },
  elite: {
    title: "Aaron Smart Classics",
    subtitle: "Smart Formals, Executive Blazers & Festive Menswear",
    image: "./assets/images/aaron_branches.png",
    branches: "Flagship Stores & Wholesale Supply",
    description: "Executive menswear crafted with fabrics sourced from premier textile hubs nationwide and globally. Precision-tailored blazers, formal trousers, and festive suits designed for modern professionals.",
    highlights: [
      "Worldwide & Pan-India Sourced Premium Fabrics",
      "Precision-Tailored Blazers & Chinos",
      "Official GSTIN: 33CTEPA7543P2ZF Billing",
      "Bulk Wholesale & Custom Store Allocations"
    ],
    manager: "Formals & Corporate Desk: +91 8637476998"
  },
  factory: {
    title: "Chennai Central DC (10,000 Sq. Ft.) & Wholesale Hub",
    subtitle: "Central Distribution Centre, Corporate HQ & Wholesale Powerhouse",
    image: "./assets/images/aaron_branches.png",
    branches: "Central Hub, Chennai, Tamil Nadu",
    description: "The logistical backbone of Aaron Garments in Chennai. Housing our 10,000 sq. ft. Central Distribution Centre (DC), corporate office, and wholesale division that powers our 15+ stores (22,000+ sq. ft.) and regional retail partners with rapid inventory turnover.",
    highlights: [
      "10,000 Sq. Ft. Central DC Housing Corporate Office & Wholesale",
      "Govt. Registered GSTIN: 33CTEPA7543P2ZF",
      "Dual Strength: 15+ Stores (22k+ Sq. Ft.) + Central DC Wholesale",
      "Worldwide & Pan-India Sourcing & Rapid Dispatch"
    ],
    manager: "Chennai DC & Wholesale Desk: +91 8637476998"
  }
};

function initBrandModals() {
  const modal = document.getElementById('brand-modal');
  const closeBtn = document.getElementById('close-brand-modal');
  const triggerBtns = document.querySelectorAll('.open-brand-modal');

  if (!modal) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-brand-key');
      const data = brandModalData[key];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-subtitle').textContent = data.subtitle;
        document.getElementById('modal-image').src = data.image;
        document.getElementById('modal-branches').textContent = data.branches;
        document.getElementById('modal-description').textContent = data.description;
        document.getElementById('modal-manager').textContent = data.manager;

        const highlightsList = document.getElementById('modal-highlights');
        highlightsList.innerHTML = '';
        data.highlights.forEach(item => {
          const li = document.createElement('li');
          li.className = 'flex items-center space-x-3 text-gray-300';
          li.innerHTML = `<i class="fas fa-check-circle text-amber-400 text-sm"></i><span>${item}</span>`;
          highlightsList.appendChild(li);
        });

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   11. Contact Form Handling & Notification Toast
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const toastModal = document.getElementById('toast-modal');
  const closeToast = document.getElementById('close-toast');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i> Transmitting Inquiry...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();

      if (toastModal) {
        toastModal.classList.remove('hidden');
        toastModal.classList.add('flex');
      } else {
        alert("Thank you! Your message has been routed to Aaron's Executive Desk (Aaron Garments Hotline: 8637476998).");
      }
    }, 1200);
  });

  if (closeToast && toastModal) {
    closeToast.addEventListener('click', () => {
      toastModal.classList.add('hidden');
      toastModal.classList.remove('flex');
    });
    toastModal.addEventListener('click', (e) => {
      if (e.target === toastModal) {
        toastModal.classList.add('hidden');
        toastModal.classList.remove('flex');
      }
    });
  }
}

/* ==========================================================================
   12. Smooth Scroll Navigation
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

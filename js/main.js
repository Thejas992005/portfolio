/**
 * ==========================================================================
 * MODERN PORTFOLIO INTERACTIVITY (Vanilla JS)
 * High-performance, accessible, dependency-free
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Dark / Light)
  initThemeToggle();

  // 2. Navigation & Scroll Spy
  initNavigation();

  // 3. Ambient Cursor Glow
  initCursorGlow();

  // 4. Hero Typewriter Effect
  initTypewriter();

  // 5. Animated Number Counters
  initNumberCounters();

  // 6. About Section Tabs
  initAboutTabs();

  // 7. Projects Filter & Case Study Modal
  initProjectsAndModal();

  // 8. Contact Form Handling & Copy Helpers
  initContactFeatures();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;
  
  if (theme === 'light') {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  } else {
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  }
}

/* --------------------------------------------------------------------------
   2. Navigation, Sticky Header & Scroll Spy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation link
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Hamburger Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Scroll to Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Ambient Cursor Glow (Desktop)
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (!cursorGlow) return;

  // Only run on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }, { passive: true });
  } else {
    cursorGlow.style.display = 'none';
  }
}

/* --------------------------------------------------------------------------
   4. Hero Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  const roles = [
    'Senior Full-Stack Engineer',
    'Cloud & Distributed Systems Architect',
    'UI/UX Craftsman & Creative Coder',
    'Open-Source Contributor'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. Animated Number Counters
   -------------------------------------------------------------------------- */
function initNumberCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = target + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    observer.observe(statsContainer);
  }
}

/* --------------------------------------------------------------------------
   6. About Section Tabs
   -------------------------------------------------------------------------- */
function initAboutTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. Projects Filter & Case Study Modal
   -------------------------------------------------------------------------- */
// Project metadata for the detailed case study modal
const projectsData = {
  project1: {
    title: 'Aurora SaaS Intelligence Platform',
    category: 'Full-Stack / Cloud',
    image: 'assets/images/project1.jpg',
    description: 'An enterprise-tier real-time SaaS analytics dashboard with high-throughput streaming metrics, cohort retention analysis, and automated revenue trend forecasting. Designed for scale and instant visual comprehension.',
    challenge: 'Existing legacy analytics suffered from 10+ second query latency across millions of data points and high cloud compute expenditures.',
    solution: 'Engineered an asynchronous pipeline using Go, Redis, and TimescaleDB with WebSockets push notifications. Reduced p99 dashboard load time to under 120ms.',
    metrics: [
      { value: '120ms', label: 'Average Query Latency' },
      { value: '78K+', label: 'Active Monthly Orgs' },
      { value: '99.99%', label: 'Uptime SLA' }
    ],
    tech: ['React 18', 'TypeScript', 'Node.js', 'TimescaleDB', 'Redis', 'Tailwind/CSS', 'Docker'],
    liveUrl: '#',
    githubUrl: '#'
  },
  project2: {
    title: 'Synapse AI Creative Workspace',
    category: 'AI / Full-Stack',
    image: 'assets/images/project2.jpg',
    description: 'A node-based generative AI platform that empowers product teams to orchestrate multi-modal LLM chains, automated image workflows, and prompt engineering pipelines in a unified visual canvas.',
    challenge: 'Managing non-deterministic AI agent workflows with multi-step validation and stream rendering without blocking client interfaces.',
    solution: 'Built a lightweight custom canvas node engine using HTML5 Canvas & WebGL with streaming server-sent events (SSE) back to Python FastAPI workers.',
    metrics: [
      { value: '3.5x', label: 'Workflow Acceleration' },
      { value: '250K+', label: 'Pipelines Run' },
      { value: '4.9/5', label: 'User Satisfaction' }
    ],
    tech: ['Next.js', 'FastAPI', 'Python', 'OpenAI API', 'LangChain', 'WebGL', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: '#'
  },
  project3: {
    title: 'PayVault Global Multi-Currency Gateway',
    category: 'FinTech / Frontend',
    image: 'assets/images/project3.svg',
    description: 'Next-generation cross-border financial dashboard supporting instantaneous multi-currency conversion, cryptographic escrow validation, and automated compliance auditing for corporate treasuries.',
    challenge: 'Ensuring zero-downtime ledger consistency during volatile currency fluctuations across 48 fiat & cryptocurrency exchange corridors.',
    solution: 'Designed an event-sourced ledger architecture with distributed locking in Redis and micro-frontends ensuring isolated failure domains.',
    metrics: [
      { value: '$14.8M', label: 'Settled Monthly Vol' },
      { value: '< 2s', label: 'Settlement Time' },
      { value: 'PCI-DSS', label: 'Certified Level 1' }
    ],
    tech: ['Vue 3', 'TypeScript', 'Golang', 'PostgreSQL', 'Kafka', 'Docker', 'Vault'],
    liveUrl: '#',
    githubUrl: '#'
  },
  project4: {
    title: 'CloudMesh Kubernetes Topology Monitor',
    category: 'Cloud / DevOps',
    image: 'assets/images/project4.svg',
    description: 'An observability and eBPF-powered service mesh monitor that visualizes distributed microservice network latency, pod health, and automated Canary deployments in real-time.',
    challenge: 'Rendering high-density live telemetry topology graphs with 500+ interconnected services without UI frame drops or CPU throttling.',
    solution: 'Implemented GPU-accelerated force-directed graph layout algorithms in WebGL paired with Prometheus metrics scraping.',
    metrics: [
      { value: '60 FPS', label: 'Rendering Rate' },
      { value: '36 Services', label: 'Live Supervised' },
      { value: '0ms', label: 'Log Parsing Lag' }
    ],
    tech: ['React', 'D3.js', 'Go', 'Kubernetes', 'eBPF', 'Prometheus', 'Envoy'],
    liveUrl: '#',
    githubUrl: '#'
  }
};

function initProjectsAndModal() {
  // Filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal logic
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalLiveBtn = document.getElementById('modalLiveBtn');
  const modalRepoBtn = document.getElementById('modalRepoBtn');

  // Open modal triggers
  const triggerButtons = document.querySelectorAll('[data-open-modal]');
  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      const data = projectsData[projectId];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.description;
      modalChallenge.textContent = data.challenge;
      modalSolution.textContent = data.solution;

      // Metrics
      modalMetrics.innerHTML = data.metrics.map(m => `
        <div class="modal-stat-card">
          <div class="val">${m.value}</div>
          <div class="lbl">${m.label}</div>
        </div>
      `).join('');

      // Tech Stack
      modalTechStack.innerHTML = data.tech.map(t => `
        <span class="tech-tag">${t}</span>
      `).join('');

      // Links
      modalLiveBtn.href = data.liveUrl;
      modalRepoBtn.href = data.githubUrl;

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling & Helpers
   -------------------------------------------------------------------------- */
function initContactFeatures() {
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  // Copy email to clipboard
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-copy') || 'thejasmu4@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied! ✓';
        showToast('Email address copied to clipboard!');
        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
        }, 2500);
      }).catch(err => {
        console.error('Clipboard copy failed: ', err);
      });
    });
  }

  // Form submit simulation
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Show loading indicator on button
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg> Sending...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        contactForm.reset();
        showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      }, 1200);
    });
  }
}

/* --------------------------------------------------------------------------
   Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

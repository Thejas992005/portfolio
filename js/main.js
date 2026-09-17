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
    'AI & Machine Learning Student',
    'Deep Learning & Neural Networks Enthusiast',
    'Computer Vision & NLP Researcher',
    'PyTorch & Generative AI Builder',
    'Open-Source & Kaggle Competitor'
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
          const target = parseFloat(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800; // ms
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              stat.textContent = (Number.isInteger(target) ? target : target.toFixed(1)) + suffix;
              clearInterval(timer);
            } else {
              stat.textContent = (Number.isInteger(target) ? Math.floor(count) : count.toFixed(1)) + suffix;
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
    title: 'NeuroVision: Edge Object Detection & Instance Segmentation',
    category: 'Computer Vision / PyTorch',
    image: 'assets/images/project1_cv.svg',
    description: 'A custom-trained deep learning vision pipeline integrating YOLOv8-Large and TensorRT quantization for high-speed multi-class object detection and instance segmentation across challenging dynamic video streams.',
    challenge: 'Achieving sub-20ms low-latency inference on embedded/edge hardware while maintaining high mean Average Precision (mAP) under severe occlusions and low-light conditions.',
    solution: 'Designed a custom mosaic augmentation training regimen in PyTorch, followed by FP16 quantization with NVIDIA TensorRT and ONNX Runtime. Deployed an interactive Streamlit and OpenCV web dashboard.',
    metrics: [
      { value: '94.2%', label: 'mAP@0.5 IoU Score' },
      { value: '45.2 FPS', label: 'Real-Time Edge Throughput' },
      { value: '18ms', label: 'Inference Latency' }
    ],
    tech: ['PyTorch', 'YOLOv8', 'OpenCV', 'TensorRT', 'ONNX', 'FastAPI', 'Streamlit'],
    liveUrl: 'https://github.com/Thejas992005',
    githubUrl: 'https://github.com/Thejas992005'
  },
  project2: {
    title: 'DocuMind AI: Multimodal Hybrid RAG & Knowledge Agent',
    category: 'NLP & LLMs / Generative AI',
    image: 'assets/images/project2_rag.svg',
    description: 'An advanced Retrieval-Augmented Generation (RAG) assistant that parses multi-format academic papers and technical documentation with hybrid sparse-dense semantic search, cross-encoder re-ranking, and citation validation.',
    challenge: 'Mitigating LLM hallucination on dense scientific equations and tables while reducing retrieval latency over multi-thousand page collections.',
    solution: 'Constructed an asynchronous chunking pipeline using BAAI/bge-large embeddings, Chroma vector store, BM25 hybrid fusion, and Cohere cross-encoder re-ranking connected to LLaMA-3-8B via vLLM.',
    metrics: [
      { value: '92.8%', label: 'Context Retrieval Precision' },
      { value: '0.98', label: 'RAGAS Faithfulness' },
      { value: '< 1.4s', label: 'End-to-End Response Time' }
    ],
    tech: ['LangChain', 'LlamaIndex', 'LLaMA-3', 'ChromaDB', 'FastAPI', 'Python', 'React'],
    liveUrl: 'https://github.com/Thejas992005',
    githubUrl: 'https://github.com/Thejas992005'
  },
  project3: {
    title: 'CardioRisk: 12-Lead ECG Neural Classifier with Explainable AI',
    category: 'Deep Learning / Biomedical AI',
    image: 'assets/images/project3_ecg.svg',
    description: 'An end-to-end deep neural network that classifies multi-lead electrocardiogram (ECG) waveforms to identify cardiac arrhythmias with visual explanation heatmaps powered by 1D Grad-CAM.',
    challenge: 'Handling severe class imbalance in physiological signals (e.g. rare ventricular ectopic beats) and providing interpretable diagnostics for clinicians.',
    solution: 'Engineered a 4-layer 1D CNN with Bidirectional LSTM and Attention mechanisms trained on 43,000+ patient records from PhysioNet/Computing in Cardiology Challenge. Implemented Grad-CAM to highlight rhythm anomalies.',
    metrics: [
      { value: '97.8%', label: 'Classification Accuracy' },
      { value: '0.96', label: 'Weighted F1-Score' },
      { value: '0.984', label: 'AUROC Multi-Class' }
    ],
    tech: ['TensorFlow 2', 'Keras', '1D-CNN + BiLSTM', 'Scikit-Learn', 'PhysioNet', 'Gradio', 'Pandas'],
    liveUrl: 'https://github.com/Thejas992005',
    githubUrl: 'https://github.com/Thejas992005'
  },
  project4: {
    title: 'NeuroStyle: Latent Diffusion & Perceptual Style Transfer',
    category: 'Generative Vision & Deep Learning',
    image: 'assets/images/project4_diffusion.svg',
    description: 'An interactive generative visual studio combining VGG19 Gram-matrix perceptual loss optimization with fine-tuned Latent Diffusion (LoRA) models for artistic neural synthesis and semantic image editing.',
    challenge: 'Balancing spatial content structure retention with high-frequency artistic texture synthesis without artifact degradation.',
    solution: 'Implemented custom multi-layer perceptual loss in PyTorch alongside low-rank adaptation (LoRA rank=8) fine-tuning on Stable Diffusion UNet layers, exposed via a fast WebGL and REST interface.',
    metrics: [
      { value: '12.4', label: 'Frechet Inception Dist (FID)' },
      { value: '1.8s', label: 'Synthesis Time / Image' },
      { value: '1024px', label: 'High-Res Output' }
    ],
    tech: ['PyTorch', 'Diffusers', 'Stable Diffusion', 'LoRA', 'ControlNet', 'FastAPI', 'Tailwind'],
    liveUrl: 'https://github.com/Thejas992005',
    githubUrl: 'https://github.com/Thejas992005'
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

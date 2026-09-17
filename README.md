# AI & Machine Learning Student Portfolio Website

A modern, high-aesthetic portfolio designed specifically for **Artificial Intelligence & Machine Learning (AIML) students and researchers**. Built with pure **HTML5, CSS3, and JavaScript** (Zero dependencies, zero-build required).

---

## 🌟 Features

- **Theme Toggle**: Seamless dark & light mode switcher with persistent state in `localStorage`.
- **Hero Section**: Dynamic AI/ML typewriter text effect, pulsing internship availability beacon, animated benchmark counters, and floating tech badges (`PyTorch`, `LLMs`, `OpenCV`).
- **About Me**: Interactive tabbed panel switching between **Education** (B.Tech AIML, Coursework), **Internships & Leadership** (Vision Lab Research, AI Club Mentor), and **Certifications** (DeepLearning.AI, TensorFlow, Hackathons).
- **Skills & Tech Stack**: Categorized skill grid with animated proficiency bars (*Deep Learning & Frameworks*, *Computer Vision & NLP*, *Languages & Math Stack*, *MLOps & Deployment*).
- **Projects Showcase**: Filterable showcase (*All Models*, *Computer Vision*, *NLP & GenAI*, *Deep Learning*) and interactive **Case Study Modal** for deep dives into dataset challenges, mathematical solutions, benchmark metrics (mAP, F1, FID, Latency), and architecture stacks.
- **Academic & Research Timeline**: Vertical journey timeline with research internship, hackathon, and student mentorship milestones.
- **Faculty & Mentor Endorsements**: Recommendation cards with star ratings and quotes from research professors, data scientists, and hackathon teammates.
- **Contact Section**: Interactive contact form tailored for internship and research inquiries, feedback toasts, and a 1-click **Copy Email** helper.
- **SEO & Performance**: 100% responsive, optimized semantic markup, OpenGraph social meta tags, and smooth GPU-accelerated micro-animations.

---

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML markup & AIML sections
├── README.md               # Customization guide & docs
├── css/
│   └── style.css           # Design tokens, themes, layout, and animations
├── js/
│   └── main.js             # Theme switcher, typewriter, filters, modal, and forms
└── assets/
    ├── resume.pdf          # Downloadable resume / CV document
    └── images/             # Visual assets
        ├── avatar.jpg               # Profile picture
        ├── project1_cv.svg          # Computer vision / YOLOv8 vector graphic
        ├── project2_rag.svg         # Multimodal RAG / LangChain vector graphic
        ├── project3_ecg.svg         # Biomedical ECG / 1D-CNN Grad-CAM graphic
        └── project4_diffusion.svg   # Latent diffusion & style transfer graphic
```

---

## 🛠️ How to Customize Your Details

### 1. Update Name, Bio & Degree
- Open `index.html`.
- Update `<title>`, `<meta name="description">`, and name/bio across `<section id="hero">` and `<section id="about">`.
- In `js/main.js`, edit the `roles` array inside `initTypewriter()` to showcase your specific machine learning interests.

### 2. Update Your Profile Picture
- Replace `assets/images/avatar.jpg` with your own photo (recommended 1:1 aspect ratio, ~600x600px).

### 3. Customize Your Projects & Models
- In `index.html`, project cards are inside `<div class="projects-grid">`.
- In `js/main.js`, update the `projectsData` object. Each key (`project1`, `project2`, etc.) contains:
  - `title`, `category`, `image`
  - `description`, `challenge`, `solution`
  - `metrics` (e.g. `94.2% mAP`, `0.96 F1-Score`, `18ms Latency`)
  - `tech` array (frameworks displayed in modal)
  - `liveUrl` and `githubUrl`

### 4. Update Resume / CV
- Place your PDF resume into `assets/resume.pdf`.

### 5. Update Contact Info & Socials
- In `index.html`, update your email address, location, and social links (GitHub, LinkedIn, Twitter/X).
- Update the `data-copy` attribute on `#copyEmailBtn`.

---

## 🚀 How to Run & Deploy

### Run Locally
Simply double-click `index.html` to open it in your browser!

Or start a local static server with Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Free 1-Minute Deployment:
1. **GitHub Pages**:
   - Push this directory to your GitHub repository (e.g. `Thejas992005/portfolio`).
   - Go to **Settings** > **Pages** > Select `main` branch > Click **Save**.
2. **Vercel / Netlify**:
   - Drag and drop the `portfolio` folder into [vercel.com/new](https://vercel.com/new) or Netlify Drop.

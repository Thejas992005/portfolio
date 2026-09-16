# Developer Portfolio Website

A modern, high-aesthetic developer portfolio built with pure **HTML5, CSS3, and JavaScript** (Zero dependencies, zero-build required).

---

## 🌟 Features

- **Theme Toggle**: Seamless dark & light mode switcher with persistent state in `localStorage`.
- **Hero Section**: Dynamic typewriter text effect, pulsing availability badge, animated metrics counters, and floating tech badges.
- **About Me**: Interactive tabbed panel switching between Experience, Education, and Certifications.
- **Skills & Tech Stack**: Categorized skill grid with animated proficiency bars and tech tags.
- **Projects Showcase**: Category filtering (*Full-Stack*, *AI*, *Cloud*) and interactive **Case Study Modal** for deep dives into problem, solution, and architecture.
- **Career Timeline**: Vertical journey timeline with milestone markers.
- **Testimonials**: Recommendation cards with star ratings and author badges.
- **Contact Section**: Interactive contact form with validation, feedback toasts, and a 1-click **Copy Email** helper.
- **SEO & Performance**: 100% responsive, optimized semantic markup, OpenGraph social meta tags, and smooth GPU-accelerated micro-animations.

---

## 📂 Project Structure

```
portfolio/
├── index.html              # Main HTML markup & sections
├── README.md               # Customization guide & docs
├── css/
│   └── style.css           # Design tokens, themes, layout, and animations
├── js/
│   └── main.js             # Theme switcher, typewriter, filters, modal, and forms
└── assets/
    ├── resume.pdf          # Downloadable resume document
    └── images/             # Visual assets
        ├── avatar.jpg      # Profile picture
        ├── project1.jpg    # Project preview 1
        ├── project2.jpg    # Project preview 2
        ├── project3.svg    # Project preview 3
        └── project4.svg    # Project preview 4
```

---

## 🛠️ How to Customize Your Details

### 1. Update Name, Bio & Titles
- Open `index.html`.
- Search for `Alex Chen` and replace it with your full name.
- Update `<title>` and `<meta name="description">` in the `<head>` tag.
- In `js/main.js`, edit the `roles` array inside `initTypewriter()` to showcase your specific specialties.

### 2. Update Your Profile Picture
- Replace `assets/images/avatar.jpg` with your own portrait (recommended 1:1 or 4:5 aspect ratio, ~600x600px).
- Or change the `src` attribute on line `<img src="assets/images/avatar.jpg" ...>` in `index.html`.

### 3. Customize Your Projects & Case Studies
- In `index.html`, project cards are inside `<div class="projects-grid">`.
- In `js/main.js`, update the `projectsData` object. Each key (`project1`, `project2`, etc.) contains:
  - `title`, `category`, `image`
  - `description`, `challenge`, `solution`
  - `metrics` (e.g. `120ms latency`, `78K+ users`)
  - `tech` array (tags displayed in modal)
  - `liveUrl` and `githubUrl`

### 4. Update Resume / CV
- Place your PDF resume into `assets/resume.pdf`.

### 5. Update Contact Info & Socials
- In `index.html`, search for `alex.chen.dev@example.com` and replace it with your real email address.
- Update the `data-copy` attribute on `#copyEmailBtn`.
- Update your GitHub, LinkedIn, and Twitter profile URLs in the social links list.

### 6. Adjust Colors & Themes
- Open `css/style.css`.
- Under `:root`, you can tweak `--accent-primary` (`#6366f1`), `--accent-secondary` (`#06b6d4`), and gradients to match your personal brand.

---

## 🚀 How to Run & Deploy

### Run Locally
Simply double-click `index.html` to open it in your browser!

Or start a local static server with Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

### Free 1-Minute Deployment Options:
1. **GitHub Pages**:
   - Push this directory to a GitHub repository.
   - Go to **Settings** > **Pages** > Select `main` branch > Click **Save**.
2. **Vercel**:
   - Drag and drop the `portfolio` folder into [vercel.com/new](https://vercel.com/new).
3. **Netlify**:
   - Drag and drop the folder into Netlify Drop.

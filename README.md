# Cap Plastic Now — Website Markup

A modern, responsive, animated website markup for **Cap Plastic Now**, advocating for an enforceable global cap on virgin plastic production.

---

## 🚀 Features & Stack

- **HTML5 & Semantic Markup**: Structured for SEO, accessibility, and clean component organization.
- **Tailwind CSS (via CDN)**: Fully customized eco-activism theme palette (`brand-dark`, `brand-card`, `brand-lime`, `brand-ocean`, `brand-coral`, etc.).
- **GSAP 3 & ScrollTrigger (via CDN)**:
  - Hero entrance staggered timeline
  - Scroll-triggered reveals for headers, problem cards, and strategy pillars
  - Animated live stat counters (`460M+`, `9%`, `16,000+`, `1.84M+`)
  - Floating ambient elements with parallax background glow
- **Interactive Components**:
  - **Live Impact Simulator / Calculator**: Drag the slider to recalculate plastic prevented, CO₂ averted, and ocean debris blocked with smooth numeric interpolation.
  - **Interactive Petition Form**: Validated form with simulated live signature counter increments and celebratory animated confirmation.
  - **FAQ Accordion**: Animated collapsible disclosures.
  - **Mobile Responsive Drawer Menu**: Animated slide-in navigation.

---

## 📁 Project Structure

```text
├── index.html              # Main webpage markup
├── package.json            # NPM scripts for local development server
├── README.md               # Documentation & guide
└── assets/
    ├── css/
    │   └── style.css       # Custom animations, glassmorphism, sliders & scrollbars
    └── js/
        └── main.js         # GSAP animations, counters, and interactive logic
```

---

## 🏃‍♂️ How to Run

### Option 1: Direct Browser Open (Zero Install)
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Live Server (VS Code)
Right-click `index.html` in VS Code and choose **"Open with Live Server"**.

### Option 3: Node / NPX
Run from PowerShell or terminal inside this folder:
```bash
npx serve .
```
Then visit `http://localhost:3000`.

// ========================
// CONFIGURATION
// ========================
const CONFIG = {
  matrix: {
    fontSize: 16,
    letters: "01",
    animationSpeed: 33,
    fadeOpacity: 0.1
  },
  animation: {
    threshold: 0.1
  },
  latin: {
    phrases: [
      "The bird of Hermes is my name",
      "Eating my wings to make me tame",
      "GOTT MIT UNS",

    ],
    // Nombre de rangées de texte qui défilent en parallèle
    rowCount: 30
  },
  subliminal: {
    // Mets ici le chemin de ton PNG, ex: "skull.png"
    imageSrc: "sins.jpg",
    minInterval: 100,
    maxInterval: 1000,
    flashDuration: 150
  }
};

// ========================
// FADE-IN ANIMATION (inchangé)
// ========================
const initFadeInAnimation = () => {
  const sections = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: CONFIG.animation.threshold }
  );

  sections.forEach(section => observer.observe(section));
};

// ========================
// SMOOTH SCROLL + EFFET SANG sur les liens nav
// ========================
const initSmoothScroll = () => {
  const navLinks = document.querySelectorAll('.navbar a');
 
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
 
      // Effet coulée de sang uniquement en thème sang
      if (document.body.classList.contains('theme-blood')) {
        triggerBloodDrip(link);
      }
 
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    });
  });
};

// Déclenche l'animation de coulée de sang sur un lien
const triggerBloodDrip = (link) => {
  // Créer dynamiquement une goutte
  const drop = document.createElement('span');
  drop.className = 'blood-drop';
  link.appendChild(drop);
  console.log("blood drip déclenché");

  // Supprimer la goutte après l'animation
  drop.addEventListener('animationend', () => drop.remove());
};

// ========================
// MATRIX ANIMATION (inchangé)
// ========================
class MatrixAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.fontSize = CONFIG.matrix.fontSize;
    this.letters = CONFIG.matrix.letters;
    this.drops = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = 300;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  }

  draw() {
    this.ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.matrix.fadeOpacity})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.letters[Math.floor(Math.random() * this.letters.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;
      this.ctx.fillText(text, x, y);

      if (y > this.canvas.height && Math.random() > 0.95) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }

  animate() {
    // Si masqué (thème sang), on attend sans dessiner
    if (this.canvas.style.display === 'none') {
      setTimeout(() => this.animate(), 500);
      return;
    }
    this.draw();
    setTimeout(() => this.animate(), CONFIG.matrix.animationSpeed);
  }
}

// ========================
// TEXTE LATIN DÉFILANT
// Fonctionne comme le matrix mais sur toute la page :
// des rangées de texte latin traversent l'écran de droite à gauche.
// Utilise un canvas pleine page en position fixed.
// ========================
class LatinAnimation {
  constructor() {
    // Créer le canvas qui couvre toute la page
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'latin-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    this.canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
      display: none;
    `;
    document.body.appendChild(this.canvas);
 
    this.ctx = this.canvas.getContext('2d');
    this.rows = [];
    this.running = false;
    this.animId = null;
 
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
 
  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initRows();
  }
 
  // Initialise les rangées de texte réparties verticalement.
  // 60% démarrent déjà dans l'écran pour être visibles immédiatement.
  initRows() {
    this.rows = [];
    const rowCount = CONFIG.latin.rowCount;
    for (let i = 0; i < rowCount; i++) {
      const phrase = CONFIG.latin.phrases[i % CONFIG.latin.phrases.length];
      const fontSize = 12 + Math.floor(Math.random() * 6);
      const text = (phrase + '   ✦   ').repeat(8);

      // Certaines lignes démarrent déjà dans l'écran (x négatif = déjà en cours)
      const startInScreen = Math.random() > 0.4;
      const x = startInScreen
        ? -Math.random() * this.canvas.width   // déjà en train de défiler
        : this.canvas.width + Math.random() * 400; // légèrement hors droite
 
      this.rows.push({
        text,
        // Espacement serré : fontSize * 1.4 donne une interligne proche du texte normal
        y: fontSize * 1.8 * i + fontSize,
        x,
        // Vitesse lisible : 1.5 à 3 px/frame (avant c'était 0.4–1.0, trop lent)
        speed: 1.5 + Math.random() * 1.5,
        fontSize,
        opacity: 0.7 + Math.random() * 0.14
      });
    }
  }
 
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 
    for (const row of this.rows) {
      this.ctx.font = `${row.fontSize}px monospace`;
      this.ctx.fillStyle = `rgba(180, 0, 0, ${row.opacity})`;
      this.ctx.fillText(row.text, row.x, row.y);
 
      row.x -= row.speed;
 
      // Quand sorti à gauche, repositionner hors droite avec nouvelle phrase
      const textWidth = this.ctx.measureText(row.text).width;
      if (row.x + textWidth < 0) {
        row.x = this.canvas.width + Math.random() * 200;
        const phrase = CONFIG.latin.phrases[Math.floor(Math.random() * CONFIG.latin.phrases.length)];
        row.text = (phrase + '   ✦   ').repeat(8);
        row.speed = 1.5 + Math.random() * 1.5;
      }
    }
  }
 
  loop() {
    if (!this.running) return;
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }
 
  start() {
    this.canvas.style.display = 'block';
    this.running = true;
    this.initRows();
    this.loop();
  }
 
  stop() {
    this.running = false;
    this.canvas.style.display = 'none';
    if (this.animId) cancelAnimationFrame(this.animId);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// ========================
// IMAGE SUBLIMINALE
// Flash rapide d'une image PNG à position aléatoire.
// Configure CONFIG.subliminal.imageSrc avec ton fichier.
// ========================
class SubliminalImage {
  constructor() {
    this.img = document.createElement('img');
    this.img.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      opacity: 0,35;
      max-width: 300px;
      max-height: 300px;
      object-fit: contain;
      filter: sepia(1) saturate(3) hue-rotate(-10deg);
      mix-blend-mode: screen;
      transition: opacity 0.05s;
    `;
    document.body.appendChild(this.img);
    this.timer = null;
    this.active = false;
  }
 
  // Définir la source de l'image
  setSrc(src) {
    this.img.src = src;
  }
 
  flash() {
    this.img.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    this.img.style.top  = Math.random() * (window.innerHeight - 200) + 'px';
 
    this.img.style.opacity = '0.35';
 
    // petit effet glitch
    this.img.style.transform = `
      scale(${0.8 + Math.random() * 0.5})
      rotate(${Math.random()*20 - 10}deg)
    `;
 
    setTimeout(() => {
      this.img.style.opacity = '0';
    }, CONFIG.subliminal.flashDuration);
  }
 
  scheduleNext() {
    const delay = CONFIG.subliminal.minInterval +
      Math.random() * (CONFIG.subliminal.maxInterval - CONFIG.subliminal.minInterval);
    this.timer = setTimeout(() => {
      if (this.active) {
        this.flash();
        this.scheduleNext();
      }
    }, delay);
  }
 
  start(src) {
    if (src) this.setSrc(src);
    this.active = true;
    this.scheduleNext();
  }
 
  stop() {
    this.active = false;
    clearTimeout(this.timer);
    this.img.style.opacity = '0';
  }
}

// ========================
// GESTIONNAIRE DE THÈME
// ========================
const initTheme = (latinAnim, subliminalImg) => {
  const STORAGE_KEY = 'portfolio-theme';
  const btn = document.getElementById('themeToggle');
  let isBlood = localStorage.getItem(STORAGE_KEY) === 'blood' || false;
  const matrixCanvas = document.getElementById('matrix');
 
  const apply = () => {
    if (isBlood) {
      document.body.classList.add('theme-blood');
      matrixCanvas.style.display = 'none';
      latinAnim.start();
      // Démarrer l'image subliminale seulement si une source est définie
      if (CONFIG.subliminal.imageSrc) {
        subliminalImg.start(CONFIG.subliminal.imageSrc);
      }
      console.log("THEME BLOOD:", isBlood);
      if (btn) btn.textContent = '💚 Mode Matrix';
    } else {
      document.body.classList.remove('theme-blood');
      matrixCanvas.style.display = '';
      latinAnim.stop();
      subliminalImg.stop();
      if (btn) btn.textContent = '🩸 Mode Sang';
    }
  };
 
  if (btn) {
    btn.addEventListener('click', () => {
      isBlood = !isBlood;
      localStorage.setItem(STORAGE_KEY, isBlood ? 'blood' : 'matrix');
      apply();
    });
  }
 
  // Appliquer l'état initial
  apply();
};

// ========================
// FOOTER YEAR (inchangé)
// ========================
const updateFooterYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

// ========================
// INITIALISATION
// ========================
const init = () => {
  initFadeInAnimation();
  initSmoothScroll();
  new MatrixAnimation('matrix');
  updateFooterYear();

  // Créer les objets pour le thème sang
  const latinAnim     = new LatinAnimation();
  const subliminalImg = new SubliminalImage();

  initTheme(latinAnim, subliminalImg);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
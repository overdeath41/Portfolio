// ========================
// CONFIGURATION GLOBALE
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
    // Phrases latines à faire défiler en thème sang
    phrases: [
      "Memento mori — souviens-toi que tu mourras",
      "Veni vidi vici — je suis venu, j'ai vu, j'ai vaincu",
      "Alea iacta est — le sort en est jeté",
      "Carpe diem — cueille le jour",
      "In vino veritas — dans le vin la vérité",
      "Per aspera ad astra — par l'effort jusqu'aux étoiles",
      "Dum spiro spero — tant que je respire, j'espère",
      "Amor vincit omnia — l'amour triomphe de tout",
      "Errare humanum est — l'erreur est humaine",
      "Cogito ergo sum — je pense donc je suis",
      "Tempus fugit — le temps fuit",
      "Sic transit gloria mundi — ainsi passe la gloire du monde",
      "Acta non verba — des actes pas des mots",
      "Audentes fortuna iuvat — la fortune favorise les audacieux",
      "Si vis pacem para bellum — si tu veux la paix prépare la guerre",
      "Fortis fortuna adiuvat — la fortune aide les courageux",
      "Omnia vincit amor — l'amour vainc tout",
      "Ars longa vita brevis — l'art est long la vie est courte"
    ],
    lineCount: 12,      // nombre de lignes simultanées
    minDuration: 18,    // durée minimale d'une traversée (secondes)
    maxDuration: 35,    // durée maximale
    minFontSize: 0.7,   // taille min (rem)
    maxFontSize: 1.1    // taille max (rem)
  },
  subliminal: {
    // URLs d'images libres de droits à tonalité sombre/classique
    // Remplace ces URLs par tes propres images si souhaité
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sleeping_gypsy.jpg/640px-Sleeping_gypsy.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/400px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/640px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
    ],
    minInterval: 4000,   // délai minimum entre apparitions (ms)
    maxInterval: 9000,   // délai maximum
    flashDuration: 120   // durée du flash subliminal (ms) — très court !
  }
};

// ========================
// GESTION DU THÈME SANG
// ========================
const ThemeManager = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  const BLOOD_CLASS  = 'theme-blood';
  let isBloodTheme   = false;

  /** Applique le thème actif sur le DOM */
  const applyTheme = () => {
    if (isBloodTheme) {
      document.body.classList.add(BLOOD_CLASS);
      document.getElementById('matrix').style.display = 'none'; // masquer matrix
      LatinOverlay.start();       // démarrer le texte latin
      SubliminalImages.start();   // démarrer les flashs subliminaux
      const btn = document.getElementById('themeToggle');
      if (btn) btn.textContent = '💚 Mode Matrix';
    } else {
      document.body.classList.remove(BLOOD_CLASS);
      document.getElementById('matrix').style.display = ''; // réafficher matrix
      LatinOverlay.stop();
      SubliminalImages.stop();
      const btn = document.getElementById('themeToggle');
      if (btn) btn.textContent = '🩸 Mode Sang';
    }
  };

  /** Bascule entre les deux thèmes et sauvegarde la préférence */
  const toggle = () => {
    isBloodTheme = !isBloodTheme;
    localStorage.setItem(STORAGE_KEY, isBloodTheme ? 'blood' : 'matrix');
    applyTheme();
  };

  /** Initialise le gestionnaire — lire préférence + brancher le bouton */
  const init = () => {
    isBloodTheme = localStorage.getItem(STORAGE_KEY) === 'blood';
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
    applyTheme();
  };

  return { init };
})();


// ========================
// OVERLAY TEXTE LATIN DÉFILANT
// ========================
const LatinOverlay = (() => {
  const overlay = document.getElementById('latin-overlay');
  let active    = false;

  const rand = (min, max) => Math.random() * (max - min) + min;

  /** Crée une ligne de texte latin animée et l'insère dans l'overlay */
  const createLine = (index) => {
    const el     = document.createElement('div');
    el.className = 'latin-line';

    // Phrase aléatoire répétée pour remplir l'écran
    const phrase = CONFIG.latin.phrases[Math.floor(Math.random() * CONFIG.latin.phrases.length)];
    el.textContent = `${phrase}  ·  ${phrase}  ·  ${phrase}`;

    // Position verticale uniformément répartie avec léger aléa
    el.style.top      = `${(index / CONFIG.latin.lineCount) * 100 + rand(-3, 3)}%`;
    el.style.fontSize = `${rand(CONFIG.latin.minFontSize, CONFIG.latin.maxFontSize)}rem`;

    // Durée et délai aléatoires pour décaler les lignes entre elles
    const duration      = rand(CONFIG.latin.minDuration, CONFIG.latin.maxDuration);
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay   = `${rand(-duration, 0)}s`; // départ en cours d'animation

    overlay.appendChild(el);
  };

  const start = () => {
    if (active) return;
    active         = true;
    overlay.innerHTML = '';
    for (let i = 0; i < CONFIG.latin.lineCount; i++) createLine(i);
  };

  const stop = () => {
    active            = false;
    overlay.innerHTML = '';
  };

  return { start, stop };
})();


// ========================
// IMAGES SUBLIMINALES
// ========================
const SubliminalImages = (() => {
  let timer      = null;
  let imgEls     = [];

  /** Précharge les images et crée les éléments DOM */
  const preload = () => {
    imgEls.forEach(el => el.remove());
    imgEls = CONFIG.subliminal.images.map(src => {
      const img     = document.createElement('img');
      img.src       = src;
      img.className = 'subliminal-image';
      img.alt       = '';
      document.body.appendChild(img);
      return img;
    });
  };

  /** Affiche une image aléatoire à une position aléatoire pendant un court instant */
  const flashRandom = () => {
    if (!imgEls.length) return;
    const img = imgEls[Math.floor(Math.random() * imgEls.length)];

    img.style.left = `${Math.random() * Math.max(window.innerWidth  - 300, 0)}px`;
    img.style.top  = `${Math.random() * Math.max(window.innerHeight - 300, 0)}px`;
    img.classList.add('visible');

    setTimeout(() => img.classList.remove('visible'), CONFIG.subliminal.flashDuration);
  };

  /** Planifie de façon récursive les flashs avec intervalle aléatoire */
  const scheduleNext = () => {
    const delay = Math.random() *
      (CONFIG.subliminal.maxInterval - CONFIG.subliminal.minInterval) +
      CONFIG.subliminal.minInterval;

    timer = setTimeout(() => {
      flashRandom();
      scheduleNext();
    }, delay);
  };

  const start = () => { preload(); scheduleNext(); };

  const stop  = () => {
    clearTimeout(timer);
    imgEls.forEach(el => { el.classList.remove('visible'); el.remove(); });
    imgEls = [];
  };

  return { start, stop };
})();


// ========================
// ANIMATIONS FADE-IN AU SCROLL
// ========================
const initFadeInAnimation = () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }),
    { threshold: CONFIG.animation.threshold }
  );
  document.querySelectorAll('.fade-in').forEach(s => observer.observe(s));
};


// ========================
// SMOOTH SCROLL + EFFET COULÉE DE SANG
// ========================
const initSmoothScroll = () => {
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Déclencher l'effet coulée de sang uniquement en thème sang
      if (document.body.classList.contains('theme-blood')) {
        link.classList.add('blood-drip');
        // Retirer la classe pour pouvoir rejouer l'animation plus tard
        link.addEventListener('animationend', () => link.classList.remove('blood-drip'), { once: true });
      }

      const targetId = link.getAttribute('href').substring(1);
      const target   = document.getElementById(targetId);
      if (target) {
        // Petit délai pour laisser l'animation démarrer avant le scroll
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          document.body.classList.contains('theme-blood') ? 100 : 0);
      }
    });
  });
};


// ========================
// ANIMATION MATRIX (canvas) — thème par défaut
// ========================
class MatrixAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx    = this.canvas.getContext('2d');
    this.drops  = [];
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = 300;
    this.columns       = Math.floor(this.canvas.width / CONFIG.matrix.fontSize);
    this.drops         = Array(this.columns).fill(1);
  }

  draw() {
    // Traîne de fondu
    this.ctx.fillStyle = `rgba(0, 0, 0, ${CONFIG.matrix.fadeOpacity})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#0f0';
    this.ctx.font      = `${CONFIG.matrix.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = CONFIG.matrix.letters[Math.floor(Math.random() * CONFIG.matrix.letters.length)];
      this.ctx.fillText(text, i * CONFIG.matrix.fontSize, this.drops[i] * CONFIG.matrix.fontSize);

      if (this.drops[i] * CONFIG.matrix.fontSize > this.canvas.height && Math.random() > 0.95) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
  }

  animate() {
    // Pause si le canvas est masqué (thème sang actif)
    if (this.canvas.style.display === 'none') {
      setTimeout(() => this.animate(), 500);
      return;
    }
    this.draw();
    setTimeout(() => this.animate(), CONFIG.matrix.animationSpeed);
  }
}


// ========================
// ANNÉE DANS LE PIED DE PAGE
// ========================
const updateFooterYear = () => {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
};


// ========================
// INITIALISATION
// ========================
const init = () => {
  initFadeInAnimation();
  initSmoothScroll();
  new MatrixAnimation('matrix');
  updateFooterYear();
  ThemeManager.init(); // après que tout le reste est prêt
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
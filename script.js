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
      "Memento mori",
      "Veni vidi vici",
      "Alea iacta est",
      "Carpe diem",
      "In vino veritas",
      "Per aspera ad astra",
      "Dum spiro spero",
      "Errare humanum est",
      "Cogito ergo sum",
      "Tempus fugit",
      "Sic transit gloria mundi",
      "Acta non verba",
      "Si vis pacem para bellum",
      "Ars longa vita brevis",
      "Amor vincit omnia"
    ],
    // Nombre de rangées de texte qui défilent en parallèle
    rowCount: 10
  },
  subliminal: {
    // Mets ici le chemin de ton PNG, ex: "skull.png"
    imageSrc: "sins.jpg",
    minInterval: 1000,
    maxInterval: 2000,
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
      const text = (phrase + '   ✦   ').repeat(8);
 
      // Certaines lignes démarrent déjà dans l'écran (x négatif = déjà en cours)
      const startInScreen = Math.random() > 0.4;
      const x = startInScreen
        ? -Math.random() * this.canvas.width   // déjà en train de défiler
        : this.canvas.width + Math.random() * 400; // légèrement hors droite
 
      this.rows.push({
        text,
        y: (this.canvas.height / rowCount) * i + (this.canvas.height / rowCount) * 0.5,
        x,
        // Vitesse lisible : 1.5 à 3 px/frame (avant c'était 0.4–1.0, trop lent)
        speed: 1.5 + Math.random() * 1.5,
        fontSize: 12 + Math.floor(Math.random() * 6),
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

// ════════════════════════════════════════════════════════
// THÈME BUREAU — SCÈNE INTERACTIVE
// Injecte le HTML du bureau dans #desk-scene et gère
// l'activation/désactivation via le bouton "Mode Bureau".
// ════════════════════════════════════════════════════════

// ── Données des panels bureau ──
const DESK_PANELS = {
  cv: {
    icon: '📄', color: '#c8703a',
    title: 'Curriculum Vitae',
    sub: 'luc.thumser — BTS SIO SISR',
    html: `
      <div class="ds-cv-info">
        <div class="ds-cv-avatar">LT</div>
        <div>
          <div class="ds-cv-name">Luc Thumser</div>
          <div class="ds-cv-role">Administrateur Systèmes &amp; Réseaux — Alternance</div>
          <div class="ds-cv-meta">
            <span class="ds-cv-badge">📍 Sarreguemines</span>
            <span class="ds-cv-badge">🎂 13/02/2005</span>
            <span class="ds-cv-badge">🚗 Permis B</span>
            <span class="ds-cv-badge">🇫🇷 FR · 🇩🇪 DE B2 · 🇬🇧 EN B2</span>
          </div>
          <a class="ds-dl-btn" href="CV_Luc_Thumser.pdf" download>⬇ Télécharger le CV (PDF)</a>
        </div>
      </div>
      <div class="ds-stag">Profil</div>
      <div class="ds-entry-body" style="margin-bottom:20px">
        <p>Étudiant en BTS SIO SISR en alternance chez Continental Automotive, spécialisé en administration réseau Cisco, virtualisation ESXi et support IT en environnement industriel international.</p>
      </div>
      <div class="ds-stag">Contact</div>
      <div class="ds-clinks">
        <a class="ds-clink" href="mailto:lucthumser04@gmail.com">✉ lucthumser04@gmail.com</a>
        <a class="ds-clink" href="https://linkedin.com/in/luc-thumser-7175b8350/" target="_blank">in LinkedIn</a>
        <a class="ds-clink" href="https://github.com/overdeath41" target="_blank">⎇ GitHub</a>
        <span class="ds-clink">📞 06 23 79 45 10</span>
      </div>`
  },
  exp: {
    icon: '💼', color: '#1a4a8b',
    title: 'Expériences professionnelles',
    sub: 'parcours terrain',
    html: `
      <div class="ds-stag">Alternance</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Administrateur Systèmes &amp; Réseaux</div>
          <div class="ds-entry-date">Août 2025 → Aujourd'hui</div>
        </div>
        <div class="ds-entry-co">🏭 Continental Automotive — Sarreguemines</div>
        <div class="ds-entry-body"><ul>
          <li>10+ switches Cisco Catalyst 9200L — rack, fibre optique, cuivre</li>
          <li>VLAN, SSH, port-security, DHCP snooping</li>
          <li>Diagnostic incidents réseau, templates Cisco, documentation</li>
        </ul></div>
      </div>
      <div class="ds-stag">Emploi étudiant</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Agent de Production Industrielle</div>
          <div class="ds-entry-date">Nov. 2023 → Août 2025</div>
        </div>
        <div class="ds-entry-co">⚙️ ZF Friedrichshafen — Sarrebruck, Allemagne</div>
        <div class="ds-entry-body"><ul>
          <li>Production et contrôle qualité de composants automobiles</li>
          <li>Documentation qualité multilingue FR/DE/EN, environnement 3×8</li>
        </ul></div>
      </div>`
  },
  projets: {
    icon: '💡', color: '#1a6b2c',
    title: 'Projets',
    sub: 'académiques & personnels',
    html: `
      <div class="ds-stag">Académiques</div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">Infrastructure réseau Cisco</div><div class="ds-entry-date">2025</div></div>
        <div class="ds-entry-body"><ul>
          <li>Packet Tracer &amp; GNS3 — VLAN, OSPF, ACL, port-security, SSH</li>
          <li>Scénarios de troubleshooting multi-sites</li>
        </ul></div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">Virtualisation VMware ESXi</div><div class="ds-entry-date">2025</div></div>
        <div class="ds-entry-body"><ul>
          <li>ESXi 8.0 — Windows Server 2025, pfSense, snapshots, migration VM</li>
        </ul></div>
      </div>
      <div class="ds-stag">Personnels</div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">Portfolio Web interactif</div><div class="ds-entry-date">2025</div></div>
        <div class="ds-entry-body"><ul>
          <li>HTML/CSS/JS — thèmes Matrix, Sang, Bureau 2.5D</li>
          <li>Canvas animations, images subliminales, localStorage</li>
        </ul></div>
      </div>`
  },
  formations: {
    icon: '🎓', color: '#6b1a7a',
    title: 'Formations',
    sub: 'parcours académique & certifications',
    html: `
      <div class="ds-stag">Formation principale</div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">BTS SIO — Option SISR</div><div class="ds-entry-date">Sept. 2025 → 2027</div></div>
        <div class="ds-entry-co">🏫 MEWO Campus Métiers — Metz (Alternance)</div>
        <div class="ds-entry-body">Administration réseau, virtualisation, sécurité, support IT professionnel.</div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">Bachelor of Science — Informatique</div><div class="ds-entry-date">2023 → 2025</div></div>
        <div class="ds-entry-co">🎓 Universität des Saarlandes — Saarbrücken</div>
        <div class="ds-entry-body">2 ans — algorithmique, architecture, programmation.</div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd"><div class="ds-entry-title">Baccalauréat Général</div><div class="ds-entry-date">2023</div></div>
        <div class="ds-entry-co">🏫 Lycée Henri Nominé — Sarreguemines</div>
        <div class="ds-entry-body">Mathématiques &amp; Physique-Chimie.</div>
      </div>
      <div class="ds-stag">Certifications visées</div>
      <div class="ds-entry-body"><ul>
        <li>Cisco Packet Tracer — obtenu</li>
        <li>CLA — C Programming (cpp institute)</li>
        <li>Python PCEP/PCAP (Python Institute)</li>
        <li>CCNA — Cisco Certified Network Associate</li>
        <li>AZ-900 — Microsoft Azure Fundamentals</li>
      </ul></div>`
  },
  contact: {
    icon: '📬', color: '#7a5a1a',
    title: 'Contact',
    sub: 'restons en contact',
    html: `
      <div class="ds-clinks">
        <a class="ds-clink" href="mailto:lucthumser04@gmail.com">✉ lucthumser04@gmail.com</a>
        <a class="ds-clink" href="https://linkedin.com/in/luc-thumser-7175b8350/" target="_blank">in LinkedIn</a>
        <a class="ds-clink" href="https://github.com/overdeath41" target="_blank">⎇ GitHub</a>
        <span class="ds-clink">📞 06 23 79 45 10</span>
      </div>
      <div class="ds-contact-grid">
        <div class="ds-field"><label>Nom</label><input type="text" placeholder="Votre nom"></div>
        <div class="ds-field"><label>Email</label><input type="email" placeholder="votre@email.com"></div>
        <div class="ds-field"><label>Message</label><textarea rows="5" placeholder="Votre message..."></textarea></div>
        <button class="ds-submit" onclick="deskSubmitContact()">Envoyer le message</button>
      </div>`
  },
  computer: {
    icon: '💻', color: '#4ade80',
    title: 'Compétences IT',
    sub: 'stack technique — luc.thumser',
    html: `
      <div class="ds-tabs">
        <div class="ds-tab active" onclick="deskSwitchTab(this,'res')">Réseaux</div>
        <div class="ds-tab" onclick="deskSwitchTab(this,'sys')">Systèmes</div>
        <div class="ds-tab" onclick="deskSwitchTab(this,'dev')">Dev &amp; Scripts</div>
        <div class="ds-tab" onclick="deskSwitchTab(this,'tools')">Outils</div>
      </div>
      <div class="ds-tab-content active" id="ds-tab-res">
        <div class="ds-skills-grid">
          <div class="ds-skill"><div class="ds-skill-name">Cisco Catalyst / IOS</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:72%"></div></div><div class="ds-skill-lv">Intermédiaire — terrain réel</div></div>
          <div class="ds-skill"><div class="ds-skill-name">VLAN / Trunking / STP</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:70%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">OSPF / Routage statique</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:55%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">ACL / Port-security</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:60%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">DHCP / DNS</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:65%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">pfSense / Firewall</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:50%"></div></div><div class="ds-skill-lv">Débutant avancé</div></div>
        </div>
      </div>
      <div class="ds-tab-content" id="ds-tab-sys">
        <div class="ds-skills-grid">
          <div class="ds-skill"><div class="ds-skill-name">VMware ESXi 8.0</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:68%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Windows Server 2025</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:60%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Active Directory</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:55%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Linux (Debian/Ubuntu)</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:50%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Snapshots / Migration VM</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:65%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Support / Troubleshooting</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:70%"></div></div><div class="ds-skill-lv">Intermédiaire (terrain)</div></div>
        </div>
      </div>
      <div class="ds-tab-content" id="ds-tab-dev">
        <div class="ds-skills-grid">
          <div class="ds-skill"><div class="ds-skill-name">Python</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:55%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">PowerShell</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:50%"></div></div><div class="ds-skill-lv">Intermédiaire</div></div>
          <div class="ds-skill"><div class="ds-skill-name">HTML / CSS / JS</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:45%"></div></div><div class="ds-skill-lv">Débutant avancé</div></div>
          <div class="ds-skill"><div class="ds-skill-name">C (bases)</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:35%"></div></div><div class="ds-skill-lv">Débutant</div></div>
        </div>
      </div>
      <div class="ds-tab-content" id="ds-tab-tools">
        <div class="ds-skills-grid">
          <div class="ds-skill"><div class="ds-skill-name">Packet Tracer / GNS3</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:75%"></div></div><div class="ds-skill-lv">Avancé</div></div>
          <div class="ds-skill"><div class="ds-skill-name">CrowdStrike Falcon</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:40%"></div></div><div class="ds-skill-lv">Notions (veille)</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Azure (AZ-900)</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:35%"></div></div><div class="ds-skill-lv">En cours</div></div>
          <div class="ds-skill"><div class="ds-skill-name">Git / GitHub</div><div class="ds-skill-bar"><div class="ds-skill-fill" style="width:45%"></div></div><div class="ds-skill-lv">Débutant avancé</div></div>
        </div>
      </div>`
  }
};

// ── HTML de la scène du bureau ──
const DESK_SCENE_HTML = `
  <button id="desk-back-btn" onclick="DeskTheme.close()">← Retour au portfolio</button>

  <div class="ds-wall-shelf">
    <div class="ds-shelf-board">
      <div class="ds-bracket l"></div>
      <div class="ds-bracket r"></div>
    </div>
    <div class="ds-folders-row">
      <div class="ds-folder" data-did="cv" onclick="deskOpenPanel('cv')">
        <div class="ds-tooltip">CV</div>
        <div class="ds-folder-body"><span class="ds-folder-label">CV</span></div>
      </div>
      <div class="ds-folder" data-did="exp" onclick="deskOpenPanel('exp')">
        <div class="ds-tooltip">Expériences</div>
        <div class="ds-folder-body"><span class="ds-folder-label">Expériences</span></div>
      </div>
      <div class="ds-folder" data-did="projets" onclick="deskOpenPanel('projets')">
        <div class="ds-tooltip">Projets</div>
        <div class="ds-folder-body"><span class="ds-folder-label">Projets</span></div>
      </div>
      <div class="ds-folder" data-did="formations" onclick="deskOpenPanel('formations')">
        <div class="ds-tooltip">Formations</div>
        <div class="ds-folder-body"><span class="ds-folder-label">Formations</span></div>
      </div>
      <div class="ds-folder" data-did="contact" onclick="deskOpenPanel('contact')">
        <div class="ds-tooltip">Contact</div>
        <div class="ds-folder-body"><span class="ds-folder-label">Contact</span></div>
      </div>
    </div>
  </div>

  <div class="ds-desk">
    <div class="ds-desk-top">
      <div class="ds-desk-surface">
        <div class="ds-lamp">
          <div class="ds-lamp-arm1">
            <div class="ds-lamp-arm2"><div class="ds-lamp-head"></div></div>
          </div>
          <div class="ds-lamp-base"></div>
        </div>
        <div class="ds-monitor-group" onclick="deskOpenPanel('computer')">
          <div class="ds-tooltip">Compétences IT</div>
          <div class="ds-monitor-bezel">
            <div class="ds-monitor-screen">
              <div class="ds-screen-dots">
                <div class="ds-dot r"></div><div class="ds-dot y"></div><div class="ds-dot g"></div>
              </div>
              <div class="ds-terminal">
                <div class="ds-tline dim">$ whoami</div>
                <div class="ds-tline acc">luc.thumser</div>
                <div class="ds-tline dim">$ cat skills.txt</div>
                <div class="ds-tline">→ Cisco CCNA / Réseaux</div>
                <div class="ds-tline">→ VMware ESXi 8.0</div>
                <div class="ds-tline">→ Windows Server / AD <span class="ds-cursor"></span></div>
              </div>
            </div>
          </div>
          <div class="ds-stand-neck"></div>
          <div class="ds-stand-base"></div>
        </div>
        <div class="ds-coffee">
          <div class="ds-cup-body"><div class="ds-cup-handle"></div></div>
          <div class="ds-cup-saucer"></div>
        </div>
        <div class="ds-mouse"></div>
        <div class="ds-keyboard">
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
          <div class="ds-key"></div><div class="ds-key w2"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div><div class="ds-key w2"></div>
          <div class="ds-key w2"></div><div class="ds-key"></div><div class="ds-key sp"></div>
          <div class="ds-key"></div><div class="ds-key"></div><div class="ds-key"></div>
        </div>
      </div>
    </div>
    <div class="ds-desk-front"></div>
    <div class="ds-desk-legs">
      <div class="ds-desk-leg"></div>
      <div class="ds-desk-leg"></div>
    </div>
  </div>

  <div class="ds-chair">
    <div class="ds-chair-back"></div>
    <div class="ds-chair-seat"></div>
    <div class="ds-chair-pole"></div>
    <div class="ds-chair-base">
      <div class="ds-chair-spoke"></div><div class="ds-chair-spoke"></div>
      <div class="ds-chair-spoke"></div><div class="ds-chair-spoke"></div>
    </div>
  </div>

  <div class="ds-floor"></div>
  <div class="ds-hint">↑ Clique sur les dossiers ou l'écran pour explorer</div>

  <!-- Panel overlay des infos bureau -->
  <div id="ds-panel-overlay" onclick="if(event.target===this)deskClosePanel()">
    <div class="ds-panel">
      <div class="ds-panel-header">
        <div class="ds-panel-icon" id="ds-panel-icon"></div>
        <div>
          <div class="ds-panel-title" id="ds-panel-title"></div>
          <div class="ds-panel-sub"   id="ds-panel-sub"></div>
        </div>
        <button class="ds-panel-close" onclick="deskClosePanel()">✕</button>
      </div>
      <div class="ds-panel-body" id="ds-panel-body"></div>
    </div>
  </div>
`;

// ── Fonctions globales appelées depuis le HTML injecté ──

function deskOpenPanel(id) {
  const d = DESK_PANELS[id];
  if (!d) return;
  const overlay = document.getElementById('ds-panel-overlay');
  document.getElementById('ds-panel-icon').textContent  = d.icon;
  document.getElementById('ds-panel-icon').style.background = d.color + '22';
  document.getElementById('ds-panel-title').textContent = d.title;
  document.getElementById('ds-panel-sub').textContent   = d.sub;
  document.getElementById('ds-panel-body').innerHTML    = d.html;
  overlay.classList.add('active');
}

function deskClosePanel() {
  const overlay = document.getElementById('ds-panel-overlay');
  if (overlay) overlay.classList.remove('active');
}

function deskSwitchTab(el, id) {
  el.closest('.ds-panel-body').querySelectorAll('.ds-tab').forEach(t => t.classList.remove('active'));
  el.closest('.ds-panel-body').querySelectorAll('.ds-tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const c = document.getElementById('ds-tab-' + id);
  if (c) c.classList.add('active');
}

function deskSubmitContact() {
  const btn = document.querySelector('.ds-submit');
  if (!btn) return;
  btn.textContent = '✓ Message envoyé !';
  btn.style.background = '#1a6b2c';
  setTimeout(() => { btn.textContent = 'Envoyer le message'; btn.style.background = ''; }, 3000);
}

// ── Gestionnaire du thème bureau ──
const DeskTheme = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  let injected = false;

  const inject = () => {
    if (injected) return;
    const scene = document.getElementById('desk-scene');
    if (scene) scene.innerHTML = DESK_SCENE_HTML;
    injected = true;
  };

  const open = () => {
    inject();
    document.body.classList.add('theme-desk');
    // Suspendre les effets des autres thèmes visuellement (matrix/latin continuent en mémoire mais sont cachés sous l'overlay)
    localStorage.setItem(STORAGE_KEY, 'desk');
    const btn = document.getElementById('deskToggle');
    if (btn) btn.textContent = '✕ Fermer Bureau';
    // Echap pour fermer
    document.addEventListener('keydown', _escClose);
  };

  const close = () => {
    document.body.classList.remove('theme-desk');
    deskClosePanel();
    // Restaurer le thème précédent (matrix ou blood) — on lit ce qui était avant
    // Si rien de stocké, on remet matrix par défaut
    const prev = localStorage.getItem('portfolio-prev-theme') || 'matrix';
    localStorage.setItem(STORAGE_KEY, prev);
    const btn = document.getElementById('deskToggle');
    if (btn) btn.textContent = '🖥️ Mode Bureau';
    document.removeEventListener('keydown', _escClose);
  };

  const toggle = () => {
    if (document.body.classList.contains('theme-desk')) {
      close();
    } else {
      // Sauvegarder le thème actuel avant d'ouvrir le bureau
      const cur = localStorage.getItem(STORAGE_KEY);
      if (cur !== 'desk') localStorage.setItem('portfolio-prev-theme', cur || 'matrix');
      open();
    }
  };

  const _escClose = (e) => { if (e.key === 'Escape') { deskClosePanel() || close(); } };

  const init = () => {
    const btn = document.getElementById('deskToggle');
    if (btn) btn.addEventListener('click', toggle);
    // Si la page se charge avec le thème bureau sauvegardé, l'activer
    if (localStorage.getItem(STORAGE_KEY) === 'desk') open();
  };

  return { init, open, close, toggle };
})();

// Étendre l'initialisation existante
const _origInit = init;
// On ré-exécute DeskTheme.init() après le reste
document.addEventListener('DOMContentLoaded', () => {
  DeskTheme.init();
});

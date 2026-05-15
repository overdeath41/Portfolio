// ========================
// DONNÉES DES PANELS
// ========================
const PANELS = {
  cv: {
    icon: '📄',
    color: '#c8703a',
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
    icon: '💼',
    color: '#1a4a8b',
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
        <div class="ds-entry-body">
          <ul>
            <li>10+ switches Cisco Catalyst 9200L — rack, fibre optique, cuivre</li>
            <li>VLAN, SSH, port-security, DHCP snooping</li>
            <li>Diagnostic incidents réseau, templates Cisco, documentation</li>
          </ul>
        </div>
      </div>
      <div class="ds-stag">Emploi étudiant</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Agent de Production Industrielle</div>
          <div class="ds-entry-date">Nov. 2023 → Août 2025</div>
        </div>
        <div class="ds-entry-co">⚙️ ZF Friedrichshafen — Sarrebruck, Allemagne</div>
        <div class="ds-entry-body">
          <ul>
            <li>Production et contrôle qualité de composants automobiles</li>
            <li>Documentation qualité multilingue FR/DE/EN, environnement 3×8</li>
          </ul>
        </div>
      </div>`
  },

  projets: {
    icon: '💡',
    color: '#1a6b2c',
    title: 'Projets',
    sub: 'académiques & personnels',
    html: `
      <div class="ds-stag">Académiques</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Infrastructure réseau Cisco</div>
          <div class="ds-entry-date">2025</div>
        </div>
        <div class="ds-entry-body">
          <ul>
            <li>Packet Tracer &amp; GNS3 — VLAN, OSPF, ACL, port-security, SSH</li>
            <li>Scénarios de troubleshooting multi-sites</li>
          </ul>
        </div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Virtualisation VMware ESXi</div>
          <div class="ds-entry-date">2025</div>
        </div>
        <div class="ds-entry-body">
          <ul>
            <li>ESXi 8.0 — Windows Server 2025, pfSense, snapshots, migration VM</li>
          </ul>
        </div>
      </div>
      <div class="ds-stag">Personnels</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Portfolio Web interactif</div>
          <div class="ds-entry-date">2025</div>
        </div>
        <div class="ds-entry-body">
          <ul>
            <li>HTML/CSS/JS — scène bureau 2.5D interactive</li>
            <li>Panels dynamiques, animations CSS</li>
          </ul>
        </div>
      </div>`
  },

  formations: {
    icon: '🎓',
    color: '#6b1a7a',
    title: 'Formations',
    sub: 'parcours académique & certifications',
    html: `
      <div class="ds-stag">Formation principale</div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">BTS SIO — Option SISR</div>
          <div class="ds-entry-date">Sept. 2025 → 2027</div>
        </div>
        <div class="ds-entry-co">🏫 MEWO Campus Métiers — Metz (Alternance)</div>
        <div class="ds-entry-body">Administration réseau, virtualisation, sécurité, support IT professionnel.</div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Bachelor of Science — Informatique</div>
          <div class="ds-entry-date">2023 → 2025</div>
        </div>
        <div class="ds-entry-co">🎓 Universität des Saarlandes — Saarbrücken</div>
        <div class="ds-entry-body">2 ans — algorithmique, architecture, programmation.</div>
      </div>
      <div class="ds-entry">
        <div class="ds-entry-hd">
          <div class="ds-entry-title">Baccalauréat Général</div>
          <div class="ds-entry-date">2023</div>
        </div>
        <div class="ds-entry-co">🏫 Lycée Henri Nominé — Sarreguemines</div>
        <div class="ds-entry-body">Mathématiques &amp; Physique-Chimie.</div>
      </div>
      <div class="ds-stag">Certifications visées</div>
      <div class="ds-entry-body">
        <ul>
          <li>Cisco Packet Tracer — obtenu</li>
          <li>CLA — C Programming (cpp institute)</li>
          <li>Python PCEP/PCAP (Python Institute)</li>
          <li>CCNA — Cisco Certified Network Associate</li>
          <li>AZ-900 — Microsoft Azure Fundamentals</li>
        </ul>
      </div>`
  },

  contact: {
    icon: '📬',
    color: '#7a5a1a',
    title: 'Contact',
    sub: 'restons en contact',
    html: `
      <div class="ds-clinks">
        <a class="ds-clink" href="mailto:lucthumser04@gmail.com">✉ lucthumser04@gmail.com</a>
        <a class="ds-clink" href="https://linkedin.com/in/luc-thumser-7175b8350/" target="_blank">in LinkedIn</a>
        <a class="ds-clink" href="https://github.com/overdeath41" target="_blank">⎇ GitHub</a>
        <span class="ds-clink">📞 06 23 79 45 10</span>
      </div>
      <form action="https://formsubmit.co/lucthumser04@gmail.com" method="POST" class="ds-contact-grid">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_subject" value="Message depuis le portfolio">
        <div class="ds-field">
          <label for="c-nom">Nom</label>
          <input type="text" id="c-nom" name="nom" placeholder="Votre nom" required>
        </div>
        <div class="ds-field">
          <label for="c-email">Email</label>
          <input type="email" id="c-email" name="email" placeholder="votre@email.com" required>
        </div>
        <div class="ds-field">
          <label for="c-msg">Message</label>
          <textarea id="c-msg" name="message" rows="5" placeholder="Votre message..." required></textarea>
        </div>
        <button type="submit" class="ds-submit">Envoyer le message</button>
      </form>`
  },

  computer: {
    icon: '💻',
    color: '#4ade80',
    title: 'Compétences IT',
    sub: 'stack technique — luc.thumser',
    html: `
      <div class="ds-tabs">
        <div class="ds-tab active" onclick="window.switchTab(this,'res')">Réseaux</div>
        <div class="ds-tab" onclick="window.switchTab(this,'sys')">Systèmes</div>
        <div class="ds-tab" onclick="window.switchTab(this,'dev')">Dev &amp; Scripts</div>
        <div class="ds-tab" onclick="window.switchTab(this,'tools')">Outils</div>
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

// ========================
// FONCTIONS D'INTERACTION
// Exposées sur window pour être accessibles
// depuis les attributs onclick dans le HTML
// ========================

window.openPanel = function(id) {
  const d = PANELS[id];
  if (!d) return;

  document.getElementById('ds-panel-icon').textContent = d.icon;
  document.getElementById('ds-panel-icon').style.background = d.color + '22';
  document.getElementById('ds-panel-title').textContent = d.title;
  document.getElementById('ds-panel-sub').textContent = d.sub;
  document.getElementById('ds-panel-body').innerHTML = d.html;
  document.getElementById('ds-panel-overlay').classList.add('active');
};

window.closePanel = function() {
  document.getElementById('ds-panel-overlay').classList.remove('active');
};

window.switchTab = function(el, id) {
  const body = el.closest('.ds-panel-body');
  body.querySelectorAll('.ds-tab').forEach(t => t.classList.remove('active'));
  body.querySelectorAll('.ds-tab-content').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = document.getElementById('ds-tab-' + id);
  if (content) content.classList.add('active');
};

import { useState, useEffect } from "react";

/* ─── Photo embarquée (base64) ─── */
const PHOTO = "data:image/jpeg;base64,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";

/* ─── CSS global ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #FAFAF8;
    --orange: #F97316;
    --orange-light: #FFF7F0;
    --orange-mid: #FED7AA;
    --ink: #1a1a1a;
    --muted: #999;
    --border: #EAEAE6;
    --surface: #ffffff;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }

  ::selection { background: var(--orange-mid); }
`;

/* ─── Données ─── */
const NAV_LINKS = [
  { label: "Profil",      href: "profil" },
  { label: "Expérience",  href: "experience" },
  { label: "Formation",   href: "formation" },
  { label: "Compétences", href: "competences" },
  { label: "Outils",      href: "outils" },
];

const STATS = [
  { value: "7",    label: "ans d'expérience" },
  { value: "4+",   label: "marques simultanées" },
  { value: "±30%", label: "contribution CA" },
  { value: "3",    label: "sites en autonomie" },
];

const MISSIONS_HIGHLIGHT = [
  "Élaboration et pilotage de la stratégie de communication multimarques",
  "Collaboration directe avec la direction et les responsables d'activité",
  "Définition des positionnements, messages, tons et univers visuels par entité",
  "Reporting mensuel et analyse des performances (engagement, trafic, campagnes)",
  "Contribution mesurée au chiffre d'affaire via les actions marketing (±30%)",
];

const MISSIONS_STANDARD = [
  "Création et supervision des contenus photo, vidéo, print et digitaux",
  "Gestion de la présence digitale : réseaux sociaux, sites web, newsletters",
  "Coordination avec les équipes terrain, digital et objectifs commerciaux",
  "Mise en place d'automatisations no-code et outils IA appliqués à la communication",
  "Gestion autonome du poste, sans relais interne formé",
];

const FORMATIONS = [
  { year: "2020", diploma: "Master Webmarketing et Social Media", school: "Créalise – La Réunion",       tag: "Alternance" },
  { year: "2018", diploma: "Licence Communication",               school: "Université de La Réunion",    tag: null },
  { year: "2017", diploma: "DUT Gestion des entreprises",         school: "IUT de La Réunion",           tag: "Alternance" },
];

const COMPETENCES = [
  { category: "Stratégie & Groupe",   items: [{ label: "Communication multimarques", h: true }, { label: "Identité de marque", h: true }, { label: "Storytelling", h: false }, { label: "Positionnement", h: false }] },
  { category: "Création",             items: [{ label: "Photo & vidéo", h: false }, { label: "Montage", h: false }, { label: "Visuels print & digitaux", h: false }, { label: "PAO", h: false }] },
  { category: "Digital",              items: [{ label: "Réseaux sociaux", h: false }, { label: "Newsletters", h: false }, { label: "WordPress / WooCommerce", h: false }, { label: "Veille médias", h: false }] },
  { category: "Pilotage & Analyse",   items: [{ label: "Reporting & KPIs", h: true }, { label: "Gestion de projets", h: true }, { label: "Suivi budgétaire", h: false }, { label: "Amélioration continue", h: false }] },
  { category: "IA & Automatisation",  items: [{ label: "ChatGPT", h: false }, { label: "No-code (Zapier, Glide)", h: false }, { label: "Optimisation contenus IA", h: false }] },
];

const OUTILS = [
  { category: "Stratégie & Pilotage", tools: ["Trello", "Notion", "Slack", "Google Workspace"] },
  { category: "Création & Contenu",   tools: ["Canva", "Lightroom", "CapCut"] },
  { category: "Numérique & Web",      tools: ["WooCommerce", "Shopify", "Meta Ads", "Google Ads", "Bitly"] },
  { category: "IA & Automations",     tools: ["Claude Chat", "Claude Cowork", "Claude Code", "ChatGPT", "Zapier", "Glide"] },
  { category: "CRM & Diffusion",      tools: ["WhatsApp Business", "Brevo", "Sellsy"] },
];

const SITES = ["dimexoi.fr", "app.dimexoi.fr", "raumplus.re"];

/* ─── Sous-composants ─── */

function SectionLabel({ number, title }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--orange)", fontWeight: 500, letterSpacing: "0.08em" }}>
          // {number}
        </span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", lineHeight: 1.1 }}>
        {title}
      </h2>
    </div>
  );
}

function ContactRow({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--orange-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontSize: 13.5, color: "#555", fontWeight: 400, wordBreak: "break-all" }}>{text}</span>
    </div>
  );
}

function MissionRow({ text, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 10px", borderRadius: 9, background: hovered ? "#F8F8F6" : "transparent", transition: "background 0.15s", cursor: "default" }}
    >
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: highlight ? "var(--orange)" : "var(--border)", marginTop: 7, flexShrink: 0 }} />
      <span style={{ fontSize: 14, color: highlight ? "var(--ink)" : "#666", fontWeight: highlight ? 500 : 300, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

function FormationCard({ year, diploma, school, tag }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ flex: "1 1 200px", background: "var(--surface)", border: `1px solid ${hovered ? "var(--orange-mid)" : "var(--border)"}`, borderRadius: 16, padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start", boxShadow: hovered ? "0 4px 20px rgba(249,115,22,0.08)" : "none", transition: "all 0.2s" }}
    >
      <span style={{ fontSize: 26, fontWeight: 800, color: "var(--orange)", opacity: 0.22, lineHeight: 1, minWidth: 52, letterSpacing: "-0.03em" }}>{year}</span>
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)", marginBottom: 4, lineHeight: 1.35 }}>{diploma}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: tag ? 10 : 0 }}>{school}</div>
        {tag && (
          <span style={{ fontStyle: "italic", color: "var(--orange)", border: "1px solid var(--orange-mid)", padding: "2px 8px", borderRadius: 5, fontSize: 11.5 }}>{tag}</span>
        )}
      </div>
    </div>
  );
}

function Chip({ label, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", padding: "5px 13px", borderRadius: 100, fontSize: 12.5, fontWeight: highlight ? 600 : 400, background: highlight ? "var(--orange-light)" : "var(--surface)", border: `1.5px solid ${hovered || highlight ? "var(--orange-mid)" : "var(--border)"}`, color: hovered ? "var(--ink)" : highlight ? "#c2410c" : "#666", transform: hovered ? "translateY(-1px)" : "none", transition: "all 0.15s", cursor: "default" }}
    >
      {label}
    </span>
  );
}

function ToolChip({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", padding: "5px 13px", borderRadius: 9, fontSize: 12.5, fontWeight: 500, background: hovered ? "var(--ink)" : "var(--surface)", border: `1px solid ${hovered ? "var(--ink)" : "var(--border)"}`, color: hovered ? "white" : "var(--ink)", transform: hovered ? "translateY(-1px)" : "none", transition: "all 0.15s", cursor: "default" }}
    >
      {label}
    </span>
  );
}

function SiteChip({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-block", padding: "5px 16px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, border: "1.5px solid var(--orange-mid)", color: hovered ? "white" : "var(--orange)", background: hovered ? "var(--orange)" : "transparent", transform: hovered ? "translateY(-1px)" : "none", transition: "all 0.18s", cursor: "default" }}
    >
      {label}
    </span>
  );
}

/* ─── Composant principal ─── */
export default function App() {
  const [activeSection, setActiveSection] = useState("profil");
  const [scrolled,      setScrolled]      = useState(false);
  const [visible,       setVisible]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{globalStyles}</style>
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hero-grid { flex-direction: column !important; }
          .stats-bar { flex-direction: column !important; }
          .comp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)", minHeight: "100vh" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", background: "rgba(250,250,248,0.96)", borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none", transition: "all 0.25s" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>
              Laurence <span style={{ color: "var(--orange)" }}>Payet</span>
            </span>
            <div className="nav-links" style={{ display: "flex", gap: 4 }}>
              {NAV_LINKS.map(({ label, href }) => (
                <button key={href} onClick={() => scrollTo(href)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: activeSection === href ? 700 : 400, color: activeSection === href ? "var(--orange)" : "#777", padding: "5px 10px", borderRadius: 8, transition: "color 0.15s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <main style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px 80px" }}>

          {/* ── HERO + PROFIL ── */}
          <section id="profil" style={{ paddingTop: 52, paddingBottom: 56 }}>

            {/* Hero */}
            <div className="hero-grid" style={{ display: "flex", gap: 40, alignItems: "flex-start", marginBottom: 44, flexWrap: "wrap" }}>

              {/* Gauche */}
              <div style={{ flex: "1 1 300px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 20, flexWrap: "wrap" }}>
                  <div style={{ width: 110, height: 110, borderRadius: "50%", border: "3px solid var(--orange-mid)", overflow: "hidden", flexShrink: 0, background: "var(--orange-light)" }}>
                    <img src={PHOTO} alt="Laurence Payet" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <h1 style={{ fontSize: "clamp(40px, 7vw, 60px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: 8 }}>
                      Laurence<br /><span style={{ color: "var(--orange)" }}>Payet</span>
                    </h1>
                  </div>
                </div>

                <div style={{ fontSize: 15, fontWeight: 500, color: "#444", marginBottom: 14, lineHeight: 1.4 }}>
                  Responsable Communication & Marketing Groupe
                </div>

                <div style={{ marginBottom: 16 }}>
                  <span style={{ display: "inline-block", background: "var(--orange)", color: "white", borderRadius: 100, padding: "4px 14px", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.01em" }}>
                    Senior · 7 ans d'expérience
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {["Multimarques", "Stratégie & Pilotage", "Contenus & Digital", "Autonomie complète"].map((p) => (
                    <span key={p} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 100, padding: "3px 11px", fontSize: 12, color: "#666", fontWeight: 400 }}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Droite — Contact */}
              <div style={{ flex: "0 1 220px", display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
                <ContactRow icon="✉️" text="p.laurence140297@gmail.com" />
                <ContactRow icon="📞" text="0692 43 01 06" />
                <ContactRow icon="📍" text="Piton St-Leu, La Réunion" />
              </div>
            </div>

            {/* Eyebrow */}
            <SectionLabel number="01" title="Profil" />

            {/* Texte profil */}
            <p style={{ borderLeft: "3px solid var(--orange)", paddingLeft: 22, fontWeight: 300, fontSize: 15, lineHeight: 1.9, color: "#333", marginBottom: 36, maxWidth: 660 }}>
              Responsable communication & marketing senior, spécialisée dans la gestion de la{" "}
              <strong style={{ fontWeight: 700 }}>communication multimarques au sein de groupes</strong>. Pilotage{" "}
              <strong style={{ fontWeight: 700 }}>stratégique et opérationnel</strong> de l'ensemble du périmètre : image de marque, contenus, digital, reporting et coordination terrain. Habituée aux{" "}
              <strong style={{ fontWeight: 700 }}>environnements exigeants</strong>, capable d'assurer une gestion complète du poste avec rigueur et créativité.
            </p>

            {/* Stats */}
            <div className="stats-bar" style={{ display: "flex", flexWrap: "wrap", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, overflow: "hidden" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ flex: "1 1 110px", padding: "22px 18px", borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none", textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "var(--orange)", lineHeight: 1, marginBottom: 6, letterSpacing: "-0.03em" }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10.5, color: "var(--muted)", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPÉRIENCE ── */}
          <section id="experience" style={{ paddingBottom: 56 }}>
            <SectionLabel number="02" title="Expérience" />

            <div style={{ background: "var(--surface)", borderRadius: 20, boxShadow: "0 2px 28px rgba(0,0,0,0.05)", padding: "28px 32px", border: "1px solid var(--border)" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", lineHeight: 1.2, letterSpacing: "-0.03em", flex: "1 1 220px" }}>
                  Responsable Marketing & Communication Groupe
                </h3>
                <span style={{ background: "var(--orange-light)", color: "var(--orange)", border: "1px solid var(--orange-mid)", borderRadius: 100, padding: "4px 13px", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap" }}>
                  7 ans · 2018 – Aujourd'hui
                </span>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--orange)", marginBottom: 3 }}>DIMEXOI / Groupe ALDAM</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "var(--muted)" }}>
                  DIMEXOI · Bois d'Orient · Cœur d'Acier · CHR Discount OI · + interventions ponctuelles
                </div>
              </div>

              <div style={{ background: "#F8F8F6", borderLeft: "3px solid var(--orange-mid)", borderRadius: "0 10px 10px 0", padding: "12px 16px", marginBottom: 22, fontSize: 13.5, color: "#444", lineHeight: 1.7, fontWeight: 300 }}>
                <strong style={{ fontWeight: 700 }}>Périmètre :</strong> communication multimarques pour 4 enseignes principales — mobilier, literie, cuisines, discount — avec interventions ponctuelles sur 2 marques complémentaires. Gestion complète sans équipe dédiée.
              </div>

              <div>
                {MISSIONS_HIGHLIGHT.map((m, i) => <MissionRow key={i} text={m} highlight={true} />)}
                <div style={{ height: 4 }} />
                {MISSIONS_STANDARD.map((m, i) => <MissionRow key={i} text={m} highlight={false} />)}
              </div>
            </div>
          </section>

          {/* ── FORMATION ── */}
          <section id="formation" style={{ paddingBottom: 56 }}>
            <SectionLabel number="03" title="Formation" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {FORMATIONS.map((f) => <FormationCard key={f.year} {...f} />)}
            </div>
          </section>

          {/* ── COMPÉTENCES ── */}
          <section id="competences" style={{ paddingBottom: 56 }}>
            <SectionLabel number="04" title="Compétences" />
            <div className="comp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px 36px" }}>
              {COMPETENCES.map((cat) => (
                <div key={cat.category} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 14, alignItems: "start" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.03em", paddingTop: 5, lineHeight: 1.4 }}>
                    {cat.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {cat.items.map((item) => <Chip key={item.label} label={item.label} highlight={item.h} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── OUTILS ── */}
          <section id="outils" style={{ paddingBottom: 64 }}>
            <SectionLabel number="05" title="Outils" />

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {OUTILS.map((cat) => (
                <div key={cat.category} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 14, alignItems: "start" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8C8C0", textTransform: "uppercase", letterSpacing: "0.14em", marginTop: 5, lineHeight: 1.4 }}>
                    {cat.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {cat.tools.map((t) => <ToolChip key={t} label={t} />)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--border)", marginTop: 28, paddingTop: 24, display: "grid", gridTemplateColumns: "150px 1fr", gap: 14, alignItems: "center" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C8C8C0", textTransform: "uppercase", letterSpacing: "0.14em", lineHeight: 1.4 }}>
                Sites web gérés
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {SITES.map((s) => <SiteChip key={s} label={s} />)}
              </div>
            </div>
          </section>

        </main>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "22px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)" }}>
            © 2025 Laurence Payet · La Réunion
          </span>
        </footer>

      </div>
    </>
  );
}

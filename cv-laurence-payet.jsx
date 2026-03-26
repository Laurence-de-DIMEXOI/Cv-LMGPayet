import { useState, useEffect, useRef } from "react";

/* ─── CSS injected globally ─── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

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

/* ─── Data ─── */
const NAV_LINKS = [
  { label: "Profil", href: "profil" },
  { label: "Expérience", href: "experience" },
  { label: "Formation", href: "formation" },
  { label: "Compétences", href: "competences" },
  { label: "Outils", href: "outils" },
];

const STATS = [
  { value: "7", label: "ans d'expérience" },
  { value: "4+", label: "marques gérées en simultané" },
  { value: "±30%", label: "contribution CA via actions marketing" },
  { value: "3", label: "sites web gérés en autonomie" },
];

const MISSIONS_HIGHLIGHT = [
  "Élaboration et pilotage de la stratégie de communication multimarques",
  "Collaboration directe avec la direction et les directeurs/responsables d'activité",
  "Définition des positionnements, messages, tons et univers visuels par entité",
  "Reporting mensuel et analyse des performances (engagement, trafic, campagnes)",
  "Contribution mesurée au chiffre d'affaire via les actions marketing (±30% selon les suivis)",
];

const MISSIONS_STANDARD = [
  "Création et supervision des contenus photo, vidéo, print et digitaux",
  "Gestion de la présence digitale : réseaux sociaux, sites web, newsletters",
  "Coordination permanente avec les équipes terrain, digital et objectifs commerciaux",
  "Mise en place d'automatisations no-code et outils IA appliqués à la communication",
  "Gestion autonome du poste, sans relais interne formé",
];

const FORMATIONS = [
  {
    year: "2020",
    diploma: "Master Webmarketing et Social Media",
    school: "Créalise – La Réunion",
    tag: "Alternance",
  },
  {
    year: "2018",
    diploma: "Licence Communication",
    school: "Université de La Réunion",
    tag: null,
  },
  {
    year: "2017",
    diploma: "DUT Gestion des entreprises",
    school: "IUT de La Réunion",
    tag: "Alternance",
  },
];

const COMPETENCES = [
  {
    category: "Stratégie & Groupe",
    items: [
      { label: "Communication multimarques", highlight: true },
      { label: "Identité de marque", highlight: true },
      { label: "Storytelling", highlight: false },
      { label: "Positionnement", highlight: false },
    ],
  },
  {
    category: "Création",
    items: [
      { label: "Photo & vidéo", highlight: false },
      { label: "Montage", highlight: false },
      { label: "Visuels print & digitaux", highlight: false },
      { label: "PAO", highlight: false },
    ],
  },
  {
    category: "Digital",
    items: [
      { label: "Réseaux sociaux", highlight: false },
      { label: "Newsletters", highlight: false },
      { label: "WordPress / WooCommerce", highlight: false },
      { label: "Veille médias", highlight: false },
    ],
  },
  {
    category: "Pilotage & Analyse",
    items: [
      { label: "Reporting & KPIs", highlight: true },
      { label: "Gestion de projets", highlight: true },
      { label: "Suivi budgétaire", highlight: false },
      { label: "Amélioration continue", highlight: false },
    ],
  },
  {
    category: "IA & Automatisation",
    items: [
      { label: "ChatGPT", highlight: false },
      { label: "No-code (Zapier, Glide)", highlight: false },
      { label: "Optimisation contenus IA", highlight: false },
    ],
  },
];

const OUTILS = [
  {
    category: "Stratégie & Pilotage",
    tools: ["Trello", "Notion", "Slack", "Google Workspace"],
  },
  {
    category: "Création & Contenu",
    tools: ["Canva", "Lightroom", "CapCut"],
  },
  {
    category: "Numérique & Web",
    tools: ["WooCommerce", "Shopify", "Meta Ads", "Google Ads", "Bitly"],
  },
  {
    category: "IA & Automations",
    tools: ["Claude Chat", "Claude Cowork", "Claude Code", "ChatGPT", "Zapier", "Glide"],
  },
  {
    category: "CRM & Diffusion",
    tools: ["WhatsApp Business", "Brevo", "Sellsy"],
  },
];

const SITES = ["dimexoi.fr", "app.dimexoi.fr", "raumplus.re"];

/* ─── Sub-components ─── */

function SectionEyebrow({ number, title }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: "var(--orange)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          // {number}
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "var(--border)",
          }}
        />
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function ContactRow({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "var(--orange-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 14,
          color: "#555",
          fontWeight: 400,
          wordBreak: "break-all",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function MissionRow({ text, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "9px 10px",
        borderRadius: 9,
        background: hovered ? "#F8F8F6" : "transparent",
        transition: "background 0.15s",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: highlight ? "var(--orange)" : "var(--border)",
          marginTop: 7,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 14.5,
          color: highlight ? "var(--ink)" : "#555",
          fontWeight: highlight ? 500 : 300,
          lineHeight: 1.65,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function FormationCard({ year, diploma, school, tag }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 200px",
        background: "var(--surface)",
        border: `1px solid ${hovered ? "var(--orange-mid)" : "var(--border)"}`,
        borderRadius: 13,
        padding: "20px 26px",
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        boxShadow: hovered
          ? "0 4px 20px rgba(249,115,22,0.08)"
          : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 34,
          fontWeight: 700,
          color: "var(--orange)",
          opacity: 0.2,
          lineHeight: 1,
          minWidth: 64,
          paddingTop: 2,
        }}
      >
        {year}
      </span>
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "var(--ink)",
            marginBottom: 4,
            lineHeight: 1.35,
          }}
        >
          {diploma}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--muted)",
            marginBottom: tag ? 10 : 0,
          }}
        >
          {school}
        </div>
        {tag && (
          <span
            style={{
              fontStyle: "italic",
              color: "var(--orange)",
              border: "1px solid var(--orange-mid)",
              padding: "2px 9px",
              borderRadius: 5,
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}

function CompetenceChip({ label, highlight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "5px 13px",
        borderRadius: 100,
        fontSize: 13,
        fontWeight: highlight ? 500 : 400,
        background: hovered
          ? (highlight ? "var(--orange-light)" : "#f5f5f3")
          : (highlight ? "var(--orange-light)" : "var(--surface)"),
        border: `1.5px solid ${hovered ? "var(--orange-mid)" : (highlight ? "var(--orange-mid)" : "var(--border)")}`,
        color: hovered ? "var(--ink)" : (highlight ? "#c2410c" : "#555"),
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.15s",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

function OutilChip({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "5px 13px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 500,
        background: hovered ? "var(--ink)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--ink)" : "var(--border)"}`,
        color: hovered ? "white" : "var(--ink)",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.15s",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

function SiteLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "5px 16px",
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        border: "1.5px solid var(--orange-mid)",
        color: hovered ? "white" : "var(--orange)",
        background: hovered ? "var(--orange)" : "transparent",
        transform: hovered ? "translateY(-1px)" : "none",
        transition: "all 0.18s",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Avatar SVG placeholder ─── */
function AvatarPlaceholder() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <circle cx="60" cy="60" r="60" fill="#FFF7F0" />
      <circle cx="60" cy="46" r="20" fill="#FED7AA" />
      <ellipse cx="60" cy="95" rx="32" ry="22" fill="#FED7AA" />
    </svg>
  );
}

/* ─── Main Component ─── */
export default function CvLaurencePayet() {
  const [activeSection, setActiveSection] = useState("profil");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrance animation
    const t = setTimeout(() => setVisible(true), 30);

    // Scroll shadow
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    // IntersectionObserver for active nav
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{globalStyles}</style>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s cubic-bezier(0.22,1,0.36,1), transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          minHeight: "100vh",
        }}
      >
        {/* ── NAV ── */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            background: "rgba(250,250,248,0.96)",
            borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
            boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
            transition: "box-shadow 0.25s, border-color 0.25s",
          }}
        >
          <div
            style={{
              maxWidth: 860,
              margin: "0 auto",
              padding: "0 24px",
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              Laurence{" "}
              <span style={{ color: "var(--orange)" }}>Payet</span>
            </span>

            <div
              className="nav-links"
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13.5,
                    fontWeight: activeSection === href ? 600 : 400,
                    color: activeSection === href ? "var(--orange)" : "#666",
                    padding: "6px 10px",
                    borderRadius: 8,
                    transition: "color 0.15s, font-weight 0.1s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ── CONTENT ── */}
        <main style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>

          {/* ── HERO + PROFIL (section profil) ── */}
          <section id="profil" style={{ paddingTop: 56, paddingBottom: 64 }}>

            {/* Hero */}
            <div
              style={{
                display: "flex",
                gap: 48,
                flexWrap: "wrap",
                marginBottom: 52,
                alignItems: "flex-start",
              }}
            >
              {/* Left */}
              <div style={{ flex: "1 1 320px", minWidth: 0 }}>
                {/* Photo + Name row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    marginBottom: 20,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: "3px solid var(--orange-mid)",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "var(--orange-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AvatarPlaceholder />
                  </div>
                  <div>
                    <h1
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(48px, 8vw, 70px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        marginBottom: 10,
                      }}
                    >
                      Laurence
                      <br />
                      <span style={{ color: "var(--orange)" }}>Payet</span>
                    </h1>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#444",
                    marginBottom: 14,
                    lineHeight: 1.4,
                  }}
                >
                  Responsable Communication & Marketing Groupe
                </div>

                {/* Badge */}
                <div style={{ marginBottom: 18 }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "var(--orange)",
                      color: "white",
                      borderRadius: 100,
                      padding: "5px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    Senior · 7 ans d'expérience
                  </span>
                </div>

                {/* Pills row */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    "Multimarques",
                    "Stratégie & Pilotage",
                    "Contenus & Digital",
                    "Autonomie complète",
                  ].map((p) => (
                    <span
                      key={p}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: 100,
                        padding: "4px 12px",
                        fontSize: 12.5,
                        color: "#555",
                        fontWeight: 400,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right – Contact */}
              <div
                style={{
                  flex: "0 1 240px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  paddingTop: 8,
                }}
              >
                <ContactRow icon="✉️" text="p.laurence140297@gmail.com" />
                <ContactRow icon="📞" text="0692 43 01 06" />
                <ContactRow icon="📍" text="Piton St-Leu, La Réunion" />
              </div>
            </div>

            {/* Profile text */}
            <SectionEyebrow number="01" title="Profil" />

            <p
              style={{
                borderLeft: "3px solid var(--orange)",
                paddingLeft: 24,
                fontWeight: 300,
                fontSize: 15.5,
                lineHeight: 1.9,
                color: "#333",
                marginBottom: 40,
                maxWidth: 680,
              }}
            >
              Responsable communication & marketing senior, spécialisée dans la gestion de la{" "}
              <strong style={{ fontWeight: 600 }}>
                communication multimarques au sein de groupes
              </strong>
              . Pilotage{" "}
              <strong style={{ fontWeight: 600 }}>stratégique et opérationnel</strong> de
              l'ensemble du périmètre : image de marque, contenus, digital, reporting et
              coordination terrain. Habituée aux{" "}
              <strong style={{ fontWeight: 600 }}>environnements exigeants</strong>, capable
              d'assurer une gestion complète du poste avec rigueur et créativité.
            </p>

            {/* Stats bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    flex: "1 1 120px",
                    padding: "24px 20px",
                    borderRight:
                      i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 36,
                      fontWeight: 700,
                      color: "var(--orange)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: "var(--muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section id="experience" style={{ paddingBottom: 64 }}>
            <SectionEyebrow number="02" title="Expérience" />

            <div
              style={{
                background: "var(--surface)",
                borderRadius: 18,
                boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
                padding: "32px 36px",
                border: "1px solid var(--border)",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                    flex: "1 1 240px",
                  }}
                >
                  Responsable Marketing & Communication Groupe
                </h3>
                <span
                  style={{
                    background: "var(--orange-light)",
                    color: "var(--orange)",
                    border: "1px solid var(--orange-mid)",
                    borderRadius: 100,
                    padding: "5px 14px",
                    fontSize: 13,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  7 ans · 2018 – Aujourd'hui
                </span>
              </div>

              {/* Sub-header */}
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--orange)",
                    marginBottom: 4,
                  }}
                >
                  DIMEXOI / Groupe ALDAM
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: "var(--muted)",
                  }}
                >
                  DIMEXOI · Bois d'Orient · Cœur d'Acier · CHR Discount OI · + interventions ponctuelles
                </div>
              </div>

              {/* Scope bloc */}
              <div
                style={{
                  background: "#F8F8F6",
                  borderLeft: "3px solid var(--orange-mid)",
                  borderRadius: "0 8px 8px 0",
                  padding: "14px 18px",
                  marginBottom: 24,
                  fontSize: 14,
                  color: "#444",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                <strong style={{ fontWeight: 600 }}>Périmètre :</strong> communication
                multimarques pour 4 enseignes principales — mobilier, literie, cuisines,
                discount — avec interventions ponctuelles sur 2 marques complémentaires.
                Gestion complète sans équipe dédiée.
              </div>

              {/* Missions */}
              <div>
                {MISSIONS_HIGHLIGHT.map((m, i) => (
                  <MissionRow key={i} text={m} highlight={true} />
                ))}
                <div style={{ height: 4 }} />
                {MISSIONS_STANDARD.map((m, i) => (
                  <MissionRow key={i} text={m} highlight={false} />
                ))}
              </div>
            </div>
          </section>

          {/* ── FORMATION ── */}
          <section id="formation" style={{ paddingBottom: 64 }}>
            <SectionEyebrow number="03" title="Formation" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {FORMATIONS.map((f) => (
                <FormationCard key={f.year} {...f} />
              ))}
            </div>
          </section>

          {/* ── COMPÉTENCES ── */}
          <section id="competences" style={{ paddingBottom: 64 }}>
            <SectionEyebrow number="04" title="Compétences" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "28px 40px",
              }}
            >
              {COMPETENCES.map((cat) => (
                <div
                  key={cat.category}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--ink)",
                      letterSpacing: "0.03em",
                      paddingTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {cat.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.items.map((item) => (
                      <CompetenceChip
                        key={item.label}
                        label={item.label}
                        highlight={item.highlight}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── OUTILS ── */}
          <section id="outils" style={{ paddingBottom: 80 }}>
            <SectionEyebrow number="05" title="Outils" />

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {OUTILS.map((cat) => (
                <div
                  key={cat.category}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: "#C8C8C0",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      marginTop: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {cat.category}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {cat.tools.map((tool) => (
                      <OutilChip key={tool} label={tool} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sites web */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                marginTop: 32,
                paddingTop: 28,
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#C8C8C0",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  lineHeight: 1.4,
                }}
              >
                Sites web gérés
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {SITES.map((site) => (
                  <SiteLink key={site} label={site} />
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            © 2025 Laurence Payet · La Réunion
          </span>
        </footer>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
        }
        @media (max-width: 640px) {
          section > div[style*="grid-template-columns: 160px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

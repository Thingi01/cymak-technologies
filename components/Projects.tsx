"use client";

const webProjects = [
  {
    num: "01",
    type: "Full Website",
    title: "Mush Tech Solution",
    desc: "Corporate website for a Nairobi-based advanced security & IT services company. Features service listings, product gallery, WhatsApp CTA, and contact integration.",
    tech: ["HTML/CSS", "JavaScript", "Responsive", "WhatsApp API"],
    url: "https://mushtechsolution-website.vercel.app/",
    color: "#9333ea",
  },
  {
    num: "02",
    type: "Portfolio Website",
    title: "Cyrus Maina — Developer Portfolio",
    desc: "Personal portfolio site showcasing development skills, projects, and professional profile. Clean, modern design built for career growth.",
    tech: ["React", "JavaScript", "Responsive", "Vercel"],
    url: "https://my-portifolio-cyrus.vercel.app/",
    color: "#d946ef",
  },
  {
    num: "03",
    type: "Full Website",
    title: "Saferon Systems Limited",
    desc: "Corporate site for a 30+ year veteran in electronic security and IT solutions in Nairobi. Built to reflect institutional trust and extensive service offerings.",
    tech: ["HTML/CSS", "Responsive", "Multi-section", "Vercel"],
    url: "https://saferon-systems-limited.vercel.app/",
    color: "#2563eb",
  },
];

const landingPages = [
  {
    num: "04",
    type: "Landing Page",
    title: "LUXURE — Black November Drop",
    desc: "High-converting luxury fashion landing page with countdown timer, product showcase, and flash sale mechanics for a limited drop campaign.",
    tech: ["HTML/CSS/JS", "Countdown Timer", "E-commerce UX", "Conversion Optimized"],
    url: "https://luxury-landing-page-teal.vercel.app/",
    color: "#7c3aed",
  },
  {
    num: "05",
    type: "Landing Page",
    title: "TechDeals — Dell XPS 13 Product Page",
    desc: "Single-product sales landing page for the Dell XPS 13 9380. Clean spec breakdown, trust signals, and direct purchase CTA optimized for conversions.",
    tech: ["HTML/CSS/JS", "Product Page", "Sales Focused", "Mobile-Ready"],
    url: "https://tech-deals-alpha.vercel.app/",
    color: "#3b82f6",
  },
];

const designSamples = [
  { num: "D1", label: "Brand Identity Design", icon: "◆" },
  { num: "D2", label: "Social Media Graphics", icon: "✦" },
  { num: "D3", label: "Poster & Flyer Design", icon: "⬡" },
  { num: "D4", label: "Digital Marketing Assets", icon: "◈" },
];

export default function Projects() {
  return (
    <>
      <style>{`
        .projects-section { padding: 7rem 2rem; position: relative; }
        .projects-inner { max-width: 1200px; margin: 0 auto; }
        .p-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 4rem; gap: 2rem; flex-wrap: wrap; }
        .p-label { font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.7rem; display: block; }
        .p-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; color: #fff; letter-spacing: -0.02em; line-height: 1.1; }

        /* Web & Landing section heading */
        .cat-label {
          display: flex; align-items: center; gap: 0.75rem;
          font-family: 'Outfit', sans-serif; font-size: 0.70rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.40);
          margin-bottom: 1.5rem; margin-top: 3.5rem;
        }
        .cat-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(168,85,247,0.2), transparent); }
        .cat-label:first-child { margin-top: 0; }

        /* Project card */
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; border: 1.5px solid rgba(168,85,247,0.13); border-radius: 16px; overflow: hidden; }
        .proj-grid-2 { grid-template-columns: repeat(2, 1fr); }
        .proj-card {
          padding: 2.5rem; background: rgba(9,9,26,0.85); position: relative; overflow: hidden; transition: background 0.3s;
          display: flex; flex-direction: column;
        }
        .proj-card:hover { background: rgba(15,12,38,0.98); }
        .proj-num {
          font-family: 'Playfair Display', serif; font-size: 3.8rem; font-weight: 900;
          color: rgba(168,85,247,0.06); position: absolute; top: 1.2rem; right: 1.5rem; line-height: 1;
          transition: color 0.3s;
        }
        .proj-card:hover .proj-num { color: rgba(217,70,239,0.11); }
        .proj-type {
          font-family: 'Outfit', sans-serif; font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #e879f9; font-weight: 600; margin-bottom: 0.9rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .proj-type::before { content: ''; width: 18px; height: 1px; background: #e879f9; display: inline-block; }
        .proj-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 0.7rem; line-height: 1.25; letter-spacing: -0.01em; }
        .proj-desc { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: rgba(255,255,255,0.50); line-height: 1.78; font-weight: 300; margin-bottom: 1.5rem; flex: 1; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .proj-tag {
          font-family: 'Outfit', sans-serif; font-size: 0.64rem; padding: 0.24rem 0.65rem; border-radius: 100px;
          background: rgba(147,51,234,0.10); border: 1px solid rgba(168,85,247,0.20); color: rgba(192,132,252,0.65);
          letter-spacing: 0.05em; font-weight: 500;
        }
        .proj-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Outfit', sans-serif; font-size: 0.78rem; font-weight: 500;
          color: rgba(96,165,250,0.65); text-decoration: none; letter-spacing: 0.04em;
          border: 1px solid rgba(96,165,250,0.20); border-radius: 6px; padding: 0.38rem 0.85rem;
          transition: all 0.25s; width: fit-content;
        }
        .proj-link:hover { color: #fff; border-color: rgba(96,165,250,0.45); background: rgba(37,99,235,0.12); }

        /* Design placeholders */
        .design-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .design-card {
          aspect-ratio: 3/4; border-radius: 12px;
          border: 1.5px dashed rgba(217,70,239,0.20); background: rgba(9,9,26,0.6);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.75rem; transition: all 0.3s; cursor: default;
          position: relative; overflow: hidden;
        }
        .design-card:hover { border-color: rgba(217,70,239,0.40); background: rgba(15,12,38,0.85); }
        .design-card::before {
          content: 'Sample'; position: absolute; top: 0.75rem; right: 0.75rem;
          font-family: 'Outfit', sans-serif; font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,121,249,0.40);
          border: 1px solid rgba(217,70,239,0.18); border-radius: 100px; padding: 0.15rem 0.55rem;
        }
        .design-icon { font-size: 1.8rem; color: rgba(232,121,249,0.45); filter: drop-shadow(0 0 8px rgba(217,70,239,0.3)); }
        .design-num { font-family: 'Playfair Display', serif; font-size: 0.7rem; font-weight: 700; color: rgba(255,255,255,0.18); }
        .design-name { font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 400; color: rgba(255,255,255,0.35); text-align: center; padding: 0 0.75rem; line-height: 1.4; }
        .design-upload-note {
          text-align: center; margin-top: 1.25rem;
          font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.28); font-weight: 300;
        }

        @media (max-width: 900px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-grid-2 { grid-template-columns: 1fr; }
          .design-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .design-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      <section className="projects-section" id="projects">
        <div className="projects-inner">
          <div className="p-header">
            <div>
              <span className="p-label">Our Work</span>
              <h2 className="p-title">Live Projects</h2>
            </div>
            <a href="#contact"
              style={{fontFamily:"'Outfit',sans-serif",fontSize:"0.85rem",color:"rgba(232,121,249,0.65)",textDecoration:"none",border:"1px solid rgba(217,70,239,0.22)",padding:"0.58rem 1.2rem",borderRadius:"6px",fontWeight:500,transition:"all 0.2s"}}
              onMouseOver={e=>(e.currentTarget.style.color="#fff")}
              onMouseOut={e=>(e.currentTarget.style.color="rgba(232,121,249,0.65)")}>
              Start a Project →
            </a>
          </div>

          {/* Websites */}
          <div className="cat-label">Websites</div>
          <div className="proj-grid">
            {webProjects.map(p => (
              <div key={p.num} className="proj-card" style={{ "--pc": p.color } as React.CSSProperties}>
                <div className="proj-num">{p.num}</div>
                <div className="proj-type">{p.type}</div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">{p.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-link">↗ View Live Site</a>
              </div>
            ))}
          </div>

          {/* Landing Pages */}
          <div className="cat-label">Landing Pages</div>
          <div className="proj-grid proj-grid-2">
            {landingPages.map(p => (
              <div key={p.num} className="proj-card" style={{ "--pc": p.color } as React.CSSProperties}>
                <div className="proj-num">{p.num}</div>
                <div className="proj-type">{p.type}</div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">{p.tech.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-link">↗ View Live Page</a>
              </div>
            ))}
          </div>

          {/* Graphic Design */}
          <div className="cat-label">Graphic Design</div>
          <div className="design-grid">
            {designSamples.map(d => (
              <div key={d.num} className="design-card">
                <div className="design-icon">{d.icon}</div>
                <div className="design-num">{d.num}</div>
                <div className="design-name">{d.label}</div>
              </div>
            ))}
          </div>
          <p className="design-upload-note">Design samples coming soon — upload your work to replace placeholders</p>
        </div>
      </section>
    </>
  );
}
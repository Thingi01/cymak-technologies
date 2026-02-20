"use client";

const activeServices = [
  {
    icon: "⬡",
    title: "Web Development",
    desc: "Modern, responsive, and secure websites engineered for performance. From corporate sites to complex web applications built to convert and scale.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    color: "#9333ea",
  },
  {
    icon: "✦",
    title: "SEO Optimization",
    desc: "Data-driven search strategies that improve visibility, drive qualified organic traffic, and position your business ahead of competitors on Google.",
    tags: ["On-Page SEO", "Technical SEO", "Analytics", "Content Strategy"],
    color: "#d946ef",
  },
  {
    icon: "◈",
    title: "Graphic & Digital Design",
    desc: "Professional brand assets, social media graphics, posters, flyers, and digital design that strengthen your identity and communicate your value clearly.",
    tags: ["Branding", "Social Media", "Print Design", "UI/UX"],
    color: "#2563eb",
  },
  {
    icon: "⟡",
    title: "Systems & Infrastructure",
    desc: "End-to-end IT infrastructure design — server configuration, network setup, and system integration for operational stability and business growth.",
    tags: ["Servers", "Networking", "Integration", "Support"],
    color: "#7c3aed",
  },
];

const futureServices = [
  {
    icon: "☁",
    title: "Cloud Solutions",
    desc: "Seamless cloud migration, management, and optimization to reduce costs and scale with confidence.",
    color: "#3b82f6",
  },
  {
    icon: "🛡",
    title: "Cybersecurity",
    desc: "Comprehensive protection — risk assessments, system audits, and security frameworks to eliminate vulnerabilities.",
    color: "#8b5cf6",
  },
];

export default function Services() {
  return (
    <>
      <style>{`
        .services-section { padding: 7rem 2rem; position: relative; overflow: hidden; }
        .services-section::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 90px; background: linear-gradient(to bottom, transparent, rgba(217,70,239,0.4));
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .s-label {
          display: block; text-align: center; font-family: 'Outfit', sans-serif;
          font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.8rem;
        }
        .s-title {
          font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900;
          text-align: center; color: #fff; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 0.9rem;
        }
        .s-sub {
          text-align: center; color: rgba(255,255,255,0.48); font-family: 'Outfit', sans-serif;
          font-size: 1rem; max-width: 480px; margin: 0 auto 3.5rem; line-height: 1.8; font-weight: 300;
        }

        /* Active services grid */
        .services-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1.5px; border: 1.5px solid rgba(168,85,247,0.14); border-radius: 16px; overflow: hidden;
        }
        .service-card {
          padding: 2.5rem; background: rgba(9,9,26,0.85); position: relative; overflow: hidden; transition: background 0.3s;
        }
        .service-card:hover { background: rgba(15,12,38,0.98); }
        .service-card::before {
          content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.4s;
          background: radial-gradient(circle at 25% 25%, var(--sc,#9333ea) 0%, transparent 65%);
        }
        .service-card:hover::before { opacity: 0.07; }
        .sc-border { position: absolute; inset: 0; border: 1px solid rgba(168,85,247,0.12); pointer-events: none; }
        .sc-icon { font-size: 1.6rem; margin-bottom: 1.2rem; display: block; filter: drop-shadow(0 0 8px var(--sc,#9333ea)); }
        .sc-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 0.7rem; letter-spacing: -0.01em; }
        .sc-desc { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.52); line-height: 1.78; font-weight: 300; margin-bottom: 1.5rem; }
        .sc-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .sc-tag {
          font-family: 'Outfit', sans-serif; font-size: 0.66rem; padding: 0.25rem 0.7rem; border-radius: 100px;
          border: 1px solid rgba(217,70,239,0.22); color: rgba(240,171,252,0.65); letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500;
        }
        .sc-arrow { position: absolute; bottom: 2rem; right: 2rem; font-size: 1.1rem; color: rgba(217,70,239,0); transition: all 0.3s; transform: translateX(-4px); font-family: 'Outfit', sans-serif; }
        .service-card:hover .sc-arrow { color: rgba(232,121,249,0.55); transform: translateX(0); }

        /* Future services */
        .future-wrap { margin-top: 4.5rem; }
        .future-header { text-align: center; margin-bottom: 2rem; }
        .future-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border-radius: 100px;
          border: 1px dashed rgba(96,165,250,0.35); background: rgba(37,99,235,0.08);
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #60a5fa;
        }
        .future-title {
          font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700;
          color: rgba(255,255,255,0.55); margin-top: 0.75rem; font-style: italic;
        }
        .future-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .future-card {
          padding: 2rem; border-radius: 12px;
          border: 1px dashed rgba(96,165,250,0.18); background: rgba(9,9,26,0.5);
          position: relative; overflow: hidden;
          display: flex; align-items: flex-start; gap: 1.2rem;
        }
        .future-card::after {
          content: 'Coming Soon'; position: absolute; top: 1rem; right: 1rem;
          font-family: 'Outfit', sans-serif; font-size: 0.60rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(96,165,250,0.45);
          border: 1px solid rgba(96,165,250,0.18); border-radius: 100px; padding: 0.18rem 0.6rem;
        }
        .future-icon { font-size: 1.4rem; flex-shrink: 0; opacity: 0.55; filter: drop-shadow(0 0 6px var(--fc, #3b82f6)); margin-top: 2px; }
        .future-card-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: rgba(255,255,255,0.50); margin-bottom: 0.4rem; }
        .future-card-desc { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.32); line-height: 1.7; font-weight: 300; }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .future-grid  { grid-template-columns: 1fr; }
          .service-card { padding: 2rem; }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-inner">
          <span className="s-label">What We Do</span>
          <h2 className="s-title">Integrated Technology Solutions</h2>
          <p className="s-sub">Everything your business needs to build, grow, and succeed — delivered under one roof.</p>

          <div className="services-grid">
            {activeServices.map(s => (
              <div key={s.title} className="service-card" style={{ "--sc": s.color } as React.CSSProperties}>
                <div className="sc-border" />
                <span className="sc-icon">{s.icon}</span>
                <div className="sc-title">{s.title}</div>
                <p className="sc-desc">{s.desc}</p>
                <div className="sc-tags">{s.tags.map(t => <span key={t} className="sc-tag">{t}</span>)}</div>
                <div className="sc-arrow">→</div>
              </div>
            ))}
          </div>

          {/* Future Services */}
          <div className="future-wrap">
            <div className="future-header">
              <span className="future-badge">⏳ Expanding Soon</span>
              <div className="future-title">Future Service Offerings</div>
            </div>
            <div className="future-grid">
              {futureServices.map(s => (
                <div key={s.title} className="future-card" style={{ "--fc": s.color } as React.CSSProperties}>
                  <span className="future-icon">{s.icon}</span>
                  <div>
                    <div className="future-card-title">{s.title}</div>
                    <p className="future-card-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
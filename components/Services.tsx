const activeServices = [
  {
    icon: "⬡",
    title: "Web Development",
    desc: "Modern, responsive, and secure websites engineered for performance. From corporate sites to complex web applications built to convert and scale.",
    tags: ["Next.js", "React", "TypeScript", "Performance"],
    color: "#146c43",
  },
  {
    icon: "✦",
    title: "SEO Optimization",
    desc: "Data-driven search strategies that improve visibility, drive qualified organic traffic, and position your business ahead of competitors on Google.",
    tags: ["On-Page SEO", "Technical SEO", "Analytics", "Content Strategy"],
    color: "#0d4c30",
  },
  {
    icon: "◈",
    title: "Graphic & Digital Design",
    desc: "Professional brand assets, social media graphics, posters, flyers, and digital design that strengthen your identity and communicate your value clearly.",
    tags: ["Branding", "Social Media", "Print Design", "UI/UX"],
    color: "#96701f",
  },
  {
    icon: "⟡",
    title: "Systems & Infrastructure",
    desc: "End-to-end IT infrastructure design — server configuration, network setup, and system integration for operational stability and business growth.",
    tags: ["Servers", "Networking", "Integration", "Support"],
    color: "#1d8a56",
  },
];

const futureServices = [
  {
    icon: "☁",
    title: "Cloud Solutions",
    desc: "Seamless cloud migration, management, and optimization to reduce costs and scale with confidence.",
    color: "#b8892e",
  },
  {
    icon: "🛡",
    title: "Cybersecurity",
    desc: "Comprehensive protection — risk assessments, system audits, and security frameworks to eliminate vulnerabilities.",
    color: "#96701f",
  },
];

export default function Services() {
  return (
    <>
      <style>{`
        .services-section { padding: 7rem 2rem; position: relative; overflow: hidden; background: #f5f8f6; }
        .services-section::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 1px; height: 90px; background: linear-gradient(to bottom, transparent, rgba(18,33,27,0.16));
        }
        .services-inner { max-width: 1200px; margin: 0 auto; }
        .s-label {
          display: block; text-align: center; font-family: 'Outfit', sans-serif;
          font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.8rem;
        }
        .s-title {
          font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900;
          text-align: center; color: #12211b; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 0.9rem;
        }
        .s-sub {
          text-align: center; color: rgba(18,33,27,0.55); font-family: 'Outfit', sans-serif;
          font-size: 1rem; max-width: 480px; margin: 0 auto 3.5rem; line-height: 1.8; font-weight: 400;
        }

        /* Active services grid */
        .services-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; overflow: hidden;
          background: rgba(18,33,27,0.10);
        }
        .service-card {
          padding: 2.5rem; background: #ffffff; position: relative; transition: background 0.25s;
        }
        .service-card:hover { background: #fbfdfc; }
        .sc-icon {
          width: 44px; height: 44px; border-radius: 10px; margin-bottom: 1.2rem;
          display: flex; align-items: center; justify-content: center; font-size: 1.25rem;
          background: color-mix(in srgb, var(--sc, #146c43) 12%, white);
          color: var(--sc, #146c43);
        }
        .sc-title { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: #12211b; margin-bottom: 0.7rem; letter-spacing: -0.01em; }
        .sc-desc { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(18,33,27,0.58); line-height: 1.78; font-weight: 400; margin-bottom: 1.5rem; }
        .sc-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .sc-tag {
          font-family: 'Outfit', sans-serif; font-size: 0.66rem; padding: 0.25rem 0.7rem; border-radius: 100px;
          border: 1px solid rgba(18,33,27,0.14); color: rgba(18,33,27,0.55); letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500;
        }
        .sc-arrow { position: absolute; bottom: 2rem; right: 2rem; font-size: 1.1rem; color: transparent; transition: all 0.25s; transform: translateX(-4px); font-family: 'Outfit', sans-serif; }
        .service-card:hover .sc-arrow { color: var(--sc, #146c43); transform: translateX(0); }

        /* Future services */
        .future-wrap { margin-top: 4.5rem; }
        .future-header { text-align: center; margin-bottom: 2rem; }
        .future-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border-radius: 100px;
          border: 1px dashed rgba(184,137,46,0.45); background: #f6edd8;
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #96701f;
        }
        .future-title {
          font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700;
          color: rgba(18,33,27,0.55); margin-top: 0.75rem; font-style: italic;
        }
        .future-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .future-card {
          padding: 2rem; border-radius: 12px;
          border: 1px dashed rgba(184,137,46,0.30); background: rgba(255,255,255,0.6);
          position: relative; overflow: hidden;
          display: flex; align-items: flex-start; gap: 1.2rem;
        }
        .future-card::after {
          content: 'Coming Soon'; position: absolute; top: 1rem; right: 1rem;
          font-family: 'Outfit', sans-serif; font-size: 0.60rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: rgba(150,112,31,0.65);
          border: 1px solid rgba(184,137,46,0.30); border-radius: 100px; padding: 0.18rem 0.6rem;
        }
        .future-icon { font-size: 1.3rem; flex-shrink: 0; opacity: 0.7; margin-top: 2px; }
        .future-card-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: rgba(18,33,27,0.62); margin-bottom: 0.4rem; }
        .future-card-desc { font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(18,33,27,0.45); line-height: 1.7; font-weight: 400; }

        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
          .future-grid  { grid-template-columns: 1fr; }
          .service-card { padding: 2rem; }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-inner">
          <span className="s-label" data-reveal>What We Do</span>
          <h2 className="s-title" data-reveal>Integrated Technology Solutions</h2>
          <p className="s-sub" data-reveal>Everything your business needs to build, grow, and succeed — delivered under one roof.</p>

          <div className="services-grid">
            {activeServices.map((s, i) => (
              <div
                key={s.title}
                className="service-card"
                style={{ "--sc": s.color } as React.CSSProperties}
                data-reveal
                data-reveal-delay={Math.min(i + 1, 6)}
              >
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
            <div className="future-header" data-reveal>
              <span className="future-badge">⏳ Expanding Soon</span>
              <div className="future-title">Future Service Offerings</div>
            </div>
            <div className="future-grid">
              {futureServices.map((s, i) => (
                <div
                  key={s.title}
                  className="future-card"
                  style={{ "--fc": s.color } as React.CSSProperties}
                  data-reveal
                  data-reveal-delay={i + 1}
                >
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
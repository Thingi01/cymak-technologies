"use client";

const values = [
  { label: "Integrity", icon: "◆" },
  { label: "Innovation", icon: "✦" },
  { label: "Security", icon: "⬡" },
  { label: "Reliability", icon: "◈" },
  { label: "Excellence", icon: "★" },
  { label: "Client Partnership", icon: "⟡" },
];

const approach = [
  { step: "01", title: "Assessment", desc: "Understanding your needs, existing systems, and business objectives." },
  { step: "02", title: "Strategy", desc: "Designing tailored, scalable solutions aligned to your goals." },
  { step: "03", title: "Implementation", desc: "Secure, efficient deployment with minimal disruption." },
  { step: "04", title: "Optimization", desc: "Continuous improvement, monitoring, and long-term support." },
];

export default function About() {
  return (
    <>
      <style>{`
        .about-section {
          padding: 7rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .about-bg-glow {
          position: absolute;
          width: 700px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(109, 40, 217, 0.07) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .about-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
          margin-bottom: 6rem;
        }
        .about-left {}
        .about-tagline {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a78bfa;
          font-weight: 600;
          margin-bottom: 1.2rem;
          display: block;
        }
        .about-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          color: #f0f0ff;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .about-heading .accent {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .about-body {
          font-size: 1rem;
          color: rgba(180, 180, 200, 0.6);
          line-height: 1.8;
          font-weight: 300;
          margin-bottom: 1.2rem;
        }
        .about-vision-box {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid rgba(139, 92, 246, 0.2);
          background: rgba(109, 40, 217, 0.07);
          position: relative;
          overflow: hidden;
        }
        .about-vision-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: linear-gradient(to bottom, #a78bfa, #60a5fa);
        }
        .vision-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #a78bfa;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .vision-text {
          font-size: 0.95rem;
          color: rgba(200, 200, 220, 0.75);
          line-height: 1.7;
          font-style: italic;
          font-weight: 300;
        }
        .values-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .value-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.1rem;
          border-radius: 8px;
          border: 1px solid rgba(139, 92, 246, 0.15);
          background: rgba(10, 12, 28, 0.6);
          transition: all 0.25s;
        }
        .value-chip:hover {
          border-color: rgba(139, 92, 246, 0.35);
          background: rgba(109, 40, 217, 0.1);
        }
        .value-icon {
          font-size: 0.9rem;
          color: #a78bfa;
          flex-shrink: 0;
          filter: drop-shadow(0 0 6px rgba(167, 139, 250, 0.5));
        }
        .value-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(200, 200, 220, 0.8);
        }
        .values-section-label {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a78bfa;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: block;
        }
        .about-approach {
          border-top: 1px solid rgba(139, 92, 246, 0.12);
          padding-top: 5rem;
        }
        .approach-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .approach-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          max-width: 900px;
          margin: 0 auto;
        }
        .approach-steps::before {
          content: '';
          position: absolute;
          top: 22px; left: 10%;
          width: 80%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.35), transparent);
        }
        .approach-step {
          text-align: center;
          padding: 0 1rem;
          position: relative;
        }
        .step-num-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .step-num {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.35);
          background: rgba(109, 40, 217, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: #a78bfa;
          position: relative;
          z-index: 2;
        }
        .step-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #f0f0ff;
          margin-bottom: 0.5rem;
        }
        .step-desc {
          font-size: 0.8rem;
          color: rgba(160, 160, 180, 0.55);
          line-height: 1.65;
          font-weight: 300;
        }
        @media (max-width: 900px) {
          .about-top { grid-template-columns: 1fr; gap: 3rem; }
          .approach-steps { grid-template-columns: 1fr 1fr; gap: 2rem; }
          .approach-steps::before { display: none; }
        }
        @media (max-width: 500px) {
          .values-grid { grid-template-columns: 1fr; }
          .approach-steps { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="about-section" id="about">
        <div className="about-bg-glow" />
        <div className="about-inner">
          <div className="about-top">
            <div className="about-left">
              <span className="about-tagline">Who We Are</span>
              <h2 className="about-heading">
                We Build Digital<br />
                <span className="accent">Foundations</span> That Last
              </h2>
              <p className="about-body">
                CYMAK Technologies is a modern technology solutions company committed to helping businesses build secure, scalable, and future-ready digital environments.
              </p>
              <p className="about-body">
                We combine technical expertise, strategic thinking, and innovation to deliver solutions tailored to each client's unique business objectives. We don't just provide services — we become your long-term technology partner.
              </p>
              <div className="about-vision-box">
                <div className="vision-label">Our Vision</div>
                <p className="vision-text">
                  To become a trusted technology partner for businesses seeking secure, scalable, and innovative digital transformation solutions.
                </p>
              </div>
            </div>

            <div>
              <span className="values-section-label">Core Values</span>
              <div className="values-grid">
                {values.map(v => (
                  <div key={v.label} className="value-chip">
                    <span className="value-icon">{v.icon}</span>
                    <span className="value-name">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-approach">
            <div className="approach-header">
              <span className="section-label" style={{display:"block", textAlign:"center", fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#a78bfa", fontWeight:600, marginBottom:"0.75rem"}}>How We Work</span>
              <h3 className="section-title" style={{fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800, color:"#f0f0ff", letterSpacing:"-0.03em"}}>Our Structured Approach</h3>
            </div>
            <div className="approach-steps">
              {approach.map(s => (
                <div key={s.step} className="approach-step">
                  <div className="step-num-wrap">
                    <div className="step-num">{s.step}</div>
                  </div>
                  <div className="step-title">{s.title}</div>
                  <p className="step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
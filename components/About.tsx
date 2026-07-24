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
          background: #ffffff;
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
          color: #96701f;
          font-weight: 600;
          margin-bottom: 1.2rem;
          display: block;
        }
        .about-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          color: #12211b;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .about-heading .accent {
          color: #146c43;
        }
        .about-body {
          font-size: 1rem;
          color: rgba(18, 33, 27, 0.6);
          line-height: 1.8;
          font-weight: 400;
          margin-bottom: 1.2rem;
        }
        .about-vision-box {
          margin-top: 2rem;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid rgba(20, 108, 67, 0.18);
          background: #f5f8f6;
          position: relative;
          overflow: hidden;
        }
        .about-vision-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: #146c43;
        }
        .vision-label {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #146c43;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .vision-text {
          font-size: 0.95rem;
          color: rgba(18, 33, 27, 0.68);
          line-height: 1.7;
          font-style: italic;
          font-weight: 400;
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
          border: 1px solid rgba(18, 33, 27, 0.10);
          background: #f5f8f6;
          transition: all 0.22s;
        }
        .value-chip:hover {
          border-color: rgba(20, 108, 67, 0.30);
          background: #eef4f0;
        }
        .value-icon {
          font-size: 0.9rem;
          color: #146c43;
          flex-shrink: 0;
        }
        .value-name {
          font-family: 'Outfit', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(18, 33, 27, 0.75);
        }
        .values-section-label {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #96701f;
          font-weight: 600;
          margin-bottom: 1.5rem;
          display: block;
        }
        .about-approach {
          border-top: 1px solid rgba(18, 33, 27, 0.10);
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
          background: linear-gradient(90deg, transparent, rgba(18, 33, 27, 0.16), transparent);
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
          border: 1px solid rgba(20, 108, 67, 0.30);
          background: #e7f1ea;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: #146c43;
          position: relative;
          z-index: 2;
        }
        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #12211b;
          margin-bottom: 0.5rem;
        }
        .step-desc {
          font-size: 0.8rem;
          color: rgba(18, 33, 27, 0.5);
          line-height: 1.65;
          font-weight: 400;
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
              <span className="section-label" style={{display:"block", textAlign:"center", fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"#96701f", fontWeight:600, marginBottom:"0.75rem"}}>How We Work</span>
              <h3 className="section-title" style={{fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:900, color:"#12211b", letterSpacing:"-0.02em"}}>Our Structured Approach</h3>
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
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — CYMAK Technologies",
  description:
    "CYMAK Technologies is a professional technology solutions provider committed to delivering secure, scalable, and enterprise-grade digital services.",
};

const services = [
  {
    icon: "☁",
    title: "Cloud Migration & Infrastructure Solutions",
    desc: "Secure transition of on-premise systems to cloud environments with minimal disruption and optimized performance.",
    color: "#3b82f6",
  },
  {
    icon: "⚙",
    title: "IT Support & Systems Administration",
    desc: "Proactive monitoring, maintenance, and management of enterprise IT environments.",
    color: "#9333ea",
  },
  {
    icon: "⬡",
    title: "Web & Application Development",
    desc: "Development of secure, scalable, and performance-driven digital platforms.",
    color: "#d946ef",
  },
  {
    icon: "🛡",
    title: "Cybersecurity & Risk Management",
    desc: "Implementation of robust security frameworks to safeguard critical business assets.",
    color: "#7c3aed",
  },
  {
    icon: "◈",
    title: "Network Design & Implementation",
    desc: "Structured, secure, and scalable network infrastructure solutions.",
    color: "#2563eb",
  },
  {
    icon: "✦",
    title: "IT Strategy & Consulting",
    desc: "Advisory services to align technology investments with business objectives.",
    color: "#a855f7",
  },
];

const methodology = [
  {
    num: "01",
    title: "Assessment & Consultation",
    desc: "Comprehensive analysis of business requirements and technical environments.",
  },
  {
    num: "02",
    title: "Strategic Planning",
    desc: "Development of tailored, scalable solutions aligned with organizational goals.",
  },
  {
    num: "03",
    title: "Implementation & Integration",
    desc: "Deployment using industry best practices and compliance standards.",
  },
  {
    num: "04",
    title: "Ongoing Support & Optimization",
    desc: "Continuous monitoring and performance improvement post-deployment.",
  },
];

const commitments = [
  "Operational excellence",
  "Data security and compliance",
  "Transparent communication",
  "Timely project delivery",
  "Measurable business impact",
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        .about-page { min-height: 100vh; padding: 9rem 2rem 7rem; }
        .about-inner { max-width: 1100px; margin: 0 auto; }

        /* Hero */
        .ab-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-bottom: 7rem; }
        .ab-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.8rem; }
        .ab-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1.5rem; }
        .ab-title span {
          background: linear-gradient(135deg, #c084fc 0%, #e879f9 50%, #60a5fa 100%);
          background-size: 200% auto; -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 5s linear infinite;
        }
        @keyframes shimmer { 0% { background-position:0% center; } 100% { background-position:200% center; } }
        .ab-overview { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.58); line-height: 1.85; font-weight: 300; margin-bottom: 2rem; }
        .ab-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; border-radius: 8px;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600;
          text-decoration: none; box-shadow: 0 0 28px rgba(147,51,234,0.30); transition: all 0.3s;
        }
        .ab-cta:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(217,70,239,0.48); }

        /* Right card */
        .ab-hero-right { display: flex; flex-direction: column; gap: 1rem; }
        .ab-mv-card {
          padding: 2rem; border-radius: 14px;
          border: 1px solid rgba(168,85,247,0.16); background: rgba(9,9,26,0.85);
          position: relative; overflow: hidden; transition: border-color 0.3s;
        }
        .ab-mv-card:hover { border-color: rgba(217,70,239,0.35); }
        .ab-mv-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #9333ea, #d946ef, #3b82f6);
        }
        .ab-mv-tag { font-family: 'Outfit', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #e879f9; margin-bottom: 0.6rem; display: block; }
        .ab-mv-text { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.62); line-height: 1.78; font-weight: 300; }

        /* Section headings */
        .ab-section { margin-bottom: 5.5rem; }
        .ab-section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .ab-section-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(168,85,247,0.25), transparent); }
        .ab-section-title { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; white-space: nowrap; }

        /* Services grid */
        .ab-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; border: 1.5px solid rgba(168,85,247,0.13); border-radius: 16px; overflow: hidden; }
        .ab-service-card { padding: 2rem; background: rgba(9,9,26,0.85); transition: background 0.3s; position: relative; overflow: hidden; }
        .ab-service-card:hover { background: rgba(15,12,38,0.98); }
        .ab-service-icon { font-size: 1.4rem; margin-bottom: 1rem; display: block; filter: drop-shadow(0 0 8px var(--sc, #9333ea)); }
        .ab-service-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; line-height: 1.3; }
        .ab-service-desc { font-family: 'Outfit', sans-serif; font-size: 0.83rem; color: rgba(255,255,255,0.48); line-height: 1.72; font-weight: 300; }

        /* Methodology */
        .ab-method-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .ab-method-card { padding: 2rem; border-radius: 14px; border: 1px solid rgba(168,85,247,0.14); background: rgba(9,9,26,0.75); display: flex; gap: 1.5rem; align-items: flex-start; transition: border-color 0.3s; }
        .ab-method-card:hover { border-color: rgba(217,70,239,0.30); }
        .ab-method-num { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 900; line-height: 1; background: linear-gradient(135deg, #c084fc, #e879f9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; flex-shrink: 0; }
        .ab-method-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.45rem; }
        .ab-method-desc { font-family: 'Outfit', sans-serif; font-size: 0.855rem; color: rgba(255,255,255,0.50); line-height: 1.72; font-weight: 300; }

        /* Commitment */
        .ab-commit-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .ab-commit-text { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.58); line-height: 1.85; font-weight: 300; margin-bottom: 1.5rem; }
        .ab-commit-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .ab-commit-item { display: flex; align-items: center; gap: 0.85rem; font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.65); font-weight: 300; }
        .ab-commit-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg, #9333ea, #d946ef); flex-shrink: 0; box-shadow: 0 0 10px rgba(217,70,239,0.50); }
        .ab-commit-card { padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(217,70,239,0.22); background: rgba(147,51,234,0.06); text-align: center; }
        .ab-commit-card-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; line-height: 1.2; }
        .ab-commit-card-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.48); font-weight: 300; line-height: 1.75; margin-bottom: 1.75rem; }
        .ab-commit-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.82rem 1.75rem; border-radius: 8px;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600;
          text-decoration: none; box-shadow: 0 0 24px rgba(147,51,234,0.28); transition: all 0.3s;
        }
        .ab-commit-btn:hover { transform: translateY(-2px); box-shadow: 0 0 44px rgba(217,70,239,0.45); }

        @media (max-width: 900px) {
          .ab-hero { grid-template-columns: 1fr; gap: 3rem; }
          .ab-services-grid { grid-template-columns: 1fr 1fr; }
          .ab-method-grid { grid-template-columns: 1fr; }
          .ab-commit-wrap { grid-template-columns: 1fr; }
        }
        @media (max-width: 580px) {
          .ab-services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="about-page">
        <div className="about-inner">

          {/* Hero */}
          <div className="ab-hero">
            <div>
              <span className="ab-label">Who We Are</span>
              <h1 className="ab-title">
                Built on <span>Trust</span>,<br />Driven by Technology
              </h1>
              <p className="ab-overview">
                CYMAK Technologies is a professional technology solutions provider committed to delivering secure, scalable, and enterprise-grade digital services. We partner with organizations to modernize their IT infrastructure, enhance operational efficiency, and drive sustainable growth through strategic technology implementation.
              </p>
              <p className="ab-overview" style={{ marginBottom: "2rem" }}>
                Our approach combines technical expertise, industry best practices, and a strong commitment to service excellence.
              </p>
              <Link href="/#contact" className="ab-cta">Work With Us →</Link>
            </div>
            <div className="ab-hero-right">
              <div className="ab-mv-card">
                <span className="ab-mv-tag">Our Mission</span>
                <p className="ab-mv-text">
                  To provide reliable, secure, and innovative technology solutions that enable organizations to operate efficiently, remain competitive, and adapt confidently to a rapidly evolving digital landscape.
                </p>
              </div>
              <div className="ab-mv-card">
                <span className="ab-mv-tag">Our Vision</span>
                <p className="ab-mv-text">
                  To be a trusted technology partner recognized for integrity, technical excellence, and the consistent delivery of high-quality IT solutions across industries.
                </p>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div className="ab-section">
            <div className="ab-section-header">
              <h2 className="ab-section-title">Our Core Services</h2>
              <div className="ab-section-line" />
            </div>
            <div className="ab-services-grid">
              {services.map((s) => (
                <div key={s.title} className="ab-service-card" style={{ "--sc": s.color } as React.CSSProperties}>
                  <span className="ab-service-icon">{s.icon}</span>
                  <div className="ab-service-title">{s.title}</div>
                  <p className="ab-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="ab-section">
            <div className="ab-section-header">
              <h2 className="ab-section-title">Our Approach</h2>
              <div className="ab-section-line" />
            </div>
            <div className="ab-method-grid">
              {methodology.map((m) => (
                <div key={m.num} className="ab-method-card">
                  <div className="ab-method-num">{m.num}</div>
                  <div>
                    <div className="ab-method-title">{m.title}</div>
                    <p className="ab-method-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commitment */}
          <div className="ab-section">
            <div className="ab-section-header">
              <h2 className="ab-section-title">Our Commitment</h2>
              <div className="ab-section-line" />
            </div>
            <div className="ab-commit-wrap">
              <div>
                <p className="ab-commit-text">
                  At CYMAK Technologies, we prioritize delivering solutions that are not only technically sound but strategically valuable. Our focus is on long-term partnerships, not one-time engagements.
                </p>
                <div className="ab-commit-list">
                  {commitments.map((c) => (
                    <div key={c} className="ab-commit-item">
                      <div className="ab-commit-dot" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ab-commit-card">
                <div className="ab-commit-card-title">Ready to Partner With Us?</div>
                <p className="ab-commit-card-sub">
                  CYMAK Technologies stands ready to support organizations seeking dependable, enterprise-grade technology solutions. Let's navigate digital transformation together.
                </p>
                <Link href="/#contact" className="ab-commit-btn">Start a Conversation →</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
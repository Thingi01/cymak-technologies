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
    color: "#146c43",
  },
  {
    icon: "⚙",
    title: "IT Support & Systems Administration",
    desc: "Proactive monitoring, maintenance, and management of enterprise IT environments.",
    color: "#1d8a56",
  },
  {
    icon: "⬡",
    title: "Web & Application Development",
    desc: "Development of secure, scalable, and performance-driven digital platforms.",
    color: "#0d4c30",
  },
  {
    icon: "🛡",
    title: "Cybersecurity & Risk Management",
    desc: "Implementation of robust security frameworks to safeguard critical business assets.",
    color: "#96701f",
  },
  {
    icon: "◈",
    title: "Network Design & Implementation",
    desc: "Structured, secure, and scalable network infrastructure solutions.",
    color: "#146c43",
  },
  {
    icon: "✦",
    title: "IT Strategy & Consulting",
    desc: "Advisory services to align technology investments with business objectives.",
    color: "#96701f",
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
        .about-page { min-height: 100vh; padding: 9rem 2rem 7rem; background: #ffffff; }
        .about-inner { max-width: 1100px; margin: 0 auto; }

        /* Hero */
        .ab-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-bottom: 7rem; }
        .ab-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.8rem; }
        .ab-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; color: #12211b; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 1.5rem; }
        .ab-title span { color: #146c43; }
        .ab-overview { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.6); line-height: 1.85; font-weight: 400; margin-bottom: 2rem; }
        .ab-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.85rem 2rem; border-radius: 8px;
          background: #146c43;
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600;
          text-decoration: none; transition: background 0.22s;
        }
        .ab-cta:hover { background: #1d8a56; }

        /* Right card */
        .ab-hero-right { display: flex; flex-direction: column; gap: 1rem; }
        .ab-mv-card {
          padding: 2rem; border-radius: 14px;
          border: 1px solid rgba(18,33,27,0.10); background: #f5f8f6;
          position: relative; overflow: hidden; transition: border-color 0.25s;
        }
        .ab-mv-card:hover { border-color: rgba(20,108,67,0.30); }
        .ab-mv-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: #146c43;
        }
        .ab-mv-tag { font-family: 'Outfit', sans-serif; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #146c43; margin-bottom: 0.6rem; display: block; }
        .ab-mv-text { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.62); line-height: 1.78; font-weight: 400; }

        /* Section headings */
        .ab-section { margin-bottom: 5.5rem; }
        .ab-section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; }
        .ab-section-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(18,33,27,0.14), transparent); }
        .ab-section-title { font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 800; color: #12211b; letter-spacing: -0.02em; white-space: nowrap; }

        /* Services grid */
        .ab-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; overflow: hidden; background: rgba(18,33,27,0.10); }
        .ab-service-card { padding: 2rem; background: #ffffff; transition: background 0.25s; position: relative; overflow: hidden; }
        .ab-service-card:hover { background: #fbfdfc; }
        .ab-service-icon { font-size: 1.4rem; margin-bottom: 1rem; display: block; color: var(--sc, #146c43); }
        .ab-service-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #12211b; margin-bottom: 0.5rem; line-height: 1.3; }
        .ab-service-desc { font-family: 'Outfit', sans-serif; font-size: 0.83rem; color: rgba(18,33,27,0.55); line-height: 1.72; font-weight: 400; }

        /* Methodology */
        .ab-method-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .ab-method-card { padding: 2rem; border-radius: 14px; border: 1px solid rgba(18,33,27,0.10); background: #f5f8f6; display: flex; gap: 1.5rem; align-items: flex-start; transition: border-color 0.25s; }
        .ab-method-card:hover { border-color: rgba(20,108,67,0.30); }
        .ab-method-num { font-family: 'Playfair Display', serif; font-size: 2.4rem; font-weight: 900; line-height: 1; color: #146c43; flex-shrink: 0; }
        .ab-method-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #12211b; margin-bottom: 0.45rem; }
        .ab-method-desc { font-family: 'Outfit', sans-serif; font-size: 0.855rem; color: rgba(18,33,27,0.55); line-height: 1.72; font-weight: 400; }

        /* Commitment */
        .ab-commit-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .ab-commit-text { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.6); line-height: 1.85; font-weight: 400; margin-bottom: 1.5rem; }
        .ab-commit-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .ab-commit-item { display: flex; align-items: center; gap: 0.85rem; font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.68); font-weight: 400; }
        .ab-commit-dot { width: 8px; height: 8px; border-radius: 50%; background: #146c43; flex-shrink: 0; }
        .ab-commit-card { padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(20,108,67,0.20); background: #f5f8f6; text-align: center; }
        .ab-commit-card-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 800; color: #12211b; margin-bottom: 0.75rem; line-height: 1.2; }
        .ab-commit-card-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.55); font-weight: 400; line-height: 1.75; margin-bottom: 1.75rem; }
        .ab-commit-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.82rem 1.75rem; border-radius: 8px;
          background: #146c43;
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600;
          text-decoration: none; transition: background 0.22s;
        }
        .ab-commit-btn:hover { background: #1d8a56; }

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
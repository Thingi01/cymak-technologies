"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const services = [
    "Web Development", "SEO Optimization", "Graphic & Digital Design",
    "Systems & Infrastructure", "General Inquiry",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://formsubmit.co/ajax/cymaktechnologiesltd@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          message: form.message,
          _subject: `New enquiry from ${form.name} — CYMAK Website`,
        }),
      });
    } catch (_) { /* fail silently, still show success */ }
    setLoading(false);
    setForm({ name: "", email: "", service: "", message: "" });
    setPopup(true);
  };

  return (
    <>
      <style>{`
        .contact-section { padding: 7rem 2rem; position: relative; overflow: hidden; }
        .contact-glow {
          position: absolute; width: 600px; height: 400px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(147,51,234,0.10) 0%, transparent 70%);
          bottom: -100px; right: -80px; pointer-events: none;
        }
        .contact-inner {
          max-width: 1100px; margin: 0 auto; position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 6rem; align-items: start;
        }
        .c-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.8rem; }
        .c-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 900; color: #fff; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1rem; }
        .c-subtitle { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.50); line-height: 1.8; font-weight: 300; margin-bottom: 0; }

        .c-info-cards { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.85rem; }
        .c-info-card {
          display: flex; align-items: center; gap: 1rem; padding: 0.95rem 1.2rem;
          border-radius: 10px; border: 1px solid rgba(168,85,247,0.15); background: rgba(9,9,26,0.65);
          transition: border-color 0.25s;
        }
        .c-info-card:hover { border-color: rgba(217,70,239,0.30); }
        .c-icon-box {
          width: 38px; height: 38px; border-radius: 8px;
          background: rgba(147,51,234,0.14); border: 1px solid rgba(168,85,247,0.22);
          display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
        }
        .c-info-label { font-family: 'Outfit', sans-serif; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(232,121,249,0.60); font-weight: 600; margin-bottom: 0.15rem; }
        .c-info-value { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.72); font-weight: 400; }
        .c-info-value a { color: rgba(255,255,255,0.72); text-decoration: none; transition: color 0.2s; }
        .c-info-value a:hover { color: #e879f9; }

        .c-why { margin-top: 1.75rem; padding: 1.4rem; border-radius: 10px; border: 1px solid rgba(168,85,247,0.14); background: rgba(147,51,234,0.05); }
        .c-why-title { font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; color: #c084fc; margin-bottom: 0.85rem; }
        .c-why-item { display: flex; align-items: center; gap: 0.6rem; font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.48); margin-bottom: 0.55rem; font-weight: 300; }
        .c-why-dot { width: 5px; height: 5px; border-radius: 50%; background: linear-gradient(135deg,#c084fc,#e879f9); flex-shrink: 0; }

        /* Form */
        .c-form-wrap { background: rgba(9,9,26,0.75); border: 1px solid rgba(168,85,247,0.15); border-radius: 16px; padding: 2.5rem; }
        .cf-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem; letter-spacing: -0.02em; }
        .cf-sub { font-family: 'Outfit', sans-serif; font-size: 0.83rem; color: rgba(255,255,255,0.38); font-weight: 300; margin-bottom: 2rem; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cf-group { margin-bottom: 1.25rem; }
        .cf-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(192,132,252,0.60); font-weight: 600; margin-bottom: 0.45rem; }
        .cf-input, .cf-select, .cf-textarea {
          width: 100%; padding: 0.8rem 1rem; border-radius: 8px;
          border: 1px solid rgba(168,85,247,0.22); background: rgba(5,6,15,0.85);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 300;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; -webkit-appearance: none;
        }
        .cf-input::placeholder, .cf-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .cf-input:focus, .cf-select:focus, .cf-textarea:focus {
          border-color: rgba(217,70,239,0.48); box-shadow: 0 0 0 3px rgba(217,70,239,0.09);
        }
        .cf-select option { background: #0d0d22; color: #fff; }
        .cf-textarea { min-height: 115px; resize: vertical; }
        .cf-submit {
          width: 100%; padding: 0.9rem; border-radius: 8px; margin-top: 0.4rem;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.3s; letter-spacing: 0.02em;
          box-shadow: 0 0 32px rgba(147,51,234,0.28);
        }
        .cf-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 0 52px rgba(217,70,239,0.45); }
        .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Popup */
        .popup-overlay {
          position: fixed; inset: 0; background: rgba(5,6,15,0.80);
          backdrop-filter: blur(8px); z-index: 999;
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .popup-box {
          background: #0d0d22; border: 1px solid rgba(217,70,239,0.35);
          border-radius: 20px; padding: 3rem 2.5rem; text-align: center;
          max-width: 420px; width: 90%; position: relative;
          box-shadow: 0 0 80px rgba(147,51,234,0.30);
          animation: popIn 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popIn { from { opacity:0; transform:scale(0.88) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .popup-icon {
          font-size: 2.8rem; margin-bottom: 1rem;
          filter: drop-shadow(0 0 18px rgba(217,70,239,0.7));
          animation: floatIcon 2.5s ease-in-out infinite;
        }
        @keyframes floatIcon { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-7px); } }
        .popup-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
        .popup-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.52); font-weight: 300; line-height: 1.7; margin-bottom: 1.8rem; }
        .popup-close {
          padding: 0.7rem 2rem; border-radius: 8px;
          background: linear-gradient(135deg,#9333ea,#d946ef); color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600;
          border: none; cursor: pointer; transition: all 0.25s;
          box-shadow: 0 0 24px rgba(147,51,234,0.30);
        }
        .popup-close:hover { transform: translateY(-1px); box-shadow: 0 0 40px rgba(217,70,239,0.45); }
        .popup-dismiss { display: block; margin-top: 0.85rem; font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.28); cursor: pointer; transition: color 0.2s; }
        .popup-dismiss:hover { color: rgba(255,255,255,0.55); }

        @media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; gap: 3rem; } .cf-row { grid-template-columns: 1fr; } }
      `}</style>

      {/* Success popup */}
      {popup && (
        <div className="popup-overlay" onClick={() => setPopup(false)}>
          <div className="popup-box" onClick={e => e.stopPropagation()}>
            <div className="popup-icon">✦</div>
            <div className="popup-title">Message Sent!</div>
            <p className="popup-sub">
              Thank you for reaching out to CYMAK Technologies.<br />
              We'll get back to you within <strong>24 hours</strong>.
            </p>
            <button className="popup-close" onClick={() => setPopup(false)}>
              Perfect, thank you!
            </button>
            <span className="popup-dismiss" onClick={() => setPopup(false)}>Dismiss</span>
          </div>
        </div>
      )}

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-inner">
          {/* Left info */}
          <div>
            <span className="c-label">Get In Touch</span>
            <h2 className="c-title">Let's Build Something Great</h2>
            <p className="c-subtitle">Ready to transform your digital presence? Reach out and let's discuss how CYMAK Technologies can help your business grow.</p>

            <div className="c-info-cards">
              <div className="c-info-card">
                <div className="c-icon-box">✉</div>
                <div>
                  <div className="c-info-label">Email</div>
                  <div className="c-info-value"><a href="mailto:cymaktechnologiesltd@gmail.com">cymaktechnologiesltd@gmail.com</a></div>
                </div>
              </div>
              <div className="c-info-card">
                <div className="c-icon-box">📞</div>
                <div>
                  <div className="c-info-label">Phone / WhatsApp</div>
                  <div className="c-info-value"><a href="tel:+254740027395">+254 740 027 395</a></div>
                </div>
              </div>
              <div className="c-info-card">
                <div className="c-icon-box">🎵</div>
                <div>
                  <div className="c-info-label">TikTok</div>
                  <div className="c-info-value"><a href="https://www.tiktok.com/@cymakit" target="_blank" rel="noopener noreferrer">@cymakit</a></div>
                </div>
              </div>
              <div className="c-info-card">
                <div className="c-icon-box">⏱</div>
                <div>
                  <div className="c-info-label">Response Time</div>
                  <div className="c-info-value">Within 24 hours</div>
                </div>
              </div>
            </div>

            <div className="c-why">
              <div className="c-why-title">Why Choose CYMAK</div>
              {["Integrated IT solutions under one roof","Security-focused design approach","Scalable and future-ready systems","Client-centered, results-driven","Commitment to innovation & excellence"].map(i => (
                <div key={i} className="c-why-item"><div className="c-why-dot" />{i}</div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="c-form-wrap">
            <div className="cf-title">Start a Project</div>
            <div className="cf-sub">Fill in your details and we'll be in touch shortly.</div>
            <form onSubmit={handleSubmit}>
              <div className="cf-row">
                <div className="cf-group">
                  <label className="cf-label">Full Name</label>
                  <input className="cf-input" type="text" placeholder="John Doe" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="cf-group">
                  <label className="cf-label">Email Address</label>
                  <input className="cf-input" type="email" placeholder="you@company.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div className="cf-group">
                <label className="cf-label">Service Interested In</label>
                <select className="cf-select" value={form.service} onChange={e => setForm({...form, service: e.target.value})} required>
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="cf-group">
                <label className="cf-label">Tell Us About Your Project</label>
                <textarea className="cf-textarea" placeholder="Describe your project, goals, timeline, or any questions..." required value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button type="submit" className="cf-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
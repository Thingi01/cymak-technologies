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

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setForm({ name: "", email: "", service: "", message: "" });
      setPopup(true);
    } catch {
      setError("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-section { padding: 7rem 2rem; position: relative; overflow: hidden; background: #f5f8f6; }
        .contact-inner {
          max-width: 1100px; margin: 0 auto; position: relative; z-index: 2;
          display: grid; grid-template-columns: 1fr 1.3fr; gap: 6rem; align-items: start;
        }
        .c-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.8rem; }
        .c-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 900; color: #12211b; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1rem; }
        .c-subtitle { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.58); line-height: 1.8; font-weight: 400; margin-bottom: 0; }

        .c-info-cards { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.85rem; }
        .c-info-card {
          display: flex; align-items: center; gap: 1rem; padding: 0.95rem 1.2rem;
          border-radius: 10px; border: 1px solid rgba(18,33,27,0.10); background: #ffffff;
          transition: border-color 0.22s;
        }
        .c-info-card:hover { border-color: rgba(20,108,67,0.30); }
        .c-icon-box {
          width: 38px; height: 38px; border-radius: 8px;
          background: #e7f1ea; border: 1px solid rgba(20,108,67,0.20);
          display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0;
        }
        .c-info-label { font-family: 'Outfit', sans-serif; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.12em; color: #146c43; font-weight: 600; margin-bottom: 0.15rem; }
        .c-info-value { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(18,33,27,0.78); font-weight: 400; }
        .c-info-value a { color: rgba(18,33,27,0.78); text-decoration: none; transition: color 0.2s; }
        .c-info-value a:hover { color: #146c43; }

        .c-why { margin-top: 1.75rem; padding: 1.4rem; border-radius: 10px; border: 1px solid rgba(20,108,67,0.16); background: #eef4f0; }
        .c-why-title { font-family: 'Playfair Display', serif; font-size: 0.9rem; font-weight: 700; color: #146c43; margin-bottom: 0.85rem; }
        .c-why-item { display: flex; align-items: center; gap: 0.6rem; font-family: 'Outfit', sans-serif; font-size: 0.82rem; color: rgba(18,33,27,0.58); margin-bottom: 0.55rem; font-weight: 400; }
        .c-why-dot { width: 5px; height: 5px; border-radius: 50%; background: #146c43; flex-shrink: 0; }

        /* Form */
        .c-form-wrap { background: #ffffff; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; padding: 2.5rem; box-shadow: 0 4px 20px rgba(18,33,27,0.05); }
        .cf-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: #12211b; margin-bottom: 0.3rem; letter-spacing: -0.02em; }
        .cf-sub { font-family: 'Outfit', sans-serif; font-size: 0.83rem; color: rgba(18,33,27,0.45); font-weight: 400; margin-bottom: 2rem; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cf-group { margin-bottom: 1.25rem; }
        .cf-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(20,108,67,0.75); font-weight: 600; margin-bottom: 0.45rem; }
        .cf-input, .cf-select, .cf-textarea {
          width: 100%; padding: 0.8rem 1rem; border-radius: 8px;
          border: 1px solid rgba(18,33,27,0.16); background: #ffffff;
          color: #12211b; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 400;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s; -webkit-appearance: none;
        }
        .cf-input::placeholder, .cf-textarea::placeholder { color: rgba(18,33,27,0.30); }
        .cf-input:focus, .cf-select:focus, .cf-textarea:focus {
          border-color: rgba(20,108,67,0.55); box-shadow: 0 0 0 3px rgba(20,108,67,0.10);
        }
        .cf-select option { background: #ffffff; color: #12211b; }
        .cf-textarea { min-height: 115px; resize: vertical; }
        .cf-submit {
          width: 100%; padding: 0.9rem; border-radius: 8px; margin-top: 0.4rem;
          background: #146c43;
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.95rem; font-weight: 600;
          border: none; cursor: pointer; transition: background 0.22s; letter-spacing: 0.02em;
        }
        .cf-submit:hover:not(:disabled) { background: #1d8a56; }
        .cf-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Popup */
        .popup-overlay {
          position: fixed; inset: 0; background: rgba(18,33,27,0.55);
          backdrop-filter: blur(4px); z-index: 999;
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        .popup-box {
          background: #ffffff; border: 1px solid rgba(18,33,27,0.10);
          border-radius: 20px; padding: 3rem 2.5rem; text-align: center;
          max-width: 420px; width: 90%; position: relative;
          box-shadow: 0 20px 60px rgba(18,33,27,0.18);
          animation: popIn 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes popIn { from { opacity:0; transform:scale(0.88) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .popup-icon { font-size: 2.8rem; margin-bottom: 1rem; color: #146c43; }
        .popup-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: #12211b; margin-bottom: 0.5rem; }
        .popup-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.58); font-weight: 400; line-height: 1.7; margin-bottom: 1.8rem; }
        .popup-close {
          padding: 0.7rem 2rem; border-radius: 8px;
          background: #146c43; color: #fff;
          font-family: 'Outfit', sans-serif; font-size: 0.88rem; font-weight: 600;
          border: none; cursor: pointer; transition: background 0.22s;
        }
        .popup-close:hover { background: #1d8a56; }
        .popup-dismiss { display: block; margin-top: 0.85rem; font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(18,33,27,0.35); cursor: pointer; transition: color 0.2s; }
        .popup-dismiss:hover { color: rgba(18,33,27,0.6); }

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
              {error && (
                <p style={{ color: "#f87171", fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", marginBottom: "0.8rem" }}>
                  {error}
                </p>
              )}
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
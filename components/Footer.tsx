export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer { border-top: 1px solid rgba(168,85,247,0.12); padding: 5rem 2rem 2rem; position: relative; overflow: hidden; }
        .footer-glow {
          position: absolute; width: 600px; height: 300px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(147,51,234,0.07) 0%, transparent 70%);
          top: 0; left: 50%; transform: translateX(-50%); pointer-events: none;
        }
        .footer-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .footer-top { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }

        .footer-logo { display: flex; align-items: baseline; text-decoration: none; margin-bottom: 1rem; }
        .f-logo-cymak {
          font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 900;
          background: linear-gradient(135deg, #c084fc 0%, #e879f9 50%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: fLogoShimmer 5s linear infinite;
        }
        @keyframes fLogoShimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        .f-logo-tech {
          font-family: 'Outfit', sans-serif; font-size: 0.75rem; font-weight: 500;
          color: rgba(255,255,255,0.35); letter-spacing: 0.12em; text-transform: uppercase; margin-left: 7px;
        }
        .footer-tagline {
          font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.40);
          line-height: 1.78; font-weight: 300; max-width: 255px; margin-bottom: 1.75rem;
        }
        .footer-contact-mini { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .f-contact-item { display: flex; align-items: center; gap: 0.6rem; font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.38); font-weight: 300; }
        .f-contact-item a { color: rgba(255,255,255,0.38); text-decoration: none; transition: color 0.2s; }
        .f-contact-item a:hover { color: #e879f9; }

        .footer-socials { display: flex; gap: 0.65rem; }
        .f-social {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(168,85,247,0.18); background: rgba(9,9,26,0.65);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; color: rgba(192,132,252,0.55); text-decoration: none; transition: all 0.25s;
        }
        .f-social:hover { border-color: rgba(217,70,239,0.40); background: rgba(147,51,234,0.14); color: #fff; }

        .footer-col-title {
          font-family: 'Outfit', sans-serif; font-size: 0.70rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem;
        }
        .footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-links li a {
          font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.42);
          text-decoration: none; font-weight: 300; transition: color 0.22s, padding-left 0.22s;
          display: block;
        }
        .footer-links li a:hover { color: #c084fc; padding-left: 6px; }

        .cs-item { font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.22); font-weight: 300; display: flex; align-items: center; gap: 0.5rem; }
        .cs-pill { font-size: 0.55rem; padding: 0.12rem 0.5rem; border-radius: 100px; border: 1px dashed rgba(96,165,250,0.25); color: rgba(96,165,250,0.45); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }

        .footer-bottom { border-top: 1px solid rgba(168,85,247,0.10); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-copy { font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.28); font-weight: 300; }
        .footer-copy span { color: rgba(232,121,249,0.50); font-weight: 500; }
        .footer-badge { font-family: 'Outfit', sans-serif; font-size: 0.66rem; color: rgba(255,255,255,0.22); letter-spacing: 0.1em; text-transform: uppercase; }

        @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
        @media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }
      `}</style>

      <footer className="footer">
        <div className="footer-glow" />
        <div className="footer-inner">
          <div className="footer-top">

            {/* Brand */}
            <div>
              <a href="#home" className="footer-logo">
                <span className="f-logo-cymak">CYMAK</span>
                <span className="f-logo-tech">Technologies</span>
              </a>
              <p className="footer-tagline">
                Building secure, scalable, and future-ready digital foundations for businesses that demand excellence.
              </p>
              <div className="footer-contact-mini">
                <div className="f-contact-item">
                  <span>✉</span>
                  <a href="mailto:cymaktechnologiesltd@gmail.com">cymaktechnologiesltd@gmail.com</a>
                </div>
                <div className="f-contact-item">
                  <span>📞</span>
                  <a href="tel:+254740027395">+254 740 027 395</a>
                </div>
              </div>
              <div className="footer-socials">
                <a href="https://www.tiktok.com/@cymakit" target="_blank" rel="noopener noreferrer" className="f-social" title="TikTok @cymakit">
                  🎵
                </a>
              </div>
            </div>

            {/* Services — all point to #services section */}
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-links">
                <li><a href="#services">Web Development</a></li>
                <li><a href="#services">SEO Optimization</a></li>
                <li><a href="#services">Graphic Design</a></li>
                <li><a href="#services">Systems & Infrastructure</a></li>
              </ul>
            </div>

            {/* Company — each points to its own section */}
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Coming Soon — not clickable */}
            <div>
              <div className="footer-col-title">Coming Soon</div>
              <ul className="footer-links">
                <li><span className="cs-item">Cloud Solutions <span className="cs-pill">Soon</span></span></li>
                <li><span className="cs-item">Cybersecurity <span className="cs-pill">Soon</span></span></li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© {year} <span>CYMAK Technologies</span>. All rights reserved.</div>
            <div className="footer-badge">Secure · Scalable · Future-Ready</div>
          </div>
        </div>
      </footer>
    </>
  );
}
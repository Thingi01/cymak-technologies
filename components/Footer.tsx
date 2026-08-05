import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 5rem 2rem 2rem; position: relative; overflow: hidden; background: #0f1a15; }
        .footer-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; }
        .footer-top { display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }

        .footer-logo { display: flex; flex-direction: column; align-items: flex-start; text-decoration: none; margin-bottom: 1rem; gap: 0; line-height: 1; }
        .f-logo-cymak {
          font-family: 'Playfair Display', serif; font-size: 1.35rem; font-weight: 900;
          color: #ffffff;
        }
        .f-logo-tech {
          font-family: 'Outfit', sans-serif; font-size: 0.60rem; font-weight: 500;
          color: rgba(255,255,255,0.38); letter-spacing: 0.18em; text-transform: uppercase; line-height: 1;
        }
        .footer-tagline {
          font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.45);
          line-height: 1.78; font-weight: 400; max-width: 255px; margin-bottom: 1.75rem;
        }
        .footer-contact-mini { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
        .f-contact-item { display: flex; align-items: center; gap: 0.6rem; font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.42); font-weight: 400; }
        .f-contact-item a { color: rgba(255,255,255,0.42); text-decoration: none; transition: color 0.2s; }
        .f-contact-item a:hover { color: #6bbf94; }

        .footer-socials { display: flex; gap: 0.65rem; }
        .f-social {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; color: rgba(255,255,255,0.55); text-decoration: none; transition: all 0.22s;
        }
        .f-social:hover { border-color: rgba(29,138,86,0.55); background: rgba(29,138,86,0.14); color: #fff; }

        .footer-col-title {
          font-family: 'Outfit', sans-serif; font-size: 0.70rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 1.2rem;
        }
        .footer-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
        .footer-links li a {
          font-family: 'Outfit', sans-serif; font-size: 0.875rem; color: rgba(255,255,255,0.48);
          text-decoration: none; font-weight: 400; transition: color 0.22s, padding-left 0.22s;
          display: block;
        }
        .footer-links li a:hover { color: #6bbf94; padding-left: 6px; }


        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .footer-copy { font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(255,255,255,0.35); font-weight: 400; }
        .footer-copy span { color: rgba(107,191,148,0.85); font-weight: 500; }
        .footer-badge { font-family: 'Outfit', sans-serif; font-size: 0.66rem; color: rgba(255,255,255,0.28); letter-spacing: 0.1em; text-transform: uppercase; }
        .footer-legal-links { display: flex; align-items: center; gap: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 0.78rem; }
        .footer-legal-links a { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-legal-links a:hover { color: #6bbf94; }
        .footer-legal-sep { color: rgba(255,255,255,0.2); }

        @media (max-width: 900px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }
        @media (max-width: 480px) { .footer-top { grid-template-columns: 1fr; } }
      `}</style>

      <footer className="footer">
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
                <li><Link href="/about">About Us</Link></li>
                <li><a href="#projects">Projects</a></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© {year} <span>CYMAK Technologies</span>. All rights reserved.</div>
            <div className="footer-legal-links">
              <Link href="/privacy">Privacy Policy</Link>
              <span className="footer-legal-sep">·</span>
              <Link href="/terms">Terms of Service</Link>
            </div>
            <div className="footer-badge">Secure · Scalable · Future-Ready</div>
          </div>
        </div>
      </footer>
    </>
  );
}
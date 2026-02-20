"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const links = ["Services", "About", "Projects", "Blog", "Contact"];

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          transition: background 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav-root.scrolled {
          background: rgba(5, 6, 15, 0.90);
          backdrop-filter: blur(24px);
          border-color: rgba(168, 85, 247, 0.14);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          height: 72px; display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .nav-logo { display: flex; align-items: baseline; text-decoration: none; }
        .logo-cymak {
          font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 900;
          background: linear-gradient(135deg, #c084fc 0%, #e879f9 50%, #60a5fa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: logoShimmer 5s linear infinite;
        }
        .logo-tech {
          font-family: 'Outfit', sans-serif; font-size: 0.78rem; font-weight: 500;
          color: rgba(255,255,255,0.40); letter-spacing: 0.12em; text-transform: uppercase; margin-left: 7px;
        }
        @keyframes logoShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* Desktop links */
        .nav-links { display: flex; gap: 2.5rem; list-style: none; margin: 0; padding: 0; }
        .nav-links a {
          font-family: 'Outfit', sans-serif; font-size: 0.83rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: rgba(255,255,255,0.52); text-decoration: none; position: relative; transition: color 0.22s;
        }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #c084fc, #e879f9);
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-links a:hover { color: #fff; }
        .nav-links a:hover::after { width: 100%; }

        /* CTA */
        .nav-cta {
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 600;
          padding: 0.55rem 1.35rem; border-radius: 6px;
          border: 1px solid rgba(217,70,239,0.38); background: rgba(147,51,234,0.10);
          color: #c084fc; cursor: pointer; text-decoration: none; transition: all 0.25s; letter-spacing: 0.04em;
        }
        .nav-cta:hover {
          background: rgba(217,70,239,0.18); border-color: #e879f9; color: #fff;
          box-shadow: 0 0 22px rgba(217,70,239,0.28);
        }

        /* Hamburger */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; background: none; border: none;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: linear-gradient(90deg, #c084fc, #e879f9);
          border-radius: 2px; transition: all 0.3s;
        }

        /* ─── Mobile Menu ─── */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 72px; left: 0; right: 0;
          background: rgba(5, 6, 15, 0.97);
          backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(168, 85, 247, 0.15);
          z-index: 99;
          padding: 1.5rem 2rem 2rem;
          flex-direction: column;
          gap: 0;
          /* slide down animation */
          transform: translateY(-8px);
          opacity: 0;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
          pointer-events: none;
        }
        .mobile-menu.open {
          display: flex;
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Individual nav items */
        .mobile-menu .m-link {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(168, 85, 247, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s;
        }
        .mobile-menu .m-link:last-of-type { border-bottom: none; }
        .mobile-menu .m-link:hover { color: #e879f9; }
        .mobile-menu .m-link .m-arrow {
          font-size: 0.75rem;
          color: rgba(217, 70, 239, 0.40);
          transition: transform 0.2s, color 0.2s;
        }
        .mobile-menu .m-link:hover .m-arrow {
          transform: translateX(3px);
          color: #e879f9;
        }

        /* Mobile CTA */
        .mobile-menu .m-cta {
          margin-top: 1.25rem;
          display: block;
          text-align: center;
          padding: 0.82rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #9333ea, #d946ef);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.04em;
          box-shadow: 0 0 28px rgba(147,51,234,0.28);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .mobile-menu .m-cta:hover {
          box-shadow: 0 0 42px rgba(217,70,239,0.42);
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="logo-cymak">CYMAK</span>
            <span className="logo-tech">Technologies</span>
          </a>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>

          <a href="#contact" className="nav-cta">Get in Touch</a>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {links.map(l => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            className="m-link"
            onClick={() => setMenuOpen(false)}
          >
            {l}
            <span className="m-arrow">→</span>
          </a>
        ))}
        <a href="#contact" className="m-cta" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </a>
      </div>
    </>
  );
}
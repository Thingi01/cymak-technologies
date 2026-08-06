"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

  const links = ["Services", "About", "Projects", "Pricing", "Blog", "Contact"];

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          background: #ffffff;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .nav-root.scrolled {
          border-color: rgba(18, 33, 27, 0.08);
          box-shadow: 0 2px 16px rgba(18, 33, 27, 0.06);
        }
        .nav-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          height: 72px; display: flex; align-items: center; justify-content: space-between;
        }

        /* Logo */
        .nav-logo { display: flex; align-items: center; text-decoration: none; }
        .nav-logo img { height: 34px; width: auto; display: block; }

        /* Desktop links */
        .nav-links { display: flex; gap: 2.5rem; list-style: none; margin: 0; padding: 0; }
        .nav-links a {
          font-family: 'Outfit', sans-serif; font-size: 0.83rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: rgba(18,33,27,0.62); text-decoration: none; position: relative; transition: color 0.22s;
        }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: #146c43;
          transition: width 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .nav-links a:hover { color: #12211b; }
        .nav-links a:hover::after { width: 100%; }

        /* CTA */
        .nav-cta {
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 600;
          padding: 0.55rem 1.35rem; border-radius: 6px;
          border: 1px solid #146c43; background: #146c43;
          color: #fff; cursor: pointer; text-decoration: none; transition: all 0.22s; letter-spacing: 0.04em;
        }
        .nav-cta:hover {
          background: #1d8a56; border-color: #1d8a56;
        }

        /* Hamburger */
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 6px; background: none; border: none;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: #12211b;
          border-radius: 2px; transition: all 0.3s;
        }

        /* ─── Mobile Menu ─── */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 72px; left: 0; right: 0;
          background: #ffffff;
          border-bottom: 1px solid rgba(18, 33, 27, 0.10);
          box-shadow: 0 8px 24px rgba(18, 33, 27, 0.08);
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
          color: rgba(18, 33, 27, 0.68);
          text-decoration: none;
          padding: 0.9rem 0;
          border-bottom: 1px solid rgba(18, 33, 27, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s;
        }
        .mobile-menu .m-link:last-of-type { border-bottom: none; }
        .mobile-menu .m-link:hover { color: #146c43; }
        .mobile-menu .m-link .m-arrow {
          font-size: 0.75rem;
          color: rgba(20, 108, 67, 0.45);
          transition: transform 0.2s, color 0.2s;
        }
        .mobile-menu .m-link:hover .m-arrow {
          transform: translateX(3px);
          color: #146c43;
        }

        /* Mobile CTA */
        .mobile-menu .m-cta {
          margin-top: 1.25rem;
          display: block;
          text-align: center;
          padding: 0.82rem;
          border-radius: 8px;
          background: #146c43;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: background 0.22s;
        }
        .mobile-menu .m-cta:hover {
          background: #1d8a56;
        }

        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/images/logo.png" alt="CYMAK Technologies" width={136} height={42} priority />
          </Link>

          <ul className="nav-links">
            {links.map(l => (
              <li key={l}>
                {l === "Pricing" ? (
                  <Link href="/pricing">{l}</Link>
                ) : (
                  <a href={`/#${l.toLowerCase()}`}>{l}</a>
                )}
              </li>
            ))}
          </ul>

          <Link href="/#contact" className="nav-cta">Get in Touch</Link>

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
        {links.map(l =>
          l === "Pricing" ? (
            <Link key={l} href="/pricing" className="m-link" onClick={() => setMenuOpen(false)}>
              {l}
              <span className="m-arrow">→</span>
            </Link>
          ) : (
            <a
              key={l}
              href={`/#${l.toLowerCase()}`}
              className="m-link"
              onClick={() => setMenuOpen(false)}
            >
              {l}
              <span className="m-arrow">→</span>
            </a>
          )
        )}
        <Link href="/#contact" className="m-cta" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </Link>
      </div>
    </>
  );
}
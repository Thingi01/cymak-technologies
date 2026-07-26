import Image from "next/image";
import { prisma } from "@/lib/prisma";

async function getLiveProjectCount(): Promise<number> {
  try {
    const count = await prisma.project.count({ where: { published: true } });
    // Keep a sensible floor so the stat never looks worse than the
    // original static claim if the DB is empty or briefly unreachable.
    return count > 0 ? count : 5;
  } catch {
    return 5;
  }
}

interface ShowcaseProject {
  title: string;
  image: string;
  link: string | null;
}

async function getShowcaseProject(): Promise<ShowcaseProject | null> {
  try {
    // Prefer whatever's explicitly marked "Feature in homepage hero" in
    // /admin/projects. Falls back to the first published website/landing
    // page with an image, so the hero never looks broken if nothing's
    // been marked yet.
    const featured = await prisma.project.findFirst({
      where: {
        published: true,
        featured: true,
        image: { not: null },
        category: { in: ["WEBSITE", "LANDING_PAGE"] },
      },
      orderBy: { updatedAt: "desc" },
      select: { title: true, image: true, link: true },
    });
    if (featured) return { title: featured.title, image: featured.image as string, link: featured.link };

    const fallback = await prisma.project.findFirst({
      where: {
        published: true,
        image: { not: null },
        category: { in: ["WEBSITE", "LANDING_PAGE"] },
      },
      orderBy: { order: "asc" },
      select: { title: true, image: true, link: true },
    });
    if (fallback) return { title: fallback.title, image: fallback.image as string, link: fallback.link };

    return null;
  } catch {
    return null;
  }
}

function displayHostname(link: string | null): string {
  if (!link) return "your-project.com";
  try {
    return new URL(link).hostname;
  } catch {
    return link;
  }
}

export default async function Hero() {
  const [liveProjectCount, showcase] = await Promise.all([
    getLiveProjectCount(),
    getShowcaseProject(),
  ]);

  return (
    <>
      <style>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; background: #ffffff; }
        .hero-inner {
          position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 8rem 1.5rem 5rem;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3rem; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.38rem 1rem; border-radius: 100px;
          border: 1px solid rgba(20,108,67,0.22); background: #e7f1ea;
          font-family: 'Outfit', sans-serif; font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #146c43; margin-bottom: 1.5rem;
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #146c43; }
        .hero-h1 {
          font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5.5vw, 4.8rem); font-weight: 900;
          line-height: 1.04; letter-spacing: -0.02em; color: #12211b; margin-bottom: 1.5rem;
        }
        .hero-h1 .accent { color: #146c43; }
        .hero-sub {
          font-family: 'Outfit', sans-serif; font-size: clamp(0.95rem, 2vw, 1.05rem); font-weight: 400; line-height: 1.8;
          color: rgba(18,33,27,0.65); max-width: 480px; margin-bottom: 2.5rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
        .h-btn-primary {
          padding: 0.88rem 2rem; border-radius: 8px;
          background: #146c43;
          color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 600;
          text-decoration: none; border: none; cursor: pointer; transition: background 0.22s; letter-spacing: 0.02em;
        }
        .h-btn-primary:hover { background: #1d8a56; }
        .h-btn-secondary {
          padding: 0.88rem 2rem; border-radius: 8px; border: 1px solid rgba(18,33,27,0.18);
          background: transparent; color: #12211b;
          font-family: 'Outfit', sans-serif; font-size: 0.92rem; font-weight: 500;
          text-decoration: none; cursor: pointer; transition: all 0.22s;
        }
        .h-btn-secondary:hover { border-color: #146c43; color: #146c43; background: #f5f8f6; }
        .hero-stats {
          display: flex; gap: clamp(1.25rem, 4vw, 2.5rem); margin-top: 3.5rem; padding-top: 2rem;
          border-top: 1px solid rgba(18,33,27,0.10); flex-wrap: wrap;
        }
        .stat-num {
          font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 4vw, 2.2rem); font-weight: 800; line-height: 1;
          color: #146c43;
        }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 0.7rem; color: rgba(18,33,27,0.45); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.3rem; white-space: nowrap; }

        /* Featured-work browser-frame mockup */
        .hero-visual { display: flex; align-items: center; justify-content: center; width: 100%; }
        .frame-wrap { position: relative; width: 100%; max-width: 440px; }
        .frame-card {
          border-radius: 14px; overflow: hidden; background: #fff;
          border: 1px solid rgba(18,33,27,0.12);
          box-shadow: 0 16px 40px rgba(18,33,27,0.10);
        }
        .frame-chrome {
          display: flex; align-items: center; gap: 6px;
          padding: 0.6rem 0.85rem; background: #f5f8f6; border-bottom: 1px solid rgba(18,33,27,0.08);
        }
        .frame-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(18,33,27,0.14); flex-shrink: 0; }
        .frame-url {
          margin-left: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(18,33,27,0.4);
          background: #fff; border: 1px solid rgba(18,33,27,0.10); border-radius: 100px;
          padding: 0.2rem 0.75rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          flex: 1; min-width: 0;
        }
        .frame-shot { position: relative; width: 100%; aspect-ratio: 16 / 10; background: #f5f8f6; }
        .stack-caption { text-align: center; margin-top: 1rem; }
        .stack-caption-link {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Outfit', sans-serif; font-size: 0.85rem; font-weight: 600;
          color: #146c43; text-decoration: none; border-bottom: 1px solid rgba(20,108,67,0.30);
          padding-bottom: 2px; transition: border-color 0.2s;
        }
        .stack-caption-link:hover { border-color: #146c43; }
        .stack-caption-sub {
          margin-top: 0.4rem; font-family: 'Outfit', sans-serif; font-size: 0.74rem;
          color: #96701f; font-weight: 600; letter-spacing: 0.03em;
        }

        /* Fallback trust panel if no showcase project exists yet */
        .trust-card {
          width: 100%; max-width: 360px; background: #ffffff; border: 1px solid rgba(18,33,27,0.10);
          border-radius: 16px; padding: 2.25rem; box-shadow: 0 12px 32px rgba(18,33,27,0.06);
        }
        .trust-mark {
          width: 52px; height: 52px; border-radius: 50%; background: #146c43;
          display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;
        }
        .trust-mark span {
          font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.1rem; color: #fff;
        }
        .trust-title {
          font-family: 'Playfair Display', serif; font-weight: 800; font-size: 1.2rem; color: #12211b;
          margin-bottom: 1.4rem;
        }
        .trust-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
        .trust-list li {
          display: flex; align-items: flex-start; gap: 0.7rem;
          font-family: 'Outfit', sans-serif; font-size: 0.88rem; color: rgba(18,33,27,0.68); line-height: 1.5;
        }
        .trust-check {
          flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: #e7f1ea;
          color: #146c43; font-size: 0.7rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; margin-top: 0.1rem;
        }
        .trust-foot {
          margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(18,33,27,0.08);
          font-family: 'Outfit', sans-serif; font-size: 0.76rem; color: #96701f; font-weight: 600;
          letter-spacing: 0.04em;
        }

        /* Scroll cue */
        .scroll-cue {
          position: absolute; bottom: 1.25rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          text-decoration: none; z-index: 2;
        }
        .scroll-cue-label {
          font-family: 'Outfit', sans-serif; font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: rgba(18,33,27,0.38);
        }
        .scroll-cue-arrow {
          width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(18,33,27,0.16);
          display: flex; align-items: center; justify-content: center;
          color: rgba(18,33,27,0.4); font-size: 0.75rem;
          animation: scrollBounce 2s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-cue-arrow { animation: none; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; padding-bottom: 6rem; }
          .hero-sub { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
          .trust-card { text-align: left; }
          .frame-wrap { max-width: 400px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding: 7rem 1.25rem 5.5rem; }
          .frame-wrap { max-width: 320px; }
          .frame-chrome { padding: 0.5rem 0.65rem; gap: 4px; }
          .frame-dot { width: 6px; height: 6px; }
          .frame-url { font-size: 0.64rem; padding: 0.15rem 0.6rem; }
        }
        @media (max-width: 400px) {
          .hero-stats { gap: 1.1rem; }
          .frame-wrap { max-width: 260px; }
        }
        @media (max-width: 480px) {
          .scroll-cue { display: none; }
        }
      `}</style>

      <section className="hero" id="home">
        <div className="hero-inner">
          <div data-reveal>
            <div className="hero-badge"><div className="badge-dot" />Technology Solutions Partner</div>
            <h1 className="hero-h1">
              Build Digital Foundations<br />That <span className="accent">Drive Growth</span>
            </h1>
            <p className="hero-sub">
              CYMAK Technologies delivers secure, scalable, and future-ready digital solutions — from web development to graphic design and SEO optimization.
            </p>
            <div className="hero-actions">
              <a href="#services" className="h-btn-primary">Explore Services</a>
              <a href="#contact" className="h-btn-secondary">Start a Project →</a>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">{liveProjectCount}+</div><div className="stat-label">Live Projects</div></div>
              <div><div className="stat-num">24hr</div><div className="stat-label">Response Time</div></div>
              <div><div className="stat-num">4</div><div className="stat-label">Core Services</div></div>
            </div>
          </div>

          <div className="hero-visual" data-reveal data-reveal-delay="2">
            {showcase ? (
              <div className="frame-wrap">
                <div className="frame-card">
                  <div className="frame-chrome">
                    <div className="frame-dot" />
                    <div className="frame-dot" />
                    <div className="frame-dot" />
                    <div className="frame-url">{displayHostname(showcase.link)}</div>
                  </div>
                  <div className="frame-shot">
                    <Image src={showcase.image} alt={showcase.title} fill sizes="(max-width: 640px) 320px, 440px" style={{ objectFit: "cover" }} />
                  </div>
                </div>
                <div className="stack-caption">
                  <a href="#projects" className="stack-caption-link">See all our work →</a>
                  <div className="stack-caption-sub">Based in Nairobi, Kenya</div>
                </div>
              </div>
            ) : (
              <div className="trust-card">
                <div className="trust-mark"><span>CYM</span></div>
                <div className="trust-title">Why businesses work with us</div>
                <ul className="trust-list">
                  <li><span className="trust-check">✓</span>Secure, production-ready builds from day one</li>
                  <li><span className="trust-check">✓</span>SEO-optimized for Kenyan and East African search</li>
                  <li><span className="trust-check">✓</span>Direct support — no ticketing queues or call centers</li>
                </ul>
                <div className="trust-foot">Based in Nairobi, Kenya</div>
              </div>
            )}
          </div>
        </div>

        <a href="#services" className="scroll-cue">
          <span className="scroll-cue-label">Scroll</span>
          <span className="scroll-cue-arrow">↓</span>
        </a>
      </section>
    </>
  );
}
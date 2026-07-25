import { prisma } from "@/lib/prisma";
import HeroProjectStack from "@/components/HeroProjectStack";

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

interface FeaturedProject {
  id: string;
  title: string;
  image: string;
}

async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true, image: { not: null } },
      orderBy: { order: "asc" },
      take: 12,
      select: { id: true, title: true, image: true },
    });
    // image is guaranteed non-null by the where clause above.
    return rows.map((r) => ({ id: r.id, title: r.title, image: r.image as string }));
  } catch {
    return [];
  }
}

export default async function Hero() {
  const [liveProjectCount, featuredProjects] = await Promise.all([
    getLiveProjectCount(),
    getFeaturedProjects(),
  ]);

  return (
    <>
      <style>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; background: #ffffff; }
        .hero-inner {
          position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; padding: 8rem 2rem 5rem;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; align-items: center;
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
          font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 5.5vw, 4.8rem); font-weight: 900;
          line-height: 1.04; letter-spacing: -0.02em; color: #12211b; margin-bottom: 1.5rem;
        }
        .hero-h1 .accent { color: #146c43; }
        .hero-sub {
          font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 400; line-height: 1.8;
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
          display: flex; gap: 2.5rem; margin-top: 3.5rem; padding-top: 2rem;
          border-top: 1px solid rgba(18,33,27,0.10);
        }
        .stat-num {
          font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 800; line-height: 1;
          color: #146c43;
        }
        .stat-label { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(18,33,27,0.45); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.3rem; }

        /* Featured-work stack — real client screenshots, fanned like a deck */
        .hero-visual { display: flex; align-items: center; justify-content: center; }
        .stack-wrap { position: relative; width: 100%; max-width: 340px; height: 340px; }
        .stack-card {
          position: absolute; inset: 0; border-radius: 14px; overflow: hidden;
          background: #f5f8f6; border: 1px solid rgba(18,33,27,0.10);
          box-shadow: 0 16px 40px rgba(18,33,27,0.10);
          transition: transform 0.3s var(--ease-out, ease);
        }
        .stack-card-0 { transform: rotate(-6deg) translate(-14px, 6px); z-index: 3; }
        .stack-card-1 { transform: rotate(3deg) translate(10px, -8px); z-index: 2; }
        .stack-card-2 { transform: rotate(9deg) translate(28px, -18px); z-index: 1; opacity: 0.9; }
        .stack-card.stack-fading { opacity: 0; transition: opacity 0.35s ease; }
        .stack-card:not(.stack-fading) { transition: opacity 0.35s ease, transform 0.3s var(--ease-out, ease); }
        .stack-wrap:hover .stack-card-0 { transform: rotate(-3deg) translate(-18px, 2px); }
        .stack-wrap:hover .stack-card-1 { transform: rotate(1deg) translate(14px, -12px); }
        .stack-wrap:hover .stack-card-2 { transform: rotate(6deg) translate(34px, -24px); }
        .stack-caption {
          position: absolute; left: 50%; bottom: -3.2rem; transform: translateX(-50%);
          width: max-content; max-width: 280px; text-align: center;
        }
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

        /* Fallback trust panel if no project images exist yet */
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
          position: absolute; bottom: 1.75rem; left: 50%; transform: translateX(-50%);
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

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; padding-bottom: 6rem; }
          .hero-sub { margin: 0 auto 2.5rem; }
          .hero-actions { justify-content: center; }
          .hero-stats { justify-content: center; }
          .trust-card { text-align: left; }
          .stack-wrap { margin-top: 2.5rem; }
          .stack-caption { bottom: -3rem; }
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
            {featuredProjects.length >= 2 ? (
              <HeroProjectStack projects={featuredProjects} />
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
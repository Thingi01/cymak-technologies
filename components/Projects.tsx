import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
// Fallback content used only if the DB has no rows yet (e.g. fresh install
// before running the seed script) so the site never renders an empty section.
const fallbackWebProjects = [
  {
    id: "fallback-01", type: "Full Website", title: "Mush Tech Solution",
    description: "Corporate website for a Nairobi-based advanced security & IT services company. Features service listings, product gallery, WhatsApp CTA, and contact integration.",
    tags: ["HTML/CSS", "JavaScript", "Responsive", "WhatsApp API"],
    link: "https://mushtechsolution-website.vercel.app/",
  },
  {
    id: "fallback-02", type: "Portfolio Website", title: "Cyrus Maina — Developer Portfolio",
    description: "Personal portfolio site showcasing development skills, projects, and professional profile. Clean, modern design built for career growth.",
    tags: ["React", "JavaScript", "Responsive", "Vercel"],
    link: "https://my-portifolio-cyrus.vercel.app/",
  },
  {
    id: "fallback-03", type: "Full Website", title: "Saferon Systems Limited",
    description: "Corporate site for a 30+ year veteran in electronic security and IT solutions in Nairobi. Built to reflect institutional trust and extensive service offerings.",
    tags: ["HTML/CSS", "Responsive", "Multi-section", "Vercel"],
    link: "https://saferon-systemsltd.vercel.app/",
  },
];

const fallbackLandingPages = [
  {
    id: "fallback-04", type: "Landing Page", title: "LUXURE — Black November Drop",
    description: "High-converting luxury fashion landing page with countdown timer, product showcase, and flash sale mechanics for a limited drop campaign.",
    tags: ["HTML/CSS/JS", "Countdown Timer", "E-commerce UX", "Conversion Optimized"],
    link: "https://luxury-landing-page-teal.vercel.app/",
  },
  {
    id: "fallback-05", type: "Landing Page", title: "TechDeals — Dell XPS 13 Product Page",
    description: "Single-product sales landing page for the Dell XPS 13 9380. Clean spec breakdown, trust signals, and direct purchase CTA optimized for conversions.",
    tags: ["HTML/CSS/JS", "Product Page", "Sales Focused", "Mobile-Ready"],
    link: "https://tech-deals-alpha.vercel.app/",
  },
];

const fallbackDesignSamples = [
  {
    id: "fallback-d1", title: "Event Flyer",
    description: "Bold, eye-catching event flyer designed for maximum social media engagement and shareability.",
    image: "/images/designs/mtlongonot.png",
  },
  {
    id: "fallback-d2", title: "Promotional Poster",
    description: "High-impact promotional poster crafted to communicate offers clearly and drive audience action.",
    image: "/images/designs/marketing.png",
  },
  {
    id: "fallback-d3", title: "Social Media Flyer",
    description: "Clean, branded social media flyer optimized for Instagram and Facebook with strong visual hierarchy.",
    image: "/images/designs/mushtech.png",
  },
  {
    id: "fallback-d4", title: "Digital Poster",
    description: "Professional digital poster designed to build brand presence and capture attention across platforms.",
    image: "/images/designs/ack.png",
  },
];

async function getProjectsByCategory() {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    return {
      webProjects: rows.filter((r) => r.category === "WEBSITE"),
      landingPages: rows.filter((r) => r.category === "LANDING_PAGE"),
      designSamples: rows.filter((r) => r.category === "DESIGN"),
    };
  } catch {
    // DB not configured yet — fall back to static content rather than crash.
    return { webProjects: [], landingPages: [], designSamples: [] };
  }
}

export default async function Projects() {
  const dbData = await getProjectsByCategory();

  const webProjects = dbData.webProjects.length ? dbData.webProjects : fallbackWebProjects;
  const landingPages = dbData.landingPages.length ? dbData.landingPages : fallbackLandingPages;
  const designSamples = dbData.designSamples.length ? dbData.designSamples : fallbackDesignSamples;

  return (
    <>
      <style>{`
        .projects-section { padding: 7rem 2rem; position: relative; background: #ffffff; }
        .projects-inner { max-width: 1200px; margin: 0 auto; }
        .p-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 4rem; gap: 2rem; flex-wrap: wrap; }
        .p-label { font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.7rem; display: block; }
        .p-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; color: #12211b; letter-spacing: -0.02em; line-height: 1.1; }
        .cat-label {
          display: flex; align-items: center; gap: 0.75rem;
          font-family: 'Outfit', sans-serif; font-size: 0.70rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; color: rgba(18,33,27,0.45);
          margin-bottom: 1.5rem; margin-top: 3.5rem;
        }
        .cat-label::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(18,33,27,0.14), transparent); }

        /* Project cards */
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; overflow: hidden; background: rgba(18,33,27,0.10); }
        .proj-grid-2 { grid-template-columns: repeat(2, 1fr); }
        .proj-card { padding: 2.5rem; background: #ffffff; position: relative; overflow: hidden; transition: background 0.25s; display: flex; flex-direction: column; }
        .proj-card:hover { background: #fbfdfc; }
        .proj-num { font-family: 'Playfair Display', serif; font-size: 3.8rem; font-weight: 900; color: rgba(20,108,67,0.06); position: absolute; top: 1.2rem; right: 1.5rem; line-height: 1; transition: color 0.3s; }
        .proj-card:hover .proj-num { color: rgba(20,108,67,0.10); }
        .proj-type { font-family: 'Outfit', sans-serif; font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; color: #146c43; font-weight: 600; margin-bottom: 0.9rem; display: flex; align-items: center; gap: 0.5rem; }
        .proj-type::before { content: ''; width: 18px; height: 1px; background: #146c43; display: inline-block; }
        .proj-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; color: #12211b; margin-bottom: 0.7rem; line-height: 1.25; }
        .proj-desc { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: rgba(18,33,27,0.58); line-height: 1.78; font-weight: 400; margin-bottom: 1.5rem; flex: 1; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .proj-tag { font-family: 'Outfit', sans-serif; font-size: 0.64rem; padding: 0.24rem 0.65rem; border-radius: 100px; background: #e7f1ea; border: 1px solid rgba(20,108,67,0.18); color: #146c43; letter-spacing: 0.05em; font-weight: 500; }
        .proj-link { display: inline-flex; align-items: center; gap: 0.4rem; font-family: 'Outfit', sans-serif; font-size: 0.78rem; font-weight: 500; color: #146c43; text-decoration: none; border: 1px solid rgba(20,108,67,0.25); border-radius: 6px; padding: 0.38rem 0.85rem; transition: all 0.22s; width: fit-content; }
        .proj-link:hover { color: #fff; border-color: #146c43; background: #146c43; }
        .p-start-link { font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: #146c43; text-decoration: none; border: 1px solid rgba(20,108,67,0.28); padding: 0.58rem 1.2rem; border-radius: 6px; font-weight: 500; transition: all 0.22s; }
        .p-start-link:hover { color: #fff; background: #146c43; border-color: #146c43; }

        /* Design image cards */
        .design-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .design-card {
          aspect-ratio: 3/4; border-radius: 12px;
          border: 1px solid rgba(18,33,27,0.12);
          background: #f5f8f6;
          overflow: hidden; position: relative;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.35s;
        }
        .design-card:hover { border-color: rgba(20,108,67,0.35); transform: translateY(-6px); box-shadow: 0 16px 40px rgba(18,33,27,0.12); }
        .design-card img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .design-card:hover img { transform: scale(1.06); }
        .design-placeholder {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-family: 'Outfit', sans-serif; font-size: 0.78rem; color: rgba(18,33,27,0.35);
          background: #eef4f0;
        }
        .design-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(18,33,27,0.92) 0%, rgba(18,33,27,0.55) 55%, transparent 100%);
          opacity: 0.12; transition: opacity 0.3s;
        }
        .design-card:hover .design-overlay { opacity: 1; }
        .design-info {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 1.2rem 1rem 1rem;
          transform: translateY(10px); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .design-card:hover .design-info { transform: translateY(0); }
        .design-info-num { font-family: 'Outfit', sans-serif; font-size: 0.60rem; font-weight: 700; color: #d9b978; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 0.25rem; }
        .design-info-label { font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 600; color: #ffffff; line-height: 1.35; margin-bottom: 0.3rem; }
        .design-info-desc { font-family: 'Outfit', sans-serif; font-size: 0.72rem; font-weight: 400; color: rgba(255,255,255,0.75); line-height: 1.5; }

        @media (max-width: 900px) {
          .proj-grid, .proj-grid-2 { grid-template-columns: 1fr; }
          .design-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .design-grid { grid-template-columns: 1fr 1fr; } }
      `}</style>

      <section className="projects-section" id="projects">
        <div className="projects-inner">
          <div className="p-header">
            <div>
              <span className="p-label">Our Work</span>
              <h2 className="p-title">Live Projects</h2>
            </div>
            <a href="#contact" className="p-start-link">
              Start a Project →
            </a>
          </div>

          <div className="cat-label">Websites</div>
          <div className="proj-grid">
            {webProjects.map((p, i) => (
              <div key={p.id} className="proj-card">
                <div className="proj-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="proj-type">{p.type}</div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">↗ View Live Site</a>}
              </div>
            ))}
          </div>

          <div className="cat-label">Landing Pages</div>
          <div className="proj-grid proj-grid-2">
            {landingPages.map((p, i) => (
              <div key={p.id} className="proj-card">
                <div className="proj-num">{String(webProjects.length + i + 1).padStart(2, "0")}</div>
                <div className="proj-type">{p.type}</div>
                <div className="proj-title">{p.title}</div>
                <p className="proj-desc">{p.description}</p>
                <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
                {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-link">↗ View Live Page</a>}
              </div>
            ))}
          </div>

          <div className="cat-label">Sample Graphic Design</div>
          <div className="design-grid">
            {designSamples.map((d, i) => (
              <div key={d.id} className="design-card">
                {d.image ? (
                  <img src={d.image} alt={d.title} />
                ) : (
                  <div className="design-placeholder">No image yet</div>
                )}
                <div className="design-overlay" />
                <div className="design-info">
                  <div className="design-info-num">D{i + 1}</div>
                  <div className="design-info-label">{d.title}</div>
                  <div className="design-info-desc">{d.description}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
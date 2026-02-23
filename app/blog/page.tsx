import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — CYMAK Technologies",
  description: "Insights on web development, SEO, graphic design, and digital strategy from CYMAK Technologies.",
};

const categoryColors: Record<string, string> = {
  "Web Development": "#9333ea",
  "SEO Optimization": "#2563eb",
  "Graphic Design": "#d946ef",
  "Systems & Infrastructure": "#7c3aed",
  "General": "#6366f1",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <style>{`
        .blog-page { min-height: 100vh; padding: 9rem 2rem 7rem; }
        .blog-page-inner { max-width: 1100px; margin: 0 auto; }

        /* Header */
        .bp-header { margin-bottom: 4rem; }
        .bp-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.8rem; }
        .bp-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 1rem; }
        .bp-sub { font-family: 'Outfit', sans-serif; font-size: 1.05rem; color: rgba(255,255,255,0.50); font-weight: 300; line-height: 1.75; max-width: 520px; }

        /* Grid */
        .bp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; border: 1.5px solid rgba(168,85,247,0.13); border-radius: 16px; overflow: hidden; }

        /* Card */
        .bp-card {
          padding: 2.2rem; background: rgba(9,9,26,0.85);
          display: flex; flex-direction: column; gap: 0;
          text-decoration: none; position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .bp-card:hover { background: rgba(15,12,38,0.98); }
        .bp-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--cc, #9333ea), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .bp-card:hover::after { opacity: 1; }

        .bp-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
        .bp-cat {
          font-family: 'Outfit', sans-serif; font-size: 0.64rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #e879f9; font-weight: 600;
          padding: 0.22rem 0.65rem; border-radius: 100px;
          border: 1px solid rgba(217,70,239,0.25); background: rgba(217,70,239,0.08);
        }
        .bp-date { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.30); font-weight: 300; }
        .bp-card-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #fff; line-height: 1.3; letter-spacing: -0.01em; margin-bottom: 0.85rem; }
        .bp-card-excerpt { font-family: 'Outfit', sans-serif; font-size: 0.845rem; color: rgba(255,255,255,0.48); line-height: 1.75; font-weight: 300; flex: 1; margin-bottom: 1.5rem; }
        .bp-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .bp-read { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(192,132,252,0.55); font-weight: 500; letter-spacing: 0.06em; display: flex; align-items: center; gap: 0.4rem; }
        .bp-read::before { content: ''; display: inline-block; width: 16px; height: 1px; background: rgba(192,132,252,0.40); }
        .bp-arrow { font-size: 0.9rem; color: rgba(217,70,239,0); transition: all 0.25s; transform: translateX(-4px); font-family: 'Outfit', sans-serif; }
        .bp-card:hover .bp-arrow { color: rgba(232,121,249,0.70); transform: translateX(0); }

        /* Empty state */
        .bp-empty { text-align: center; padding: 5rem 2rem; border: 1px dashed rgba(168,85,247,0.20); border-radius: 16px; }
        .bp-empty-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: rgba(255,255,255,0.50); margin-bottom: 0.5rem; }
        .bp-empty-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.28); font-weight: 300; }

        @media (max-width: 900px) { .bp-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .bp-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="blog-page">
        <div className="blog-page-inner">
          <div className="bp-header">
            <span className="bp-label">Insights & Articles</span>
            <h1 className="bp-title">The CYMAK Blog</h1>
            <p className="bp-sub">Practical insights on web development, SEO, design, and digital strategy — written for business owners and decision makers.</p>
          </div>

          {posts.length === 0 ? (
            <div className="bp-empty">
              <div className="bp-empty-title">Posts coming soon</div>
              <p className="bp-empty-sub">Add .mdx files to content/blog/ to publish articles.</p>
            </div>
          ) : (
            <div className="bp-grid">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bp-card"
                  style={{ "--cc": categoryColors[post.category] || "#9333ea" } as React.CSSProperties}
                >
                  <div className="bp-card-top">
                    <span className="bp-cat">{post.category}</span>
                    <span className="bp-date">{new Date(post.date).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="bp-card-title">{post.title}</div>
                  <p className="bp-card-excerpt">{post.excerpt}</p>
                  <div className="bp-card-footer">
                    <span className="bp-read">{post.readTime}</span>
                    <span className="bp-arrow">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
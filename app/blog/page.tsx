import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — CYMAK Technologies",
  description: "Insights on web development, SEO, graphic design, and digital strategy from CYMAK Technologies.",
};

const categoryColors: Record<string, string> = {
  "Web Development": "#146c43",
  "SEO Optimization": "#0d4c30",
  "Graphic Design": "#96701f",
  "Systems & Infrastructure": "#1d8a56",
  "General": "#146c43",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <style>{`
        .blog-page { min-height: 100vh; padding: 9rem 2rem 7rem; background: #ffffff; }
        .blog-page-inner { max-width: 1100px; margin: 0 auto; }

        /* Header */
        .bp-header { margin-bottom: 4rem; }
        .bp-label { display: block; font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #96701f; font-weight: 600; margin-bottom: 0.8rem; }
        .bp-title { font-family: 'Playfair Display', serif; font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 900; color: #12211b; letter-spacing: -0.02em; line-height: 1.05; margin-bottom: 1rem; }
        .bp-sub { font-family: 'Outfit', sans-serif; font-size: 1.05rem; color: rgba(18,33,27,0.55); font-weight: 400; line-height: 1.75; max-width: 520px; }

        /* Grid */
        .bp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; border: 1px solid rgba(18,33,27,0.10); border-radius: 16px; overflow: hidden; background: rgba(18,33,27,0.10); }

        /* Card */
        .bp-card {
          padding: 2.2rem; background: #ffffff;
          display: flex; flex-direction: column; gap: 0;
          text-decoration: none; position: relative; overflow: hidden;
          transition: background 0.25s;
        }
        .bp-card:hover { background: #fbfdfc; }
        .bp-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--cc, #146c43);
          opacity: 0; transition: opacity 0.25s;
        }
        .bp-card:hover::after { opacity: 1; }

        .bp-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
        .bp-cat {
          font-family: 'Outfit', sans-serif; font-size: 0.64rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--cc, #146c43); font-weight: 600;
          padding: 0.22rem 0.65rem; border-radius: 100px;
          border: 1px solid color-mix(in srgb, var(--cc, #146c43) 35%, transparent);
          background: color-mix(in srgb, var(--cc, #146c43) 10%, white);
        }
        .bp-date { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(18,33,27,0.38); font-weight: 400; }
        .bp-card-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: #12211b; line-height: 1.3; letter-spacing: -0.01em; margin-bottom: 0.85rem; }
        .bp-card-excerpt { font-family: 'Outfit', sans-serif; font-size: 0.845rem; color: rgba(18,33,27,0.55); line-height: 1.75; font-weight: 400; flex: 1; margin-bottom: 1.5rem; }
        .bp-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .bp-read { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(18,33,27,0.42); font-weight: 500; letter-spacing: 0.06em; display: flex; align-items: center; gap: 0.4rem; }
        .bp-read::before { content: ''; display: inline-block; width: 16px; height: 1px; background: rgba(18,33,27,0.25); }
        .bp-arrow { font-size: 0.9rem; color: transparent; transition: all 0.22s; transform: translateX(-4px); font-family: 'Outfit', sans-serif; }
        .bp-card:hover .bp-arrow { color: var(--cc, #146c43); transform: translateX(0); }

        /* Empty state */
        .bp-empty { text-align: center; padding: 5rem 2rem; border: 1px dashed rgba(18,33,27,0.16); border-radius: 16px; }
        .bp-empty-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; color: rgba(18,33,27,0.55); margin-bottom: 0.5rem; }
        .bp-empty-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.35); font-weight: 400; }

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
              <p className="bp-empty-sub">Publish your first article from /admin/posts.</p>
            </div>
          ) : (
            <div className="bp-grid">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bp-card"
                  style={{ "--cc": categoryColors[post.category] || "#146c43" } as React.CSSProperties}
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
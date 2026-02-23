import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Blog() {
  // Show latest 3 posts on homepage
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <style>{`
        .blog-section { padding: 7rem 2rem; position: relative; border-top: 1px solid rgba(168,85,247,0.08); }
        .blog-inner { max-width: 1200px; margin: 0 auto; }
        .blog-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3.5rem; flex-wrap: wrap; gap: 1.5rem; }
        .b-label { font-family: 'Outfit', sans-serif; font-size: 0.70rem; letter-spacing: 0.22em; text-transform: uppercase; color: #e879f9; font-weight: 600; margin-bottom: 0.75rem; display: block; }
        .b-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; color: #fff; letter-spacing: -0.02em; line-height: 1.1; }
        .b-view-all {
          font-family: 'Outfit', sans-serif; font-size: 0.85rem; color: rgba(232,121,249,0.65);
          text-decoration: none; border: 1px solid rgba(217,70,239,0.22);
          padding: 0.58rem 1.2rem; border-radius: 6px; font-weight: 500; transition: all 0.25s; white-space: nowrap;
        }
        .b-view-all:hover { color: #fff; border-color: rgba(217,70,239,0.50); background: rgba(217,70,239,0.08); }

        /* Cards grid */
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px; border: 1.5px solid rgba(168,85,247,0.13); border-radius: 16px; overflow: hidden; }
        .blog-card {
          padding: 2.2rem; background: rgba(9,9,26,0.85); text-decoration: none;
          display: flex; flex-direction: column; position: relative; overflow: hidden; transition: background 0.3s;
        }
        .blog-card:hover { background: rgba(15,12,38,0.98); }
        .blog-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #d946ef, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .blog-card:hover::after { opacity: 1; }

        .bc-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
        .bc-cat {
          font-family: 'Outfit', sans-serif; font-size: 0.64rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #e879f9; font-weight: 600;
          padding: 0.22rem 0.65rem; border-radius: 100px;
          border: 1px solid rgba(217,70,239,0.25); background: rgba(217,70,239,0.08);
        }
        .bc-date { font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(255,255,255,0.28); font-weight: 300; }
        .bc-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: #fff; line-height: 1.32; letter-spacing: -0.01em; margin-bottom: 0.85rem; }
        .bc-excerpt { font-family: 'Outfit', sans-serif; font-size: 0.845rem; color: rgba(255,255,255,0.48); line-height: 1.75; font-weight: 300; margin-bottom: 1.5rem; flex: 1; }
        .bc-footer { display: flex; align-items: center; justify-content: space-between; }
        .bc-read {
          font-family: 'Outfit', sans-serif; font-size: 0.72rem; color: rgba(192,132,252,0.55);
          font-weight: 500; display: flex; align-items: center; gap: 0.4rem;
        }
        .bc-read::before { content: ''; display: inline-block; width: 16px; height: 1px; background: rgba(192,132,252,0.40); }
        .bc-arrow { font-size: 0.9rem; color: rgba(217,70,239,0); transition: all 0.25s; transform: translateX(-4px); }
        .blog-card:hover .bc-arrow { color: rgba(232,121,249,0.70); transform: translateX(0); }

        /* Empty fallback */
        .blog-empty {
          grid-column: 1 / -1; padding: 4rem; text-align: center;
          font-family: 'Outfit', sans-serif; color: rgba(255,255,255,0.28); font-weight: 300; font-size: 0.9rem;
        }

        @media (max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 580px) { .blog-grid { grid-template-columns: 1fr; } .blog-card { padding: 1.75rem; } }
      `}</style>

      <section className="blog-section" id="blog">
        <div className="blog-inner">
          <div className="blog-header">
            <div>
              <span className="b-label">Insights</span>
              <h2 className="b-title">From the Blog</h2>
            </div>
            <Link href="/blog" className="b-view-all">View All Posts →</Link>
          </div>

          <div className="blog-grid">
            {posts.length === 0 ? (
              <div className="blog-empty">Blog posts coming soon. Add .mdx files to content/blog/</div>
            ) : (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="bc-top">
                    <span className="bc-cat">{post.category}</span>
                    <span className="bc-date">
                      {new Date(post.date).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <div className="bc-title">{post.title}</div>
                  <p className="bc-excerpt">{post.excerpt}</p>
                  <div className="bc-footer">
                    <span className="bc-read">{post.readTime}</span>
                    <span className="bc-arrow">→</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
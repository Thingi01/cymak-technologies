const posts = [
  {
    category: "Cybersecurity",
    title: "5 Critical Security Practices Every Business Should Implement in 2025",
    excerpt: "Cyber threats are evolving faster than ever. Here are the foundational security measures your business can't afford to ignore.",
    date: "Feb 2025",
    read: "5 min read",
    color: "#7c3aed",
  },
  {
    category: "Cloud Solutions",
    title: "When Should Your Business Move to the Cloud?",
    excerpt: "Cloud migration is a strategic decision. We break down the key signals that indicate your organization is ready to make the move.",
    date: "Jan 2025",
    read: "4 min read",
    color: "#3b82f6",
  },
  {
    category: "Web Development",
    title: "Why Performance-First Web Design Drives Real Business Results",
    excerpt: "A slow website doesn't just frustrate users — it costs you revenue. Here's how performance-first development changes the game.",
    date: "Jan 2025",
    read: "6 min read",
    color: "#8b5cf6",
  },
];

export default function Blog() {
  return (
    <>
      <style>{`
        .blog-section {
          padding: 7rem 2rem;
          position: relative;
          border-top: 1px solid rgba(139, 92, 246, 0.08);
        }
        .blog-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5px;
          border: 1.5px solid rgba(139, 92, 246, 0.12);
          border-radius: 16px;
          overflow: hidden;
        }
        .blog-card {
          padding: 2.5rem;
          background: rgba(10, 12, 28, 0.8);
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
          cursor: pointer;
          text-decoration: none;
          display: block;
        }
        .blog-card:hover { background: rgba(18, 14, 40, 0.95); }
        .blog-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--blog-color, #7c3aed), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .blog-card:hover::after { opacity: 1; }
        .blog-cat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .blog-cat {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          border: 1px solid rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.08);
        }
        .blog-date {
          font-size: 0.72rem;
          color: rgba(140, 140, 160, 0.4);
          font-weight: 300;
        }
        .blog-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0f0ff;
          line-height: 1.35;
          margin-bottom: 0.9rem;
          letter-spacing: -0.01em;
        }
        .blog-excerpt {
          font-size: 0.845rem;
          color: rgba(160, 160, 180, 0.55);
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 1.5rem;
        }
        .blog-read {
          font-size: 0.72rem;
          color: rgba(167, 139, 250, 0.5);
          letter-spacing: 0.06em;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .blog-read::before {
          content: '';
          display: inline-block;
          width: 16px; height: 1px;
          background: rgba(167, 139, 250, 0.4);
        }
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .blog-card { padding: 1.75rem; }
        }
      `}</style>

      <section className="blog-section" id="blog">
        <div className="blog-inner">
          <div className="blog-header">
            <div>
              <span style={{display:"block",fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#a78bfa",fontWeight:600,marginBottom:"0.75rem"}}>Insights</span>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,color:"#f0f0ff",letterSpacing:"-0.03em",lineHeight:1.1}}>From the Blog</h2>
            </div>
            <a href="#" style={{fontSize:"0.875rem",color:"rgba(167,139,250,0.7)",textDecoration:"none",border:"1px solid rgba(139,92,246,0.25)",padding:"0.6rem 1.2rem",borderRadius:"6px",fontWeight:500}}>
              View All Posts →
            </a>
          </div>

          <div className="blog-grid">
            {posts.map(post => (
              <a
                key={post.title}
                href="#"
                className="blog-card"
                style={{ "--blog-color": post.color } as React.CSSProperties}
              >
                <div className="blog-cat-row">
                  <span className="blog-cat">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                </div>
                <div className="blog-title">{post.title}</div>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-read">{post.read}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
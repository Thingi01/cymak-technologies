import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

// ✅ Next.js 15+: params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — CYMAK Technologies`,
    description: post.excerpt,
  };
}

function parseInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/s);
    const italicMatch = remaining.match(/^(.*?)\*(.+?)\*/s);
    const codeMatch = remaining.match(/^(.*?)`(.+?)`/s);
    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)/s);

    const matches = [
      boldMatch && { type: "bold", match: boldMatch },
      italicMatch && { type: "italic", match: italicMatch },
      codeMatch && { type: "code", match: codeMatch },
      linkMatch && { type: "link", match: linkMatch },
    ]
      .filter(Boolean)
      .sort((a: any, b: any) => a.match[1].length - b.match[1].length);

    if (matches.length === 0) {
      result.push(<span key={keyIdx++}>{remaining}</span>);
      break;
    }

    const first = matches[0] as any;
    const { type, match } = first;

    if (match[1]) result.push(<span key={keyIdx++}>{match[1]}</span>);

    if (type === "bold")
      result.push(<strong key={keyIdx++}>{match[2]}</strong>);
    else if (type === "italic")
      result.push(<em key={keyIdx++}>{match[2]}</em>);
    else if (type === "code")
      result.push(<code key={keyIdx++} className="inline-code">{match[2]}</code>);
    else if (type === "link")
      result.push(<Link key={keyIdx++} href={match[3]} className="prose-link">{match[2]}</Link>);

    remaining = remaining.slice(match[0].length);
  }

  return result;
}

function RenderContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="prose-h3">{parseInline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="prose-h2">{parseInline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="prose-h1">{parseInline(line.slice(2))}</h1>);
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="prose-ul">
          {items.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ul>
      );
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="prose-ol">
          {items.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ol>
      );
      continue;
    } else if (line.trim() === "---") {
      elements.push(<hr key={i} className="prose-hr" />);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="prose-blockquote">
          {parseInline(line.slice(2))}
        </blockquote>
      );
    } else if (line.trim() !== "") {
      elements.push(<p key={i} className="prose-p">{parseInline(line)}</p>);
    }

    i++;
  }

  return <div className="prose">{elements}</div>;
}

// ✅ async component + await params
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        .post-page { min-height: 100vh; padding: 9rem 2rem 7rem; }
        .post-inner { max-width: 740px; margin: 0 auto; }

        .post-back {
          display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 3rem;
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: rgba(192,132,252,0.60); text-decoration: none; letter-spacing: 0.04em;
          transition: color 0.2s, gap 0.2s;
        }
        .post-back:hover { color: #e879f9; gap: 0.75rem; }

        .post-cat {
          display: inline-flex; align-items: center;
          font-family: 'Outfit', sans-serif; font-size: 0.66rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #e879f9;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          border: 1px solid rgba(217,70,239,0.28); background: rgba(217,70,239,0.08);
          margin-bottom: 1.5rem;
        }
        .post-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 900;
          color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 1.5rem;
        }
        .post-meta {
          display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
          padding-bottom: 2rem; border-bottom: 1px solid rgba(168,85,247,0.14);
          margin-bottom: 3rem;
        }
        .post-meta-item {
          font-family: 'Outfit', sans-serif; font-size: 0.8rem;
          color: rgba(255,255,255,0.38); font-weight: 300;
        }
        .post-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(217,70,239,0.40); flex-shrink: 0; }

        .prose-h1 { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 800; color: #fff; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; line-height: 1.15; }
        .prose-h2 { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 800; color: #fff; margin: 2.5rem 0 0.85rem; letter-spacing: -0.02em; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(168,85,247,0.12); line-height: 1.2; }
        .prose-h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: rgba(255,255,255,0.88); margin: 1.75rem 0 0.6rem; line-height: 1.3; }
        .prose-p { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.62); line-height: 1.85; font-weight: 300; margin-bottom: 1.35rem; }
        .prose-ul { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.58); line-height: 1.8; font-weight: 300; margin: 0.5rem 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.45rem; }
        .prose-ol { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.58); line-height: 1.8; font-weight: 300; margin: 0.5rem 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.45rem; }
        .prose-ul li::marker { color: #e879f9; }
        .prose-ol li::marker { color: #c084fc; font-weight: 600; }
        .prose-hr { border: none; border-top: 1px solid rgba(168,85,247,0.15); margin: 3rem 0; }
        .prose-blockquote { border-left: 3px solid #d946ef; padding: 0.75rem 1.25rem; background: rgba(217,70,239,0.06); border-radius: 0 8px 8px 0; margin: 1.5rem 0; font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(255,255,255,0.62); font-style: italic; font-weight: 300; }
        .inline-code { font-family: 'Courier New', monospace; font-size: 0.875rem; background: rgba(147,51,234,0.15); border: 1px solid rgba(168,85,247,0.22); color: #c084fc; padding: 0.15rem 0.45rem; border-radius: 4px; }
        .prose-link { color: #a78bfa; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
        .prose-link:hover { color: #e879f9; }
        .prose strong { font-weight: 600; color: rgba(255,255,255,0.90); }
        .prose em { font-style: italic; color: rgba(255,255,255,0.70); }

        .post-cta { margin-top: 4rem; padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(217,70,239,0.20); background: rgba(147,51,234,0.06); text-align: center; }
        .post-cta-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
        .post-cta-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.48); font-weight: 300; margin-bottom: 1.5rem; line-height: 1.7; }
        .post-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.82rem 2rem; border-radius: 8px; background: linear-gradient(135deg, #9333ea, #d946ef); color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600; text-decoration: none; box-shadow: 0 0 30px rgba(147,51,234,0.28); transition: all 0.3s; }
        .post-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(217,70,239,0.45); }
      `}</style>

      <div className="post-page">
        <div className="post-inner">
          <Link href="/blog" className="post-back">← Back to Blog</Link>

          <div className="post-cat">{post.category}</div>
          <h1 className="post-title">{post.title}</h1>

          <div className="post-meta">
            <span className="post-meta-item">📅 {formattedDate}</span>
            <span className="post-meta-sep" />
            <span className="post-meta-item">⏱ {post.readTime}</span>
            <span className="post-meta-sep" />
            <span className="post-meta-item">✍ {post.author}</span>
          </div>

          <RenderContent content={post.content} />

          <div className="post-cta">
            <div className="post-cta-title">Ready to Work Together?</div>
            <p className="post-cta-sub">
              Let's discuss how CYMAK Technologies can help your business grow.
            </p>
            <Link href="/#contact" className="post-cta-btn">Get in Touch →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
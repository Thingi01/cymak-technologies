import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

// ✅ Next.js 15+: params is a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
    const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/^(.*?)\*(.+?)\*/);
    const codeMatch = remaining.match(/^(.*?)`(.+?)`/);
    const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)/);

    type InlineMatch = { type: "bold" | "italic" | "code" | "link"; match: RegExpMatchArray };

    const matches: InlineMatch[] = (
      [
        boldMatch && { type: "bold" as const, match: boldMatch },
        italicMatch && { type: "italic" as const, match: italicMatch },
        codeMatch && { type: "code" as const, match: codeMatch },
        linkMatch && { type: "link" as const, match: linkMatch },
      ].filter(Boolean) as InlineMatch[]
    ).sort((a, b) => a.match[1].length - b.match[1].length);

    if (matches.length === 0) {
      result.push(<span key={keyIdx++}>{remaining}</span>);
      break;
    }

    const { type, match } = matches[0];

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
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        .post-page { min-height: 100vh; padding: 9rem 2rem 7rem; background: #ffffff; }
        .post-inner { max-width: 740px; margin: 0 auto; }

        .post-back {
          display: inline-flex; align-items: center; gap: 0.5rem; margin-bottom: 3rem;
          font-family: 'Outfit', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: #146c43; text-decoration: none; letter-spacing: 0.04em;
          transition: color 0.2s, gap 0.2s;
        }
        .post-back:hover { color: #1d8a56; gap: 0.75rem; }

        .post-cat {
          display: inline-flex; align-items: center;
          font-family: 'Outfit', sans-serif; font-size: 0.66rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase; color: #146c43;
          padding: 0.25rem 0.75rem; border-radius: 100px;
          border: 1px solid rgba(20,108,67,0.24); background: #e7f1ea;
          margin-bottom: 1.5rem;
        }
        .post-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3rem); font-weight: 900;
          color: #12211b; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1.5rem;
        }
        .post-meta {
          display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;
          padding-bottom: 2rem; border-bottom: 1px solid rgba(18,33,27,0.10);
          margin-bottom: 3rem;
        }
        .post-meta-item {
          font-family: 'Outfit', sans-serif; font-size: 0.8rem;
          color: rgba(18,33,27,0.45); font-weight: 400;
        }
        .post-meta-sep { width: 3px; height: 3px; border-radius: 50%; background: rgba(18,33,27,0.25); flex-shrink: 0; }
        .post-featured-img { position: relative; width: 100%; aspect-ratio: 16/9; border-radius: 14px; overflow: hidden; margin: -1rem 0 3rem; background: #eef4f0; border: 1px solid rgba(18,33,27,0.08); }

        .prose-h1 { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 800; color: #12211b; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; line-height: 1.15; }
        .prose-h2 { font-family: 'Playfair Display', serif; font-size: 1.45rem; font-weight: 800; color: #12211b; margin: 2.5rem 0 0.85rem; letter-spacing: -0.02em; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(18,33,27,0.10); line-height: 1.2; }
        .prose-h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: rgba(18,33,27,0.85); margin: 1.75rem 0 0.6rem; line-height: 1.3; }
        .prose-p { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.68); line-height: 1.85; font-weight: 400; margin-bottom: 1.35rem; }
        .prose-ul { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.65); line-height: 1.8; font-weight: 400; margin: 0.5rem 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.45rem; }
        .prose-ol { font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.65); line-height: 1.8; font-weight: 400; margin: 0.5rem 0 1.5rem 1.5rem; display: flex; flex-direction: column; gap: 0.45rem; }
        .prose-ul li::marker { color: #146c43; }
        .prose-ol li::marker { color: #146c43; font-weight: 600; }
        .prose-hr { border: none; border-top: 1px solid rgba(18,33,27,0.12); margin: 3rem 0; }
        .prose-blockquote { border-left: 3px solid #146c43; padding: 0.75rem 1.25rem; background: #f5f8f6; border-radius: 0 8px 8px 0; margin: 1.5rem 0; font-family: 'Outfit', sans-serif; font-size: 1rem; color: rgba(18,33,27,0.68); font-style: italic; font-weight: 400; }
        .inline-code { font-family: 'Courier New', monospace; font-size: 0.875rem; background: #e7f1ea; border: 1px solid rgba(20,108,67,0.20); color: #146c43; padding: 0.15rem 0.45rem; border-radius: 4px; }
        .prose-link { color: #146c43; text-decoration: underline; text-underline-offset: 3px; transition: color 0.2s; }
        .prose-link:hover { color: #1d8a56; }
        .prose strong { font-weight: 600; color: rgba(18,33,27,0.92); }
        .prose em { font-style: italic; color: rgba(18,33,27,0.75); }

        .post-cta { margin-top: 4rem; padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(20,108,67,0.18); background: #f5f8f6; text-align: center; }
        .post-cta-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 800; color: #12211b; margin-bottom: 0.6rem; }
        .post-cta-sub { font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: rgba(18,33,27,0.55); font-weight: 400; margin-bottom: 1.5rem; line-height: 1.7; }
        .post-cta-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.82rem 2rem; border-radius: 8px; background: #146c43; color: #fff; font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 600; text-decoration: none; transition: background 0.22s; }
        .post-cta-btn:hover { background: #1d8a56; }
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

          {post.coverImage && (
            <div className="post-featured-img">
              <Image src={post.coverImage} alt={post.title} fill sizes="740px" style={{ objectFit: "cover" }} priority />
            </div>
          )}

          <RenderContent content={post.content} />

          <div className="post-cta">
            <div className="post-cta-title">Ready to Work Together?</div>
            <p className="post-cta-sub">
              Let&apos;s discuss how CYMAK Technologies can help your business grow.
            </p>
            <Link href="/#contact" className="post-cta-btn">Get in Touch →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
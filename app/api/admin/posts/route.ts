import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const { title, slug, excerpt, content, category, readTime, author, coverImage, published } = body;

  if (!title || !slug || !excerpt || !content) {
    return NextResponse.json({ error: "title, slug, excerpt, and content are required" }, { status: 400 });
  }

  const normalizedSlug = slugify(slug);

  const existing = await prisma.blogPost.findUnique({ where: { slug: normalizedSlug } });
  if (existing) {
    return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug: normalizedSlug,
      excerpt,
      content,
      category: category || "General",
      readTime: readTime || "3 min read",
      author: author || "CYMAK Technologies",
      coverImage: coverImage || null,
      published: Boolean(published),
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json({ post }, { status: 201 });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { title, slug, excerpt, content, category, readTime, author, coverImage, published } = body;

  const normalizedSlug = slug ? slugify(slug) : existing.slug;
  if (normalizedSlug !== existing.slug) {
    const clash = await prisma.blogPost.findUnique({ where: { slug: normalizedSlug } });
    if (clash) return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
  }

  const willPublishNow = Boolean(published) && !existing.published;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      slug: normalizedSlug,
      excerpt: excerpt ?? existing.excerpt,
      content: content ?? existing.content,
      category: category ?? existing.category,
      readTime: readTime ?? existing.readTime,
      author: author ?? existing.author,
      coverImage: coverImage ?? existing.coverImage,
      published: published ?? existing.published,
      publishedAt: willPublishNow ? new Date() : existing.publishedAt,
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

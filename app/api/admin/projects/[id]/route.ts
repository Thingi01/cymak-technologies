import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteUploadedImage } from "@/lib/upload";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { category, type, title, description, tags, image, link, order, published, featured, logo } = body;

  const project = await prisma.project.update({
    where: { id },
    data: {
      category: category ?? existing.category,
      type: type ?? existing.type,
      title: title ?? existing.title,
      description: description ?? existing.description,
      tags: Array.isArray(tags) ? tags.map(String) : existing.tags,
      image: image === undefined ? existing.image : image,
      link: link === undefined ? existing.link : link,
      order: typeof order === "number" ? order : existing.order,
      published: published ?? existing.published,
      featured: featured === undefined ? existing.featured : Boolean(featured),
      logo: logo === undefined ? existing.logo : logo,
    },
  });

  return NextResponse.json({ project });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.project.delete({ where: { id } });

  // Best-effort cleanup of the associated blob so storage doesn't accumulate
  // orphaned files.
  if (existing.image) {
    void deleteUploadedImage(existing.image);
  }

  return NextResponse.json({ ok: true });
}
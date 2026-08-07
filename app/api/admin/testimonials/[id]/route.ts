import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteUploadedImage } from "@/lib/upload";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ testimonial });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { clientName, role, company, quote, photo, published, order } = body;

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      clientName: clientName ?? existing.clientName,
      role: role === undefined ? existing.role : role || null,
      company: company ?? existing.company,
      quote: quote ?? existing.quote,
      photo: photo === undefined ? existing.photo : photo,
      published: published ?? existing.published,
      order: typeof order === "number" ? order : existing.order,
    },
  });

  return NextResponse.json({ testimonial });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.testimonial.delete({ where: { id } });

  if (existing.photo) {
    void deleteUploadedImage(existing.photo);
  }

  return NextResponse.json({ ok: true });
}
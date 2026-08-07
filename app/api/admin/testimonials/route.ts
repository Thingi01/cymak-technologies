import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const { clientName, role, company, quote, photo, published, order } = body;

  if (!clientName || !company || !quote) {
    return NextResponse.json({ error: "clientName, company, and quote are required" }, { status: 400 });
  }

  const testimonial = await prisma.testimonial.create({
    data: {
      clientName,
      role: role || null,
      company,
      quote,
      photo: photo || null,
      published: published === undefined ? true : Boolean(published),
      order: typeof order === "number" ? order : 0,
    },
  });

  return NextResponse.json({ testimonial }, { status: 201 });
}
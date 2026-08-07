import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_CATEGORIES = ["WEBSITE", "LANDING_PAGE", "DESIGN"];

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });

  const { category, type, title, description, tags, image, link, order, published, featured, logo } = body;
  if (!category || !VALID_CATEGORIES.includes(category) || !type || !title) {
    return NextResponse.json(
      { error: `category (one of ${VALID_CATEGORIES.join(", ")}), type, and title are required` },
      { status: 400 }
    );
  }

  const project = await prisma.project.create({
    data: {
      category,
      type,
      title,
      description: description || "",
      tags: Array.isArray(tags) ? tags.map(String) : [],
      image: image || null,
      link: link || null,
      order: typeof order === "number" ? order : 0,
      published: published === undefined ? true : Boolean(published),
      featured: Boolean(featured),
      logo: logo || null,
    },
  });

  return NextResponse.json({ project }, { status: 201 });
}
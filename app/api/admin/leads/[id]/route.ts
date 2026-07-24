import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };
const VALID_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"];

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body?.status || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: `status must be one of ${VALID_STATUSES.join(", ")}` }, { status: 400 });
  }

  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const lead = await prisma.contactSubmission.update({
    where: { id },
    data: { status: body.status },
  });

  return NextResponse.json({ lead });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const existing = await prisma.contactSubmission.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.contactSubmission.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

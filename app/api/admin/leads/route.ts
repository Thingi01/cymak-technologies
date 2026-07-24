import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const leads = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}

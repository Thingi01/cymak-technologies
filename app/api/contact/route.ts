import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, service, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !isValidEmail(email) ||
    typeof service !== "string" || !service.trim() ||
    typeof message !== "string" || !message.trim()
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  if (name.length > 200 || email.length > 200 || service.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "One or more fields exceed the allowed length" }, { status: 400 });
  }

  const lead = await prisma.contactSubmission.create({
    data: {
      name: name.trim(),
      email: email.trim(),
      service: service.trim(),
      message: message.trim(),
    },
  });

  // Fire-and-forget email notifications — a slow/failed email should never
  // block the form submission from succeeding, the lead is already saved.
  void sendLeadNotification({ name: lead.name, email: lead.email, service: lead.service, message: lead.message });
  void sendLeadConfirmation({ name: lead.name, email: lead.email, service: lead.service, message: lead.message });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

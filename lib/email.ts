import { Resend } from "resend";

const COMPANY_EMAIL = process.env.COMPANY_NOTIFY_EMAIL || "cymaktechnologiesltd@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "CYMAK Technologies <onboarding@resend.dev>";

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

interface LeadNotificationInput {
  name: string;
  email: string;
  service: string;
  message: string;
}

/**
 * Notify the company that a new lead came in via the contact form.
 * Fails silently (logs a warning) if RESEND_API_KEY isn't configured or
 * the send fails — a lead is already saved to the DB either way.
 */
export async function sendLeadNotification(lead: LeadNotificationInput) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping lead notification email");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: COMPANY_EMAIL,
      replyTo: lead.email,
      subject: `New enquiry from ${lead.name} — CYMAK Website`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
          <p><strong>Service:</strong> ${escapeHtml(lead.service)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send lead notification:", err);
  }
}

/** Optional confirmation email back to the person who submitted the form. */
export async function sendLeadConfirmation(lead: LeadNotificationInput) {
  const resend = getResendClient();
  if (!resend) return;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: lead.email,
      subject: "We received your message — CYMAK Technologies",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <p>Hi ${escapeHtml(lead.name)},</p>
          <p>Thanks for reaching out to CYMAK Technologies. We've received your message about
          <strong>${escapeHtml(lead.service)}</strong> and will get back to you within 24 hours.</p>
          <p>— CYMAK Technologies</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[email] Failed to send lead confirmation:", err);
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

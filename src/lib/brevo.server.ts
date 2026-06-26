export type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string | null;
  city?: string | null;
  service?: string | null;
  message: string;
  source?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(value)}</td></tr>`;
}

function buildHtml(payload: ContactEmailPayload) {
  const rows = [
    row("Name", payload.name),
    row("Email", payload.email),
    row("Phone", payload.phone),
    row("Company / City", payload.city),
    row("Project type", payload.service),
    row("Source", payload.source ?? "contact_page"),
  ].filter(Boolean);

  return `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;">
      <h2 style="margin:0 0 12px;">New website enquiry</h2>
      <p style="margin:0 0 16px;color:#555;">A visitor submitted the contact form on Sri Vishnu Consol website.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${rows.join("")}</table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="margin:0;white-space:pre-wrap;line-height:1.5;">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

export async function sendContactNotificationEmail(payload: ContactEmailPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "Sri Vishnu Consol Website";
  const adminEmail = process.env.BREVO_ADMIN_EMAIL?.trim() || process.env.ADMIN_NOTIFY_EMAIL?.trim() || "info@srivishnu.in";

  if (!apiKey) return { ok: false, error: "BREVO_API_KEY is not configured" };
  if (!senderEmail) return { ok: false, error: "BREVO_SENDER_EMAIL is not configured" };
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { ok: false, error: "Missing required contact fields" };
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: adminEmail, name: "Admin" }],
      replyTo: { email: payload.email.trim(), name: payload.name.trim() },
      subject: `New enquiry from ${payload.name.trim()}`,
      htmlContent: buildHtml(payload),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { ok: false, error: detail || `Brevo API error (${response.status})` };
  }

  return { ok: true };
}

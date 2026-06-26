import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { sendContactNotificationEmail, type ContactEmailPayload } from "@/lib/brevo.server";

function parsePayload(body: unknown): ContactEmailPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Partial<ContactEmailPayload>;
  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) return null;
  const email = data.email.trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 254) return null;
  return {
    name: data.name.trim().slice(0, 200),
    email,
    phone: data.phone?.trim().slice(0, 50) || null,
    city: data.city?.trim().slice(0, 200) || null,
    service: data.service?.trim().slice(0, 200) || null,
    message: data.message.trim().slice(0, 10000),
    source: data.source?.trim().slice(0, 100) || "contact_page",
  };
}

export const Route = createFileRoute("/api/contact-notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const payload = parsePayload(body);
        if (!payload) {
          return Response.json({ error: "Invalid contact payload" }, { status: 400 });
        }

        const result = await sendContactNotificationEmail(payload);
        if (!result.ok) {
          const status = result.error.includes("not configured") ? 503 : 502;
          console.error("[contact-notify]", result.error);
          return Response.json({ error: result.error }, { status });
        }

        return Response.json({ ok: true });
      },
    },
  },
});

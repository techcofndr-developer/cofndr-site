import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultContactEmail = "tech.cofndr@gmail.com";

function validate(body) {
  const issues = [];

  if (!body.name || body.name.trim().length < 2) {
    issues.push("Name must be at least 2 characters.");
  }

  if (!body.email || !emailPattern.test(body.email)) {
    issues.push("A valid email is required.");
  }

  if (!body.company || body.company.trim().length < 2) {
    issues.push("Company must be at least 2 characters.");
  }

  if (!body.message || body.message.trim().length < 20) {
    issues.push("Message must be at least 20 characters.");
  }

  return issues;
}

async function sendViaResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || defaultContactEmail;

  if (!apiKey || !to) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CoFndr Website <onboarding@resend.dev>",
      to,
      subject: `New CoFndr enquiry from ${payload.name}`,
      reply_to: payload.email,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company}`,
        `Service: ${payload.service}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error("Resend delivery failed.");
  }

  return true;
}

async function sendViaWebhook(payload) {
  const endpoint = process.env.FORM_FORWARD_URL;

  if (!endpoint) {
    return false;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Webhook delivery failed.");
  }

  return true;
}

async function saveLocally(payload) {
  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "contact-submissions.jsonl");
  await mkdir(dir, { recursive: true });
  await appendFile(file, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const payload = {
      name: body.name?.trim() ?? "",
      email: body.email?.trim() ?? "",
      company: body.company?.trim() ?? "",
      service: body.service?.trim() ?? "General enquiry",
      message: body.message?.trim() ?? "",
      createdAt: new Date().toISOString(),
    };

    const issues = validate(payload);
    if (issues.length > 0) {
      return Response.json(
        { ok: false, errors: issues },
        { status: 400 }
      );
    }

    const delivered =
      (await sendViaResend(payload).catch(() => false)) ||
      (await sendViaWebhook(payload).catch(() => false));

    if (!delivered) {
      await saveLocally(payload);
    }

    return Response.json({
      ok: true,
      message: "Thanks. Your enquiry has been submitted.",
    });
  } catch {
    return Response.json(
      { ok: false, errors: ["Something went wrong while sending the form."] },
      { status: 500 }
    );
  }
}

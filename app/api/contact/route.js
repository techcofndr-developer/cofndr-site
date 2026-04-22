import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultContactEmail = "tech.cofndr@gmail.com";
const defaultFromName = "CoFndr Website";
const defaultFromEmail = "onboarding@resend.dev";

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
  const fromName = process.env.CONTACT_FROM_NAME || defaultFromName;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || defaultFromEmail;

  if (!apiKey || !to) {
    return false;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#16181d;line-height:1.6">
      <h2 style="margin:0 0 16px">New CoFndr enquiry</h2>
      <p style="margin:0 0 10px"><strong>Name:</strong> ${payload.name}</p>
      <p style="margin:0 0 10px"><strong>Email:</strong> ${payload.email}</p>
      <p style="margin:0 0 10px"><strong>Company:</strong> ${payload.company}</p>
      <p style="margin:0 0 10px"><strong>Service:</strong> ${payload.service}</p>
      <p style="margin:0 0 10px"><strong>Submitted:</strong> ${payload.createdAt}</p>
      <hr style="margin:18px 0;border:none;border-top:1px solid #d8d8d8" />
      <p style="margin:0;white-space:pre-wrap">${payload.message}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: `New CoFndr enquiry from ${payload.name}`,
      reply_to: payload.email,
      html,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company}`,
        `Service: ${payload.service}`,
        `Submitted: ${payload.createdAt}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend delivery failed: ${errorBody}`);
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
      (await sendViaResend(payload).catch((error) => {
        console.error(error);
        return false;
      })) ||
      (await sendViaWebhook(payload).catch((error) => {
        console.error(error);
        return false;
      }));

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

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const allowedMetrics = new Set(["CLS", "FCP", "INP", "LCP", "TTFB"]);

export async function POST(request) {
  try {
    const body = await request.json();

    if (!allowedMetrics.has(body.name)) {
      return Response.json({ ok: false, error: "Unsupported metric." }, { status: 400 });
    }

    const dir = path.join(process.cwd(), ".data");
    const file = path.join(dir, "seo-vitals.jsonl");
    await mkdir(dir, { recursive: true });
    await appendFile(
      file,
      `${JSON.stringify({
        name: body.name,
        value: body.value,
        rating: body.rating,
        delta: body.delta,
        id: body.id,
        navigationType: body.navigationType,
        path: body.path,
        connectionType: body.connectionType,
        recordedAt: body.recordedAt,
      })}\n`,
      "utf8"
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Unable to record web vitals." }, { status: 500 });
  }
}

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { seoRoutes, siteConfig } from "../../../lib/seo";

function normalizeUrl(url) {
  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

async function logIndexNow(payload) {
  const dir = path.join(process.cwd(), ".data");
  const file = path.join(dir, "indexnow-log.jsonl");
  await mkdir(dir, { recursive: true });
  await appendFile(file, `${JSON.stringify(payload)}\n`, "utf8");
}

export async function POST(request) {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return Response.json({ ok: false, error: "INDEXNOW_KEY is not configured." }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;
    const urlList =
      Array.isArray(body?.urlList) && body.urlList.length > 0
        ? body.urlList.map(normalizeUrl).filter(Boolean)
        : seoRoutes.map((route) => new URL(route.path || "/", baseUrl).toString());

    const payload = {
      host: new URL(baseUrl).host,
      key,
      keyLocation: `${baseUrl.replace(/\/$/, "")}/${key}.txt`,
      urlList,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const result = {
      requestedAt: new Date().toISOString(),
      status: response.status,
      ok: response.ok,
      urlCount: urlList.length,
    };

    await logIndexNow(result);

    if (!response.ok) {
      const message = await response.text();
      return Response.json({ ok: false, error: message || "IndexNow request failed." }, { status: 500 });
    }

    return Response.json({ ok: true, result });
  } catch (error) {
    await logIndexNow({
      requestedAt: new Date().toISOString(),
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return Response.json({ ok: false, error: "Unable to notify IndexNow." }, { status: 500 });
  }
}

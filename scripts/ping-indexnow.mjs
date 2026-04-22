import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://cofndr.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
const routes = [
  "",
  "/about",
  "/services",
  "/services/website-development",
  "/services/seo-services",
  "/services/performance-optimization",
  "/services/website-maintenance",
  "/work",
  "/contact",
];

if (!key) {
  console.log("Skipping IndexNow ping because INDEXNOW_KEY is not set.");
  process.exit(0);
}

const payload = {
  host: new URL(siteUrl).host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: routes.map((route) => `${siteUrl}${route || "/"}`),
};

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  body: JSON.stringify(payload),
});

const dir = path.join(process.cwd(), ".data");
await mkdir(dir, { recursive: true });
await appendFile(
  path.join(dir, "indexnow-log.jsonl"),
  `${JSON.stringify({
    requestedAt: new Date().toISOString(),
    status: response.status,
    ok: response.ok,
    siteUrl,
    urlCount: payload.urlList.length,
  })}\n`,
  "utf8"
);

if (!response.ok) {
  const message = await response.text();
  throw new Error(message || "IndexNow ping failed.");
}

console.log(`IndexNow notified for ${payload.urlList.length} URLs.`);

import { appendFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.env.SEO_AUDIT_BASE_URL || process.env.SITE_URL || "http://localhost:3001").replace(/\/$/, "");
const routes = [
  "/",
  "/about",
  "/services",
  "/services/website-development",
  "/services/seo-services",
  "/services/performance-optimization",
  "/services/website-maintenance",
  "/work",
  "/contact",
];

function matchContent(html, pattern) {
  const match = html.match(pattern);
  return match?.[1]?.trim() ?? "";
}

function auditPage(route, html, status) {
  const title = matchContent(html, /<title>(.*?)<\/title>/is);
  const description = matchContent(
    html,
    /<meta\s+name="description"\s+content="([^"]*)"/i
  );
  const canonical = matchContent(
    html,
    /<link\s+rel="canonical"\s+href="([^"]*)"/i
  );
  const robots = matchContent(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  const ogTitle = matchContent(
    html,
    /<meta\s+property="og:title"\s+content="([^"]*)"/i
  );
  const twitterCard = matchContent(
    html,
    /<meta\s+name="twitter:card"\s+content="([^"]*)"/i
  );
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;

  const issues = [];

  if (status !== 200) issues.push(`Unexpected status ${status}`);
  if (!title) issues.push("Missing title tag");
  if (!description) issues.push("Missing meta description");
  if (!canonical) issues.push("Missing canonical tag");
  if (!robots) issues.push("Missing robots meta");
  if (!ogTitle) issues.push("Missing Open Graph title");
  if (!twitterCard) issues.push("Missing Twitter card meta");
  if (h1Count !== 1) issues.push(`Expected exactly 1 h1, found ${h1Count}`);

  return {
    route,
    status,
    title,
    descriptionLength: description.length,
    canonical,
    robots,
    ogTitle,
    twitterCard,
    h1Count,
    issues,
  };
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  pages: [],
};

for (const route of routes) {
  const url = `${baseUrl}${route === "/" ? "" : route}`;

  try {
    const response = await fetch(url);
    const html = await response.text();
    report.pages.push(auditPage(route, html, response.status));
  } catch (error) {
    report.pages.push({
      route,
      status: 0,
      issues: [error instanceof Error ? error.message : "Unknown fetch error"],
    });
  }
}

report.summary = {
  pagesChecked: report.pages.length,
  failingPages: report.pages.filter((page) => page.issues.length > 0).length,
};

const dir = path.join(process.cwd(), ".data");
await mkdir(dir, { recursive: true });
await writeFile(path.join(dir, "seo-audit-latest.json"), JSON.stringify(report, null, 2), "utf8");
await appendFile(path.join(dir, "seo-audit-history.jsonl"), `${JSON.stringify(report)}\n`, "utf8");

if (report.summary.failingPages > 0) {
  console.error(`SEO audit found issues on ${report.summary.failingPages} page(s).`);
  process.exit(1);
}

console.log(`SEO audit passed for ${report.summary.pagesChecked} page(s).`);

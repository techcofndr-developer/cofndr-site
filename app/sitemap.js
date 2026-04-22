import { seoRoutes, siteConfig } from "../lib/seo";

export default function sitemap() {
  return seoRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

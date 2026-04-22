export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    host: "https://cofndr.com",
    sitemap: "https://cofndr.com/sitemap.xml",
  };
}

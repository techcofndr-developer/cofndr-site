import { siteConfig } from "../../lib/seo";

export function GET() {
  return Response.json({
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#0c0d10",
    theme_color: "#0c0d10",
    icons: [
      {
        src: siteConfig.ogImage,
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  });
}

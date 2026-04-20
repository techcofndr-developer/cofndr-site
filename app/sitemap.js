export default function sitemap() {
  const base = "https://cofndr.com";

  return ["", "/about", "/services", "/work", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}

import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-summary">
        <div className="footer-copy">
          <strong>CoFndr</strong>
          <span>
            Website development, SEO, and technical support for businesses that want
            a stronger online presence.
          </span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/services/website-development">Web Development</Link>
          <Link href="/services/seo-services">SEO Services</Link>
          <Link href="/services/performance-optimization">Performance</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}

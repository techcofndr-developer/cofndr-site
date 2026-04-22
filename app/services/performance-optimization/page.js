import Link from "next/link";
import { StructuredData } from "../../../components/structured-data";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "../../../lib/seo";

const description =
  "Performance optimization services focused on Core Web Vitals, faster load times, cleaner frontends, and more reliable user experience across devices.";

export const metadata = buildMetadata({
  path: "/services/performance-optimization",
  title: "Performance Optimization Services",
  description,
  keywords: [
    "performance optimization services",
    "core web vitals optimization",
    "website speed optimization",
    "lcp cls inp optimization",
  ],
});

export default function PerformanceOptimizationPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={[
          serviceSchema({
            name: "Performance Optimization Services",
            path: "/services/performance-optimization",
            description,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            {
              name: "Performance Optimization",
              path: "/services/performance-optimization",
            },
          ]),
        ]}
      />

      <section className="page-hero">
        <p className="eyebrow">Performance Optimization</p>
        <h1>Improve speed, stability, and Core Web Vitals without bloating the site.</h1>
        <p className="lead">
          CoFndr improves site performance by reducing layout shift, tightening frontend rendering,
          and keeping pages light enough for mobile users and search engines alike.
        </p>
      </section>

      <section className="card-grid two-up">
        <article className="feature-card">
          <h2>Performance priorities</h2>
          <ul className="point-list">
            <li>Faster LCP through lighter page structure and optimized assets</li>
            <li>Lower CLS with predictable sizing and stable layout patterns</li>
            <li>Stronger INP by keeping client-side JavaScript restrained</li>
            <li>Better monitoring with web vitals logging and review</li>
          </ul>
        </article>
        <article className="feature-card">
          <h2>Why it matters for SEO</h2>
          <p>
            Performance is both a user experience issue and a search quality signal. Faster,
            more stable pages reduce friction, help with crawl efficiency, and support stronger
            conversion once people land on the site.
          </p>
        </article>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Performance review</p>
          <h2>Need a faster site with better Core Web Vitals?</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Start a performance review
        </Link>
      </section>
    </div>
  );
}

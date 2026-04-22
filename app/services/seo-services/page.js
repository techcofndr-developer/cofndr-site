import Link from "next/link";
import { StructuredData } from "../../../components/structured-data";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "../../../lib/seo";

const description =
  "SEO services for businesses that need stronger rankings through technical SEO, metadata improvements, better content structure, and crawlability fixes.";

export const metadata = buildMetadata({
  path: "/services/seo-services",
  title: "SEO Services",
  description,
  keywords: [
    "seo services",
    "technical seo services",
    "on-page seo services",
    "seo for business websites",
  ],
});

export default function SeoServicesPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={[
          serviceSchema({
            name: "SEO Services",
            path: "/services/seo-services",
            description,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "SEO Services", path: "/services/seo-services" },
          ]),
        ]}
      />

      <section className="page-hero">
        <p className="eyebrow">SEO Services</p>
        <h1>Technical and on-page SEO that improves visibility the right way.</h1>
        <p className="lead">
          CoFndr helps businesses improve rankings with technical cleanup, metadata systems,
          internal linking, page structure, schema markup, and search-focused content organization.
        </p>
      </section>

      <section className="card-grid two-up">
        <article className="feature-card">
          <h2>SEO work includes</h2>
          <ul className="point-list">
            <li>Metadata, canonical, robots, and social tag improvements</li>
            <li>Structured data for services, organization, FAQs, and breadcrumbs</li>
            <li>Sitemap, robots.txt, and indexing workflow improvements</li>
            <li>Internal linking and content hierarchy cleanup</li>
          </ul>
        </article>
        <article className="feature-card">
          <h2>What this does not promise</h2>
          <p>
            No one can guarantee the top position for every keyword. Strong SEO improves how
            search engines crawl, understand, and trust your website, which is the foundation
            needed before rankings can grow consistently.
          </p>
        </article>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Need SEO help?</p>
          <h2>Use the contact page to request a technical SEO review for your site.</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Book an SEO discussion
        </Link>
      </section>
    </div>
  );
}

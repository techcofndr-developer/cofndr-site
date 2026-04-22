import Link from "next/link";
import { StructuredData } from "../../../components/structured-data";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "../../../lib/seo";

const description =
  "Website maintenance and technical support for businesses that need ongoing updates, SEO upkeep, and dependable website operations after launch.";

export const metadata = buildMetadata({
  path: "/services/website-maintenance",
  title: "Website Maintenance and Support",
  description,
  keywords: [
    "website maintenance services",
    "technical website support",
    "website seo maintenance",
    "ongoing website support",
  ],
});

export default function WebsiteMaintenancePage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={[
          serviceSchema({
            name: "Website Maintenance and Support",
            path: "/services/website-maintenance",
            description,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Website Maintenance", path: "/services/website-maintenance" },
          ]),
        ]}
      />

      <section className="page-hero">
        <p className="eyebrow">Maintenance and Support</p>
        <h1>Keep your website current, crawlable, and commercially useful after launch.</h1>
        <p className="lead">
          Rankings slip when websites are neglected. Ongoing maintenance keeps the technical
          setup clean, content current, and search performance from deteriorating over time.
        </p>
      </section>

      <section className="card-grid two-up">
        <article className="feature-card">
          <h2>Maintenance support includes</h2>
          <ul className="point-list">
            <li>Content and metadata updates</li>
            <li>Technical issue resolution and QA</li>
            <li>Monitoring for indexing and search visibility changes</li>
            <li>Continuous improvement opportunities as the business grows</li>
          </ul>
        </article>
        <article className="feature-card">
          <h2>Why this matters</h2>
          <p>
            SEO is not a one-time task. Search visibility compounds when a site stays accurate,
            healthy, and aligned with how the business actually sells its services over time.
          </p>
        </article>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Need support?</p>
          <h2>Ask about ongoing technical support and SEO maintenance for your site.</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Contact CoFndr
        </Link>
      </section>
    </div>
  );
}

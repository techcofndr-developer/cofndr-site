import Link from "next/link";
import { StructuredData } from "../../../components/structured-data";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "../../../lib/seo";

const description =
  "Professional website development for businesses that need a fast, credible, search-ready website built to convert visitors into enquiries.";

export const metadata = buildMetadata({
  path: "/services/website-development",
  title: "Website Development Services",
  description,
  keywords: [
    "website development services",
    "business website development",
    "professional website design and development",
    "company website development",
  ],
});

export default function WebsiteDevelopmentPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={[
          serviceSchema({
            name: "Website Development Services",
            path: "/services/website-development",
            description,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Website Development", path: "/services/website-development" },
          ]),
        ]}
      />

      <section className="page-hero">
        <p className="eyebrow">Website Development</p>
        <h1>Business websites built for credibility, speed, and conversion.</h1>
        <p className="lead">
          CoFndr develops business websites that help companies look more credible,
          explain their services more clearly, and turn search traffic into real enquiries.
        </p>
      </section>

      <section className="card-grid two-up">
        <article className="feature-card">
          <h2>What this service covers</h2>
          <ul className="point-list">
            <li>Company websites and service-led marketing pages</li>
            <li>Responsive frontend builds designed for mobile-first browsing</li>
            <li>Fast-loading layouts structured for SEO and conversion</li>
            <li>Clear service architecture, CTAs, and enquiry flows</li>
          </ul>
        </article>
        <article className="feature-card">
          <h2>Why it helps rankings</h2>
          <p>
            Search performance depends on more than keywords. A strong website structure,
            crawlable content, clear page intent, and technically sound performance make it
            easier for search engines to understand your business and rank the right pages.
          </p>
        </article>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Next Step</p>
          <h2>Need a business website that is ready for search from day one?</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Request a website proposal
        </Link>
      </section>
    </div>
  );
}

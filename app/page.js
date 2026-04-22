import Link from "next/link";
import { StructuredData } from "../components/structured-data";
import {
  capabilities,
  faqs,
  metrics,
  process,
  serviceLinks,
  showcase,
  testimonials,
} from "../lib/site-data";
import { buildMetadata, faqSchema } from "../lib/seo";

export const metadata = buildMetadata({
  path: "/",
  title: "CoFndr | Website Development, SEO, and Technical Support",
  description:
    "Website development, SEO services, performance optimization, and technical support for businesses that want a stronger online presence.",
  keywords: [
    "website development company",
    "seo services",
    "technical seo",
    "performance optimization",
    "website maintenance",
  ],
});

export default function HomePage() {
  return (
    <div className="page-stack">
      <StructuredData data={faqSchema(faqs)} />
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Technical services for modern businesses</p>
          <h1>
            Better websites.
            <br />
            Stronger search presence.
          </h1>
          <p className="lead">
            CoFndr helps businesses grow online through website development, SEO,
            performance improvements, and technical execution that turns a weak
            web presence into a serious business asset.
          </p>
          <div className="hero-actions">
            <Link className="button button-solid" href="/contact">
              Start a project
            </Link>
            <Link className="button button-ghost" href="/work">
              Explore the work
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="signal-orb">
            <div className="signal-core" aria-label="CoFndr logo">
              <span className="signal-wordmark">
                <span className="signal-wordmark-co">Co</span>
                <span className="signal-wordmark-fndr">Fndr</span>
              </span>
            </div>
            <div className="signal-card signal-card-top">
              <strong>Web Development</strong>
              <span>Modern websites built for credibility, speed, and conversion.</span>
            </div>
            <div className="signal-card signal-card-left">
              <strong>SEO</strong>
              <span>Technical and on-page improvements that help you get found.</span>
            </div>
            <div className="signal-card signal-card-bottom">
              <strong>Execution</strong>
              <span>From design to launch, the work is built to perform in production.</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="metrics-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Technical services that improve visibility, trust, and conversion.</h2>
        </div>
        <div className="card-grid three-up">
          {capabilities.map((item, index) => (
            <article className="feature-card" key={item.title}>
              <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <p className="eyebrow">Service Pages</p>
          <h2>Clear landing pages for the service terms people actually search for.</h2>
        </div>
        <div className="card-grid two-up">
          {serviceLinks.map((item) => (
            <article className="feature-card" key={item.href}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link className="button button-ghost" href={item.href}>
                View service page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div className="sticky-panel">
          <p className="eyebrow">Process</p>
          <h2>How CoFndr turns business goals into measurable digital results.</h2>
          <p className="support-copy">
            Our process covers strategy, development, optimization, and launch so
            your website is not only well designed but also fast, searchable, and useful.
          </p>
        </div>
        <div className="timeline-list">
          {process.map((item, index) => (
            <article className="timeline-card" key={item.title}>
              <div className="timeline-top">
                <span className="timeline-tag">{item.tag}</span>
                <span className="timeline-step">0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul className="point-list">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <p className="eyebrow">Featured Work</p>
          <h2>Service outcomes that show how technical execution supports growth.</h2>
        </div>
        <div className="card-grid showcase-grid">
          {showcase.map((item) => (
            <article className="showcase-card" key={item.title}>
              <span className="showcase-type">{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>Client-facing language focused on business value, not design jargon.</h2>
        </div>
        <div className="card-grid three-up">
          {testimonials.map((item) => (
            <article className="quote-card" key={item.name}>
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Answers that help move the decision forward.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((item) => (
            <article className="faq-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Ready to ship</p>
          <h2>Need a better website, stronger SEO, or technical support for growth?</h2>
        </div>
        <div className="hero-actions">
          <Link className="button button-solid" href="/contact">
            Contact CoFndr
          </Link>
          <Link className="button button-ghost" href="/services">
            See service structure
          </Link>
        </div>
      </section>
    </div>
  );
}

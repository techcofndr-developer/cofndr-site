import Link from "next/link";
import { StructuredData } from "../../components/structured-data";
import { serviceDetails, serviceLinks } from "../../lib/site-data";
import { breadcrumbSchema, buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/services",
  title: "Services",
  description:
    "Browse CoFndr services across website development, SEO, Core Web Vitals optimization, and ongoing website maintenance.",
  keywords: [
    "website development services",
    "seo services",
    "core web vitals optimization",
    "website maintenance services",
  ],
});

export default function ServicesPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <section className="page-hero">
        <p className="eyebrow">Services</p>
        <h1>Technical services designed to help businesses grow online.</h1>
        <p className="lead">
          CoFndr provides practical digital services such as website development,
          SEO improvements, performance optimization, and technical support that
          make your online presence easier to trust and easier to find.
        </p>
      </section>

      <section className="card-grid two-up">
        {serviceDetails.map((service) => (
          <article className="feature-card service-detail-card" key={service.title}>
            <span className="timeline-tag">{service.tag}</span>
            <h2>{service.title}</h2>
            <p>{service.copy}</p>
            <ul className="point-list">
              {service.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="card-grid two-up">
        {serviceLinks.map((service) => (
          <article className="feature-card" key={service.href}>
            <h2>{service.title}</h2>
            <p>{service.copy}</p>
            <Link className="button button-ghost" href={service.href}>
              Open service page
            </Link>
          </article>
        ))}
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Need a proposal?</p>
          <h2>Use the contact page to discuss your website, SEO, or technical requirements.</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Go to contact
        </Link>
      </section>
    </div>
  );
}

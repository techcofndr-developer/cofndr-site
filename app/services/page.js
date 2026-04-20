import Link from "next/link";
import { serviceDetails } from "../../lib/site-data";

export const metadata = {
  title: "Services",
  description: "Services offered by CoFndr across website development, SEO, performance, and technical execution.",
};

export default function ServicesPage() {
  return (
    <div className="page-stack inner-page">
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

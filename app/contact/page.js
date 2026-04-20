import { ContactForm } from "../../components/contact-form";

export const metadata = {
  title: "Contact",
  description: "Contact CoFndr to discuss website development, SEO, performance, and technical service needs.",
};

export default function ContactPage() {
  return (
    <div className="page-stack inner-page">
      <section className="contact-layout">
        <div className="page-hero compact-hero">
          <p className="eyebrow">Contact</p>
          <h1>Tell CoFndr what your business needs online.</h1>
          <p className="lead">
            Use this form to enquire about website development, SEO, speed optimization,
            redesign work, or ongoing technical support. Share enough detail so we can
            understand your business goals and recommend the right next step.
          </p>
          <div className="contact-sidebar">
            <article className="feature-card">
              <h2>Project discovery</h2>
              <p>We review your needs, current challenges, and target outcomes before proposing work.</p>
            </article>
            <article className="feature-card">
              <h2>Technical delivery</h2>
              <p>From new websites to SEO fixes and performance improvements, the work is implemented with production quality.</p>
            </article>
          </div>
        </div>
        <ContactForm />
        <article className="feature-card contact-direct-card contact-direct-inline">
          <div className="contact-direct-header">
            <p className="eyebrow">Direct contact</p>
            <h2>Reach CoFndr directly if you want to speak sooner.</h2>
          </div>
          <div className="contact-direct-list">
            <a href="mailto:tech.cofndr@gmail.com">
              <span className="contact-direct-label">Email</span>
              <span className="contact-direct-value">tech.cofndr@gmail.com</span>
            </a>
            <a href="https://wa.me/916354281300" target="_blank" rel="noreferrer">
              <span className="contact-direct-label">WhatsApp</span>
              <span className="contact-direct-value">6354281300</span>
            </a>
            <a href="https://wa.me/917874537720" target="_blank" rel="noreferrer">
              <span className="contact-direct-label">WhatsApp</span>
              <span className="contact-direct-value">7874537720</span>
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}

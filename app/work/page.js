import Link from "next/link";
import { StructuredData } from "../../components/structured-data";
import { showcase } from "../../lib/site-data";
import { breadcrumbSchema, buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/work",
  title: "Work",
  description:
    "Examples of the kinds of website development, SEO improvement, and technical optimization outcomes CoFndr focuses on.",
  keywords: ["website project examples", "seo improvement examples", "technical optimization work"],
});

export default function WorkPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <section className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>Examples of the outcomes CoFndr focuses on across build, SEO, and optimization work.</h1>
        <p className="lead">
          This page is structured to support future case studies, proof blocks, and
          delivery examples. It also gives search engines a dedicated route for work
          and results-oriented content instead of hiding everything on the homepage.
        </p>
      </section>

      <section className="card-grid two-up">
        {showcase.map((item) => (
          <article className="showcase-card" key={item.title}>
            <span className="showcase-type">{item.type}</span>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Need similar work?</p>
          <h2>Use the contact page to describe your website, SEO, or performance goals.</h2>
        </div>
        <Link className="button button-solid" href="/contact">
          Start a conversation
        </Link>
      </section>
    </div>
  );
}

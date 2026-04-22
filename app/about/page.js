import { values } from "../../lib/site-data";
import { StructuredData } from "../../components/structured-data";
import { breadcrumbSchema, buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  path: "/about",
  title: "About CoFndr",
  description:
    "Learn about CoFndr and the execution-focused approach behind its website development, SEO, and technical support services.",
  keywords: ["about CoFndr", "website development company", "seo and technical support"],
});

export default function AboutPage() {
  return (
    <div className="page-stack inner-page">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>CoFndr is built around clarity, restraint, and execution quality.</h1>
        <p className="lead">
          The company position is simple: make businesses look serious earlier,
          communicate more clearly, and remove the visual noise that usually
          weakens trust.
        </p>
      </section>

      <section className="card-grid three-up">
        {values.map((item) => (
          <article className="feature-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

import { showcase } from "../../lib/site-data";

export const metadata = {
  title: "Work",
  description: "Selected proof blocks and showcase structure for the CoFndr website.",
};

export default function WorkPage() {
  return (
    <div className="page-stack inner-page">
      <section className="page-hero">
        <p className="eyebrow">Work</p>
        <h1>Work pages can now exist as proper routes instead of hidden sections.</h1>
        <p className="lead">
          This page is where future case studies, launches, and credibility pieces
          can live. The route exists now so the site already behaves like a real product.
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
    </div>
  );
}

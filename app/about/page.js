import { values } from "../../lib/site-data";

export const metadata = {
  title: "About",
  description: "About CoFndr and the principles behind the company website.",
};

export default function AboutPage() {
  return (
    <div className="page-stack inner-page">
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

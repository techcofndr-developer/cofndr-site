"use client";

import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  company: "",
  service: "Company Website",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors ?? ["Unable to submit the form right now."]);
        return;
      }

      setSuccess(data.message ?? "Thanks. Your enquiry has been submitted.");
      setForm(initialState);
    } catch {
      setErrors(["Unable to submit the form right now."]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-shell">
      <p className="form-intro">
        Fill this out with enough context to make the next conversation useful.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={updateField} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={updateField}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="service">Service</label>
            <div className="select-wrap">
              <select id="service" name="service" value={form.service} onChange={updateField}>
                <option>Company Website</option>
                <option>Brand Refresh</option>
                <option>Product Marketing Site</option>
                <option>Design System</option>
                <option>General enquiry</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="message">Project details</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={updateField}
            placeholder="What are you building, who is it for, and what outcome matters most?"
            required
          />
        </div>

        {errors.length > 0 ? (
          <div className="error-list">
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {success ? <div className="success-message">{success}</div> : null}

        <div className="hero-actions">
          <button className="button button-solid" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </button>
          <span className="field-note">
            Enquiries are delivered to <code>tech.cofndr@gmail.com</code> when the mail service is configured.
          </span>
        </div>
      </form>
    </section>
  );
}

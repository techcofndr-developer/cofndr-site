export const siteConfig = {
  name: "CoFndr",
  shortName: "CoFndr",
  domain: "cofndr.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cofndr.com",
  description:
    "CoFndr provides website development, SEO services, performance optimization, and technical support for businesses that want stronger search visibility and better conversion.",
  ogImage: "/cofndr-logo.jpeg",
  contactEmail: "tech.cofndr@gmail.com",
};

export const seoRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "weekly", priority: 0.95 },
  { path: "/services/website-development", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/seo-services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services/performance-optimization", changeFrequency: "weekly", priority: 0.85 },
  { path: "/services/website-maintenance", changeFrequency: "weekly", priority: 0.8 },
  { path: "/work", changeFrequency: "monthly", priority: 0.65 },
  { path: "/contact", changeFrequency: "weekly", priority: 0.9 },
];

export function absoluteUrl(path = "") {
  return new URL(path || "/", siteConfig.url).toString();
}

export function buildMetadata({
  path = "/",
  title,
  description,
  keywords = [],
  type = "website",
  index = true,
}) {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.ogImage),
    email: siteConfig.contactEmail,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/services?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({ name, path, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
  };
}

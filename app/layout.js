import "./globals.css";
import Script from "next/script";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { StructuredData } from "../components/structured-data";
import { WebVitals } from "../components/web-vitals";
import { buildMetadata, organizationSchema, websiteSchema } from "../lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cofndr.com"),
  title: {
    default: "CoFndr | Website Development, SEO, and Technical Support",
    template: "%s | CoFndr",
  },
  applicationName: "CoFndr",
  category: "business",
  description:
    "CoFndr provides website development, SEO services, performance optimization, and technical support for businesses that want stronger search visibility and better conversion.",
  keywords: [
    "website development",
    "seo services",
    "technical seo",
    "performance optimization",
    "website maintenance",
    "business website development",
  ],
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      "w2p3iOVwL1OSqSOyXU9FPc9JBUjI9ZNXf_AUE5Zkslc",
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || undefined,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: buildMetadata({
    path: "/",
    title: "CoFndr | Website Development, SEO, and Technical Support",
    description:
      "CoFndr provides website development, SEO services, performance optimization, and technical support for businesses that want stronger search visibility and better conversion.",
  }).openGraph,
  twitter: buildMetadata({
    path: "/",
    title: "CoFndr | Website Development, SEO, and Technical Support",
    description:
      "CoFndr provides website development, SEO services, performance optimization, and technical support for businesses that want stronger search visibility and better conversion.",
  }).twitter,
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0d10",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wgawo200uu");
          `}
        </Script>
        <StructuredData data={[organizationSchema(), websiteSchema()]} />
        <WebVitals />
        <div className="site-chrome">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <div className="site-trademark">© 2026 CoFndr. Build. Rank. Scale.</div>
      </body>
    </html>
  );
}

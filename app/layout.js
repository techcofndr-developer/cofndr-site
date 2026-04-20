import "./globals.css";
import { Manrope, Sora } from "next/font/google";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata = {
  metadataBase: new URL("https://cofndr.com"),
  title: {
    default: "CoFndr | Minimal systems. Serious presence.",
    template: "%s | CoFndr",
  },
  description:
    "CoFndr builds a sharper digital presence for modern companies through brand systems, product thinking, and execution-led web experiences.",
  openGraph: {
    title: "CoFndr",
    description:
      "A production-ready Next.js website for a modern, minimal, and creative company presence.",
    url: "https://cofndr.com",
    siteName: "CoFndr",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable}`}>
        <div className="site-chrome">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

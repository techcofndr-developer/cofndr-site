"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-row">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="CoFndr home">
        <span className="brand-mark-frame" aria-hidden="true">
          <span className="brand-wordmark">
            <span className="brand-wordmark-co">Co</span>
            <span className="brand-wordmark-fndr">Fndr</span>
          </span>
        </span>
        </Link>

        <button
          className="mobile-toggle"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className={`mobile-toggle-icon ${open ? "open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Primary">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

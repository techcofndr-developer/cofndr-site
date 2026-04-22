"use client";

import { useReportWebVitals } from "next/web-vitals";

const trackedMetrics = new Set(["CLS", "FCP", "INP", "LCP", "TTFB"]);

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (!trackedMetrics.has(metric.name)) {
      return;
    }

    const payload = JSON.stringify({
      ...metric,
      path: window.location.pathname,
      recordedAt: new Date().toISOString(),
      connectionType: navigator.connection?.effectiveType ?? "unknown",
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/seo/vitals",
        new Blob([payload], { type: "application/json" })
      );
      return;
    }

    fetch("/api/seo/vitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  });

  return null;
}

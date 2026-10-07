import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Extend window for gtag and clarity
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

const GA4_MEASUREMENT_ID = "G-CVVQFJN6CZ";

/**
 * Tracks page views on every route change for:
 * - Google Analytics 4 (gtag)
 * - Microsoft Clarity (auto-tracks, but we fire a custom tag per page)
 *
 * Place this component inside <BrowserRouter> so useLocation() works.
 */
export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search;

    // Google Analytics 4 — send page_view event
    if (typeof window.gtag === "function") {
      window.gtag("config", GA4_MEASUREMENT_ID, {
        page_path: url,
        page_title: document.title,
      });
    }

    // Microsoft Clarity — set custom page tag (useful for filtering in dashboard)
    if (typeof window.clarity === "function") {
      window.clarity("set", "page_path", url);
    }
  }, [location]);

  return null;
}

/**
 * Track custom events in GA4.
 * Example usage:
 *   trackEvent("training_registration", { training_name: "PLTS", fee: "250000" });
 *   trackEvent("cta_click", { button: "whatsapp", page: "/training" });
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Track custom events in Clarity.
 * Example: trackClarityTag("registered_user", "true")
 */
export function trackClarityTag(key: string, value: string) {
  if (typeof window.clarity === "function") {
    window.clarity("set", key, value);
  }
}

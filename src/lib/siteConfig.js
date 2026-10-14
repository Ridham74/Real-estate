/**
 * Site-wide configuration and technical SEO constants for HomeConnect.
 * Configured with environment variable fallbacks for production domain mapping.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://homeconnect.example.com"
).replace(/\/$/, "");

export const SITE_NAME = "HomeConnect";

export const DEFAULT_TITLE =
  "HomeConnect | Buy, Rent & Explore Properties Across India";

export const DEFAULT_DESCRIPTION =
  "Discover properties across India with HomeConnect. Explore apartments, villas, commercial spaces, plots, and rental properties by city, locality, and budget.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

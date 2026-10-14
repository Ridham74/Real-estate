import { SITE_URL } from "@/lib/siteConfig";

/**
 * Next.js App Router robots.txt generator.
 * Allows indexing of public routes while protecting internal APIs and sensitive endpoints.
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

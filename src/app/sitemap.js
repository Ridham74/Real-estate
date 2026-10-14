import prisma from "@/lib/prisma";
import { SITE_URL } from "@/lib/siteConfig";

/**
 * Next.js App Router sitemap.xml generator.
 * Emits canonical URLs for the homepage and database-backed dynamic property listings.
 */
export default async function sitemap() {
  let propertyEntries = [];

  try {
    const properties = await prisma.property.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    propertyEntries = properties.map((prop) => ({
      url: `${SITE_URL}/properties/${prop.id}`,
      lastModified: prop.updatedAt ? new Date(prop.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to generate dynamic sitemap entries:", error);
  }

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...propertyEntries,
  ];
}

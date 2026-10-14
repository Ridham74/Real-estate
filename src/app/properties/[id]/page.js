import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";
import { propertiesData } from "@/data/properties";
import {
  formatIndianCurrency,
  formatArea,
  formatPricePerSqFt,
  normalizePropertyType,
} from "@/lib/formatters";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import PropertyDetailsClient from "./PropertyDetailsClient";

function getFallbackProperty(id) {
  const mock = propertiesData.find((p) => p.id === id);
  if (!mock) return null;
  return {
    id: mock.id,
    title: mock.title,
    description: mock.description,
    price: mock.priceNumeric,
    purpose: mock.purpose ? mock.purpose.toUpperCase() : "BUY",
    propertyType: mock.propertyType ? mock.propertyType.toUpperCase() : "APARTMENT",
    city: mock.city,
    locality: mock.locality,
    areaSqFt: mock.areaSqFt,
    bedrooms: mock.bedrooms,
    bathrooms: mock.bathrooms,
    imageUrl: mock.image,
    images: JSON.stringify(mock.images || [mock.image]),
    amenities: JSON.stringify(mock.amenities || []),
    status: mock.status,
    furnishing: mock.furnishing,
    parking: mock.parking,
    rera: mock.rera,
    featured: mock.featured,
  };
}

export async function generateStaticParams() {
  try {
    const properties = await prisma.property.findMany({
      select: { id: true },
    });
    if (properties && properties.length > 0) {
      return properties.map((prop) => ({
        id: prop.id,
      }));
    }
  } catch (error) {
    // Database may not be reachable during build on static CI/Vercel
  }
  return propertiesData.map((prop) => ({
    id: prop.id,
  }));
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    let property = null;
    try {
      property = await prisma.property.findUnique({
        where: { id: resolvedParams.id },
      });
    } catch {
      property = null;
    }

    if (!property) {
      property = getFallbackProperty(resolvedParams.id);
    }

    if (!property) {
      return {
        title: "Property Not Found",
        description: "The requested property listing could not be found on HomeConnect.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const pageTitle = `${property.title} in ${property.locality}, ${property.city}`;
    const fullTitle = `${pageTitle} | ${SITE_NAME}`;
    const description = property.description;
    const canonicalUrl = `${SITE_URL}/properties/${property.id}`;
    const imageUrl = property.imageUrl;

    return {
      title: pageTitle,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fullTitle,
        description,
        url: canonicalUrl,
        siteName: SITE_NAME,
        locale: "en_IN",
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 800,
            alt: property.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Property Details",
      description: "Explore property specifications, amenities, and floor plans on HomeConnect.",
    };
  }
}

export default async function PropertyPage({ params }) {
  const resolvedParams = await params;
  let property = null;

  try {
    property = await prisma.property.findUnique({
      where: { id: resolvedParams.id },
    });
  } catch (err) {
    console.warn("Failed to load property from DB, using fallback:", err.message);
  }

  if (!property) {
    property = getFallbackProperty(resolvedParams.id);
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-20">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              !
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Property Not Found</h1>
            <p className="text-sm text-slate-600 mb-6">
              The requested property with ID{" "}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">{resolvedParams.id}</code>{" "}
              could not be found in the database.
            </p>
            <Link
              href="/#properties"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all"
            >
              ← Back to All Properties
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse JSON fields safely
  let parsedAmenities = [];
  let parsedImages = [];
  try {
    parsedAmenities = JSON.parse(property.amenities || "[]");
  } catch {
    parsedAmenities = [];
  }
  try {
    parsedImages = JSON.parse(property.images || "[]");
  } catch {
    parsedImages = [];
  }

  const propertyUrl = `${SITE_URL}/properties/${property.id}`;

  // Breadcrumbs schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: `${SITE_URL}/#properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: propertyUrl,
      },
    ],
  };

  // Schema.org RealEstateListing structured data using actual property fields
  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: propertyUrl,
    image: property.imageUrl,
    datePosted: property.createdAt ? new Date(property.createdAt).toISOString() : undefined,
    dateModified: property.updatedAt ? new Date(property.updatedAt).toISOString() : undefined,
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      category: property.purpose === "RENT" ? "Rental" : "Sale",
    },
    itemOffered: {
      "@type":
        property.propertyType === "VILLA"
          ? "SingleFamilyResidence"
          : property.propertyType === "APARTMENT"
          ? "Apartment"
          : "Accommodation",
      name: property.title,
      description: property.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.locality,
        addressRegion: property.city,
        addressCountry: "IN",
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.areaSqFt,
        unitCode: "FTK",
      },
      ...(property.bedrooms ? { numberOfRooms: property.bedrooms } : {}),
      ...(property.bathrooms ? { numberOfBathroomsTotal: property.bathrooms } : {}),
      ...(parsedAmenities.length > 0
        ? {
            amenityFeature: parsedAmenities.map((amenity) => ({
              "@type": "LocationFeatureSpecification",
              name: amenity,
              value: true,
            })),
          }
        : {}),
    },
  };

  const formattedProperty = {
    ...property,
    image: property.imageUrl,
    images: parsedImages.length > 0 ? parsedImages : [property.imageUrl],
    amenities: parsedAmenities,
    priceDisplay: formatIndianCurrency(property.price, property.purpose),
    pricePerSqFt: formatPricePerSqFt(property.price, property.areaSqFt, property.purpose),
    areaDisplay: formatArea(property.areaSqFt),
    propertyType: normalizePropertyType(property.propertyType),
    purposeDisplay: property.purpose === "RENT" ? "For Rent" : "For Sale",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <PropertyDetailsClient property={formattedProperty} />
    </>
  );
}

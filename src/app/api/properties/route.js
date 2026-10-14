import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { propertiesData } from "@/data/properties";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city");
    const purpose = searchParams.get("purpose");
    const propertyType = searchParams.get("propertyType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const keyword = searchParams.get("keyword");

    const where = {};

    // 1. City filter
    if (city && city !== "All Cities") {
      where.city = { equals: city };
    }

    // 2. Purpose filter (BUY or RENT)
    if (purpose && purpose !== "All Purposes") {
      const upper = purpose.toUpperCase();
      if (upper === "RENT" || upper === "BUY") {
        where.purpose = upper;
      }
    }

    // 3. Property Type filter
    if (propertyType && propertyType !== "All Types") {
      const upper = propertyType.toUpperCase();
      if (upper.includes("PLOT")) {
        where.propertyType = "PLOT";
      } else if (upper.includes("PG") || upper.includes("COLIVING")) {
        where.propertyType = "PG";
      } else if (upper.includes("APARTMENT")) {
        where.propertyType = "APARTMENT";
      } else if (upper.includes("VILLA")) {
        where.propertyType = "VILLA";
      } else if (upper.includes("COMMERCIAL")) {
        where.propertyType = "COMMERCIAL";
      } else {
        where.propertyType = upper;
      }
    }

    // 4. Budget range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice && !isNaN(Number(minPrice)) && Number(minPrice) > 0) {
        where.price.gte = Number(minPrice);
      }
      if (maxPrice && !isNaN(Number(maxPrice)) && Number(maxPrice) > 0) {
        where.price.lte = Number(maxPrice);
      }
    }

    // 5. Keyword search (title, locality, description, city)
    if (keyword && keyword.trim()) {
      const term = keyword.trim();
      where.OR = [
        { title: { contains: term } },
        { locality: { contains: term } },
        { description: { contains: term } },
        { city: { contains: term } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    // Parse JSON fields safely for response
    const formatted = properties.map((prop) => {
      let parsedAmenities = [];
      let parsedImages = [];
      try {
        parsedAmenities = JSON.parse(prop.amenities || "[]");
      } catch {
        parsedAmenities = [];
      }
      try {
        parsedImages = JSON.parse(prop.images || "[]");
      } catch {
        parsedImages = [];
      }

      return {
        ...prop,
        amenities: parsedAmenities,
        images: parsedImages.length > 0 ? parsedImages : [prop.imageUrl],
      };
    });

    return NextResponse.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.warn("GET /api/properties falling back to propertiesData:", error.message);

    try {
      const { searchParams } = new URL(request.url);
      const city = searchParams.get("city");
      const purpose = searchParams.get("purpose");
      const propertyType = searchParams.get("propertyType");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const keyword = searchParams.get("keyword");

      let filtered = propertiesData.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.priceNumeric,
        purpose: p.purpose ? p.purpose.toUpperCase() : "BUY",
        propertyType: p.propertyType ? p.propertyType.toUpperCase() : "APARTMENT",
        city: p.city,
        locality: p.locality,
        areaSqFt: p.areaSqFt,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        imageUrl: p.image,
        images: p.images || [p.image],
        amenities: p.amenities || [],
        status: p.status,
        furnishing: p.furnishing,
        parking: p.parking,
        rera: p.rera,
        featured: p.featured,
      }));

      if (city && city !== "All Cities") {
        filtered = filtered.filter((p) => p.city.toLowerCase() === city.toLowerCase());
      }
      if (purpose && purpose !== "All Purposes") {
        filtered = filtered.filter((p) => p.purpose.toLowerCase() === purpose.toLowerCase());
      }
      if (propertyType && propertyType !== "All Types") {
        filtered = filtered.filter((p) => p.propertyType.toLowerCase().includes(propertyType.toLowerCase()));
      }
      if (minPrice && !isNaN(Number(minPrice))) {
        filtered = filtered.filter((p) => p.price >= Number(minPrice));
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      }
      if (keyword && keyword.trim()) {
        const kw = keyword.toLowerCase().trim();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(kw) ||
            p.locality.toLowerCase().includes(kw) ||
            p.city.toLowerCase().includes(kw)
        );
      }

      return NextResponse.json({
        success: true,
        count: filtered.length,
        data: filtered,
      });
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to retrieve properties" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request) {
  try {
    // Security check: restrict public write operations in production unless authorized
    const isProduction = process.env.NODE_ENV === "production";
    const authHeader = request.headers.get("authorization");
    const adminKey = process.env.ADMIN_API_KEY;

    if (isProduction && (!adminKey || authHeader !== `Bearer ${adminKey}`)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Property creation is restricted in production. Server-side authorization is required.",
        },
        { status: 403 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    // Validation
    const {
      title,
      description,
      price,
      purpose,
      propertyType,
      city,
      locality,
      areaSqFt,
      bedrooms,
      bathrooms,
      imageUrl,
      amenities,
      images,
      status,
      furnishing,
      parking,
      rera,
      featured,
    } = body;

    const errors = [];
    if (!title || typeof title !== "string" || !title.trim()) {
      errors.push("Title is required.");
    }
    if (!description || typeof description !== "string" || !description.trim()) {
      errors.push("Description is required.");
    }
    if (price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
      errors.push("Price must be a positive number.");
    }
    if (!purpose || !["BUY", "RENT"].includes(purpose.toUpperCase())) {
      errors.push("Purpose must be 'BUY' or 'RENT'.");
    }
    const validTypes = ["APARTMENT", "VILLA", "COMMERCIAL", "PLOT", "PG"];
    if (!propertyType || !validTypes.includes(propertyType.toUpperCase())) {
      errors.push(
        `PropertyType must be one of: ${validTypes.join(", ")}.`
      );
    }
    if (!city || typeof city !== "string" || !city.trim()) {
      errors.push("City is required.");
    }
    if (!locality || typeof locality !== "string" || !locality.trim()) {
      errors.push("Locality is required.");
    }
    if (areaSqFt === undefined || isNaN(Number(areaSqFt)) || Number(areaSqFt) <= 0) {
      errors.push("Area in square feet must be a positive number.");
    }
    if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.trim()) {
      errors.push("A valid imageUrl is required.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Prepare arrays as JSON strings for SQLite
    const amenitiesJson = Array.isArray(amenities)
      ? JSON.stringify(amenities)
      : JSON.stringify([]);
    const imagesJson = Array.isArray(images)
      ? JSON.stringify(images)
      : JSON.stringify([imageUrl]);

    const created = await prisma.property.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        purpose: purpose.toUpperCase(),
        propertyType: propertyType.toUpperCase(),
        city: city.trim(),
        locality: locality.trim(),
        areaSqFt: Number(areaSqFt),
        bedrooms: bedrooms !== undefined && bedrooms !== null ? Number(bedrooms) : null,
        bathrooms: bathrooms !== undefined && bathrooms !== null ? Number(bathrooms) : null,
        imageUrl: imageUrl.trim(),
        amenities: amenitiesJson,
        images: imagesJson,
        status: status || "Ready to Move",
        furnishing: furnishing || null,
        parking: parking || null,
        rera: rera || null,
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...created,
          amenities: JSON.parse(created.amenities),
          images: JSON.parse(created.images),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while creating property." },
      { status: 500 }
    );
  }
}

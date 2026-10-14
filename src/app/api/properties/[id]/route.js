import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { propertiesData } from "@/data/properties";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Property ID is required." },
        { status: 400 }
      );
    }

    let property = null;
    try {
      property = await prisma.property.findUnique({
        where: { id },
      });
    } catch {
      property = null;
    }

    if (!property) {
      const mock = propertiesData.find((p) => p.id === id);
      if (mock) {
        return NextResponse.json({
          success: true,
          data: {
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
            images: mock.images || [mock.image],
            amenities: mock.amenities || [],
            status: mock.status,
            furnishing: mock.furnishing,
            parking: mock.parking,
            rera: mock.rera,
            featured: mock.featured,
          },
        });
      }

      return NextResponse.json(
        { success: false, error: "Property not found." },
        { status: 404 }
      );
    }

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

    return NextResponse.json({
      success: true,
      data: {
        ...property,
        amenities: parsedAmenities,
        images: parsedImages.length > 0 ? parsedImages : [property.imageUrl],
      },
    });
  } catch (error) {
    console.error("GET /api/properties/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while retrieving property." },
      { status: 500 }
    );
  }
}

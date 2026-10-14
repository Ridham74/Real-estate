import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
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

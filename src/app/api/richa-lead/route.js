import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, propertyInterest } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and Phone Number are required." },
        { status: 400 }
      );
    }

    // Safely record demonstration lead in console/logs
    console.log("[Richa AI Lead Callback Request]:", {
      name,
      phone,
      propertyInterest: propertyInterest || "General Inquiry",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Richa AI will connect with you on your phone number shortly.",
        lead: { name, phone },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process lead request." },
      { status: 500 }
    );
  }
}

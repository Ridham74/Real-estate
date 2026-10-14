"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RichaEnquiryPromo from "@/components/ui/RichaEnquiryPromo";

export default function PropertyDetailsClient({ property }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "I am interested in this property and would like to schedule a site visit.",
  });

  const images = property.images && property.images.length > 0 ? property.images : [property.image];

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 pb-14 sm:pb-16 w-full">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6 overflow-x-auto py-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-800 transition-colors flex-shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/#properties" className="hover:text-emerald-800 transition-colors flex-shrink-0">
              Properties
            </Link>
            <span>/</span>
            <span className="text-emerald-900 font-medium truncate max-w-[180px] sm:max-w-xs">{property.title}</span>
          </nav>

          {/* Top Title & Price Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                <span className="px-2.5 py-1 rounded-md bg-emerald-900 text-white text-[11px] sm:text-xs font-semibold">
                  {property.purpose === "Buy" ? "For Sale" : "For Rent"}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-[11px] sm:text-xs font-bold">
                  {property.propertyType}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-semibold">
                  {property.status}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-medium">
                  RERA: {property.rera}
                </span>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 mt-2">
                <svg className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{property.location}</span>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3.5 sm:gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div>
                <div className="text-2xl sm:text-4xl font-extrabold text-emerald-900">
                  {property.priceDisplay}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {property.pricePerSqFt}
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 min-h-[44px] min-w-[44px] rounded-xl border transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isFavorite
                      ? "bg-rose-50 border-rose-200 text-rose-600"
                      : "bg-white border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-slate-50"
                  }`}
                  aria-label={isFavorite ? "Saved to favorites" : "Save to favorites"}
                  title="Toggle Favorite"
                >
                  <svg
                    className={`w-5 h-5 ${isFavorite ? "fill-rose-600" : "fill-none stroke-current"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Seller</span>
                </button>
              </div>
            </div>
          </div>

          {/* Images Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {/* Main Featured Photo */}
            <div className="lg:col-span-3 relative h-[250px] sm:h-[380px] md:h-[480px] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <Image
                src={images[activeImageIndex]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover object-center transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-medium">
                Photo {activeImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-y-auto pb-1 lg:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-24 h-20 sm:w-28 sm:h-24 lg:w-full lg:h-36 rounded-xl overflow-hidden border-2 transition-all focus:outline-none ${
                    activeImageIndex === idx ? "border-emerald-600 ring-2 ring-emerald-600/30" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${property.title} thumbnail ${idx + 1}`}
                    fill
                    sizes="200px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left 2 Cols: Specs, Description, Amenities */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Quick Specs Cards */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Property Specifications</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Total Area</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.areaDisplay}</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Bedrooms</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">
                      {property.bedrooms ? `${property.bedrooms} BHK` : "N/A"}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Bathrooms</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">
                      {property.bathrooms ? `${property.bathrooms} Baths` : "N/A"}
                    </span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Parking</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.parking}</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">City</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.city}</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Locality</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.locality}</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Furnishing</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.furnishing}</span>
                  </div>

                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium block">Status</span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block truncate">{property.status}</span>
                  </div>
                </div>
              </div>

              {/* Property Description */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 sm:mb-3">About this Property</h2>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base">
                  {property.description}
                </p>
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800">Verified Listing Ref:</span>
                  <span>HC-IND-{property.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-slate-800 text-xs sm:text-sm font-medium"
                    >
                      <svg className="w-4 h-4 text-emerald-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Seller Card & Inquiry Form */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm lg:sticky lg:top-28">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Inquire with Seller</h3>
                <p className="text-xs text-slate-500 mb-4 sm:mb-5">
                  Direct connection with verified seller representatives.
                </p>

                {inquirySubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 font-bold text-lg">
                      ✓
                    </div>
                    <p className="font-bold">Inquiry Sent Successfully!</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Our relationship manager will coordinate a demo site visit for you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setInquirySubmitted(false)}
                      className="mt-3 text-xs font-semibold text-emerald-900 underline"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3 sm:space-y-3.5">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="inquiry-name"
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (+91)
                      </label>
                      <input
                        id="inquiry-phone"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="inquiry-message"
                        rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      Send Inquiry (Demo)
                    </button>
                  </form>
                )}

                {/* Richa AI Enquiry Integration Banner */}
                <RichaEnquiryPromo variant="card" />

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/#properties"
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                  >
                    <span>← Back to All Listings</span>
                  </Link>
                  <span className="text-[10px] text-slate-400 font-medium">Demo Property</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Seller Modal Overlay if opened */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Schedule Site Visit</h3>
            <p className="text-xs text-slate-500 mb-3">
              Enter your details to receive an instant callback from our verified property consultant for {property.title}.
            </p>

            {/* Richa AI Promotional Message */}
            <RichaEnquiryPromo variant="modal" className="mb-4" />

            <form
              onSubmit={(e) => {
                handleInquirySubmit(e);
                setShowContactModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label htmlFor="modal-name" className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2.5 min-h-[44px] rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 min-h-[44px] rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-sm"
              >
                Confirm Site Visit Request
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { filterPropertyTypes } from "@/data/properties";
import { RICHA_TRY_FORM_URL } from "@/lib/richaConfig";

export default function Hero({ filters, setFilters, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <section id="hero" className="relative min-h-[580px] lg:min-h-[640px] pt-24 sm:pt-28 pb-14 bg-white w-full overflow-hidden flex items-center">
      {/* Right-aligned Background Image with Soft Fade to White */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[62%] z-0 pointer-events-none">
        <Image
          src="/images/hero-villa.jpg"
          alt="Modern luxury villa with illuminated pool"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 62vw"
          className="object-cover object-right"
        />
        {/* Soft Left Gradient Fade from Pure White */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-gradient-to-r from-white via-white/85 to-transparent" />
        {/* Subtle Bottom Fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title, Subtitle, Search Form & Trust Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-4 w-fit shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Real Estate Powered by Richa AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Find Your Dream <br className="hidden sm:inline" />
              Property, <span className="text-emerald-600">Smarter.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Explore the best residential and commercial properties across India, Let Richa AI handle your enquiries, calls and follow-ups 24x7.
            </p>

            {/* Horizontal Search Bar Container */}
            <form
              onSubmit={handleSubmit}
              className="mt-7 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl"
            >
              {/* Keyword / Location input */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Location, project, or landmark"
                  value={filters.keyword}
                  onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Property Type select */}
              <div className="md:w-36 px-3 py-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All Types">Property Type</option>
                  {filterPropertyTypes
                    .filter((t) => t !== "All Types")
                    .map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>

              {/* Budget select */}
              <div className="md:w-32 px-3 py-2.5 bg-slate-50/70 rounded-xl border border-slate-100">
                <select
                  value={filters.maxBudget}
                  onChange={(e) => setFilters((prev) => ({ ...prev, maxBudget: e.target.value }))}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="">Budget</option>
                  <option value="5000000">Under ₹50 L</option>
                  <option value="15000000">Under ₹1.5 Cr</option>
                  <option value="50000000">Under ₹5 Cr</option>
                  <option value="100000000">Under ₹10 Cr</option>
                </select>
              </div>

              {/* Search Properties Button */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center whitespace-nowrap cursor-pointer"
              >
                Search Properties
              </button>
            </form>

            {/* Trust Indicators with Green Circles */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-800 font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Trusted Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>AI-Powered Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">✓</div>
                <span>Easy & Secure</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Richa AI Card overlaying the Villa background */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(109,40,217,0.22)] border border-slate-100/90 w-full max-w-[390px] relative z-20">
              {/* Top Section: Photo + Name/Waveform */}
              <div className="flex items-start gap-4 mb-4">
                {/* Richa Portrait */}
                <div className="relative w-28 h-32 rounded-2xl overflow-hidden shadow-md border border-slate-100 flex-shrink-0 bg-slate-100">
                  <Image
                    src="/images/richa-avatar.jpg"
                    alt="Richa AI Call Assistant"
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Header Info & Audio Waveform */}
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Richa AI</h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">Your Real Estate Call Assistant</p>

                  {/* Audio Waveform Graphic */}
                  <div className="flex items-center gap-1 mt-3">
                    <span className="w-1 h-3 bg-violet-500 rounded-full"></span>
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    <span className="w-1 h-3.5 bg-violet-400 rounded-full"></span>
                    <span className="w-1 h-7 bg-violet-600 rounded-full"></span>
                    <span className="w-1 h-4 bg-violet-500 rounded-full"></span>
                    <span className="w-1 h-8 bg-violet-600 rounded-full"></span>
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    <span className="w-1 h-3 bg-violet-400 rounded-full"></span>
                    <span className="w-1 h-6 bg-violet-600 rounded-full"></span>
                    <span className="w-1 h-4 bg-violet-500 rounded-full"></span>
                    <span className="w-1 h-2 bg-violet-400 rounded-full"></span>
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                  </div>
                </div>
              </div>

              {/* Checklist with Green Circles */}
              <ul className="space-y-2.5 py-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span>Answers calls 24x7</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span>Qualifies property enquiries</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span>Schedules site visits</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] flex-shrink-0">
                    ✓
                  </div>
                  <span>Integrates with your CRM</span>
                </li>
              </ul>

              {/* Purple CTA Button */}
              <Link
                href={RICHA_TRY_FORM_URL}
                className="mt-3 w-full py-3 px-5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
                aria-label="Try Richa AI Demo"
              >
                <span>Try Richa AI</span>
                <span className="text-base font-bold">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

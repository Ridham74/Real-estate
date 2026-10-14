"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  filterCities,
  filterPurposes,
  filterPropertyTypes,
  budgetRanges,
} from "@/data/properties";
import {
  formatIndianCurrency,
  formatArea,
  formatPricePerSqFt,
  normalizePropertyType,
} from "@/lib/formatters";

export default function FeaturedProperties({
  filters,
  setFilters,
  onResetFilters,
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [reloadCounter, setReloadCounter] = useState(0);

  // Fetch properties from database API whenever filters or reloadCounter changes
  useEffect(() => {
    let ignore = false;

    async function loadProperties() {
      try {
        const params = new URLSearchParams();
        if (filters.city && filters.city !== "All Cities") {
          params.append("city", filters.city);
        }
        if (filters.purpose && filters.purpose !== "All Purposes") {
          params.append("purpose", filters.purpose);
        }
        if (filters.propertyType && filters.propertyType !== "All Types") {
          params.append("propertyType", filters.propertyType);
        }
        if (filters.minBudget) {
          params.append("minPrice", filters.minBudget);
        }
        if (filters.maxBudget) {
          params.append("maxPrice", filters.maxBudget);
        }
        if (filters.keyword && filters.keyword.trim()) {
          params.append("keyword", filters.keyword.trim());
        }

        const res = await fetch(`/api/properties?${params.toString()}`);
        if (!res.ok) {
          throw new Error("Unable to retrieve properties from the server.");
        }

        const json = await res.json();
        if (!ignore) {
          if (json.success && Array.isArray(json.data)) {
            setProperties(json.data);
          } else {
            setProperties([]);
          }
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          console.error("loadProperties error:", err);
          setError(err.message || "An unexpected error occurred while loading properties.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      ignore = true;
    };
  }, [filters, reloadCounter]);

  const handleRetry = () => {
    setLoading(true);
    setReloadCounter((c) => c + 1);
  };

  const handleBudgetPresetChange = (e) => {
    const selected = budgetRanges.find((b) => b.label === e.target.value);
    if (selected) {
      setFilters((prev) => ({
        ...prev,
        minBudget: selected.min > 0 ? selected.min.toString() : "",
        maxBudget: selected.max !== Infinity ? selected.max.toString() : "",
      }));
    }
  };

  const hasActiveFilters =
    filters.city !== "All Cities" ||
    filters.purpose !== "All Purposes" ||
    filters.propertyType !== "All Types" ||
    Boolean(filters.minBudget) ||
    Boolean(filters.maxBudget) ||
    Boolean(filters.keyword);

  return (
    <section id="properties" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-20 w-full">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
              Verified Marketplace
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Property Listings
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm md:text-base max-w-xl">
              Real-time property search powered by Prisma SQLite database across top Indian metropolitan regions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-900 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 min-h-[38px] focus:outline-none"
            >
              <span>View All Properties</span>
              <span>→</span>
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1 min-h-[38px] active:scale-95 focus-visible:ring-2 focus-visible:ring-rose-500 focus:outline-none"
              >
                <span>Clear Filters</span>
                <span>✕</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Panel */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-sm mb-8 sm:mb-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {/* Locality or Keyword */}
            <div>
              <label htmlFor="filter-kw" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Keyword / Locality
              </label>
              <input
                id="filter-kw"
                type="text"
                placeholder="Locality, project, title..."
                value={filters.keyword}
                onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            {/* City Selection */}
            <div>
              <label htmlFor="filter-city" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                City
              </label>
              <select
                id="filter-city"
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {filterCities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Purpose Selection */}
            <div>
              <label htmlFor="filter-purpose" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Purpose
              </label>
              <select
                id="filter-purpose"
                value={filters.purpose}
                onChange={(e) => setFilters((prev) => ({ ...prev, purpose: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {filterPurposes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Selection */}
            <div>
              <label htmlFor="filter-type" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Property Type
              </label>
              <select
                id="filter-type"
                value={filters.propertyType}
                onChange={(e) => setFilters((prev) => ({ ...prev, propertyType: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {filterPropertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Budget Ranges */}
            <div>
              <label htmlFor="filter-budget" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Budget Range
              </label>
              <select
                id="filter-budget"
                onChange={handleBudgetPresetChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                {budgetRanges.map((b) => (
                  <option key={b.label} value={b.label}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Active:</span>

              {filters.city !== "All Cities" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <span>City: {filters.city}</span>
                  <button
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, city: "All Cities" }))}
                    className="hover:text-rose-600 font-bold p-0.5"
                    aria-label={`Remove ${filters.city} filter`}
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.purpose !== "All Purposes" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <span>{filters.purpose}</span>
                  <button
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, purpose: "All Purposes" }))}
                    className="hover:text-rose-600 font-bold p-0.5"
                    aria-label={`Remove ${filters.purpose} filter`}
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.propertyType !== "All Types" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <span>{filters.propertyType}</span>
                  <button
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, propertyType: "All Types" }))}
                    className="hover:text-rose-600 font-bold p-0.5"
                    aria-label={`Remove ${filters.propertyType} filter`}
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.keyword && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <span>&quot;{filters.keyword}&quot;</span>
                  <button
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, keyword: "" }))}
                    className="hover:text-rose-600 font-bold p-0.5"
                    aria-label="Remove keyword search"
                  >
                    ×
                  </button>
                </span>
              )}

              {(filters.minBudget || filters.maxBudget) && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-900">
                  <span>Custom Budget</span>
                  <button
                    type="button"
                    onClick={() => setFilters((p) => ({ ...p, minBudget: "", maxBudget: "" }))}
                    className="hover:text-rose-600 font-bold p-0.5"
                    aria-label="Remove budget filter"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs text-slate-500 hover:text-slate-800 underline ml-1"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-0 shadow-sm">
                <div className="aspect-[4/3] bg-slate-200 w-full" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-8 bg-slate-100 rounded" />
                    <div className="h-8 bg-slate-100 rounded" />
                    <div className="h-8 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-md mx-auto my-6">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 font-bold text-lg">
              !
            </div>
            <h3 className="font-bold text-rose-900 text-base mb-1">Failed to Load Properties</h3>
            <p className="text-xs text-rose-700 mb-4">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm"
            >
              Retry Database Search
            </button>
          </div>
        )}

        {/* Empty Search Results State */}
        {!loading && !error && properties.length === 0 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No Matching Properties Found</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              We couldn&apos;t find any database listings matching your current combination of city, budget, or property type.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="px-6 py-3 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Property Cards Grid from Database */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {properties.map((property) => {
              const isFav = !!favorites[property.id];
              const priceDisplay = formatIndianCurrency(property.price, property.purpose);
              const pricePerSqFt = formatPricePerSqFt(property.price, property.areaSqFt, property.purpose);
              const areaDisplay = formatArea(property.areaSqFt);
              const typeDisplay = normalizePropertyType(property.propertyType);
              const purposeDisplay = property.purpose === "RENT" ? "For Rent" : "For Sale";

              return (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <Image
                      src={property.imageUrl}
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold shadow-sm">
                        {typeDisplay}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold shadow-sm">
                        {purposeDisplay}
                      </span>
                    </div>

                    {/* Favorite Heart Button (with stopPropagation) */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-slate-600 hover:text-rose-600 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 z-20"
                      aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform active:scale-125 ${
                          isFav ? "fill-rose-500 text-rose-500" : "fill-none stroke-current"
                        }`}
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

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 text-white z-10">
                      <div className="text-lg sm:text-xl font-extrabold tracking-tight drop-shadow-md">
                        {priceDisplay}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-200 drop-shadow-sm font-medium">
                        {pricePerSqFt}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-emerald-900 transition-colors">
                        {property.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 sm:mt-2">
                        <svg className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{property.locality}, {property.city}</span>
                      </div>

                      {/* Property Specs Pills */}
                      <div className="mt-3.5 sm:mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs text-slate-700">
                        <div className="bg-slate-50 py-1.5 px-1 rounded-lg">
                          <span className="block text-[9px] sm:text-[10px] text-slate-400 font-medium">Area</span>
                          <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate block">{areaDisplay}</span>
                        </div>

                        <div className="bg-slate-50 py-1.5 px-1 rounded-lg">
                          <span className="block text-[9px] sm:text-[10px] text-slate-400 font-medium">
                            {property.bedrooms ? "Config" : "Usage"}
                          </span>
                          <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate block">
                            {property.bedrooms ? `${property.bedrooms} BHK` : typeDisplay.split(" ")[0]}
                          </span>
                        </div>

                        <div className="bg-slate-50 py-1.5 px-1 rounded-lg">
                          <span className="block text-[9px] sm:text-[10px] text-slate-400 font-medium">City</span>
                          <span className="font-bold text-slate-800 text-[11px] sm:text-xs truncate block">{property.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded truncate max-w-[130px]">
                        {property.status}
                      </span>
                      <span className="text-xs font-bold text-emerald-900 group-hover:text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View Details</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

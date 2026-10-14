"use client";

import Image from "next/image";
import { popularCities } from "@/data/mockData";

export default function PopularCities({ onSelectCity }) {
  const handleCityClick = (cityName) => {
    if (onSelectCity) {
      onSelectCity(cityName);
    }
  };

  return (
    <section id="popular-cities" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
            Top Indian Markets
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Popular Cities
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Click any city below to instantly filter available residential and commercial properties in that market.
          </p>
        </div>

        {/* 6 City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {popularCities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => handleCityClick(city.name)}
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-4 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {/* City Background Image */}
              <div className="absolute inset-0 z-0 bg-slate-800">
                <Image
                  src={city.image}
                  alt={`Real estate in ${city.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/10 transition-colors" />
              </div>

              {/* City Card Information */}
              <div className="relative z-10 text-white w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded backdrop-blur-sm border border-emerald-500/20">
                    {city.state}
                  </span>
                  <span className="text-xs font-semibold text-slate-200 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    {city.avgPrice}
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white mt-2 group-hover:text-emerald-300 transition-colors">
                  {city.name}
                </h3>

                <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                  <span>{city.propertyCount}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
                    View City Listings →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

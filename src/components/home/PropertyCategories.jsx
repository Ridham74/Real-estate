"use client";

import { propertyCategories } from "@/data/mockData";

export default function PropertyCategories({ onSelectCategory }) {
  const getCategoryIcon = (icon) => {
    switch (icon) {
      case "buy":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "rent":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        );
      case "new-projects":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case "commercial":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "plot":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        );
      case "coliving":
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
          </svg>
        );
    }
  };

  const colorStyles = {
    emerald: {
      bg: "bg-emerald-50/70 hover:bg-emerald-100/70",
      border: "border-emerald-200/80 hover:border-emerald-300",
      iconBg: "bg-emerald-600 text-white",
      badge: "bg-emerald-100 text-emerald-800",
    },
    blue: {
      bg: "bg-blue-50/70 hover:bg-blue-100/70",
      border: "border-blue-200/80 hover:border-blue-300",
      iconBg: "bg-blue-600 text-white",
      badge: "bg-blue-100 text-blue-800",
    },
    amber: {
      bg: "bg-amber-50/70 hover:bg-amber-100/70",
      border: "border-amber-200/80 hover:border-amber-300",
      iconBg: "bg-amber-600 text-white",
      badge: "bg-amber-100 text-amber-800",
    },
    indigo: {
      bg: "bg-indigo-50/70 hover:bg-indigo-100/70",
      border: "border-indigo-200/80 hover:border-indigo-300",
      iconBg: "bg-indigo-600 text-white",
      badge: "bg-indigo-100 text-indigo-800",
    },
    teal: {
      bg: "bg-teal-50/70 hover:bg-teal-100/70",
      border: "border-teal-200/80 hover:border-teal-300",
      iconBg: "bg-teal-600 text-white",
      badge: "bg-teal-100 text-teal-800",
    },
    rose: {
      bg: "bg-rose-50/70 hover:bg-rose-100/70",
      border: "border-rose-200/80 hover:border-rose-300",
      iconBg: "bg-rose-600 text-white",
      badge: "bg-rose-100 text-rose-800",
    },
  };

  const handleCategoryClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <section id="categories" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 w-full">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
            Browse Segments
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore by Property Category
          </h2>
          <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base">
            Click any segment below to immediately filter matching properties across India.
          </p>
        </div>

        {/* 6 Category Cards Grid - Responsive from 2 cols on mobile to 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {propertyCategories.map((category) => {
            const style = colorStyles[category.color] || colorStyles.emerald;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className={`group flex flex-col p-3.5 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 text-left cursor-pointer hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 min-h-[140px] sm:min-h-[160px] justify-between ${style.bg} ${style.border}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-3">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 flex-shrink-0 ${style.iconBg}`}
                    >
                      {getCategoryIcon(category.icon)}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full truncate max-w-[70px] sm:max-w-none ${style.badge}`}>
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-950 transition-colors leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 line-clamp-1">
                    {category.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-slate-700 w-full">
                  <span className="truncate">{category.count}</span>
                  <span className="text-emerald-700 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-1">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

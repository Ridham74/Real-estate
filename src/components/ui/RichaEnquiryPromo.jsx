"use client";

import { RICHA_BASE_URL } from "@/lib/richaConfig";

/**
 * Reusable promotional banner for Richa AI placed strategically near property enquiry experiences.
 * Connects the enquiry process with Richa AI's capabilities for real estate teams (qualifying leads & scheduling visits)
 * without claiming Richa AI directly answers the demo form or sending any user data externally.
 *
 * @param {Object} props
 * @param {"card" | "compact" | "modal"} [props.variant="card"] Styling variant
 * @param {string} [props.className] Additional CSS classes
 */
export default function RichaEnquiryPromo({ variant = "card", className = "" }) {
  const url = RICHA_BASE_URL;

  if (variant === "compact" || variant === "modal") {
    return (
      <div
        className={`rounded-xl p-3 bg-emerald-50/80 border border-emerald-200/90 text-slate-800 text-xs shadow-xs ${className}`}
      >
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
              Have questions about this property? Discover how Richa AI helps real-estate teams manage enquiries and schedule visits.
            </p>
            <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded"
                aria-label="Discover Richa AI (opens in a new tab)"
              >
                <span>Discover Richa AI</span>
                <span className="text-[10px]">↗</span>
              </a>
              <span className="text-[10px] text-slate-400 font-medium">• Official Real Estate AI</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default "card" variant for the sidebar enquiry section
  return (
    <div
      className={`mt-4 rounded-2xl p-4 bg-gradient-to-br from-emerald-50/90 via-slate-50 to-emerald-50/60 border border-emerald-200/80 shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-900 tracking-tight">Real Estate AI Assistant</span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Richa AI
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Have questions about this property? Discover how Richa AI helps real-estate teams manage enquiries and schedule visits.
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-700 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Discover Richa AI (opens in a new tab)"
            >
              <span>Discover Richa AI</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span className="text-[10px] text-slate-400 font-medium">B2B Lead Qualification</span>
          </div>
        </div>
      </div>
    </div>
  );
}

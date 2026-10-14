"use client";

import { RICHA_DEMO_URL } from "@/lib/richaConfig";

/**
 * Reusable Richa AI Button / Link Component
 *
 * Implements secure external redirection to https://richasales.com/
 * with target="_blank" and rel="noopener noreferrer" attributes,
 * preserving HomeConnect open in the original browser tab.
 */
export default function RichaDemoButton({
  children = "Request a Free Demo",
  className = "",
  variant = "primary", // "primary" | "secondary" | "outline" | "compact" | "nav"
  icon = "arrow", // "arrow" | "play" | "sparkles" | "none"
  url = RICHA_DEMO_URL,
  ariaLabel,
  onClick,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 active:scale-[0.99] cursor-pointer text-center";

  const variants = {
    primary:
      "px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950",
    secondary:
      "px-5 sm:px-6 py-3.5 sm:py-4 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-sm hover:border-white/40 focus-visible:ring-white",
    outline:
      "px-5 sm:px-6 py-3.5 sm:py-4 min-h-[44px] rounded-xl border border-emerald-400/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 hover:text-white hover:border-emerald-400 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all focus-visible:ring-emerald-400",
    compact:
      "px-3.5 py-1.5 min-h-[38px] text-xs font-semibold rounded-lg text-emerald-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-600",
    nav:
      "px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-emerald-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
  };

  const variantClass = variants[variant] || variants.primary;
  const labelText = typeof children === "string" ? children : "Richa AI Action";
  const finalAriaLabel = ariaLabel || `${labelText} on Richa AI`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={finalAriaLabel}
      title={labelText}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${className}`}
      {...props}
    >
      {icon === "play" && (
        <svg
          className="w-4 h-4 mr-2 flex-shrink-0 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}

      {icon === "sparkles" && (
        <svg
          className="w-4 h-4 mr-2 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
          />
        </svg>
      )}

      <span>{children}</span>

      {icon === "arrow" && (
        <svg
          className="w-4 h-4 ml-1.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      )}
    </a>
  );
}

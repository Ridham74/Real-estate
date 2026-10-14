"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RICHA_BASE_URL,
  RICHA_DEMO_URL,
  HOMECONNECT_LOGIN_URL,
  HOMECONNECT_SIGNUP_URL,
  RICHA_TRY_FORM_URL,
} from "@/lib/richaConfig";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "Categories", href: "/#categories" },
    { name: "Properties", href: "/#properties" },
    { name: "Cities", href: "/#popular-cities" },
    { name: "About", href: "/#why-choose-us" },
    { name: "Richa AI", href: RICHA_BASE_URL, isExternal: true },
    { name: "Contact", href: "/#contact" },
  ];

  const authLinks = {
    demo: RICHA_DEMO_URL,
    tryRicha: RICHA_TRY_FORM_URL,
    login: HOMECONNECT_LOGIN_URL,
    signup: HOMECONNECT_SIGNUP_URL,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5 sm:py-3"
          : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 sm:py-3.5 shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg flex-shrink-0"
            aria-label="HomeConnect Homepage"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center transition-all duration-300 shadow-sm flex-shrink-0 group-hover:bg-emerald-700">
              {/* House icon with chimney & roof */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                Home<span className="text-emerald-700">Connect</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider -mt-0.5 text-emerald-800">
                India Properties
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 px-3 py-1.5 text-xs font-bold rounded-full bg-violet-100 text-violet-700 border border-violet-200/90 hover:bg-violet-200/80 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-500 focus:outline-none inline-flex items-center gap-1.5 shadow-xs"
                  aria-label={`${link.name} (Official Website, opens in a new tab)`}
                >
                  <svg className="w-3.5 h-3.5 text-violet-600 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                  <span>{link.name}</span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/60 rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none flex items-center gap-1"
                >
                  <span>{link.name}</span>
                  {link.name === "Categories" && (
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth Buttons (>= 1024px) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href={authLinks.login}
              className="px-3.5 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-slate-950 border border-slate-200/80 hover:bg-slate-50 transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              aria-label="Login to HomeConnect"
              title="Login to HomeConnect"
            >
              <span>Login</span>
            </Link>
            <Link
              href={authLinks.signup}
              className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus:ring-offset-2"
              aria-label="Sign up for HomeConnect"
              title="Sign Up for HomeConnect"
            >
              <span>Sign Up</span>
              <span className="text-xs">→</span>
            </Link>
          </div>

          {/* Mobile & Tablet Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href={authLinks.tryRicha}
              className="px-2.5 py-1.5 min-h-[38px] flex items-center justify-center text-xs font-semibold rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500 focus:outline-none"
              aria-label="Try Richa AI Demo"
            >
              Try AI
            </Link>
            <Link
              href={authLinks.login}
              className="px-2.5 py-1.5 min-h-[38px] flex items-center justify-center text-xs font-semibold rounded-lg text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
              aria-label="Login to HomeConnect"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isScrolled ? "text-slate-800 hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-3 text-base font-semibold text-emerald-900 bg-emerald-50/70 hover:bg-emerald-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none flex items-center justify-between"
                  aria-label={`${link.name} (Official Website, opens in a new tab)`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{link.name}</span>
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">Official ↗</span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-3 text-base font-semibold text-slate-800 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href={authLinks.tryRicha}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 min-h-[44px] text-sm font-bold rounded-xl text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-violet-600 focus:outline-none"
              aria-label="Try Richa AI Demo"
            >
              <span>Try Richa AI (Demo Call)</span>
              <span className="text-xs">→</span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={authLinks.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 min-h-[40px] text-xs font-semibold rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
                aria-label="Watch Demo on Richa AI"
              >
                <svg className="w-3.5 h-3.5 fill-current text-emerald-800" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                <span>Watch Demo</span>
              </a>
              <a
                href={authLinks.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 min-h-[40px] text-xs font-semibold rounded-xl text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
                aria-label="Request a Demo on Richa AI"
              >
                <span>Request a Demo</span>
              </a>
            </div>
            <Link
              href={authLinks.login}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 min-h-[44px] text-sm font-semibold rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
              aria-label="Login to HomeConnect"
            >
              <span>Sign In to HomeConnect</span>
            </Link>
            <Link
              href={authLinks.signup}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 min-h-[44px] text-sm font-semibold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-colors shadow-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-600 focus:outline-none"
              aria-label="Sign up for HomeConnect"
            >
              <span>Create HomeConnect Account</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

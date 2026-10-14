import Link from "next/link";
import {
  RICHA_BASE_URL,
  RICHA_DEMO_URL,
  HOMECONNECT_LOGIN_URL,
  HOMECONNECT_SIGNUP_URL,
  RICHA_TRY_FORM_URL,
} from "@/lib/richaConfig";

export default function Footer() {
  const baseUrl = RICHA_BASE_URL;
  const demoUrl = RICHA_DEMO_URL;
  const loginUrl = HOMECONNECT_LOGIN_URL;
  const signupUrl = HOMECONNECT_SIGNUP_URL;
  const tryFormUrl = RICHA_TRY_FORM_URL;

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 pt-14 pb-8 sm:pb-10 border-t border-slate-900 w-full">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 sm:pb-12 border-b border-slate-900">
          {/* Col 1: Brand Info & Socials (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  Home<span className="text-emerald-400">Connect</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider -mt-0.5 text-emerald-400/80">
                  India Properties
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              A modern real estate platform powered by Richa AI. Explore properties, connect with trusted agents and never miss an enquiry.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3 text-slate-400">
              {/* LinkedIn */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="LinkedIn"
              >
                in
              </a>
              {/* Instagram */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Instagram"
              >
                ig
              </a>
              {/* YouTube */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="YouTube"
              >
                yt
              </a>
              {/* Facebook */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="Facebook"
              >
                fb
              </a>
              {/* X */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors text-xs"
                aria-label="X"
              >
                𝕏
              </a>
            </div>
          </div>

          {/* Col 2: Properties (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Properties
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  New Projects
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  Plot / Land
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-emerald-400 transition-colors">
                  PG / Co-living
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/#why-choose-us" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href={baseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Richa AI Official Website"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Richa AI</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Request a Demo"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Request Demo ↗
                </a>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Account & Support (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Account & Support
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href={loginUrl} className="hover:text-emerald-400 transition-colors">
                  HomeConnect Login
                </Link>
              </li>
              <li>
                <Link href={signupUrl} className="hover:text-emerald-400 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href={tryFormUrl} className="text-violet-400 hover:text-violet-300 font-medium transition-colors flex items-center gap-1">
                  <span>Try Richa AI Demo</span>
                  <span className="text-xs">→</span>
                </Link>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Terms of Use
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Download Our App (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Download Our App
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Get the HomeConnect app for a better property search experience.
            </p>
            <div className="flex flex-col gap-2">
              {/* Google Play Button */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white transition-colors"
                aria-label="Download on Google Play"
              >
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.597 1.597 0 01-.61-.914V2.728c0-.348.225-.688.609-.914zM15.207 13.414l2.122 2.122-12.72 7.344 10.598-9.466zm0-2.828L4.609 1.12l12.72 7.344-2.122 2.122zm1.414 1.414l3.879-2.24c.789-.456.789-1.2 0-1.656L16.62 8l2.257 2.257-2.256 2.257z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Get it on</span>
                  <span className="text-xs font-bold leading-tight">Google Play</span>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href={baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white transition-colors"
                aria-label="Download on App Store"
              >
                <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.65-2.82 1.45-.6.7-1.13 1.83-1 2.94 1.08.08 2.18-.47 2.83-1.29z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400">Download on the</span>
                  <span className="text-xs font-bold leading-tight">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 HomeConnect. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <span className="text-rose-500">❤️</span>
            <span>for a Smarter Real Estate Experience.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

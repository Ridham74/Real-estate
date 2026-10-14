"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RICHA_BASE_URL,
  RICHA_DEMO_URL,
  RICHA_TRY_FORM_URL,
} from "@/lib/richaConfig";

const verticalFeatures = [
  {
    id: "calls",
    title: "Answers Calls 24x7",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: "qualifies",
    title: "Qualifies Leads",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "visits",
    title: "Schedules Site Visits",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "crm",
    title: "Integrates with CRM",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zm0 4h16M9 4v16" />
      </svg>
    ),
  },
  {
    id: "languages",
    title: "Supports Multiple Languages",
    icon: (
      <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
  },
];

const workflowSteps = [
  {
    num: "1",
    title: "Customer Enquiries",
    desc: "Calls or submits an enquiry about a property.",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    num: "2",
    title: "Richa AI Responds",
    desc: "Answers questions, understands requirements and shares details.",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    num: "3",
    title: "Qualifies the Lead",
    desc: "Collects budget, location, property type and schedules site visits.",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "4",
    title: "Handoff to Your Team",
    desc: "Sends qualified leads to your agents with call summary.",
    icon: (
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function CallToAction() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const demoUrl = RICHA_DEMO_URL;
  const exploreUrl = RICHA_BASE_URL;

  return (
    <section id="richa-ai" className="py-16 sm:py-20 bg-gradient-to-b from-violet-50/60 via-white to-slate-50 w-full scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Top Showcase: Headline, Hero Visual & Feature Stack */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            Introducing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            <span className="text-violet-600">Richa AI</span> — Your 24x7 <br className="hidden sm:inline" />
            Real Estate Call Assistant
          </h2>
          <p className="mt-3.5 sm:mt-4 text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            Never miss a lead again. Richa AI answers calls, handles enquiries, qualifies buyers, schedules site visits and helps your real estate business grow.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Watch Demo on Richa AI official website"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>Watch Demo</span>
            </a>
            <a
              href={exploreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-xs transition-all cursor-pointer"
              aria-label="Request a Free Demo on Richa AI official website"
            >
              <span>Request a Free Demo</span>
            </a>
          </div>
        </div>

        {/* Center Presentation: Richa Portrait + Live Phone UI + Vertical Feature Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto mb-16 sm:mb-20">
          {/* Portrait of Richa with Overlay Badge */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[380px] sm:h-[440px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900">
              <Image
                src="/images/richa-avatar.jpg"
                alt="Richa AI Call Assistant"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Pill Overlay Badge at bottom of photo */}
            <div className="absolute bottom-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 z-10">
              <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[10px]">
                ✦
              </div>
              <span className="text-xs font-bold text-slate-900">Richa AI</span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] text-slate-500 font-medium">Your AI Call Assistant</span>
            </div>
          </div>

          {/* Center: Smartphone Live Conversation Simulation */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[270px] bg-slate-950 rounded-[2.5rem] p-3.5 shadow-2xl border-4 border-slate-800 text-left">
              {/* Call Top Bar */}
              <div className="flex items-center justify-between text-white text-[11px] px-2 py-1 mb-3">
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  00:24
                </span>
                <span className="text-slate-400">Live Call</span>
              </div>

              {/* Chat Bubble 1 (AI Assistant) */}
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 mb-2.5 text-xs text-slate-800 shadow-sm leading-relaxed">
                <p className="text-[10px] font-bold text-violet-700 mb-0.5">Richa AI</p>
                Hi, I&apos;m Richa AI from HomeConnect. How can I help you today?
              </div>

              {/* Chat Bubble 2 (User) */}
              <div className="bg-emerald-600 text-white rounded-2xl rounded-tr-sm p-3 mb-2.5 text-xs ml-auto max-w-[85%] shadow-sm leading-relaxed">
                I&apos;m looking for a 3 BHK in Ahmedabad.
              </div>

              {/* Chat Bubble 3 (AI Assistant) */}
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 mb-4 text-xs text-slate-800 shadow-sm leading-relaxed">
                <p className="text-[10px] font-bold text-violet-700 mb-0.5">Richa AI</p>
                Great! I can help you with that. May I know your budget range?
              </div>

              {/* Bottom Glowing Mic */}
              <div className="pt-2 pb-1 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/50">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: 5 Vertical Capability Badges */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {verticalFeatures.map((feat) => (
              <div
                key={feat.id}
                className="bg-white hover:bg-violet-50/50 border border-slate-200/90 hover:border-violet-300 rounded-xl p-3.5 shadow-xs transition-all flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                  {feat.icon}
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">
                  {feat.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: How Richa AI Works for Real Estate */}
        <div className="mb-16 sm:mb-20 pt-8 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Richa AI Works for Real Estate
            </h3>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              From enquiry to site visit, fully automated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between relative group hover:border-violet-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.num}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 z-10 text-lg font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Dual Grid (Why Real Estate Businesses Choose + Hear Richa AI in Action) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Card: Why Real Estate Businesses Choose Richa AI */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5">
                Why Real Estate Businesses <br className="hidden sm:inline" />
                Choose <span className="text-violet-600">Richa AI</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">No Missed Calls: </span>
                    <span className="text-slate-600">Capture every enquiry, even after hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">More Qualified Leads: </span>
                    <span className="text-slate-600">AI filters and qualifies genuine buyers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Save Time & Reduce Costs: </span>
                    <span className="text-slate-600">Automate repetitive questions and follow-ups.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Better Customer Experience: </span>
                    <span className="text-slate-600">Instant, accurate and friendly responses.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Image with Floating Badge */}
            <div className="relative mt-6 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <Image
                src="/images/hero-villa.jpg"
                alt="Luxury real estate project"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800">Turn More Enquiries into Site Visits</span>
              </div>
            </div>
          </div>

          {/* Right Card: Hear Richa AI in Action (Dark Audio Card) */}
          <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                Hear Richa AI in Action
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Listen to a sample real estate call conversation.
              </p>

              {/* Audio Card Widget */}
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500/80 flex-shrink-0">
                    <Image
                      src="/images/richa-avatar.jpg"
                      alt="Richa AI"
                      fill
                      sizes="40px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="flex items-center gap-2 text-white hover:text-violet-300 transition-colors focus:outline-none"
                    >
                      <div className="w-7 h-7 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs">
                        {isPlayingAudio ? "❚❚" : "▶"}
                      </div>
                      <span className="text-xs font-mono text-slate-300">0:00 / 0:45</span>
                    </button>
                    {/* Simulated Waveform Bar */}
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="h-2 w-1 bg-violet-500 rounded-full"></span>
                      <span className="h-4 w-1 bg-violet-400 rounded-full"></span>
                      <span className="h-6 w-1 bg-violet-500 rounded-full"></span>
                      <span className="h-3 w-1 bg-violet-400 rounded-full"></span>
                      <span className="h-5 w-1 bg-violet-600 rounded-full"></span>
                      <span className="h-2 w-1 bg-violet-400 rounded-full"></span>
                      <span className="h-4 w-1 bg-violet-500 rounded-full"></span>
                      <span className="h-6 w-1 bg-violet-400 rounded-full"></span>
                      <span className="h-3 w-1 bg-violet-500 rounded-full"></span>
                      <span className="h-2 w-1 bg-slate-700 rounded-full"></span>
                      <span className="h-4 w-1 bg-slate-700 rounded-full"></span>
                      <span className="h-5 w-1 bg-slate-700 rounded-full"></span>
                    </div>
                  </div>
                </div>

                {/* Call Quote */}
                <p className="text-xs text-slate-300 italic bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                  &ldquo;Hi, I&apos;m Richa AI from HomeConnect. How can I help you today?&rdquo;
                </p>
              </div>
            </div>

            {/* Bottom Demo Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-900">
              <Link
                href={RICHA_TRY_FORM_URL}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm text-center shadow-md transition-all cursor-pointer"
                aria-label="Try Live Demo on Richa AI"
              >
                Try Live Demo
              </Link>
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm text-center border border-white/20 transition-all cursor-pointer"
                aria-label="Request a Custom Demo on Richa AI"
              >
                Request a Custom Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

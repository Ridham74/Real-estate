"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RICHA_BASE_URL } from "@/lib/richaConfig";

export default function TryRichaAiPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyInterest: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/richa-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-violet-100 selection:text-violet-900">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-800 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-violet-700 font-semibold">Try Richa AI</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Context & Feature Highlights */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span>✦</span>
                <span>Richa AI Call Assistant</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Experience Real-Time <br />
                <span className="text-violet-600">AI Calling</span> for Real Estate
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                Submit your name and phone number below to receive an automated demo call from Richa AI. Experience how our AI sales agent qualifies property enquiries, answers listing queries, and schedules site visits 24/7.
              </p>

              {/* 3 Quick Benefit Bullets */}
              <div className="mt-6 space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ✓
                  </div>
                  <span>Instant demonstration call to your mobile number</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ✓
                  </div>
                  <span>Real-time voice qualification & natural conversation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    ✓
                  </div>
                  <span>Zero spam, automated demonstration only</span>
                </div>
              </div>

              {/* Assistant Bio Pill */}
              <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-violet-400 flex-shrink-0">
                  <Image
                    src="/images/richa-avatar.jpg"
                    alt="Richa AI"
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Richa AI</h4>
                  <p className="text-xs text-slate-500">First AI Sales Agent of India for Real Estate</p>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-violet-500/10 relative">
                {submitted ? (
                  <div className="py-8 text-center animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                      Callback Request Submitted!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                      Thank you, <strong className="text-slate-900">{formData.name}</strong>! Richa AI will initiate a demonstration call to <strong className="text-slate-900">{formData.phone}</strong> shortly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", phone: "", propertyInterest: "" });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
                      >
                        Submit Another Number
                      </button>
                      <a
                        href={RICHA_BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md shadow-violet-500/30 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Visit Official Richa AI Portal</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        Try Richa AI Demo
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Submit your details to experience an automated property enquiry call.
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {errorMsg}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div>
                        <label htmlFor="lead-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="lead-name"
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number (+91) <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="lead-phone"
                          type="tel"
                          required
                          placeholder="e.g. 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="lead-interest" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Property Interest / City <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="lead-interest"
                          type="text"
                          placeholder="e.g. 3 BHK in Ahmedabad or Mumbai Villa"
                          value={formData.propertyInterest}
                          onChange={(e) => setFormData({ ...formData, propertyInterest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg shadow-violet-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {loading ? (
                          <span>Connecting...</span>
                        ) : (
                          <>
                            <span>Request Richa AI Callback</span>
                            <span>→</span>
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-slate-400 text-center mt-3">
                        By submitting, you agree to receive a demonstration call powered by Richa AI.
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

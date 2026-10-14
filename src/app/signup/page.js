"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    accountType: "Buyer / Tenant",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate account registration
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Header / Brand */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg
                  className="w-6 h-6"
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
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Join Home<span className="text-emerald-700">Connect</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Create an account to browse verified listings and schedule visits.
              </p>
            </div>

            {success ? (
              <div className="py-6 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Account Created Successfully!</h3>
                <p className="text-xs text-slate-500">Welcome to HomeConnect. Redirecting you home...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Name */}
                <div>
                  <label htmlFor="signup-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="signup-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number (+91) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="signup-phone"
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="signup-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="signup-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label htmlFor="signup-type" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    I am a
                  </label>
                  <select
                    id="signup-type"
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Buyer / Tenant">Buyer / Tenant</option>
                    <option value="Property Owner">Property Owner / Seller</option>
                    <option value="Real Estate Agent">Real Estate Agent / Broker</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <span>Creating Account...</span> : <span>Create HomeConnect Account</span>}
                </button>
              </form>
            )}

            {/* Bottom Link to Login */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              <span>Already have a HomeConnect account? </span>
              <Link href="/login" className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

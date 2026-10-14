"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 1200);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setEmail("demo@homeconnect.in");
    setPassword("Welcome@123");
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
                Welcome Back to Home<span className="text-emerald-700">Connect</span>
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Sign in to manage your saved properties, enquiries, and visits.
              </p>
            </div>

            {success ? (
              <div className="py-6 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Signed in successfully!</h3>
                <p className="text-xs text-slate-500">Redirecting to your HomeConnect dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <span className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 border-slate-300"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-[11px] text-emerald-800 hover:text-emerald-950 font-semibold underline"
                  >
                    Use Demo Account
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 min-h-[44px] rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <span>Signing In...</span> : <span>Sign In to HomeConnect</span>}
                </button>
              </form>
            )}

            {/* Bottom Link to Sign Up */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
              <span>Don&apos;t have an account yet? </span>
              <Link href="/signup" className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

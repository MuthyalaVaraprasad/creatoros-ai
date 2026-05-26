"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#060410] px-6 py-12 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-950/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-950/20 blur-[100px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">ViralFlow <span className="text-purple-400">AI</span></span>
          </Link>
          <h2 className="text-xl font-bold text-gray-200 mt-6">Forgot Password</h2>
          <p className="text-xs text-gray-500 mt-1">We'll help you restore access to your account</p>
        </div>

        {/* Card Form */}
        <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Send Reset Link <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-white">Reset Email Sent!</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                If an account exists for <span className="text-gray-200">{email}</span>, you'll receive a password reset link shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs text-purple-400 hover:underline font-semibold"
              >
                Try another email
              </button>
            </div>
          )}
        </div>

        {/* Bottom Link */}
        <p className="text-center text-xs mt-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white font-medium">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { 
  auth, 
  db,
  googleProvider, 
  githubProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  sendEmailVerification 
} from "@/lib/firebase";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP Verification view state
  const [showOtpView, setShowOtpView] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms of Service");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // Real Firebase signup
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "dummy-api-key-for-viralflow-ai") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Save initial user profile in Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          name: name,
          email: email,
          avatar: "",
          provider: "password",
          createdAt: new Date().toISOString(),
          subscription: "Free Tier",
          onboardingCompleted: false
        });

        await sendEmailVerification(userCredential.user);
        setShowOtpView(true);
        return;
      }

      // Local API / DB Fallback
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (data.success) {
        setShowOtpView(true);
      } else {
        setError(data.error || "Failed to sign up");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to authentication services");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "1234" || otpCode.length === 4) {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "dummy-api-key-for-viralflow-ai") {
        localStorage.setItem(
          "userSession",
          JSON.stringify({ 
            email, 
            name, 
            isLoggedIn: true, 
            needsOnboarding: true,
            onboardingCompleted: false,
            subscription: "Free Tier"
          })
        );
        window.location.href = "/dashboard";
        return;
      }

      localStorage.setItem(
        "userSession",
        JSON.stringify({ email, name, isLoggedIn: true, needsOnboarding: true })
      );
      window.location.href = "/dashboard";
    } else {
      setOtpError("Invalid verification code. Enter '1234' for verification.");
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "dummy-api-key-for-viralflow-ai") {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Write to Firestore users collection
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "Google Creator",
          email: user.email || "",
          avatar: user.photoURL || "",
          provider: "google.com",
          createdAt: new Date().toISOString(),
          subscription: "Free Tier",
          onboardingCompleted: false
        }, { merge: true });

        localStorage.setItem("userSession", JSON.stringify({
          email: user.email,
          name: user.displayName || "Google Creator",
          isLoggedIn: true,
          photoURL: user.photoURL,
          needsOnboarding: true
        }));
        window.location.href = "/dashboard";
        return;
      }

      // Fallback
      localStorage.setItem("userSession", JSON.stringify({ email: "google.user@example.com", name: "Google Creator", isLoggedIn: true, needsOnboarding: true }));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Google Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "dummy-api-key-for-viralflow-ai") {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;

        // Write to Firestore users collection
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "GitHub Creator",
          email: user.email || "",
          avatar: user.photoURL || "",
          provider: "github.com",
          createdAt: new Date().toISOString(),
          subscription: "Free Tier",
          onboardingCompleted: false
        }, { merge: true });

        localStorage.setItem("userSession", JSON.stringify({
          email: user.email,
          name: user.displayName || user.email?.split("@")[0] || "GitHub Creator",
          isLoggedIn: true,
          photoURL: user.photoURL,
          needsOnboarding: true
        }));
        window.location.href = "/dashboard";
        return;
      }

      // Fallback
      localStorage.setItem("userSession", JSON.stringify({ email: "github.user@example.com", name: "GitHub Creator", isLoggedIn: true, needsOnboarding: true }));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "GitHub Authentication failed");
    } finally {
      setLoading(false);
    }
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
            <span className="text-2xl font-bold tracking-tight text-white">
              ViralFlow <span className="text-purple-400">AI</span>
            </span>
          </Link>
        </div>

        {/* Card Form */}
        <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
          {!showOtpView ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-200">Create Creator Account</h2>
                <p className="text-xs text-gray-500 mt-1">Start generating viral content automatically</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                      <Lock className="h-4 w-4" />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50"
                  />
                  <label htmlFor="agree" className="text-[11px] text-gray-400 leading-none">
                    I agree to the{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {loading ? "Creating..." : "Sign Up"} <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-5">
                <div className="flex-1 h-[1px] bg-white/5" />
                <span className="text-[10px] text-gray-500 px-3 uppercase tracking-wider font-semibold">
                  Or signup with
                </span>
                <div className="flex-1 h-[1px] bg-white/5" />
              </div>

              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/5 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl border border-white/5 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-white">Verify Your Email</h3>
                <p className="text-xs text-gray-500">We've sent a 4-digit code to your inbox</p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {otpError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center font-medium">
                    {otpError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400">Verification Code</label>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter code (e.g. 1234)"
                    className="w-full text-center tracking-widest px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-lg text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Verify & Continue <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Link */}
        {!showOtpView && (
          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Log In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  Video, 
  Hash, 
  Image as ImageIcon, 
  Calendar, 
  MessageSquare, 
  BarChart2, 
  Zap, 
  Shield, 
  Users, 
  Play, 
  Check, 
  HelpCircle,
  Menu,
  X,
  Volume2
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("script");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const features = [
    {
      id: "script",
      name: "AI Script Generator",
      icon: Video,
      description: "Create engaging scripts for YouTube, Reels & Shorts with custom tone and structure.",
      color: "from-violet-500 to-indigo-500",
      preview: {
        title: "5 AI Tools Every Creator Needs in 2026",
        hook: "If you are not using AI to create content in 2026, you are already falling behind. Here are the top 5 tools that will save you 20+ hours a week...",
        body: "[Scene 1: Fast cut of AI avatar working] \nVoiceover: Let's start with tool number one: Midjourney v7. It's not just for art anymore; it's a complete content generation engine..."
      }
    },
    {
      id: "hook",
      name: "Viral Hook Generator",
      icon: Sparkles,
      description: "Generate attention-grabbing hooks based on psychological triggers.",
      color: "from-pink-500 to-rose-500",
      preview: {
        title: "Curiosity Trigger Hooks",
        hook: "I tried 50 AI tools and this one literally felt illegal to know...",
        body: "This simple psychological trick got me 1.2M views in 24 hours. (Here's exactly how it works...)"
      }
    },
    {
      id: "hashtag",
      name: "Smart Hashtag Generator",
      icon: Hash,
      description: "Find trending and search-optimized tags for any niche.",
      color: "from-cyan-500 to-blue-500",
      preview: {
        title: "Niche: Tech Automation",
        hook: "#aiediting #creatorspace #viralflow #youtubetips2026",
        body: "Recommended: Use 3 broad hashtags and 4 micro-niche hashtags for maximum algorithmic reach."
      }
    }
  ];

  const faqs = [
    {
      q: "How does ViralFlow AI generate viral scripts?",
      a: "Our AI is trained on thousands of viral YouTube videos, TikToks, and Instagram Reels. It analyzes structures, retention hooks, and pacing to write scripts designed for high viewer retention."
    },
    {
      q: "Is there a limit to how many scripts I can generate?",
      a: "Free users get 5 generations per month. Creator Pro members enjoy unlimited generations, priority access to newer AI models, and custom brand voices."
    },
    {
      q: "Can I export my content calendar?",
      a: "Yes! You can export your content schedules to Google Calendar, Notion, or download them as CSV/PDF files directly from the dashboard."
    },
    {
      q: "Does this support multi-platform posting?",
      a: "Currently, ViralFlow AI plans and formats your content specifically for YouTube, Instagram, TikTok, and LinkedIn. Auto-posting integrations are coming soon."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060410] font-sans selection:bg-purple-500/30 selection:text-white">
      {/* Floating Animated Gradient Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-[150px] pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-purple-900/20 blur-[150px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 border-b border-white/5 backdrop-blur-md bg-[#060410]/50 sticky top-0">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ViralFlow <span className="text-purple-400">AI</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#faqs" className="hover:text-purple-400 transition-colors">FAQ</a>
            <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard Preview</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-white hover:text-purple-400 transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="glow-button inline-flex items-center justify-center rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/20 hover:scale-[1.02] transition-all">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/5 bg-[#060410]/95 px-6 py-4 flex flex-col gap-4 text-center">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 py-2">Features</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 py-2">Pricing</a>
            <a href="#faqs" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 py-2">FAQ</a>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-gray-300 py-2">Dashboard</Link>
            <div className="h-[1px] bg-white/5 my-2" />
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-white py-2">Log In</Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full inline-flex items-center justify-center rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white">
              Get Started
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 md:pt-32 md:pb-40 text-center px-6 max-w-5xl mx-auto">
        {/* Banner Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 mb-8 animate-bounce">
          <Sparkles className="h-3 w-3" /> Now powered by Gemini 1.5 & Pro Models
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-8">
          Create Viral Content <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 drop-shadow-[0_2px_20px_rgba(168,85,247,0.3)]">
            With AI in Seconds
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Generate high-retention video scripts, engaging hooks, trending hashtags, cinematic thumbnail prompts, and structured content schedules automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 px-8 py-4 text-base font-bold text-white shadow-xl shadow-purple-600/30 hover:scale-[1.03] transition-all duration-300">
            Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white transition-all duration-300">
            Try Demo Workspace
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5 max-w-4xl mx-auto text-left">
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-white">50K+</p>
            <p className="text-sm text-gray-500 mt-1">Active Creators</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-purple-400">10M+</p>
            <p className="text-sm text-gray-500 mt-1">Scripts Generated</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-pink-400">95%</p>
            <p className="text-sm text-gray-500 mt-1">Time Saved</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-extrabold text-indigo-400">4.9/5</p>
            <p className="text-sm text-gray-500 mt-1">User Rating</p>
          </div>
        </div>
      </section>

      {/* Interactive Tool Preview Mockup */}
      <section id="features" className="relative z-10 px-6 max-w-6xl mx-auto pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Unleash Ultimate Creator Potential</h2>
          <p className="text-gray-400 max-w-xl mx-auto">One unified workspace with six specialized AI systems built to scale your channel.</p>
        </div>

        <div className="glass-card p-6 md:p-8 relative overflow-hidden border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
          {/* Top Bar Decoration */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-green-500/60" />
            </div>
            <div className="bg-white/5 border border-white/5 text-[10px] md:text-xs text-gray-500 px-3 py-1 rounded-md flex items-center gap-2">
              <Zap className="h-3 w-3 text-purple-400" /> demo-workspace.viralflow.ai/dashboard
            </div>
            <div className="h-3 w-3" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Nav Tabs */}
            <div className="flex flex-col gap-3">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                      activeTab === feature.id
                        ? "bg-purple-600/10 border border-purple-500/30 text-white"
                        : "hover:bg-white/5 border border-transparent text-gray-400"
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-tr ${feature.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{feature.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{feature.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Showcase Box */}
            <div className="md:col-span-2 glass-card p-6 bg-black/40 border-white/5 flex flex-col justify-between">
              {features.map((feature) => {
                if (feature.id !== activeTab) return null;
                return (
                  <div key={feature.id} className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                        {feature.name} Preview Output
                      </span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                        Ready to Export
                      </span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <h5 className="font-bold text-sm text-white border-b border-white/5 pb-2 mb-2">
                        {feature.preview.title}
                      </h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">The Retention Hook:</p>
                          <p className="text-xs text-gray-300 italic">"{feature.preview.hook}"</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Scene Outline / Content Snippet:</p>
                          <p className="text-xs text-gray-400 whitespace-pre-line leading-relaxed">
                            {feature.preview.body}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Link href="/signup" className="flex-1 text-center py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors">
                        Use this Tool in Dashboard
                      </Link>
                      <button className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-medium border border-white/10">
                        Copy Preview
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Other Features */}
      <section className="relative z-10 px-6 max-w-6xl mx-auto pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 border-white/5">
            <div className="h-12 w-12 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Content Planner Calendar</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Drag-and-drop posts, discover optimal publishing times, and view AI recommendations for weekly content distribution.
            </p>
          </div>
          <div className="glass-card p-8 border-white/5">
            <div className="h-12 w-12 rounded-xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Creator Chat Assistant</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Consult with a specialized AI strategist. Request titles, channel reviews, SEO strategies, and custom marketing insights instantly.
            </p>
          </div>
          <div className="glass-card p-8 border-white/5">
            <div className="h-12 w-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cinematic Thumbnail Prompts</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate descriptive AI generator prompts (Midjourney, DALL-E) to secure click-worthy YouTube thumbnails and covers.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 px-6 max-w-5xl mx-auto pb-32 border-t border-white/5 pt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400">Scale your channel from a side-project to a full-time business.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="glass-card p-8 border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">Starter</h4>
              <p className="text-gray-500 text-xs mt-1">Perfect for hobbyists.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-gray-400 text-sm font-medium"> / forever</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 5 generations / month</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> AI Script Generator basic</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Web-based dashboard</li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 block w-full text-center py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-bold transition-all">
              Sign Up Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 border-purple-500/50 bg-purple-900/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col justify-between relative scale-[1.03]">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Creator Pro</h4>
              <p className="text-purple-300 text-xs mt-1">For professional creators.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$29</span>
                <span className="text-gray-400 text-sm font-medium"> / month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Unlimited generations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Advanced Hook/Hashtag tool</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Content Calendar export</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Custom brand voices</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Priority API access (Gemini Pro)</li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-600/30 transition-all">
              Upgrade to Pro
            </Link>
          </div>

          {/* Agency Plan */}
          <div className="glass-card p-8 border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-white">Agency / Brand</h4>
              <p className="text-gray-500 text-xs mt-1">For high-growth teams.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">$99</span>
                <span className="text-gray-400 text-sm font-medium"> / month</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> 5 Team Member Seats</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Advanced Analytics suite</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Custom API integrations</li>
                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-purple-400" /> Dedicated Account Manager</li>
              </ul>
            </div>
            <Link href="/signup" className="mt-8 block w-full text-center py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-bold transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="relative z-10 px-6 max-w-4xl mx-auto pb-32 border-t border-white/5 pt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about the platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card border-white/5 overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left font-semibold text-white hover:text-purple-300 transition-colors"
              >
                <span>{faq.q}</span>
                <HelpCircle className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${faqOpen === index ? "rotate-180" : ""}`} />
              </button>
              {faqOpen === index && (
                <div className="px-6 pb-6 text-sm text-gray-400 border-t border-white/5 pt-4 animate-slideDown">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/60 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">ViralFlow AI</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Empowering the next generation of content creators with state-of-the-art AI.
            </p>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Product</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Resources</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Creator Guide</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal</h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {new Date().getFullYear()} ViralFlow AI. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>Powered by Gemini AI</span>
            <span>Vercel Deploy Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

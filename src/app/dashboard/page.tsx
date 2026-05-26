"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Video,
  Sparkle,
  Hash,
  Image as ImageIcon,
  Calendar,
  MessageSquare,
  BarChart2,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Copy,
  Download,
  Send,
  Mic,
  MoreVertical,
  Plus,
  Play,
  Check,
  TrendingUp,
  Volume2,
  LogOut,
  FolderOpen,
  User,
  Sliders,
  Tv,
  Music,
  Share2,
  Zap,
  Shield,
  Layers,
  Award,
  Users,
  FileText,
  CreditCard,
  Target,
  Edit3,
  Flame,
  HelpCircle,
  Eye,
  Trophy,
  LayoutGrid
} from "lucide-react";

export default function Dashboard() {
  // Theme & Navigation
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Notifications Toast
  const [toastMessage, setToastMessage] = useState("");
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Database State sync
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  // Onboarding Tour Modal
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [creatorNicheInput, setCreatorNicheInput] = useState("Tech & SaaS");
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>([]);

  useEffect(() => {
    // Check if user session needs onboarding
    const sessionStr = localStorage.getItem("userSession");
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (session.needsOnboarding) {
        setShowOnboarding(true);
        session.needsOnboarding = false;
        localStorage.setItem("userSession", JSON.stringify(session));
      }
    }

    // Load Initial DB records
    fetch("/api/projects").then(res => res.json()).then(data => {
      if (data.success) setRecentProjects(data.data);
    });
    fetch("/api/calendar").then(res => res.json()).then(data => {
      if (data.success) setCalendarEvents(data.data);
    });
    fetch("/api/brand").then(res => res.json()).then(data => {
      if (data.success && data.data) {
        setBrandColorPrimary(data.data.colorPrimary);
        setBrandColorSecondary(data.data.colorSecondary);
        setBrandFont(data.data.font);
        setBrandVoice(data.data.voice);
      }
    });
  }, []);

  // 1. Script Generator
  const [scriptTopic, setScriptTopic] = useState("5 AI Tools every YouTuber should use in 2026");
  const [scriptPlatform, setScriptPlatform] = useState("YouTube");
  const [scriptVideoType, setScriptVideoType] = useState("Shorts");
  const [scriptOutput, setScriptOutput] = useState({
    hook: "Want to save hours of work as a Creator? 🤯\nThese 5 AI tools will completely change your content game!",
    intro: "Hey creators! In this video, I'll show you 5 powerful AI tools that every YouTuber should be using in 2026 to grow faster, work smarter, and create better content.",
    body: "[TOOL 1: CHATGPT/CLAUDE]\n- Use it for script writing, video ideas, titles, and more.\n\n[TOOL 2: MIDJOURNEY]\n- Generate gorgeous, high-click-through-rate thumbnails.\n\n[TOOL 3: VIRALFLOW AI]\n- Plan your complete content calendar and schedule posts with custom algorithms.",
    cta: "If you found this helpful, hit subscribe and share this with another creator!"
  });
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [scriptTypingIndex, setScriptTypingIndex] = useState(100);

  const handleGenerateScript = async () => {
    setIsGeneratingScript(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "script",
          topic: scriptTopic,
          platform: scriptPlatform,
          videoType: scriptVideoType
        })
      });
      const data = await res.json();
      if (data.success) {
        setScriptOutput(data.data);
        setScriptTypingIndex(0);

        // Save generated project to DB history
        const saveRes = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: scriptTopic,
            type: "Script",
            platform: scriptPlatform,
            content: data.data.hook + "\n\n" + data.data.intro + "\n\n" + data.data.body
          })
        });
        const savedData = await saveRes.json();
        if (savedData.success) {
          setRecentProjects((prev) => [savedData.data, ...prev]);
        }
        showToast("Script generated and saved!");
      }
    } catch (e) {
      showToast("Error generating script");
    } finally {
      setIsGeneratingScript(false);
    }
  };

  useEffect(() => {
    if (scriptTypingIndex < 100) {
      const interval = setInterval(() => {
        setScriptTypingIndex((prev) => prev + 5);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [scriptTypingIndex]);

  // 2. Hook Generator
  const [hookTopic, setHookTopic] = useState("AI tools for content creators");
  const [generatedHooks, setGeneratedHooks] = useState([
    "These 5 AI tools will 10X your content in 2026! 🔥",
    "YouTubers are using these AI tools... Are you?",
    "Stop wasting time! Use these AI tools instead."
  ]);
  const [isGeneratingHooks, setIsGeneratingHooks] = useState(false);

  const handleGenerateHooks = async () => {
    setIsGeneratingHooks(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "hooks", topic: hookTopic })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedHooks(data.data);
        showToast("Hooks generated!");
      }
    } catch (e) {
      showToast("Error generating hooks");
    } finally {
      setIsGeneratingHooks(false);
    }
  };

  // 3. Hashtag Generator
  const [hashtagTopic, setHashtagTopic] = useState("AI tools, YouTube, content creator");
  const [generatedHashtags, setGeneratedHashtags] = useState([
    "#AItools", "#YouTubeTips", "#ContentCreator"
  ]);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);

  const handleGenerateHashtags = async () => {
    setIsGeneratingHashtags(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "hashtags", topic: hashtagTopic, keywords: hashtagTopic })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedHashtags(data.data);
        showToast("Hashtags generated!");
      }
    } catch (e) {
      showToast("Error generating hashtags");
    } finally {
      setIsGeneratingHashtags(false);
    }
  };

  // 4. Thumbnail Prompt Generator
  const [thumbnailTopic, setThumbnailTopic] = useState("AI Tools YouTuber Guide");
  const [thumbnailPlatform, setThumbnailPlatform] = useState("YouTube");
  const [generatedPrompt, setGeneratedPrompt] = useState(
    "Cinematic close-up of a content creator looking shocked at a glowing screen."
  );
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

  const handleGenerateThumbnail = async () => {
    setIsGeneratingThumbnail(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "thumbnail", topic: thumbnailTopic, platform: thumbnailPlatform })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedPrompt(data.data.prompt || data.data.text);
        showToast("Thumbnail prompt generated!");
      }
    } catch (e) {
      showToast("Error generating prompt");
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  // 5. Content Calendar & Scheduler
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventPlatform, setNewEventPlatform] = useState("YouTube");
  const [newEventDate, setNewEventDate] = useState(25);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const handleAddCalendarEvent = async () => {
    if (!newEventTitle.trim()) return;
    const isShorts = newEventPlatform.toLowerCase().includes("shorts") || newEventPlatform.toLowerCase().includes("reels");
    const color = isShorts ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-red-500/20 text-red-400 border-red-500/30";

    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newEventTitle, platform: newEventPlatform, date: newEventDate, color })
      });
      const data = await res.json();
      if (data.success) {
        setCalendarEvents((prev) => [...prev, data.data]);
        setNewEventTitle("");
        setShowAddEventModal(false);
        showToast("Scheduled video block!");
      }
    } catch (e) {
      showToast("Error scheduling event");
    }
  };

  // 6. AI Chat Assistant
  const [chatMessages, setChatMessages] = useState([
    { sender: "user", content: "Give me some video ideas for my tech channel." },
    { sender: "ai", content: "Here are some trending ideas:\n1. Top 5 AI Tools for Productivity\n2. How AI is Changing the Future\n3. Best Laptops for Creators" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput("");
    setIsAiTyping(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "chat", messages: [...chatMessages, userMsg] })
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages((prev) => [...prev, { sender: "ai", content: data.data }]);
      }
    } catch (e) {
      showToast("Error getting AI response");
    } finally {
      setIsAiTyping(false);
    }
  };

  // Helper functions
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard!");
  };

  const exportAsTxt = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded text file!");
  };

  // ==========================================
  // PREMIUM STARTUP FEATURES STATES
  // ==========================================

  // A. AI Avatar Video Generator
  const [selectedAvatar, setSelectedAvatar] = useState("Alex - Tech Pro");
  const [avatarVoice, setAvatarVoice] = useState("US Male - Deep/Professional");
  const [avatarScript, setAvatarScript] = useState("Welcome to the future of content generation powered by ViralFlow AI. Let's create something amazing.");
  const [avatarBackground, setAvatarBackground] = useState("Cyberpunk Studio");
  const [isRenderingAvatar, setIsRenderingAvatar] = useState(false);
  const [avatarRenderProgress, setAvatarRenderProgress] = useState(0);
  const [avatarVideoGenerated, setAvatarVideoGenerated] = useState(false);

  const handleGenerateAvatarVideo = () => {
    setIsRenderingAvatar(true);
    setAvatarRenderProgress(0);
    setAvatarVideoGenerated(false);
    const interval = setInterval(() => {
      setAvatarRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRenderingAvatar(false);
          setAvatarVideoGenerated(true);
          showToast("AI Avatar Video Rendered!");
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  // B. AI Voice Generator
  const [ttsText, setTtsText] = useState("This is the modern AI voiceover system powered by advanced neural models.");
  const [ttsGender, setTtsGender] = useState("Male");
  const [ttsAccent, setTtsAccent] = useState("US English");
  const [ttsTone, setTtsTone] = useState("Energetic");
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [audioWaves, setAudioWaves] = useState<number[]>([10, 20, 10, 30, 45, 60, 20, 15, 30, 50, 40, 25, 10]);

  useEffect(() => {
    let waveInterval: any;
    if (ttsPlaying) {
      waveInterval = setInterval(() => {
        setAudioWaves(Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 10));
      }, 150);
    } else {
      setAudioWaves([10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
    }
    return () => clearInterval(waveInterval);
  }, [ttsPlaying]);

  // C. Trend Detection Engine
  const [selectedNiche, setSelectedNiche] = useState("Tech & Gadgets");
  const trendingMusic = [
    { title: "Neo Soul Groove (Viral)", uses: "1.2M Reels", growth: "+145%" },
    { title: "Cyberpunk Synthwave Beat", uses: "940K Reels", growth: "+92%" },
    { title: "Chill Lofi Creator Vibe", uses: "650K Reels", growth: "+45%" }
  ];
  const trendingTopics = [
    { topic: "ChatGPT Desktop App Secrets", interest: "98/100 Score", color: "text-rose-400" },
    { topic: "How I Automated My Faceless Channel", interest: "89/100 Score", color: "text-amber-400" },
    { topic: "Next.js 16 Real-world Performance", interest: "82/100 Score", color: "text-emerald-400" }
  ];

  // D. Video Idea Generator
  const [ideaNiche, setIdeaNiche] = useState("Tech");
  const [generatedIdeas, setGeneratedIdeas] = useState([
    { id: 1, title: "I built an AI agent to do my job for a week", score: 98, saved: false },
    { id: 2, title: "Next-Gen AI productivity setups you can build now", score: 89, saved: false },
    { id: 3, title: "How 16-year olds are building SaaS platforms", score: 82, saved: false }
  ]);

  const toggleSaveIdea = (id: number) => {
    setGeneratedIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, saved: !i.saved } : i))
    );
    showToast("Idea state updated!");
  };

  // E. SEO Optimizer
  const [seoTitle, setSeoTitle] = useState("How to Start an AI SaaS in 2026");
  const [seoDescription, setSeoDescription] = useState("In this video, I'll walk you through building your very first AI SaaS platform from scratch using next-generation tools.");
  const [seoKeywords, setSeoKeywords] = useState("AI, SaaS, Next.js, Developer");
  const seoScore = 87;

  // F. Reels/Shorts Generator
  const [reelsTopic, setReelsTopic] = useState("AI Productivity Hacks");
  const [reelsTone, setReelsTone] = useState("Hype/Energetic");
  const [reelsPlatform, setReelsPlatform] = useState("Instagram Reels");
  const [generatedReelsScript, setGeneratedReelsScript] = useState({
    hook: "Stop wasting hours coding basic features! Here's how to build a SaaS in 10 minutes... 🤯",
    body: "First, you spin up a Next.js template. Next, connect Gemini API for intelligent features. Finally, style it with glowing glassmorphic elements. Done!",
    cta: "Follow for more elite developer hacks! 🚀"
  });

  // G. Multi-Platform Posting & Brand settings
  const [brandColorPrimary, setBrandColorPrimary] = useState("#8b5cf6");
  const [brandColorSecondary, setBrandColorSecondary] = useState("#ec4899");
  const [brandFont, setBrandFont] = useState("Outfit / Inter");
  const [brandVoice, setBrandVoice] = useState("Professional, futuristic, slightly cheeky");

  const handleSaveBrandKit = async () => {
    try {
      const res = await fetch("/api/brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          colorPrimary: brandColorPrimary,
          colorSecondary: brandColorSecondary,
          font: brandFont,
          voice: brandVoice
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Brand kit saved persistently!");
      }
    } catch (e) {
      showToast("Error saving brand profiles");
    }
  };

  // I. Comment Reply Generator
  const [recentComments, setRecentComments] = useState([
    { id: 1, user: "DevDave", text: "This tool saved me 5 hours today. Incredible stuff!", reply: "" },
    { id: 2, user: "DesignQueen", text: "Can you show how you styled those neon charts?", reply: "" }
  ]);

  const handleGenerateReply = (id: number, tone: string) => {
    setRecentComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const replyText =
            tone === "witty"
              ? `Thanks, ${c.user}! We aim to save hours and look good doing it. 😉`
              : `Appreciate the feedback, ${c.user}! Stay tuned for more templates.`;
          return { ...c, reply: replyText };
        }
        return c;
      })
    );
    showToast("Smart reply generated!");
  };

  // J. CTR Thumbnail Analyzer
  const [thumbnailCtrScore, setThumbnailCtrScore] = useState(8.7);
  const [thumbnailContrastScore, setThumbnailContrastScore] = useState(92);
  const [selectedOverlay, setSelectedOverlay] = useState("none");

  // K. Title A/B Testing
  const [abTitleA, setAbTitleA] = useState("I Automated My Faceless YouTube Channel");
  const [abTitleB, setAbTitleB] = useState("How to Build a Faceless AI YouTube Channel in 10 Mins");
  const [abPredictWinner, setAbPredictWinner] = useState("B");

  // L. Gamification System
  const [streakCount, setStreakCount] = useState(12);
  const [creatorXp, setCreatorXp] = useState(7450);
  const creatorLevel = "Level 14 - Social Overlord";

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-[#060410] text-gray-200" : "bg-gray-50 text-gray-800"} font-sans overflow-x-hidden relative pb-16 lg:pb-0`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[100] bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-xs px-4 py-3 rounded-xl shadow-lg border border-purple-400/20 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-white animate-spin" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Onboarding Tour Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center px-6">
          <div className="glass-card w-full max-w-md p-6 border-white/10 bg-[#0a0718] text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 h-24 w-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {onboardingStep === 1 && (
              <div className="space-y-4">
                <Sparkles className="h-10 w-10 text-purple-400 mx-auto animate-bounce" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Welcome to ViralFlow AI!</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Let's personalize your dashboard workspace to target your custom audience profiles.
                </p>
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] text-gray-500 font-bold uppercase">What is your creator niche?</label>
                  <input
                    type="text"
                    value={creatorNicheInput}
                    onChange={(e) => setCreatorNicheInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setOnboardingStep(2)}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Next Step
                </button>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4">
                <Target className="h-10 w-10 text-pink-400 mx-auto animate-pulse" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Select Platforms</h3>
                <p className="text-xs text-gray-400">Where do you want to publish your content?</p>
                <div className="grid grid-cols-2 gap-3">
                  {["YouTube", "Instagram Reels", "TikTok", "Twitter / X"].map((plat) => {
                    const isSel = targetPlatforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        onClick={() => {
                          setTargetPlatforms(prev =>
                            prev.includes(plat) ? prev.filter(p => p !== plat) : [...prev, plat]
                          );
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSel
                            ? "bg-purple-600/20 border-purple-500/40 text-purple-400"
                            : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        {plat}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    setShowOnboarding(false);
                    showToast("Workspace configuration synced successfully!");
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Complete Onboarding Tour
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col bg-[#0b0914] border-r border-white/5 p-5 shrink-0 justify-between overflow-y-auto max-h-screen">
          <div className="space-y-6">
            {/* Sidebar Logo */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-black text-white tracking-tight">ViralFlow AI</span>
                <p className="text-[9px] text-gray-500 tracking-wider font-semibold">CREATOR OS V2.0</p>
              </div>
            </div>

            {/* Sidebar Sections */}
            <nav className="flex flex-col gap-1">
              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider pl-2 mb-1 block">Core Studio</span>
              {[
                { name: "Dashboard", icon: Sliders },
                { name: "AI Script Generator", icon: Video },
                { name: "Viral Hook Generator", icon: Sparkle },
                { name: "Hashtag Generator", icon: Hash },
                { name: "Thumbnail Prompts", icon: ImageIcon },
                { name: "Content Calendar", icon: Calendar },
                { name: "AI Chat Assistant", icon: MessageSquare }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isSelected
                        ? "bg-purple-600/25 border border-purple-500/30 text-purple-400"
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                    {item.name}
                  </button>
                );
              })}

              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider pl-2 mt-4 mb-1 block">Premium Generators</span>
              {[
                { name: "AI Avatar Video", icon: Tv },
                { name: "AI Voiceover", icon: Volume2 },
                { name: "Trend Radar", icon: Music },
                { name: "Viral Ideas", icon: Target },
                { name: "SEO Optimizer", icon: Search },
                { name: "Reels Studio", icon: Edit3 },
                { name: "Social Scheduler", icon: Calendar },
                { name: "Workflow Builder", icon: Layers }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isSelected
                        ? "bg-purple-600/25 border border-purple-500/30 text-purple-400"
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                    {item.name}
                  </button>
                );
              })}

              <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider pl-2 mt-4 mb-1 block">Management & Growth</span>
              {[
                { name: "Brand Kit", icon: Shield },
                { name: "Smart Comments", icon: MessageSquare },
                { name: "Repurpose Hub", icon: Share2 },
                { name: "CTR Analyzer", icon: Eye },
                { name: "A/B Titles", icon: Edit3 },
                { name: "Creator Levels", icon: Trophy },
                { name: "Billing & Pro", icon: CreditCard },
                { name: "Admin Suite", icon: Users },
                { name: "Settings", icon: Settings }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      isSelected
                        ? "bg-purple-600/25 border border-purple-500/30 text-purple-400"
                        : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom actions & stats */}
          <div className="space-y-4 pt-6 border-t border-white/5 mt-6">
            <div className="flex items-center gap-2 px-1">
              <Flame className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
              <div className="text-[10px] font-bold">
                <span className="text-white">{streakCount} Day Streak!</span>
                <span className="text-gray-500 block">Next reward at 15d</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Toggle Mode"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </button>

              <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Log Out">
                <LogOut className="h-4 w-4 text-rose-400" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <header className="h-16 border-b border-white/5 bg-[#070510]/60 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
            {/* Search */}
            <div className="flex items-center gap-3 w-72">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Ask global search AI..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/30"
                />
              </div>
            </div>

            {/* Platform Title */}
            <span className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <Sparkle className="h-4 w-4 text-purple-500 animate-spin" /> Creator Workspace Suite
            </span>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-pink-500 rounded-full animate-ping" />
              </button>

              <div className="flex items-center gap-3 pl-3 border-l border-white/5">
                <div className="text-right">
                  <p className="text-xs font-bold text-white">Creator Pro</p>
                  <p className="text-[9px] text-purple-400 font-semibold">{creatorLevel}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                  CP
                </div>
              </div>
            </div>
          </header>

          {/* Render Active View */}

          {/* ========================================== */}
          {/* TAB: DASHBOARD (OVERVIEW) */}
          {/* ========================================== */}
          {activeTab === "Dashboard" && (
            <div className="p-6 space-y-6">
              {/* Welcome banner */}
              <div className="bg-gradient-to-r from-[#170e30] via-[#0d0920] to-[#070510] border border-purple-500/10 p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="absolute top-0 right-1/4 h-32 w-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">Welcome back, Creator! 👋</h2>
                  <p className="text-xs text-gray-400 mt-1">Unlock your channels potential with 25+ viral AI tools.</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => setActiveTab("AI Avatar Video")} className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-900/40">
                    + Generate Avatar Video
                  </button>
                  <button onClick={() => setActiveTab("Workflow Builder")} className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-xs font-semibold">
                    Launch Workflow
                  </button>
                </div>
              </div>

              {/* Advanced metrics quick cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Viral Probability", val: "94.6%", color: "text-emerald-400", desc: "Super High Trend Match" },
                  { label: "A/B Winner CTR", val: "11.2%", color: "text-purple-400", desc: "Predicted from title B" },
                  { label: "XP to Level Up", val: "2,550", color: "text-amber-400", desc: "Level 14 Active" },
                  { label: "MRR Saved Time", val: "42 Hours", color: "text-cyan-400", desc: "This week automation" }
                ].map((m, idx) => (
                  <div key={idx} className="glass-card p-4 border-white/5">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{m.label}</span>
                    <h3 className={`text-xl font-black mt-1.5 ${m.color}`}>{m.val}</h3>
                    <span className="text-[10px] text-gray-400 mt-1 block">{m.desc}</span>
                  </div>
                ))}
              </div>

              {/* Grid with main workspace widgets */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-6">
                  {/* Dynamic widgets row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Fast script tool */}
                    <div className="glass-card p-5 border-white/5 flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-4">
                        <Video className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">Fast Script Generator</span>
                      </div>
                      <input
                        type="text"
                        value={scriptTopic}
                        onChange={(e) => setScriptTopic(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 mb-3"
                      />
                      <button onClick={handleGenerateScript} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                        Generate Script
                      </button>
                    </div>

                    {/* Fast hook tool */}
                    <div className="glass-card p-5 border-white/5 flex flex-col justify-between">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkle className="h-4 w-4 text-pink-400" />
                        <span className="text-xs font-bold text-white">Retention Hook Generator</span>
                      </div>
                      <input
                        type="text"
                        value={hookTopic}
                        onChange={(e) => setHookTopic(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 mb-3"
                      />
                      <button onClick={handleGenerateHooks} className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold">
                        Generate Hooks
                      </button>
                    </div>
                  </div>

                  {/* Saved Projects History List */}
                  <div className="glass-card p-5 border-white/5">
                    <span className="text-xs font-bold text-white block mb-3">Saved Projects & History</span>
                    <div className="space-y-2">
                      {recentProjects.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-xl text-xs">
                          <div>
                            <p className="text-gray-200 font-bold">{p.title}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{p.type} • {p.platform}</p>
                          </div>
                          <span className="text-[10px] text-gray-400">{p.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side dashboard modules */}
                <div className="space-y-6">
                  {/* Gamification Streak/XP card */}
                  <div className="glass-card p-5 border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Creator Streaks</span>
                      <Award className="h-4.5 w-4.5 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Flame className="h-8 w-8 text-amber-500 animate-pulse" />
                      <div>
                        <p className="text-lg font-black text-white">{streakCount} Days Active</p>
                        <p className="text-[10px] text-gray-400">Keep posting daily to keep your multiplier!</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-1">
                        <span>XP: {creatorXp} / 10,000</span>
                        <span>Level 14</span>
                      </div>
                      <div className="h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                        <div style={{ width: `${(creatorXp / 10000) * 100}%` }} className="h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      </div>
                    </div>
                  </div>

                  {/* Social connections Status widget */}
                  <div className="glass-card p-5 border-white/5">
                    <span className="text-xs font-bold text-white block mb-3">Linked Accounts</span>
                    <div className="space-y-2.5">
                      {[
                        { name: "YouTube Creator Studio", status: "Active", col: "text-emerald-400" },
                        { name: "Instagram Business Profile", status: "Active", col: "text-emerald-400" },
                        { name: "TikTok Business Account", status: "Active", col: "text-emerald-400" },
                        { name: "Twitter/X Premium", status: "Not Linked", col: "text-gray-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-semibold">{item.name}</span>
                          <span className={`text-[10px] font-bold ${item.col}`}>{item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: AI SCRIPT GENERATOR */}
          {/* ========================================== */}
          {activeTab === "AI Script Generator" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans uppercase tracking-tight">AI Script Generator</h2>
                  <p className="text-xs text-gray-400 mt-1">Write premium video scripts with structured scene breakdowns and hooks.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Overview
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Target Topic</label>
                    <input
                      type="text"
                      value={scriptTopic}
                      onChange={(e) => setScriptTopic(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Platform</label>
                      <select
                        value={scriptPlatform}
                        onChange={(e) => setScriptPlatform(e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option>YouTube</option>
                        <option>TikTok</option>
                        <option>Instagram</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Format</label>
                      <select
                        value={scriptVideoType}
                        onChange={(e) => setScriptVideoType(e.target.value)}
                        className="w-full p-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                      >
                        <option>Shorts</option>
                        <option>Long Form</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateScript}
                    disabled={isGeneratingScript}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    {isGeneratingScript ? "Writing script..." : "Write Viral Script"}
                  </button>
                </div>

                <div className="md:col-span-2 glass-card p-6 border-white/5 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Generated Output</span>
                    <div className="flex gap-2">
                      <button onClick={() => copyToClipboard(scriptOutput.body)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button onClick={() => exportAsTxt("script.txt", scriptOutput.body)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/10">
                      <span className="text-[10px] text-purple-400 font-bold block mb-1">[HOOK SCENE]</span>
                      <p className="text-gray-300">{scriptOutput.hook}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-[10px] text-gray-400 font-bold block mb-1">[BODY CONTENT]</span>
                      <p className="text-gray-300 whitespace-pre-line">{scriptOutput.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: AI HOOK GENERATOR */}
          {/* ========================================== */}
          {activeTab === "Viral Hook Generator" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans uppercase tracking-tight">AI Hook Generator</h2>
                  <p className="text-xs text-gray-400 mt-1">Generate high-retention video hooks based on viral storytelling angles.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Target Concept</label>
                    <input
                      type="text"
                      value={hookTopic}
                      onChange={(e) => setHookTopic(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleGenerateHooks}
                    disabled={isGeneratingHooks}
                    className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    {isGeneratingHooks ? "Generating..." : "Generate Hooks"}
                  </button>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Generated Hook Angles</span>
                  {generatedHooks.map((hk, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center text-xs">
                      <span className="text-gray-300 font-semibold italic">"{hk}"</span>
                      <button onClick={() => copyToClipboard(hk)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white shrink-0 ml-4">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: HASHTAG GENERATOR */}
          {/* ========================================== */}
          {activeTab === "Hashtag Generator" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans uppercase tracking-tight">AI Hashtag Generator</h2>
                  <p className="text-xs text-gray-400 mt-1">Extract high-popularity hashtags tailored to your topics.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Target Keywords</label>
                    <input
                      type="text"
                      value={hashtagTopic}
                      onChange={(e) => setHashtagTopic(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleGenerateHashtags}
                    disabled={isGeneratingHashtags}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    {isGeneratingHashtags ? "Generating..." : "Generate Hashtags"}
                  </button>
                </div>

                <div className="md:col-span-2 glass-card p-6 border-white/5 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Hashtags Outline</span>
                    <button onClick={() => copyToClipboard(generatedHashtags.join(" "))} className="px-3 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-bold text-gray-300 rounded-lg">
                      Copy All Tags
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: THUMBNAIL PROMPTS */}
          {/* ========================================== */}
          {activeTab === "Thumbnail Prompts" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans uppercase tracking-tight">AI Thumbnail Prompt Generator</h2>
                  <p className="text-xs text-gray-400 mt-1">Generate descriptive prompt outputs designed for Midjourney or DALL-E.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-400">Video Topic</label>
                    <input
                      type="text"
                      value={thumbnailTopic}
                      onChange={(e) => setThumbnailTopic(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={handleGenerateThumbnail}
                    disabled={isGeneratingThumbnail}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    {isGeneratingThumbnail ? "Generating..." : "Generate Prompts"}
                  </button>
                </div>

                <div className="md:col-span-2 glass-card p-6 border-white/5 space-y-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block border-b border-white/5 pb-2">Generated Prompt Outline</span>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs text-gray-300 italic leading-relaxed">
                    "{generatedPrompt}"
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button onClick={() => copyToClipboard(generatedPrompt)} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                      Copy Prompt Text
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: CONTENT CALENDAR */}
          {/* ========================================== */}
          {activeTab === "Content Calendar" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">Content Scheduler Calendar</h2>
                  <p className="text-xs text-gray-500 mt-1">Schedule and synchronize automated posting calendars.</p>
                </div>
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Schedule Block
                </button>
              </div>

              {/* Weekly calendar layout */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {[
                  { name: "Mon 20", dateNum: 20 },
                  { name: "Tue 21", dateNum: 21 },
                  { name: "Wed 22", dateNum: 22 },
                  { name: "Thu 23", dateNum: 23 },
                  { name: "Fri 24", dateNum: 24 },
                  { name: "Sat 25", dateNum: 25 },
                  { name: "Sun 26", dateNum: 26 }
                ].map((day, idx) => {
                  const dayEvents = calendarEvents.filter((ev) => Number(ev.date) === day.dateNum);
                  return (
                    <div key={idx} className="glass-card p-4 min-h-[140px] border-white/5 bg-white/[0.01] flex flex-col justify-between">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">{day.name}</span>
                      <div className="space-y-1.5 my-2">
                        {dayEvents.map((ev, eIdx) => (
                          <div key={eIdx} className={`p-1.5 rounded text-[9px] font-semibold border ${ev.color}`}>
                            {ev.title}
                          </div>
                        ))}
                      </div>
                      <span className="text-[8px] text-gray-500 font-semibold block text-right">Upload Niche OK</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: AI CHAT ASSISTANT */}
          {/* ========================================== */}
          {activeTab === "AI Chat Assistant" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-sans uppercase tracking-tight">AI Creator Copilot</h2>
                  <p className="text-xs text-gray-400 mt-1">Get customized channels advice, scripts advice, and competitor breakdowns.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="glass-card p-6 border-white/5 flex flex-col h-[500px]">
                {/* Chat Message Lists */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {chatMessages.map((msg, idx) => {
                    const isAi = msg.sender === "ai";
                    return (
                      <div key={idx} className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
                        <div className={`p-3.5 max-w-[80%] rounded-2xl text-xs font-semibold leading-relaxed border ${
                          isAi
                            ? "bg-white/5 border-white/5 text-gray-300"
                            : "bg-purple-600/25 border-purple-500/30 text-purple-400"
                        }`}>
                          <span className="text-[9px] text-gray-500 font-bold block mb-1 uppercase">
                            {isAi ? "ViralFlow Assistant" : "You"}
                          </span>
                          <p className="whitespace-pre-line">{msg.content}</p>
                        </div>
                      </div>
                    );
                  })}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="p-3 bg-white/5 border border-white/5 rounded-2xl text-xs text-purple-400 font-bold animate-pulse">
                        ViralFlow is thinking...
                      </div>
                    </div>
                  )}
                </div>

                {/* Input block */}
                <div className="flex gap-3 border-t border-white/5 pt-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder="Ask creator coach anything..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none"
                  />
                  <button onClick={handleSendChatMessage} className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: AI AVATAR VIDEO GENERATOR */}
          {/* ========================================== */}
          {activeTab === "AI Avatar Video" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Avatar Video Generator</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Generate customized human avatars representing your brand instantly.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Avatar Style</label>
                    <select
                      value={selectedAvatar}
                      onChange={(e) => setSelectedAvatar(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Alex - Tech Pro</option>
                      <option>Sarah - Lifestyle Vlogger</option>
                      <option>Sophia - Corporate Presenter</option>
                      <option>Mike - Finance Guru</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Voice Model</label>
                    <select
                      value={avatarVoice}
                      onChange={(e) => setAvatarVoice(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>US Male - Deep/Professional</option>
                      <option>UK Female - Clear/Informative</option>
                      <option>US Female - Friendly/Conversational</option>
                      <option>IN Male - Clear/Natural</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Background Scene</label>
                    <select
                      value={avatarBackground}
                      onChange={(e) => setAvatarBackground(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Cyberpunk Studio</option>
                      <option>Minimal Office</option>
                      <option>Neon Abstract Glow</option>
                      <option>Solid Dark Violet</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Voiceover Script Text</label>
                    <textarea
                      rows={4}
                      value={avatarScript}
                      onChange={(e) => setAvatarScript(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerateAvatarVideo}
                    disabled={isRenderingAvatar}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2"
                  >
                    {isRenderingAvatar ? `Rendering (${avatarRenderProgress}%)` : "Generate Avatar Video ✨"}
                  </button>
                </div>

                {/* Avatar Preview Monitor */}
                <div className="md:col-span-2 space-y-6">
                  <div className="glass-card p-6 border-white/5 flex flex-col justify-between min-h-[400px]">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block border-b border-white/5 pb-3">Avatar Render Studio</span>
                    
                    <div className="aspect-video bg-gradient-to-tr from-[#080512] to-[#1a0e36] rounded-xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden my-4">
                      {isRenderingAvatar && (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-3 z-10">
                          <div className="w-16 h-16 rounded-full border-t-2 border-purple-500 animate-spin" />
                          <p className="text-xs font-bold text-purple-400">Rendering AI Neural Talking Mesh...</p>
                        </div>
                      )}

                      {!avatarVideoGenerated && !isRenderingAvatar && (
                        <div className="text-center space-y-2 p-6">
                          <Play className="h-10 w-10 text-purple-500 mx-auto opacity-70 animate-pulse" />
                          <p className="text-xs font-bold text-gray-400">Configure parameters and hit generate to render video preview</p>
                        </div>
                      )}

                      {avatarVideoGenerated && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                          <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-purple-500/30 animate-bounce">
                            {selectedAvatar.charAt(0)}
                          </div>
                          <p className="text-xs font-black text-white mt-4 bg-black/60 px-4 py-1.5 rounded-full border border-purple-500/20">
                            {selectedAvatar} is reading narration...
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                      <button className="px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 rounded-xl">
                        Select Template
                      </button>
                      <button onClick={() => showToast("Exporting high definition video...")} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white rounded-xl">
                        Export Video MP4
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: AI VOICEOVER GENERATOR */}
          {/* ========================================== */}
          {activeTab === "AI Voiceover" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Voice Generator</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Generate studio-quality voiceovers from custom scripts with high emotional tones.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Voice Gender</label>
                    <select
                      value={ttsGender}
                      onChange={(e) => setTtsGender(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Accent Region</label>
                    <select
                      value={ttsAccent}
                      onChange={(e) => setTtsAccent(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>US English</option>
                      <option>UK English</option>
                      <option>IN English</option>
                      <option>Australian English</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tone Style</label>
                    <select
                      value={ttsTone}
                      onChange={(e) => setTtsTone(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Energetic</option>
                      <option>Professional</option>
                      <option>Calm / Narrative</option>
                      <option>Podcast Vibe</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Voice Speed ({ttsSpeed}x)</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={ttsSpeed}
                      onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <button
                    onClick={() => { setTtsPlaying(!ttsPlaying); showToast(ttsPlaying ? "Audio paused" : "Playing voice..."); }}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {ttsPlaying ? "Pause Audio" : "Listen to Voice Preview 🔊"}
                  </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="glass-card p-6 border-white/5 space-y-6">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Script Narrator</span>
                    <textarea
                      rows={5}
                      value={ttsText}
                      onChange={(e) => setTtsText(e.target.value)}
                      className="w-full p-3.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                    
                    {/* Simulated Waveform visual */}
                    <div className="h-16 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center gap-1.5 px-6">
                      {audioWaves.map((h, i) => (
                        <div 
                          key={i} 
                          style={{ height: `${h}%` }} 
                          className="w-1.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-150"
                        />
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button onClick={() => showToast("Downloading speech block...")} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                        Download voiceover MP3
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: TREND RADAR */}
          {/* ========================================== */}
          {activeTab === "Trend Radar" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Trend Detection Engine</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Explore real-time data insights, trending audio files, and platform competitor analytics.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block border-b border-white/5 pb-2">Filter Niche</span>
                  {["Tech & Gadgets", "Gaming & E-Sports", "Personal Finance", "Social Growth Hacks"].map((n) => (
                    <button
                      key={n}
                      onClick={() => { setSelectedNiche(n); showToast(`Loaded details for ${n}`); }}
                      className={`w-full text-left p-3 text-xs font-semibold rounded-xl border ${
                        selectedNiche === n
                          ? "bg-purple-600/20 border-purple-500/30 text-purple-400"
                          : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <div className="md:col-span-2 space-y-6">
                  {/* Music trends */}
                  <div className="glass-card p-6 border-white/5 space-y-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Viral Reels Audio Track Trends</span>
                    <div className="space-y-3">
                      {trendingMusic.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded-xl text-xs">
                          <div className="flex items-center gap-3">
                            <span className="h-6 w-6 bg-purple-500/20 text-purple-400 flex items-center justify-center font-black rounded-lg">
                              #{idx + 1}
                            </span>
                            <span className="font-bold text-gray-200">{item.title}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400 font-semibold">{item.uses}</p>
                            <p className="text-[9px] text-emerald-400 font-bold mt-0.5">{item.growth} growth</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: VIRAL IDEAS */}
          {/* ========================================== */}
          {activeTab === "Viral Ideas" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Video Idea Generator</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Explore high-reach topics customized to your channels focus area.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Category</label>
                    <select
                      value={ideaNiche}
                      onChange={(e) => setIdeaNiche(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Tech</option>
                      <option>Business & Finance</option>
                      <option>Lifestyle & Vlog</option>
                    </select>
                  </div>
                  <button onClick={() => showToast("Re-evaluating target ideas...")} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                    Generate New Ideas
                  </button>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Generated Video Outlines</span>
                  {generatedIdeas.map((idea) => (
                    <div key={idea.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                      <div>
                        <h4 className="text-xs font-bold text-white">{idea.title}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                            Score: {idea.score}/100
                          </span>
                          <span className="text-[9px] text-gray-500">Highly Recommended</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveIdea(idea.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors ${
                          idea.saved
                            ? "bg-emerald-600 text-white"
                            : "bg-white/5 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        {idea.saved ? "Saved" : "Save Concept"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: SEO OPTIMIZER */}
          {/* ========================================== */}
          {activeTab === "SEO Optimizer" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI SEO Optimizer</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Optimize metadata tags to rank high in search queries.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Video Title</label>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Metadescription</label>
                    <textarea
                      rows={3}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Target Keywords</label>
                    <input
                      type="text"
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button onClick={() => showToast("Calculating ranking weights...")} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl">
                    Run Optimizer Engine
                  </button>
                </div>

                <div className="md:col-span-2 space-y-6">
                  {/* Optimizer Meter */}
                  <div className="glass-card p-6 border-white/5 flex items-center justify-between gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">SEO Optimization Score</h4>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                        Your title includes high volume search keywords. Add tags in the description block to raise this score to 95+.
                      </p>
                    </div>

                    <div className="relative h-20 w-20 flex items-center justify-center shrink-0">
                      {/* SVG circle meter */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="30" className="stroke-white/5 fill-transparent" strokeWidth="6" />
                        <circle cx="40" cy="40" r="30" className="stroke-purple-500 fill-transparent" strokeWidth="6" strokeDasharray="188.4" strokeDashoffset={188.4 - (188.4 * seoScore) / 100} />
                      </svg>
                      <span className="absolute text-xs font-black text-white">{seoScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: REELS STUDIO */}
          {/* ========================================== */}
          {activeTab === "Reels Studio" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Shorts/Reels Generator</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Quickly generate high-retention short scripts and interactive caption outlines.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Concept Niche</label>
                    <input
                      type="text"
                      value={reelsTopic}
                      onChange={(e) => setReelsTopic(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tonality</label>
                    <select
                      value={reelsTone}
                      onChange={(e) => setReelsTone(e.target.value)}
                      className="w-full p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option>Hype/Energetic</option>
                      <option>Educative/Professional</option>
                      <option>Relaxed/Conversational</option>
                    </select>
                  </div>

                  <button onClick={() => showToast("Re-evaluating short outlines...")} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                    Generate Shorts Script
                  </button>
                </div>

                <div className="md:col-span-2 glass-card p-6 border-white/5 space-y-4 font-mono text-xs">
                  <div className="bg-purple-500/5 border border-purple-500/10 p-3 rounded-xl">
                    <span className="text-[10px] text-purple-400 font-bold block mb-1">[HOOK]</span>
                    <p className="text-gray-300 italic">"{generatedReelsScript.hook}"</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-3 rounded-xl">
                    <span className="text-[10px] text-gray-400 font-bold block mb-1">[BODY VOICE]</span>
                    <p className="text-gray-400">{generatedReelsScript.body}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: SOCIAL SCHEDULER */}
          {/* ========================================== */}
          {activeTab === "Social Scheduler" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Social Scheduler</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Manage pending postings across multiple integrated social platforms.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="glass-card p-6 border-white/5 space-y-6">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">Scheduled Posts Queue</span>
                <div className="space-y-3">
                  {calendarEvents.map((post) => (
                    <div key={post.id} className="flex justify-between items-center p-3.5 bg-white/5 border border-white/5 rounded-xl text-xs font-semibold">
                      <div>
                        <p className="text-white">{post.title}</p>
                        <p className="text-[9px] text-gray-500 mt-0.5">Scheduled for: May {post.date} • {post.platform}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: WORKFLOW BUILDER */}
          {/* ========================================== */}
          {activeTab === "Workflow Builder" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Content Automation Workflow</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Design automated creator pipelines with intelligent node suggestions.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              {/* Graphic nodes representation */}
              <div className="glass-card p-8 border-white/5 space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <span className="text-xs font-bold text-white uppercase tracking-wider block">Automation Nodes Flow</span>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                  {[
                    { label: "1. Topic Idea", status: "Active", desc: "Select category", color: "border-purple-500 text-purple-400" },
                    { label: "2. Script Writer", status: "Active", desc: "Write voice narration", color: "border-pink-500 text-pink-400" },
                    { label: "3. Voice Narration", status: "Active", desc: "Select audio accent", color: "border-cyan-500 text-cyan-400" },
                    { label: "4. Metatags SEO", status: "Scheduled", desc: "Optimizing tags", color: "border-gray-700 text-gray-500" }
                  ].map((node, i) => (
                    <React.Fragment key={i}>
                      <div className={`p-4 border rounded-xl bg-black/45 text-center flex-1 max-w-[160px] ${node.color}`}>
                        <p className="text-xs font-bold">{node.label}</p>
                        <p className="text-[9px] text-gray-500 mt-1 font-semibold">{node.desc}</p>
                      </div>
                      {i < 3 && <div className="hidden md:block h-[1px] w-6 bg-white/10 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: BRAND KIT */}
          {/* ========================================== */}
          {activeTab === "Brand Kit" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Brand Kit Center</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Customize default color schemes, tone patterns, and assets to align with your brand.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass-card p-5 border-white/5 space-y-4 h-fit">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary Color Hex</label>
                    <input
                      type="text"
                      value={brandColorPrimary}
                      onChange={(e) => setBrandColorPrimary(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secondary Color Hex</label>
                    <input
                      type="text"
                      value={brandColorSecondary}
                      onChange={(e) => setBrandColorSecondary(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Brand Typography</label>
                    <input
                      type="text"
                      value={brandFont}
                      onChange={(e) => setBrandFont(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                    />
                  </div>
                  <button onClick={handleSaveBrandKit} className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                    Save Brand Profile
                  </button>
                </div>

                <div className="md:col-span-2 glass-card p-6 border-white/5 space-y-4">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">Brand Narrative Configuration</span>
                  <textarea
                    rows={4}
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: SMART COMMENTS */}
          {/* ========================================== */}
          {activeTab === "Smart Comments" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Smart Comment Reply Generator</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Speed up audience engagement by generating context-rich comment replies.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>

              <div className="glass-card p-6 border-white/5 space-y-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">Recent Comments Queue</span>
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-3">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-purple-400">@{comment.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: REPURPOSE HUB */}
          {/* ========================================== */}
          {activeTab === "Repurpose Hub" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Content Repurposing Hub</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Repurpose long blog text or YouTube links into formats optimized for other platforms.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: CTR ANALYZER */}
          {/* ========================================== */}
          {activeTab === "CTR Analyzer" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">AI Thumbnail CTR Analyzer</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Analyze contrast ratios and quadrant distributions to forecast click rates.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: A/B TITLE TESTING */}
          {/* ========================================== */}
          {activeTab === "A/B Titles" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Title A/B Testing</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Test CTR potential and metric triggers across alternative options.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: CREATOR LEVELS (GAMIFICATION) */}
          {/* ========================================== */}
          {activeTab === "Creator Levels" && (
            <div className="p-6 max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Creator Gamification Dashboard</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Track daily streaks, XP details, and unlocked achievements.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: BILLING & PRO */}
          {/* ========================================== */}
          {activeTab === "Billing & Pro" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Subscription & Billing Suite</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Configure payment structures, billing cycles, or upgrade plans.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: ADMIN SUITE */}
          {/* ========================================== */}
          {activeTab === "Admin Suite" && (
            <div className="p-6 max-w-4xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">System Admin Control Room</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Control live API nodes, user allocations, database connections, and MRR metrics.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB: SETTINGS & API CONFIGS */}
          {/* ========================================== */}
          {activeTab === "Settings" && (
            <div className="p-6 max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Settings Console</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Control API key environments and notifications.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="text-xs text-purple-400 hover:underline">
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#090714] border-t border-white/5 z-55 flex items-center justify-around px-4">
        {[
          { name: "Dashboard", icon: Sliders },
          { name: "AI Script Generator", icon: Video },
          { name: "Content Calendar", icon: Calendar },
          { name: "Settings", icon: Settings }
        ].map((item) => {
          const IconComp = item.icon;
          const isSel = activeTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex flex-col items-center justify-center gap-1 text-[9px] font-bold ${isSel ? "text-purple-400" : "text-gray-500"}`}
            >
              <IconComp className="h-5 w-5" />
              <span>{item.name.replace("AI ", "")}</span>
            </button>
          );
        })}
      </div>

      {/* Scheduler Dialog Overlay */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="glass-card w-full max-w-md p-6 border-white/10 bg-[#0c0a1a] space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Schedule Publishing Block</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-semibold">Video Title</label>
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. 5 Secret AI Tools"
                  className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-semibold">Target Platform</label>
                  <select
                    value={newEventPlatform}
                    onChange={(e) => setNewEventPlatform(e.target.value)}
                    className="w-full p-2 bg-white/5 border border-white/5 rounded-xl text-xs text-gray-300 focus:outline-none"
                  >
                    <option>YouTube</option>
                    <option>Shorts</option>
                    <option>TikTok</option>
                    <option>Instagram Reels</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-semibold">Scheduled Date (May)</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleAddCalendarEvent}
                className="w-full py-2.5 mt-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/30"
              >
                Plan Video Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

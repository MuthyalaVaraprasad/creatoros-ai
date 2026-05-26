"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
  Lock,
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
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Guard route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  // Settings Dashboard States
  const [settingsSection, setSettingsSection] = useState("profile");
  const [profileName, setProfileName] = useState("Varaprasad Muthyala");
  const [profileUsername, setProfileUsername] = useState("varaprasad_m");
  const [profileBio, setProfileBio] = useState("AI content creator & developer building next-gen SaaS platforms.");
  const [profileWebsite, setProfileWebsite] = useState("https://github.com/MuthyalaVaraprasad");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [accountEmail, setAccountEmail] = useState("varaprasad@viralflow.ai");
  const [accountPassword, setAccountPassword] = useState("••••••••");
  const [enableTwoFactor, setEnableTwoFactor] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [accentColor, setAccentColor] = useState("purple");
  const [fontSize, setFontSize] = useState("medium");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [notiAiUpdates, setNotiAiUpdates] = useState(true);
  const [notiMarketing, setNotiMarketing] = useState(false);
  const [notiSecurity, setNotiSecurity] = useState(true);
  const [notiPushWorkflows, setNotiPushWorkflows] = useState(true);
  const [notiPushTrends, setNotiPushTrends] = useState(true);
  const [prefTone, setPrefTone] = useState("Witty & Engaging");
  const [prefLang, setPrefLang] = useState("English");
  const [prefCreativity, setPrefCreativity] = useState(0.7);
  const [prefLength, setPrefLength] = useState("Medium");
  const [socialsConnected, setSocialsConnected] = useState<Record<string, boolean>>({
    youtube: true,
    instagram: false,
    tiktok: true,
    twitter: false,
    linkedin: true
  });
  const [apiKeys, setApiKeys] = useState<{ id: string; key: string; name: string; date: string }[]>([
    { id: "key_1", key: "vf_live_839f28c11aa...", name: "Production Key", date: "2026-05-20" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("Muthyala's Hub");
  const [teamMembers, setTeamMembers] = useState<{ email: string; role: string }[]>([
    { email: "varaprasad@viralflow.ai", role: "Owner" },
    { email: "collab_creator@example.com", role: "Editor" }
  ]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  const [webhookUrl, setWebhookUrl] = useState("https://api.viralflow.ai/webhooks/receiver");
  const [shortcuts, setShortcuts] = useState({
    generate: "Ctrl + G",
    openDashboard: "Ctrl + D",
    save: "Ctrl + S",
    copilot: "Ctrl + K"
  });
  const [regionLanguage, setRegionLanguage] = useState("en-US");
  const [regionTimezone, setRegionTimezone] = useState("UTC+5:30 (Kolkata)");
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] = useState(false);

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

  // Sync context user to settings fields
  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
      setAccountEmail(user.email || "");
      setProfileAvatar(user.avatar || "");
    }
  }, [user]);

  const handleLogoutAction = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      showToast("Error logging out");
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#060410] flex items-center justify-center flex-col gap-4">
        <div className="h-10 w-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider animate-pulse">
          Loading Creator Studio...
        </p>
      </div>
    );
  }

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

              <button
                onClick={handleLogoutAction}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Log Out"
              >
                <LogOut className="h-4 w-4 text-rose-400" />
              </button>
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
            <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white">Settings Console</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Manage your workspace configuration, security, billing, and integrations.</p>
                </div>
                <button onClick={() => setActiveTab("Dashboard")} className="px-3.5 py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white transition-colors">
                  Back to Dashboard
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                {/* Left Inner Sidebar Navigation */}
                <div className="glass-card p-4 border-white/5 bg-white/[0.01] space-y-1 lg:col-span-1 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block px-2.5 mb-2">Preferences</span>
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "account", label: "Account", icon: Lock },
                    { id: "appearance", label: "Appearance", icon: Sun },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "ai", label: "AI Preferences", icon: Sparkles },
                    { id: "integrations", label: "Integrations", icon: Share2 },
                    { id: "security", label: "Security", icon: Shield },
                    { id: "billing", label: "Billing", icon: CreditCard },
                    { id: "workspace", label: "Workspace", icon: FolderOpen },
                    { id: "team", label: "Team", icon: Users },
                    { id: "api", label: "API Keys", icon: Zap },
                    { id: "language", label: "Language & Region", icon: Sliders },
                    { id: "export", label: "Export & Backup", icon: Download },
                    { id: "privacy", label: "Privacy", icon: Eye },
                    { id: "connected-apps", label: "Connected Apps", icon: Layers },
                    { id: "shortcuts", label: "Shortcuts", icon: Sliders },
                    { id: "accessibility", label: "Accessibility", icon: Sparkles },
                    { id: "advanced", label: "Advanced", icon: Sliders },
                    { id: "data", label: "Data Management", icon: Sliders },
                    { id: "danger", label: "Danger Zone", icon: Sliders }
                  ].map((sec) => {
                    const Icon = sec.icon;
                    const isActive = settingsSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setSettingsSection(sec.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                          isActive 
                            ? "bg-purple-600/20 border border-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/5" 
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${isActive ? "text-purple-400" : "text-gray-500"}`} />
                        <span>{sec.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Settings Detail Panels */}
                <div className="lg:col-span-3 space-y-6">
                  {/* PROFILE SETTINGS */}
                  {settingsSection === "profile" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Profile Settings</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control how your creator profile looks to visitors and platforms.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/10">
                          {profileName.charAt(0) || "C"}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => showToast("Profile photo upload trigger activated")} className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-semibold rounded-xl text-white transition-colors">
                            Upload New Photo
                          </button>
                          <button onClick={() => showToast("Avatar removed")} className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-gray-300 transition-colors">
                            Remove Photo
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Display Name</label>
                          <input
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Username</label>
                          <input
                            type="text"
                            value={profileUsername}
                            onChange={(e) => setProfileUsername(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-400">Creator Bio</label>
                        <textarea
                          rows={3}
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50 resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-400">Portfolio / Website Link</label>
                        <input
                          type="url"
                          value={profileWebsite}
                          onChange={(e) => setProfileWebsite(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                        />
                      </div>

                      <div className="flex gap-2 justify-end border-t border-white/5 pt-4">
                        <button onClick={() => showToast("Profile settings saved successfully!")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-xs font-bold rounded-xl text-white shadow-lg shadow-purple-600/20">
                          Save Profile Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ACCOUNT SETTINGS */}
                  {settingsSection === "account" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Account Configuration</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control email addresses, passwords, sessions, and multi-device lockouts.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Primary Account Email</label>
                          <input
                            type="email"
                            value={accountEmail}
                            onChange={(e) => setAccountEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Change Password</label>
                          <input
                            type="password"
                            placeholder="New password"
                            className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                          />
                        </div>
                      </div>

                      <div className="bg-white/5 p-4 border border-white/5 rounded-xl space-y-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Active User Sessions</span>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-medium text-white border-b border-white/5 pb-2">
                            <div>
                              <p className="text-purple-300">Windows PC • Chrome (Current session)</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">Kolkata, India • IP: 157.44.18.29</p>
                            </div>
                            <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded-lg uppercase tracking-wider">Active</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-medium text-white pt-1">
                            <div>
                              <p className="text-gray-300">iPhone 15 Pro • Safari App</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">Hyderabad, India • 2 hours ago</p>
                            </div>
                            <button onClick={() => showToast("Device session terminated")} className="text-[10px] text-red-400 hover:underline">
                              Revoke
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4">
                        <button onClick={() => showToast("Logged out of all other devices")} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-semibold rounded-xl text-red-400 transition-colors">
                          Logout From All Devices
                        </button>
                        <button onClick={() => showToast("Account details updated successfully!")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-xs font-bold rounded-xl text-white shadow-lg shadow-purple-600/20">
                          Save Account Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {/* APPEARANCE SETTINGS */}
                  {settingsSection === "appearance" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Appearance & Branding</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Customize theme palettes, layouts, and global typography instantly.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-gray-400 block">Theme Select</label>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { id: "dark", label: "Dark Mode", active: isDarkMode, action: () => setIsDarkMode(true) },
                              { id: "light", label: "Light Mode", active: !isDarkMode, action: () => setIsDarkMode(false) },
                              { id: "system", label: "System Default", active: false, action: () => showToast("System mode sync initialized") }
                            ].map((theme) => (
                              <button
                                key={theme.id}
                                onClick={theme.action}
                                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                                  theme.active
                                    ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md shadow-purple-500/5"
                                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                                }`}
                              >
                                {theme.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-gray-400 block">Accent Accent Color</label>
                          <div className="flex gap-3">
                            {[
                              { name: "purple", color: "bg-purple-500 border-purple-400" },
                              { name: "blue", color: "bg-blue-500 border-blue-400" },
                              { name: "pink", color: "bg-pink-500 border-pink-400" },
                              { name: "emerald", color: "bg-emerald-500 border-emerald-400" }
                            ].map((item) => (
                              <button
                                key={item.name}
                                onClick={() => {
                                  setAccentColor(item.name);
                                  showToast(`Accent color updated to ${item.name}!`);
                                }}
                                className={`h-6 w-6 rounded-full border-2 ${item.color} transition-transform ${
                                  accentColor === item.name ? "scale-125 shadow-lg" : "opacity-60 hover:opacity-100"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-gray-400 block">Sidebar Navigation State</label>
                          <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                            <div>
                              <p>Collapse Sidebar Menu</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">Hides secondary sidebar labels to maximize screen real estate.</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={sidebarCollapsed}
                              onChange={(e) => {
                                setSidebarCollapsed(e.target.checked);
                                showToast(`Sidebar collapsed: ${e.target.checked}`);
                              }}
                              className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-gray-400 block">Visual Motion & Effects</label>
                          <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                            <div>
                              <p>Smooth Dashboard Animations</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">Enables Framer Motion micro-effects across metrics and tools.</p>
                            </div>
                            <input
                              type="checkbox"
                              checked={animationsEnabled}
                              onChange={(e) => {
                                setAnimationsEnabled(e.target.checked);
                                showToast(`Animations: ${e.target.checked ? "Enabled" : "Disabled"}`);
                              }}
                              className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NOTIFICATION SETTINGS */}
                  {settingsSection === "notifications" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Notification Settings</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control live email messaging feeds and real-time browser push notifications.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Dispatches</span>
                          {[
                            { state: notiAiUpdates, setter: setNotiAiUpdates, title: "AI Generation Logs", desc: "Send summary metrics of bulk-generated creator scripts." },
                            { state: notiMarketing, setter: setNotiMarketing, title: "Creator Academy Newsletter", desc: "Tips, tricks, and case studies of viral YouTube channels." },
                            { state: notiSecurity, setter: setNotiSecurity, title: "Security Alerts & Tokens", desc: "Notification upon new login detected or API tokens modified." }
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                              <div>
                                <p>{item.title}</p>
                                <p className="text-[9px] text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                              <input
                                type="checkbox"
                                checked={item.state}
                                onChange={(e) => item.setter(e.target.checked)}
                                className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Push Notifications</span>
                          {[
                            { state: notiPushWorkflows, setter: setNotiPushWorkflows, title: "Workflow Automation Completions", desc: "Send desktop notification when long scripts are fully rendered." },
                            { state: notiPushTrends, setter: setNotiPushTrends, title: "High-Priority Trend Radar Alerts", desc: "Push notification when new viral topics match your channel niche." }
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                              <div>
                                <p>{item.title}</p>
                                <p className="text-[9px] text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                              <input
                                type="checkbox"
                                checked={item.state}
                                onChange={(e) => item.setter(e.target.checked)}
                                className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4">
                        <button onClick={() => showToast("Test notification dispatched! Check your desktop.")} className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold rounded-xl text-white transition-colors">
                          Send Test Notification
                        </button>
                        <button onClick={() => showToast("Notification configurations saved successfully!")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-xs font-bold rounded-xl text-white shadow-lg shadow-purple-600/20">
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {/* AI PREFERENCES */}
                  {settingsSection === "ai" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">AI Content Preferences</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control the tone, temperature, and length outputs of the Gemini API models.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-gray-400">Default AI Tone</label>
                            <select
                              value={prefTone}
                              onChange={(e) => setPrefTone(e.target.value)}
                              className="w-full px-3 py-2 bg-[#0c0a1c] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                            >
                              <option>Witty & Engaging</option>
                              <option>Informative & Educational</option>
                              <option>Professional & Academic</option>
                              <option>Hype & Energetic</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-gray-400">Preferred Language</label>
                            <select
                              value={prefLang}
                              onChange={(e) => setPrefLang(e.target.value)}
                              className="w-full px-3 py-2 bg-[#0c0a1c] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                            >
                              <option>English</option>
                              <option>Spanish (Español)</option>
                              <option>Hindi (हिंदी)</option>
                              <option>French (Français)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
                            <span>Creativity Level (Temperature)</span>
                            <span className="text-purple-400 font-mono">{prefCreativity}</span>
                          </div>
                          <input
                            type="range"
                            min="0.1"
                            max="1.0"
                            step="0.1"
                            value={prefCreativity}
                            onChange={(e) => setPrefCreativity(parseFloat(e.target.value))}
                            className="w-full accent-purple-500"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400 block">Default Response Size</label>
                          <div className="flex gap-2">
                            {["Short (100w)", "Medium (300w)", "Long (600w)"].map((len) => (
                              <button
                                key={len}
                                onClick={() => setPrefLength(len)}
                                className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                                  prefLength === len
                                    ? "bg-purple-600/20 border-purple-500 text-purple-300"
                                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
                                }`}
                              >
                                {len}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-4">
                        <button onClick={() => {
                          setPrefTone("Witty & Engaging");
                          setPrefLang("English");
                          setPrefCreativity(0.7);
                          setPrefLength("Medium (300w)");
                          showToast("AI preferences reset to factory defaults.");
                        }} className="text-xs text-gray-400 hover:underline">
                          Reset Defaults
                        </button>
                        <button onClick={() => showToast("AI Engine preferences saved!")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-xs font-bold rounded-xl text-white shadow-lg shadow-purple-600/20">
                          Save AI Settings
                        </button>
                      </div>
                    </div>
                  )}

                  {/* INTEGRATIONS SETTINGS */}
                  {settingsSection === "integrations" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Social Media Channels</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Directly connect your API channels to distribute scheduled posts instantly.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: "youtube", label: "YouTube Studio", desc: "Publishes shorts & tracks view analytics." },
                          { id: "instagram", label: "Instagram Reels", desc: "Syncs carousel templates and stories." },
                          { id: "tiktok", label: "TikTok Content Hub", desc: "Auto-uploads short-form mobile videos." },
                          { id: "linkedin", label: "LinkedIn Publisher", desc: "Posts text scripts and PDFs." }
                        ].map((plat) => {
                          const isConnected = socialsConnected[plat.id];
                          return (
                            <div key={plat.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
                              <div>
                                <h4 className="text-xs font-bold text-white">{plat.label}</h4>
                                <p className="text-[9px] text-gray-500 mt-0.5">{plat.desc}</p>
                              </div>
                              <button
                                onClick={() => {
                                  setSocialsConnected(prev => ({ ...prev, [plat.id]: !isConnected }));
                                  showToast(`${plat.label} ${!isConnected ? "Connected" : "Disconnected"} successfully!`);
                                }}
                                className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors ${
                                  isConnected
                                    ? "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/25"
                                    : "bg-purple-600 hover:bg-purple-500 text-white"
                                }`}
                              >
                                {isConnected ? "Disconnect" : "Connect"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* SECURITY SETTINGS */}
                  {settingsSection === "security" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Security & Access Protection</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Keep your account secure with multi-factor authentication and keys.</p>
                      </div>

                      <div className="flex justify-between items-center bg-white/5 p-4 border border-white/5 rounded-xl text-xs font-semibold text-white">
                        <div>
                          <p>Two-Factor Authentication (2FA)</p>
                          <p className="text-[9px] text-gray-500 mt-0.5">Increases account security by requiring an OTP authenticator app verification code.</p>
                        </div>
                        <button
                          onClick={() => {
                            if (!enableTwoFactor) {
                              setShowTwoFactorModal(true);
                            } else {
                              setEnableTwoFactor(false);
                              showToast("2FA disabled.");
                            }
                          }}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                            enableTwoFactor
                              ? "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
                              : "bg-purple-600 hover:bg-purple-500 text-white"
                          }`}
                        >
                          {enableTwoFactor ? "Disable" : "Configure 2FA"}
                        </button>
                      </div>

                      {/* 2FA Configuration Modal (Simulated) */}
                      {showTwoFactorModal && (
                        <div className="bg-[#0c0a1c] border border-white/10 p-5 rounded-2xl space-y-4">
                          <h4 className="text-xs font-bold text-white">Configure Authenticator App</h4>
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-xl">
                            {/* Dummy QR Code */}
                            <div className="h-28 w-28 bg-white p-2 rounded-xl flex items-center justify-center">
                              <div className="h-full w-full bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] bg-[size:10px_10px]" />
                            </div>
                            <div className="text-xs space-y-2">
                              <p className="text-gray-300">Scan this QR Code in your Google Authenticator or Duo app, then input the verified code below.</p>
                              <p className="text-[10px] text-purple-400 font-mono">Secret: VF2A_938FD8942A8C</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="000 000"
                              className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white text-center tracking-widest font-mono"
                            />
                            <button
                              onClick={() => {
                                setEnableTwoFactor(true);
                                setShowTwoFactorModal(false);
                                showToast("2FA configured successfully!");
                              }}
                              className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-xl text-white"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => setShowTwoFactorModal(false)}
                              className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl text-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* BILLING & SUBSCRIPTION */}
                  {settingsSection === "billing" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Subscription & Invoices</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control billing cycles, upgrade levels, and download invoices.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { name: "Free Tier", price: "$0", active: false },
                          { name: "Pro Studio", price: "$19/mo", active: true },
                          { name: "Enterprise Hub", price: "$99/mo", active: false }
                        ].map((plan) => (
                          <div
                            key={plan.name}
                            className={`p-4 rounded-xl border flex flex-col justify-between h-32 ${
                              plan.active
                                ? "bg-purple-600/10 border-purple-500 text-purple-300"
                                : "bg-white/5 border-white/5 text-gray-300"
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold">{plan.name}</p>
                              <p className="text-xl font-black mt-1 text-white">{plan.price}</p>
                            </div>
                            {plan.active ? (
                              <span className="text-[9px] uppercase tracking-wider font-bold text-purple-400">Current active plan</span>
                            ) : (
                              <button onClick={() => showToast(`Upgraded to ${plan.name}!`)} className="w-full py-1 bg-white/5 hover:bg-white/10 text-[9px] uppercase tracking-wider font-bold rounded-lg text-white">
                                Activate
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Billing History</span>
                        <div className="space-y-2">
                          {[
                            { id: "INV-29004", date: "May 15, 2026", amount: "$19.00" },
                            { id: "INV-28491", date: "Apr 15, 2026", amount: "$19.00" }
                          ].map((inv) => (
                            <div key={inv.id} className="flex justify-between items-center text-xs text-white border-b border-white/5 pb-2">
                              <div>
                                <p className="font-semibold">{inv.id}</p>
                                <p className="text-[9px] text-gray-500 mt-0.5">{inv.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs">{inv.amount}</span>
                                <button onClick={() => showToast(`Downloaded invoice ${inv.id}`)} className="p-1 hover:text-purple-400 text-gray-500">
                                  <Download className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WORKSPACE SETTINGS */}
                  {settingsSection === "workspace" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Workspace Configuration</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Define name details, workspace profiles, and invite scopes.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-gray-400">Workspace Name</label>
                        <input
                          type="text"
                          value={workspaceName}
                          onChange={(e) => setWorkspaceName(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => showToast("Workspace logo updated")} className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white border border-white/5">
                          Change Workspace Logo
                        </button>
                      </div>

                      <div className="flex justify-end border-t border-white/5 pt-4">
                        <button onClick={() => showToast("Workspace details updated successfully!")} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-xs font-bold rounded-xl text-white">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TEAM SETTINGS */}
                  {settingsSection === "team" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Team Collaboration</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Invite editors, manage permissions, and assign viewer tags.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          placeholder="colleague@domain.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        />
                        <select
                          value={inviteRole}
                          onChange={(e) => setInviteRole(e.target.value)}
                          className="px-3 py-2 bg-[#0c0a1c] border border-white/5 rounded-xl text-xs text-white"
                        >
                          <option>Editor</option>
                          <option>Admin</option>
                          <option>Viewer</option>
                        </select>
                        <button
                          onClick={() => {
                            if (!inviteEmail) return;
                            setTeamMembers(prev => [...prev, { email: inviteEmail, role: inviteRole }]);
                            setInviteEmail("");
                            showToast(`Invite sent to ${inviteEmail}!`);
                          }}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-xl text-white"
                        >
                          Invite Member
                        </button>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Collaborator List</span>
                        <div className="space-y-2">
                          {teamMembers.map((member) => (
                            <div key={member.email} className="flex justify-between items-center text-xs text-white border-b border-white/5 pb-2">
                              <span>{member.email}</span>
                              <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[9px] font-bold rounded-lg uppercase tracking-wider">{member.role}</span>
                                {member.role !== "Owner" && (
                                  <button
                                    onClick={() => {
                                      setTeamMembers(prev => prev.filter(m => m.email !== member.email));
                                      showToast("Member revoked");
                                    }}
                                    className="text-[10px] text-red-400 hover:underline"
                                  >
                                    Revoke
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* API SETTINGS */}
                  {settingsSection === "api" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">API Authentication Keys</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control live programmatic access keys and endpoint webhooks.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Key label (e.g. Server Key)"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            if (!newKeyName) return;
                            const newKey = {
                              id: `key_${Date.now()}`,
                              key: `vf_live_${Math.random().toString(36).substring(2, 15)}...`,
                              name: newKeyName,
                              date: new Date().toISOString().split("T")[0]
                            };
                            setApiKeys(prev => [...prev, newKey]);
                            setNewKeyName("");
                            showToast(`API Key "${newKeyName}" generated!`);
                          }}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-xs font-bold rounded-xl text-white"
                        >
                          Generate Key
                        </button>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Access Key Vault</span>
                        <div className="space-y-2">
                          {apiKeys.map((k) => (
                            <div key={k.id} className="flex justify-between items-center text-xs text-white border-b border-white/5 pb-2">
                              <div>
                                <p className="font-semibold">{k.name}</p>
                                <p className="text-[9px] text-gray-500 mt-0.5">Generated on: {k.date} • {k.key}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(k.key);
                                    showToast("Copied API key to clipboard!");
                                  }}
                                  className="p-1 hover:text-purple-400 text-gray-500"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    setApiKeys(prev => prev.filter(key => key.id !== k.id));
                                    showToast("API Key revoked successfully.");
                                  }}
                                  className="text-[10px] text-red-400 hover:underline"
                                >
                                  Revoke
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="text-[11px] font-semibold text-gray-400">Webhook Receiver Endpoint</label>
                        <input
                          type="text"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                        />
                        <button onClick={() => showToast("Webhook receiver updated")} className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-semibold rounded-xl text-white">
                          Save Webhook URL
                        </button>
                      </div>
                    </div>
                  )}

                  {/* LANGUAGE & REGION */}
                  {settingsSection === "language" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Language & Region</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Configure preferred timezone targets and standard local formatting conventions.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Display Language</label>
                          <select
                            value={regionLanguage}
                            onChange={(e) => {
                              setRegionLanguage(e.target.value);
                              showToast(`Language switched to ${e.target.value}`);
                            }}
                            className="w-full px-3 py-2 bg-[#0c0a1c] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          >
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Spanish (Español)</option>
                            <option value="fr-FR">French (Français)</option>
                            <option value="de-DE">German (Deutsch)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-gray-400">Timezone Offset</label>
                          <select
                            value={regionTimezone}
                            onChange={(e) => {
                              setRegionTimezone(e.target.value);
                              showToast(`Timezone offset synced to ${e.target.value}`);
                            }}
                            className="w-full px-3 py-2 bg-[#0c0a1c] border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          >
                            <option value="UTC+5:30 (Kolkata)">UTC+5:30 (Kolkata)</option>
                            <option value="UTC-5:00 (New York)">UTC-5:00 (New York)</option>
                            <option value="UTC+0:00 (London)">UTC+0:00 (London)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EXPORT & BACKUP */}
                  {settingsSection === "export" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Export Account Archives</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Download local backups of content records, calendar history, or script files.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { format: "CSV", label: "Analytics Report", action: () => showToast("Downloading analytics report (CSV)") },
                          { format: "PDF", label: "Script Documents", action: () => showToast("Exporting scripted layouts (PDF)") },
                          { format: "JSON", label: "Complete DB Export", action: () => showToast("Exporting DB history (JSON)") }
                        ].map((exp) => (
                          <button
                            key={exp.format}
                            onClick={exp.action}
                            className="p-4 bg-white/5 border border-white/5 rounded-xl text-center space-y-2 hover:bg-white/10 transition-colors"
                          >
                            <Download className="h-5 w-5 text-purple-400 mx-auto" />
                            <div>
                              <p className="text-xs font-bold text-white">Download {exp.format}</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">{exp.label}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRIVACY SETTINGS */}
                  {settingsSection === "privacy" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Privacy Controls</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Control how your usage statistics and platform behaviors are shared.</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>Anonymous Crash Reporting</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Share anonymous crash logs with the development team to fix runtime errors.</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>Search Indexing Visibility</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Allow public search engines like Google to index your dashboard portfolio workspace.</p>
                          </div>
                          <input type="checkbox" className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CONNECTED APPS */}
                  {settingsSection === "connected-apps" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Authorized Third-Party Applications</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Revoke access tokens or check active integrations that connect to your studio.</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: "Gemini Studio API", desc: "Access to read scripts and schedule content.", date: "Authorized 2 days ago" },
                          { name: "Canva Design Connector", desc: "Access to sync created templates into dashboard.", date: "Authorized last week" }
                        ].map((app) => (
                          <div key={app.name} className="flex justify-between items-center bg-white/5 p-4 border border-white/5 rounded-xl text-xs font-semibold text-white">
                            <div>
                              <p>{app.name}</p>
                              <p className="text-[9px] text-gray-500 mt-0.5">{app.desc} • {app.date}</p>
                            </div>
                            <button onClick={() => showToast(`${app.name} access revoked.`)} className="text-[10px] text-red-400 hover:underline">
                              Revoke Access
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* KEYBOARD SHORTCUTS */}
                  {settingsSection === "shortcuts" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Keyboard Shortcuts</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Configure hotkeys to trigger AI operations or toggle menus instantly.</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { label: "Trigger Script Generation", state: shortcuts.generate, key: "generate" },
                          { label: "Toggle Central Dashboard", state: shortcuts.openDashboard, key: "openDashboard" },
                          { label: "Save Active Content Project", state: shortcuts.save, key: "save" },
                          { label: "Activate AI Copilot Console", state: shortcuts.copilot, key: "copilot" }
                        ].map((s) => (
                          <div key={s.key} className="flex justify-between items-center bg-white/5 p-3 border border-white/5 rounded-xl text-xs font-semibold text-white">
                            <span>{s.label}</span>
                            <input
                              type="text"
                              value={s.state}
                              onChange={(e) => {
                                setShortcuts(prev => ({ ...prev, [s.key]: e.target.value }));
                              }}
                              className="w-24 text-center py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] font-bold text-purple-400 uppercase font-mono"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACCESSIBILITY */}
                  {settingsSection === "accessibility" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Accessibility Features</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Optimize contrast configurations and layout scaling.</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>High Contrast Mode</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Enforces solid white borders and high-visibility text backgrounds.</p>
                          </div>
                          <input type="checkbox" onChange={(e) => showToast(`High contrast: ${e.target.checked}`)} className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>Reduced Motion</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Disables slide-in panel animations and fading transitions.</p>
                          </div>
                          <input type="checkbox" onChange={(e) => showToast(`Reduced motion: ${e.target.checked}`)} className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ADVANCED */}
                  {settingsSection === "advanced" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Advanced Configuration</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Manage debugging features and local development modes.</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>Production Performance Mode</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Minimizes client memory consumption by batching metric calculations.</p>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3.5 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p>Enable Experimental Tools</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Enables early access to unreleased AI script modules.</p>
                          </div>
                          <input type="checkbox" onChange={(e) => showToast(`Experimental features: ${e.target.checked}`)} className="rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500/50" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DATA MANAGEMENT */}
                  {settingsSection === "data" && (
                    <div className="glass-card p-6 border-white/5 bg-white/[0.02] space-y-6">
                      <div className="border-b border-white/5 pb-4">
                        <h3 className="text-base font-bold text-white">Data Control Center</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Manage, clear, or request account database deletions.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                          <h4 className="text-xs font-bold text-white">Wipe Search & Script Cache</h4>
                          <p className="text-[9px] text-gray-500">Clears offline history data to free up browser storage space.</p>
                          <button onClick={() => showToast("Local caches cleared.")} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-bold rounded-lg text-white">
                            Clear Cache
                          </button>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                          <h4 className="text-xs font-bold text-white">Wipe Project Records</h4>
                          <p className="text-[9px] text-gray-500">Irreversibly clears all generated scripts from database state.</p>
                          <button onClick={() => showToast("All project history wiped.")} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-[10px] font-bold rounded-lg">
                            Wipe History
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DANGER ZONE */}
                  {settingsSection === "danger" && (
                    <div className="glass-card p-6 border-red-500/10 bg-red-500/[0.01] space-y-6">
                      <div className="border-b border-red-500/10 pb-4">
                        <h3 className="text-base font-bold text-red-400">Danger Zone</h3>
                        <p className="text-[11px] text-gray-500 mt-0.5">Irreversible actions that will permanently delete your workspaces or personal account.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white/5 p-4 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p className="text-gray-200">Remove Creator Workspace</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Permanently deletes this workspace and all mapped scheduling metrics.</p>
                          </div>
                          <button onClick={() => setShowDeleteWorkspaceModal(true)} className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-xs font-bold rounded-xl text-white">
                            Delete Workspace
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white/5 p-4 border border-white/5 rounded-xl text-xs font-semibold text-white">
                          <div>
                            <p className="text-gray-200">Delete Personal Account</p>
                            <p className="text-[9px] text-gray-500 mt-0.5">Irreversibly deletes account data and terminates subscription billings.</p>
                          </div>
                          <button onClick={() => setShowDeleteAccountModal(true)} className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-xs font-bold rounded-xl text-white">
                            Delete Account
                          </button>
                        </div>
                      </div>

                      {/* Delete Workspace Confirmation Modal */}
                      {showDeleteWorkspaceModal && (
                        <div className="bg-[#0c0a1c] border border-red-500/20 p-5 rounded-2xl space-y-3">
                          <h4 className="text-xs font-bold text-red-400">Are you absolutely sure?</h4>
                          <p className="text-[11px] text-gray-300">This action cannot be undone. This will permanently delete the workspace **{workspaceName}**.</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setWorkspaceName("Default Studio");
                                setShowDeleteWorkspaceModal(false);
                                showToast("Workspace deleted. Loaded default fallback.");
                              }}
                              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-xl text-white"
                            >
                              Yes, Delete Workspace
                            </button>
                            <button onClick={() => setShowDeleteWorkspaceModal(false)} className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl text-gray-300">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Delete Account Confirmation Modal */}
                      {showDeleteAccountModal && (
                        <div className="bg-[#0c0a1c] border border-red-500/20 p-5 rounded-2xl space-y-3">
                          <h4 className="text-xs font-bold text-red-400">Confirm Account Deletion</h4>
                          <p className="text-[11px] text-gray-300">All creator data, script databases, and active sessions will be completely purged from our servers.</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                localStorage.removeItem("userSession");
                                window.location.href = "/login";
                              }}
                              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-xs font-bold rounded-xl text-white"
                            >
                              Permanently Delete Account
                            </button>
                            <button onClick={() => setShowDeleteAccountModal(false)} className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-bold rounded-xl text-gray-300">
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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

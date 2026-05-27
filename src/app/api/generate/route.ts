import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { tool, topic, platform, videoType, keywords, prompt, messages, tone, duration } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock Responses if API Key is not set
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        isMock: true,
        data: getMockResponse(tool, { topic, platform, videoType, keywords, prompt, messages, tone, duration })
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";
    if (tool === "script") {
      systemPrompt = `You are a viral YouTube, Reels, and TikTok script writer. 
      Generate a comprehensive script structure for:
      Topic: ${topic}
      Platform: ${platform || "YouTube Shorts"}
      Video Type: ${videoType || "Shorts"}
      Tone: ${tone || "Energetic"}
      Duration: ${duration || "60 seconds"}
      
      Provide a response in clean JSON format with these exact keys:
      {
        "hook": "Attention-grabbing viral hook",
        "script": "Full script narration text",
        "sceneBreakdown": "Step-by-step visual scene description breakdown",
        "cta": "Engaging call to action suggestion",
        "seoTitle": "SEO-optimized title",
        "description": "Short SEO description",
        "hashtags": ["#tag1", "#tag2", "#tag3"],
        "thumbnailPrompt": "Midjourney description prompt for thumbnail",
        "viralScore": 94
      }`;
    } else if (tool === "hooks") {
      systemPrompt = `Generate 4 viral storytelling hook ideas for a video about: ${topic}. 
      Provide a response in clean JSON format with these exact keys:
      {
        "emotional": "An emotional connection hook",
        "curiosity": "A curiosity gap hook",
        "shock": "A shocking statement hook",
        "viral": "A trending style viral hook"
      }`;
    } else if (tool === "hashtags") {
      systemPrompt = `Generate 5 trending, SEO-optimized hashtags for a video on the topic: "${topic}" with keywords: "${keywords}".
      Provide a response in clean JSON format representing an array of objects:
      [
        { "tag": "#tag1", "trendScore": "+180%", "popularity": 95 },
        { "tag": "#tag2", "trendScore": "+140%", "popularity": 88 }
      ]`;
    } else if (tool === "thumbnail") {
      systemPrompt = `Generate a highly-detailed prompt for AI Image Generators (like Midjourney, DALL-E) to create a viral thumbnail or cover for: "${topic}".
      Provide a response in clean JSON format with these exact keys:
      {
        "prompt": "The detailed Midjourney prompt text",
        "idea": "Brief explanation of why this visual works",
        "ctrScore": "9.4%"
      }`;
    } else if (tool === "chat") {
      const chatMessages = messages || [];
      const lastMessage = chatMessages[chatMessages.length - 1]?.content || "";
      systemPrompt = `You are a professional social media coach, YouTuber, and brand growth strategist.
      Analyze the user's message and provide growth suggestions, video ideas, SEO tips, or channel advice.
      If they ask for reels or video ideas, make sure to generate structural ideas like POV transformations, editing hacks, and before vs after.
      Keep your answer clear, actionable, and formatted in markdown.
      
      Message: ${lastMessage}`;
    } else if (tool === "caption") {
      systemPrompt = `Generate a high-engagement social media caption for:
      Topic: ${topic}
      Platform: ${platform || "Instagram"}
      Tone: ${keywords || "Engaging"}
      
      Format the response in JSON:
      {
        "caption": "The written caption with spaces and emojis",
        "hashtags": ["#tag1", "#tag2", "#tag3"]
      }`;
    } else if (tool === "faceless") {
      systemPrompt = `Plan a faceless short video outline for:
      Topic: ${topic}
      Style/Niche: ${keywords || "Educational"}
      
      Format the response in JSON:
      {
        "concept": "Core video visual concept",
        "visualPrompts": ["Midjourney prompt for scene 1", "Midjourney prompt for scene 2", "Midjourney prompt for scene 3"],
        "narration": ["Scene 1 Voiceover text", "Scene 2 Voiceover text", "Scene 3 Voiceover text"],
        "musicVibe": "Sound track and sound effects suggestions"
      }`;
    } else if (tool === "research") {
      systemPrompt = `Compile a research briefing on: "${topic}".
      Format the response in JSON:
      {
        "summary": "Brief summary overview",
        "stats": ["Data point 1", "Data point 2", "Data point 3"],
        "questions": ["FAQ 1", "FAQ 2", "FAQ 3"],
        "angles": ["Angle 1", "Angle 2", "Angle 3"]
      }`;
    } else if (tool === "campaign") {
      systemPrompt = `Create a 3-step launch campaign for: "${topic}".
      Format the response in JSON:
      {
        "name": "Campaign Title",
        "steps": [
          { "time": "Phase 1: Pre-launch teaser", "content": "Promotional hook / outline" },
          { "time": "Phase 2: Launch announcement", "content": "Main post outline" },
          { "time": "Phase 3: Retention follow-up", "content": "Closing campaign copy" }
        ]
      }`;
    } else if (tool === "quality") {
      systemPrompt = `Analyze the script text quality for: "${topic}".
      Format the response in JSON:
      {
        "readability": 85,
        "clickbaitRisk": "Low",
        "hookScore": 92,
        "warnings": ["Warning 1", "Warning 2"],
        "suggestions": ["Improvement 1", "Improvement 2"]
      }`;
    }

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    // Parse output
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      const parsedData = jsonMatch ? JSON.parse(jsonMatch[0]) : { text };
      return NextResponse.json({ success: true, isMock: false, data: parsedData });
    } catch {
      return NextResponse.json({ success: true, isMock: false, data: { text } });
    }

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function getMockResponse(tool: string, params: any) {
  const topic = params.topic || "AI Tools";
  
  if (tool === "script") {
    const isStudent = topic.toLowerCase().includes("student");
    return {
      hook: isStudent 
        ? "These 3 AI tools can save students HOURS every day 🤯"
        : `This secret AI tool will save you hours of manual work every day 🤯`,
      script: isStudent
        ? "If you are a student and not using these AI tools yet, you're already behind. First, ChatGPT helps you summarize papers in seconds. Second, Notion AI structures all your study guides. Third, CreatorOS AI organizes your content workflow."
        : `If you are a content creator and not using these workflows yet, you're already behind. Here is how CreatorOS AI completely automates your scripting and research.`,
      sceneBreakdown: isStudent
        ? "0s-15s: Student typing on a laptop with neon glowing dashboard overlay. Text: '3 Tools'.\n15s-45s: Screen recording showing Notion AI and ChatGPT.\n45s-60s: Student smiling and closing the laptop."
        : "0s-15s: Zoom shot of a neon cyber-punk setup showing graphs going up.\n15s-45s: Fast montage of the AI tools dashboard.\n45s-60s: Outro screen showing CTA and follow buttons.",
      cta: isStudent
        ? "Follow for more AI productivity hacks 🚀"
        : "Sign up free to CreatorOS AI and scale your brand today! 🚀",
      seoTitle: isStudent
        ? "Top 3 AI Tools for Students (Save Hours Daily!)"
        : `How I Automated My Creator Workflow with AI (Full Guide)`,
      description: isStudent
        ? "Discover the top 3 AI tools that will save you hours of studying and writing. Perfect for students in 2026."
        : "Here is the step-by-step guide to automating your content creation pipelines using next-generation AI tools.",
      hashtags: isStudent
        ? ["#AI", "#Students", "#Productivity", "#Shorts"]
        : ["#AI", "#Creator", "#SaaS", "#Workflow", "#Automation"],
      thumbnailPrompt: isStudent
        ? "Sleek study desk, glowing holographic screen displaying study templates, cinematic ambient lighting, 8k."
        : "Shocked creator face, neon workspace background, rising graphs, highly detailed, 8k.",
      viralScore: isStudent ? 94 : 91
    };
  }
  
  if (tool === "hooks") {
    const isFitness = topic.toLowerCase().includes("fitness") || topic.toLowerCase().includes("motivation");
    return {
      emotional: isFitness
        ? "This one fitness habit transformed my body (and saved my mental health) in 30 days..."
        : `I almost lost my entire channel last week... but this one workflow fixed everything.`,
      curiosity: isFitness
        ? "What happens to your muscles if you do 50 pushups every single day? The science might surprise you."
        : `Most creators make this mistake in the first 5 seconds. Here is what you should do instead.`,
      shock: isFitness
        ? "Stop lifting weights. Here is why your 1-hour gym routine is actually slowing your fat loss."
        : `ChatGPT is actually making your scripts worse. Stop using it directly.`,
      viral: isFitness
        ? "I tried the military fitness routine for 7 days... and here is why I almost quit on day 3."
        : `I copy-pasted this simple hook and it got me 1M views in 24 hours.`
    };
  }
  
  if (tool === "hashtags") {
    const isTravel = topic.toLowerCase().includes("travel") || topic.toLowerCase().includes("vlog");
    return isTravel ? [
      { tag: "#travel", trendScore: "+180%", popularity: 95 },
      { tag: "#travelvlog", trendScore: "+140%", popularity: 88 },
      { tag: "#explore", trendScore: "+95%", popularity: 82 },
      { tag: "#wanderlust", trendScore: "+60%", popularity: 75 },
      { tag: "#viralreels", trendScore: "+210%", popularity: 98 }
    ] : [
      { tag: "#AItools", trendScore: "+240%", popularity: 98 },
      { tag: "#YouTubeTips", trendScore: "+110%", popularity: 84 },
      { tag: "#ContentCreator", trendScore: "+95%", popularity: 79 },
      { tag: "#AIAutomation", trendScore: "+180%", popularity: 90 },
      { tag: "#CreatorTips", trendScore: "+60%", popularity: 68 }
    ];
  }
  
  if (tool === "thumbnail") {
    const isGaming = topic.toLowerCase().includes("gaming") || topic.toLowerCase().includes("montage");
    return {
      prompt: isGaming
        ? "Cinematic gaming thumbnail with neon lighting, intense player expression, dramatic contrast, YouTube viral style, 8k."
        : "Cinematic close-up of a content creator looking shocked at a glowing neon holographic screen, 8k.",
      idea: isGaming
        ? "Uses high contrast neon visual cues to capture attention in the saturated gaming niche."
        : "Creates curiosity with the shocked expression and implies rapid growth.",
      ctrScore: isGaming ? "9.4%" : "8.7%"
    };
  }

  if (tool === "chat") {
    const lastMsg = params.messages?.[params.messages.length - 1]?.content || "";
    if (lastMsg.toLowerCase().includes("reel") || lastMsg.toLowerCase().includes("viral") || lastMsg.toLowerCase().includes("idea")) {
      return `Here are some trending, viral Reel ideas for your channel:
      
1. **POV Transformation Reels**: Share a relatable transition (e.g. "POV: You started using AI to write your content vs doing it manually") using sleek neon cuts.
2. **AI Editing Hacks**: Walk through a 15-second shortcut (e.g. "How to auto-generate b-roll scripts using CreatorOS AI").
3. **Before vs After Content**: Show the visual comparison of a raw script/thumbnail draft against the polished final output, revealing the dramatic boost in metrics.`;
    }
    return `Hey creator! How can I help you scale your channel today? Ask me about growth strategies, video topics, SEO tags, or channel improvement advice!`;
  }

  if (tool === "caption") {
    return {
      caption: `Unlocking the future of content generation. 🚀 We spent 48 hours testing the latest AI tool stack and here is exactly how it is going to save you 20+ hours a week. Drop a comment if you want the setup guide! 👇`,
      hashtags: ["#CreatorOS", "#AICreator", "#SaaS", "#DeveloperTools", "#WorkflowAutomation"]
    };
  }

  if (tool === "faceless") {
    return {
      concept: "Minimalist dark futuristic tech layout showing clean AI widgets popping up.",
      visualPrompts: [
        "Photorealistic macro shot of glowing purple neon circuits on a dark metallic board, high detail, 8k.",
        "Abstract futuristic glass sphere floating over a reflective neon surface, cinematic lighting, purple tint.",
        "Overhead shot of sleek hands typing on a glowing transparent mechanical keyboard, neon studio lighting."
      ],
      narration: [
        "If you're not building with AI in 2026, you're building in the past. Here is why.",
        "Next-gen AI operating systems like CreatorOS can now automate 95% of your creator pipeline.",
        "The question isn't if you will adapt, but when. Get started free today."
      ],
      musicVibe: "Deep ambient synthwave track with subtle typing sound effects."
    };
  }

  if (tool === "research") {
    return {
      summary: "Creator automation is growing at 45% CAGR, with AI script generation being the fastest-adopted workflow.",
      stats: [
        "95% of creators report saving up to 15 hours per week using AI script checkers.",
        "CTR increases by 18% on average when using descriptive Midjourney prompts for thumbnails.",
        "Faceless automated channels saw a 140% increase in views in early 2026."
      ],
      questions: [
        "Can I automate my faceless channel completely?",
        "What are the best image models for YouTube thumbnails?",
        "Is there a limit on free AI generations?"
      ],
      angles: [
        "The Faceless Creator Trend: How to build a 10k subscriber channel anonymously.",
        "From Idea to Script in 60 seconds: A developer guide to CreatorOS AI.",
        "AI Thumbnail Prompts vs Manual Design: Which gets higher CTR?"
      ]
    };
  }

  if (tool === "campaign") {
    return {
      name: "CreatorOS AI Launch Campaign",
      steps: [
        { time: "Phase 1: Pre-launch (3 Days Out)", content: "Hook: The ultimate operating system for creators is launching. Sign up now for free access to 35+ tools." },
        { time: "Phase 2: Launch Day", content: "Hook: We are officially live! Login securely with Google or GitHub, customize your brand kit, and generate viral scripts." },
        { time: "Phase 3: Post-launch (5 Days In)", content: "Hook: Over 10k scripts have been generated. See what other creators are building in our live Community Feed." }
      ]
    };
  }

  if (tool === "quality") {
    return {
      readability: 88,
      clickbaitRisk: "Moderate",
      hookScore: 94,
      warnings: [
        "Intro is slightly wordy. Consider shortening by 5 words to boost retention.",
        "The call-to-action is placed late in the outline."
      ],
      suggestions: [
        "Use a curiosity gap hook in the first sentence.",
        "Include more active verbs in the body copy."
      ]
    };
  }

  return { text: "No prompt matched." };
}

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { tool, topic, platform, videoType, keywords, prompt, messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback Mock Responses if API Key is not set
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        isMock: true,
        data: getMockResponse(tool, { topic, platform, videoType, keywords, prompt, messages })
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let systemPrompt = "";
    if (tool === "script") {
      systemPrompt = `You are a viral YouTube, Reels, and TikTok script writer. 
      Generate a script for:
      Topic: ${topic}
      Platform: ${platform}
      Video Type: ${videoType}
      
      Provide a response in clean JSON format with these exact keys:
      {
        "hook": "Attention-grabbing hook",
        "intro": "Short introduction to the topic",
        "body": "Detailed script with scene descriptions and voiceover lines",
        "cta": "Engaging call to action suggestions"
      }`;
    } else if (tool === "hooks") {
      systemPrompt = `Generate 5 viral, high-retention hook ideas for a video about: ${topic}. 
      Make them represent different angles:
      1. Attention-grabbing / bold statement
      2. Emotional connection
      3. Curiosity gap
      4. Trending style
      5. Practical value / listicle
      
      Format the response as a JSON array of strings:
      ["Hook 1", "Hook 2", "Hook 3", "Hook 4", "Hook 5"]`;
    } else if (tool === "hashtags") {
      systemPrompt = `Generate 15 trending, SEO-optimized hashtags for a video on the topic: "${topic}" with keywords: "${keywords}".
      Include a mix of high, medium, and low competition hashtags.
      Format the response as a JSON array of strings:
      ["#tag1", "#tag2", ...]`;
    } else if (tool === "thumbnail") {
      systemPrompt = `Generate a highly-detailed prompt for AI Image Generators (like Midjourney, DALL-E) to create a viral thumbnail or cover for: "${topic}".
      Describe the focal point, expression, background, lighting, and composition. Do not use generic words.
      Format the response as a JSON object:
      {
        "prompt": "The detailed Midjourney prompt",
        "idea": "Brief explanation of why this visual works"
      }`;
    } else if (tool === "chat") {
      const chatMessages = messages || [];
      const lastMessage = chatMessages[chatMessages.length - 1]?.content || "";
      systemPrompt = `You are a professional social media coach, YouTuber, and brand growth strategist.
      Analyze the user's message and provide growth suggestions, video ideas, SEO tips, or channel advice.
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
      Include key data points, main questions people ask, and content angles.
      Format the response in JSON:
      {
        "summary": "Brief summary overview",
        "stats": ["Data point 1", "Data point 2", "Data point 3"],
        "questions": ["FAQ 1", "FAQ 2", "FAQ 3"],
        "angles": ["Angle 1", "Angle 2", "Angle 3"]
      }`;
    } else if (tool === "campaign") {
      systemPrompt = `Create a 3-step launch campaign for: "${topic}".
      Include timeline items and promotional text.
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
      // Find JSON block if Gemini wrapped it in markdown quotes
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
    return {
      hook: `Want to save hours of work as a Creator? 🤯 These 5 AI tools will completely change your content game!`,
      intro: `Hey creators! In this video, I'll show you 5 powerful AI tools that every YouTuber should be using in 2026 to grow faster, work smarter, and create better content.`,
      body: `[TOOL 1: CHATGPT/CLAUDE]
Use it for script writing, video ideas, titles, and more.
      
[TOOL 2: MIDJOURNEY]
Generate gorgeous, high-click-through-rate thumbnails.

[TOOL 3: CREATOROS AI]
Plan your complete content calendar and schedule posts with custom algorithms.`,
      cta: `If you found this helpful, hit subscribe and share this with another creator!`
    };
  }
  
  if (tool === "hooks") {
    return [
      `These 5 AI tools will 10X your content in 2026! 🔥`,
      `YouTubers are using these AI tools... Are you?`,
      `Stop wasting time! Use these AI tools instead.`,
      `5 Secret AI tools successful creators use daily!`,
      `These AI tools can make you a better creator fast!`
    ];
  }
  
  if (tool === "hashtags") {
    return [
      "#AItools", "#YouTubeTips", "#ContentCreator", "#AIforyou", "#YouTubeGrowth", 
      "#AITools2026", "#VideoEditing", "#YouTuberLife", "#AIAutomation", 
      "#CreatorTips", "#MakeMoneyOnline", "#TechForCreators"
    ];
  }
  
  if (tool === "thumbnail") {
    return {
      prompt: `Cinematic close-up of a content creator looking shocked at a glowing neon holographic screen displaying graphs going up, dark futuristic cyber-punk studio setting, purple and pink ambient lighting, 8k resolution, photorealistic, highly detailed, dramatic highlights.`,
      idea: `Creates curiosity with the shocked expression and implies rapid growth with the rising graphs, framed inside a premium dark neon setting.`
    };
  }

  if (tool === "chat") {
    const lastMsg = params.messages?.[params.messages.length - 1]?.content || "";
    if (lastMsg.toLowerCase().includes("idea") || lastMsg.toLowerCase().includes("video")) {
      return `Here are some trending video ideas for your tech channel:
      
* **Top 5 AI Tools for Productivity**
* **How AI is Changing the Future**
* **Best Laptops for Creators in 2026**
* **AI vs Human: Which is Better?**
* **Hidden AI Features You Didn't Know!**`;
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

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

[TOOL 3: VIRALFLOW AI]
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

  return { text: "No prompt matched." };
}

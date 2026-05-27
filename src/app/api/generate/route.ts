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
  // Extract and clean topic
  let topic = params.topic || "AI Content Creation";
  topic = topic.trim();
  
  // Create stylized capitalized version
  const cleanTitle = topic.split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  
  // Make a list of tags from words in the topic
  const tagWords = topic.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w: string) => w.length > 2);
  const customTags = tagWords.map((w: string) => `#${w}`);
  // Add some fallback popular hashtags
  while(customTags.length < 5) {
    const popular = ["#CreatorOS", "#ViralContent", "#AICreator", "#GrowthSecrets", "#SaaSWorkflow"];
    const nextTag = popular[customTags.length % popular.length];
    if (!customTags.includes(nextTag)) {
      customTags.push(nextTag);
    } else {
      customTags.push(`#CreatorOS_${customTags.length}`);
    }
  }

  if (tool === "script") {
    return {
      hook: `Here is the one secret about ${topic} that will blow your mind... 🤯`,
      script: `Have you ever wondered why some content about ${topic} gets millions of views, while others get zero? It is all about the hook and pacing. First, you need to capture attention in under 3 seconds by showing a major pain point. Second, structure the content with pattern interrupts every 5 seconds. And third, always deliver a clear call-to-action that encourages comments, which boosts the algorithm.`,
      sceneBreakdown: `0s-15s: Shocked face overlay with text: 'The ${cleanTitle} Secret'. Fast transition.\n15s-45s: Step-by-step editing checklist highlighting neon visual overlays.\n45s-60s: Outro screen showing CTA and follow buttons with Synthwave grid.`,
      cta: `Follow for more viral ${topic} growth hacks! 🚀`,
      seoTitle: `How to Go Viral with ${cleanTitle} (Step-by-Step Guide)`,
      description: `The complete, step-by-step creator blueprint for automating and optimizing your ${topic} content pipeline.`,
      hashtags: customTags,
      thumbnailPrompt: `Close-up shot of a content creator looking shocked at a glowing holographic neon card displaying '${cleanTitle}' templates, cyber-punk studio background, highly detailed, 8k resolution, cinematic lighting.`,
      viralScore: Math.floor(Math.random() * 10) + 88
    };
  }

  if (tool === "hooks") {
    return {
      emotional: `This one simple habit completely transformed my ${topic} content (and saved my sanity)...`,
      curiosity: `The absolute worst mistake you can make with ${topic} in 2026. Here is why...`,
      shock: `Stop uploading ${topic} videos. Do this instead if you actually want to get views.`,
      viral: `I tried this secret ${topic} workflow for 7 days... and here is why I am never going back.`
    };
  }

  if (tool === "hashtags") {
    return customTags.map((tag: string, idx: number) => ({
      tag,
      trendScore: `+${Math.floor(Math.random() * 150) + 100}%`,
      popularity: Math.floor(Math.random() * 20) + 78
    }));
  }

  if (tool === "thumbnail") {
    return {
      prompt: `Vibrant YouTube thumbnail design for ${cleanTitle}, featuring high-contrast neon lighting, an intensely expressive character face in the center, large bold glowing text, 8k resolution, photorealistic.`,
      idea: `Uses high contrast neon visual cues to capture attention in the saturated ${topic} niche.`,
      ctrScore: `${(Math.random() * 3 + 8).toFixed(1)}%`
    };
  }

  if (tool === "chat") {
    return `Here is a custom growth briefing for **${cleanTitle}**:\n\n1. **Visual Pattern Interrupts**: For ${topic}, ensure you show visual transitions or text cards every 3-5 seconds to maintain high viewer retention.\n2. **Curiosity-Driven Hooking**: Start your videos with a polarizing claim about ${topic} that immediately opens a curiosity loop.\n3. **Call-to-Action Integration**: Encourage users to comment their opinion on ${topic} rather than just asking them to follow. This drives high engagement.`;
  }

  if (tool === "caption") {
    return {
      caption: `Unlocking the future of ${cleanTitle}. 🚀 We spent 48 hours testing the latest workflow strategies and here is exactly how it is going to save you hours of work. Let us know in the comments if you want the full template guide! 👇`,
      hashtags: customTags
    };
  }

  if (tool === "faceless") {
    return {
      concept: `High-retention faceless short video focusing on ${topic} trends.`,
      visualPrompts: [
        `Photorealistic macro shot of glowing circuits displaying the text '${cleanTitle}' on a dark metallic board, high detail, 8k.`,
        `Abstract futuristic glass sphere floating over a reflective neon surface representing ${topic} assets, cinematic lighting.`,
        `Overhead shot of sleek hands typing on a glowing transparent mechanical keyboard, neon studio lighting.`
      ],
      narration: [
        `If you are not building content for ${topic} in 2026, you are building in the past.`,
        `Next-gen automation tools can now completely handle the scripting and research for ${topic}.`,
        `The question isn't if you will adapt, but when. Get started free today.`
      ],
      musicVibe: "Deep atmospheric synthwave track with subtle typing sound effects."
    };
  }

  if (tool === "research") {
    return {
      summary: `Audience search interest in ${topic} is growing at a rapid pace, with mobile search volume increasing by 65% over the last quarter.`,
      stats: [
        `92% of channels covering ${topic} reported a surge in metrics when focusing on curiosity hooks.`,
        `Average click-through rate increases by 14% when using descriptive neon prompts.`,
        `Automated faceless playlists saw a 180% view spike in early 2026.`
      ],
      questions: [
        `How do I get started with ${topic}?`,
        `What are the best frameworks to build ${topic} content?`,
        `Is there a free generator tool for ${topic}?`
      ],
      angles: [
        `The ${cleanTitle} Blueprint: How to scale to 10k followers in 30 days.`,
        `Why traditional methods for ${topic} are failing in 2026.`,
        `My step-by-step setup to automate my entire ${topic} workflow.`
      ]
    };
  }

  if (tool === "campaign") {
    return {
      name: `${cleanTitle} Launch Campaign`,
      steps: [
        { time: "Phase 1: Pre-launch (3 Days Out)", content: `Teaser: A major breakthrough in ${topic} is coming. Sign up for early access today.` },
        { time: "Phase 2: Launch Day", content: `Main Post: We are officially live with our complete ${topic} system! Check out the details.` },
        { time: "Phase 3: Post-launch (5 Days In)", content: `Follow-up: Over 5,000 creators have used the new ${topic} templates. Join them now.` }
      ]
    };
  }

  if (tool === "quality") {
    return {
      readability: Math.floor(Math.random() * 15) + 80,
      clickbaitRisk: "Low",
      hookScore: Math.floor(Math.random() * 10) + 88,
      warnings: [
        `The introduction of ${topic} is slightly wordy. Consider shortening to boost retention.`,
        `The call-to-action is placed slightly late in the script.`
      ],
      suggestions: [
        `Use a curiosity gap hook in the first sentence to hook fans of ${topic}.`,
        `Include more active action verbs in the body narration.`
      ]
    };
  }

  return { text: `Mock response for ${tool} on ${topic}.` };
}

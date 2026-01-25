import { NextRequest, NextResponse } from "next/server";

/**
 * Chat API Route Handler
 * Processes user messages and returns AI-generated responses
 * Integrates with OpenAI API and implements pricing logic
 */

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

interface ConversationContext {
  projectType?: string;
  budget?: string;
  timeline?: string;
  email?: string;
  phone?: string;
}

/**
 * Pricing database for different project types
 */
const PRICING_DATABASE = {
  website: {
    portfolio: { min: 10000, max: 25000, desc: "Portfolio website" },
    business: { min: 25000, max: 60000, desc: "Business website with features" },
    ecommerce: { min: 60000, max: 150000, desc: "Full ecommerce platform" },
    webapp: { min: 60000, max: 300000, desc: "Full stack web application" },
  },
  ai_data: {
    dashboard: { min: 30000, max: 75000, desc: "Basic data dashboard" },
    ml: { min: 50000, max: 200000, desc: "Machine learning project" },
    ai_solution: { min: 80000, max: 500000, desc: "Custom AI solution" },
  },
  mobile: {
    simple: { min: 50000, max: 100000, desc: "Simple mobile app" },
    complex: { min: 100000, max: 300000, desc: "Complex mobile app" },
  },
  devops: {
    basic: { min: 30000, max: 60000, desc: "Basic DevOps setup" },
    enterprise: { min: 60000, max: 200000, desc: "Enterprise DevOps solution" },
  },
};

/**
 * System prompt for the AI consultant
 * Defines behavior and guidelines for the chatbot
 */
const SYSTEM_PROMPT = `You are Dark Nebula's AI Consultant - a professional, friendly, and expert virtual consultant for a web development and tech consultancy firm.

Your role:
- Greet visitors and understand their project needs
- Ask about project type, budget, timeline, and contact details progressively
- Provide accurate information about services: Web Development, Web Design, DevOps, AI, Data Engineering, Digital Marketing, Social Media Marketing
- Estimate project costs based on the pricing provided
- Be concise (max 2-3 sentences per response)
- Always maintain a professional yet approachable tone
- After collecting requirements, suggest scheduling a consultation for complex projects
- Never make up pricing - use only the provided database

Key Services:
1. Web Development & Design
2. AI & Generative AI Solutions
3. Data Analytics & Engineering
4. Mobile App Development
5. DevOps & Infrastructure
6. Digital Marketing & Growth
7. Social Media Marketing
8. Demand Generation

Always ask follow-up questions to better understand the client's needs before giving estimates.
If the client seems serious about proceeding, encourage them to contact the team directly for a detailed consultation.`;

/**
 * Format pricing response based on project details
 */
function getPricingEstimate(projectType: string, details?: string): string {
  const projectLower = projectType.toLowerCase();

  // Web development pricing
  if (projectLower.includes("portfolio") || projectLower.includes("personal")) {
    const p = PRICING_DATABASE.website.portfolio;
    return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  if (projectLower.includes("business website")) {
    const p = PRICING_DATABASE.website.business;
    return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  if (projectLower.includes("ecommerce") || projectLower.includes("online store")) {
    const p = PRICING_DATABASE.website.ecommerce;
    return `An ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  if (projectLower.includes("web app") || projectLower.includes("saas")) {
    const p = PRICING_DATABASE.website.webapp;
    return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  // AI & Data pricing
  if (projectLower.includes("dashboard")) {
    const p = PRICING_DATABASE.ai_data.dashboard;
    return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  if (projectLower.includes("machine learning") || projectLower.includes("ml")) {
    const p = PRICING_DATABASE.ai_data.ml;
    return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  if (projectLower.includes("custom ai") || projectLower.includes("ai solution")) {
    const p = PRICING_DATABASE.ai_data.ai_solution;
    return `A custom ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
  }

  // Mobile app pricing
  if (projectLower.includes("mobile app")) {
    if (projectLower.includes("simple") || projectLower.includes("basic")) {
      const p = PRICING_DATABASE.mobile.simple;
      return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
    } else {
      const p = PRICING_DATABASE.mobile.complex;
      return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
    }
  }

  // DevOps pricing
  if (projectLower.includes("devops") || projectLower.includes("infrastructure")) {
    if (projectLower.includes("enterprise")) {
      const p = PRICING_DATABASE.devops.enterprise;
      return `An ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
    } else {
      const p = PRICING_DATABASE.devops.basic;
      return `A ${p.desc} typically ranges from ₹${p.min.toLocaleString()} to ₹${p.max.toLocaleString()}.`;
    }
  }

  return "For a custom pricing estimate, please share more details about your project scope!";
}

/**
 * Extract context from user messages
 */
function extractContext(message: string): Partial<ConversationContext> {
  const updates: Partial<ConversationContext> = {};
  const messageLower = message.toLowerCase();

  // Project type detection
  if (
    messageLower.includes("web") ||
    messageLower.includes("website") ||
    messageLower.includes("app")
  ) {
    updates.projectType = "web_development";
  } else if (
    messageLower.includes("ai") ||
    messageLower.includes("data") ||
    messageLower.includes("ml") ||
    messageLower.includes("machine learning")
  ) {
    updates.projectType = "ai_data";
  } else if (messageLower.includes("devops") || messageLower.includes("infrastructure")) {
    updates.projectType = "devops";
  } else if (messageLower.includes("mobile") || messageLower.includes("app")) {
    updates.projectType = "mobile";
  }

  // Budget detection (simplified - in production, use NLP)
  if (messageLower.includes("100k") || messageLower.includes("1 lakh")) {
    updates.budget = "100k+";
  } else if (messageLower.includes("50k") || messageLower.includes("50000")) {
    updates.budget = "50k-100k";
  } else if (messageLower.includes("20k") || messageLower.includes("20000")) {
    updates.budget = "20k-50k";
  } else if (messageLower.includes("tight budget") || messageLower.includes("low budget")) {
    updates.budget = "< 20k";
  }

  // Timeline detection
  if (messageLower.includes("1 month") || messageLower.includes("urgent")) {
    updates.timeline = "1 month";
  } else if (messageLower.includes("3 month") || messageLower.includes("quarterly")) {
    updates.timeline = "3 months";
  } else if (messageLower.includes("6 month")) {
    updates.timeline = "6 months";
  }

  // Email/Phone detection
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emailMatch = message.match(emailRegex);
  if (emailMatch) {
    updates.email = emailMatch[0];
  }

  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;
  const phoneMatch = message.match(phoneRegex);
  if (phoneMatch && phoneMatch.index !== undefined) {
    updates.phone = message.substring(phoneMatch.index, phoneMatch.index + phoneMatch[0].length);
  }

  return updates;
}

/**
 * Generate AI response using OpenAI API or fallback
 */
async function generateAIResponse(
  userMessage: string,
  conversationHistory: Message[],
  context: ConversationContext
): Promise<{ reply: string; context: Partial<ConversationContext> }> {
  const apiKey = process.env.OPENAI_API_KEY;
  const updatedContext = extractContext(userMessage);

  // If pricing query, use predefined logic
  if (userMessage.toLowerCase().includes("cost") || userMessage.toLowerCase().includes("price")) {
    const estimate = getPricingEstimate(userMessage, context.projectType);
    return {
      reply: estimate,
      context: updatedContext,
    };
  }

  // Try to use OpenAI API
  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          temperature: 0.7,
          max_tokens: 200,
          system: SYSTEM_PROMPT,
          messages: [
            ...conversationHistory.map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0]?.message?.content || getFallbackResponse(userMessage, context);

      return {
        reply,
        context: updatedContext,
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      // Fall through to fallback
    }
  }

  // Fallback responses when API is unavailable
  return {
    reply: getFallbackResponse(userMessage, context),
    context: updatedContext,
  };
}

/**
 * Fallback responses when OpenAI API is unavailable
 * Provides intelligent responses based on keywords
 */
function getFallbackResponse(message: string, context: ConversationContext): string {
  const msg = message.toLowerCase();

  // Greetings
  if (msg.match(/^(hi|hello|hey|greetings)/)) {
    return "Hey there! 👋 I'm the Dark Nebula AI consultant. We specialize in web development, AI, data engineering, and digital marketing. What brings you here today?";
  }

  // Service inquiries
  if (msg.includes("service")) {
    return "We offer comprehensive tech solutions:\n\n✅ Web Development & Design\n✅ AI & Generative AI\n✅ Data Engineering\n✅ Mobile Apps\n✅ DevOps & Infrastructure\n✅ Digital Marketing\n✅ Social Media Marketing\n\nWhich interests you?";
  }

  // Pricing inquiries
  if (msg.includes("price") || msg.includes("cost") || msg.includes("budget")) {
    return "Our pricing depends on project scope. Website projects range from ₹10k-₹300k, while AI/Data projects start from ₹30k+. Can you tell me more about your project?";
  }

  // Timeline inquiries
  if (msg.includes("timeline") || msg.includes("how long") || msg.includes("duration")) {
    return "Project timelines vary based on complexity. Small websites: 2-4 weeks. Medium web apps: 6-12 weeks. Complex AI projects: 8+ weeks. What are you building?";
  }

  // Web development
  if (msg.includes("web") || msg.includes("website")) {
    return "Great! For web projects, I'd love to know:\n1️⃣ What type? (portfolio, business, ecommerce, or custom web app)\n2️⃣ Budget range?\n3️⃣ Timeline?\n\nTell me more!";
  }

  // AI projects
  if (msg.includes("ai") || msg.includes("artificial intelligence")) {
    return "Excellent! We work on:\n🤖 AI agents & chatbots\n🧠 Machine learning models\n📊 Data analytics dashboards\n🔮 Generative AI solutions\n\nWhat's your use case?";
  }

  // Data projects
  if (msg.includes("data") || msg.includes("dashboard") || msg.includes("analytics")) {
    return "We excel at data solutions:\n📈 Data dashboards\n🔄 ETL pipelines\n📊 Business intelligence\n🤖 Predictive analytics\n\nWhat data challenges are you facing?";
  }

  // Contact/Meeting request
  if (
    msg.includes("contact") ||
    msg.includes("meeting") ||
    msg.includes("call") ||
    msg.includes("talk to team")
  ) {
    return "Perfect! Our team would love to discuss your project in detail. You can reach us via:\n📧 Email: hello@darknebula.dev\n🔗 Or use the 'Talk to Our Team' button to be redirected to our contact form.\n\nLooking forward to connecting! 🚀";
  }

  // Default fallback
  return "That's interesting! Could you give me more details about your project? I'd like to understand:\n1. What you're building (web, app, AI, etc.)\n2. Your approximate budget\n3. Your timeline\n\nThis helps me provide better recommendations! 🎯";
}

/**
 * POST handler for chat messages
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory, context } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Generate response
    const { reply, context: newContext } = await generateAIResponse(
      message,
      conversationHistory || [],
      context || {}
    );

    return NextResponse.json({
      reply,
      context: newContext,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        reply: "Sorry, I encountered an error. Please try again or contact us directly at hello@darknebula.dev",
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for health check
 */
export async function GET() {
  return NextResponse.json({
    status: "Chat API is running",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Chat API Route Handler (Refactored for State Machine)
 * Processes user messages and returns AI-generated responses
 * Integrates with OpenAI API and implements lead capture logic
 */

import { NextRequest, NextResponse } from "next/server";
import { ChatStage, type LeadData } from "@/types/lead";

/**
 * System prompt for professional sales assistant
 * Guides the bot to act as a sales consultant and never repeat questions
 */
const SALES_ASSISTANT_SYSTEM_PROMPT = `You are Dark Nebula's Professional Sales Consultant - an expert, friendly, and highly knowledgeable virtual consultant.

IMPORTANT RULES (ALWAYS FOLLOW):
1. NEVER ask a question that was already answered
2. NEVER repeat previous questions in this conversation
3. Be BRIEF - maximum 2 sentences per response
4. Be PROFESSIONAL but approachable
5. ALWAYS acknowledge what the user said before moving forward
6. Ask for information in this specific order: Name → Email → Phone → Project Type → Summary
7. Never collect information beyond these 4 fields
8. Only provide budget estimates AFTER knowing the project type
9. When ALL information is collected, confirm and offer to schedule consultation

Current conversation status:
- GREETING: Initial contact, no info collected
- ASK_NAME: Asking for their name
- ASK_EMAIL: Name provided, now ask for email
- ASK_PHONE: Email provided, now ask for phone
- ASK_PURPOSE: Phone provided, now ask for project type
- SUMMARY: All info collected, show summary and offer consultation
- COMPLETE: Conversation ended, user going to contact form

DO NOT:
❌ Ask for budget unless they ask
❌ Ask for timeline unless relevant
❌ Ask the same question twice
❌ Give generic responses without acknowledging their input
❌ Provide pricing without understanding project type first

DO:
✅ Ask follow-up questions naturally
✅ Show genuine interest in their project
✅ Guide them toward the Contact page for detailed discussion
✅ Be encouraging and positive`;

/**
 * Trim conversation history to recent messages
 * Prevents token bloat and helps AI focus on current context
 */
function trimConversationHistory(
  messages: Array<{ text: string; sender: "user" | "bot" }>,
  maxMessages: number = 6
) {
  if (messages.length <= maxMessages) {
    return messages;
  }
  return messages.slice(-maxMessages);
}

/**
 * Generate AI response using OpenAI API with state machine context
 */
async function generateAIResponse(
  userMessage: string,
  conversationHistory: Array<{ text: string; sender: "user" | "bot" }>,
  currentStage: ChatStage,
  leadData: LeadData,
  systemPrompt: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return getFallbackResponse(userMessage, currentStage, leadData);
  }

  try {
    // Trim history to prevent token overflow
    const trimmedHistory = trimConversationHistory(conversationHistory, 6);

    // Build context message
    let contextMessage = `User's current info: `;
    const collected = [];
    if (leadData.name) collected.push(`Name: ${leadData.name}`);
    if (leadData.email) collected.push(`Email: ${leadData.email}`);
    if (leadData.phone) collected.push(`Phone: ${leadData.phone}`);
    if (leadData.purpose) collected.push(`Project Type: ${leadData.purpose}`);

    if (collected.length === 0) {
      contextMessage += "No info collected yet";
    } else {
      contextMessage += collected.join(", ");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 150,
        system: systemPrompt,
        messages: [
          // Add context about what we know
          {
            role: "system",
            content: contextMessage,
          },
          // Add recent conversation history
          ...trimmedHistory.map((msg) => ({
            role: msg.sender === "user" ? ("user" as const) : ("assistant" as const),
            content: msg.text,
          })),
          // Current user message
          {
            role: "user" as const,
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return getFallbackResponse(userMessage, currentStage, leadData);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || getFallbackResponse(userMessage, currentStage, leadData);
  } catch (error) {
    console.error("Chat API error:", error);
    return getFallbackResponse(userMessage, currentStage, leadData);
  }
}

/**
 * Fallback responses based on current stage and conversation context
 */
function getFallbackResponse(
  userMessage: string,
  stage: ChatStage,
  leadData: LeadData
): string {
  const msg = userMessage.toLowerCase();

  // Stage-based responses
  switch (stage) {
    case ChatStage.GREETING:
      return "Thanks for reaching out! 🚀 To better understand your needs, I'd like to know a bit more about you. What's your name?";

    case ChatStage.ASK_NAME:
      if (msg.length > 1) {
        return "Great to meet you! 👋 Now, what's your email address so we can stay in touch?";
      }
      return "Could you share your full name, please?";

    case ChatStage.ASK_EMAIL:
      if (msg.includes("@")) {
        return "Perfect! And what's the best phone number to reach you?";
      }
      return "I need a valid email address. Could you provide that?";

    case ChatStage.ASK_PHONE:
      if (msg.match(/\d{10,}/)) {
        return `Excellent! Now, ${leadData.name ? "one more thing" : "let me know"} - what type of project are you looking to build? (e.g., portfolio, business website, web app, mobile app, AI solution, data dashboard)`;
      }
      return "I need a valid phone number (at least 10 digits). Could you try again?";

    case ChatStage.ASK_PURPOSE:
      if (msg.length > 3) {
        return "Awesome! That sounds like an interesting project. Let me summarize what we've discussed, and then we can move to our contact form for detailed next steps. You'll be able to discuss budget, timeline, and specific features with our team.";
      }
      return "Could you tell me more about your project type?";

    case ChatStage.SUMMARY:
      return "Ready to move forward? Click the button above to go to our contact form. We'll have our team reach out within 24 hours with a customized proposal!";

    default:
      return "Thanks for chatting! Feel free to reach out anytime. Our team is here to help! 🌟";
  }
}

/**
 * POST handler for chat messages with state machine support
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      conversationHistory = [],
      leadData = {},
      currentStage = ChatStage.GREETING,
      systemPrompt = SALES_ASSISTANT_SYSTEM_PROMPT,
    } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Generate AI response
    const reply = await generateAIResponse(
      message,
      conversationHistory,
      currentStage,
      leadData,
      systemPrompt
    );

    // Return response with metadata
    return NextResponse.json({
      reply,
      stage: currentStage,
      leadData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Return error response
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
    status: "Chat API is operational",
    timestamp: new Date().toISOString(),
  });
}

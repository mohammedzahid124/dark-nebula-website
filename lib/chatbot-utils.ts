/**
 * ChatBot Utilities
 * Helper functions for conversation management, context extraction, and formatting
 */

import { ConversationContext } from "@/types/chat";

/**
 * Format pricing in Indian Rupees
 */
export function formatPricing(min: number, max: number): string {
  const formatNumber = (num: number) => {
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(0)}k`;
    }
    return `₹${num}`;
  };

  return `${formatNumber(min)} - ${formatNumber(max)}`;
}

/**
 * Extract email from text
 */
export function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

/**
 * Extract phone number from text
 */
export function extractPhoneNumber(text: string): string | null {
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}

/**
 * Detect project type from user message
 */
export function detectProjectType(text: string): string | null {
  const msg = text.toLowerCase();

  const projectTypes: { [key: string]: string[] } = {
    web_development: [
      "web",
      "website",
      "web app",
      "webapp",
      "web application",
      "web development",
      "saas",
      "portal",
      "ecommerce",
      "online store",
      "landing page",
    ],
    ai_data: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "ml",
      "data",
      "analytics",
      "dashboard",
      "bigdata",
      "generative ai",
      "llm",
      "chatbot",
    ],
    mobile: [
      "mobile",
      "app",
      "ios",
      "android",
      "react native",
      "flutter",
      "mobile application",
    ],
    devops: [
      "devops",
      "infrastructure",
      "cloud",
      "aws",
      "gcp",
      "azure",
      "deployment",
      "docker",
      "kubernetes",
    ],
    design: [
      "design",
      "ui",
      "ux",
      "branding",
      "logo",
      "mockup",
      "prototype",
      "figma",
    ],
  };

  for (const [type, keywords] of Object.entries(projectTypes)) {
    if (keywords.some((keyword) => msg.includes(keyword))) {
      return type;
    }
  }

  return null;
}

/**
 * Detect budget from user message
 */
export function detectBudget(text: string): string | null {
  const msg = text.toLowerCase();

  // High budget
  if (msg.match(/(\d+\s*l(?:akh)?|100\s*k|₹\s*1?[0-9]{6,})/i)) {
    return "100k+";
  }

  // Medium-high budget
  if (msg.match(/50\s*k|₹\s*[5-9][0-9]{4}|5\s*l/i)) {
    return "50k-100k";
  }

  // Medium budget
  if (msg.match(/20\s*k|25\s*k|30\s*k|₹\s*[2-4][0-9]{4}/i)) {
    return "20k-50k";
  }

  // Low budget
  if (msg.match(/low\s*budget|tight\s*budget|cheap|minimal/i)) {
    return "< 20k";
  }

  return null;
}

/**
 * Detect timeline from user message
 */
export function detectTimeline(text: string): string | null {
  const msg = text.toLowerCase();

  if (msg.match(/1\s*month|asap|urgent|immediately|quick/i)) {
    return "1 month";
  }

  if (msg.match(/3\s*month|quarterly|90\s*day/i)) {
    return "3 months";
  }

  if (msg.match(/6\s*month|half\s*year|semester/i)) {
    return "6 months";
  }

  if (msg.match(/1\s*year|annual|long\s*term/i)) {
    return "12 months";
  }

  return null;
}

/**
 * Extract all context from message
 */
export function extractContextFromMessage(text: string): Partial<ConversationContext> {
  return {
    projectType: detectProjectType(text) || undefined,
    budget: detectBudget(text) || undefined,
    timeline: detectTimeline(text) || undefined,
    email: extractEmail(text) || undefined,
    phone: extractPhoneNumber(text) || undefined,
  };
}

/**
 * Determine if user is ready to contact
 */
export function isReadyToContact(context: ConversationContext): boolean {
  return !!(context.projectType && (context.email || context.phone));
}

/**
 * Format conversation context for display
 */
export function formatContext(context: ConversationContext): string {
  const parts: string[] = [];

  if (context.projectType) {
    parts.push(`Project: ${context.projectType.replace(/_/g, " ")}`);
  }
  if (context.budget) {
    parts.push(`Budget: ${context.budget}`);
  }
  if (context.timeline) {
    parts.push(`Timeline: ${context.timeline}`);
  }
  if (context.email) {
    parts.push(`Email: ${context.email}`);
  }
  if (context.phone) {
    parts.push(`Phone: ${context.phone}`);
  }

  return parts.join(" | ") || "No context captured yet";
}

/**
 * Truncate message for display
 */
export function truncateMessage(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Get response sentiment (positive, neutral, negative)
 */
export function getSentiment(text: string): "positive" | "neutral" | "negative" {
  const msg = text.toLowerCase();

  const positiveWords = ["great", "excellent", "amazing", "perfect", "love", "awesome"];
  const negativeWords = ["bad", "hate", "terrible", "awful", "poor", "problem"];

  const hasPositive = positiveWords.some((word) => msg.includes(word));
  const hasNegative = negativeWords.some((word) => msg.includes(word));

  if (hasPositive && !hasNegative) return "positive";
  if (hasNegative && !hasPositive) return "negative";
  return "neutral";
}

/**
 * Simulate typing delay (ms)
 */
export function getTypingDelay(textLength: number): number {
  // Base delay + proportional to text length
  // Aim for ~40-60 WPM
  const wordsPerMinute = 50;
  const charsPerWord = 5;
  const baseDelay = 300;

  const delay = (textLength / charsPerWord / wordsPerMinute) * 60000;
  return Math.max(baseDelay, Math.min(delay, 5000));
}

/**
 * Create structured lead object from context
 */
export function createLeadFromContext(context: ConversationContext) {
  return {
    projectType: context.projectType,
    budget: context.budget,
    timeline: context.timeline,
    email: context.email,
    phone: context.phone,
    source: "chatbot",
    timestamp: new Date(),
    metadata: {
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      url: typeof window !== "undefined" ? window.location.href : "unknown",
    },
  };
}

/**
 * Validate lead completeness
 */
export function isCompleteLead(context: ConversationContext): boolean {
  return !!(
    context.projectType &&
    context.budget &&
    (context.email || context.phone)
  );
}

/**
 * Generate conversation summary
 */
export function generateSummary(
  context: ConversationContext,
  messageCount: number
): string {
  const parts: string[] = [];

  parts.push(`Conversation with ${messageCount} messages`);
  if (context.projectType) {
    parts.push(`• Interested in: ${context.projectType}`);
  }
  if (context.budget) {
    parts.push(`• Budget: ${context.budget}`);
  }
  if (context.timeline) {
    parts.push(`• Timeline: ${context.timeline}`);
  }
  if (context.email || context.phone) {
    parts.push(`• Contact: ${context.email || context.phone}`);
  }

  return parts.join("\n");
}

/**
 * ChatBot Type Definitions
 * Shared types used across chatbot components and API
 */

/**
 * User message interface
 */
export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  metadata?: {
    type?: "text" | "action" | "error";
    actionButtons?: ActionButton[];
  };
}

/**
 * Conversation context tracking user information
 */
export interface ConversationContext {
  projectType?: string;
  budget?: string;
  timeline?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
}

/**
 * Chat API request payload
 */
export interface ChatRequest {
  message: string;
  conversationHistory: Message[];
  context: ConversationContext;
}

/**
 * Chat API response payload
 */
export interface ChatResponse {
  reply: string;
  context: Partial<ConversationContext>;
  timestamp: string;
  metadata?: {
    suggestedActions?: ActionButton[];
    sentiment?: "positive" | "neutral" | "negative";
    leadScore?: number;
  };
}

/**
 * Action button for quick responses
 */
export interface ActionButton {
  label: string;
  action: "send_message" | "navigate" | "contact" | "custom";
  value: string;
}

/**
 * Pricing tier information
 */
export interface PricingTier {
  min: number;
  max: number;
  desc: string;
  features?: string[];
  timeline?: string;
}

/**
 * Pricing database structure
 */
export interface PricingDatabase {
  website: {
    portfolio: PricingTier;
    business: PricingTier;
    ecommerce: PricingTier;
    webapp: PricingTier;
  };
  ai_data: {
    dashboard: PricingTier;
    ml: PricingTier;
    ai_solution: PricingTier;
  };
  mobile: {
    simple: PricingTier;
    complex: PricingTier;
  };
  devops: {
    basic: PricingTier;
    enterprise: PricingTier;
  };
}

/**
 * Lead generated from chat conversation
 */
export interface Lead {
  id?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  source: "chatbot";
  timestamp: Date;
  messageCount?: number;
  conversationSummary?: string;
  metadata?: {
    userAgent?: string;
    url?: string;
    referrer?: string;
    timezone?: string;
  };
}

/**
 * Chat state management
 */
export interface ChatState {
  isOpen: boolean;
  isLoading: boolean;
  messages: Message[];
  context: ConversationContext;
  error?: string;
}

/**
 * Chat configuration options
 */
export interface ChatConfig {
  apiEndpoint: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
  initialMessage?: string;
  placeholder?: string;
  maxMessageLength?: number;
  persistHistory?: boolean;
  enableAnalytics?: boolean;
}

/**
 * Analytics event types
 */
export type AnalyticsEvent = 
  | "chat_opened"
  | "chat_closed"
  | "message_sent"
  | "contact_clicked"
  | "lead_generated"
  | "error_occurred";

/**
 * Analytics payload
 */
export interface AnalyticsPayload {
  event: AnalyticsEvent;
  timestamp: Date;
  context?: ConversationContext;
  metadata?: Record<string, any>;
}

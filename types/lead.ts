/**
 * Lead Capture Types
 * Structured data for converting chatbot conversations into qualified leads
 */

/**
 * Conversation stages in the sales funnel
 */
export enum ChatStage {
  GREETING = "GREETING",
  ASK_NAME = "ASK_NAME",
  ASK_EMAIL = "ASK_EMAIL",
  ASK_PHONE = "ASK_PHONE",
  ASK_PURPOSE = "ASK_PURPOSE",
  SUMMARY = "SUMMARY",
  COMPLETE = "COMPLETE",
}

/**
 * Structured lead data extracted from conversation
 */
export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  purpose?: string;
  timestamp?: Date;
  conversationLength?: number;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Pricing tier information
 */
export interface PricingTier {
  name: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
}

/**
 * Purpose/Project type with pricing
 */
export interface ProjectType {
  type: string;
  label: string;
  keywords: string[];
  pricing: PricingTier;
}

/**
 * Chat message with stage tracking
 */
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  stage?: ChatStage;
  isTyping?: boolean;
}

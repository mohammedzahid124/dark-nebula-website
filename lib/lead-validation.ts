/**
 * Lead validation and extraction utilities
 * Ensures data quality for lead capture
 */

import { LeadData, ValidationResult, ChatStage } from "@/types/lead";

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || !email.trim()) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }
  
  return { isValid: true };
}

/**
 * Validate phone number (minimum 10 digits)
 */
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /\d/g;
  const digits = phone.match(phoneRegex) || [];
  
  if (!phone || !phone.trim()) {
    return { isValid: false, error: "Phone number is required" };
  }
  
  if (digits.length < 10) {
    return { isValid: false, error: "Please enter a valid phone number (at least 10 digits)" };
  }
  
  return { isValid: true };
}

/**
 * Validate name (minimum 2 characters)
 */
export function validateName(name: string): ValidationResult {
  if (!name || !name.trim()) {
    return { isValid: false, error: "Name is required" };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, error: "Please enter a valid name (at least 2 characters)" };
  }
  
  return { isValid: true };
}

/**
 * Extract email from text
 */
export function extractEmail(text: string): string | null {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = text.match(emailRegex);
  return match ? match[1] : null;
}

/**
 * Extract phone from text (removes non-digits)
 */
export function extractPhone(text: string): string | null {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}

/**
 * Extract name from text (capitalize first letter of each word)
 */
export function extractName(text: string): string | null {
  const words = text.trim().split(/\s+/);
  
  // Filter out common question words
  const commonWords = ["i'm", "i", "my", "name", "is", "am", "called", "please", "thanks"];
  const nameWords = words.filter(
    (word) => !commonWords.includes(word.toLowerCase())
  );
  
  if (nameWords.length === 0) return null;
  
  // Capitalize first letter of each word
  return nameWords
    .slice(0, 3) // Limit to 3 words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Detect project purpose/type from text
 */
export function detectPurpose(text: string): string | null {
  const lowerText = text.toLowerCase();
  
  const purposeMap: Record<string, string[]> = {
    portfolio: ["portfolio", "personal", "showcase", "resume", "cv"],
    business: ["business", "company", "corporate", "website", "site"],
    ecommerce: ["ecommerce", "shop", "store", "shop", "product", "sell"],
    webapp: ["app", "application", "web app", "platform", "saas", "service"],
    mobile: ["mobile", "app", "ios", "android", "iphone"],
    ai: ["ai", "artificial", "machine learning", "ml", "chatbot", "automation"],
    data: ["data", "analytics", "dashboard", "visualization", "report"],
    design: ["design", "ui", "ux", "branding", "logo", "creative"],
  };
  
  for (const [purpose, keywords] of Object.entries(purposeMap)) {
    if (keywords.some((keyword) => lowerText.includes(keyword))) {
      return purpose;
    }
  }
  
  return null;
}

/**
 * Extract lead data from user message
 * Used to pre-fill fields when user volunteers information
 */
export function extractLeadData(text: string): Partial<LeadData> {
  const data: Partial<LeadData> = {};
  
  const email = extractEmail(text);
  if (email) data.email = email;
  
  const phone = extractPhone(text);
  if (phone) data.phone = phone;
  
  const purpose = detectPurpose(text);
  if (purpose) data.purpose = purpose;
  
  // Extract name (more conservative than above)
  const name = extractName(text);
  if (name && name.length > 1) data.name = name;
  
  return data;
}

/**
 * Check if lead data is complete
 */
export function isLeadComplete(lead: LeadData): boolean {
  return !!(lead.name && lead.email && lead.phone && lead.purpose);
}

/**
 * Determine next stage based on collected data
 */
export function getNextStage(lead: LeadData): ChatStage {
  if (!lead.name) return ChatStage.ASK_NAME;
  if (!lead.email) return ChatStage.ASK_EMAIL;
  if (!lead.phone) return ChatStage.ASK_PHONE;
  if (!lead.purpose) return ChatStage.ASK_PURPOSE;
  return ChatStage.SUMMARY;
}

/**
 * Format lead data for display
 */
export function formatLeadSummary(lead: LeadData): string {
  const lines = [
    `Name: ${lead.name || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Project Type: ${lead.purpose || "—"}`,
  ];
  
  return lines.join("\n");
}

/**
 * Build URL with lead parameters for contact page
 */
export function buildLeadUrl(lead: LeadData, basePath: string = "/contact"): string {
  const params = new URLSearchParams();
  
  if (lead.name) params.append("name", lead.name);
  if (lead.email) params.append("email", lead.email);
  if (lead.phone) params.append("phone", lead.phone);
  if (lead.purpose) params.append("purpose", lead.purpose);
  
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Get pricing for project purpose
 */
export function getPricingForPurpose(purpose: string | undefined): { min: number; max: number } | null {
  if (!purpose) return null;
  
  const pricingMap: Record<string, { min: number; max: number }> = {
    portfolio: { min: 15000, max: 25000 },
    business: { min: 30000, max: 60000 },
    ecommerce: { min: 60000, max: 150000 },
    webapp: { min: 60000, max: 300000 },
    mobile: { min: 50000, max: 200000 },
    ai: { min: 80000, max: 500000 },
    data: { min: 50000, max: 200000 },
    design: { min: 20000, max: 100000 },
  };
  
  return pricingMap[purpose.toLowerCase()] || null;
}

/**
 * Format price in INR
 */
export function formatPrice(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}k`;
  }
  return `₹${amount}`;
}

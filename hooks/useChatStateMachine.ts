/**
 * State machine hook for managing structured lead capture chatbot
 * Implements ChatStage progression, lead extraction, and validation
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  ChatStage,
  LeadData,
  ValidationResult,
  type ChatMessage,
} from "@/types/lead";
import {
  validateEmail,
  validatePhone,
  validateName,
  extractLeadData,
  getNextStage,
  isLeadComplete,
  getPricingForPurpose,
} from "@/lib/lead-validation";

const STORAGE_KEY = "dark_nebula_lead";

/**
 * Main hook for chat state machine with lead capture
 */
export function useChatStateMachine() {
  // Core state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [currentStage, setCurrentStage] = useState<ChatStage>(ChatStage.GREETING);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Refs for tracking
  const lastBotMessageRef = useRef<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const messageIdRef = useRef(0);

  /**
   * Add a message to the conversation
   */
  const addMessage = useCallback(
    (
      text: string,
      sender: "user" | "bot",
      stage?: ChatStage,
      isTyping?: boolean
    ) => {
      const message: ChatMessage = {
        id: String(messageIdRef.current++),
        text,
        sender,
        timestamp: new Date(),
        stage: stage || currentStage,
        isTyping: isTyping || false,
      };

      setMessages((prev) => [...prev, message]);
      return message;
    },
    [currentStage]
  );

  /**
   * Initialize chat with greeting
   */
  const initializeChat = useCallback(() => {
    setCurrentStage(ChatStage.GREETING);
    setLeadData({});
    setMessages([]);
    setError(null);
    messageIdRef.current = 0;

    const greetingText =
      "Hey there! 👋 I'm Dark Nebula's virtual consultant. I'd love to learn about your project and see how we can help. What's your name?";
    addMessage(greetingText, "bot", ChatStage.GREETING);
    lastBotMessageRef.current = greetingText;
  }, [addMessage]);

  /**
   * Validate lead data for current stage before progression
   */
  const validateForStage = useCallback(
    (stage: ChatStage, data: Partial<LeadData>): ValidationResult => {
      switch (stage) {
        case ChatStage.ASK_NAME:
          if (!data.name) {
            return {
              isValid: false,
              error: "Please tell me your name so I can personalize our conversation.",
            };
          }
          return validateName(data.name);

        case ChatStage.ASK_EMAIL:
          if (!data.email) {
            return {
              isValid: false,
              error: "I'll need your email to send project details and updates.",
            };
          }
          return validateEmail(data.email);

        case ChatStage.ASK_PHONE:
          if (!data.phone) {
            return {
              isValid: false,
              error: "What's the best phone number to reach you?",
            };
          }
          return validatePhone(data.phone);

        case ChatStage.ASK_PURPOSE:
          if (!data.purpose) {
            return {
              isValid: false,
              error: "What type of project are you looking to build?",
            };
          }
          return { isValid: true };

        default:
          return { isValid: true };
      }
    },
    []
  );

  /**
   * Get next question based on stage
   */
  const getNextQuestion = useCallback((stage: ChatStage): string => {
    const questions: Record<ChatStage, string> = {
      [ChatStage.GREETING]:
        "What's your name? This helps me personalize our conversation.",
      [ChatStage.ASK_NAME]:
        "Thanks! Now, what's the best email address to reach you?",
      [ChatStage.ASK_EMAIL]:
        "Got it! What's the best phone number to reach you?",
      [ChatStage.ASK_PHONE]:
        "Perfect! Now tell me, what type of project are you looking to build? (e.g., portfolio, business website, e-commerce store, web app, mobile app, AI/ML solution, data dashboard)",
      [ChatStage.ASK_PURPOSE]:
        "Awesome! I have all the information I need. Let me summarize what we discussed so far...",
      [ChatStage.SUMMARY]:
        "Ready to get started? Click below to go to our contact form where we can discuss your project in detail.",
      [ChatStage.COMPLETE]: "Thank you for chatting with us!",
    };

    return questions[stage] || "";
  }, []);

  /**
   * Generate summary message with lead data
   */
  const generateSummary = useCallback((data: LeadData): string => {
    const pricing = getPricingForPurpose(data.purpose);
    let summary = `Great! Here's what I've gathered:\n\n`;
    summary += `👤 Name: ${data.name || "—"}\n`;
    summary += `📧 Email: ${data.email || "—"}\n`;
    summary += `📞 Phone: ${data.phone || "—"}\n`;
    summary += `🎯 Project: ${data.purpose || "—"}\n`;

    if (pricing) {
      summary += `\n💰 Estimated Budget Range:\n`;
      summary += `₹${(pricing.min / 100000).toFixed(1)}L - ₹${(pricing.max / 100000).toFixed(1)}L\n`;
      summary += `(This is a ballpark estimate - we'll refine it during consultation)`;
    }

    return summary;
  }, []);

  /**
   * Process user message and advance conversation
   */
  const processUserMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim()) return;

      // Add user message
      addMessage(userInput, "user", currentStage);

      // Extract any available data from user input
      const extractedData = extractLeadData(userInput);
      const updatedLeadData = { ...leadData, ...extractedData };

      // Try to advance stage
      const nextStage = getNextStage(updatedLeadData);
      let validationResult: ValidationResult | null = null;

      // Validate collected data
      if (nextStage !== currentStage) {
        validationResult = validateForStage(nextStage, updatedLeadData);

        if (!validationResult.isValid) {
          // Validation failed - ask for valid input
          addMessage(validationResult.error || "Invalid input", "bot", currentStage);
          lastBotMessageRef.current =
            validationResult.error || "Invalid input";
          return;
        }
      }

      // Update lead data and stage
      setLeadData(updatedLeadData);

      // Determine response message
      let botResponse = "";

      if (isLeadComplete(updatedLeadData)) {
        // All data collected - show summary
        setCurrentStage(ChatStage.SUMMARY);
        botResponse = generateSummary(updatedLeadData);
        addMessage(botResponse, "bot", ChatStage.SUMMARY);
        lastBotMessageRef.current = botResponse;
      } else {
        // Progress to next stage and ask next question
        const nextQuestion = getNextQuestion(nextStage);
        setCurrentStage(nextStage);

        // Make API call for AI-generated response (optional, keeps it natural)
        setIsLoading(true);
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: userInput,
              conversationHistory: messages,
              leadData: updatedLeadData,
              currentStage: nextStage,
              systemPrompt: `You are Dark Nebula's professional virtual consultant. The user has just told you: "${userInput}". 
              
Your job is to:
1. Acknowledge what they said briefly (1 sentence)
2. Ask the next question naturally: ${nextQuestion}

Keep it conversational. Be encouraging. Never repeat questions. Only ask for: name, email, phone, project type.
Never ask for budget or other information not in those 4 fields.`,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            botResponse = data.reply || nextQuestion;
          } else {
            botResponse = nextQuestion;
          }
        } catch (err) {
          console.error("API error:", err);
          botResponse = nextQuestion;
        } finally {
          setIsLoading(false);
        }

        // Prevent duplicate responses
        if (botResponse !== lastBotMessageRef.current) {
          addMessage(botResponse, "bot", nextStage);
          lastBotMessageRef.current = botResponse;
        }
      }

      // Auto-save to localStorage
      saveChatState(updatedLeadData, messages);
    },
    [currentStage, leadData, messages, addMessage, validateForStage, getNextQuestion, generateSummary]
  );

  /**
   * Advance to contact form with auto-fill
   */
  const advanceToContactForm = useCallback(() => {
    setCurrentStage(ChatStage.COMPLETE);

    // Build URL with lead data
    const params = new URLSearchParams();
    if (leadData.name) params.append("name", leadData.name);
    if (leadData.email) params.append("email", leadData.email);
    if (leadData.phone) params.append("phone", leadData.phone);
    if (leadData.purpose) params.append("purpose", leadData.purpose);

    const contactUrl = `/contact${params.toString() ? "?" + params.toString() : ""}`;

    // In a real app, use router.push
    // For now, return the URL for component to handle
    return contactUrl;
  }, [leadData]);

  /**
   * Debounced send function with delay
   */
  const debouncedSend = useMemo(() => {
    let timeout: NodeJS.Timeout;
    return (input: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        processUserMessage(input);
      }, 300);
    };
  }, [processUserMessage]);

  /**
   * Save chat state to localStorage
   */
  const saveChatState = useCallback((data: LeadData, msgs: ChatMessage[]) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          leadData: data,
          currentStage,
          messageCount: msgs.length,
          timestamp: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error("Failed to save chat state:", err);
    }
  }, [currentStage]);

  /**
   * Load chat state from localStorage
   */
  const loadChatState = useCallback((): { leadData: LeadData; stage: ChatStage } | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const state = JSON.parse(stored);
        return {
          leadData: state.leadData || {},
          stage: state.currentStage || ChatStage.GREETING,
        };
      }
    } catch (err) {
      console.error("Failed to load chat state:", err);
    }
    return null;
  }, []);

  /**
   * Clear chat history and reset
   */
  const resetChat = useCallback(() => {
    setMessages([]);
    setLeadData({});
    setCurrentStage(ChatStage.GREETING);
    setError(null);
    messageIdRef.current = 0;
    lastBotMessageRef.current = "";

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear storage:", err);
    }

    initializeChat();
  }, [initializeChat]);

  /**
   * Get progress percentage (0-100)
   */
  const progressPercentage = useMemo(() => {
    const stages = [
      ChatStage.GREETING,
      ChatStage.ASK_NAME,
      ChatStage.ASK_EMAIL,
      ChatStage.ASK_PHONE,
      ChatStage.ASK_PURPOSE,
      ChatStage.SUMMARY,
    ];

    const currentIndex = stages.indexOf(currentStage);
    return currentIndex >= 0 ? ((currentIndex + 1) / stages.length) * 100 : 0;
  }, [currentStage]);

  /**
   * Get current step label
   */
  const currentStep = useMemo(() => {
    const stepMap: Record<ChatStage, string> = {
      [ChatStage.GREETING]: "Getting Started",
      [ChatStage.ASK_NAME]: "Your Name",
      [ChatStage.ASK_EMAIL]: "Your Email",
      [ChatStage.ASK_PHONE]: "Your Phone",
      [ChatStage.ASK_PURPOSE]: "Your Project",
      [ChatStage.SUMMARY]: "Confirmation",
      [ChatStage.COMPLETE]: "Complete",
    };

    return stepMap[currentStage];
  }, [currentStage]);

  return {
    // State
    messages,
    leadData,
    currentStage,
    isLoading,
    isTyping,
    error,

    // Methods
    initializeChat,
    processUserMessage,
    debouncedSend,
    advanceToContactForm,
    resetChat,
    addMessage,

    // Utilities
    validateForStage,
    getNextQuestion,
    generateSummary,
    saveChatState,
    loadChatState,
    progressPercentage,
    currentStep,

    // Refs
    lastBotMessageRef,
    abortControllerRef,
  };
}

/**
 * Hook for managing input debouncing
 */
export function useInputDebounce(delay: number = 300) {
  const [isDebouncing, setIsDebouncing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (callback: () => void) => {
      setIsDebouncing(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback();
        setIsDebouncing(false);
      }, delay);
    },
    [delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsDebouncing(false);
    }
  }, []);

  return { isDebouncing, debounce, cancel };
}

/**
 * Hook for typing animation
 */
export function useTypingAnimation() {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startTyping = useCallback(() => {
    setIsTyping(true);
  }, []);

  const stopTyping = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);
  }, []);

  return { isTyping, startTyping, stopTyping };
}

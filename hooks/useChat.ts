/**
 * Custom React hooks for chatbot functionality
 * Provides reusable chat logic and state management
 */

import { useState, useCallback, useRef, useEffect } from "react";
import type { Message, ConversationContext, ChatResponse } from "@/types/chat";

/**
 * Hook for managing chat messages and conversation state
 */
export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return {
    messages,
    isLoading,
    error,
    addMessage,
    clearMessages,
    removeMessage,
    setIsLoading,
    setError,
  };
}

/**
 * Hook for managing conversation context and user information
 */
export function useConversationContext() {
  const [context, setContext] = useState<ConversationContext>({});

  const updateContext = useCallback((updates: Partial<ConversationContext>) => {
    setContext((prev) => ({ ...prev, ...updates }));
  }, []);

  const clearContext = useCallback(() => {
    setContext({});
  }, []);

  const hasRequiredInfo = useCallback(() => {
    return !!(context.projectType && (context.email || context.phone));
  }, [context]);

  return {
    context,
    updateContext,
    clearContext,
    hasRequiredInfo,
  };
}

/**
 * Hook for sending messages to the chat API
 */
export function useChatAPI(apiEndpoint: string = "/api/chat") {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (
      message: string,
      conversationHistory: Message[],
      context: ConversationContext
    ): Promise<ChatResponse | null> => {
      if (!message.trim()) return null;

      setIsLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
            conversationHistory,
            context,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `API error: ${response.statusText}`
          );
        }

        const data: ChatResponse = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to send message";
          setError(errorMessage);
          console.error("Chat API error:", err);
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiEndpoint]
  );

  const cancelRequest = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  return {
    sendMessage,
    isLoading,
    error,
    cancelRequest,
    setError,
  };
}

/**
 * Hook for auto-scrolling to latest message
 */
export function useAutoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  return {
    containerRef,
    scrollToBottom,
  };
}

/**
 * Hook for managing chat widget visibility
 */
export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasNewMessage(false); // Clear notification when opened
    }
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    hasNewMessage,
    toggleOpen,
    open,
    close,
    setHasNewMessage,
  };
}

/**
 * Hook for typing animation delays
 */
export function useTypingAnimation(textLength: number) {
  // Aim for 40-60 WPM typing speed
  // Average word is 5 characters
  const wordsPerMinute = 50;
  const charsPerMinute = wordsPerMinute * 5;
  const delay = (textLength / charsPerMinute) * 60 * 1000;

  // Minimum 300ms, maximum 5000ms
  const animationDelay = Math.max(300, Math.min(delay, 5000));

  return {
    animationDelay,
    characterDelay: animationDelay / Math.max(textLength, 1),
  };
}

/**
 * Hook for managing chat persistence in localStorage
 */
export function useChatPersistence(storageKey: string = "dark_nebula_chat") {
  const saveMessages = useCallback((messages: Message[]) => {
    try {
      localStorage.setItem(
        `${storageKey}_messages`,
        JSON.stringify(messages)
      );
    } catch (err) {
      console.error("Failed to save messages:", err);
    }
  }, [storageKey]);

  const loadMessages = useCallback((): Message[] => {
    try {
      const stored = localStorage.getItem(`${storageKey}_messages`);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to load messages:", err);
      return [];
    }
  }, [storageKey]);

  const saveContext = useCallback((context: ConversationContext) => {
    try {
      localStorage.setItem(`${storageKey}_context`, JSON.stringify(context));
    } catch (err) {
      console.error("Failed to save context:", err);
    }
  }, [storageKey]);

  const loadContext = useCallback((): ConversationContext => {
    try {
      const stored = localStorage.getItem(`${storageKey}_context`);
      return stored ? JSON.parse(stored) : {};
    } catch (err) {
      console.error("Failed to load context:", err);
      return {};
    }
  }, [storageKey]);

  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(`${storageKey}_messages`);
      localStorage.removeItem(`${storageKey}_context`);
    } catch (err) {
      console.error("Failed to clear chat data:", err);
    }
  }, [storageKey]);

  return {
    saveMessages,
    loadMessages,
    saveContext,
    loadContext,
    clearAll,
  };
}

/**
 * Hook for debouncing input values
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for tracking analytics events
 */
export function useChatAnalytics() {
  const trackEvent = useCallback(
    (eventName: string, eventData?: Record<string, any>) => {
      // Send to analytics service (e.g., Google Analytics, Mixpanel)
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventName, eventData);
      }

      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] ${eventName}`, eventData);
      }
    },
    []
  );

  const trackChatOpened = useCallback(() => {
    trackEvent("chat_opened", { timestamp: new Date().toISOString() });
  }, [trackEvent]);

  const trackChatClosed = useCallback(() => {
    trackEvent("chat_closed", { timestamp: new Date().toISOString() });
  }, [trackEvent]);

  const trackMessageSent = useCallback(
    (messageLength: number) => {
      trackEvent("message_sent", {
        messageLength,
        timestamp: new Date().toISOString(),
      });
    },
    [trackEvent]
  );

  const trackContactClicked = useCallback(() => {
    trackEvent("contact_clicked", { timestamp: new Date().toISOString() });
  }, [trackEvent]);

  return {
    trackEvent,
    trackChatOpened,
    trackChatClosed,
    trackMessageSent,
    trackContactClicked,
  };
}

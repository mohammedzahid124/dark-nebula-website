/**
 * Enhanced ChatBot Component (v2)
 * Production-ready floating chatbot widget with improved architecture
 */

"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import {
  useChatMessages,
  useConversationContext,
  useChatAPI,
  useAutoScroll,
  useChatWidget,
  useTypingAnimation,
  useChatPersistence,
  useChatAnalytics,
} from "@/hooks/useChat";
import { extractContextFromMessage } from "@/lib/chatbot-utils";
import type { Message, ConversationContext } from "@/types/chat";

/**
 * TypingAnimation Component
 * Displays bot messages with typewriter effect
 */
interface TypingAnimationProps {
  text: string;
  onComplete?: () => void;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const { animationDelay, characterDelay } = useTypingAnimation(text.length);

  useEffect(() => {
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.substring(0, index));

      if (index === text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, characterDelay);

    return () => clearInterval(interval);
  }, [text, characterDelay, onComplete]);

  return (
    <div className="text-gray-800 dark:text-gray-100">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-2 h-5 ml-1 bg-cyan-500 dark:bg-cyan-400 animate-pulse"></span>
      )}
    </div>
  );
};

/**
 * Main ChatBot Component
 */
interface ChatBotProps {
  apiEndpoint?: string;
  initialMessage?: string;
  position?: "bottom-right" | "bottom-left";
  persistHistory?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({
  apiEndpoint = "/api/chat",
  initialMessage = "Hey there! 👋 Welcome to Dark Nebula. I'm your AI consultant. What are you looking to build?",
  position = "bottom-right",
  persistHistory = true,
}) => {
  // State management using custom hooks
  const { messages, isLoading, error, addMessage, clearMessages, setError } =
    useChatMessages();
  const { context, updateContext } = useConversationContext();
  const { sendMessage, isLoading: apiLoading } = useChatAPI(apiEndpoint);
  const { containerRef, scrollToBottom } = useAutoScroll();
  const { isOpen, toggleOpen, open, close } = useChatWidget();
  const { saveMessages, loadMessages, saveContext, loadContext, clearAll } =
    useChatPersistence();
  const {
    trackChatOpened,
    trackChatClosed,
    trackMessageSent,
    trackContactClicked,
  } = useChatAnalytics();

  // Local state
  const [inputValue, setInputValue] = useState("");
  const [hasGreeted, setHasGreeted] = useState(false);

  // Initialize chat on component mount
  useEffect(() => {
    if (persistHistory) {
      const savedMessages = loadMessages();
      const savedContext = loadContext();

      if (savedMessages.length > 0) {
        // Restore previous conversation
        savedMessages.forEach((msg) => addMessage(msg));
        updateContext(savedContext);
        setHasGreeted(true);
      }
    }

    if (!hasGreeted && isOpen) {
      const greeting: Message = {
        id: `bot-greeting-${Date.now()}`,
        text: initialMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(greeting);
      setHasGreeted(true);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle chat open
  const handleOpen = () => {
    open();
    trackChatOpened();

    if (!hasGreeted) {
      const greeting: Message = {
        id: `bot-greeting-${Date.now()}`,
        text: initialMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(greeting);
      setHasGreeted(true);
    }
  };

  // Handle chat close
  const handleClose = () => {
    close();
    trackChatClosed();
  };

  // Handle message sending
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    trackMessageSent(inputValue.length);

    // Extract context from message
    const extractedContext = extractContextFromMessage(inputValue);
    if (Object.keys(extractedContext).length > 0) {
      updateContext(extractedContext);
    }

    setInputValue("");

    // Show loading state
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true,
    };
    addMessage(loadingMessage);

    try {
      // Send to API
      const response = await sendMessage(inputValue, messages, {
        ...context,
        ...extractedContext,
      });

      // Remove loading message
      const messagesWithoutLoading = messages.filter(
        (msg) => msg.id !== loadingMessage.id
      );

      if (response) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: response.reply,
          sender: "bot",
          timestamp: new Date(),
        };
        addMessage(botMessage);

        // Update context with API response
        if (response.context) {
          updateContext(response.context);
        }

        // Save to localStorage if persistence is enabled
        if (persistHistory) {
          saveMessages([...messagesWithoutLoading, botMessage]);
          saveContext({ ...context, ...extractedContext, ...response.context });
        }
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Chat error:", err);
    }
  };

  // Handle clear chat
  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      clearMessages();
      if (persistHistory) clearAll();
      setHasGreeted(false);

      // Re-add greeting
      const greeting: Message = {
        id: `bot-greeting-${Date.now()}`,
        text: initialMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(greeting);
      setHasGreeted(true);
    }
  };

  // Handle contact redirect
  const handleContactRedirect = () => {
    trackContactClicked();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
      close();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "💻 Web Dev", message: "I need a website" },
    { label: "🤖 AI/Data", message: "I need an AI solution" },
    { label: "💰 Pricing", message: "What are your pricing options?" },
  ];

  // Position classes
  const positionClasses =
    position === "bottom-left" ? "bottom-4 left-4" : "bottom-4 right-4";

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className={`fixed ${positionClasses} z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:from-cyan-600 hover:to-purple-700 group`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="group-hover:hidden" />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div
      className={`fixed ${positionClasses} z-50 w-full max-w-md animate-fade-in`}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[600px] border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle size={20} />
            <div>
              <h3 className="font-semibold text-sm">Dark Nebula AI</h3>
              <p className="text-xs opacity-90 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="hover:bg-white/20 p-1 rounded transition"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800"
        >
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center text-gray-500">
              <p className="text-sm">No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-slide-in ${
                  msg.sender === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                {msg.isTyping ? (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Loader size={16} className="animate-spin text-blue-600" />
                    <span className="text-xs text-blue-600 dark:text-blue-300">
                      Thinking...
                    </span>
                  </div>
                ) : (
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <TypingAnimation text={msg.text} />
                    ) : (
                      msg.text
                    )}
                  </div>
                )}
              </div>
            ))
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-bl-none border border-red-300 dark:border-red-700">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && !apiLoading && (
          <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Quick actions:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputValue(action.message);
                    handleSendMessage({
                      preventDefault: () => {},
                    } as React.FormEvent);
                  }}
                  className="text-xs px-2 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition border border-gray-300 dark:border-gray-700"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSendMessage} className="flex gap-2 mb-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={apiLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || apiLoading}
              className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Send message"
            >
              {apiLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </form>

          <div className="flex gap-2 text-xs">
            <button
              onClick={handleClearChat}
              className="flex-1 px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Clear
            </button>
            <button
              onClick={handleContactRedirect}
              className="flex-1 px-3 py-1.5 rounded bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg transition"
            >
              Talk to Team
            </button>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;

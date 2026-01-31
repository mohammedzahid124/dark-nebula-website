"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle, Loader } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

interface ConversationContext {
  projectType?: string;
  budget?: string;
  timeline?: string;
  email?: string;
  phone?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: "greeting",
        text: "👋 Welcome to Dark Nebula! I'm your AI consultant. What kind of project are you interested in?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greeting]);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length]);

  /**
   * Send message to AI API and get response
   */
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Send to API for AI response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages,
          context: conversationContext,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Add bot response with typing animation
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      // Update context if API provided updated context
      if (data.context) {
        setConversationContext((prev) => ({ ...prev, ...data.context }));
      }

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't process your request. Please try again or contact us directly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear chat history
   */
  const clearChat = () => {
    setMessages([]);
    setConversationContext({});
    const greeting: Message = {
      id: "greeting-reset",
      text: "👋 Chat cleared! What can I help you with today?",
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages([greeting]);
  };

  /**
   * Redirect to contact page
   */
  const redirectToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-linear-to-br from-cyan-500 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
          <span className="absolute bottom-full mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[95vw] sm:w-full max-w-md h-[600px] bg-black border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">

          {/* Header */}
          <div className="bg-linear-to-r from-cyan-500 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div>
                <h3 className="text-white font-bold text-sm">Dark Nebula AI</h3>
                <p className="text-white/80 text-xs">Online & Ready to Help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 backdrop-blur-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-br-none"
                      : "bg-white/10 text-white rounded-bl-none border border-white/20"
                  } animate-slide-in`}
                >
                  <TypingAnimation text={msg.text} isBot={msg.sender === "bot"} />
                  <p className="text-xs text-white/60 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-white px-4 py-3 rounded-lg rounded-bl-none border border-white/20 flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 p-4 space-y-2 bg-black/50">
            {/* Quick Action Buttons */}
            {messages.length < 3 && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={() => setInputValue("Web development")}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors"
                >
                  Web Dev
                </button>
                <button
                  onClick={() => setInputValue("AI & Data projects")}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors"
                >
                  AI/Data
                </button>
                <button
                  onClick={() => setInputValue("How much does it cost?")}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={clearChat}
                  className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 transition-colors"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Message Input Form */}
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-4 py-2 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Contact Button */}
            <button
              onClick={redirectToContact}
              className="w-full py-2 text-xs bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
            >
              📞 Talk to Our Team
            </button>
          </div>
        </div>
      )}

      {/* Typing Animation Component */}
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

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
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

/**
 * Typing Animation Component
 * Displays text with a typewriter effect for bot messages
 */
function TypingAnimation({
  text,
  isBot,
  speed = 20,
}: {
  text: string;
  isBot: boolean;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState(isBot ? "" : text);

  useEffect(() => {
    if (!isBot) {
      setDisplayedText(text);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, isBot, speed]);

  return (
    <p className="text-sm break-words">
      {displayedText}
      {isBot && displayedText.length < text.length && (
        <span className="animate-pulse">▌</span>
      )}
    </p>
  );
}

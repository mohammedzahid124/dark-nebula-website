"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Send, MessageCircle, Loader, ChevronRight } from "lucide-react";
import { useChatStateMachine, useInputDebounce } from "@/hooks/useChatStateMachine";
import { ChatStage } from "@/types/lead";

/**
 * Refactored ChatBot Component with State Machine
 * Implements lead capture, progress tracking, and form auto-fill
 */
export default function ChatBot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State machine hook
  const {
    messages,
    leadData,
    currentStage,
    isLoading,
    isTyping,
    error,
    initializeChat,
    processUserMessage,
    advanceToContactForm,
    resetChat,
    progressPercentage,
    currentStep,
  } = useChatStateMachine();

  // Input debouncing
  const { isDebouncing, debounce } = useInputDebounce(300);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length, initializeChat]);

  /**
   * Handle message submission
   */
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || isDebouncing) return;

    const messageToSend = inputValue;
    setInputValue("");

    // Use debounce for send
    debounce(() => {
      processUserMessage(messageToSend);
    });
  };

  /**
   * Navigate to contact form with auto-fill
   */
  const handleContactFormRedirect = () => {
    const contactUrl = advanceToContactForm();
    router.push(contactUrl);
  };

  /**
   * Determine if input should be disabled
   */
  const isInputDisabled =
    isLoading || isDebouncing || currentStage === ChatStage.COMPLETE;

  /**
   * Calculate step number for progress display
   */
  const stepsArray = [
    ChatStage.GREETING,
    ChatStage.ASK_NAME,
    ChatStage.ASK_EMAIL,
    ChatStage.ASK_PHONE,
    ChatStage.ASK_PURPOSE,
    ChatStage.SUMMARY,
  ];
  const currentStepNumber = stepsArray.indexOf(currentStage) + 1;
  const totalSteps = stepsArray.length;

  return (
    <>
      {/* Floating Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
          <span className="absolute bottom-full mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with us
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gradient-to-b from-gray-900 to-black border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header with Progress */}
          <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-lg">Dark Nebula</h2>
                <p className="text-xs text-cyan-100">
                  Step {currentStepNumber} of {totalSteps}: {currentStep}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cyan-300 h-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-950">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-cyan-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-100 rounded-bl-none border border-cyan-500/30"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none border border-cyan-500/30 flex gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center">
                <Loader className="w-5 h-5 text-cyan-500 animate-spin" />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Summary & Contact CTA */}
          {currentStage === ChatStage.SUMMARY && (
            <div className="px-4 py-3 bg-gray-800/50 border-t border-cyan-500/20">
              <button
                onClick={handleContactFormRedirect}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 group"
              >
                Continue to Contact Form
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                We'll auto-fill your information to save time
              </p>
            </div>
          )}

          {/* Input Form */}
          {currentStage !== ChatStage.COMPLETE && currentStage !== ChatStage.SUMMARY && (
            <form
              onSubmit={sendMessage}
              className="p-4 bg-gray-900 border-t border-cyan-500/20"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isInputDisabled}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border border-cyan-500/30 text-white placeholder-gray-500 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                />
                <button
                  type="submit"
                  disabled={isInputDisabled || !inputValue.trim()}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {isDebouncing && (
                <p className="text-xs text-gray-500 mt-1">Sending...</p>
              )}
            </form>
          )}

          {/* Completion Message */}
          {currentStage === ChatStage.COMPLETE && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-white font-bold text-lg mb-2">
                Thank you for chatting with us!
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                We've sent you a confirmation email with next steps.
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetChat();
                }}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

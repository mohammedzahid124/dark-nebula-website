"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Github, Linkedin, Twitter, Send, Check } from "lucide-react";

/**
 * Contact Form Component with Chatbot Auto-Fill
 * Reads query parameters from chatbot and pre-populates form fields
 */
export default function ContactWithAutofill() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAutofillNote, setShowAutofillNote] = useState(false);

  // Auto-fill form from URL parameters (from chatbot)
  useEffect(() => {
    const name = searchParams?.get("name") || "";
    const email = searchParams?.get("email") || "";
    const phone = searchParams?.get("phone") || "";
    const purpose = searchParams?.get("purpose") || "";

    const hasAutofillData = !!(name || email || phone || purpose);

    if (hasAutofillData) {
      setFormData((prev) => ({
        ...prev,
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(purpose && { purpose }),
      }));

      // Show auto-fill notification
      setShowAutofillNote(true);
      setTimeout(() => setShowAutofillNote(false), 5000);
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields (name, email, phone)");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead data to backend
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          message: formData.message,
          submittedAt: new Date().toISOString(),
          source: "contact_form",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@darknebula.dev",
      link: "mailto:hello@darknebula.dev",
      color: "from-red-500 to-pink-600",
      hoverColor: "hover:shadow-red-500/50",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Dark Nebula",
      link: "https://linkedin.com",
      color: "from-cyan-500 to-blue-600",
      hoverColor: "hover:shadow-cyan-500/50",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "dark-nebula",
      link: "https://github.com",
      color: "from-purple-500 to-indigo-600",
      hoverColor: "hover:shadow-purple-500/50",
    },
    {
      icon: Twitter,
      label: "Twitter",
      value: "@darknebula",
      link: "https://twitter.com",
      color: "from-blue-400 to-cyan-500",
      hoverColor: "hover:shadow-blue-500/50",
    },
  ];

  const projectTypes = [
    { value: "portfolio", label: "Portfolio Website" },
    { value: "business", label: "Business Website" },
    { value: "ecommerce", label: "E-Commerce Store" },
    { value: "webapp", label: "Web Application" },
    { value: "mobile", label: "Mobile App" },
    { value: "ai", label: "AI/ML Solution" },
    { value: "data", label: "Data Dashboard" },
    { value: "design", label: "Design & Branding" },
    { value: "other", label: "Other" },
  ];

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-4"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Check className="w-20 h-20 text-green-500 animate-bounce" />
            </div>
            <h2 className="text-4xl font-bold text-white">
              Thank you for reaching out!
            </h2>
            <p className="text-xl text-gray-300">
              We've received your message and will get back to you within 24
              hours.
            </p>
            <p className="text-gray-400">
              A confirmation email has been sent to{" "}
              <span className="text-cyan-400 font-semibold">
                {formData.email}
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 px-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your project to life? We'd love to hear from you.
            Drop us a message and let's create something amazing together.
          </p>
        </div>

        {/* Auto-fill notification */}
        {showAutofillNote && (
          <div className="mb-8 max-w-2xl mx-auto bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              We've pre-filled your information from the chatbot. Feel free to
              update any details.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Project Type Field */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Project Type
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Tell us about your project
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="What's your vision? What do you want to build?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-sm text-gray-400">
                * Required fields. We'll never share your information.
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="order-1 md:order-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Other ways to reach us
              </h3>

              <div className="grid gap-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-6 bg-gradient-to-br ${info.color} rounded-xl hover:shadow-lg ${info.hoverColor} transition-all duration-300 transform hover:scale-105`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon className="w-6 h-6 text-white flex-shrink-0" />
                        <div>
                          <p className="text-white font-semibold">
                            {info.label}
                          </p>
                          <p className="text-white/80 text-sm">{info.value}</p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 bg-gray-800/50 border border-cyan-500/30 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Response Time</h4>
              <p className="text-gray-300 text-sm">
                We typically respond within 24 hours. For urgent matters, feel
                free to give us a call.
              </p>
            </div>

            {/* Availability */}
            <div className="p-6 bg-gray-800/50 border border-purple-500/30 rounded-xl">
              <h4 className="text-white font-semibold mb-2">Availability</h4>
              <p className="text-gray-300 text-sm">
                Monday - Friday: 9 AM - 6 PM IST
                <br />
                Weekends: By appointment only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

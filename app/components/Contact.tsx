"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Thanks for reaching out! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
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
  ];

  return (
    <section id="contact" className="relative min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Futuristic animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-cyan-900/30 via-black to-purple-900/30" />

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, 0.05) 25%, rgba(139, 92, 246, 0.05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.05) 75%, rgba(139, 92, 246, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.05) 25%, rgba(6, 182, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.05) 75%, rgba(6, 182, 212, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px"
          }} />
        </div>

        {/* Glowing gradient orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />

        {/* Energy particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-linear-to-r from-cyan-400 to-purple-400 animate-pulse"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3 + 0.1,
                animationDelay: Math.random() * 3 + "s",
                animationDuration: Math.random() * 3 + 2 + "s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to transform your vision into reality? Reach out to us and let's create something extraordinary together.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <a
                key={idx}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-white/20 p-8 transition-all duration-300 ${info.hoverColor} hover:shadow-lg hover:border-white/40`}
              >
                {/* Card gradient background */}
                <div className={`absolute inset-0 bg-linear-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

                {/* Content */}
                <div className="relative z-10">
                  <div className={`inline-block p-3 rounded-xl bg-linear-to-br ${info.color} bg-opacity-10 mb-4`}>
                    <IconComponent className={`w-6 h-6 text-white group-hover:scale-110 transition-transform`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{info.label}</h3>
                  <p className="text-cyan-400 group-hover:text-cyan-300 transition-colors text-sm">{info.value}</p>
                </div>

                {/* Border glow on hover */}
                <div className={`absolute inset-0 bg-linear-to-br ${info.color} rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
              </a>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="relative rounded-3xl border border-white/20 overflow-hidden group">
          {/* Form gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Form content */}
          <div className="relative z-10 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-3">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white/20 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold flex items-center justify-center gap-2 group hover:scale-105"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-6 text-sm uppercase tracking-wider">Connect with us on social media</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-pink-600 hover:to-pink-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-purple-600 hover:to-purple-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-linear-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-cyan-800 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
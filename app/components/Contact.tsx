"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import Lightning from "@/components/Lightning"; // ✅ ADDED

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
      <div className="relative z-10 max-w-4xl mx-auto">

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
                <div className={`absolute inset-0 bg-linear-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

                <div className="relative z-10">
                  <div className={`inline-block p-3 rounded-xl bg-linear-to-br ${info.color} bg-opacity-10 mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{info.label}</h3>
                  <p className="text-cyan-400 text-sm">{info.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* 🔥 CONTACT FORM */}
        <div className="relative rounded-3xl border border-white/20 overflow-hidden min-h-[650px]">

          {/* ⚡ LIGHTNING BACKGROUND */}
          <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
            <Lightning
              hue={260}
              xOffset={0.3}
              speed={3}
              intensity={1}
              size={2}
            />
          </div>

          {/* Gradient glow */}

          {/* Glass overlay (lighter so lightning is visible) */}

          {/* FORM CONTENT — UNCHANGED */}
          <div className="relative z-20 p-8 md:p-12">
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
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
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
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-linear-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <div className="flex justify-center gap-4">
            <Twitter className="text-white" />
            <Github className="text-white" />
            <Linkedin className="text-white" />
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Mail, Instagram, Linkedin, Twitter, Send } from "lucide-react";
import Lightning from "@/components/Lightning";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "darknebulabs@gmail.com",
      link: "mailto:darknebulabs@gmail.com",
      color: "from-red-500 to-pink-600",
      hoverColor: "hover:shadow-red-500/50",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Dark Nebula",
      link: "https://www.linkedin.com/in/dark-nebula-1418723a9/",
      color: "from-cyan-500 to-blue-600",
      hoverColor: "hover:shadow-cyan-500/50",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@darknebulabs",
      link: "https://www.instagram.com/darknebulabs/",
      color: "from-pink-500 via-purple-500 to-orange-500",
      hoverColor: "hover:shadow-pink-500/50",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xnjvyjej", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    setLoading(false);

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative min-h-screen bg-black py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <a
                key={idx}
                href={info.link}
                target={info.link.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl border border-white/20 p-8 transition-all duration-300 ${info.hoverColor} hover:shadow-lg`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${info.color} opacity-0 group-hover:opacity-5`} />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  <div className={`mb-4 flex items-center justify-center p-4 rounded-xl bg-linear-to-br ${info.color}`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{info.label}</h3>
                  <p className="text-cyan-400 text-sm">{info.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* FORM */}
<div className="
  relative
  rounded-3xl
  border border-white/20
  overflow-hidden
  min-h-[600px]
shadow-[8px_24px_47px_20px_rgba(83,_13,_105,_0.76)]">

          <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
            <Lightning hue={260} xOffset={0.3} speed={3} intensity={1} size={2} />
          </div>

          <div className="relative z-20 p-10">
            {submitted ? (
              <div className="text-center py-32">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Thank you for reaching out!
                </h2>
                <p className="text-cyan-400">
                  We’ll get back to you shortly 🚀
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-8">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* NAME + EMAIL */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      name="name"
                      required
                      maxLength={20}
                      placeholder="Your Name"
                      title="Maximum 20 characters"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />


                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-[110px_1fr] gap-4">
                    {/* Country Code */}
                    <select
                      name="country_code"
                      required
                      className="w-28 bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="" className="bg-black text-gray-400">
                        Code
                      </option>

                      <option value="+91" className="bg-black text-white">
                        🇮🇳 +91
                      </option>

                      <option value="+966" className="bg-black text-white">
                        🇸🇦 +966
                      </option>

                      <option value="+971" className="bg-black text-white">
                        🇦🇪 +971
                      </option>

                      <option value="+1" className="bg-black text-white">
                        🇺🇸 +1
                      </option>

                      <option value="+44" className="bg-black text-white">
                        🇬🇧 +44
                      </option>

                      <option value="+61" className="bg-black text-white">
                        🇦🇺 +61
                      </option>
                    </select>


                    {/* Phone Number */}
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={15}
                      placeholder="Contact Number"
                      className="
      w-full
      bg-white/10
      border border-white/20
      rounded-lg
      px-4 py-3
      text-white
      focus:outline-none
      focus:border-cyan-400
    "
                    />
                  </div>





                  {/* COMPANY */}
                  <input
                    name="company"
                    maxLength={20}
                    placeholder="Company (optional)"
                    title="Maximum 20 characters"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />

                  {/* MESSAGE */}
                  <textarea
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    placeholder="Your Message (max 500 characters)"
                    title="Maximum 500 characters"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white resize-none"
                  />

                  <button
                    disabled={loading}
                    className="w-full py-4 bg-linear-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold flex justify-center items-center gap-2 hover:scale-105 transition disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className="w-5 h-5" />
                  </button>

                </form>
              </>
            )}
          </div>
        </div>

      

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import ElectricBorder from "./ElectricBorder";
import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}


export default function About() {
    const vision = useInView();
  const mission = useInView();

  const founders = [
    {
      name: "Nashrat Jahan",
      title: "Software Engineer",
      role: "AI & Backend Specialist",
      image: "/founders/nash.jpeg",
      bio: "Nashrat brings deep expertise in backend engineering and AI systems architecture. At LTIMindtree, she engineered autonomous AI agents using LangChain and LangGraph, building production-grade RAG systems and FastAPI services. Her full-stack capabilities span Next.js, React, and cloud infrastructure, with proven ability to deliver complex solutions for international enterprise clients.",
      message:
        "I believe in building AI systems that don't just work—they scale, they matter, and they solve real problems. Let's turn ambitious ideas into production reality.",
      expertise: [
        ".NET",
        "C#",
        "Python",
        "LangChain",
        "LangGraph",
        "Next.js",
        "React",
        "Azure",
        "Machine Learning",
        "Data Engineering",
      ],
      github: "https://github.com/Naaashh12",
      linkedin: "https://www.linkedin.com/in/nashrat-jahan-416bba205/",
    },
    {
      name: "Mohammed Zahid",
      title: "AI Engineer",
      role: "Full-Stack & Cloud Architect",
      image: "/founders/zahid.jpeg",
      bio: "Mohammed is an AI systems engineer specializing in generative AI and production deployments. He has built advanced AI applications including Legal Contract Review systems and voice-interactive AI agents, combining LLMs with practical engineering. His expertise spans full-stack development with React and Spring Boot, cloud infrastructure automation, and deploying machine learning systems at scale.",
      message:
        "Great AI starts with great engineering. We build systems that are intelligent, scalable, and built to ship. That's where the real magic happens.",
      expertise: [
        "Generative AI",
        "LLMs",
        "RAG",
        "LangChain",
        "React",
        "Spring Boot",
        "Azure",
        "Docker",
        "CI/CD",
        "Infrastructure as Code",
      ],
      github: "https://github.com/mohammedzahid124",
      linkedin: "https://www.linkedin.com/in/mohammed-zahid-ba3136213/",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-float-slow" />
        <div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            About Dark Nebula Solutions
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-purple-500 to-cyan-500 mx-auto mb-6 rounded-full" />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
            We're a specialized AI and backend engineering firm. Built by
            engineers who ship production systems—not prototypes. We turn
            cutting-edge AI and cloud architecture into business impact.
          </p>
          <p className="text-gray-400 text-base max-w-3xl mx-auto leading-relaxed">
            From autonomous AI agents to enterprise-grade cloud infrastructure,
            we've delivered production systems that matter. Our work spans
            international clients across industries—from chemical manufacturing
            to advanced AI applications. We don't build features; we architect
            solutions that scale, perform, and drive measurable business
            outcomes.
          </p>
        </div>

        {/* Founders Profile Section */}
        <div className="mb-24">
          <h3 className="text-4xl font-bold mb-16 text-center bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Meet Our Founders
          </h3>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {founders.map((founder, idx) => (
              <ElectricBorder
                key={idx}
                color={idx === 0 ? "#5227FF" : "#00D9FF"}
                speed={1.2}
                chaos={0.15}
                borderRadius={24}
              >
                <div className="relative p-8 md:p-10">
                  {/* Profile Image Section */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      {/* Animated Ring Effect */}
                      <div
                        className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 animate-spin-slow opacity-75"
                        style={{ animationDuration: "20s" }}
                      />

                      {/* Profile Image Container */}
                      <div className="relative w-32 h-32 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 p-1 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            width={128}
                            height={128}
                            className="rounded-full object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Founder Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {founder.name}
                    </h3>
                    <p className="text-purple-300 font-semibold text-base mb-1">
                      {founder.title}
                    </p>
                    <p className="text-cyan-300 text-sm font-medium">
                      {founder.role}
                    </p>
                  </div>

                  {/* Founder's Message */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                    <p className="text-gray-200 italic text-center text-sm leading-relaxed">
                      "{founder.message}"
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                    {founder.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
                      Core Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {founder.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300 hover:bg-purple-500/30 hover:border-purple-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 pt-6 border-t border-white/10">
                    <a
                      href={founder.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-lg hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group/social"
                      aria-label={`${founder.name} GitHub`}
                    >
                      <svg
                        className="w-5 h-5 text-white group-hover/social:text-purple-300 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-lg hover:bg-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 group/social"
                      aria-label={`${founder.name} LinkedIn`}
                    >
                      <svg
                        className="w-5 h-5 text-white group-hover/social:text-cyan-300 transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.949v5.418h-3.554s.05-8.79 0-9.714h3.554v1.375c.425-.656 1.185-1.589 2.882-1.589 2.105 0 3.684 1.375 3.684 4.331v5.597zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.951.77-1.71 1.916-1.71 1.144 0 1.915.759 1.915 1.71 0 .951-.771 1.71-1.915 1.71zm1.6 11.597H3.738V9.538h3.199v10.914zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>

{/* Vision & Mission Cards */}
<div className="border-t border-white/10 pt-20 mb-24">
<div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch overflow-hidden">

<div
  ref={vision.ref}
  className={`relative z-10 group h-full opacity-0 ${
    vision.visible ? "animate-slide-in-left opacity-100" : ""
  }`}
>
  
  {/* VIDEO */}
  <div className="absolute inset-0 rounded-3xl overflow-hidden -z-30 bg-black">
    <video
  src="/b.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-contain brightness-125 contrast-110"
/>

  </div>

  {/* DARK OVERLAY (NO BLUR) */}
  <div className="absolute inset-0 rounded-3xl bg-black/25 -z-20" />

  {/* CONTENT */}
  <div className="relative z-10 h-full flex flex-col justify-center
    bg-black/60
    border border-white/20
    rounded-3xl
    p-10">
   <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
  Our Vision
</h3>
<p className="text-gray-300 text-center leading-relaxed">
  To become a trusted technology partner shaping the future of digital systems
  through intelligent, secure, and scalable solutions. We envision a world where
  businesses operate with clarity, automation, and confidence—powered by
  systems that are built to evolve, adapt, and lead in a rapidly changing
  digital landscape.
</p>

  </div>
</div>


   {/* Mission Card */}
<div
  ref={mission.ref}
  className={`relative group h-full opacity-0 ${
    mission.visible
      ? "animate-slide-in-right opacity-100 [animation-delay:200ms]"
      : ""
  }`}
>
  {/* VIDEO — isolated, NO blur */}
  <div className="absolute inset-0 rounded-3xl overflow-hidden -z-30 bg-black flex items-center justify-center">
    <video
      src="/m.mp4"   // 👈 your mission video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-contain brightness-125 contrast-110"
    />
  </div>

  {/* DARK OVERLAY (NO BLUR) */}
  <div className="absolute inset-0 rounded-3xl bg-black/25 -z-20" />

  {/* FUTURISTIC GRADIENT */}
  <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_60%)] -z-10" />

  {/* CONTENT */}
  <div className="relative z-10 h-full flex flex-col justify-center
    bg-black/50
    border border-white/20
    rounded-3xl
    p-10
    transition-colors duration-300 hover:border-purple-400/50"
  >
  <h3 className="text-2xl font-bold mb-4 text-center
  bg-gradient-to-r from-purple-400 to-pink-400
  bg-clip-text text-transparent">
  Our Mission
</h3>

<p className="text-gray-300 leading-relaxed text-center">
  Our mission is to design and engineer production‑ready digital systems by
  combining advanced AI capabilities with robust, enterprise‑grade backend
  architecture. We focus on building secure, scalable, and high‑performance
  solutions that deliver measurable value, accelerate decision‑making, and
  support long‑term business growth.
</p>

  </div>
</div>
</div>
</div>
        {/* Featured Projects Section */}
        <div className="relative overflow-hidden py-32">
          {/* Stars */}
          <div className="absolute inset-0 stars-layer pointer-events-none" />

          {/* Nebula clouds */}
          <div className="absolute inset-0 nebula-layer pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-16 text-center bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Work
            </h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
              {/* Elementsphere Project */}
              <div className="group relative">
              
                {/* Card Background with Animated Border */}
                <div className="absolute inset-0 bg-linear-to-b from-purple-500/20 to-cyan-500/10 border border-purple-500/50 rounded-3xl -z-10" />

                {/* Gradient Glow on Hover  */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-20" />

                <div className="relative p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Project Info */}
                    <div>
                      <span className="inline-block px-4 py-1.5 bg-purple-500/30 border border-purple-500/50 rounded-full text-sm font-semibold text-purple-300 mb-4">
                        Featured Project
                      </span>
                      <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ElementSphere
                      </h4>
                      <p className="text-cyan-300 font-semibold mb-4">
                        Chemical Manufacturing & Distribution Platform
                      </p>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        A full-stack Next.js platform built for a Saudi-based
                        chemical manufacturing and distribution company.
                        ElementSphere revolutionizes how chemical products are
                        managed, showcased, and distributed across international
                        markets.
                      </p>
                      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                        The platform combines modern web architecture with
                        enterprise-grade performance, delivering a seamless
                        experience for product management, client relations, and
                        supply chain operations. Built with scalability and
                        international standards in mind.
                      </p>
                      <div className="mb-6">
                        <h5 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-widest">
                          Technologies
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Next.js",
                            "React",
                            "TypeScript",
                            "Tailwind CSS",
                            "Node.js",
                            "Cloud Infrastructure",
                          ].map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs text-gray-300 hover:bg-cyan-500/30 hover:border-cyan-500/70 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href="https://www.elementsphere.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all font-semibold hover:scale-105"
                      >
                        Visit Project
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>

                    {/* Project Visual */}

                    <div className="relative group">
                      {/* Nebula glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 blur-xl opacity-40 group-hover:opacity-70 transition-all duration-700 -z-10" />

                      {/* Sci‑fi frame */}
                      <div
                        className="relative border border-white/20 rounded-[28px] overflow-hidden backdrop-blur-xl    bg-white/5  transition-all duration-500  group-hover:border-cyan-400/60  group-hover:scale-[1.02] ">
                        <video
                          src="/elementsphere.mp4"
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-auto block"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* Label */}
                        <div className="absolute bottom-4 left-4">
                          <p className="text-white font-semibold tracking-wide">
                            ElementSphere
                          </p>
                          <p className="text-gray-300 text-xs">
                            Next.js | Saudi Arabia
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
              
            </div>
            
          </div>
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <p className="text-gray-400 text-lg mb-6">
              Ready to turn your ambitious idea into a production-grade system?
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all font-semibold hover:scale-105"
            >
              Let's Work Together
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(15px);
          }
          66% {
            transform: translateY(20px) translateX(-15px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(25px) translateX(-20px);
          }
          66% {
            transform: translateY(-20px) translateX(20px);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 25s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
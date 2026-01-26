"use client";

import FuturisticGalaxy from "./FuturisticGalaxy";
import RotatingText from "@/components/RotatingText";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Futuristic Galaxy Background */}
      <FuturisticGalaxy />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-5" />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
 <div className="flex flex-col items-center text-center gap-4">
  <h1 className="flex flex-wrap items-center justify-center gap-3 font-bold">
    {/* Static text */}
    <span
      className="
        text-4xl sm:text-5xl md:text-6xl
        bg-linear-to-r from-purple-300 via-white to-cyan-300
        bg-clip-text text-transparent
        drop-shadow-2xl
      "
    >
      Next‑Gen
    </span>

    {/* Rotating text */}
    <RotatingText
      texts={['Web Design', 'AI', 'Cyber Security', 'Analytics', 'Email Services', 'Digital Marketing']}
      mainClassName="
        text-4xl sm:text-5xl md:text-6xl
        px-3 sm:px-4 md:px-5
        bg-cyan-300 text-black
        rounded-lg
        overflow-hidden
        py-1 sm:py-1.5 md:py-2
        flex justify-center
        shadow-lg shadow-cyan-500/30
      "
      splitLevelClassName="overflow-hidden"
      staggerFrom="last"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '-120%' }}
      staggerDuration={0.025}
      transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
  </h1>

  {/* Next line */}
  <h2
    className="
      text-4xl sm:text-5xl md:text-6xl
      font-bold
      bg-linear-to-r from-purple-300 via-white to-cyan-300
      bg-clip-text text-transparent
      drop-shadow-2xl
    "
  >
    Solutions
  </h2>
</div>

</div>

        


          
       



        <div className="relative mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-2xl blur-2xl opacity-30" />
          <p className="relative text-lg sm:text-xl md:text-2xl text-white font-semibold px-6 py-6 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 shadow-2xl">
            Cutting-edge AI, cybersecurity, and data engineering.<br />
            Powering tomorrow's most ambitious companies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all font-semibold hover:scale-105"
          >
            Explore Services
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 border-2 border-purple-400 text-white rounded-lg hover:bg-purple-500/20 transition-all font-semibold hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

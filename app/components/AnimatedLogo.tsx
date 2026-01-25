"use client";

import React from "react";
import FuturisticLogo from "./FuturisticLogo";

export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Futuristic Logo */}
      <FuturisticLogo />

      {/* Text Label - DarkNebula with gradient colors and increased size */}
      <div className="hidden sm:block">
        <div className="text-lg md:text-xl font-bold tracking-tighter">
          <span className="bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            Dark
          </span>
          <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            Nebula
          </span>
        </div>
      </div>
    </div>
  );
}

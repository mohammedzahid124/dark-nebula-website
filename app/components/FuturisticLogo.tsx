"use client";

import React, { useEffect, useRef, useState } from "react";

export default function FuturisticLogo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationId: NodeJS.Timeout;

    const animate = () => {
      setRotation((prev) => (prev + 1) % 360);
    };

    animationId = setInterval(animate, 50);

    return () => clearInterval(animationId);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      className="w-12 h-12 md:w-16 md:h-16"
      style={{
        filter: "drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))",
      }}
    >
      {/* Central Orb */}
      <defs>
        <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="1" />
          <stop offset="50%" stopColor="#9333ea" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer Glow Ring */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="url(#orbGradient)"
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Middle Ring */}
      <circle
        cx="100"
        cy="100"
        r="75"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Rotating Spiral Arms */}
      <g
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "100px 100px",
          transition: "transform 0.05s linear",
        }}
      >
        {/* Spiral Arm 1 */}
        <path
          d="M 100,100 Q 130,70 140,40 Q 145,25 150,10"
          stroke="#ec4899"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          filter="url(#glow)"
        />

        {/* Spiral Arm 2 */}
        <path
          d="M 100,100 Q 70,130 40,140 Q 25,145 10,150"
          stroke="#06b6d4"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          filter="url(#glow)"
        />

        {/* Spiral Arm 3 */}
        <path
          d="M 100,100 Q 130,130 160,160 Q 175,175 190,190"
          stroke="#9333ea"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          filter="url(#glow)"
        />
      </g>

      {/* Central Planet/Orb */}
      <circle cx="100" cy="100" r="20" fill="url(#orbGradient)" filter="url(#glow)" />

      {/* Inner Core */}
      <circle
        cx="100"
        cy="100"
        r="12"
        fill="#fbbf24"
        opacity="0.9"
        filter="url(#glow)"
      />

      {/* Energy Pulses */}
      <circle
        cx="100"
        cy="100"
        r="25"
        fill="none"
        stroke="#ec4899"
        strokeWidth="1"
        opacity="0.4"
        style={{
          animation: "pulse 2s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            r: 25;
            opacity: 0.6;
          }
          50% {
            r: 35;
            opacity: 0.2;
          }
          100% {
            r: 25;
            opacity: 0.6;
          }
        }
      `}</style>
    </svg>
  );
}

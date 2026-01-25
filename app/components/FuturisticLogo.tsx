"use client";

import React from "react";

interface FuturisticLogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  animated?: boolean;
  priority?: boolean;
}

export default function FuturisticLogo({
  className = "",
  size = "medium",
  animated = true,
  priority = false,
}: FuturisticLogoProps) {
  const sizes = {
    small: "w-12 h-12",
    medium: "w-24 h-24",
    large: "w-64 h-64",
  };

  const dimensions = {
    small: { viewBox: "0 0 100 100", planetRadius: 15 },
    medium: { viewBox: "0 0 100 100", planetRadius: 15 },
    large: { viewBox: "0 0 100 100", planetRadius: 15 },
  };

  const config = dimensions[size];

  return (
    <div
      className={`${sizes[size]} ${className} flex items-center justify-center relative`}
      style={{
        filter: animated ? "drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))" : undefined,
      }}
    >
      <svg
        viewBox={config.viewBox}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))",
        }}
      >
        <defs>
          <radialGradient id="planetGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ff6b9d" stopOpacity="1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5b21b6" stopOpacity="1" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="planetGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Glow Aura */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(168, 85, 247, 0.2)"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Planet Core - Stationary */}
        <circle
          cx="50"
          cy="50"
          r={config.planetRadius}
          fill="url(#planetGradient)"
          filter="url(#planetGlow)"
        />

        {/* Planet Shine */}
        <ellipse
          cx="45"
          cy="45"
          rx="6"
          ry="8"
          fill="rgba(255, 255, 255, 0.4)"
          filter="url(#glow)"
        />

        {/* Ring 1 - Outer (Spinning) */}
        {animated && (
          <g
            style={{
              animation: "ring-spin 25s linear infinite",
              transformOrigin: "50px 50px",
            } as React.CSSProperties}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="40"
              ry="12"
              fill="none"
              stroke="rgba(6, 182, 212, 0.6)"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
          </g>
        )}

        {/* Ring 2 - Middle (Spinning) */}
        {animated && (
          <g
            style={{
              animation: "ring-spin 18s linear infinite reverse",
              transformOrigin: "50px 50px",
            } as React.CSSProperties}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="32"
              ry="10"
              fill="none"
              stroke="rgba(168, 85, 247, 0.5)"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
          </g>
        )}

        {/* Ring 3 - Inner (Spinning) */}
        {animated && (
          <g
            style={{
              animation: "ring-spin 30s linear infinite",
              transformOrigin: "50px 50px",
            } as React.CSSProperties}
          >
            <ellipse
              cx="50"
              cy="50"
              rx="24"
              ry="8"
              fill="none"
              stroke="rgba(236, 72, 153, 0.4)"
              strokeWidth="1"
              filter="url(#glow)"
            />
          </g>
        )}

        {/* Accent Particles */}
        <circle cx="90" cy="50" r="1.5" fill="rgba(6, 182, 212, 0.7)" filter="url(#glow)" />
        <circle cx="10" cy="50" r="1.5" fill="rgba(168, 85, 247, 0.7)" filter="url(#glow)" />
        <circle cx="50" cy="15" r="1" fill="rgba(236, 72, 153, 0.6)" filter="url(#glow)" />
      </svg>

      <style>{`
        @keyframes ring-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

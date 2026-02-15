import React from "react";

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <defs>
        {/* The Main Gradient Background */}
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0891b2" /> {/* Cyan-600 */}
          <stop offset="100%" stopColor="#7c3aed" /> {/* Violet-600 */}
        </linearGradient>
        
        {/* Glow Filter */}
        <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Background Shape (Rounded Square) */}
      <rect
        x="10" y="10" width="80" height="80"
        rx="20" ry="20"
        fill="url(#bg-gradient)"
        filter="url(#soft-glow)"
        className="opacity-90"
      />

      {/* 2. Glass Shine Effect (Top part) */}
      <path
        d="M10 30 Q 50 50 90 30 V 30 A 20 20 0 0 0 10 30 Z"
        fill="white"
        fillOpacity="0.15"
      />

      {/* 3. The "L" Letter (Bold & White) */}
      <text
        x="50" y="70"
        fontSize="55"
        fontWeight="800"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
        style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
      >
        L
      </text>
    </svg>
  );
};
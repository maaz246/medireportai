"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const iconDimensions = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      {/* SVG Icon Container with Glow */}
      <div className={`relative ${iconDimensions[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
        <img
          src="/medireport-logo.svg"
          alt="MediReport AI Logo"
          className="relative w-full h-full object-contain"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-extrabold tracking-tight text-white ${textSizes[size]} flex items-center gap-1.5`}>
            <span>MediReport</span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-black">
              AI
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

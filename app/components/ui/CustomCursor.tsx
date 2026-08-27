"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch-only devices or if reduced motion is preferred
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let animationFrameId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Fast check if target or parent is an interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        if (!isHovered) {
          isHovered = true;
          dot.style.backgroundColor = "#38bdf8";
          dot.style.boxShadow = "0 0 10px #38bdf8, 0 0 20px #38bdf8";
          ring.className =
            "fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/80 bg-cyan-500/15 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.4)] w-12 h-12 transition-all duration-200 ease-out will-change-transform";
        }
      } else {
        if (isHovered) {
          isHovered = false;
          dot.style.backgroundColor = "#a855f7";
          dot.style.boxShadow = "0 0 8px #a855f7";
          ring.className =
            "fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/50 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.2)] w-8 h-8 transition-all duration-200 ease-out will-change-transform";
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Smooth physics loop running on RAF without triggering React re-renders
    const renderLoop = () => {
      if (isVisible) {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        trailX += dx * 0.25;
        trailY += dy * 0.25;

        const dotScale = isClicking ? 0.7 : isHovered ? 1.5 : 1;
        const ringScale = isClicking ? 0.8 : isHovered ? 1.25 : 1;

        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${dotScale})`;
        ring.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) scale(${ringScale})`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Central Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 will-change-transform"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#a855f7",
          boxShadow: "0 0 8px #a855f7",
        }}
      />

      {/* Trailing Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/50 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.2)] w-8 h-8 opacity-0 will-change-transform"
      />
    </>
  );
}

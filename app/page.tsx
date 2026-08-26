"use client";

import Link from "next/link";
import LivingOrigamiBg from "./components/ui/living-origami-bg";
import BlogSection from "./components/BlogSection";
import TeamSection from "./components/TeamSection";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="fora-hero-section relative min-h-[100vh] flex flex-col justify-center items-center overflow-hidden">
        <LivingOrigamiBg />
        <div className="relative z-10 flex flex-col items-center px-4 max-w-5xl mx-auto text-center mt-12">

          {/* Top Live Tech Badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            {lang === "ur" ? "جدید ترین طبی اے آئی سسٹمز" : "Next-Gen Medical Intelligence"}
          </div>

          {/* Modernized Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight mb-4">
            <span className="relative inline-block mr-3 sm:mr-5">
              <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-75 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent font-black animate-gradient-shift drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]">
                AI
              </span>
            </span>
            <span className="bg-gradient-to-b from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              {lang === "ur" ? "میڈیکل رپورٹ اینالائزر" : "Report Analyzer"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mt-2 font-medium">
            {t("heroSubtitle")}
          </p>

          {/* CTA Button */}
          <Link href="/analyze" className="inline-block px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 text-white rounded-xl mt-8 text-center cursor-pointer hover:scale-105 hover:shadow-cyan-500/25 transition-all duration-300 font-bold text-lg shadow-2xl">
            {t("getStarted")}
          </Link>
        </div>
        {/* Seamless transition overlay to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#04040c] pointer-events-none z-10" />
      </div>

      {/* 4 Cards Blog Section */}
      <BlogSection />

      {/* 4 Cards Team Section */}
      <TeamSection />
    </main>
  );
}
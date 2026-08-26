"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between rounded-full border border-white/15 bg-black/70 backdrop-blur-lg shadow-2xl text-white transition-all">

          {/* Left Section: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <Logo size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm sm:text-base font-medium text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">
                {t("home")}
              </Link>
              <Link href="/analyze" className="hover:text-cyan-400 text-cyan-300 font-semibold transition-colors flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t("navAnalyze")}
              </Link>
              <Link href="/#blogs" className="hover:text-white transition-colors">
                {t("blogs")}
              </Link>
              <Link href="/#who-we-are" className="hover:text-white transition-colors">
                {t("whoWeAre")}
              </Link>
            </nav>
          </div>

          {/* Right Section: Desktop Search & Language Switcher & Mobile Menu Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Desktop Search Bar */}
            <div className="hidden sm:flex items-center gap-2.5 bg-neutral-900/90 border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-gray-300 min-w-[210px] justify-between cursor-pointer hover:border-white/30 transition-colors">
              <span>{t("searchPlaceholder")}</span>
              <kbd className="px-2 py-0.5 text-[11px] font-mono bg-neutral-800 border border-neutral-700 rounded text-gray-300">
                CtrlK
              </kbd>
            </div>

            {/* Desktop Language Switcher */}
            <div className="hidden sm:flex items-center bg-neutral-900 border border-white/20 rounded-xl p-1 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                  lang === "en"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("ur")}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                  lang === "ur"
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                اردو
              </button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden p-2 rounded-xl bg-neutral-900 border border-white/20 text-gray-200 hover:text-white hover:border-white/40 transition-all cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon X
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Menu Icon
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Sidebar Overlay & Drawer with Smooth CSS Transitions */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-neutral-950/95 border-l border-white/15 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden overflow-y-auto transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header: Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo size="sm" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-neutral-900 border border-white/20 text-gray-300 hover:text-white cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="my-6">
            <div className="flex items-center gap-2.5 bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-gray-300 w-full justify-between shadow-inner">
              <span>{t("searchPlaceholder")}</span>
              <kbd className="px-2 py-0.5 text-[11px] font-mono bg-neutral-800 border border-neutral-700 rounded text-gray-400">
                CtrlK
              </kbd>
            </div>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2 font-medium text-gray-300">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 rounded-xl hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-between text-base"
            >
              <span>{t("home")}</span>
              <span className="text-gray-500 text-xs">→</span>
            </Link>
            <Link
              href="/analyze"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 text-cyan-300 font-semibold transition-colors flex items-center justify-between text-base"
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                {t("navAnalyze")}
              </span>
              <span className="text-cyan-400 text-xs">→</span>
            </Link>
            <Link
              href="/#blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 rounded-xl hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-between text-base"
            >
              <span>{t("blogs")}</span>
              <span className="text-gray-500 text-xs">→</span>
            </Link>
            <Link
              href="/#who-we-are"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 px-4 rounded-xl hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-between text-base"
            >
              <span>{t("whoWeAre")}</span>
              <span className="text-gray-500 text-xs">→</span>
            </Link>
          </nav>
        </div>

        {/* Mobile Language Switcher Footer */}
        <div className="pt-6 border-t border-white/10">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block mb-3">
            {lang === "ur" ? "زبان منتخب کریں" : "Language"}
          </span>
          <div className="grid grid-cols-2 gap-2 bg-neutral-900 border border-white/20 rounded-xl p-1 text-sm font-semibold">
            <button
              onClick={() => setLang("en")}
              className={`py-2 rounded-lg cursor-pointer text-center transition-all ${
                lang === "en"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("ur")}
              className={`py-2 rounded-lg cursor-pointer text-center transition-all ${
                lang === "ur"
                  ? "bg-white text-black font-bold shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              اردو
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
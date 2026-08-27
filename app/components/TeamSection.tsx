"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TEAM_MEMBERS } from "../data/team";
import { useLanguage } from "../context/LanguageContext";

export default function TeamSection() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-are" ref={sectionRef} className="w-full bg-gradient-to-b from-black via-[#04040c] to-black text-white pt-12 pb-28 px-6 md:px-12 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold bg-indigo-950/60 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            {lang === "ur" ? "ہماری ٹیم" : "Our Team"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
            {lang === "ur" ? "میڈی رپورٹ AI بنانے والی ماہرین کی ٹیم" : "Meet the Minds Behind MediReport AI"}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-3">
            {lang === "ur"
              ? "طبی تجزیہ کاری اور مصنوعی ذہانت کو عام فہم اور آسان بنانے کے لیے کوشاں۔"
              : "Dedicated engineers, clinical researchers, and AI architects building accessible medical intelligence."}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              style={{
                animationDelay: `${idx * 150}ms`,
                opacity: isVisible ? 1 : 0,
              }}
              className={`group flex flex-col bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-indigo-500/40 hover:shadow-indigo-500/10 transition-all duration-300 ${
                isVisible ? "animate-pop-up" : ""
              }`}
            >
              {/* Card Image Container */}
              <div className="relative w-full h-72 overflow-hidden bg-neutral-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  quality={85}
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[11px] font-medium text-indigo-300 px-2.5 py-1 rounded-md border border-white/10 z-10">
                  {lang === "ur" ? "ٹیم ممبر" : "Team Member"}
                </span>
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Heading for Name */}
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1">
                    {member.name}
                  </h3>

                  {/* Text for Designation */}
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
                    {member.role[lang]}
                  </p>

                  {/* Bio / Description */}
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {member.bio[lang]}
                  </p>
                </div>

                {/* Card Footer / Social Links */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-5 text-xs">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      className="text-gray-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      className="text-gray-400 hover:text-indigo-300 transition-colors font-medium flex items-center gap-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "../data/blogs";
import { useLanguage } from "../context/LanguageContext";

export default function BlogSection() {
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
    <section id="blogs" ref={sectionRef} className="w-full bg-gradient-to-b from-[#04040c] via-black to-black text-white pt-12 pb-28 px-6 md:px-12 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold bg-purple-950/60 border border-purple-500/20 px-3 py-1 rounded-full">
            {lang === "ur" ? "مضامین اور بصیرتیں" : "Articles & Insights"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4">
            {lang === "ur" ? "تازہ ترین طبی AI مضامین" : "Latest Medical AI Insights"}
          </h2>
          <p className="text-gray-400 text-base md:text-lg mt-3">
            {lang === "ur"
              ? "طبی ٹیکنالوجی، مصنوعی ذہانت اور ہیلتھ کیئر کے جدید رجحانات کے بارے میں جانئے۔"
              : "Explore breakthrough research, AI diagnostics, and modern healthcare insights."}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <div
              key={post.id}
              style={{
                animationDelay: `${idx * 150}ms`,
                opacity: isVisible ? 1 : 0,
              }}
              className={`group flex flex-col bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-purple-500/40 hover:shadow-purple-500/10 transition-all duration-300 ${isVisible ? "animate-pop-up" : ""
                }`}
            >
              {/* Card Image Container */}
              <div className="relative w-full h-48 overflow-hidden bg-neutral-900">
                <Image
                  src={post.image}
                  alt={post.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  quality={80}
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[11px] font-medium text-gray-200 px-2.5 py-1 rounded-md border border-white/10 z-10">
                  {post.category[lang]}
                </span>
              </div>

              {/* Card Body Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-xs text-purple-400 font-medium mb-2 flex items-center justify-between">
                    <span>{post.date}</span>
                    <span>{post.readTime[lang]}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 mb-3">
                    {post.title[lang]}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {post.excerpt[lang]}
                  </p>
                </div>

                {/* Read Article Link */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-purple-400 transition-colors"
                  >
                    <span>{lang === "ur" ? "مکمل مضمون پڑھیں" : "Read Article"}</span>
                    <span>{lang === "ur" ? "←" : "→"}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

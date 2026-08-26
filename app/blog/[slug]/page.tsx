"use client";

import React from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { BLOG_POSTS } from "../../data/blogs";
import { useLanguage } from "../../context/LanguageContext";
import LivingOrigamiBg from "../../components/ui/living-origami-bg";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { lang } = useLanguage();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link href="/" className="px-4 py-2 bg-white text-black rounded-md text-sm font-semibold">
          Return Home
        </Link>
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background Lighting Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-purple-900/20 blur-[120px] pointer-events-none" />

      <main className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white bg-neutral-900 border border-white/10 px-3 py-1.5 rounded-full mb-8 transition-colors"
        >
          <span>{lang === "ur" ? "→ اہم صفحہ پر واپس جائیں" : "← Back to Home"}</span>
        </Link>

        {/* Category & Date Info */}
        <div className="flex items-center gap-3 text-xs text-purple-400 font-semibold uppercase tracking-wider mb-4">
          <span className="bg-purple-950 border border-purple-500/30 px-3 py-1 rounded-full">
            {post.category[lang]}
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{post.date}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{post.readTime[lang]}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          {post.title[lang]}
        </h1>

        {/* Excerpt Summary */}
        <p className="text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-8 border-l-4 border-purple-500 pl-4 py-1 italic bg-neutral-950/50 rounded-r-lg">
          {post.excerpt[lang]}
        </p>

        {/* Hero Image */}
        <div className="w-full h-[320px] md:h-[450px] rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative">
          <img
            src={post.image}
            alt={post.title[lang]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content Paragraphs */}
        <article className="prose prose-invert max-w-none text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
          {post.content[lang].map((paragraph, index) => (
            <p key={index} className="bg-neutral-950/40 p-6 rounded-xl border border-white/5 shadow-inner">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Related Posts Section */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <h3 className="text-2xl font-bold mb-8 text-white">
            {lang === "ur" ? "دیگر متعلقہ مضامین" : "Related Articles"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="group bg-neutral-950 border border-white/10 rounded-xl p-4 hover:border-purple-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] text-purple-400 font-medium">
                    {item.category[lang]}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors mt-1 line-clamp-2">
                    {item.title[lang]}
                  </h4>
                </div>
                <span className="text-xs text-gray-500 mt-4 group-hover:text-white transition-colors">
                  {lang === "ur" ? "پڑھیں ←" : "Read →"}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

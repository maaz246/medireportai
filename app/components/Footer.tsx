"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';

export default function Footer() {
    const { lang, t } = useLanguage();

    return (
        <footer className="w-full bg-black border-t border-white/10 text-gray-400 text-sm relative z-10 pt-16 pb-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Top Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
                    
                    {/* Brand Column */}
                    <div className="md:col-span-1 flex flex-col gap-4">
                        <Logo size="md" />
                        <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                            {lang === "ur"
                                ? "مصنوعی ذہانت کی بدولت طبی رپورٹس کا تجزیہ آسان اور فوری بنائیں۔ جدید ترین طبی بصیرت اور قابل اعتماد نتائج۔"
                                : "Empowering healthcare clarity through AI-driven report analysis, diagnostic insights, and modern medical tech."}
                        </p>
                    </div>

                    {/* Quick Navigation Links */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                            {lang === "ur" ? "پلیٹ فارم" : "Navigation"}
                        </h4>
                        <ul className="space-y-3 text-sm sm:text-base font-medium text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-cyan-400 transition-colors">
                                    {t("home")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#blogs" className="hover:text-cyan-400 transition-colors">
                                    {t("blogs")}
                                </Link>
                            </li>
                            <li>
                                <Link href="#who-we-are" className="hover:text-cyan-400 transition-colors">
                                    {t("whoWeAre")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal & Info Links */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                            {lang === "ur" ? "معلومات و سیکیورٹی" : "Legal & Support"}
                        </h4>
                        <ul className="space-y-2.5 text-xs">
                            <li>
                                <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                                    {t("privacy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-purple-400 transition-colors">
                                    {t("terms")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                                    {t("contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Profiles */}
                    <div>
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
                            {lang === "ur" ? "ہم سے جڑیں" : "Follow Us"}
                        </h4>
                        <div className="flex flex-col gap-2.5 text-xs">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span>LinkedIn</span>
                                <span className="text-[10px]">↗</span>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-pink-400 transition-colors inline-flex items-center gap-2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span>Instagram</span>
                                <span className="text-[10px]">↗</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} MediReport AI. {t("footerCopy")}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-gray-400">
                        <span>{lang === "ur" ? "صحت عامہ کی بہتری کے لیے تیار کردہ" : "Built for accessible healthcare intelligence"}</span>
                    </p>
                </div>

            </div>
        </footer>
    );
}
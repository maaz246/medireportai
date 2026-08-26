"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header Navigation
    home: "Home",
    blogs: "Blogs",
    whoWeAre: "Who We Are",
    navAnalyze: "Analyze Report",
    searchPlaceholder: "Search documentation...",

    // Hero / Home Page
    heroTitle: "AI Report Analyzer",
    heroSubtitle: "Lets make medical reports analysis easier and faster",
    getStarted: "Get started now",

    // Analyzer Page
    letsAnalyzeReport: "Let's Analyze a Report",
    analyzerSub: "Upload your medical report, blood lab test, or diagnostic scan to generate an instant AI clinical breakdown, risk scoring, and downloadable PDF report.",
    uploadTitle: "Drop your medical report here",
    uploadSubtitle: "Supports PDF, PNG, JPG, JPEG, WEBP or TXT (Max 25MB)",
    browseFiles: "Browse Files",
    orTrySample: "Or test with a sample report:",
    sampleCBC: "Complete Blood Count (CBC)",
    sampleLipid: "Lipid Profile Panel",
    sampleXray: "Pulmonary Diagnostic Summary",
    analyzeButton: "Analyze Medical Report",
    analyzingState: "AI Diagnostic Engine Active",
    downloadPdf: "Download PDF Report",
    copyReport: "Copy Summary",
    reAnalyze: "Analyze Another Report",

    // Footer
    footerBrand: "MediReport AI",
    footerCopy: "For informational purposes only.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
  },
  ur: {
    // Header Navigation
    home: "ہوم",
    blogs: "بلاگز",
    whoWeAre: "ہم کون ہیں",
    navAnalyze: "رپورٹ کا تجزیہ",
    searchPlaceholder: "ڈاکیومنٹیشن تلاش کریں...",

    // Hero / Home Page
    heroTitle: "ذی ہوش میڈیکل رپورٹ اینالائزر",
    heroSubtitle: "طبی رپورٹس کا تجزیہ اب اور بھی آسان اور تیز تر بنائیں",
    getStarted: "ابھی شروع کریں",

    // Analyzer Page
    letsAnalyzeReport: "آئیے رپورٹ کا تجزیہ کریں",
    analyzerSub: "فوری AI کلینیکل تجزیہ، خطرے کا اندازہ، اور پی ڈی ایف رپورٹ حاصل کرنے کے لیے اپنی خون کے ٹیسٹ کی رپورٹ یا طبی لیب رپورٹ اپ لوڈ کریں۔",
    uploadTitle: "اپنی میڈیکل رپورٹ یہاں ڈراپ کریں",
    uploadSubtitle: "پی ڈی ایف، تصاویر اور ٹیکسٹ فائلوں کو سپورٹ کرتا ہے (زیادہ سے زیادہ 25 ایم بی)",
    browseFiles: "فائلیں منتخب کریں",
    orTrySample: "یا نمونہ رپورٹ کے ساتھ تجربہ کریں:",
    sampleCBC: "کمپلیٹ بلڈ کاؤنٹ (سی بی سی)",
    sampleLipid: "لپڈ پروفائل پینل",
    sampleXray: "پلمونری ایکس رے خلاصہ",
    analyzeButton: "میڈیکل رپورٹ کا تجزیہ کریں",
    analyzingState: "اے آئی ڈائیگنوسٹک انجن فعال ہے",
    downloadPdf: "پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں",
    copyReport: "خلاصہ کاپی کریں",
    reAnalyze: "ایک اور رپورٹ کا تجزیہ کریں",

    // Footer
    footerBrand: "میڈی رپورٹ AI",
    footerCopy: "صرف معلوماتی مقاصد کے لیے۔",
    privacy: "رازداری کی پالیسی",
    terms: "خدمات کی شرائط",
    contact: "رابطہ کریں",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"][key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import LivingOrigamiBg from "../components/ui/living-origami-bg";
import {
  FileText,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Download,
  Copy,
  RefreshCw,
  Sparkles,
  Activity,
  ShieldCheck,
  Stethoscope,
  ArrowLeft,
  X,
  Bug,
  BookOpen,
  Globe,
  User,
  Building2
} from "lucide-react";

interface Biomarker {
  name: string;
  value: string;
  unit: string;
  refRange: string;
  status: string;
  flag: "success" | "warning" | "danger";
  explanation?: string;
  pct: number;
}

interface VirusDetection {
  status: string;
  hasDetection: boolean;
  detectedPathogens: string[];
  details: string;
}

interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  specimenId: string;
  referringDoctor: string;
  facility: string;
}

interface ReportData {
  title: string;
  category: string;
  date: string;
  patient?: string;
  patientInfo?: PatientInfo;
  overallStatus: string;
  overallStatusSeverity: "success" | "warning" | "danger";
  virusAndInfectionDetection?: VirusDetection;
  sicknessExplanations?: string[];
  biomarkers: Biomarker[];
  insights: string[];
  doctorRecommendations: string[];
}

export default function AnalyzePage() {
  const { lang, t } = useLanguage();

  // State variables
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string; rawText?: string; fileBase64?: string; mimeType?: string } | null>(null);
  const [selectedReportLang, setSelectedReportLang] = useState<"en" | "ur">("en");
  const [activeReport, setActiveReport] = useState<ReportData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const reportContainerRef = useRef<HTMLDivElement>(null);

  // Handle Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const detectedMime = file.type || "application/octet-stream";
    const isText = file.type.includes("text") || file.name.endsWith(".txt");

    const reader = new FileReader();

    if (isText) {
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setSelectedFile({
          name: file.name,
          size: `${sizeInMb} MB`,
          type: detectedMime,
          rawText: content || "",
        });
      };
      reader.readAsText(file);
    } else {
      // For PDF, images etc — read as base64 so Gemini can process the document directly
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        // Strip "data:<mime>;base64," prefix to get pure base64
        const base64 = dataUrl.split(",")[1] || "";
        setSelectedFile({
          name: file.name,
          size: `${sizeInMb} MB`,
          type: detectedMime,
          fileBase64: base64,
          mimeType: detectedMime,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger AI analysis pipeline
  const runAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setCurrentStep(1);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 85) return 85;
        const next = prev + 5;
        if (next > 25 && next <= 50) setCurrentStep(2);
        if (next > 50 && next <= 75) setCurrentStep(3);
        if (next > 75) setCurrentStep(4);
        return next;
      });
    }, 150);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: selectedFile.name,
          fileType: selectedFile.type,
          fileText: selectedFile.rawText || "",
          fileBase64: selectedFile.fileBase64 || null,
          mimeType: selectedFile.mimeType || null,
          reportLang: selectedReportLang
        })
      });

      const data = await response.json();

      if (data.success && data.report) {
        setActiveReport(data.report);
      }
    } catch (err) {
      console.error("AI API call failed:", err);
    } finally {
      clearInterval(interval);
      setAnalysisProgress(100);
      setCurrentStep(4);
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 400);
    }
  };

  // Reset and clear
  const handleReset = () => {
    setSelectedFile(null);
    setActiveReport(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentStep(0);
  };

  // Copy summary to clipboard
  const handleCopySummary = () => {
    if (!activeReport) return;
    const p = activeReport.patientInfo;
    const text = `
MediReport Diagnostic Summary (${selectedReportLang === "ur" ? "Urdu" : "English"})
Report: ${activeReport.title}
Date: ${activeReport.date}

Patient Details:
- Name: ${p?.name || activeReport.patient || "N/A"}
- Age/Gender: ${p?.age || ""} ${p?.gender || ""}
- Specimen ID: ${p?.specimenId || "N/A"}
- Physician: ${p?.referringDoctor || "N/A"}
- Facility: ${p?.facility || "N/A"}

Overall Assessment: ${activeReport.overallStatus}

Virus & Infection Screening:
${activeReport.virusAndInfectionDetection?.status || "N/A"}
${activeReport.virusAndInfectionDetection?.details || ""}

Pathology & Sickness Explanations:
${activeReport.sicknessExplanations?.map((s) => `- ${s}`).join("\n")}

Physician Action Items:
${activeReport.doctorRecommendations.map((r) => `- ${r}`).join("\n")}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // High-Resolution Native Vector PDF Generator (Full Unicode & Urdu RTL Support)
  const handleDownloadPdf = () => {
    if (!activeReport) return;
    setIsGeneratingPdf(true);

    try {
      const originalTitle = document.title;
      const rawName = activeReport.patientInfo?.name || activeReport.title || "Diagnostic_Report";
      const safeName = rawName.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, "_");
      
      // Set document title so the browser automatically names the saved PDF appropriately
      document.title = `MediReport_${safeName}`;

      // Trigger native browser print dialog (Save as PDF)
      window.print();

      // Restore original title
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background Origami effect */}
      <LivingOrigamiBg />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "ur" ? "ہوم پیج پر واپس جائیں" : "Back to Home"}
        </Link>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            {lang === "ur" ? "ایڈوانسڈ طبی تجزیہ کار" : "Advanced Diagnostic Analysis Engine"}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {t("letsAnalyzeReport")}
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("analyzerSub")}
          </p>
        </div>

        {/* UPLOAD AREA / DROPZONE SECTION */}
        <div className="bg-neutral-950/80 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden">

          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Step 1: Language Selection for Report Output */}
          <div className="mb-8 p-4 rounded-2xl bg-neutral-900/90 border border-white/15">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Select Preferred Report Output Language / رپورٹ کی زبان منتخب کریں:</span>
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setSelectedReportLang("en")}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${selectedReportLang === "en"
                    ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "bg-neutral-800 text-gray-400 border-neutral-700 hover:text-white"
                  }`}
              >
                <span>🇬🇧 English Report</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReportLang("ur")}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${selectedReportLang === "ur"
                    ? "bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20"
                    : "bg-neutral-800 text-gray-400 border-neutral-700 hover:text-white"
                  }`}
              >
                <span>🇵🇰 مکمل اردو رپورٹ</span>
              </button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.png,.jpg,.jpeg,.webp,.txt"
            className="hidden"
          />

          {!selectedFile ? (
            /* Drag & Drop Container */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${isDragging
                  ? "border-cyan-400 bg-cyan-950/30 scale-[1.01]"
                  : "border-white/20 hover:border-cyan-500/60 bg-neutral-900/40 hover:bg-neutral-900/70"
                }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400 shadow-lg group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {t("uploadTitle")}
              </h3>

              <p className="text-sm text-gray-400 max-w-md mb-6">
                {t("uploadSubtitle")}
              </p>

              <button
                type="button"
                className="px-6 py-2.5 bg-transparent border border-white/30 hover:border-cyan-400/60 hover:text-cyan-300 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                {t("browseFiles")}
              </button>
            </div>
          ) : (
            /* File Loaded Card */
            <div className="bg-neutral-900/90 border border-cyan-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-white text-base truncate max-w-xs sm:max-w-md">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-2 mt-0.5">
                    <span>{selectedFile.size}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-mono">{selectedFile.type}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl border border-white/20 hover:border-red-500/50 hover:bg-red-950/30 text-gray-300 hover:text-red-400 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  {lang === "ur" ? "ہٹائیں" : "Remove"}
                </button>
              </div>
            </div>
          )}

          {/* Start Analysis Action Button */}
          {selectedFile && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={runAnalysis}
                disabled={isAnalyzing}
                className={`px-8 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer border ${isAnalyzing
                    ? "bg-neutral-900 text-gray-500 border-neutral-700 cursor-not-allowed"
                    : "bg-neutral-900 text-white border-white/20 hover:border-cyan-400/50 hover:text-cyan-300"
                  }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{selectedReportLang === "ur" ? "تجزیہ جاری ہے..." : "Analyzing..."}</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>
                      {selectedReportLang === "ur"
                        ? "رپورٹ کا تجزیہ کریں"
                        : "Analyze Report"}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* AI PROCESSING PROGRESS VISUALIZER */}
        {isAnalyzing && (
          <div className="bg-neutral-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl mb-10 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  {selectedReportLang === "ur"
                    ? "طبی اور وائرل تجزیاتی کارروائی جاری..."
                    : "Comprehensive Clinical & Viral Analysis Pipeline"}
                </h3>
              </div>
              <span className="text-sm font-mono font-bold text-cyan-400">
                {analysisProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-900 rounded-full h-3 mb-6 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300 shadow-md"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            {/* Steps Indicator */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${currentStep >= 1 ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300 font-semibold" : "border-white/10 text-gray-500"}`}>
                1. Text OCR & Parsing
              </div>
              <div className={`p-3 rounded-xl border ${currentStep >= 2 ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300 font-semibold" : "border-white/10 text-gray-500"}`}>
                2. Virus & Pathogen Screen
              </div>
              <div className={`p-3 rounded-xl border ${currentStep >= 3 ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300 font-semibold" : "border-white/10 text-gray-500"}`}>
                3. Patient & Pathology Extraction
              </div>
              <div className={`p-3 rounded-xl border ${currentStep >= 4 ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300 font-semibold" : "border-white/10 text-gray-500"}`}>
                4. PDF Summary Generation
              </div>
            </div>
          </div>
        )}

        {/* ANALYZED REPORT OUTPUT & DEDICATED PDF DOWNLOAD AREA */}
        {activeReport && (analysisProgress === 100 || !isAnalyzing) && (
          <div className="space-y-6">

            {/* DEDICATED AUTOMATIC PDF DOWNLOAD CARD AREA */}
            <div className="bg-gradient-to-r from-cyan-950/90 via-neutral-900 to-purple-950/90 border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-5 w-full sm:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0 shadow-xl">
                  <FileText className="w-9 h-9" />
                </div>
                <div className="overflow-hidden">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-black mb-1.5">
                    {selectedReportLang === "ur" ? "پی ڈی ایف رپورٹ دستیاب ہے" : "PDF Report Available"}
                  </div>
                  <h3 className="text-xl font-bold text-white truncate max-w-xs sm:max-w-md">
                    MediReport_{(activeReport.patientInfo?.name || "Diagnostic").replace(/[^a-zA-Z0-9]/g, "_")}.pdf
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    {selectedReportLang === "ur"
                      ? "صاف بلیک ٹیکسٹ • رسمی میڈیکل فارمیٹ • فوری ڈائریکٹ ڈاؤن لوڈ"
                      : "Clean Black Font Format • High Resolution • Ready for Instant Download"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm rounded-xl shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
                >
                  {isGeneratingPdf ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Download className="w-4 h-4 text-white" />
                  )}
                  <span>{selectedReportLang === "ur" ? "پی ڈی ایف رپورٹ ڈاؤن لوڈ کریں" : "Download PDF File Now"}</span>
                </button>
              </div>
            </div>

            {/* Top Toolbar / Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-neutral-950/90 border border-white/15 rounded-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-white">
                  {selectedReportLang === "ur"
                    ? "تفصیلی طبی اور وائرل تجزیہ مکمل ہو گیا"
                    : "Comprehensive Diagnostic Report Ready"}
                </span>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {selectedReportLang === "ur" ? "اردو ورژن" : "English Output"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopySummary}
                  className="px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 bg-neutral-900 text-gray-200 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  {copied ? (selectedReportLang === "ur" ? "کاپی ہو گیا!" : "Copied!") : t("copyReport")}
                </button>
              </div>
            </div>

            {/* INTERACTIVE DISPLAY REPORT CONTAINER */}
            <div
              ref={reportContainerRef}
              className={`bg-neutral-950 border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl space-y-8 relative overflow-hidden ${selectedReportLang === "ur" ? "text-right" : "text-left"
                }`}
              dir={selectedReportLang === "ur" ? "rtl" : "ltr"}
              id="printable-report"
            >
              {/* Report Header Card */}
              <div className="flex flex-col sm:flex-col items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/15">
                <div>
                  <div className="flex flex-col-reverse items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {activeReport.category}
                    </span>
                    <span className="text-xs text-gray-400">{activeReport.date}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {activeReport.title}
                  </h2>
                </div>

                {/* Overall Diagnostic Status Badge */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3 shrink-0 ${activeReport.overallStatusSeverity === "danger"
                    ? "bg-red-950/40 border-red-500/50 text-red-300"
                    : activeReport.overallStatusSeverity === "warning"
                      ? "bg-amber-950/40 border-amber-500/50 text-amber-300"
                      : "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                  }`}>
                  {activeReport.overallStatusSeverity === "danger" ? (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  ) : activeReport.overallStatusSeverity === "warning" ? (
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  )}

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold opacity-80 block">
                      {selectedReportLang === "ur" ? "مجموعی طبی تشخیص" : "Overall Diagnostic Status"}
                    </span>
                    <span className="text-base font-bold">
                      {activeReport.overallStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* EXTRACTED PATIENT INFORMATION CARD */}
              <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-inner">
                <h3 className="text-base font-bold text-cyan-300 mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span>
                    {selectedReportLang === "ur"
                      ? "مریض کی معلومات (رپورٹ سے حاصل کردہ)"
                      : "Patient Information (Extracted from Report)"}
                  </span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 block font-medium">
                      {selectedReportLang === "ur" ? "مریض کا نام:" : "Patient Name:"}
                    </span>
                    <span className="font-bold text-white text-base">
                      {activeReport.patientInfo?.name || activeReport.patient || "N/A"}
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 block font-medium">
                      {selectedReportLang === "ur" ? "عمر اور جنس:" : "Age & Gender:"}
                    </span>
                    <span className="font-semibold text-white">
                      {activeReport.patientInfo?.age || "N/A"} • {activeReport.patientInfo?.gender || "N/A"}
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 block font-medium">
                      {selectedReportLang === "ur" ? "لیب نمونہ آئی ڈی:" : "Specimen / Sample ID:"}
                    </span>
                    <span className="font-mono text-cyan-300 font-semibold">
                      {activeReport.patientInfo?.specimenId || "N/A"}
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-400 block font-medium">
                      {selectedReportLang === "ur" ? "تجویز کردہ معالج:" : "Referring Physician:"}
                    </span>
                    <span className="font-medium text-gray-200">
                      {activeReport.patientInfo?.referringDoctor || "N/A"}
                    </span>
                  </div>

                  <div className="bg-neutral-950/60 p-3 sm:col-span-2 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">
                        {selectedReportLang === "ur" ? "لیبارٹری / کلینک:" : "Testing Facility / Laboratory:"}
                      </span>
                      <span className="font-medium text-cyan-200">
                        {activeReport.patientInfo?.facility || "N/A"}
                      </span>
                    </div>
                    <Building2 className="w-5 h-5 text-gray-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* VIRUS & PATHOGEN INFECTION DETECTION SECTION */}
              {activeReport.virusAndInfectionDetection && (
                <div className="bg-neutral-900/90 border border-purple-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                    <Bug className="w-5 h-5 text-purple-400" />
                    <span>
                      {selectedReportLang === "ur"
                        ? "وائرس اور انفیکشن کی سکریننگ (Pathogen & Virus Detection)"
                        : "Virus & Infection Screening Assessment"}
                    </span>
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-300">
                        {selectedReportLang === "ur" ? "حالت:" : "Status:"}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeReport.virusAndInfectionDetection.hasDetection
                          ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                        }`}>
                        {activeReport.virusAndInfectionDetection.status}
                      </span>
                    </div>

                    {activeReport.virusAndInfectionDetection.detectedPathogens?.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="text-xs text-gray-400 font-semibold">
                          {selectedReportLang === "ur" ? "شناخت شدہ مارکرز:" : "Markers Evaluated:"}
                        </span>
                        {activeReport.virusAndInfectionDetection.detectedPathogens.map((p, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-800 text-purple-300 border border-purple-500/20">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                      {activeReport.virusAndInfectionDetection.details}
                    </p>
                  </div>
                </div>
              )}

              {/* DETAILED PATHOLOGY & SICKNESS EXPLANATIONS SECTION */}
              {activeReport.sicknessExplanations && activeReport.sicknessExplanations.length > 0 && (
                <div className="bg-neutral-900/90 border border-cyan-500/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span>
                      {selectedReportLang === "ur"
                        ? "بیماری کی تفصیلی وضاحت اور پیتھولوجیکل تجزیہ"
                        : "Pathology & Sickness Diagnostic Explanation"}
                    </span>
                  </h3>

                  <div className="space-y-4">
                    {activeReport.sicknessExplanations.map((explanation, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-neutral-950/80 border border-white/10 leading-relaxed text-sm text-gray-200">
                        <p>{explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BIOMARKERS TABLE WITH DETAILED EXPLANATIONS */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  {selectedReportLang === "ur" ? "لیبارٹری بائیو مارکرز کا موازنہ" : "Extracted Biomarkers & Clinical Measurements"}
                </h3>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-neutral-900/60">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900 border-b border-white/10 text-xs uppercase text-gray-400">
                      <tr>
                        <th className="px-5 py-3.5">{selectedReportLang === "ur" ? "پیرامیٹر" : "Parameter"}</th>
                        <th className="px-5 py-3.5">{selectedReportLang === "ur" ? "نتیجہ" : "Result"}</th>
                        <th className="px-5 py-3.5">{selectedReportLang === "ur" ? "نارمل حدود" : "Ref. Range"}</th>
                        <th className="px-5 py-3.5">{selectedReportLang === "ur" ? "حالت" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 font-medium">
                      {activeReport.biomarkers?.map((b, idx) => (
                        <React.Fragment key={idx}>
                          <tr className="hover:bg-neutral-800/40 transition-colors">
                            <td className="px-5 py-4 text-white font-semibold">{b.name}</td>
                            <td className="px-5 py-4 font-bold text-white">
                              {b.value} <span className="text-xs font-normal text-gray-400">{b.unit}</span>
                            </td>
                            <td className="px-5 py-4 text-gray-400 font-mono text-xs">{b.refRange}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.flag === "danger"
                                    ? "bg-red-950 text-red-400 border border-red-500/40"
                                    : b.flag === "warning"
                                      ? "bg-amber-950 text-amber-400 border border-amber-500/40"
                                      : "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                  }`}>
                                  {b.status}
                                </span>
                                <div className="w-20 bg-neutral-800 h-2 rounded-full overflow-hidden hidden sm:block">
                                  <div
                                    className={`h-full rounded-full ${b.flag === "danger"
                                        ? "bg-red-500"
                                        : b.flag === "warning"
                                          ? "bg-amber-500"
                                          : "bg-emerald-500"
                                      }`}
                                    style={{ width: `${b.pct || 50}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          {b.explanation && (
                            <tr className="bg-neutral-950/40">
                              <td colSpan={4} className="px-5 py-2 text-xs text-gray-400 italic">
                                <span className="font-semibold text-gray-300">Explanation:</span> {b.explanation}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI CLINICAL INTERPRETATION & INSIGHTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Insights Box */}
                <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-cyan-300 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-cyan-400" />
                    {selectedReportLang === "ur" ? "طبی مشاہدات اور تفصیلی خلاصہ" : "Clinical Observations & Key Findings"}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-300">
                    {activeReport.insights?.map((insight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-cyan-400 font-bold text-base leading-none">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Doctor Recommendations Box */}
                <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-purple-300 mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-purple-400" />
                    {selectedReportLang === "ur" ? "ڈاکٹر کے لیے اہم تجاویز اور احتیاطی تدابیر" : "Physician Action Items & Advice"}
                  </h4>
                  <ul className="space-y-2.5 text-sm text-gray-300">
                    {activeReport.doctorRecommendations?.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-purple-400 font-bold text-base leading-none">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* PDF Footer Notice */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                <span>Generated by MediReport Advanced Diagnostic Engine v3.5</span>
                <span>{t("footerCopy")}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="text-center pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-neutral-900 text-gray-300 hover:text-white text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                {t("reAnalyze")}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

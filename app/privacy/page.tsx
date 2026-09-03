import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | MediReport AI",
  description: "Privacy policy and medical data security standards for MediReport AI."
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
            Privacy & Data Security Policy
          </h1>
          <p className="text-gray-400 text-sm mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Health Data Confidentiality</h2>
            <p>
              MediReport AI does not permanently store, sell, or monetize your uploaded medical reports, laboratory test results, or personal identifiers. Documents uploaded to the platform are processed transiently in memory solely for generating the real-time clinical analysis.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Processing & Security</h2>
            <p>
              Data transmission between your browser and our processing nodes is encrypted using industry-standard TLS / HTTPS encryption. Analysis engines run securely in isolated serverless environments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Medical Disclaimer</h2>
            <p>
              MediReport AI is an artificial intelligence-assisted educational and diagnostic clarity tool. It does not replace certified professional medical diagnosis, laboratory verification, or emergency medical care.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Contact Inquiries</h2>
            <p>
              For privacy-related questions or data removal requests, please visit our <Link href="/contact" className="text-cyan-400 underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

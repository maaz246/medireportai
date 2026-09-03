import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service | MediReport AI",
  description: "Terms of service and platform conditions for MediReport AI."
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20 w-full">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-sm mt-2">Last updated: September 2026</p>
        </div>

        <div className="space-y-6 text-gray-300 text-sm sm:text-base leading-relaxed bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using MediReport AI, you acknowledge and agree that the diagnostic summaries provided are for informational, clarity, and educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Clinical Responsibility</h2>
            <p>
              Users must always consult a licensed doctor or medical specialist before making clinical, medication, or lifestyle decisions based on AI-generated interpretations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Service Availability</h2>
            <p>
              We strive for high uptime and rapid report generation; however, services are provided on an &ldquo;as is&rdquo; basis subject to AI model API quotas and maintenance cycles.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

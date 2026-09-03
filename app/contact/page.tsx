import React from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact & Support | MediReport AI",
  description: "Get in touch with the MediReport AI engineering and healthcare team."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 w-full">
        <div className="mb-8">
          <Link href="/" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mb-6">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Contact & Support
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Have questions, feedback, or need enterprise medical API access? Reach out to us.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-xs text-cyan-400 uppercase tracking-wider font-semibold block mb-1">Email Support</span>
              <p className="text-white text-sm font-medium">support@medireportai.com</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-xs text-purple-400 uppercase tracking-wider font-semibold block mb-1">Developer Inquiries</span>
              <p className="text-white text-sm font-medium">contact@medireportai.com</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Dr. John Doe / Patient"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="How can we assist you with MediReport AI?"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 text-sm resize-none"
              />
            </div>
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

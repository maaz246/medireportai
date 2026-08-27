import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import { LanguageProvider } from './context/LanguageContext';

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediReport AI - Medical Report Analyzer",
  description: "Lets make medical reports analysis easier and faster",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${urbanist.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-black text-white antialiased" suppressHydrationWarning>
        <LanguageProvider>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/frontend/components/layout/Navbar";
import Footer from "@/frontend/components/layout/Footer";
import ProgressBar from "@/frontend/components/ui/ProgressBar";
import PageTransition from "@/frontend/components/ui/PageTransition";
import LoginPromptModal from "@/frontend/components/LoginPromptModal";
import NewsletterPromptModal from "@/frontend/components/NewsletterPromptModal";
import "@/frontend/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1565C0",
};

export const metadata: Metadata = {
  title: {
    default: "MNRS – Maharishi Vidya Mandir National Residential School",
    template: "%s | MNRS",
  },
  description:
    "Maharishi Vidya Mandir National Residential School at AMET Knowledge Park, ECR – Thenpattinam. CBSE school offering Day & Residential schooling for LKG to Grade 7. Admissions open 2027–2028.",
  keywords: [
    "MNRS", "Maharishi Vidya Mandir", "CBSE school", "residential school",
    "ECR Thenpattinam", "AMET Knowledge Park", "admissions 2027",
    "Consciousness-Based Education", "Transcendental Meditation school",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "MNRS – Maharishi Vidya Mandir National Residential School",
    title: "MNRS – Maharishi Vidya Mandir National Residential School",
    description: "Admissions open 2027–2028 for LKG to Grade 7. CBSE curriculum, AI & Robotics Lab, world-class sports, and Consciousness-Based Education.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {/* Top loading progress bar */}
        <ProgressBar />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: { fontFamily: "Inter, sans-serif", fontSize: "14px" },
            success: { iconTheme: { primary: "#1565C0", secondary: "#fff" } },
          }}
        />

        <LoginPromptModal />
        <NewsletterPromptModal />

        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

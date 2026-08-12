import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastProvider from "@/components/ui/Toast";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Learning Pulse — Discover Your Learning Path",
    template: "%s | The Learning Pulse",
  },
  description:
    "Empowering lifelong learning through SDG 4.3.1. Discover courses, training, and education opportunities tailored to your goals.",
  openGraph: {
    title: "The Learning Pulse",
    description:
      "Discover courses and training opportunities aligned with UN SDG 4.3.1",
    siteName: "The Learning Pulse",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}

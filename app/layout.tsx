import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import ChatBot from "@/app/components/ChatBot";
import SplashCursor from "@/app/components/SplashCursor";

import { Orbitron } from "next/font/google";

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dark Nebula",
  description: "Dark Nebula Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${orbitron.variable}
          antialiased bg-black
        `}
      >
        <SplashCursor />
        <Navbar />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}

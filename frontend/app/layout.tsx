import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/Sidebar";
import {Toaster} from 'sonner'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Delivery Dashboard",
  description: "A Mock delivery dashboard for testing purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-muted text-text`}
      >
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}
            <Toaster richColors position="top-right" />
          </main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sketch.al",
  description: "Digital Sketchbook: Archie Lennon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       {/* eslint-disable @next/next/no-sync-scripts  */}
      <head><Script src="https://cdn.tailwindcss.com"></Script></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

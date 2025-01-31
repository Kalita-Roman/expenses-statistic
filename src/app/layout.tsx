import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ShellBar } from "@/app/components/ShellBar";
import ClComp from "@/app/components/ClComp";
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
  title: "Expenses",
  description: "Expenses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("\n\n\n>>> RootLayout\n\n\n");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShellBar />
        <ClComp />
        {children}
      </body>
    </html>
  );
}

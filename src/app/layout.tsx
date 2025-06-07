import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { ShellBar, SessionWrapper } from "@/components/server";
import { LoadServiceWorker, SideMenu } from "@/components/client";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-dvh`}
      >
        <SessionWrapper>
          <ShellBar />
          <SideMenu>
            <Link href="/">Home</Link>
            <Link href="/expenses">Expenses</Link>
          </SideMenu>
          <div className="flex-grow h-full">{children}</div>
        </SessionWrapper>
      </body>
      <LoadServiceWorker />
    </html>
  );
}

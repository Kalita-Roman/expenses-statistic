import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionWrapper } from "@/components/server";
import { LoadServiceWorker, MainLayout } from "@/components/client";
import { SideMenu } from "@/components/server";
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
          <MainLayout sideMenu={<SideMenu />}>{children}</MainLayout>
        </SessionWrapper>
      </body>
      <LoadServiceWorker />
    </html>
  );
}

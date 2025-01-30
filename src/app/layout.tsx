import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ShellBar } from "@/app/components/ShellBar";
import "./globals.css";
import { auth, signIn, signOut } from "../../auth.config";

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
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShellBar session={session} signIn={signIn} signOut={signOut} />
        {children}
      </body>
    </html>
  );
}

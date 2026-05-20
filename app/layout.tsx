import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 1. Import Inter from Next.js Google Fonts
import AuthProvider from "../context/authProvider"; // Clean relative path mapping
import "./globals.css";

// 2. Configure the font (choose subsets and optionally weights)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Sets up a CSS variable we can use in Tailwind
});

export const metadata: Metadata = {
  title: "ticktock",
  description: "Timesheet web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the font class to the body tag */}
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

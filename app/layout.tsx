import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "EvoDoc | Healthcare Operations Platform",
  description:
    "EvoDoc is a premium healthcare SaaS frontend for reception and doctor workflows."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        <Providers attribute="class" defaultTheme="light" enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}


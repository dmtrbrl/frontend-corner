import type { Metadata } from "next";
import { Tinos } from "next/font/google";
import "./globals.css";

const tinosFont = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  style: "normal",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Frontend Corner",
  description:
    "Frontend Corner is an experimental, AI-curated weekly digest for frontend developers, collecting the latest news and articles on UI, web development, and related topics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tinosFont.variable}`}>{children}</body>
    </html>
  );
}

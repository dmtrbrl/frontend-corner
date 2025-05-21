import type { Metadata } from "next";
import { Crimson_Text } from "next/font/google";

import "./globals.css";

const crimsonTextFont = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${crimsonTextFont.variable}`}>
        <main className="layout">{children}</main>
      </body>
    </html>
  );
}

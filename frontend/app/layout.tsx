import { Crimson_Text } from "next/font/google";
import { baseMetadata } from "frontend/utils/baseMetadata";

import "./globals.css";

const crimsonTextFont = Crimson_Text({
  variable: "--font-crimson-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${crimsonTextFont.variable}`}>{children}</body>
    </html>
  );
}

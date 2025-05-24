import type { Metadata } from "next";

export const baseMetadata: Partial<Metadata> = {
  title: "Frontend Corner",
  description:
    "Frontend Corner is an experimental, AI-curated weekly digest for frontend developers, collecting the latest news and articles on UI, web development, and related topics.",
  openGraph: {
    title: "Frontend Corner",
    description:
      "An experimental, AI-curated weekly digest for frontend developers, collecting the latest news and articles on UI, web development, and related topics.",
    images: [
      {
        url: "https://www.frontendcorner.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Frontend Corner Weekly Digest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Corner",
    description:
      "An experimental, AI-curated weekly digest for frontend developers, collecting the latest news and articles on UI, web development, and related topics.",
    images: ["https://www.frontendcorner.com/og-image.png"],
  },
};

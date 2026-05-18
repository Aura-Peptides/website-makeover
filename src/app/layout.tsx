import type { Metadata, Viewport } from "next";

import { ResearchDisclaimer } from "@/components/research-disclaimer";
import copy from "@/i18n/locales/en.json";
import { isComingSoonEnabled } from "@/lib/coming-soon";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aurapeptides.com.au"),
  title: copy.meta.title,
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: "https://aurapeptides.com.au",
    siteName: "Aura Peptides",
    images: [
      {
        url: "/images/aura-logo.png",
        width: 1024,
        height: 1024,
        alt: "Aura Peptides logo",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080706",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const comingSoonEnabled = isComingSoonEnabled();

  return (
    <html lang="en-AU">
      <body>
        {children}
        {comingSoonEnabled ? null : <ResearchDisclaimer />}
      </body>
    </html>
  );
}

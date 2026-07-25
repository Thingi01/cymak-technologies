import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "CYMAK Technologies",
  description:
    "Secure, scalable, and enterprise-grade digital solutions — Web Development, SEO Optimization, Graphic Design, and IT Infrastructure.",
  metadataBase: new URL("https://cymak-technologies.vercel.app"),
  openGraph: {
    title: "CYMAK Technologies",
    description:
      "Secure, scalable, and future-ready digital solutions for businesses across Kenya.",
    url: "https://cymak-technologies.vercel.app",
    siteName: "CYMAK Technologies",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CYMAK Technologies",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CYMAK Technologies",
    description: "Secure, scalable, and future-ready digital solutions.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/*
          eslint-disable-next-line @next/next/no-page-custom-font --
          This rule targets the legacy Pages Router's pages/_document.js;
          in the App Router, the root layout's <head> is the correct and
          recommended place for global font links, so this warning is a
          known false positive here.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <WhatsAppButton />
        <ScrollReveal />
        <GoogleAnalytics gaId="G-W4C35EZ61P" />
      </body>
    </html>
  );
}
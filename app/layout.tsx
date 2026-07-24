import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

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
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W4C35EZ61P"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W4C35EZ61P');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
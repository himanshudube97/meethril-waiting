import type { Metadata } from "next";
import { Playfair_Display, Crimson_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const SITE_URL = process.env.SITE_URL?.replace(/\/+$/, "") || "https://meethril.com";
const TITLE = "Meethril — a quieter place to think · journaling app coming May 2026";
const DESCRIPTION =
  "Meethril is a quiet, end-to-end encrypted journaling web app. Sealed letters, scrapbooks, no streaks, no AI. Launching May 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Meethril",
  keywords: [
    "Meethril",
    "meethril",
    "journaling app",
    "encrypted journal",
    "private journal",
    "digital journal",
    "sealed letters",
    "letter to future self",
    "scrapbook app",
    "slow living",
    "mindful journaling",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  authors: [{ name: "Meethril" }],
  creator: "Meethril",
  publisher: "Meethril",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Meethril",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  verification: {
    // Set GOOGLE_SITE_VERIFICATION in your env once you've claimed the property in Search Console.
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Meethril",
      alternateName: ["meethril", "Meethril App"],
      url: SITE_URL,
      logo: `${SITE_URL}/opengraph-image`,
      description: DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Meethril",
      alternateName: "meethril",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Meethril",
      operatingSystem: "Web",
      applicationCategory: "LifestyleApplication",
      description: DESCRIPTION,
      url: SITE_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        availabilityStarts: "2026-05-01",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

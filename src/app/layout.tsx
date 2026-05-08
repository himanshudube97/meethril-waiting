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

export const metadata: Metadata = {
  title: "Meethril — coming soon",
  description: "A quieter place to think. Launching May 2026.",
  openGraph: {
    title: "Meethril — coming soon",
    description: "A quieter place to think. Launching May 2026.",
    url: "https://meethril.com",
    siteName: "Meethril",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meethril — coming soon",
    description: "A quieter place to think. Launching May 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

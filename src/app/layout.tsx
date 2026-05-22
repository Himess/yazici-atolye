import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Favian Jewellery | El Yapımı Takılar & Mücevherat",
    template: "%s | Favian Jewellery",
  },
  description:
    "Favian Jewellery - Özel tasarım el yapımı takılar, nişan yüzükleri, alyanslar ve mücevherat. Kalite ve zarafetin buluştuğu adres.",
  keywords: [
    "favian",
    "favian jewellery",
    "kuyumcu",
    "mücevher",
    "altın",
    "yüzük",
    "kolye",
    "küpe",
    "el yapımı takı",
    "pırlanta",
    "nişan yüzüğü",
    "alyans",
  ],
  authors: [{ name: "Favian Jewellery" }],
  creator: "Favian Jewellery",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Favian Jewellery",
    title: "Favian Jewellery | El Yapımı Takılar & Mücevherat",
    description:
      "Özel tasarım el yapımı takılar, nişan yüzükleri, alyanslar ve mücevherat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favian Jewellery | El Yapımı Takılar",
    description: "Özel tasarım el yapımı takılar ve mücevherat.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${cormorant.variable} ${inter.variable} font-sans font-medium antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

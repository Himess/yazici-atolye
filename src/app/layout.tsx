import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Favian Jewellery | El Yapimi Takilar & Mucevherat",
    template: "%s | Favian Jewellery",
  },
  description:
    "Favian Jewellery - Ozel tasarim el yapimi takilar, nisan yuzukleri, alyanslar ve mucevherat. Kalite ve zarafetin bulustugu adres.",
  keywords: [
    "favian",
    "favian jewellery",
    "kuyumcu",
    "mucevher",
    "altin",
    "yuzuk",
    "kolye",
    "kupe",
    "el yapimi taki",
    "pirlanta",
    "nisan yuzugu",
    "alyans",
  ],
  authors: [{ name: "Favian Jewellery" }],
  creator: "Favian Jewellery",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Favian Jewellery",
    title: "Favian Jewellery | El Yapimi Takilar & Mucevherat",
    description:
      "Ozel tasarim el yapimi takilar, nisan yuzukleri, alyanslar ve mucevherat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favian Jewellery | El Yapimi Takilar",
    description: "Ozel tasarim el yapimi takilar ve mucevherat.",
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
        className={`${cormorant.variable} ${montserrat.variable} font-sans font-medium antialiased`}
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

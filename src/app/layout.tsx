import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yazici Atolye | El Yapimi Takilar & Mucevherat",
  description: "Yazici Atolye - Ozel tasarim el yapimi takilar, nisan yuzukleri, alyanslar ve mucevherat. Kalite ve zarafetin bulustugu adres.",
  keywords: ["kuyumcu", "mucevher", "altin", "yuzuk", "kolye", "kupe", "el yapimi taki"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

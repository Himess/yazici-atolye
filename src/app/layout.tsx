import type { Metadata } from "next";
import { Gilda_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const gilda = Gilda_Display({
  variable: "--font-gilda",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://favianjewellery.com"),
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://favianjewellery.com",
    siteName: "Favian Jewellery",
    title: "Favian Jewellery | El Yapımı Takılar & Mücevherat",
    description:
      "Özel tasarım el yapımı takılar, nişan yüzükleri, alyanslar ve mücevherat.",
    images: [
      {
        url: "/images/favian-link-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Favian Jewellery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favian Jewellery | El Yapımı Takılar",
    description: "Özel tasarım el yapımı takılar ve mücevherat.",
    images: ["/images/favian-link-preview.jpg"],
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
        className={`${hanken.variable} ${gilda.variable} font-sans antialiased`}
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

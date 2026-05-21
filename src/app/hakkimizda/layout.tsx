import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Favian Jewellery",
  description: "40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz. Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz.",
  openGraph: {
    title: "Hakkımızda | Favian Jewellery",
    description: "40 yılı aşkın tecrübe, el işçiliği ve atölyeden direkt size.",
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

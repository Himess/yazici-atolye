import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkimizda | Yazici Atolye",
  description: "40 yili askin tecrubemiz ile buyuk kuyumculara toptan satis yapiyoruz. Simdi ayni kaliteyi, aracisiz fiyatlarla sizlere sunuyoruz.",
  openGraph: {
    title: "Hakkimizda | Yazici Atolye",
    description: "40 yili askin tecrube, el isciligi ve atolyeden direkt size.",
  },
};

export default function HakkimizdaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

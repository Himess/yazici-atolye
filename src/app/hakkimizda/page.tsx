import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Award, Shield, Gem, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkimizda | Yazici Atolye",
  description: "Yazici Atolye hikayesi. Nesiller boyu aktarilan kuyumculuk sanati ve el yapimi takılar.",
  openGraph: {
    title: "Hakkimizda | Yazici Atolye",
    description: "Yazici Atolye hikayesi. Nesiller boyu aktarilan kuyumculuk sanati.",
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-2">
            Hakkimizda
          </h1>
          <p className="text-muted-foreground">Yazici Atolye hikayesi</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Atolye Gorseli */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg relative h-[400px]">
            <Image
              src="/images/atolye.png"
              alt="Yazici Atolye - Kuyumcu Ustalarimiz"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
              Hikayemiz
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Yazici Atolye, nesiller boyu aktarilan kuyumculuk sanatini modern
              tasarimlarla bulusturan bir aile atolyesidir. Her parcamiz, usta
              ellerden cikar ve sizin icin ozel olarak hazirlanir.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Kuruldugumuz gunden bu yana, kalite ve musteri memnuniyetini on
              planda tutarak binlerce mutlu musteriye hizmet verdik. El yapimi
              takilarimiz, sizin ozel anlariniza anlam katar.
            </p>

            <Separator className="my-12 bg-border" />

            <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
              Degerlerimiz
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted rounded-lg flex gap-4">
                <Award className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Kalite
                  </h3>
                  <p className="text-muted-foreground">
                    En kaliteli malzemeler ve usta iscilik ile uretim yapiyoruz.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-muted rounded-lg flex gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Guven
                  </h3>
                  <p className="text-muted-foreground">
                    Tum urunlerimiz sertifikali ve garantilidir.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-muted rounded-lg flex gap-4">
                <Gem className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Ozgunluk
                  </h3>
                  <p className="text-muted-foreground">
                    Her parca benzersiz ve ozel tasarimdir.
                  </p>
                </div>
              </div>
              <div className="p-6 bg-muted rounded-lg flex gap-4">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    Musteri Odaklilik
                  </h3>
                  <p className="text-muted-foreground">
                    Musterilerimizin memnuniyeti bizim icin en onemlisidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-stone-50 border-b border-stone-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl font-bold text-stone-900 mb-2">Hakkimizda</h1>
          <p className="text-stone-600">Yazici Atolye hikayesi</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Atolye Gorseli */}
          <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/atolye.png"
              alt="Yazici Atolye - Kuyumcu Ustalarimiz"
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-3xl font-bold text-stone-900 mb-6">Hikayemiz</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Yazici Atolye, nesiller boyu aktarilan kuyumculuk sanatini modern tasarimlarla
              bulusturan bir aile atolyesidir. Her parcamiz, usta ellerden cikar ve sizin icin
              ozel olarak hazirlanir.
            </p>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Kuruldugumuz gunden bu yana, kalite ve musteri memnuniyetini on planda tutarak
              binlerce mutlu musteriye hizmet verdik. El yapimi takilarimiz, sizin ozel
              anlariniza anlam katar.
            </p>

            <Separator className="my-12 bg-stone-200" />

            <h2 className="font-playfair text-3xl font-bold text-stone-900 mb-6">Degerlerimiz</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">Kalite</h3>
                <p className="text-stone-600">En kaliteli malzemeler ve usta iscilik ile uretim yapiyoruz.</p>
              </div>
              <div className="p-6 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">Guven</h3>
                <p className="text-stone-600">Tum urunlerimiz sertifikali ve garantilidir.</p>
              </div>
              <div className="p-6 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">Ozgunluk</h3>
                <p className="text-stone-600">Her parca benzersiz ve ozel tasarimdir.</p>
              </div>
              <div className="p-6 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">Musteri Odaklilik</h3>
                <p className="text-stone-600">Musterilerimizin memnuniyeti bizim icin en onemlisidir.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

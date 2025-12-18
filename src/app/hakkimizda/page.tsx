import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Award, Shield, Gem, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkimizda | Yazici Atolye",
  description: "40 yili askin tecrubemiz ile buyuk kuyumculara toptan satis yapiyoruz. Simdi ayni kaliteyi, aracisiz fiyatlarla sizlere sunuyoruz.",
  openGraph: {
    title: "Hakkimizda | Yazici Atolye",
    description: "40 yili askin tecrube, el isciligi ve atolyeden direkt size.",
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src="/images/atolye-usta-1.png"
          alt="Yazici Atolye - 40 Yillik Tecrube"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              Uretimden Direkt Size
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              40 yili askin tecrubemiz ile buyuk kuyumculara toptan satis yapiyoruz.
              Simdi ayni kaliteyi, aracisiz fiyatlarla sizlere sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Hikayemiz */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="section-line">
              <h2 className="section-title">Hikayemiz</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
              <div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Yazici Atolye, 40 yili askin suredir Turkiye&apos;nin onde gelen kuyumcu
                  markalalarina toptan uretim yapmaktadir. Nesiller boyu aktarilan
                  kuyumculuk sanatini, modern tasarimlarla bulusturuyoruz.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Yillardir buyuk magazalara tedarik ettigimiz ayni kalitedeki urunleri,
                  artik aracisiz olarak sizlere ulastiriyoruz. Boylece piyasa fiyatinin
                  cok altinda, ustun kaliteli takılara sahip olabilirsiniz.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Her parcamiz, usta ellerden cikar ve sizin icin ozel olarak hazirlanir.
                  El yapimi takilarimiz, sizin ozel anlariniza anlam katar.
                </p>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/images/atolye.png"
                  alt="Yazici Atolye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atolye Gorselleri */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Atolyemizden Kareler</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src="/images/atolye-usta-1.png"
                alt="Usta Calismasi"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src="/images/atolye-3.png"
                alt="Atolye Detay"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src="/images/atolye-4.png"
                alt="El Isciligi"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image
                src="/images/atolye-kutu-1.png"
                alt="Ozel Paketleme"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Degerlerimiz */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Neden Biz?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-[#C4A574]" />
              </div>
              <h3 className="font-serif text-lg mb-2">40 Yillik Tecrube</h3>
              <p className="text-sm text-muted-foreground">
                Nesiller boyu aktarilan usta isciligi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#C4A574]" />
              </div>
              <h3 className="font-serif text-lg mb-2">Sertifikali Urunler</h3>
              <p className="text-sm text-muted-foreground">
                Tum taslar ve metaller sertifikali
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <Gem className="w-8 h-8 text-[#C4A574]" />
              </div>
              <h3 className="font-serif text-lg mb-2">Uygun Fiyat</h3>
              <p className="text-sm text-muted-foreground">
                Aracisiz, dogrudan atolyeden size
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-[#C4A574]" />
              </div>
              <h3 className="font-serif text-lg mb-2">El Yapimi</h3>
              <p className="text-sm text-muted-foreground">
                Her parca ozenle el isciligi ile uretilir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Iletisim Bilgileri */}
      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
              Bize Ulasin
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Sol - Iletisim Detaylari */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Adres</h3>
                    <p className="text-white/70">
                      Kapalıcarsı, Kuyumcular Caddesi No: 42<br />
                      Fatih, Istanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefon</h3>
                    <p className="text-white/70">
                      <a href="tel:+902125551234" className="hover:text-[#C4A574] transition-colors">
                        +90 (212) 555 12 34
                      </a>
                    </p>
                    <p className="text-white/70">
                      <a href="https://wa.me/905551234567" className="hover:text-[#C4A574] transition-colors">
                        WhatsApp: +90 (555) 123 45 67
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">E-posta</h3>
                    <p className="text-white/70">
                      <a href="mailto:info@yaziciatolye.com" className="hover:text-[#C4A574] transition-colors">
                        info@yaziciatolye.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Calisma Saatleri</h3>
                    <p className="text-white/70">
                      Pazartesi - Cumartesi: 10:00 - 19:00<br />
                      Pazar: Kapali
                    </p>
                  </div>
                </div>
              </div>

              {/* Sag - Harita veya CTA */}
              <div className="flex flex-col justify-center">
                <div className="bg-white/5 p-8 text-center">
                  <p className="font-script text-2xl text-[#C4A574] mb-4">Atolyemizi Ziyaret Edin</p>
                  <p className="text-white/70 mb-6">
                    Urunlerimizi yakindan gormek ve ozel tasarim taleplerinizi
                    konusmak icin atolyemize bekleriz.
                  </p>
                  <Link
                    href="/iletisim"
                    className="inline-block bg-white text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#C4A574] transition-colors"
                  >
                    Iletisime Gec
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="font-script text-3xl md:text-4xl mb-4">Koleksiyonumuzu Kesfedin</p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            40 yillik tecrubemizle urettigimiz essiz parcalari inceleyin
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            Urunleri Gor
          </Link>
        </div>
      </section>
    </div>
  );
}

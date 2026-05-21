"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Award, Shield, Gem, Heart } from "lucide-react";

interface SiteSettings {
  phone?: string;
  phone2?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export default function HakkimizdaPage() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/settings"),
      fetch("/api/content?page=hakkimizda"),
    ])
      .then(async ([settingsRes, contentRes]) => {
        const settingsData = await settingsRes.json();
        const contentData = await contentRes.json();
        setSettings(settingsData);
        setContent(contentData);
      })
      .catch((err) => console.error("Hakkimizda fetch error:", err));
  }, []);

  // Helper to strip non-digit characters for tel: and wa.me links
  const phoneDigits = (val?: string) => val?.replace(/\D/g, "") || "";

  // Parse atolye gorselleri from API or use defaults
  const atolyeImages = (() => {
    try {
      return JSON.parse(content.atolye_gorselleri?.items || "[]");
    } catch {
      return [];
    }
  })();
  const defaultAtolyeImages = [
    { image: "/images/atolye-usta-1.png", alt: "Usta Çalışması" },
    { image: "/images/atolye-3.png", alt: "Atölye Detay" },
    { image: "/images/atolye-4.png", alt: "El İşçiliği" },
    { image: "/images/atolye-kutu-1.png", alt: "Özel Paketleme" },
  ];
  const finalAtolyeImages = atolyeImages.length > 0 ? atolyeImages : defaultAtolyeImages;

  // Parse neden biz items from API or use defaults
  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-8 h-8 text-[#C4A574]" />,
    Shield: <Shield className="w-8 h-8 text-[#C4A574]" />,
    Gem: <Gem className="w-8 h-8 text-[#C4A574]" />,
    Heart: <Heart className="w-8 h-8 text-[#C4A574]" />,
  };
  const nedenBizItems = (() => {
    try {
      return JSON.parse(content.neden_biz?.items || "[]");
    } catch {
      return [];
    }
  })();
  const defaultNedenBizItems = [
    { icon: "Award", title: "40 Yıllık Tecrübe", description: "Nesiller boyu aktarılan usta işçiliği" },
    { icon: "Shield", title: "Sertifikalı Ürünler", description: "Tüm taşlar ve metaller sertifikalı" },
    { icon: "Gem", title: "Uygun Fiyat", description: "Aracısız, doğrudan atölyeden size" },
    { icon: "Heart", title: "El Yapımı", description: "Her parça özenle el işçiliği ile üretilir" },
  ];
  const finalNedenBizItems = nedenBizItems.length > 0 ? nedenBizItems : defaultNedenBizItems;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={content.hero?.image || "/images/atolye-usta-1.png"}
          alt="Favian Jewellery - 40 Yıllık Tecrübe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 text-white">
              {content.hero?.title || "Üretimden Sizlere"}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              {content.hero?.subtitle || "40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz. Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz."}
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
                  {content.hikaye?.p1 || "Favian Jewellery, 40 yılı aşkın süredir Türkiye'nin önde gelen kuyumcu markalarına toptan üretim yapmaktadır. Nesiller boyu aktarılan kuyumculuk sanatını, modern tasarımlarla buluşturuyoruz."}
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {content.hikaye?.p2 || "Yıllardır büyük mağazalara tedarik ettiğimiz aynı kalitedeki ürünleri, artık aracısız olarak sizlere ulaştırıyoruz. Böylece piyasa fiyatının çok altında, üstün kaliteli takılara sahip olabilirsiniz."}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {content.hikaye?.p3 || "Her parçamız, usta ellerden çıkar ve sizin için özel olarak hazırlanır. El yapımı takılarımız, sizin özel anlarınıza anlam katar."}
                </p>
              </div>
              <div className="relative aspect-square">
                <Image
                  src={content.hikaye?.image || "/images/atolye.png"}
                  alt="Favian Jewellery"
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
            <h2 className="section-title">Atölyemizden Kareler</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {finalAtolyeImages.map((item: { image: string; alt: string }, index: number) => (
              <div key={index} className="relative aspect-square overflow-hidden group">
                <Image
                  src={item.image || "/images/atolye.png"}
                  alt={item.alt || "Atölye"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
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
            {finalNedenBizItems.map((item: { icon: string; title: string; description: string }, index: number) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  {iconMap[item.icon] || <Award className="w-8 h-8 text-[#C4A574]" />}
                </div>
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Iletisim Bilgileri */}
      <section className="py-16 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-white">
              Bize Ulaşın
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Sol - Iletisim Detaylari */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Adres</h3>
                    <p className="text-white/70">
                      {settings.address || "Yükleniyor..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Telefon</h3>
                    <p className="text-white/70">
                      <a href={`tel:+${phoneDigits(settings.phone)}`} className="hover:text-[#C4A574] transition-colors">
                        {settings.phone || "Yükleniyor..."}
                      </a>
                    </p>
                    {settings.whatsapp && (
                      <p className="text-white/70">
                        <a href={`https://wa.me/${phoneDigits(settings.whatsapp)}`} className="hover:text-[#C4A574] transition-colors">
                          WhatsApp: {settings.whatsapp}
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">E-posta</h3>
                    <p className="text-white/70">
                      <a href={`mailto:${settings.email || ""}`} className="hover:text-[#C4A574] transition-colors">
                        {settings.email || "Yükleniyor..."}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#C4A574]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 text-white">Çalışma Saatleri</h3>
                    <p className="text-white/70">
                      {settings.workingHours || "Yükleniyor..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sag - Harita veya CTA */}
              <div className="flex flex-col justify-center">
                <div className="bg-white/5 p-8 text-center">
                  <p className="font-script text-2xl text-[#C4A574] mb-4">Atölyemizi Ziyaret Edin</p>
                  <p className="text-white/70 mb-6">
                    Ürünlerimizi yakından görmek ve özel tasarım taleplerinizi
                    konuşmak için atölyemize bekleriz.
                  </p>
                  <Link
                    href="/iletisim"
                    className="inline-block bg-white text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#C4A574] transition-colors"
                  >
                    İletişime Geç
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
          <p className="font-script text-3xl md:text-4xl mb-4">Koleksiyonumuzu Keşfedin</p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            40 yıllık tecrübemizle ürettiğimiz eşsiz parçaları inceleyin
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            Ürünleri Gör
          </Link>
        </div>
      </section>
    </div>
  );
}

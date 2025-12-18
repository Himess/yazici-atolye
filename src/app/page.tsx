"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { HeroSlider } from "@/components/hero-slider";
import { ChevronDown, Heart, Sparkles, Gem } from "lucide-react";

const testimonials = [
  {
    name: "Ayse K.",
    age: "28",
    image: "/images/testimonial-1.jpg",
    text: "Nisanlimdan aldigi yuzuk muhtesemdi. El isciligi ve kalite gercekten fark yaratiyor.",
  },
  {
    name: "Mehmet Y.",
    age: "35",
    image: "/images/testimonial-2.jpg",
    text: "Esime aldim hediye, cok begendi. Paketleme ve teslimat da cok ozenli.",
  },
  {
    name: "Zeynep A.",
    age: "24",
    image: "/images/testimonial-3.jpg",
    text: "Minimalist tasarimlar tam benim tarzim. Her gun takiyorum.",
  },
  {
    name: "Can B.",
    age: "31",
    image: "/images/testimonial-4.jpg",
    text: "Alyanslarimizi buradan aldik. Mukemmel iscilik, herkese tavsiye ederim.",
  },
];

const faqs = [
  {
    question: "Urunlerinizde hangi malzemeler kullaniliyor?",
    answer: "Tum urunlerimizde 14K ve 18K saf altin, 925 ayar gumus ve GIA sertifikali pirlantalar kullaniyoruz. Her parcamiz kalite garantilidir.",
  },
  {
    question: "Kargo ve teslimat ne kadar suruyor?",
    answer: "Siparisleriniz 1-2 is gunu icinde kargoya verilir. Istanbul ici 1 gun, Turkiye geneli 2-3 gun icerisinde teslim edilir. 500 TL ustu siparislerde kargo ucretsizdir.",
  },
  {
    question: "Iade ve degisim politikaniz nedir?",
    answer: "14 gun icerisinde kosulsuz iade veya degisim yapabilirsiniz. Urun orijinal kutusunda ve kullanilmamis olmalidir.",
  },
  {
    question: "Ozel tasarim siparis verebilir miyim?",
    answer: "Evet! Ozel tasarim talepleriniz icin bizimle iletisime gecebilirsiniz. Size ozel, tek ve benzersiz parcalar tasarliyoruz.",
  },
];

const priceRanges = [
  { label: "10.000 TL Alti", image: "/images/kolye-1.png", href: "/urunler?fiyat=0-10000" },
  { label: "10.000 - 20.000 TL", image: "/images/kupe-1.png", href: "/urunler?fiyat=10000-20000" },
  { label: "20.000 - 30.000 TL", image: "/images/bileklik-1.png", href: "/urunler?fiyat=20000-30000" },
  { label: "30.000 - 50.000 TL", image: "/images/yuzuk-2.png", href: "/urunler?fiyat=30000-50000" },
  { label: "50.000 TL Ustu", image: "/images/yuzuk-3.png", href: "/urunler?fiyat=50000-99999" },
];

// Kategoriler için mevcut ürün görsellerini kullan
const categoryImages = [
  { name: "Bileklikler", image: "/images/bileklik1-1.png", href: "/urunler?kategori=bileklik" },
  { name: "Kupeler", image: "/images/küpe1-1.png", href: "/urunler?kategori=kupe" },
  { name: "Kolyeler", image: "/images/kolye1-1.png", href: "/urunler?kategori=kolye" },
  { name: "Yuzukler", image: "/images/yüzük1-1.png", href: "/urunler?kategori=yuzuk" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const ringProducts = products.filter(p => p.category === "yuzuk").slice(0, 4);
  const necklaceProducts = products.filter(p => p.category === "kolye").slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Kategorilere Gore Alisveris */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Kategorilere Gore Alisveris</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {categoryImages.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white text-sm font-medium tracking-wide uppercase">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* One Cikan Urunler */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">One Cikan Urunler</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/urunler"
              className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              Tum Urunleri Gor
            </Link>
          </div>
        </div>
      </section>

      {/* Banner - Her Gun Isilda */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/kolye1-1.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl mb-4">Her Gun Isilda</p>
          <p className="text-sm tracking-wider mb-6 max-w-md">
            Essiz koleksiyonumuzu kesfedin
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-white text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-100 transition-colors"
          >
            Hemen Alisverise Basla
          </Link>
        </div>
      </section>

      {/* Yuzukler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Yuzukler</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {ringProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/urunler?kategori=yuzuk"
              className="inline-block border border-black text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
            >
              Tum Yuzukleri Gor
            </Link>
          </div>
        </div>
      </section>

      {/* Alyans Koleksiyonu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Alyans Koleksiyonu</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Evliliginizin simgesi olacak alyanslar, atölyemizde el iscigiyle uretiliyor.
            Piyasa fiyatinin yarisina, ayni kalite.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter(p => p.categoryLabel === "Alyans").map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fiyata Gore Alisveris */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Fiyata Gore Alisveris</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-10">
            {priceRanges.map((range) => (
              <Link key={range.label} href={range.href} className="group text-center">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#F5F5F5]">
                  <Image
                    src={range.image}
                    alt={range.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-sm text-foreground group-hover:text-muted-foreground transition-colors">
                  {range.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guven Ikonlari */}
      <section className="py-12 bg-[#F5F5F5] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="trust-icon">
              <Heart className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Sevgiyle El Yapimi</h3>
              <p className="text-sm text-muted-foreground">
                Her parca, uzman ustalarimiz tarafindan ozenle el iscigiyle uretilir.
              </p>
            </div>
            <div className="trust-icon">
              <Sparkles className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Alerjik Degil ve Hafif</h3>
              <p className="text-sm text-muted-foreground">
                Cildinize zarar vermez, gun boyu rahatlikla takabilirsiniz.
              </p>
            </div>
            <div className="trust-icon">
              <Gem className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Dogal Taslar</h3>
              <p className="text-sm text-muted-foreground">
                Sertifikali dogal taslar ve pirlantalar kullaniyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Musterilerimiz Ne Diyor */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Musterilerimiz Ne Diyor</h2>
          </div>

          <div className="relative mt-16">
            {/* Clothesline */}
            <div className="absolute top-0 left-0 right-0 h-px bg-border" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative">
                  {/* Pin/Clip */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-8 bg-gray-300 rounded-full" />

                  <div className="bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] mb-4 bg-gray-100 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm">{testimonial.name}, {testimonial.age}</p>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sikca Sorulan Sorular */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="section-line">
            <h2 className="section-title">Sikca Sorulan Sorular</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10">
            Herhangi bir sorunuz varsa, web sitemizdeki SSS bolumumuze basvurun
          </p>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-left pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkimizda / Uretimden Direkt Size */}
      <section className="py-16 bg-[#F5F5F5] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Uretimden Direkt Size</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            40 yili askin tecrubemiz ile buyuk kuyumculara toptan satis yapiyoruz.
            Simdi ayni kaliteyi, aracisiz fiyatlarla sizlere sunuyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image
                src="/images/atolye-usta-1.png"
                alt="Atolye Ustamiz"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">40 Yillik Tecrube</h3>
                <p className="text-sm text-white/80">Usta ellerden, ozenle islenen parcalar</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image
                src="/images/atolye-3.png"
                alt="El Isciligi"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">El Isciligi</h3>
                <p className="text-sm text-white/80">Her parca, tek tek elle uretilir</p>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image
                src="/images/atolye-4.png"
                alt="Kalite Kontrol"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">Kalite Garantisi</h3>
                <p className="text-sm text-white/80">Sertifikali malzeme, titiz iscilik</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hakkimizda"
              className="inline-block border border-black text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-black hover:text-white transition-colors"
            >
              Hikayemizi Kesfet
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram / Sevgiyle Paketlendi */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="font-script text-3xl md:text-4xl mb-2">Sevgiyle Paketlendi</p>
            <p className="text-muted-foreground text-sm">@yaziciatolye</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Link
                key={i}
                href="https://instagram.com/yaziciatolye"
                target="_blank"
                className="relative aspect-square bg-gray-100 overflow-hidden group"
              >
                <Image
                  src={`/images/instagram-${i}.jpg`}
                  alt={`Instagram ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

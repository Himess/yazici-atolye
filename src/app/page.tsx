"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ChevronDown, Heart, Sparkles, Shield, Gem } from "lucide-react";

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
  { label: "1.000 TL Alti", image: "/images/price-1.jpg", href: "/urunler?fiyat=0-1000" },
  { label: "1.000 - 3.000 TL", image: "/images/price-2.jpg", href: "/urunler?fiyat=1000-3000" },
  { label: "3.000 - 5.000 TL", image: "/images/price-3.jpg", href: "/urunler?fiyat=3000-5000" },
  { label: "5.000 - 10.000 TL", image: "/images/price-4.jpg", href: "/urunler?fiyat=5000-10000" },
  { label: "10.000 TL Ustu", image: "/images/price-5.jpg", href: "/urunler?fiyat=10000-99999" },
];

const categoryImages = [
  { name: "Bileklikler", image: "/images/cat-bileklik.jpg", href: "/urunler?kategori=bileklik" },
  { name: "Kupeler", image: "/images/cat-kupe.jpg", href: "/urunler?kategori=kupe" },
  { name: "Kolyeler", image: "/images/cat-kolye.jpg", href: "/urunler?kategori=kolye" },
  { name: "Yuzukler", image: "/images/cat-yuzuk.jpg", href: "/urunler?kategori=yuzuk" },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featuredProducts = products.slice(0, 4);
  const braceletProducts = products.filter(p => p.category === "bileklik").slice(0, 4);
  const earringProducts = products.filter(p => p.category === "kupe").slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Full Width Image with Overlay Text */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-main.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-lg">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-4 sm:mb-6 leading-tight tracking-tight uppercase">
              Jewels for the<br />Fearlessly<br />Authentic
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md tracking-wide">
              Kendine ozgu, cesur ve otantik tasarimlar
            </p>
            <Link
              href="/urunler"
              className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              Shop All
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Shop by category</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {categoryImages.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative aspect-[3/4] overflow-hidden">
                <div className="absolute inset-0 bg-gray-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
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

      {/* Bracelets Section */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Bracelets</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {braceletProducts.length > 0 ? (
              braceletProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Banner - Shine Every Day */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/banner-shine.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl mb-4">Shine Every Day</p>
          <p className="text-sm tracking-wider mb-6 max-w-md">
            Explore Our Stunning Jewelry Collection
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
          >
            Shop All
          </Link>
        </div>
      </section>

      {/* Earrings Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Earrings</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {earringProducts.length > 0 ? (
              earringProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Radiant Rebellion - Side by Side */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src="/images/radiant-rebellion.jpg"
                alt="Radiant Rebellion"
                fill
                className="object-cover"
              />
            </div>
            <div className="py-8 md:py-16 md:pl-8">
              <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 tracking-tight uppercase">
                Radiant Rebellion
              </h2>
              <p className="text-lg text-muted-foreground mb-4 uppercase tracking-wide">
                Jewels for the Fearlessly Authentic
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Her parca, kendinize olan guveninizi yansitiyor. Sadece bir taki degil,
                gucunuzun ve ozgunlugunuzun sembolu. One cikmaktan korkmayanlara ozel.
              </p>
              <Link
                href="/urunler"
                className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Explore All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Price */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">Shop by Price</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-10">
            {priceRanges.map((range) => (
              <Link key={range.label} href={range.href} className="group text-center">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
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

      {/* Trust Icons */}
      <section className="py-12 bg-[#F5F5F5] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="trust-icon">
              <Heart className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Handcrafted with Love and Care</h3>
              <p className="text-sm text-muted-foreground">
                Her parca, uzman ustalarimiz tarafindan ozenle el iscigiyle uretilir.
              </p>
            </div>
            <div className="trust-icon">
              <Sparkles className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Hypoallergenic and Lightweight</h3>
              <p className="text-sm text-muted-foreground">
                Cildinize zarar vermez, gun boyu rahatlikla takabilirsiniz.
              </p>
            </div>
            <div className="trust-icon">
              <Gem className="w-8 h-8 text-[#C4A574]" />
              <h3 className="font-serif text-lg mb-2">Natural Gemstones</h3>
              <p className="text-sm text-muted-foreground">
                Sertifikali dogal taslar ve pirlantalar kullaniyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-line">
            <h2 className="section-title">What Our Customers Say</h2>
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

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="section-line">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <p className="text-center text-muted-foreground mb-10">
            If You Have Any Problems, Consult The FAQs On Our Website
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

      {/* Instagram / Wrapped with Love */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="font-script text-3xl md:text-4xl mb-2">Wrapped with Love</p>
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

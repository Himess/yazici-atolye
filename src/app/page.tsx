"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/yuzuk-2.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/30 sm:from-white/90 sm:via-white/50 sm:to-transparent" />

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#BFAE8F] mb-3 sm:mb-4 font-medium">El Yapimi Tasarimlar</p>
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2B2B] mb-4 sm:mb-6 leading-tight">
              Zarafetin ve Kalitenin Bulustugu Yer
            </h1>
            <p className="text-base sm:text-lg text-[#6D6B68] mb-6 sm:mb-8 max-w-lg">
              Yazici Atolye olarak, her parcayi ozenle tasarliyor ve el iscigiyle hayata geciriyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white transition-all duration-300 w-full sm:w-auto">
                <Link href="/urunler">Koleksiyonu Kesfet</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#095246] text-[#095246] hover:bg-[#095246] hover:text-white transition-all duration-300 w-full sm:w-auto">
                <Link href="/iletisim">Randevu Al</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Güven İkonları - Blue Diamond Tarzı */}
      <section className="py-6 bg-white border-b border-[#E5E5E5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Guvenli</span>
              <span className="text-xs text-[#6D6B68]">Alisveris</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Sigortali</span>
              <span className="text-xs text-[#6D6B68]">Ucretsiz Teslimat</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Omur Boyu</span>
              <span className="text-xs text-[#6D6B68]">Garanti</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Ozel</span>
              <span className="text-xs text-[#6D6B68]">Hediye Kutusu</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Ucretsiz</span>
              <span className="text-xs text-[#6D6B68]">Olcu Degisimi</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Ilk 14 Gun</span>
              <span className="text-xs text-[#6D6B68]">Kayipsiz Iade</span>
            </div>

            <div className="flex flex-col items-center text-center p-3">
              <div className="w-12 h-12 rounded-full bg-[#F7F6F4] flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-[#095246]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#2B2B2B]">Sertifikali</span>
              <span className="text-xs text-[#6D6B68]">Pirlantalar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kategoriler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-[#2B2B2B] mb-4">Kategoriler</h2>
            <p className="text-[#6D6B68]">Aradiginiz her seyi bulabilirsiniz</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/urunler?kategori=${category.id}`}>
                <Button variant="outline" className="border-[#E5E5E5] text-[#6D6B68] hover:bg-[#F7F6F4] hover:border-[#095246] hover:text-[#095246] px-6 py-2 transition-all duration-300">
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tum Urunler */}
      <section className="py-16 bg-[#F7F6F4]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-[#2B2B2B] mb-4">Urunlerimiz</h2>
            <p className="text-[#6D6B68]">En cok tercih edilen parcalarimiz</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2B2B2B] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Ozel Bir Parca mi Ariyorsunuz?</h2>
          <p className="text-[#6D6B68] mb-8 max-w-2xl mx-auto">Size ozel tasarim yapmak icin sabirsizlaniyoruz.</p>
          <Button size="lg" className="bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white transition-all duration-300">
            <Link href="/iletisim">Bize Ulasin</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

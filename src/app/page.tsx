"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/yuzuk-2.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />

        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-widest text-[#BFAE8F] mb-4 font-medium">El Yapimi Tasarimlar</p>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#2B2B2B] mb-6 leading-tight">
              Zarafetin ve Kalitenin Bulustugu Yer
            </h1>
            <p className="text-lg text-[#6D6B68] mb-8 max-w-lg">
              Yazici Atolye olarak, her parcayi ozenle tasarliyor ve el iscigiyle hayata geciriyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white transition-all duration-300">
                <Link href="/urunler">Koleksiyonu Kesfet</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-[#095246] text-[#095246] hover:bg-[#095246] hover:text-white transition-all duration-300">
                <Link href="/iletisim">Randevu Al</Link>
              </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

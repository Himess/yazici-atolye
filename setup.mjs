import fs from 'fs';

// Ana Sayfa
const pageContent = `import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, categories, formatPrice } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      <section className="relative h-[600px] bg-gradient-to-br from-amber-50 via-white to-amber-100">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              El Yapimi Tasarimlar
            </Badge>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-zinc-900 mb-6 leading-tight">
              Zarafetin ve
              <span className="text-amber-700"> Kalitenin</span> Bulustugu Yer
            </h1>
            <p className="text-lg text-zinc-600 mb-8 max-w-lg">
              Yazici Atolye olarak, her parcayi ozenle tasarliyor ve el iscigiyle hayata geciriyoruz.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-amber-700 hover:bg-amber-800">
                <Link href="/urunler">Koleksiyonu Kesfet</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                <Link href="/iletisim">Randevu Al</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-amber-200/30 to-transparent hidden lg:block" />
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-4">Kategoriler</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Genis urun yelpazemizde aradiginiz her seyi bulabilirsiniz</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={\`/urunler?kategori=\${category.id}\`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-amber-100 hover:border-amber-300">
                  <CardContent className="p-8 text-center">
                    <span className="text-4xl mb-4 block">{category.icon}</span>
                    <h3 className="font-semibold text-zinc-800 group-hover:text-amber-700 transition-colors">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-4">One Cikan Urunler</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">En cok tercih edilen ve begenilen parcalarimiz</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={\`/urun/\${product.id}\`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                      {product.category === "yuzuk" ? "💍" : product.category === "kolye" ? "📿" : product.category === "kupe" ? "✨" : "⌚"}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-amber-700 text-white">{product.categoryLabel}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-zinc-800 group-hover:text-amber-700 transition-colors mb-1">{product.name}</h3>
                    <p className="text-sm text-zinc-500 mb-2">{product.material}</p>
                    <p className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
              <Link href="/urunler">Tum Urunleri Gor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-4">Neden Yazici Atolye?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-2xl">✓</div>
              <h3 className="font-semibold text-lg mb-2">Kalite Garantisi</h3>
              <p className="text-zinc-600">Tum urunlerimiz sertifikali ve garantili.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-2xl">✎</div>
              <h3 className="font-semibold text-lg mb-2">Ozel Tasarim</h3>
              <p className="text-zinc-600">Isteginize ozel tasarimlar yapiyoruz.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center text-2xl">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Hizli Teslimat</h3>
              <p className="text-zinc-600">Siparisleriniz ozenle paketlenir.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Ozel Bir Parca mi Ariyorsunuz?</h2>
          <p className="text-amber-100 mb-8 max-w-2xl mx-auto">Size ozel tasarim yapmak icin sabirsizlaniyoruz.</p>
          <Button size="lg" variant="secondary" className="bg-white text-amber-800 hover:bg-amber-50">
            <Link href="/iletisim">Bize Ulasin</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
`;

// Urunler Sayfasi
const urunlerContent = `"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, categories, formatPrice } from "@/lib/products";

export default function UrunlerPage() {
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get("kategori");
  const [selectedCategory, setSelectedCategory] = useState(kategoriParam || "all");

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-4xl font-bold mb-4">Urunlerimiz</h1>
          <p className="text-amber-100">El yapimi, ozenle tasarlanmis tum koleksiyonumuz</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700"}
          >
            Tumunu Goster
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.id)}
              className={selectedCategory === cat.id ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700"}
            >
              {cat.icon} {cat.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={\`/urun/\${product.id}\`}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
                    {product.category === "yuzuk" ? "💍" : product.category === "kolye" ? "📿" : product.category === "kupe" ? "✨" : "⌚"}
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-700 text-white">{product.categoryLabel}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-zinc-800 group-hover:text-amber-700 transition-colors mb-1">{product.name}</h3>
                  <p className="text-sm text-zinc-500 mb-2">{product.material}</p>
                  <p className="text-lg font-bold text-amber-700">{formatPrice(product.price)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Bu kategoride urun bulunamadi.</p>
          </div>
        )}
      </div>
    </div>
  );
}
`;

// Urun Detay Sayfasi
const urunDetayContent = `import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProductById, formatPrice } from "@/lib/products";

export default async function UrunDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/urunler" className="text-amber-700 hover:text-amber-800 mb-8 inline-block">
          ← Urunlere Don
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center">
            <span className="text-9xl opacity-50">
              {product.category === "yuzuk" ? "💍" : product.category === "kolye" ? "📿" : product.category === "kupe" ? "✨" : "⌚"}
            </span>
          </div>

          <div>
            <Badge className="bg-amber-100 text-amber-800 mb-4">{product.categoryLabel}</Badge>
            <h1 className="font-playfair text-4xl font-bold text-zinc-900 mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-amber-700 mb-6">{formatPrice(product.price)}</p>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-zinc-800 mb-2">Aciklama</h3>
                <p className="text-zinc-600">{product.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-800 mb-2">Malzeme</h3>
                <p className="text-zinc-600">{product.material}</p>
              </div>

              <div>
                <h3 className="font-semibold text-zinc-800 mb-2">Stok Durumu</h3>
                <Badge variant={product.inStock ? "default" : "destructive"}>
                  {product.inStock ? "Stokta Var" : "Stokta Yok"}
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <Button size="lg" className="w-full bg-amber-700 hover:bg-amber-800" disabled>
                Sepete Ekle (Yakinda)
              </Button>
              <Button size="lg" variant="outline" className="w-full border-amber-700 text-amber-700">
                <Link href="/iletisim">Bu Urun Hakkinda Bilgi Al</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// Hakkimizda Sayfasi
const hakkimizdaContent = `import { Separator } from "@/components/ui/separator";

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-4xl font-bold mb-4">Hakkimizda</h1>
          <p className="text-amber-100">Yazici Atolye hikayesi</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-6">Hikayemiz</h2>
            <p className="text-zinc-600 mb-6">
              Yazici Atolye, nesiller boyu aktarilan kuyumculuk sanatini modern tasarimlarla
              bulusturan bir aile atolyesidir. Her parcamiz, usta ellerden cikar ve sizin icin
              ozel olarak hazirlanir.
            </p>
            <p className="text-zinc-600 mb-6">
              Kuruldugumuz gunden bu yana, kalite ve musterimemnuniyetini on planda tutarak
              binlerce mutlu musteriye hizmet verdik. El yapimi takilarimiz, sizin ozel
              anlariniza anlam katar.
            </p>

            <Separator className="my-8" />

            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-6">Degerlerimiz</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="p-6 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-lg text-amber-800 mb-2">Kalite</h3>
                <p className="text-zinc-600">En kaliteli malzemeler ve usta iscilik ile uretim yapiyoruz.</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-lg text-amber-800 mb-2">Guven</h3>
                <p className="text-zinc-600">Tum urunlerimiz sertifikali ve garantilidir.</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-lg text-amber-800 mb-2">Ozgunluk</h3>
                <p className="text-zinc-600">Her parca benzersiz ve ozel tasarimdir.</p>
              </div>
              <div className="p-6 bg-amber-50 rounded-lg">
                <h3 className="font-semibold text-lg text-amber-800 mb-2">Musteri Odaklilik</h3>
                <p className="text-zinc-600">Musterilerimizin memnuniyeti bizim icin en onemlisidir.</p>
              </div>
            </div>

            <Separator className="my-8" />

            <h2 className="font-playfair text-3xl font-bold text-zinc-900 mb-6">Atolyemiz</h2>
            <p className="text-zinc-600 mb-6">
              Istanbul'un kalbinde yer alan atolyemizde, geleneksel kuyumculuk teknikleri
              ile modern tasarim anlayisini bir araya getiriyoruz. Randevu alarak atolyemizi
              ziyaret edebilir, tasarim surecine birlikte katilabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// Iletisim Sayfasi
const iletisimContent = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesajiniz alindi! En kisa surede size donecegiz.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-4xl font-bold mb-4">Iletisim</h1>
          <p className="text-amber-100">Bize ulasin, sorularinizi yanitlayalim</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-zinc-900 mb-6">Bize Yazin</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Adiniz Soyadiniz</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">E-posta</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Telefon</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="border-amber-200 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Mesajiniz</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  className="w-full rounded-md border border-amber-200 px-3 py-2 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                Gonder
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-amber-800">Iletisim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <h4 className="font-semibold">Adres</h4>
                    <p className="text-zinc-600">Istanbul, Turkiye</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <h4 className="font-semibold">Telefon</h4>
                    <p className="text-zinc-600">+90 (212) 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <h4 className="font-semibold">E-posta</h4>
                    <p className="text-zinc-600">info@yaziciatolye.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🕐</span>
                  <div>
                    <h4 className="font-semibold">Calisma Saatleri</h4>
                    <p className="text-zinc-600">Pazartesi - Cumartesi: 10:00 - 19:00</p>
                    <p className="text-zinc-600">Pazar: Kapali</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-amber-800">WhatsApp ile Ulasin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 mb-4">
                  Hizli iletisim icin WhatsApp uzerinden bize yazabilirsiniz.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  WhatsApp ile Yaz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// Dosyalari olustur
fs.writeFileSync('src/app/page.tsx', pageContent);
console.log('page.tsx created');

fs.writeFileSync('src/app/urunler/page.tsx', urunlerContent);
console.log('urunler/page.tsx created');

fs.writeFileSync('src/app/urun/[id]/page.tsx', urunDetayContent);
console.log('urun/[id]/page.tsx created');

fs.writeFileSync('src/app/hakkimizda/page.tsx', hakkimizdaContent);
console.log('hakkimizda/page.tsx created');

fs.writeFileSync('src/app/iletisim/page.tsx', iletisimContent);
console.log('iletisim/page.tsx created');

console.log('\\nAll pages created successfully!');

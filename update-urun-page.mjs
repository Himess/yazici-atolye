import fs from 'fs';

const content = `"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductById, formatPrice } from "@/lib/products";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function UrunDetayPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<ReturnType<typeof getProductById>>(undefined);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const images = [1, 2, 3, 4];
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleShare = () => {
    const text = \`\${product.name} - \${formatPrice(product.price)} | Yazici Atolye\`;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const whatsappUrl = \`https://wa.me/?text=\${encodeURIComponent(text + ' ' + url)}\`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsApp = () => {
    const text = \`Merhaba, "\${product.name}" (Kod: \${product.code}) urunuyle ilgileniyorum. Detayli bilgi alabilir miyim?\`;
    const whatsappUrl = \`https://wa.me/902121234567?text=\${encodeURIComponent(text)}\`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-stone-500 hover:text-stone-900">Ana Sayfa</Link>
          <span className="text-stone-400">/</span>
          <Link href="/urunler" className="text-stone-500 hover:text-stone-900">Urunler</Link>
          <span className="text-stone-400">/</span>
          <Link href={\`/urunler?kategori=\${product.category}\`} className="text-stone-500 hover:text-stone-900">{product.categoryLabel}</Link>
          <span className="text-stone-400">/</span>
          <span className="text-stone-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sol: Resim Galerisi */}
          <div className="flex gap-4">
            {/* Thumbnails - Sol taraf */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  className={\`w-16 h-16 lg:w-20 lg:h-20 bg-stone-100 rounded-lg flex items-center justify-center transition-all \${selectedImage === index ? 'ring-2 ring-stone-900' : 'hover:ring-2 hover:ring-stone-400'}\`}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-stone-200/50" />
                </button>
              ))}
              {/* Video butonu */}
              <button className="w-16 h-16 lg:w-20 lg:h-20 bg-stone-100 rounded-lg flex items-center justify-center hover:ring-2 hover:ring-stone-400 transition-all">
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-stone-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>

            {/* Ana Resim */}
            <div className="flex-1 aspect-square bg-stone-50 rounded-lg flex items-center justify-center relative min-w-0">
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-stone-200/50" />
              {/* Zoom icon */}
              <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all">
                <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Sag: Urun Bilgileri */}
          <div className="min-w-0">
            {/* Kategori ve Butonlar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-stone-500">{product.categoryLabel}</span>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={\`p-2 border rounded-lg transition-all \${isFavorite ? 'border-red-500 bg-red-50' : 'border-stone-200 hover:bg-stone-50'}\`}
                  title="Favorilere Ekle"
                >
                  <svg className={\`w-5 h-5 \${isFavorite ? 'text-red-500 fill-red-500' : 'text-stone-600'}\`} fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 transition-all"
                  title="Paylas"
                >
                  <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Urun Kodu */}
            <p className="text-sm text-stone-500 mb-2">Urun Kodu: {product.code}</p>

            {/* Urun Adi */}
            <h1 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 mb-4">{product.name}</h1>

            {/* Fiyat Alani */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
              {product.oldPrice && (
                <>
                  <span className="text-base sm:text-lg text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="bg-red-500 text-white text-xs sm:text-sm font-medium px-2 py-1 rounded">%{discountPercent} indirim</span>
                </>
              )}
              <span className="text-2xl sm:text-3xl font-bold text-stone-900">{formatPrice(product.price)}</span>
            </div>

            {/* Hemen Satin Al Butonu */}
            <Button
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg py-5 sm:py-6 mb-4"
              disabled
            >
              HEMEN SATIN AL (Yakinda)
            </Button>

            {/* Taksit Bilgisi */}
            <p className="text-sm text-stone-500 mb-6">
              <span className="text-emerald-600 font-medium">12 ay vade farksiz</span> taksit imkani
            </p>

            <Separator className="my-6 bg-stone-200" />

            {/* Urun Ozellikleri */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-stone-900">Urun Ozellikleri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Agirlik</span>
                  <span className="text-stone-900 font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Ayar</span>
                  <span className="text-stone-900 font-medium">{product.purity}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Malzeme</span>
                  <span className="text-stone-900 font-medium text-right truncate ml-2">{product.material}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Stok</span>
                  <span className={\`font-medium \${product.inStock ? 'text-emerald-600' : 'text-red-500'}\`}>
                    {product.inStock ? 'Stokta Var' : 'Stokta Yok'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tas Bilgileri Tablosu */}
            {product.stones.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-stone-900 mb-3">Tas Bilgileri</h3>
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="bg-stone-100">
                        <th className="text-left px-3 py-2 font-medium text-stone-700">Tas</th>
                        <th className="text-center px-3 py-2 font-medium text-stone-700">Adet</th>
                        <th className="text-center px-3 py-2 font-medium text-stone-700">Karat</th>
                        <th className="text-center px-3 py-2 font-medium text-stone-700">Renk</th>
                        <th className="text-center px-3 py-2 font-medium text-stone-700">Berraklik</th>
                        <th className="text-center px-3 py-2 font-medium text-stone-700">Sekil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.stones.map((stone, index) => (
                        <tr key={index} className="border-b border-stone-100">
                          <td className="px-3 py-2 text-stone-900">{stone.type}</td>
                          <td className="text-center px-3 py-2 text-stone-600">{stone.count}</td>
                          <td className="text-center px-3 py-2 text-stone-600">{stone.carat > 0 ? stone.carat.toFixed(2) : '-'}</td>
                          <td className="text-center px-3 py-2 text-stone-600">{stone.color}</td>
                          <td className="text-center px-3 py-2 text-stone-600">{stone.clarity}</td>
                          <td className="text-center px-3 py-2 text-stone-600">{stone.shape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <Separator className="my-6 bg-stone-200" />

            {/* WhatsApp ve Iletisim */}
            <div className="space-y-3">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50"
                onClick={handleWhatsApp}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Asistan
              </Button>
              <Button size="lg" variant="outline" className="w-full border-stone-300 text-stone-900 hover:bg-stone-50" asChild>
                <Link href="/iletisim" className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-posta ile Bilgi Al
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mucevher Hakkinda */}
        <div className="mt-12 border-t border-stone-200 pt-8">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-stone-900 mb-4">Mucevher Hakkinda</h2>
          <div className="prose prose-stone max-w-none">
            <p className="text-stone-600 leading-relaxed">{product.about}</p>
            <p className="text-stone-600 leading-relaxed mt-4">{product.description}</p>
          </div>

          {/* Sertifika ve Garanti Bilgisi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
              <svg className="w-8 h-8 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="font-semibold text-stone-900">Garanti</h4>
                <p className="text-sm text-stone-600">2 yil garanti kapsaminda</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
              <svg className="w-8 h-8 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h4 className="font-semibold text-stone-900">Sertifika</h4>
                <p className="text-sm text-stone-600">Urunlerimiz sertifikalidir</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg">
              <svg className="w-8 h-8 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <div>
                <h4 className="font-semibold text-stone-900">Ucretsiz Kargo</h4>
                <p className="text-sm text-stone-600">500 TL ustu siparislerde</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/urun/[id]/page.tsx', content);
console.log('Urun detay sayfasi duzeltildi!');

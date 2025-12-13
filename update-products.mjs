import fs from 'fs';

const productsContent = `export type Stone = {
  type: string;
  count: number;
  carat: number;
  color: string;
  clarity: string;
  shape: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  about: string;
  price: number;
  oldPrice?: number;
  category: "yuzuk" | "kolye" | "kupe" | "bileklik";
  categoryLabel: string;
  material: string;
  weight: string;
  purity: string;
  stones: Stone[];
  images: string[];
  featured: boolean;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    code: "YA-TK-001",
    name: "0,50 Karat Pirlanta Tektas Yuzuk",
    description: "14 ayar sari altin uzerine 0.50 karat pirlanta tasli zarif tektas yuzuk.",
    about: "0,50 Karat Pirlanta Tektas Yuzuk, pirlantalarin en saf halini yansitan ozel bir tasarimdir. Nisan ve soz torenleri icin ideal olan bu yuzuk, Yazici Atolye kalitesini uzerinde tasir.",
    price: 45000,
    oldPrice: 52000,
    category: "yuzuk",
    categoryLabel: "Yuzuk",
    material: "14 Ayar Sari Altin",
    weight: "2.80 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pirlanta", count: 1, carat: 0.50, color: "F/G", clarity: "VS1", shape: "Yuvarlak" }
    ],
    images: ["/images/ring-1.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    code: "YA-KL-001",
    name: "0,30 Karat Pirlanta Kolye",
    description: "18 ayar beyaz altin zincir uzerinde 0.30 karat pirlanta tasli minimalist kolye.",
    about: "0,30 Karat Pirlanta Kolye, sadeligin ve zarafetin mukemmel birlesimi. Gunluk kullanim icin ideal.",
    price: 28000,
    oldPrice: 32000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "18 Ayar Beyaz Altin",
    weight: "3.20 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Pirlanta", count: 1, carat: 0.30, color: "F/G", clarity: "VS2", shape: "Yuvarlak" }
    ],
    images: ["/images/necklace-1.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    code: "YA-KP-001",
    name: "22 Ayar Altin Halka Kupe",
    description: "22 ayar altin klasik halka kupe. Zamansiz bir parca.",
    about: "22 Ayar Altin Halka Kupe, klasik tasarimin modern yorumu. Yuksek ayar altinin sicak pariltisi ile her aninizia eslik eder.",
    price: 12000,
    category: "kupe",
    categoryLabel: "Kupe",
    material: "22 Ayar Altin",
    weight: "4.50 gr",
    purity: "22 Ayar",
    stones: [],
    images: ["/images/earring-1.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    code: "YA-TK-002",
    name: "Zumrut Tasli El Isi Yuzuk",
    description: "14 ayar altin uzerine dogal zumrut tasli el isi yuzuk.",
    about: "Zumrut Tasli El Isi Yuzuk, geleneksel Turk kuyumculuk sanatinin modern bir yorumu. Her bir parca, usta ellerde ozenle sekillenir.",
    price: 35000,
    oldPrice: 42000,
    category: "yuzuk",
    categoryLabel: "Yuzuk",
    material: "14 Ayar Altin",
    weight: "3.60 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Zumrut", count: 1, carat: 0.80, color: "Yesil", clarity: "Dogal", shape: "Oval" },
      { type: "Pirlanta", count: 12, carat: 0.15, color: "F/G", clarity: "SI", shape: "Yuvarlak" }
    ],
    images: ["/images/ring-2.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "5",
    code: "YA-KL-002",
    name: "Tatli Su Incisi Kolye",
    description: "Gercek tatli su incileri ile hazirlanmis zarif kolye.",
    about: "Tatli Su Incisi Kolye, dogal guzelligi en saf haliyle sunar. Her bir inci, ozenle secilmis ve siralanmistir.",
    price: 8500,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "925 Ayar Gumus",
    weight: "28.00 gr",
    purity: "925 Ayar",
    stones: [
      { type: "Tatli Su Incisi", count: 45, carat: 0, color: "Beyaz", clarity: "AAA", shape: "Yuvarlak" }
    ],
    images: ["/images/necklace-2.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "6",
    code: "YA-BL-001",
    name: "14 Ayar Altin Kelepce Bileklik",
    description: "14 ayar altin modern kelepce bileklik. Ayarlanabilir boyut.",
    about: "14 Ayar Altin Kelepce Bileklik, modern cizgileri ile dikkat ceker. Ayarlanabilir yapisi sayesinde her bilek olcusune uyum saglar.",
    price: 22000,
    oldPrice: 26000,
    category: "bileklik",
    categoryLabel: "Bileklik",
    material: "14 Ayar Altin",
    weight: "8.20 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/bracelet-1.jpg"],
    featured: true,
    inStock: true,
  },
  {
    id: "7",
    code: "YA-KP-002",
    name: "0,40 Karat Pirlanta Kupe",
    description: "18 ayar beyaz altin uzerine toplam 0.40 karat pirlanta tasli kupe cifti.",
    about: "0,40 Karat Pirlanta Kupe, her iki kulaginizda toplam 0.40 karat pirlanta ile goz kamastirici bir gorunum sunar.",
    price: 32000,
    oldPrice: 38000,
    category: "kupe",
    categoryLabel: "Kupe",
    material: "18 Ayar Beyaz Altin",
    weight: "2.40 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Pirlanta", count: 2, carat: 0.40, color: "F/G", clarity: "VS1", shape: "Yuvarlak" }
    ],
    images: ["/images/earring-2.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "8",
    code: "YA-TK-003",
    name: "Klasik Alyans Seti",
    description: "14 ayar altin klasik alyans seti. Ozel gunleriniz icin.",
    about: "Klasik Alyans Seti, evliliginizin simgesi olacak zamansiz bir tasarim. Ic kisimda isim ve tarih kazima secenegi mevcuttur.",
    price: 18000,
    category: "yuzuk",
    categoryLabel: "Yuzuk",
    material: "14 Ayar Altin",
    weight: "6.00 gr (cift)",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/ring-3.jpg"],
    featured: false,
    inStock: true,
  },
  {
    id: "9",
    code: "YA-TK-004",
    name: "0,15 Karat Pirlanta Bestas Yuzuk",
    description: "8 ayar beyaz altin uzerine 5 adet pirlanta tasli bestas yuzuk.",
    about: "0,15 Karat Pirlanta Bestas Yuzuk, pirlantin goz aliciligi ile harmanlanan cok ozel bir yuzuk modelidir. Genellikle evliligin besinci yilinda eslere hediye edilen yuzuk tasarimi. Bes pirlantin yan yana yer aldigi tasarim; sevgi, sadakat basta olmak uzere cok ozel duygularla kadinlarin kendilerini cok daha iyi hissetmesini sagliyor.",
    price: 12990,
    oldPrice: 28900,
    category: "yuzuk",
    categoryLabel: "Yuzuk",
    material: "8 Ayar Beyaz Altin",
    weight: "1.40 gr",
    purity: "8 Ayar",
    stones: [
      { type: "Pirlanta", count: 5, carat: 0.15, color: "F/G", clarity: "SI", shape: "Yuvarlak" }
    ],
    images: ["/images/ring-4.jpg"],
    featured: true,
    inStock: true,
  },
];

export const categories = [
  { id: "yuzuk", name: "Yuzukler" },
  { id: "kolye", name: "Kolyeler" },
  { id: "kupe", name: "Kupeler" },
  { id: "bileklik", name: "Bileklikler" },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(price);
}
`;

// Urun Detay Sayfasi - Blue Diamond tarzi
const urunDetayContent = \`import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
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
        {/* Breadcrumb */}
        <div className="text-sm text-stone-500 mb-6">
          <Link href="/" className="hover:text-stone-900">Anasayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/urunler" className="hover:text-stone-900">Urunler</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sol: Resim Galerisi */}
          <div className="space-y-4">
            <div className="aspect-square bg-stone-100 rounded-lg flex items-center justify-center relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 opacity-50" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button className="w-16 h-16 bg-white rounded border border-stone-200 flex items-center justify-center hover:border-stone-400">
                  <div className="w-10 h-10 rounded-full bg-stone-200" />
                </button>
                <button className="w-16 h-16 bg-white rounded border border-stone-200 flex items-center justify-center hover:border-stone-400">
                  <div className="w-10 h-10 rounded-full bg-stone-200" />
                </button>
                <button className="w-16 h-16 bg-white rounded border border-stone-200 flex items-center justify-center hover:border-stone-400">
                  <div className="w-10 h-10 rounded-full bg-stone-200" />
                </button>
                <button className="w-16 h-16 bg-white rounded border border-stone-200 flex items-center justify-center hover:border-stone-400 text-xs text-stone-500">
                  VIDEO
                </button>
              </div>
            </div>
          </div>

          {/* Sag: Urun Bilgileri */}
          <div>
            <p className="text-sm text-stone-500 mb-2">Urun kodu: {product.code}</p>
            <h1 className="font-playfair text-2xl font-bold text-stone-900 mb-4">{product.name}</h1>

            {/* Fiyat */}
            <div className="flex items-center gap-3 mb-6">
              {product.oldPrice && (
                <span className="text-lg text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>
              )}
              <span className="text-2xl font-bold text-stone-900">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
                  %{Math.round((1 - product.price / product.oldPrice) * 100)} indirim
                </span>
              )}
            </div>

            {/* Butonlar */}
            <div className="space-y-3 mb-6">
              <Button size="lg" className="w-full bg-stone-900 hover:bg-stone-800 text-white" disabled>
                SEPETE EKLE (Yakinda)
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorilere Ekle
                </Button>
                <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Paylas
                </Button>
              </div>
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Asistan
              </Button>
            </div>

            <Separator className="my-6 bg-stone-200" />

            {/* Sertifika Bilgileri */}
            <div className="mb-6">
              <h3 className="font-semibold text-stone-900 mb-3">Sertifika Bilgileri</h3>
              <p className="text-stone-600 mb-4">{product.weight} {product.purity} {product.material.split(" ").slice(-2).join(" ")}</p>

              {/* Tas Tablosu */}
              {product.stones.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-200">
                        <th className="text-left py-2 font-medium text-stone-600">Tas</th>
                        <th className="text-left py-2 font-medium text-stone-600">Adet</th>
                        <th className="text-left py-2 font-medium text-stone-600">Karat</th>
                        <th className="text-left py-2 font-medium text-stone-600">Renk</th>
                        <th className="text-left py-2 font-medium text-stone-600">Berraklik</th>
                        <th className="text-left py-2 font-medium text-stone-600">Sekil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.stones.map((stone, index) => (
                        <tr key={index} className="border-b border-stone-100">
                          <td className="py-2 text-stone-900">{stone.type}</td>
                          <td className="py-2 text-stone-900">{stone.count}</td>
                          <td className="py-2 text-stone-900">{stone.carat > 0 ? stone.carat.toFixed(2) : "-"}</td>
                          <td className="py-2 text-stone-900">{stone.color}</td>
                          <td className="py-2 text-stone-900">{stone.clarity}</td>
                          <td className="py-2 text-stone-900">{stone.shape}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <Separator className="my-6 bg-stone-200" />

            {/* Mucevher Hakkinda */}
            <div>
              <h3 className="font-semibold text-stone-900 mb-3">Mucevher Hakkinda</h3>
              <p className="text-stone-600 leading-relaxed">{product.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
\`;

// Dosyalari yaz
fs.writeFileSync('src/lib/products.ts', productsContent);
console.log('✓ products.ts updated with detailed info');

fs.writeFileSync('src/app/urun/[id]/page.tsx', urunDetayContent);
console.log('✓ urun/[id]/page.tsx updated with Blue Diamond style');

console.log('\\n✅ Urun verileri guncellendi!');
console.log('   - Gram, ayar, tas tablosu eklendi');
console.log('   - Indirimli fiyat gosterimi eklendi');
console.log('   - Mucevher hakkinda bolumu eklendi');
console.log('\\nTarayicida http://localhost:3000/urun/9 adresini kontrol et!');
`;

fs.writeFileSync('update-products.mjs', productsContent);
console.log('✓ products.ts updated');

fs.writeFileSync('src/app/urun/[id]/page.tsx', urunDetayContent);
console.log('✓ urun detail page updated');

console.log('\\nDone! Check http://localhost:3000/urun/9');

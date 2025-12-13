export type Stone = {
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
  hoverImage?: string; // Swarovski tarzı - elde/boyunda/kulakta duruş görseli
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
    images: ["/images/yuzuk-1-main.jpg", "/images/yuzuk-1-back.jpg", "/images/yuzuk-1-side.jpg"],
    hoverImage: "/images/yüzük1-1.png",
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
    images: ["/images/kolye-1.png"],
    hoverImage: "/images/kolye1-1.png",
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    code: "YA-KP-001",
    name: "0,40 Karat Pirlanta Kupe",
    description: "14 ayar sari altin uzerine toplam 0.40 karat pirlanta tasli kupe cifti.",
    about: "0,40 Karat Pirlanta Kupe, klasik ve zarif tasarimi ile her kombinle uyum saglar. Gunluk kullanim icin ideal, her ozel ana eslik edecek bir parca.",
    price: 18500,
    oldPrice: 22000,
    category: "kupe",
    categoryLabel: "Kupe",
    material: "14 Ayar Sari Altin",
    weight: "2.10 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pirlanta", count: 2, carat: 0.40, color: "G/H", clarity: "VS2", shape: "Yuvarlak" }
    ],
    images: ["/images/kupe-1.png"],
    hoverImage: "/images/küpe1-1.png",
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
    images: ["/images/bileklik-1.png"],
    hoverImage: "/images/bileklik1-1.png",
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

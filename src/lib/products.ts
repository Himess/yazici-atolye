export type Stone = {
  type: string;
  count: number;
  carat: number;
  color: string;
  clarity: string;
  shape: string;
};

export type GoldColor = "white" | "gold" | "rose";

export type ColorVariant = {
  color: GoldColor;
  label: string;
  available: boolean;
  images: string[];
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
  colorVariants: ColorVariant[];
  defaultColor: GoldColor;
};

export const products: Product[] = [
  {
    id: "1",
    code: "YA-TK-001",
    name: "0,50 Karat Pırlanta Tektaş Yüzük",
    description: "14 ayar sarı altın üzerine 0.50 karat pırlanta taşlı zarif tektaş yüzük.",
    about: "0,50 Karat Pırlanta Tektaş Yüzük, pırlantaların en saf halini yansıtan özel bir tasarımdır. Nişan ve söz törenleri için ideal olan bu yüzük, Favian Jewellery kalitesini üzerinde taşır.",
    price: 45000,
    oldPrice: 52000,
    category: "yuzuk",
    categoryLabel: "Yüzük",
    material: "14 Ayar Sarı Altın",
    weight: "2.80 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pırlanta", count: 1, carat: 0.50, color: "F/G", clarity: "VS1", shape: "Yuvarlak" }
    ],
    images: ["/images/yuzuk-1-main.jpg", "/images/yuzuk-1-back.jpg", "/images/yuzuk-1-side.jpg"],
    hoverImage: "/images/yüzük1-1.png",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    code: "YA-KL-001",
    name: "0,30 Karat Pırlanta Kolye",
    description: "18 ayar beyaz altın zincir üzerinde 0.30 karat pırlanta taşlı minimalist kolye.",
    about: "0,30 Karat Pırlanta Kolye, sadeliğin ve zarafetin mükemmel birleşimi. Günlük kullanım için ideal.",
    price: 28000,
    oldPrice: 32000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "18 Ayar Beyaz Altın",
    weight: "3.20 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Pırlanta", count: 1, carat: 0.30, color: "F/G", clarity: "VS2", shape: "Yuvarlak" }
    ],
    images: ["/images/kolye-1.png"],
    hoverImage: "/images/kolye1-1.png",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: [] },
      { color: "gold", label: "Sarı Altın", available: false, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "white",
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    code: "YA-KP-001",
    name: "0,40 Karat Pırlanta Küpe",
    description: "14 ayar sarı altın üzerine toplam 0.40 karat pırlanta taşlı küpe çifti.",
    about: "0,40 Karat Pırlanta Küpe, klasik ve zarif tasarımı ile her kombinle uyum sağlar. Günlük kullanım için ideal, her özel ana eşlik edecek bir parça.",
    price: 18500,
    oldPrice: 22000,
    category: "kupe",
    categoryLabel: "Küpe",
    material: "14 Ayar Sarı Altın",
    weight: "2.10 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pırlanta", count: 2, carat: 0.40, color: "G/H", clarity: "VS2", shape: "Yuvarlak" }
    ],
    images: ["/images/kupe-1.png"],
    hoverImage: "/images/küpe1-1.png",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    code: "YA-TK-002",
    name: "Zümrüt Taşlı El İşi Yüzük",
    description: "14 ayar altın üzerine doğal zümrüt taşlı el işi yüzük.",
    about: "Zümrüt Taşlı El İşi Yüzük, geleneksel Türk kuyumculuk sanatının modern bir yorumu. Her bir parça, usta ellerde özenle şekillenir.",
    price: 35000,
    oldPrice: 42000,
    category: "yuzuk",
    categoryLabel: "Yüzük",
    material: "14 Ayar Altın",
    weight: "3.60 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Zümrüt", count: 1, carat: 0.80, color: "Yeşil", clarity: "Doğal", shape: "Oval" },
      { type: "Pırlanta", count: 12, carat: 0.15, color: "F/G", clarity: "SI", shape: "Yuvarlak" }
    ],
    images: ["/images/ring-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: false,
    inStock: true,
  },
  {
    id: "5",
    code: "YA-KL-002",
    name: "Tatlı Su İncisi Kolye",
    description: "Gerçek tatlı su incileri ile hazırlanmış zarif kolye.",
    about: "Tatlı Su İncisi Kolye, doğal güzelliği en saf haliyle sunar. Her bir inci, özenle seçilmiş ve sıralanmıştır.",
    price: 8500,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "925 Ayar Gümüş",
    weight: "28.00 gr",
    purity: "925 Ayar",
    stones: [
      { type: "Tatlı Su İncisi", count: 45, carat: 0, color: "Beyaz", clarity: "AAA", shape: "Yuvarlak" }
    ],
    images: ["/images/necklace-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: [] },
      { color: "gold", label: "Sarı Altın", available: false, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "white",
    featured: false,
    inStock: true,
  },
  {
    id: "6",
    code: "YA-BL-001",
    name: "14 Ayar Altın Kelepçe Bileklik",
    description: "14 ayar altın modern kelepçe bileklik. Ayarlanabilir boyut.",
    about: "14 Ayar Altın Kelepçe Bileklik, modern çizgileri ile dikkat çeker. Ayarlanabilir yapısı sayesinde her bilek ölçüsüne uyum sağlar.",
    price: 22000,
    oldPrice: 26000,
    category: "bileklik",
    categoryLabel: "Bileklik",
    material: "14 Ayar Altın",
    weight: "8.20 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/bileklik-1.png"],
    hoverImage: "/images/bileklik1-1.png",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "7",
    code: "YA-KP-002",
    name: "0,40 Karat Pırlanta Küpe",
    description: "18 ayar beyaz altın üzerine toplam 0.40 karat pırlanta taşlı küpe çifti.",
    about: "0,40 Karat Pırlanta Küpe, her iki kulağınızda toplam 0.40 karat pırlanta ile göz kamaştırıcı bir görünüm sunar.",
    price: 32000,
    oldPrice: 38000,
    category: "kupe",
    categoryLabel: "Küpe",
    material: "18 Ayar Beyaz Altın",
    weight: "2.40 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Pırlanta", count: 2, carat: 0.40, color: "F/G", clarity: "VS1", shape: "Yuvarlak" }
    ],
    images: ["/images/earring-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: [] },
      { color: "gold", label: "Sarı Altın", available: false, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "white",
    featured: false,
    inStock: true,
  },
  {
    id: "8",
    code: "YA-TK-003",
    name: "Klasik Alyans Seti",
    description: "14 ayar altın klasik alyans seti. Özel günleriniz için.",
    about: "Klasik Alyans Seti, evliliğinizin simgesi olacak zamansız bir tasarım. İç kısımda isim ve tarih kazıma seçeneği mevcuttur.",
    price: 18000,
    category: "yuzuk",
    categoryLabel: "Yüzük",
    material: "14 Ayar Altın",
    weight: "6.00 gr (çift)",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/ring-3.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: false,
    inStock: true,
  },
  {
    id: "9",
    code: "YA-TK-004",
    name: "0,15 Karat Pırlanta Beştaş Yüzük",
    description: "8 ayar beyaz altın üzerine 5 adet pırlanta taşlı beştaş yüzük.",
    about: "0,15 Karat Pırlanta Beştaş Yüzük, pırlantanın göz alıcılığı ile harmanlanan çok özel bir yüzük modelidir. Genellikle evliliğin beşinci yılında eşlere hediye edilen yüzük tasarımı. Beş pırlantanın yan yana yer aldığı tasarım; sevgi, sadakat başta olmak üzere çok özel duygularla kadınların kendilerini çok daha iyi hissetmesini sağlıyor.",
    price: 12990,
    oldPrice: 28900,
    category: "yuzuk",
    categoryLabel: "Yüzük",
    material: "8 Ayar Beyaz Altın",
    weight: "1.40 gr",
    purity: "8 Ayar",
    stones: [
      { type: "Pırlanta", count: 5, carat: 0.15, color: "F/G", clarity: "SI", shape: "Yuvarlak" }
    ],
    images: ["/images/ring-4.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: [] },
      { color: "gold", label: "Sarı Altın", available: false, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "white",
    featured: true,
    inStock: true,
  },
  {
    id: "10",
    code: "YA-AL-001",
    name: "14 Ayar Altın Erkek Alyans",
    description: "14 ayar sarı altın klasik erkek alyans. Sade ve zarif tasarım.",
    about: "14 Ayar Altın Erkek Alyans, zamansız elegansını modern çizgilerle buluşturan özel bir parça. Comfort fit iç yapısı sayesinde gün boyu rahat kullanım sağlar. Üretimden direkt size ulaştırılan bu alyans, piyasa fiyatının çok altında sunulmaktadır.",
    price: 8500,
    oldPrice: 14500,
    category: "yuzuk",
    categoryLabel: "Alyans",
    material: "14 Ayar Sarı Altın",
    weight: "4.50 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/erkek-alyans-1.png", "/images/erkek-alyans-2.png", "/images/erkek-alyans-3.png"],
    hoverImage: "/images/erkek-alyans-hover.jpg",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "11",
    code: "YA-AL-002",
    name: "14 Ayar Altın Kadın Alyans",
    description: "14 ayar sarı altın ince ve zarif kadın alyans. Minimalist tasarım.",
    about: "14 Ayar Altın Kadın Alyans, incelik ve zarafetin simgesi. İnce profili ile her gün rahatlıkla takılabilir. Atölyemizde el işçiliğiyle üretilen bu alyans, büyük kuyumculara toptan satış yaptığımız aynı kalitede, ancak aracısız fiyatla sizlere sunulmaktadır.",
    price: 5500,
    oldPrice: 9500,
    category: "yuzuk",
    categoryLabel: "Alyans",
    material: "14 Ayar Sarı Altın",
    weight: "2.20 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/kadin-alyans-1.png", "/images/kadin-alyans-2.png", "/images/kadin-alyans-3.jpg"],
    hoverImage: "/images/kadin-alyans-hover.jpg",
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "12",
    code: "YA-KL-003",
    name: "Melek Kanadı Pırlanta Kolye",
    description: "18 ayar beyaz altın üzerine pırlanta taşlı melek kanadı motifli zarif kolye.",
    about: "Melek Kanadı Pırlanta Kolye, kanat detayları üzerinde ışıyan pırlantalarla göz kamaştırıcı bir görünüm sunar.",
    price: 32000,
    oldPrice: 38000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "18 Ayar Beyaz Altın",
    weight: "3.80 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Pırlanta", count: 28, carat: 0.35, color: "F/G", clarity: "VS1", shape: "Yuvarlak" }
    ],
    images: ["/images/kolye-melek-kanadi-1.jpg", "/images/kolye-melek-kanadi-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: ["/images/kolye-melek-kanadi-1.jpg", "/images/kolye-melek-kanadi-2.jpg"] },
      { color: "gold", label: "Sarı Altın", available: true, images: ["/images/kolye-melek-kanadi-gold-2.jpg", "/images/kolye-melek-kanadi-gold-1.jpg"] },
      { color: "rose", label: "Rose Gold", available: true, images: ["/images/kolye-melek-kanadi-rose-1.jpg", "/images/kolye-melek-kanadi-rose-2.jpg"] },
    ],
    defaultColor: "white",
    featured: true,
    inStock: true,
  },
  {
    id: "13",
    code: "YA-KL-004",
    name: "Üçlü Yonca Sedef Kolye",
    description: "18 ayar beyaz altın üzerine sedef taşlı üç yoncalı minimalist kolye.",
    about: "Üçlü Yonca Sedef Kolye, doğal sedefin ışıltısı ile zarif bir görünüm sunar.",
    price: 18500,
    oldPrice: 22000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "18 Ayar Beyaz Altın",
    weight: "4.20 gr",
    purity: "18 Ayar",
    stones: [
      { type: "Sedef", count: 3, carat: 0, color: "Beyaz", clarity: "AAA", shape: "Yonca" }
    ],
    images: ["/images/kolye-yonca-1.jpg", "/images/kolye-yonca-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: true, images: [] },
      { color: "gold", label: "Sarı Altın", available: false, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "white",
    featured: true,
    inStock: true,
  },
  {
    id: "14",
    code: "YA-KL-005",
    name: "Armut Kesim Pırlanta Kolye",
    description: "14 ayar sarı altın üzerine armut kesim pırlanta taşlı tektaş kolye.",
    about: "Armut Kesim Pırlanta Kolye, klasik armut kesimin zarafetini modern bir tasarımla buluşturur.",
    price: 42000,
    oldPrice: 48000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "14 Ayar Sarı Altın",
    weight: "2.90 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pırlanta", count: 1, carat: 0.50, color: "F/G", clarity: "VS1", shape: "Armut" }
    ],
    images: ["/images/kolye-armut-1.jpg", "/images/kolye-armut-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: true,
    inStock: true,
  },
  {
    id: "15",
    code: "YA-KL-006",
    name: "Baguette Kesim Pırlanta Kolye",
    description: "14 ayar sarı altın üzerine baguette kesim pırlanta taşlı modern kolye.",
    about: "Baguette Kesim Pırlanta Kolye, dikdörtgen kesimin keskin hatları ile çağdaş bir görünüm sunar.",
    price: 28000,
    oldPrice: 32000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "14 Ayar Sarı Altın",
    weight: "3.10 gr",
    purity: "14 Ayar",
    stones: [
      { type: "Pırlanta", count: 1, carat: 0.40, color: "F/G", clarity: "VS2", shape: "Baguette" }
    ],
    images: ["/images/kolye-baguette-1.jpg", "/images/kolye-baguette-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: false,
    inStock: true,
  },
  {
    id: "16",
    code: "YA-KL-007",
    name: "İkili Üçgen Sarkıtlı Kolye",
    description: "14 ayar sarı altın ikili üçgen sarkıtlı modern lariat kolye.",
    about: "İkili Üçgen Sarkıtlı Kolye, geometrik çizgileri ile dikkat çeken modern bir tasarım.",
    price: 15500,
    oldPrice: 18000,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "14 Ayar Sarı Altın",
    weight: "3.50 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/kolye-ucgen-1.jpg", "/images/kolye-ucgen-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: false,
    inStock: true,
  },
  {
    id: "17",
    code: "YA-KL-008",
    name: "Damla Formlu Altın Kolye",
    description: "14 ayar sarı altın damla formlu minimalist kolye.",
    about: "Damla Formlu Altın Kolye, sade ve zarif tasarımı ile her tarza uyum sağlar.",
    price: 12000,
    oldPrice: 14500,
    category: "kolye",
    categoryLabel: "Kolye",
    material: "14 Ayar Sarı Altın",
    weight: "2.40 gr",
    purity: "14 Ayar",
    stones: [],
    images: ["/images/kolye-damla-1.jpg", "/images/kolye-damla-2.jpg"],
    colorVariants: [
      { color: "white", label: "Beyaz Altın", available: false, images: [] },
      { color: "gold", label: "Sarı Altın", available: true, images: [] },
      { color: "rose", label: "Rose Gold", available: false, images: [] },
    ],
    defaultColor: "gold",
    featured: false,
    inStock: true,
  },
];

export const categories = [
  { id: "yuzuk", name: "Yüzükler" },
  { id: "kolye", name: "Kolyeler" },
  { id: "kupe", name: "Küpeler" },
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

export function formatProductName(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      const upper = word.toLocaleUpperCase("tr-TR");
      if (word.length >= 2 && word === upper) return word;
      const first = word.charAt(0).toLocaleUpperCase("tr-TR");
      const rest = word.slice(1).toLocaleLowerCase("tr-TR");
      return first + rest;
    })
    .join(" ");
}

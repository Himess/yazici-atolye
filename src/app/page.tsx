"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { HeroSlider } from "@/components/hero-slider";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Sparkles, Gem, Star, Facebook, Instagram, Youtube } from "lucide-react";

const faqs = [
  {
    question: "Ürünlerinizde hangi malzemeler kullanılıyor?",
    answer: "Tüm ürünlerimizde 14K ve 18K saf altın, 925 ayar gümüş ve GIA sertifikalı pırlantalar kullanıyoruz. Her parçamız kalite garantilidir.",
  },
  {
    question: "Kargo ve teslimat ne kadar sürüyor?",
    answer: "Siparişleriniz 1-2 iş günü içinde kargoya verilir. İstanbul içi 1 gün, Türkiye geneli 2-3 gün içerisinde teslim edilir. 500 TL üstü siparişlerde kargo ücretsizdir.",
  },
  {
    question: "İade ve değişim politikanız nedir?",
    answer: "14 gün içerisinde koşulsuz iade veya değişim yapabilirsiniz. Ürün orijinal kutusunda ve kullanılmamış olmalıdır.",
  },
  {
    question: "Özel tasarım sipariş verebilir miyim?",
    answer: "Evet! Özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz. Size özel, tek ve benzersiz parçalar tasarlıyoruz.",
  },
];

// Alt satır (2'li grid)
const collectionImages = [
  { name: "Yeni Gelenler", image: "/images/atolye-usta-1.png", href: "/urunler?siralama=yeni" },
  { name: "Çok Satanlar", image: "/images/atolye-3.png", href: "/urunler?siralama=cok-satan" },
];

type Testimonial = {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  order: number;
  isActive: boolean;
  createdAt: string;
};

type CategoryData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  order: number;
  isActive: boolean;
};

type SettingsData = {
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  [key: string]: string | undefined;
};

type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  code: string;
  description: string;
  about?: string;
  price: number;
  oldPrice?: number;
  category: string;
  categoryLabel: string;
  material: string;
  weight: string;
  purity: string;
  images: string | string[];
  hoverImage?: string;
  featured: boolean;
  inStock: boolean;
  [key: string]: unknown;
};

function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  const images = typeof apiProduct.images === "string"
    ? JSON.parse(apiProduct.images)
    : apiProduct.images;

  return {
    id: apiProduct.id,
    code: apiProduct.code || "",
    name: apiProduct.name,
    description: apiProduct.description || "",
    about: apiProduct.about || "",
    price: apiProduct.price,
    oldPrice: apiProduct.oldPrice || undefined,
    category: apiProduct.category as Product["category"],
    categoryLabel: apiProduct.categoryLabel || "",
    material: apiProduct.material || "",
    weight: apiProduct.weight || "",
    purity: apiProduct.purity || "",
    stones: [],
    images: Array.isArray(images) ? images : [],
    hoverImage: apiProduct.hoverImage || (Array.isArray(images) && images.length > 1 ? images[1] : undefined),
    featured: apiProduct.featured,
    inStock: apiProduct.inStock,
    colorVariants: [],
    defaultColor: "gold",
  };
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i <= rating ? "text-gold fill-gold" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="pt-4 pb-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

function SkeletonCategory() {
  return (
    <div className="animate-pulse aspect-square bg-gray-200" />
  );
}

function SkeletonTestimonial() {
  return (
    <div className="flex-shrink-0 w-72 snap-start bg-white border border-border p-5 animate-pulse">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="space-y-1">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/4 mt-3" />
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [categoryImages, setCategoryImages] = useState<CategoryData[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [ringProducts, setRingProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SettingsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [testimonialsRes, categoriesRes, featuredRes, ringsRes, settingsRes] = await Promise.all([
          fetch("/api/testimonials").then((r) => r.ok ? r.json() : []),
          fetch("/api/categories").then((r) => r.ok ? r.json() : []),
          fetch("/api/products?featured=true&limit=4").then((r) => r.ok ? r.json() : []),
          fetch("/api/products?category=yuzuk&limit=4").then((r) => r.ok ? r.json() : []),
          fetch("/api/settings").then((r) => r.ok ? r.json() : {}),
        ]);

        // Testimonials - filter active and sort by order
        const activeTestimonials = Array.isArray(testimonialsRes)
          ? testimonialsRes.filter((t: Testimonial) => t.isActive).sort((a: Testimonial, b: Testimonial) => a.order - b.order)
          : [];
        setTestimonials(activeTestimonials);

        // Categories - filter active and sort by order
        const activeCategories = Array.isArray(categoriesRes)
          ? categoriesRes.filter((c: CategoryData) => c.isActive).sort((a: CategoryData, b: CategoryData) => a.order - b.order)
          : [];
        setCategoryImages(activeCategories);

        // Featured products
        const featuredArray = Array.isArray(featuredRes) ? featuredRes : (featuredRes?.products || []);
        setFeaturedProducts(featuredArray.map(mapApiProductToProduct));

        // Ring products
        const ringsArray = Array.isArray(ringsRes) ? ringsRes : (ringsRes?.products || []);
        setRingProducts(ringsArray.map(mapApiProductToProduct));

        // Settings
        setSettings(settingsRes || {});
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(2)
    : "5.00";

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialRef.current) {
      const scrollAmount = 320;
      testimonialRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Social media URLs from settings, with fallbacks
  const facebookUrl = settings.facebookUrl || "https://facebook.com/yaziciatolye";
  const instagramUrl = settings.instagramUrl || "https://instagram.com/yaziciatolye";
  const youtubeUrl = settings.youtubeUrl || "https://youtube.com/@yaziciatolye";
  const tiktokUrl = settings.tiktokUrl || "https://tiktok.com/@yaziciatolye";

  return (
    <div className="flex flex-col">
      {/* Hero Slider */}
      <HeroSlider />

      {/* ÖZEL KOLEKSİYON BAŞLIK */}
      <section className="py-16 md:py-20 bg-cream text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-dark uppercase">
          ÖZEL KOLEKSİYONLARIMIZ
        </h2>
        <p className="mt-4 text-muted-foreground font-sans text-base md:text-lg max-w-2xl mx-auto px-4">
          40 yıllık ustalıkla, atölyemizden sizlere özel tasarımlar
        </p>
      </section>

      {/* KOLEKSİYON RESİM 1 — Sticky Scroll (2 ekran boyunca sabit kalır) */}
      <div style={{ height: "250vh" }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Image
            src="/images/kuyumcu-1.jpeg"
            alt="Yazıcı Atölye Koleksiyon 1"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Aşağı kaydırma oku */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-white/80 text-xs font-sans tracking-widest uppercase mb-2">Kaydır</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* KOLEKSİYON RESİM 2 — Sticky Scroll (2 ekran boyunca sabit kalır) */}
      <div style={{ height: "250vh" }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Image
            src="/images/kuyumcu-2.jpeg"
            alt="Yazıcı Atölye Koleksiyon 2"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Öne Çıkan Ürünler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">ÖNE ÇIKAN ÜRÜNLER</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : null}
          </div>

          <div className="text-center mt-10">
            <Link href="/urunler" className="btn-primary inline-block">
              Tüm Ürünleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* ADIM 6: İlham / Marka Mesajı Bölümü */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-serif italic text-lg md:text-xl text-foreground leading-relaxed">
            &ldquo;Her parça bir hikaye anlatır. 40 yılı aşkın tecrübemizle, atölyemizden
            çıkan her mücevher, sevgiyle işlenmiş bir sanat eseridir. Kaliteyi hissedin,
            zarafeti yaşayın.&rdquo;
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-8" />
          <p className="mt-6 text-sm text-muted-foreground font-sans tracking-wider uppercase">
            — Yazıcı Atölye
          </p>
        </div>
      </section>

      {/* Yüzükler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">YÜZÜKLER</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : ringProducts.length > 0 ? (
              ringProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : null}
          </div>

          <div className="text-center mt-10">
            <Link href="/urunler?kategori=yuzuk" className="btn-outline inline-block">
              Tüm Yüzükleri Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/kolye1-1.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl mb-4">Her Gün Işılda</p>
          <p className="text-sm tracking-wider mb-6 max-w-md font-sans">
            Eşsiz koleksiyonumuzu keşfedin
          </p>
          <Link href="/urunler" className="btn-primary inline-block">
            Hemen Alışverişe Başla
          </Link>
        </div>
      </section>

      {/* Güven İkonları */}
      <section className="py-12 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="trust-icon">
              <Heart className="w-8 h-8 text-gold" />
              <h3 className="font-serif text-lg mb-2">Sevgiyle El Yapımı</h3>
              <p className="text-sm text-muted-foreground font-sans">
                Her parça, uzman ustalarımız tarafından özenle el işçiliğiyle üretilir.
              </p>
            </div>
            <div className="trust-icon">
              <Sparkles className="w-8 h-8 text-gold" />
              <h3 className="font-serif text-lg mb-2">Alerjik Değil ve Hafif</h3>
              <p className="text-sm text-muted-foreground font-sans">
                Cildinize zarar vermez, gün boyu rahatlıkla takabilirsiniz.
              </p>
            </div>
            <div className="trust-icon">
              <Gem className="w-8 h-8 text-gold" />
              <h3 className="font-serif text-lg mb-2">Doğal Taşlar</h3>
              <p className="text-sm text-muted-foreground font-sans">
                Sertifikalı doğal taşlar ve pırlantalar kullanıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADIM 7: Müşteri Yorumları — Yıldızlı Kartlar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">MÜŞTERİ YORUMLARI</h2>

          {/* Genel Puan */}
          <div className="text-center mb-10">
            <StarRating rating={5} size="lg" />
            <p className="text-2xl font-serif font-bold mt-2">{avgRating}</p>
            <p className="text-sm text-muted-foreground font-sans">Mükemmel — {testimonials.length} Değerlendirme</p>
          </div>

          {/* Yorum Slider */}
          <div className="relative">
            <button
              onClick={() => scrollTestimonials("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-cream transition-colors hidden md:flex"
              aria-label="Önceki yorumlar"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={testimonialRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Sol büyük puan kartı */}
              <div className="flex-shrink-0 w-64 snap-start bg-cream p-6 flex flex-col items-center justify-center text-center">
                <StarRating rating={5} size="lg" />
                <p className="text-3xl font-serif font-bold mt-3">{avgRating}</p>
                <p className="text-sm font-serif font-bold mt-1">Mükemmel</p>
                <p className="text-xs text-muted-foreground mt-2 font-sans">{testimonials.length} Değerlendirme</p>
              </div>

              {/* Yorum kartları */}
              {loading ? (
                <>
                  <SkeletonTestimonial />
                  <SkeletonTestimonial />
                  <SkeletonTestimonial />
                </>
              ) : (
                testimonials.map((testimonial, index) => (
                  <div key={testimonial.id || index} className="flex-shrink-0 w-72 snap-start bg-white border border-border p-5">
                    <div className="flex items-center justify-between mb-3">
                      <StarRating rating={testimonial.rating} />
                      {testimonial.verified && (
                        <span className="text-[10px] text-blue-500 font-sans flex items-center gap-1">
                          ✓ Doğrulanmış
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 font-sans">{testimonial.date}</p>
                    <h4 className="font-sans font-semibold text-sm mb-2">{testimonial.title}</h4>
                    <p className="text-sm text-muted-foreground font-sans line-clamp-3">{testimonial.comment}</p>
                    <p className="text-xs text-foreground font-sans font-medium mt-3">— {testimonial.name}</p>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => scrollTestimonials("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-cream transition-colors hidden md:flex"
              aria-label="Sonraki yorumlar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="section-title mb-4">SIKÇA SORULAN SORULAR</h2>
          <p className="text-center text-muted-foreground mb-10 font-sans">
            Herhangi bir sorunuz varsa, SSS bölümümüze başvurun
          </p>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-left pr-4 font-sans">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="faq-answer font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üretimden Sizlere */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-4">ÜRETİMDEN SİZLERE</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto font-sans">
            40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz.
            Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image src="/images/atolye-usta-1.png" alt="Atölye Ustamız" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">40 Yıllık Tecrübe</h3>
                <p className="text-sm text-white/80 font-sans">Usta ellerden, özenle işlenen parçalar</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image src="/images/atolye-3.png" alt="El İşçiliği" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">El İşçiliği</h3>
                <p className="text-sm text-white/80 font-sans">Her parça, tek tek elle üretilir</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden group">
              <Image src="/images/atolye-4.png" alt="Kalite Kontrol" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif text-lg mb-1">Kalite Garantisi</h3>
                <p className="text-sm text-white/80 font-sans">Sertifikalı malzeme, titiz işçilik</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/hakkimizda" className="btn-outline inline-block">
              Hikayemizi Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* ADIM 8: BİZİ TAKİP EDİN */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title mb-10">BİZİ TAKİP EDİN</h2>

          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.18z"/>
              </svg>
            </a>
          </div>

          {/* Instagram Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-beige overflow-hidden group"
              >
                <Image
                  src={`/images/instagram-${i}.jpg`}
                  alt={`Instagram ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

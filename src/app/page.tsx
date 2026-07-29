"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { VideoHero } from "@/components/video-hero";
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Sparkles, Gem, Star, Facebook, Instagram, Youtube } from "lucide-react";

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
  priceOnRequest?: boolean;
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
    priceOnRequest: apiProduct.priceOnRequest === true,
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
    <div className="flex items-center justify-center gap-0.5">
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

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-8 h-8 text-gold" />,
  Sparkles: <Sparkles className="w-8 h-8 text-gold" />,
  Gem: <Gem className="w-8 h-8 text-gold" />,
};

const defaultFaqs = [
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

const defaultGuvenItems = [
  { icon: "Heart", title: "Sevgiyle El Yapımı", description: "Her parça, uzman ustalarımız tarafından özenle el işçiliğiyle üretilir." },
  { icon: "Sparkles", title: "Alerjik Değil ve Hafif", description: "Cildinize zarar vermez, gün boyu rahatlıkla takabilirsiniz." },
  { icon: "Gem", title: "Doğal Taşlar", description: "Sertifikalı doğal taşlar ve pırlantalar kullanıyoruz." },
];

const defaultUretimItems = [
  { image: "/images/atolye-3.png", title: "El İşçiliği", description: "Her parça, tek tek elle üretilir" },
  { image: "/images/atolye-4.png", title: "Kalite Garantisi", description: "Sertifikalı malzeme, titiz işçilik" },
];

// Sitede gerçekten var olan görseller — instagram-1..6.jpg dosyaları hiç
// yüklenmemişti ve grid kırık görünüyordu. Admin > İçerikler'den değiştirilebilir.
const defaultInstagramImages = [
  "/images/yuzuk-1-main.jpg",
  "/images/kolye-yonca-1.jpg",
  "/images/kupe-1.png",
  "/images/bileklik-1.png",
  "/images/kolye-melek-kanadi-gold-1.jpg",
  "/images/kadin-alyans-1.png",
];

/**
 * Instagram grid karesi.
 *
 * Görseller admin > İçerikler'den yönetiliyor ve DB'de silinmiş/yanlış bir dosya
 * yolu kalabiliyor (nitekim kaldı: /images/instagram-1..6.jpg hiç yüklenmemişti).
 * Bu durumda kırık görsel yerine sitede kesin var olan bir görsele düşülür,
 * böylece admin yanlış URL girse de grid bozulmuş görünmez.
 */
function InstagramTile({
  src,
  index,
  href,
}: {
  src: string;
  index: number;
  href: string;
}) {
  const [failed, setFailed] = useState(false);
  const finalSrc = failed ? defaultInstagramImages[index % defaultInstagramImages.length] : src;
  const isRemote = finalSrc.startsWith("http");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square bg-beige overflow-hidden group"
    >
      {isRemote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={finalSrc}
          alt={`Instagram ${index + 1}`}
          onError={() => setFailed(true)}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <Image
          src={finalSrc}
          alt={`Instagram ${index + 1}`}
          fill
          sizes="(max-width: 768px) 33vw, 16vw"
          onError={() => setFailed(true)}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
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
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [testimonialsRes, categoriesRes, featuredRes, ringsRes, settingsRes, contentRes] = await Promise.all([
          fetch("/api/testimonials").then((r) => r.ok ? r.json() : []),
          fetch("/api/categories").then((r) => r.ok ? r.json() : []),
          fetch("/api/products?featured=true&limit=4").then((r) => r.ok ? r.json() : []),
          fetch("/api/products?category=yuzuk&limit=4").then((r) => r.ok ? r.json() : []),
          fetch("/api/settings").then((r) => r.ok ? r.json() : {}),
          fetch("/api/content?page=anasayfa").then((r) => r.ok ? r.json() : {}),
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

        // Content
        setContent(contentRes || {});
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Parse JSON content sections with useMemo to avoid re-parsing on every render
  const faqItems = useMemo(() => {
    try {
      const parsed = JSON.parse(content.faq?.items || "[]");
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultFaqs;
    } catch {
      return defaultFaqs;
    }
  }, [content.faq?.items]);

  const guvenItems = useMemo(() => {
    try {
      const parsed = JSON.parse(content.guven?.items || "[]");
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultGuvenItems;
    } catch {
      return defaultGuvenItems;
    }
  }, [content.guven?.items]);

  const uretimItems = useMemo(() => {
    try {
      const parsed = JSON.parse(content.uretim?.items || "[]");
      const items = Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultUretimItems;
      return items.filter(
        (item: { image?: string; description?: string }) =>
          item.image !== "/images/atolye-usta-1.png" &&
          !(item.description || "").includes("Usta ellerden")
      );
    } catch {
      return defaultUretimItems;
    }
  }, [content.uretim?.items]);

  const instagramImages = useMemo(() => {
    try {
      const parsed = JSON.parse(content.instagram?.items || "[]");
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultInstagramImages;
    } catch {
      return defaultInstagramImages;
    }
  }, [content.instagram?.items]);

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
  const facebookUrl = settings.facebookUrl || "https://facebook.com/favianjewellery";
  const instagramUrl = settings.instagramUrl || "https://instagram.com/favian.jewellery";
  const youtubeUrl = settings.youtubeUrl || "https://youtube.com/@favianjewellery";
  const tiktokUrl = settings.tiktokUrl || "https://tiktok.com/@favianjewellery";

  // Dynamic content values with fallbacks
  const stickyImage = content.sticky?.image || "/images/kuyumcu-1.jpeg";
  const bannerImage = content.banner?.image || "/images/kolye1-1.png";
  const uretimTitle = content.uretim?.title || "ÜRETİMDEN SİZLERE";

  return (
    <div className="flex flex-col">
      {/* Hero Video */}
      <VideoHero />

      {/* ALIŞVERİŞ KATEGORİLERİ */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Alışveriş Kategorileri</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <>
                <SkeletonCategory />
                <SkeletonCategory />
                <SkeletonCategory />
                <SkeletonCategory />
              </>
            ) : categoryImages.length > 0 ? (
              categoryImages.map((cat) => (
                <Link key={cat.id} href={`/urunler?kategori=${cat.slug}`} className="group relative aspect-square overflow-hidden bg-beige">
                  {cat.image && (cat.image.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ))}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <span className="font-script text-2xl md:text-3xl text-white drop-shadow-lg">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              ))
            ) : null}
          </div>
        </div>
      </section>

      {/* KOLEKSİYON RESİM — Sticky Scroll */}
      <div style={{ height: "200vh" }} className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {stickyImage.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={stickyImage}
              alt="Favian Jewellery Koleksiyon"
              className="object-cover w-full h-full"
            />
          ) : (
            <Image
              src={stickyImage}
              alt="Favian Jewellery Koleksiyon"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          {/* CTA Butonu */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <Link
              href="/urunler?kategori=kolye"
              className="bg-gold text-white px-10 py-4 text-sm md:text-base tracking-[0.2em] uppercase font-sans font-bold shadow-lg hover:bg-dark transition-colors md:translate-x-80 lg:translate-x-[28rem] xl:translate-x-[40rem]"
            >
              Koleksiyonları Keşfet
            </Link>
          </div>
          {/* Aşağı kaydırma oku */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-white/80 text-xs font-sans tracking-widest uppercase mb-2">Kaydır</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Öne Çıkan Ürünler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Öne Çıkan Ürünler</h2>

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

      {/* Yüzükler */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">Yüzükler</h2>

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
          style={{ backgroundImage: `url('${bannerImage}')` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl mb-4">{content.banner?.title || "Her Gün Işılda"}</p>
          <p className="text-sm tracking-wider mb-6 max-w-md font-sans">
            {content.banner?.subtitle || "Eşsiz koleksiyonumuzu keşfedin"}
          </p>
          <Link href={content.banner?.buttonUrl || "/urunler"} className="btn-primary inline-block">
            {content.banner?.buttonText || "Hemen Alışverişe Başla"}
          </Link>
        </div>
      </section>

      {/* Güven İkonları */}
      <section className="py-12 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guvenItems.map((item: { icon: string; title: string; description: string }, index: number) => (
              <div key={index} className="trust-icon">
                {iconMap[item.icon] || <Heart className="w-8 h-8 text-gold" />}
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADIM 7: Müşteri Yorumları — Yıldızlı Kartlar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">Müşteri Yorumları</h2>

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
          <h2 className="section-title mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-center text-muted-foreground mb-10 font-sans">
            Herhangi bir sorunuz varsa, SSS bölümümüze başvurun
          </p>

          <div className="space-y-0">
            {faqItems.map((faq: { question: string; answer: string }, index: number) => (
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
          <h2 className="section-title mb-10">{uretimTitle}</h2>

          <div className={`grid grid-cols-1 gap-6 ${uretimItems.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 max-w-4xl mx-auto'}`}>
            {uretimItems.map((item: { image: string; title: string; description: string }, index: number) => (
              <div key={index} className="relative aspect-[4/3] overflow-hidden group">
                {item.image.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg mb-1 text-white drop-shadow-md">{item.title}</h3>
                  <p className="text-sm text-white/90 font-sans drop-shadow-md">{item.description}</p>
                </div>
              </div>
            ))}
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
          <h2 className="section-title mb-10">Bizi Takip Edin</h2>

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
            {instagramImages.map((imgSrc: string, i: number) => (
              <InstagramTile
                key={`${imgSrc}-${i}`}
                src={imgSrc}
                index={i}
                href={instagramUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

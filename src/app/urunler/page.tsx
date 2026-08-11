"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/product-card-skeleton";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  order: number;
  isActive: boolean;
};

function isAlyansProduct(product: Product) {
  return (
    product.category === "yuzuk" &&
    `${product.name} ${product.categoryLabel}`.toLocaleLowerCase("tr-TR").includes("alyans")
  );
}

function UrunlerContent() {
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get("kategori");
  const aramaParam = searchParams.get("arama");
  const indirimliParam = searchParams.get("indirimli");
  const siralamaParam = searchParams.get("siralama");
  const tipParam = searchParams.get("tip");

  const [selectedCategory, setSelectedCategory] = useState(kategoriParam || "all");
  const [sortBy, setSortBy] = useState(siralamaParam || "default");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setSelectedCategory(kategoriParam || "all");
  }, [kategoriParam]);

  useEffect(() => {
    setSortBy(siralamaParam || "default");
  }, [siralamaParam]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setFetchError(false);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("API error");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        // Map API products to match Product type expected by ProductCard
        const mappedProducts: Product[] = productsData.map((p: Record<string, unknown>) => ({
          ...p,
          id: String(p.id),
          code: p.code || "",
          description: p.description || "",
          about: p.about || "",
          category: p.category || "",
          categoryLabel: p.categoryLabel || "",
          material: p.material || "",
          weight: p.weight || "",
          purity: p.purity || "",
          stones: Array.isArray(p.stones) ? p.stones : [],
          images: Array.isArray(p.images) ? p.images : [],
          hoverImage: p.hoverImage || undefined,
          colorVariants: Array.isArray(p.colorVariants) ? p.colorVariants : [],
          defaultColor: p.defaultColor || "gold",
          featured: Boolean(p.featured),
          inStock: p.inStock !== false,
        }));

        setProducts(mappedProducts);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Veri yüklenirken hata:", err);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  let filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((p) =>
        p.category === selectedCategory &&
        (selectedCategory !== "yuzuk" || !isAlyansProduct(p))
      );

  if (aramaParam) {
    const query = aramaParam.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  if (indirimliParam === "true") {
    filteredProducts = filteredProducts.filter((p) => p.oldPrice);
  }

  if (tipParam === "alyans") {
    filteredProducts = products.filter(isAlyansProduct);
  } else if (tipParam === "pirlanta") {
    filteredProducts = filteredProducts.filter((p) =>
      `${p.name} ${p.description} ${p.material}`.toLocaleLowerCase("tr-TR").includes("pirlanta") ||
      `${p.name} ${p.description} ${p.material}`.toLocaleLowerCase("tr-TR").includes("pırlanta")
    );
  }

  // Sıralama
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "fiyat-artan":
        return a.price - b.price;
      case "fiyat-azalan":
        return b.price - a.price;
      case "yeni":
        return b.id.localeCompare(a.id);
      case "cok-satan":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  const categoryName = selectedCategory === "all"
    ? "Tüm Ürünler"
    : categories.find(c => c.slug === selectedCategory)?.name || "Takılar";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol Sidebar - Filtreler */}
        <aside className={`lg:w-56 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
          <h3 className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-4">KATEGORİLER</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-sm font-sans w-full text-left py-1.5 transition-colors ${
                  selectedCategory === "all" ? "text-gold font-semibold" : "text-foreground hover:text-gold"
                }`}
              >
                Tüm Ürünler
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`text-sm font-sans w-full text-left py-1.5 transition-colors ${
                    selectedCategory === cat.slug ? "text-gold font-semibold" : "text-foreground hover:text-gold"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>

          {indirimliParam === "true" && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-2 text-gold">
                İNDİRİMLİ ÜRÜNLER
              </p>
            </div>
          )}
        </aside>

        {/* Sağ - Ürünler */}
        <div className="flex-1">
          {/* Üst Bar: Sonuç sayısı + Sıralama */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-1 text-sm font-sans text-foreground"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtreler
              </button>
              <p className="text-sm text-muted-foreground font-sans">
                {sortedProducts.length} ürün
              </p>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-sans bg-transparent border border-border px-3 py-2 focus:outline-none focus:border-gold"
            >
              <option value="default">Varsayılan</option>
              <option value="fiyat-artan">Fiyat: Düşük - Yüksek</option>
              <option value="fiyat-azalan">Fiyat: Yüksek - Düşük</option>
              <option value="yeni">En Yeni</option>
              <option value="cok-satan">Popüler</option>
            </select>
          </div>

          {aramaParam && (
            <div className="mb-6">
              <p className="text-muted-foreground font-sans">
                &quot;{aramaParam}&quot; için {sortedProducts.length} sonuç bulundu
              </p>
            </div>
          )}

          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : fetchError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4 font-sans">
                Ürünler yüklenirken bir hata oluştu.
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="font-sans"
              >
                Tekrar Dene
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4 font-sans">
                    Bu kategoride ürün bulunamadı.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory("all")}
                    className="font-sans"
                  >
                    Tüm Ürünleri Gör
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UrunlerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb + Başlık */}
      <div className="bg-cream border-b border-border py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-sans">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Takılar</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Ürünlerimiz
          </h1>
          <p className="text-muted-foreground mt-2 font-sans">
            El yapımı, özenle tasarlanmış koleksiyonumuz
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8"><ProductGridSkeleton count={8} /></div>}>
        <UrunlerContent />
      </Suspense>
    </div>
  );
}

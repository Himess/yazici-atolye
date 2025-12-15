"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useFavorites } from "@/lib/favorites-context";
import { useSearch } from "@/lib/search-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";
import { formatPrice } from "@/lib/products";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  Package,
  Shield,
  X,
} from "lucide-react";

const categories = [
  { name: "Pirlanta Yuzukler", href: "/urunler?kategori=yuzuk&tip=pirlanta" },
  { name: "Pirlanta Kolyeler", href: "/urunler?kategori=kolye&tip=pirlanta" },
  { name: "Pirlanta Kupeler", href: "/urunler?kategori=kupe&tip=pirlanta" },
  { name: "Pirlanta Bileklikler", href: "/urunler?kategori=bileklik&tip=pirlanta" },
  { name: "Alyanslar", href: "/urunler?kategori=yuzuk&tip=alyans" },
  { name: "Tektas Yuzukler", href: "/urunler?kategori=yuzuk&tip=tektas" },
  { name: "Bestas Yuzukler", href: "/urunler?kategori=yuzuk&tip=bestas" },
];

const subMenuItems = [
  { name: "Cok Satanlar", href: "/urunler?siralama=cok-satan" },
  { name: "Yeni Gelenler", href: "/urunler?siralama=yeni" },
  { name: "Hediye Onerileri", href: "/urunler?koleksiyon=hediye" },
  { name: "Ozel Firsatlar", href: "/urunler?indirimli=true" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen } = useAuth();
  const { favorites } = useFavorites();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        clearSearch();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearSearch]);

  return (
    <>
      {/* Ust Bar - Kampanya / Bilgi */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Package className="w-4 h-4" aria-hidden="true" />
              Ucretsiz Kargo
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" aria-hidden="true" />
              Sigortali Teslimat
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-medium">
              Yilbasi Firsatlari Basladi!{" "}
              <span className="text-accent">%20 Indirim</span>
            </span>
          </div>
          <div className="hidden sm:block">
            <Link
              href="/iletisim"
              className="hover:text-accent transition-colors"
            >
              Siparis Takibi
            </Link>
          </div>
        </div>
      </div>

      {/* Ana Header */}
      <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
        {/* Logo + Arama + Ikonlar */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo-dark.png"
                alt="Yazici Atolye"
                width={160}
                height={64}
                className="h-12 md:h-16 w-auto"
                priority
              />
            </Link>

            {/* Arama - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Urun kodu ya da urun adi yaziniz"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  aria-label="Urun ara"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label="Ara"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Arama Sonuclari */}
              {isSearching && searchResults.length > 0 && (
                <div
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
                >
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground px-3 py-2">
                      {searchResults.length} urun bulundu
                    </p>
                    {searchResults.slice(0, 5).map((product) => (
                      <Link
                        key={product.id}
                        href={`/urun/${product.id}`}
                        onClick={() => clearSearch()}
                        className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors"
                      >
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.code}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <Link
                        href={`/urunler?arama=${encodeURIComponent(searchQuery)}`}
                        onClick={() => clearSearch()}
                        className="block text-center text-sm text-primary hover:underline py-3"
                      >
                        Tum sonuclari gor ({searchResults.length})
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {isSearching && searchResults.length === 0 && searchQuery.length > 2 && (
                <div
                  ref={searchResultsRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-50"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    &quot;{searchQuery}&quot; icin sonuc bulunamadi
                  </p>
                </div>
              )}
            </div>

            {/* Sag Ikonlar */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Arama - Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Ara"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Kullanici */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title={user ? user.name : "Giris Yap"}
                aria-label={user ? `Hesabim: ${user.name}` : "Giris Yap"}
              >
                {user ? (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>

              {/* Favoriler */}
              <Link
                href="/favoriler"
                className="hidden sm:block p-2 text-muted-foreground hover:text-primary transition-colors relative"
                aria-label={`Favoriler (${favorites.length} urun)`}
              >
                <Heart className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Sepet */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors relative"
                aria-label={`Sepet (${totalItems} urun)`}
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-primary"
                    aria-label="Menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] bg-background overflow-y-auto"
                >
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary"
                    >
                      Ana Sayfa
                    </Link>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Kategoriler
                      </p>
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Kesfet
                      </p>
                      {subMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-border pt-4">
                      <Link
                        href="/favoriler"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-foreground hover:text-primary"
                      >
                        Favorilerim ({favorites.length})
                      </Link>
                      <Link
                        href="/hakkimizda"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-foreground hover:text-primary"
                      >
                        Hakkimizda
                      </Link>
                      <Link
                        href="/iletisim"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-foreground hover:text-primary"
                      >
                        Iletisim
                      </Link>
                    </div>

                    <Button className="mt-4 w-full bg-primary hover:bg-accent hover:text-accent-foreground text-primary-foreground">
                      <Link href="/iletisim">Randevu Al</Link>
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Arama - Acilir */}
          {isSearchOpen && (
            <div className="md:hidden mt-3 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Urun ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                  autoFocus
                  aria-label="Urun ara"
                />
                <button
                  onClick={() => {
                    clearSearch();
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Aramayı kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Arama Sonuclari */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      href={`/urun/${product.id}`}
                      onClick={() => {
                        clearSearch();
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-muted border-b border-border last:border-0"
                    >
                      <div className="w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                        {product.images[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Kategori Menusu - Desktop */}
        <nav className="hidden lg:block border-t border-border" aria-label="Kategori navigasyonu">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Alt Menu - Desktop */}
        <nav className="hidden lg:block bg-muted border-t border-border" aria-label="Alt navigasyon">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-6">
              {subMenuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hakkimizda"
                  className="block py-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                >
                  Hakkimizda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="block py-2 text-xs font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                >
                  Iletisim
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Modals */}
      <CartDrawer />
      <AuthModal />
    </>
  );
}

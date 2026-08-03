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
import { formatPrice, formatProductName } from "@/lib/products";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    name: "YENİ ÜRÜNLER",
    href: "/urunler?siralama=yeni",
    hasDropdown: false,
  },
  {
    name: "TAKILAR",
    href: "/urunler",
    hasDropdown: true,
    dropdownItems: [
      { name: "Yüzükler", href: "/urunler?kategori=yuzuk" },
      { name: "Kolyeler", href: "/urunler?kategori=kolye" },
      { name: "Küpeler", href: "/urunler?kategori=kupe" },
      { name: "Bileklikler", href: "/urunler?kategori=bileklik" },
      { name: "Tümü", href: "/urunler" },
    ],
  },
  {
    name: "ÇOK SATANLAR",
    href: "/urunler?siralama=cok-satan",
    hasDropdown: false,
  },
  {
    name: "ÖZEL TAKILAR",
    href: "/urunler?tip=ozel",
    hasDropdown: false,
  },
  {
    name: "KOLEKSİYONLAR",
    href: "/urunler?koleksiyon=all",
    hasDropdown: true,
    dropdownItems: [
      { name: "Yeni Sezon", href: "/urunler?siralama=yeni" },
      { name: "Alyans Koleksiyonu", href: "/urunler?tip=alyans" },
    ],
  },
  {
    name: "HAKKIMIZDA",
    href: "/hakkimizda",
    hasDropdown: false,
  },
  {
    name: "İLETİŞİM",
    href: "/iletisim",
    hasDropdown: false,
  },
  {
    name: "İNDİRİM",
    href: "/urunler?indirimli=true",
    hasDropdown: false,
    highlight: true,
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen } = useAuth();
  const { favorites } = useFavorites();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const headerSearchRef = useRef<HTMLInputElement>(null);
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");

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

  const handleHeaderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchQuery.trim()) {
      setSearchQuery(headerSearchQuery);
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      {/* 2a. Üst İnce Bar (Announcement Bar) */}
      <div className="bg-beige text-dark">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-medium">
            30 GÜN İADE GARANTİSİ
          </span>
          <span className="text-[11px] tracking-[0.15em] uppercase font-sans font-medium">
            24 SAAT İÇİNDE KARGODA
          </span>
        </div>
      </div>

      {/* 2b. Ana Header (sadece desktop) */}
      <div className="hidden lg:block bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-28 md:h-36">
            {/* Sol - Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/favian-logo.png"
                alt="Favian Jewellery"
                width={450}
                height={120}
                className="h-[100px] md:h-[120px] w-auto"
                priority
              />
            </Link>

            {/* Orta - Search Bar (Desktop) */}
            <form onSubmit={handleHeaderSearch} className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
              <div className="flex items-center w-full border border-border rounded-none">
                <div className="flex items-center px-3 border-r border-border">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  ref={headerSearchRef}
                  type="text"
                  placeholder="Tüm Mağazada Ara..."
                  value={headerSearchQuery}
                  onChange={(e) => {
                    setHeaderSearchQuery(e.target.value);
                    if (e.target.value.length > 2) {
                      setSearchQuery(e.target.value);
                    }
                  }}
                  onFocus={() => {
                    if (headerSearchQuery.length > 2) {
                      setIsSearchOpen(true);
                    }
                  }}
                  className="w-full px-4 py-2.5 text-sm bg-transparent focus:outline-none placeholder:text-muted-foreground font-sans"
                />
              </div>
            </form>

            {/* Sağ - İkonlar */}
            <div className="flex items-center gap-1 sm:gap-4">
              {/* Mobil Arama */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-foreground hover:text-gold transition-colors"
                aria-label="Ara"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Giriş Yap */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:flex items-center gap-1.5 p-2 text-foreground hover:text-gold transition-colors"
                title={user ? user.name : "Giriş Yap"}
                aria-label={user ? `Hesabım: ${user.name}` : "Giriş Yap"}
              >
                {user ? (
                  <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
                <span className="text-[11px] tracking-[0.1em] uppercase font-sans font-medium hidden md:inline">
                  {user ? user.name : "GİRİŞ YAP"}
                </span>
              </button>

              {/* Favoriler */}
              <Link
                href="/favoriler"
                className="hidden sm:flex items-center gap-1.5 p-2 text-foreground hover:text-gold transition-colors relative"
                aria-label={`Favoriler (${favorites.length} ürün)`}
              >
                <Heart className="w-5 h-5" />
                <span className="text-[11px] tracking-[0.1em] uppercase font-sans font-medium hidden md:inline">
                  FAVORİLER
                </span>
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 left-4 md:left-auto md:-top-0.5 md:-right-1 w-4 h-4 bg-gold text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Sepetim */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 p-2 text-foreground hover:text-gold transition-colors relative"
                aria-label={`Sepet (${totalItems} ürün)`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="text-[11px] tracking-[0.1em] uppercase font-sans font-medium hidden md:inline">
                  SEPETİM
                </span>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 left-4 md:left-auto md:-top-0.5 md:-right-1 w-4 h-4 bg-gold text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2c. Navigation Bar (Desktop) */}
      <nav className="hidden lg:block bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-0">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-4 text-[13px] tracking-[0.15em] uppercase font-sans font-medium transition-colors relative group
                    ${item.highlight ? "text-gold" : "text-foreground hover:text-gold"}`}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  {/* Hover underline */}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${item.highlight ? "bg-gold" : "bg-gold"}`} />
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-0 w-52 z-50">
                    <div className="bg-white border border-border shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-5 py-2.5 text-sm font-sans text-foreground hover:text-gold hover:bg-cream transition-colors"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* 2d. Mobil Header - Hamburger + Logo + Sepet */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Hamburger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-gold -ml-2"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] bg-white p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-border">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src="/images/favian-logo.png"
                      alt="Favian Jewellery"
                      width={375}
                      height={100}
                      className="h-[100px] w-auto"
                    />
                  </Link>
                </div>

                {/* Mobil Arama */}
                <div className="px-6 py-4 border-b border-border">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    if (headerSearchQuery.trim()) {
                      setSearchQuery(headerSearchQuery);
                      setIsSearchOpen(true);
                    }
                  }}>
                    <div className="flex items-center border border-border">
                      <input
                        type="text"
                        placeholder="Ara..."
                        value={headerSearchQuery}
                        onChange={(e) => setHeaderSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-transparent focus:outline-none font-sans"
                      />
                      <button type="submit" className="px-3 text-muted-foreground">
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item) => (
                    <div key={item.name} className="px-6">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block py-3 text-sm tracking-[0.1em] uppercase font-sans font-medium border-b border-border
                          ${item.highlight ? "text-gold" : "text-foreground hover:text-gold"}`}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <div className="pl-4 py-1">
                          {item.dropdownItems?.map((dropItem) => (
                            <Link
                              key={dropItem.name}
                              href={dropItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 text-sm text-muted-foreground hover:text-gold font-sans"
                            >
                              {dropItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Mobil Alt İşlemler */}
                  <div className="px-6 pt-4 border-t border-border mt-4">
                    <button
                      onClick={() => { setIsOpen(false); setIsLoginOpen(true); }}
                      className="flex items-center gap-2 py-3 text-sm font-sans text-foreground hover:text-gold w-full"
                    >
                      <User className="w-4 h-4" />
                      {user ? user.name : "Giriş Yap"}
                    </button>
                    <Link
                      href="/favoriler"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 py-3 text-sm font-sans text-foreground hover:text-gold"
                    >
                      <Heart className="w-4 h-4" />
                      Favoriler {favorites.length > 0 && `(${favorites.length})`}
                    </Link>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo (orta) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/favian-logo.png"
              alt="Favian Jewellery"
              width={300}
              height={80}
              className="h-[52px] w-auto"
            />
          </Link>

          {/* Sepet (sağ) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-foreground hover:text-gold transition-colors relative -mr-2"
            aria-label={`Sepet (${totalItems} ürün)`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Arama Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30" onClick={() => { clearSearch(); setIsSearchOpen(false); }}>
          <div className="bg-white border-b border-border shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="container mx-auto px-4 py-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ürün kodu ya da ürün adı yazınız..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-20 border-b-2 border-gold text-base focus:outline-none bg-transparent font-sans"
                  autoFocus
                  aria-label="Ürün ara"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    className="p-2 text-foreground hover:text-gold"
                    aria-label="Ara"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      clearSearch();
                      setIsSearchOpen(false);
                      setHeaderSearchQuery("");
                    }}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Kapat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Arama Sonuçları */}
              {isSearching && searchResults.length > 0 && (
                <div
                  ref={searchResultsRef}
                  className="max-w-2xl mx-auto mt-6 max-h-80 overflow-y-auto"
                >
                  <p className="text-xs text-muted-foreground mb-4 font-sans">
                    {searchResults.length} ürün bulundu
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/urun/${product.id}`}
                        onClick={() => {
                          clearSearch();
                          setIsSearchOpen(false);
                          setHeaderSearchQuery("");
                        }}
                        className="flex items-center gap-4 p-3 hover:bg-cream transition-colors"
                      >
                        <div className="w-16 h-16 bg-beige overflow-hidden flex-shrink-0">
                          {product.images[0] && (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate font-sans">
                            {formatProductName(product.name)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 font-sans">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {searchResults.length > 6 && (
                    <Link
                      href={`/urunler?arama=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        clearSearch();
                        setIsSearchOpen(false);
                        setHeaderSearchQuery("");
                      }}
                      className="block text-center text-sm text-foreground hover:text-gold mt-6 py-3 border-t border-border font-sans"
                    >
                      Tüm sonuçları gör ({searchResults.length})
                    </Link>
                  )}
                </div>
              )}

              {isSearching && searchResults.length === 0 && searchQuery.length > 2 && (
                <div className="max-w-2xl mx-auto mt-6 text-center py-8">
                  <p className="text-muted-foreground font-sans">
                    &quot;{searchQuery}&quot; için sonuç bulunamadı
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CartDrawer />
      <AuthModal />
    </>
  );
}

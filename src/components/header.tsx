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
  X,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    name: "Takılar",
    href: "/urunler",
    hasDropdown: true,
    dropdownItems: [
      { name: "Tum Urunler", href: "/urunler" },
      { name: "Yuzukler", href: "/urunler?kategori=yuzuk" },
      { name: "Kolyeler", href: "/urunler?kategori=kolye" },
      { name: "Kupeler", href: "/urunler?kategori=kupe" },
      { name: "Bileklikler", href: "/urunler?kategori=bileklik" },
    ]
  },
  {
    name: "Koleksiyonlar",
    href: "/urunler?koleksiyon=all",
    hasDropdown: true,
    dropdownItems: [
      { name: "Yeni Gelenler", href: "/urunler?siralama=yeni" },
      { name: "Cok Satanlar", href: "/urunler?siralama=cok-satan" },
      { name: "Pirlanta Serisi", href: "/urunler?tip=pirlanta" },
      { name: "Alyans Koleksiyonu", href: "/urunler?tip=alyans" },
    ]
  },
  {
    name: "Hakkimizda",
    href: "/hakkimizda",
    hasDropdown: false
  },
  {
    name: "Favoriler",
    href: "/favoriler",
    hasDropdown: false
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
      {/* Ust Bar - Kampanya */}
      <div className="bg-black text-white text-xs tracking-wider">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-center">
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">500 TL ustu siparislerde ucretsiz kargo</span>
            <span className="sm:hidden">500 TL ustu ucretsiz kargo</span>
            <span className="text-[#C4A574]">|</span>
            <Link href="/urunler?indirimli=true" className="hover:text-[#C4A574] transition-colors underline underline-offset-2">
              Hemen Alisverise Basla
            </Link>
          </span>
        </div>
      </div>

      {/* Ana Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Sol - Navigasyon (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm tracking-wide text-foreground hover:text-muted-foreground transition-colors py-2"
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                  </Link>

                  {/* Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-48">
                      <div className="bg-white border border-border shadow-lg py-2">
                        {item.dropdownItems?.map((dropItem) => (
                          <Link
                            key={dropItem.name}
                            href={dropItem.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {dropItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobil Menu Butonu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-muted-foreground"
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
                        src="/images/logo-dark.png"
                        alt="Yazici Atolye"
                        width={120}
                        height={48}
                        className="h-10 w-auto"
                      />
                    </Link>
                  </div>

                  <nav className="flex-1 overflow-y-auto py-6">
                    {navItems.map((item) => (
                      <div key={item.name} className="px-6">
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-3 text-lg font-medium text-foreground hover:text-muted-foreground border-b border-border"
                        >
                          {item.name}
                        </Link>
                        {item.hasDropdown && (
                          <div className="pl-4 py-2">
                            {item.dropdownItems?.map((dropItem) => (
                              <Link
                                key={dropItem.name}
                                href={dropItem.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                              >
                                {dropItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="px-6 pt-6 border-t border-border mt-6">
                      <Link
                        href="/hakkimizda"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-foreground hover:text-muted-foreground"
                      >
                        Hakkimizda
                      </Link>
                      <Link
                        href="/iletisim"
                        onClick={() => setIsOpen(false)}
                        className="block py-3 text-foreground hover:text-muted-foreground"
                      >
                        Iletisim
                      </Link>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Orta - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-auto">
              <Image
                src="/images/logo-dark.png"
                alt="Yazici Atolye"
                width={140}
                height={56}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* Sag - Ikonlar */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Arama */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                aria-label="Ara"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Kullanici */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors"
                title={user ? user.name : "Giris Yap"}
                aria-label={user ? `Hesabim: ${user.name}` : "Giris Yap"}
              >
                {user ? (
                  <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-medium text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {/* Favoriler */}
              <Link
                href="/favoriler"
                className="hidden sm:block p-2 text-foreground hover:text-muted-foreground transition-colors relative"
                aria-label={`Favoriler (${favorites.length} urun)`}
              >
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* Sepet */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-foreground hover:text-muted-foreground transition-colors relative"
                aria-label={`Sepet (${totalItems} urun)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Arama Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Urun kodu ya da urun adi yaziniz..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-20 border-b-2 border-black text-base focus:outline-none bg-transparent"
                  autoFocus
                  aria-label="Urun ara"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    className="p-2 text-foreground hover:text-muted-foreground"
                    aria-label="Ara"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      clearSearch();
                      setIsSearchOpen(false);
                    }}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    aria-label="Kapat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Arama Sonuclari */}
              {isSearching && searchResults.length > 0 && (
                <div
                  ref={searchResultsRef}
                  className="max-w-2xl mx-auto mt-6 max-h-80 overflow-y-auto"
                >
                  <p className="text-xs text-muted-foreground mb-4">
                    {searchResults.length} urun bulundu
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {searchResults.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/urun/${product.id}`}
                        onClick={() => {
                          clearSearch();
                          setIsSearchOpen(false);
                        }}
                        className="flex items-center gap-4 p-3 hover:bg-muted transition-colors"
                      >
                        <div className="w-16 h-16 bg-muted overflow-hidden flex-shrink-0">
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
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
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
                      }}
                      className="block text-center text-sm text-foreground hover:text-muted-foreground mt-6 py-3 border-t border-border"
                    >
                      Tum sonuclari gor ({searchResults.length})
                    </Link>
                  )}
                </div>
              )}

              {isSearching && searchResults.length === 0 && searchQuery.length > 2 && (
                <div className="max-w-2xl mx-auto mt-6 text-center py-8">
                  <p className="text-muted-foreground">
                    &quot;{searchQuery}&quot; icin sonuc bulunamadi
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <CartDrawer />
      <AuthModal />
    </>
  );
}

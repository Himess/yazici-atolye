"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen } = useAuth();

  return (
    <>
      {/* Üst Bar - Kampanya / Bilgi */}
      <div className="bg-[#095246] text-white text-xs sm:text-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Ucretsiz Kargo
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Sigortali Teslimat
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="font-medium">Yilbasi Firsatlari Basladi! <span className="text-[#BFAE8F]">%20 Indirim</span></span>
          </div>
          <div className="hidden sm:block">
            <Link href="/iletisim" className="hover:text-[#BFAE8F] transition-colors">
              Siparis Takibi
            </Link>
          </div>
        </div>
      </div>

      {/* Ana Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        {/* Logo + Arama + İkonlar */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/logo-dark.png"
                alt="Yazici Atolye"
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Arama - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Urun kodu ya da urun adi yaziniz"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#095246] transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6D6B68] hover:text-[#095246]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sağ İkonlar */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Arama - Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 text-[#6D6B68] hover:text-[#095246] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Kullanıcı */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="p-2 text-[#6D6B68] hover:text-[#095246] transition-colors"
                title={user ? user.name : "Giris Yap"}
              >
                {user ? (
                  <div className="w-6 h-6 bg-[#095246] rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
                  </div>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </button>

              {/* Favoriler */}
              <button className="hidden sm:block p-2 text-[#6D6B68] hover:text-[#095246] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Sepet */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#6D6B68] hover:text-[#095246] transition-colors relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#095246] text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-[#6D6B68] hover:text-[#095246]">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white overflow-y-auto">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-[#2B2B2B] hover:text-[#095246]"
                    >
                      Ana Sayfa
                    </Link>

                    <div className="border-t border-[#E5E5E5] pt-4">
                      <p className="text-xs font-semibold text-[#6D6B68] uppercase tracking-wider mb-3">Kategoriler</p>
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-[#2B2B2B] hover:text-[#095246] transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-[#E5E5E5] pt-4">
                      <p className="text-xs font-semibold text-[#6D6B68] uppercase tracking-wider mb-3">Kesfet</p>
                      {subMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-2 text-[#2B2B2B] hover:text-[#095246] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-[#E5E5E5] pt-4">
                      <Link
                        href="/hakkimizda"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-[#2B2B2B] hover:text-[#095246]"
                      >
                        Hakkimizda
                      </Link>
                      <Link
                        href="/iletisim"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-[#2B2B2B] hover:text-[#095246]"
                      >
                        Iletisim
                      </Link>
                    </div>

                    <Button className="mt-4 w-full bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white">
                      Randevu Al
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Arama - Açılır */}
          {isSearchOpen && (
            <div className="md:hidden mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Urun ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#095246]"
                  autoFocus
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6D6B68]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kategori Menüsü - Desktop */}
        <nav className="hidden lg:block border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-1">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="block px-4 py-3 text-sm font-medium text-[#2B2B2B] hover:text-[#095246] hover:bg-[#F7F6F4] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Alt Menü - Desktop */}
        <nav className="hidden lg:block bg-[#F7F6F4] border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-6">
              {subMenuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-xs font-medium text-[#6D6B68] hover:text-[#095246] transition-colors uppercase tracking-wide"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hakkimizda"
                  className="block py-2 text-xs font-medium text-[#6D6B68] hover:text-[#095246] transition-colors uppercase tracking-wide"
                >
                  Hakkimizda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="block py-2 text-xs font-medium text-[#6D6B68] hover:text-[#095246] transition-colors uppercase tracking-wide"
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

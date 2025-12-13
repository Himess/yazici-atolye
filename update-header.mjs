import fs from 'fs';

const content = `"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { CartDrawer } from "@/components/cart-drawer";
import { AuthModal } from "@/components/auth-modal";

const categories = [
  {
    name: "Yuzukler",
    href: "/urunler?kategori=yuzuk",
    subcategories: [
      { name: "Tektas Yuzukler", href: "/urunler?kategori=yuzuk&tip=tektas" },
      { name: "Bestas Yuzukler", href: "/urunler?kategori=yuzuk&tip=bestas" },
      { name: "Alyanslar", href: "/urunler?kategori=yuzuk&tip=alyans" },
      { name: "Tasli Yuzukler", href: "/urunler?kategori=yuzuk&tip=tasli" },
    ],
  },
  {
    name: "Kolyeler",
    href: "/urunler?kategori=kolye",
    subcategories: [
      { name: "Pirlanta Kolyeler", href: "/urunler?kategori=kolye&tip=pirlanta" },
      { name: "Inci Kolyeler", href: "/urunler?kategori=kolye&tip=inci" },
      { name: "Altin Kolyeler", href: "/urunler?kategori=kolye&tip=altin" },
    ],
  },
  {
    name: "Kupeler",
    href: "/urunler?kategori=kupe",
    subcategories: [
      { name: "Pirlanta Kupeler", href: "/urunler?kategori=kupe&tip=pirlanta" },
      { name: "Halka Kupeler", href: "/urunler?kategori=kupe&tip=halka" },
      { name: "Tasli Kupeler", href: "/urunler?kategori=kupe&tip=tasli" },
    ],
  },
  {
    name: "Bileklikler",
    href: "/urunler?kategori=bileklik",
    subcategories: [
      { name: "Kelepce Bileklikler", href: "/urunler?kategori=bileklik&tip=kelepce" },
      { name: "Zincir Bileklikler", href: "/urunler?kategori=bileklik&tip=zincir" },
      { name: "Tasli Bileklikler", href: "/urunler?kategori=bileklik&tip=tasli" },
    ],
  },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsLoginOpen } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-2xl font-bold text-stone-900">
              Yazici Atolye
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Ana Sayfa
            </Link>

            {/* Urunler Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href="/urunler"
                className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 flex items-center gap-1"
              >
                Urunler
                <svg
                  className={\`w-4 h-4 transition-transform \${isDropdownOpen ? 'rotate-180' : ''}\`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Mega Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-4">
                  <div className="bg-white border border-stone-200 rounded-xl shadow-xl p-6 min-w-[700px]">
                    <div className="grid grid-cols-4 gap-8">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <Link
                            href={category.href}
                            className="font-semibold text-stone-900 hover:text-emerald-600 transition-colors block mb-3"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-2">
                            {category.subcategories.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className="text-sm text-stone-500 hover:text-stone-900 transition-colors block py-1"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100">
                      <Link
                        href="/urunler"
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-2"
                      >
                        Tum Urunleri Gor
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/hakkimizda"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Hakkimizda
            </Link>
            <Link
              href="/iletisim"
              className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
            >
              Iletisim
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Kullanici Ikonu */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              title={user ? user.name : "Giris Yap"}
            >
              {user ? (
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>

            {/* Sepet Ikonu */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors relative"
              title="Sepetim"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Randevu Al - Desktop */}
            <Button variant="outline" className="hidden md:flex border-stone-900 text-stone-900 hover:bg-stone-100">
              Randevu Al
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
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
                    className="text-lg font-medium text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Ana Sayfa
                  </Link>

                  <div className="space-y-2">
                    <Link
                      href="/urunler"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-stone-900 block"
                    >
                      Urunler
                    </Link>
                    <div className="pl-4 space-y-3 border-l-2 border-stone-200">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <Link
                            href={category.href}
                            onClick={() => setIsOpen(false)}
                            className="text-base font-medium text-stone-700 hover:text-stone-900 block"
                          >
                            {category.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/hakkimizda"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Hakkimizda
                  </Link>
                  <Link
                    href="/iletisim"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-stone-600 transition-colors hover:text-stone-900"
                  >
                    Iletisim
                  </Link>
                  <Button className="mt-4 bg-stone-900 hover:bg-stone-800 text-white">
                    Randevu Al
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Modals */}
      <CartDrawer />
      <AuthModal />
    </>
  );
}
`;

fs.writeFileSync('src/components/header.tsx', content);
console.log('Header sepet ve uyelik ikonlariyla guncellendi!');

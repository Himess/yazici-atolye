import fs from 'fs';

// 1. Update globals.css with new Gemini theme colors
const globalsCss = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Modern Heirloom - Yazici Atolye Brand Colors */
:root {
  /* Brand Colors */
  --imperial-emerald: #095246;
  --champagne-gold: #BFAE8F;
  --deep-charcoal: #2B2B2B;
  --warm-stone: #6D6B68;
  --atelier-mist: #F7F6F4;

  /* Theme Variables */
  --radius: 0.625rem;
  --background: #FFFFFF;
  --foreground: #2B2B2B;
  --card: #FFFFFF;
  --card-foreground: #2B2B2B;
  --popover: #FFFFFF;
  --popover-foreground: #2B2B2B;
  --primary: #095246;
  --primary-foreground: #FFFFFF;
  --secondary: #F7F6F4;
  --secondary-foreground: #2B2B2B;
  --muted: #F7F6F4;
  --muted-foreground: #6D6B68;
  --accent: #BFAE8F;
  --accent-foreground: #2B2B2B;
  --destructive: #DC2626;
  --border: #E5E5E5;
  --input: #E5E5E5;
  --ring: #095246;
  --chart-1: #095246;
  --chart-2: #BFAE8F;
  --chart-3: #6D6B68;
  --chart-4: #2B2B2B;
  --chart-5: #F7F6F4;
  --sidebar: #F7F6F4;
  --sidebar-foreground: #2B2B2B;
  --sidebar-primary: #095246;
  --sidebar-primary-foreground: #FFFFFF;
  --sidebar-accent: #BFAE8F;
  --sidebar-accent-foreground: #2B2B2B;
  --sidebar-border: #E5E5E5;
  --sidebar-ring: #095246;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-montserrat);
  --font-serif: var(--font-playfair);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);

  /* Custom Brand Colors */
  --color-imperial: #095246;
  --color-champagne: #BFAE8F;
  --color-charcoal: #2B2B2B;
  --color-warmstone: #6D6B68;
  --color-mist: #F7F6F4;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-charcoal;
  }
}

/* Custom Button Styles */
.btn-primary {
  @apply bg-imperial text-white transition-all duration-300;
}
.btn-primary:hover {
  @apply bg-champagne text-charcoal;
}

.btn-secondary {
  @apply bg-transparent border border-warmstone text-warmstone transition-all duration-300;
}
.btn-secondary:hover {
  @apply border-imperial text-imperial;
}

/* Smooth transitions */
.transition-brand {
  @apply transition-all duration-300 ease-in-out;
}
`;

fs.writeFileSync('src/app/globals.css', globalsCss);
console.log('globals.css guncellendi!');

// 2. Update layout.tsx with Montserrat font
const layoutContent = `import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yazici Atolye | El Yapimi Takilar & Mucevherat",
  description: "Yazici Atolye - Ozel tasarim el yapimi takilar, nisan yuzukleri, alyanslar ve mucevherat. Kalite ve zarafetin bulustugu adres.",
  keywords: ["kuyumcu", "mucevher", "altin", "yuzuk", "kolye", "kupe", "el yapimi taki"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={\`\${playfair.variable} \${montserrat.variable} font-sans antialiased\`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.tsx', layoutContent);
console.log('layout.tsx guncellendi (Montserrat fontu eklendi)!');

// 3. Update header.tsx with new brand colors
const headerContent = `"use client";

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
      <header className="sticky top-0 z-50 w-full border-b border-[#E5E5E5] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-playfair text-2xl font-bold text-[#2B2B2B]">
              Yazici Atolye
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
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
                className="text-sm font-medium text-[#6D6B68] transition-colors hover:text-[#095246] flex items-center gap-1"
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
                  <div className="bg-white border border-[#E5E5E5] rounded-xl shadow-xl p-6 min-w-[700px]">
                    <div className="grid grid-cols-4 gap-8">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <Link
                            href={category.href}
                            className="font-semibold text-[#2B2B2B] hover:text-[#095246] transition-colors block mb-3"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-2">
                            {category.subcategories.map((sub) => (
                              <li key={sub.name}>
                                <Link
                                  href={sub.href}
                                  className="text-sm text-[#6D6B68] hover:text-[#095246] transition-colors block py-1"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E5E5E5]">
                      <Link
                        href="/urunler"
                        className="text-sm font-medium text-[#095246] hover:text-[#BFAE8F] flex items-center gap-2 transition-colors"
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
              className="text-sm font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
            >
              Hakkimizda
            </Link>
            <Link
              href="/iletisim"
              className="text-sm font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
            >
              Iletisim
            </Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Kullanici Ikonu */}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="p-2 text-[#6D6B68] hover:text-[#095246] hover:bg-[#F7F6F4] rounded-lg transition-colors"
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

            {/* Sepet Ikonu */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#6D6B68] hover:text-[#095246] hover:bg-[#F7F6F4] rounded-lg transition-colors relative"
              title="Sepetim"
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

            {/* Randevu Al - Desktop */}
            <Button className="hidden md:flex bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white transition-all duration-300">
              Randevu Al
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
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
                    className="text-lg font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
                  >
                    Ana Sayfa
                  </Link>

                  <div className="space-y-2">
                    <Link
                      href="/urunler"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-[#2B2B2B] block"
                    >
                      Urunler
                    </Link>
                    <div className="pl-4 space-y-3 border-l-2 border-[#E5E5E5]">
                      {categories.map((category) => (
                        <div key={category.name}>
                          <Link
                            href={category.href}
                            onClick={() => setIsOpen(false)}
                            className="text-base font-medium text-[#6D6B68] hover:text-[#095246] block"
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
                    className="text-lg font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
                  >
                    Hakkimizda
                  </Link>
                  <Link
                    href="/iletisim"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-[#6D6B68] transition-colors hover:text-[#095246]"
                  >
                    Iletisim
                  </Link>
                  <Button className="mt-4 bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white transition-all duration-300">
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

fs.writeFileSync('src/components/header.tsx', headerContent);
console.log('header.tsx guncellendi (yeni renk paleti)!');

// 4. Update cart-drawer.tsx with new colors
const cartDrawerContent = `"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader>
          <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">Sepetim ({items.length} urun)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <svg className="w-16 h-16 text-[#E5E5E5] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-[#6D6B68] mb-4">Sepetiniz bos</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline" className="border-[#095246] text-[#095246] hover:bg-[#095246] hover:text-white" asChild>
                <Link href="/urunler">Alisverise Basla</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-[#F7F6F4] rounded-lg">
                    {/* Urun Gorseli */}
                    <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.images[0]?.includes('/images/') ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#E5E5E5]" />
                        </div>
                      )}
                    </div>

                    {/* Urun Bilgileri */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#2B2B2B] text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs text-[#6D6B68]">{item.product.code}</p>
                      <p className="text-sm font-semibold text-[#2B2B2B] mt-1">{formatPrice(item.product.price)}</p>

                      {/* Miktar Kontrolleri */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#E5E5E5] rounded text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-6 text-center text-[#2B2B2B]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white border border-[#E5E5E5] rounded text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-[#E5E5E5]" />

              {/* Toplam ve Odeme */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#6D6B68]">Ara Toplam</span>
                  <span className="font-semibold text-[#2B2B2B]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6D6B68]">Kargo</span>
                  <span className="text-[#095246] font-medium">Ucretsiz</span>
                </div>
                <Separator className="bg-[#E5E5E5]" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#2B2B2B]">Toplam</span>
                  <span className="text-xl font-bold text-[#2B2B2B]">{formatPrice(totalPrice)}</span>
                </div>

                <Button className="w-full bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white py-6 transition-all duration-300" disabled>
                  Odemeye Gec (Yakinda)
                </Button>
                <Button variant="outline" className="w-full border-[#6D6B68] text-[#6D6B68] hover:border-[#095246] hover:text-[#095246]" onClick={() => setIsCartOpen(false)} asChild>
                  <Link href="/urunler">Alisverise Devam Et</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
`;

fs.writeFileSync('src/components/cart-drawer.tsx', cartDrawerContent);
console.log('cart-drawer.tsx guncellendi!');

// 5. Update auth-modal.tsx with new colors
const authModalContent = `"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

export function AuthModal() {
  const { user, login, register, logout, isLoginOpen, setIsLoginOpen } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          setError("Lutfen adinizi girin");
          setIsLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (!success) {
          setError("Bu e-posta adresi zaten kullaniliyor");
        }
      } else {
        const success = await login(email, password);
        if (!success) {
          setError("E-posta veya sifre hatali");
        }
      }
    } catch (err) {
      setError("Bir hata olustu, lutfen tekrar deneyin");
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    resetForm();
  };

  // If user is logged in, show profile
  if (user) {
    return (
      <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <SheetContent className="w-full sm:max-w-md bg-white">
          <SheetHeader>
            <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">Hesabim</SheetTitle>
          </SheetHeader>

          <div className="py-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#F7F6F4] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-semibold text-[#095246]">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-[#2B2B2B]">{user.name}</h3>
              <p className="text-sm text-[#6D6B68]">{user.email}</p>
            </div>

            <Separator className="my-6 bg-[#E5E5E5]" />

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Siparislerim (Yakinda)
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorilerim (Yakinda)
              </Button>
              <Button variant="outline" className="w-full justify-start border-[#E5E5E5] text-[#6D6B68]" disabled>
                <svg className="w-5 h-5 mr-3 text-[#6D6B68]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Hesap Ayarlari (Yakinda)
              </Button>
            </div>

            <Separator className="my-6 bg-[#E5E5E5]" />

            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={logout}
            >
              Cikis Yap
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Login/Register form
  return (
    <Sheet open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="font-playfair text-xl text-[#2B2B2B]">
            {isRegister ? "Uye Ol" : "Giris Yap"}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="py-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-[#6D6B68] mb-1">
                Ad Soyad
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adiniz Soyadiniz"
                className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#6D6B68] mb-1">
              E-posta
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6D6B68] mb-1">
              Sifre
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="border-[#E5E5E5] focus:border-[#095246] focus:ring-[#095246]"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#095246] hover:bg-[#BFAE8F] hover:text-[#2B2B2B] text-white py-5 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Yukleniyor..." : isRegister ? "Uye Ol" : "Giris Yap"}
          </Button>

          <Separator className="my-4 bg-[#E5E5E5]" />

          <p className="text-center text-sm text-[#6D6B68]">
            {isRegister ? "Zaten uye misiniz?" : "Henuz uye degil misiniz?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#095246] font-medium hover:text-[#BFAE8F] transition-colors"
            >
              {isRegister ? "Giris Yapin" : "Uye Olun"}
            </button>
          </p>
        </form>
      </SheetContent>
    </Sheet>
  );
}
`;

fs.writeFileSync('src/components/auth-modal.tsx', authModalContent);
console.log('auth-modal.tsx guncellendi!');

// 6. Update footer.tsx with new colors
const footerContent = `import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-[#F7F6F4]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">
              Yazici Atolye
            </h3>
            <p className="text-sm text-[#6D6B68]">
              El yapimi takilar ve ozel tasarim mucevherat.
              Kalite ve zarafetin bulustugu adres.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hizli Baglantilar</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/urunler" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Urunlerimiz</Link></li>
              <li><Link href="/hakkimizda" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Hakkimizda</Link></li>
              <li><Link href="/iletisim" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Iletisim</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/urunler?kategori=yuzuk" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Yuzukler</Link></li>
              <li><Link href="/urunler?kategori=kolye" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Kolyeler</Link></li>
              <li><Link href="/urunler?kategori=kupe" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Kupeler</Link></li>
              <li><Link href="/urunler?kategori=bileklik" className="text-[#6D6B68] hover:text-[#BFAE8F] transition-colors">Bileklikler</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Iletisim</h4>
            <ul className="space-y-2 text-sm text-[#6D6B68]">
              <li className="flex items-center gap-2">
                <span>Istanbul, Turkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <span>+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <span>info@yaziciatolye.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-[#6D6B68]/30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#6D6B68]">
          <p>2024 Yazici Atolye. Tum haklari saklidir.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#BFAE8F] transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-[#BFAE8F] transition-colors">WhatsApp</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
`;

fs.writeFileSync('src/components/footer.tsx', footerContent);
console.log('footer.tsx guncellendi!');

console.log('\\nTema guncellemesi tamamlandi!');
console.log('Yeni renk paleti: Imperial Emerald (#095246), Champagne Gold (#BFAE8F), Deep Charcoal (#2B2B2B), Warm Stone (#6D6B68), Atelier Mist (#F7F6F4)');
console.log('Font: Montserrat (body) + Playfair Display (basliklar)');

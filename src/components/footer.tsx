"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";

interface SiteSettings {
  phone?: string;
  phone2?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  pinterestUrl?: string;
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Footer settings fetch error:", err));
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert("Bültenimize kaydınız alındı!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-cream text-dark">
      {/* Üst Kısım — 4 Kolon */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Kolon 1: HAKKIMIZDA */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6">HAKKIMIZDA</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/hakkimizda" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Mağazalar
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
            {/* Sosyal Medya */}
            <div className="flex items-center gap-4 mt-6">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-gold transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-gold transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.youtubeUrl && (
                <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-gold transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Kolon 2: HİZMETLER */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6">HİZMETLER</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/kullanim-kosullari" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/kargo-teslimat" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Kargo &amp; Teslimat
                </Link>
              </li>
              <li>
                <Link href="/iade-degisim" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  İade &amp; Değişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 3: BİLGİLER */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6">BİLGİLER</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/sss" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/beden-olcu-bilgisi" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Beden &amp; Ölçü Bilgisi
                </Link>
              </li>
              <li>
                <Link href="/taki-bakimi" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Takı Bakımı
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="text-sm font-sans text-foreground hover:text-gold transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolon 4: BÜLTEN */}
          <div>
            <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] mb-6">BÜLTEN</h4>
            <p className="text-sm font-sans text-muted-foreground mb-4">
              Topluluğumuza katılın, yeni ürünlerden ve kampanyalardan haberdar olun.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center border-b border-foreground">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-2 text-sm bg-transparent focus:outline-none font-sans placeholder:text-muted-foreground"
                required
              />
              <button type="submit" className="p-2 text-foreground hover:text-gold transition-colors" aria-label="Gönder">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Alt Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-sans">
              &copy; {new Date().getFullYear()} Favian Jewellery. Tüm hakları saklıdır.
            </p>

            {/* Ödeme İkonları */}
            <div className="flex items-center gap-3 text-muted-foreground text-xs font-sans">
              <span>Güvenli Ödeme:</span>
              <span className="bg-white px-2 py-1 text-foreground font-medium">VISA</span>
              <span className="bg-white px-2 py-1 text-foreground font-medium">MC</span>
              <span className="bg-white px-2 py-1 text-foreground font-medium">TROY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Hakkimizda */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Hakkimizda</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              El yapimi takilar ve ozel tasarim mucevherat. Her parca ozenle ve sevgiyle uretilir.
              Kalite ve zarafetin bulustugu adres.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="https://instagram.com/yaziciatolye" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Menu</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/urunler?kategori=kolye" className="text-gray-400 hover:text-white transition-colors">Kolyeler</Link></li>
              <li><Link href="/urunler?kategori=bileklik" className="text-gray-400 hover:text-white transition-colors">Bileklikler</Link></li>
              <li><Link href="/urunler?kategori=yuzuk" className="text-gray-400 hover:text-white transition-colors">Yuzukler</Link></li>
              <li><Link href="/urunler?kategori=kupe" className="text-gray-400 hover:text-white transition-colors">Kupeler</Link></li>
            </ul>
          </div>

          {/* Destek */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Destek</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Sikca Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Iade ve Degisim</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikasi</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Kullanim Kosullari</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Siparis Takibi</Link></li>
            </ul>
          </div>

          {/* Iletisim */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">7/24 Ulasim</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Sorulariniz icin bize e-posta ile ulasabilirsiniz. Her turlu talebiniz icin yardimci olmaktan mutluluk duyariz.
            </p>
            <Link href="mailto:info@yaziciatolye.com" className="text-[#C4A574] hover:underline text-sm">
              info@yaziciatolye.com
            </Link>
            <p className="text-sm text-gray-400 mt-4">
              Tel: +90 (212) 123 45 67
            </p>
          </div>
        </div>
      </div>

      {/* Alt Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Yazici Atolye. Tum haklari saklidir.
            </p>

            {/* Odeme Ikonlari */}
            <div className="flex items-center gap-3 text-gray-500 text-xs">
              <span>Guvenli Odeme:</span>
              <span className="bg-gray-700 px-2 py-1 rounded">VISA</span>
              <span className="bg-gray-700 px-2 py-1 rounded">MC</span>
              <span className="bg-gray-700 px-2 py-1 rounded">TROY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

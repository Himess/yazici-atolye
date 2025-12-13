import Link from "next/link";
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

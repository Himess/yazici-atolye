import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">About The Shop</h4>
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
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/urunler?kategori=kolye" className="text-gray-400 hover:text-white transition-colors">Necklaces</Link></li>
              <li><Link href="/urunler?kategori=bileklik" className="text-gray-400 hover:text-white transition-colors">Bracelets</Link></li>
              <li><Link href="/urunler?kategori=yuzuk" className="text-gray-400 hover:text-white transition-colors">Rings</Link></li>
              <li><Link href="/urunler?kategori=kupe" className="text-gray-400 hover:text-white transition-colors">Earrings</Link></li>
              <li><Link href="/urunler?kategori=bileklik" className="text-gray-400 hover:text-white transition-colors">Ankle Bracelets</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Returns and Refunds</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">CGV</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Legal Notice</Link></li>
              <li><Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">Track my order</Link></li>
            </ul>
          </div>

          {/* Reachable */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">Reachable 24/7</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              A question? We can be reached by email 7/7, do not hesitate to send us a message for any request
            </p>
            <Link href="mailto:info@yaziciatolye.com" className="text-[#C4A574] hover:underline text-sm">
              info@yaziciatolye.com
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Yazici Atolye. Tum haklari saklidir.
            </p>

            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <Image src="/images/visa.svg" alt="Visa" width={40} height={25} className="h-6 w-auto opacity-60" />
              <Image src="/images/mastercard.svg" alt="Mastercard" width={40} height={25} className="h-6 w-auto opacity-60" />
              <Image src="/images/amex.svg" alt="American Express" width={40} height={25} className="h-6 w-auto opacity-60" />
              <Image src="/images/paypal.svg" alt="PayPal" width={40} height={25} className="h-6 w-auto opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

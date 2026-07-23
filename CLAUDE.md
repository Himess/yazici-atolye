# Favian Jewellery — Proje Hafızası

Bu dosya proje hakkındaki tüm kararları ve bilgileri saklar.

## Mevcut Durum (2026-05-22 itibarıyla)

- **Site canlı:** https://favianjewellery.com (Vercel auto-deploy aktif) — yazicipirlanta.com 301 redirect
- **Preview URL:** https://yazici-atolye.vercel.app
- **Repo:** https://github.com/Himess/yazici-atolye (main branch)
- **Son commit:** `35cb4ee fix: tum metinleri turkce karakter ile yaz + urun adlari icin Title Case formatlama` (2026-05-21)
- **Yerel yol:** `C:\Users\USER\Desktop\Projeler\Arsiv\yazici-atolye` (PC restart sonrası buradan aç)

## Rebrand Notu (2026-04-24)

- **Eski:** Yazıcı Atölye → **Yeni:** Favian Jewellery
- Logo: `/images/favian-logo.png` (placeholder, gerçek FAVIAN logo dosyası eklenecek)
- Hero: VideoHero (background video) — `public/videos/hero.mp4`
- Hero slider eski component'i (`hero-slider.tsx`) hâlâ duruyor ama kullanılmıyor (silmiyoruz, refactor için duruyor)
- Email/social handle placeholder'ları: `favianjewellery.com` (domain 2026-05-22 alındı, Cloudflare Registrar)
- Repo adı: `yazici-atolye` (GitHub'da değişmedi, kod içinde `Favian Jewellery` brand)
- localStorage key'leri: `yazici-*` olarak kalmaya devam ediyor (mevcut kullanıcı session'larını bozmamak için)

## Türkçe Karakter Çalışması (2026-05-21)

**Sorun:** İlk kodlama sırasında "bash uyumluluğu" notuyla tüm metinler ASCII olarak yazılmıştı (Yapimi, Mucevher, Pirlanta, vb.). Müşteri profesyonel görünüm istedi.

**Çözüm (commit 35cb4ee):**
- 31 dosyada 700+ değişiklik. Tüm kullanıcıya görünen metinler artık doğru Türkçe karakterli.
- ASCII not artık geçersiz — yeni metin yazarken doğrudan Türkçe karakter kullan (Ç, Ş, İ, Ğ, Ü, Ö, ı).
- Korunan (kasıtlı dokunulmadı):
  - URL route'ları: `/urun/[id]`, `/urunler`, `/admin/urunler` — slug'lar
  - Enum/literal type'lar: `category: "yuzuk" | "kolye" | "kupe" | "bileklik"`
  - Değişken/type/interface adları (TypeScript identifier'ları)
  - Image dosya isimleri (`/images/yuzuk-1.jpg`)
  - localStorage key'leri (`yazici-*`)
  - Comment'ler ve `console.error` mesajları (dev-facing)

## Ürün Adı Formatlama (2026-05-21)

**Sorun:** Admin paneli üzerinden DB'ye girilen ürün adları tutarsız ("rose taşlı yüzük 2", "Altın taşlı yüzük", "DNA yzk 1" gibi karışık).

**Çözüm:** `src/lib/products.ts` içine `formatProductName()` yardımcısı eklendi:

```ts
export function formatProductName(name: string): string
```

- Her kelimenin ilk harfini büyük yapar (Title Case)
- Türkçe locale uyumlu (`toLocaleUpperCase("tr-TR")`) — "iri" → "İri" (noktalı İ ile)
- All-caps kısaltmaları korur — "DNA" → "DNA" (Dna olmaz)
- Display-time uygulanır, DB değişmez (gelecekte admin lowercase girse bile düzgün gösterilir)

**Uygulandığı yerler:**
- `src/components/product-card.tsx` — ürün kartı (grid)
- `src/app/urun/[id]/page.tsx` — ürün detay (breadcrumb + h1 + WhatsApp/share mesajları)
- `src/components/cart-drawer.tsx` — sepet
- `src/components/header.tsx` — arama sonuçları

**Örnekler:**
- `rose taşlı yüzük 2` → `Rose Taşlı Yüzük 2`
- `Altın taşlı yüzük` → `Altın Taşlı Yüzük`
- `gold taşlı iri yüzük 2` → `Gold Taşlı İri Yüzük 2`
- `DNA yzk 1` → `DNA Yzk 1`

## Proje Bilgileri

- **Proje Adı:** Favian Jewellery (eski: Yazıcı Pırlanta)
- **Tür:** Kuyumcu E-Ticaret Sitesi
- **Framework:** Next.js 14/16 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Hosting:** Vercel + custom domain (favianjewellery.com; yazicipirlanta.com 301 redirect olarak korunuyor)

## Teknoloji Stack

- Next.js 14/16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (button, card, badge, input, separator, sheet, navigation-menu)
- Prisma + Supabase (DB + Storage for ürün görselleri)
- Vercel hosting
- Sharp image optimization (WebP)
- Three.js (React Three Fiber) — 360° ürün viewer
- Fonts: Cormorant Garamond (serif) + Montserrat (sans) + Pinyon Script (cursive/font-script)

## Renk Paleti (gerçek değerler)

- **Primary/Gold:** `#C6A25A` (CSS değişkeni: `--gold`)
- **Dark text:** `#2B2B2B`
- **Cream BG:** `#F5F1EA`
- **Beige BG:** koyu cream tonları
- **Border:** `#E5E5E5`
- **Tailwind extension:** `gold`, `dark`, `cream`, `beige`, `border`, `foreground`, `muted-foreground` — `globals.css` içinde

## Sayfa Yapısı

```
/                 - Ana sayfa (VideoHero, kategoriler, sticky kolye, featured, yüzükler,
                   banner, güven ikonları, testimonials, FAQ, üretim, Instagram)
/urunler          - Ürün listesi (filtre, sıralama, arama)
/urun/[id]        - Ürün detay (galeri, zoom, color variant, taş tablosu, WhatsApp)
/hakkimizda       - Hakkımızda (hero + hikaye + atölye gallery + neden biz + iletişim)
/iletisim         - İletişim formu + bilgi kartları + WhatsApp
/favoriler        - Favoriye eklenen ürünler
/360-demo         - 3D ürün görüntüleyici (deneme)
/admin            - Admin dashboard
/admin/login      - Admin giriş
/admin/urunler    - Ürün CRUD (+ /new alt sayfası)
/admin/kategoriler
/admin/slider     - Hero slider yönetimi
/admin/yorumlar   - Testimonial yönetimi
/admin/formlar    - Gelen iletişim formları
/admin/icerikler  - Sayfa içerik blok yönetimi (hero, banner, FAQ, vb.)
/admin/ayarlar    - Site geneli ayarlar (telefon, mail, sosyal medya)
```

## Önemli Dosyalar

- `src/app/page.tsx` — Ana sayfa (hero, kategoriler, sticky scroll, banner, featured, yüzükler, üretim, testimonials, FAQ, Instagram)
- `src/app/urun/[id]/page.tsx` — Ürün detay
- `src/components/header.tsx` — 3 bölüm (Announcement bar / Ana header desktop-only / Mobil sticky header)
- `src/components/video-hero.tsx` — Aktif hero (background video)
- `src/components/hero-slider.tsx` — Eski slider (kullanılmıyor ama duruyor)
- `src/components/footer.tsx` — 4 kolon (Hakkımızda / Hizmetler / Bilgiler / Bülten)
- `src/components/product-card.tsx` — Grid kartı (formatProductName uygulu)
- `src/lib/products.ts` — Fallback ürün listesi + `formatPrice` + `formatProductName` helper'ları
- `src/app/globals.css` — Brand colors, CSS variables, h1-h6 base styles
- `src/app/layout.tsx` — Root layout (Cormorant Garamond + Montserrat font, SEO metadata)
- `prisma/schema.prisma` + `seed.ts` + `seed-content.ts` — DB schema + seed data

## Tasarım Kararları (müşteri talebiyle değiştirildi)

- **5 başlık Montserrat Bold:** ÖZEL KOLEKSİYONLARIMIZ, ürün breadcrumb, ürün adı h1, Mücevher Hakkında, (hero sonradan Light'a çekildi)
- **Hero Montserrat Light (300):** h1 ve subtitle ikisi de light
- **Sticky scroll kolye resmine CTA:** "Koleksiyonları Keşfet" butonu → `/urunler?kategori=kolye`. Konum: merkez + `md:translate-x-80 lg:translate-x-[28rem] xl:translate-x-[40rem]` (müşteri iteratif olarak sağa çekti)
- **Logo boyutu 2.5x:** desktop h-[100px] md:h-[120px], mobil sticky h-[80px], drawer h-[100px]. Header height de büyüdü (h-28/md:h-36).
- **Ana header mobilde gizli:** `hidden lg:block` — aksi halde mobilde 2 logo görünüyordu
- **Üretim bölümü temizliği:** "Usta ellerden, özenle işlenen parçalar" kartı tamamen kaldırıldı (defaults + seed + runtime filter)
- **Mücevher Hakkında:** typo düzeltildi (Mucevher Hakkinda → Mücevher Hakkında, sonra ASCII genel temizliğinde tutarlı oldu)

## Mobil Ürün Kartı Galerisi (2026-07-23)

**İstek:** Mobilde ürüne tıklamadan, kart üzerinde kaydırarak diğer görselleri görebilmek.

**Çözüm:** `src/components/product-card.tsx` — CSS scroll-snap tabanlı yatay galeri:
- `product.images` sırasıyla + `hoverImage` sona eklenir (tekrarlar `Set` ile ayıklanır).
  hoverImage mobilde hover olmadığı için aksi halde hiç görünmüyordu.
- Mobil: `overflow-x-auto snap-x snap-mandatory` → native momentum scroll.
  Masaüstü: `md:overflow-x-hidden` → kaydırma kapalı, mevcut hover cross-fade davranışı korunur.
- **15 sn kaydırılmazsa 1. görsele döner** (`IDLE_RESET_MS`). Timer yalnızca index > 0 iken kurulur.
- Nokta göstergeleri yalnızca mobilde (`md:hidden`), tıklanabilir.
- Yatay kaydırma sonrası yanlışlıkla ürün sayfasına gitmeyi `didSwipeRef` + `preventDefault` engeller
  (eşik: `SWIPE_THRESHOLD_PX = 10`).
- `.scrollbar-hide` utility'si `globals.css`'e eklendi.

**Veri durumu (2026-07-23, canlı API):** 122 üründen 88'inin 2+ görseli var → özellik ürünlerin %72'sinde çalışır.

## Admin Kategori Bug'ı (2026-07-23) — ÇÖZÜLDÜ

**Sorun:** Admin > Ürünler > Yeni'de "Satıcıya Sor" seçilince kategori değiştirilemiyordu;
tüm ürünler varsayılan `yuzuk` olarak kaydediliyordu.

**Kök neden:** `src/app/admin/urunler/new/page.tsx` — Fiyat, Eski Fiyat, **Kategori** ve
Kategori Etiketi aynı grid `<div>` içindeydi. `priceOnRequest` true olunca bu div'e
`opacity-40 pointer-events-none` uygulanıyor, fiyat alanlarıyla birlikte Kategori select'ini de kilitliyordu.

**Çözüm:** Kategori + Kategori Etiketi ayrı bir grid'e taşındı; `pointer-events-none` yalnızca
Fiyat / Eski Fiyat'a uygulanıyor.

**Etkisi (canlı veriden ölçüldü):** "Satıcıya Sor" seçili 74 ürünün 72'si `yuzuk` kategorisindeydi.
Yanlış kategorideki 17 ürünün tamamı "Satıcıya Sor": 8 küpe, 6 bileklik, 3 kolye.
`bileklik` kategorisinde hiç ürün yoktu. Bu ürünler `scripts/fix-categories.mjs` ile düzeltildi.

## Instagram (2026-07-23)

- **Doğru handle:** `favian.jewellery` (nokta ile) — eski `favianjewellery` yanlıştı.
  Güncellenen yerler: `page.tsx` instagramUrl fallback, `SocialMediaSection.tsx`, `admin/ayarlar` placeholder.
- **Kırık grid:** `defaultInstagramImages` ve `prisma/seed-content.ts` `/images/instagram-1..6.jpg`
  dosyalarını gösteriyordu ama bu dosyalar hiç yüklenmemişti (canlıda HTTP 404 doğrulandı).
  Sitede gerçekten var olan 6 ürün görseliyle değiştirildi. Admin > İçerikler'den değiştirilebilir.
- **Not:** Facebook / YouTube / TikTok hâlâ `favianjewellery` placeholder'ı kullanıyor —
  gerçek hesaplar öğrenilince admin > Ayarlar'dan güncellenmeli.

## Yaygın Sorunlar & Çözümler

- **Dev server kapanıyor:** `nohup npm run dev > dev.log 2>&1 &` + `disown` ile başlat — parent shell'den bağımsız çalışsın
- **Logo cache:** Vercel CDN eski logoyu önbellekte tutabilir; yeni deploy genelde temizler, gerekirse dosya adını değiştir
- **H1-H6 font-weight override:** `globals.css` base layer h1-h6'ya zorla `font-serif font-bold` uyguluyor, hero title gibi farklı istediğin yerlerde explicit `font-sans font-light` kullan
- **Text rengi:** h3'te `text-foreground` base'den geliyor; beyaz istiyorsan explicit `text-white` yazmak lazım
- **Türkçe karakterler:** Artık doğrudan yaz (Ç, Ş, İ, Ğ, Ü, Ö, ı). Eski "ASCII not" geçersiz.

## Fiyat Pazarlığı (2026-04-16 görüşüldü)

**Türkiye 2026 piyasası:**
- Hazır tema kurulumu: 15-40K TL
- SaaS kiralık (Ticimax/IdeaSoft): 500-2K/ay — sahibi değilsin
- Custom Next.js freelance: 40-150K TL
- Ajans: 200-500K+ TL

**Bu projenin değeri:**
- Custom kod + tam admin paneli + 360° viewer + özel tasarım
- Orta-üst freelance segmenti: **85-120K TL** aralığı

**Önerilen teklif:**
- **One-time:** 90,000 TL (anchor: 100K iste, 85K'ya in)
- **Aylık bakım:** 2,500-3,500 TL (Vercel+Supabase+domain maliyeti ~1-1.5K)
- **Ödeme planı:** 3 taksit — %40 başlangıç, %30 teslim, %30 bir ay sonra

**Pazarlık argümanları:**
- "Hazır kurulum 30K ama tamamen size özel kod, başka kuyumcu da aynısını alamıyor"
- 1 alyans satışı = 30-50K → site yılda 5-10 ek satış getirince ROI 3-6 ayda kapanır
- SaaS alternatifi: Ticimax 1500₺/ay × 5 yıl = 90K, sahipliği yok
- Bakım sözleşmesini tek seferlik fiyata sıkıştırma — AYRI yap

## Geçmiş Commit'ler (önemli olanlar)

```
35cb4ee  fix: tum metinleri turkce karakter ile yaz + urun adlari icin Title Case formatlama (2026-05-21)
61900ad  remove: Ozel Koleksiyonlarimiz baslik bolumu
595fd14  rebrand: Yazici Atolye -> Favian Jewellery + hero video
5e11def  logo: PIRILANTA -> PIRLANTA (dogru yazim)
b7173b7  fix: ana header sadece lg+ ekranlarda goster — mobilde tek logo
bb66efa  style: logo 2.5x buyutuldu (header yuksekligi de buyudu)
```

## İletişim Bilgileri (Placeholder — admin/ayarlar'dan editlenebilir)

- Adres: İstanbul, Türkiye
- Telefon: +90 (212) 123 45 67
- E-posta: info@favianjewellery.com
- Çalışma Saatleri: Pzt-Cmt 10:00-19:00

## Yapılacaklar (backlog)

- [ ] Mobil uyum ince ayar (logo büyüdükten sonra kontrol)
- [ ] Gerçek ürün görselleri (Gemini ile üretilebilir)
- [ ] Ödeme entegrasyonu (iyzico/Stripe)
- [ ] Admin panelinde ürün toplu ekleme
- [ ] WhatsApp gerçek numara
- [ ] Google Analytics
- [ ] SEO ince ayarları
- [ ] Müşteriye fiyat teklifi sunumu
- [ ] Admin'in girdiği ürün adlarını DB'de düzenli tutmak (formatProductName display'de var, ama DB de istersen migration yazılabilir)

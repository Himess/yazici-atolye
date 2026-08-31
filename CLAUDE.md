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

## PayTR ve Google Workspace Notları (2026-08-06)

- PayTR entegrasyonu `PayTR iFrame API` yönünde ilerliyor.
- Ödeme sayfası: `/odeme`
- Checkout API: `src/app/api/checkout/paytr/route.ts`
- Callback API: `src/app/api/paytr/callback/route.ts`
- PayTR helper: `src/lib/paytr.ts`
- PayTR callback URL:

```text
https://favianjewellery.com/api/paytr/callback
```

- PayTR env değişkenleri:

```bash
PAYTR_MERCHANT_ID=""
PAYTR_MERCHANT_KEY=""
PAYTR_MERCHANT_SALT=""
PAYTR_TEST_MODE="0"
PAYTR_DEBUG_ON="0"
NEXT_PUBLIC_SITE_URL="https://favianjewellery.com"
```

- Canlıya geçmeden önce PayTR başvurusu onaylanmalı ve bu değerler Vercel Environment Variables içine girilmeli.
- Testte `PAYTR_TEST_MODE="1"` ve `PAYTR_DEBUG_ON="1"` kullanılabilir.
- PayTR başvurusu amcanın şahıs şirketi üzerinden yapılacak. Vergi levhası amcanın şirketine ait.
- PayTR formunda:
  - Yetkili adı/soyadı: vergi levhasındaki kişi, örnek Mustafa Yazıcı
  - İşletme tipi: `Şahıs İşletmesi (Vergi Levham Var)`
  - Başvurulacak ürün: `Sanal POS`
  - Yetkili e-posta olarak `info@favianjewellery.com` kullanılabilir
  - Yetkili telefon başvuruyu takip edecek kişi olabilir, ama şirket sahibi bilgileriyle çelişmemeli

### Satıcıya Sor Ürünleri

- Sepette fiyatı olmayan / `priceOnRequest` ürünler `Satıcıya Sor` olarak kalır.
- Bu ürünler PayTR ödeme sepetine gönderilmez.
- Sepette hem fiyatlı hem `Satıcıya Sor` ürün varsa PayTR ödeme sadece fiyatlı ürünler için başlatılır.
- Sepette sadece `Satıcıya Sor` ürün varsa online ödeme başlatılmaz, müşteriye iletişim mesajı gösterilir.

### Sipariş ve Callback

- Siparişler `Order` ve `OrderItem` tablolarına kaydediliyor.
- Callback hash doğrulaması `merchant_oid + merchant_salt + status + total_amount` üzerinden yapılıyor.
- PayTR callback düz `OK` cevabı dönmeli; HTML/JSON dönmemeli.
- Callback idempotent hale getirildi: sipariş `paid` veya `failed` ise tekrar gelen PayTR bildirimi sadece `OK` döner.
- PayTR'den gelen ek alanlar DB'de saklanıyor:
  - `paytrPaymentAmount`
  - `paytrPaymentType`
  - `paytrFailedReasonCode`
  - `paytrFailedReasonMsg`
- Admin `Siparişler` ekranında ödeme tipi, PayTR tutarı ve başarısız ödeme hata mesajı gösteriliyor.

### Google Workspace / Mail

- `favian@jewellery.com` yanlış denendi; çünkü `jewellery.com` bize ait değil.
- Doğru domain: `favianjewellery.com`
- Önerilen ve kullanılan profesyonel mail:

```text
info@favianjewellery.com
```

- Google Workspace'te hesap işletme için açılmalı.
- Domain doğrulamada sadece `favianjewellery.com` yazılmalı; `www` veya e-posta adresi yazılmamalı.
- Google Workspace Gmail etkinleştirildi.
- Gmail testi için kişisel mailden `info@favianjewellery.com` adresine test maili gönderilip gelen kutusu kontrol edilmeli.

### Cloudflare / DNS

- `favianjewellery.com` DNS Cloudflare üzerinden yönetiliyor.
- DNS sorgusunda nameserver'lar:

```text
rob.ns.cloudflare.com
marissa.ns.cloudflare.com
```

- Site A kaydı Vercel'e gidiyor:

```text
favianjewellery.com -> 76.76.21.21
```

- Cloudflare hesabını kuzen açmış olabilir. Domain Cloudflare panelinde görüldü.
- Google Workspace doğrulama ve Gmail için Cloudflare DNS'te TXT/MX kayıtları gerekir.
- Google "Gmail etkin" dediyse MX kayıtları büyük ihtimalle eklenmiştir, yine de Cloudflare DNS'te kontrol edilebilir.

## Favian Gorsel Uretim Notlari (2026-08-08)

- Bundan sonra uretilen Favian urun/lifestyle gorselleri kolay bulunmasi icin su klasore kaydedilecek:

```text
C:\Users\User\Desktop\favian-görseller
```

- Imagegen varsayilan olarak ciktilari `C:\Users\User\.codex\generated_images\...` altina kaydeder; final/begenilen ciktilar ayrica yukaridaki masaustu klasorune kopyalanmali.
- 2026-08-08 itibariyle Downloads altindaki `favian-*.png` dosyalari bu klasore toplandi.
- Onemli dosyalar:
  - `favian-alyans-variant-1-minimal-twist.png`
  - `favian-alyans-variant-2-bold-wave.png`
  - `favian-alyans-variant-3-satin-polish.png`
  - `favian-alyans-variant-4-pave-twist.png`
  - `favian-alyans-variant-5-two-tone.png`
  - `favian-cinematic-rings-top-diamonds-enhanced.png`
  - `favian-gold-wide-diamond-edge-ring-frontview.png`
  - `favian-gold-wide-diamond-edge-ring-symmetric-frontview.png`

## Favian Devam Notlari (2026-08-09)

### PayTR Basvuru Durumu

- PayTR on basvurusu gonderildi.
- Basvuru bilgileri amcanin sahis sirketi/vergi levhasi uzerinden girildi.
- Yetkili kisi: Mustafa Yazici.
- Yetkili e-posta: `info@favianjewellery.com`.
- Isletme tipi: `Sahis Isletmesi (Vergi Levham Var)`.
- Basvurulan urun: `Sanal POS`.
- PayTR cevabi bekleniyor.

### Ana Sayfa Alyans Bolumu

- Ana sayfadaki `ALYANSLAR` bolumu `/api/products?homepageAlyans=true&limit=4` ile geliyor.
- Bu liste admin panelindeki urun kartlarinda bulunan `Ana Sayfa Alyans` yildizi/secimi ile yonetiliyor.
- `Serze Alyans` urunu eklendi.
- `Ela Alyans` yerine ilk kartta `Serze Alyans` gosterilmek istenirse panelden:
  - `Serze Alyans` icin `Ana Sayfa Alyans` aktif edilmeli.
  - `Ela Alyans` icin `Ana Sayfa Alyans` kapatilmali.
- Kod tarafinda Serze'yi zorla one alma kurali eklenmedi; panel tek kaynak olarak kalacak.

### Gorsel / Urun Hazirligi

- Kullanici nish alyans urunleri uretip once sosyal medya/reklam icin sinematik gorseller, sonra site icin beyaz studyo/frontview gorseller hazirliyor.
- Ayni renk paletindeki alyanslar sirali post olarak kullanilabilir.
- Site urun gorsellerinde hedef format:
  - Beyaz veya temiz studyo sahnesi.
  - Frontview/dik kompozisyon.
  - Urun anatomisi bozulmadan net tas, tirnak ve metal detayi.
  - Iki urun/alyans varsa erkek ve kadin modeli yan yana, golgeler ve perspektif tutarli.
- Higgs / Nano Banana Pro kullanilirken kisa ve net promptlar daha iyi sonuc verdi.

### Son Teknik Not

- Local projede `.env` yok; bu yuzden canli veritabanina lokalden dogrudan baglanip homepage alyans sirasini degistirmek mumkun degil.
- Canli urun API'sinde `Serze Alyans` goruldu:
  - slug: `serze-alyans`
  - kategori: `yuzuk`
  - kategori etiketi: `alyans`
  - fiyat: `Satıcıya Sor` mantiginda, `priceOnRequest: true`

### Logo / Watermark Ihtiyaci

- Instagram ve urun gorsellerinde kullanmak icin artik Favian watermark/logo ihtiyaci var.
- Iki ayri kullanim dusunuluyor:
  - Fotolara koymalik ince watermark: `F A V I A N`.
  - Site, kutu, kartvizit ve yuzuk ici basmalik sade logo: `FAVIAN`.
- Yuzuk ici baskida uzun metin zor olursa alternatif:
  - `FAVIAN`
  - `FVN`
  - sade `F` monogram
- Watermark amaci urun gorsellerinin kolay calinmasini engellemek/caydirmak.
- Koseye cok belirgin logo koymak yerine fotograf kompozisyonuna gomulu, dusuk opacity ve urunu kapatmayan kullanim daha iyi.
- Sonraki adimda 3 logo yonu denenebilir:
  - minimal serif
  - luks kuyumcu
  - modern ince monogram

### FVN Logo Yonu

- Fotolarda ana marka izi olarak duz `F A V I A N` yerine kucuk sekilli `FVN` logo kullanilacak.
- Kullanici gerekirse Instagram/WhatsApp uzerinden ayrica `F A V I A N` metnini yazabilir.
- `FVN` logo mutlaka muhur/damga gibi hissettirmeli; cikartma gibi ucuz durmamali.
- Kullanim alanlari:
  - urun/lifestyle fotograflarina kucuk watermark/damga
  - kutu ici
  - sticker
  - kart/poset
  - yuzuk ici basma/gravur
- Yuzuk ici basmada ayni logonun daha minimal, sade ve okunur hali kullanilmali.
- Logo ozellikleri:
  - minimal luxury jewelry monogram
  - ince serif harf hissi
  - kompakt ve kucuk boyutta okunur
  - harfler arasinda cok hafif ozel bag/liga olabilir
  - siyah, beyaz ve altin versiyonlari dusunulebilir
  - tac, pirlanta ikonu, cicek, fazla sus, kalin badge cercevesi kullanilmamali
- Prompt yonu:

```text
Minimal luxury jewelry monogram logo using the letters FVN. Create a refined stamp-like emblem, elegant and compact, suitable for jewelry photography watermark, packaging sticker, and inner ring engraving. Thin high-end serif letterforms, balanced spacing, subtle custom ligature between the letters, premium atelier feeling. The logo should work at very small sizes, clean silhouette, no excessive ornament, no crown, no diamond icon, no generic jewelry symbol. Black logo on white background, vector-style, centered composition.
```

- Yuzuk ici gravur prompt yonu:

```text
Ultra-minimal FVN jewelry engraving mark, single-color, very thin clean lines, compact and legible at tiny size, no decoration.
```

### FVN Logo Dosyalari (2026-08-10)

- Son indirilen duz `FVN` logo gorselinden siyah ve beyaz transparan PNG cikartildi.
- Ilk cikartmada kaynak gorselin kirik beyaz/noise arka plani yuzunden logonun arkasinda hafif seffaf dikdortgen kalintisi gorundu.
- Sebep: kaynak zemin saf beyaz degildi; arka plandaki cok acik pikseller alpha maskesine dusuk opacity olarak girdi.
- Daha sonra daha sert threshold ile temiz versiyonlar olusturuldu. Kullanilacak asil dosyalar:

```text
C:\Users\User\Desktop\favian-görseller\favian-fvn-logo-black-transparent-clean.png
C:\Users\User\Desktop\favian-görseller\favian-fvn-logo-white-transparent-clean.png
```

- Kontrol/preview dosyasi:

```text
C:\Users\User\Desktop\favian-görseller\favian-fvn-logo-clean-preview.png
```

- Kullanim:
  - koyu/sinematik postlarda beyaz clean logo
  - beyaz/studyo/acik postlarda siyah clean logo
  - opacity genelde %70-85 arasi denenebilir
  - logo urunun uzerine degil, bos/nefes alan alana konmali

## Favian Devam Notlari (2026-08-11)

### PayTR / Kuyum Yetki Belgesi

- PayTR kuyum satisi icin `Kuyum Ticareti Yetki Belgesi` istedi.
- Bizde mevcut evraklar:
  - vergi levhasi
  - ustalik belgesi
- Vergi levhasinda ana faaliyet:
  - `321201 - Degerli metallerden taki ve mucevherlerin imalati`
- PayTR tarafindan iletilen pratik cevap: kuyum satisi yapilan yerlerde kuyum yetki belgesi zorunlu.
- Bu belge cikana kadar online odeme zorlanmayacak.
- Site simdilik `Saticiya Sor` modeliyle devam edecek.
- Belge icin muhasebeciyle KTBS / faaliyet kodu / oda kaydi / vergi borcu yoktur / ustalik belgesi uygunlugu kontrol edilmeli.

### Public Siteden Gizlenen Kolyeler

- Ekran goruntulerinde istenen kolyeler public siteden gizlenecek sekilde kodlandi.
- Admin panelde kayitlar kalir; public `/api/products` ve urun detay `/api/products/[slug]` tarafinda gorunmez/404 olur.
- Gizleme listesi `src/lib/public-product-visibility.ts` icinde tutuluyor.
- Gizlenen isimler:
  - Aria Kolye
  - Ela Kolye
  - Lia Kolye
  - Nora Kolye
  - Lora Kolye
  - Mina Kolye
  - Mira Kolye
  - Sera Kolye
  - Riva Kolye
  - Dora Kolye
  - Nila Kolye
  - Maya Kolye
  - Siena Kolye
  - Lia 2 Kolye
  - Rosa Kolye
  - Liva Kolye
  - Nova Kolye
  - Larin Kolye
  - Alina Kolye
  - Narin Kolye
  - Vesta Kolye
  - Nessa Kolye
  - Alora Kolye
  - Mona Kolye
  - Vina Kolye
  - Clara Kolye
  - Iris Kolye
  - Arya Kolye
  - Sonia Kolye
  - Elya Kolye
  - Melina Kolye
  - Dalia Kolye
  - Aden Kolye
  - Mina 2 Kolye
  - Ela 2 Kolye
  - Aria 2 Kolye
  - Mira 2 Kolye
  - Riva 2 Kolye
  - Nova 2 Kolye
- Kontroller:
  - `npx eslint src\lib\public-product-visibility.ts src\app\api\products\route.ts 'src\app\api\products\[slug]\route.ts'`
  - `npx tsc --noEmit`
- Bu degisiklik GitHub `main` branch'e pushlandi:
  - commit: `862f5e5 Hide selected necklace products from public site`
- Vercel deploy sonrasi canli `/api/products` kontrol edildi; gizlenen urunler public API'den gelmiyor.

### Urunler Sayfasi Kategori Gecis Bug Fix

- Masaustu webde `TAKILAR` dropdown'undan ayni `/urunler` sayfasindayken `Yuzukler -> Kolyeler` gibi kategori degistirince URL degisse bile urun listesi eski kategoride kalabiliyordu.
- Sebep: `src/app/urunler/page.tsx` icinde `selectedCategory` state'i sadece ilk acilista `kategori` query paramindan okunuyordu; ayni route icinde query degisince state senkronlanmiyordu.
- Fix:
  - `kategoriParam` degisince `selectedCategory` guncelleniyor.
  - `siralamaParam` degisince `sortBy` guncelleniyor.
- Commit:
  - `b9da24f Sync product filters with URL changes`
- Push:
  - GitHub `main` branch'e pushlandi.
- Kontroller:
  - `npx eslint src\app\urunler\page.tsx`
  - `npx tsc --noEmit`
- Not: ESLint sadece onceden var olan `categoryName is assigned a value but never used` warning'i verdi; build/type hatasi yok.

### Dorika Kolye UGC Video Prompt Notu

- Urun: yesil dogal tasli dorika kolye.
- Fiyat dusuk segment / yaklasik 200 TL civari post-yanina kaydirmali icerik olarak dusunuldu.
- Video formati:
  - Instagram carousel icin `1:1`.
  - Sure: `6 saniye`.
  - Tek plan.
  - Zoom yok.
  - Cut scene yok.
  - Surat/goz gorunmeyecek.
  - Kadraj: boyun, koprucuk kemigi, ust gogus ve kolye.
- Karakter tamamen donuk kalmayacak; hareket minimal ve dogal olacak:
  - hafif nefes alma
  - cok ufak omuz hareketi
  - cok ufak boyun donusu
  - kolyenin narin dogal salinimi
- Prompt yonu:

```text
Square 1:1 luxury jewelry ad video, 6 seconds.

Close-up shot of a woman wearing the green natural stone dorika necklace.
Frame only the neck, collarbone, upper chest, and necklace.
Do not show the face or eyes.

No zoom in, no zoom out, no cut scene, no scene change.
The video should be one continuous stable shot.

The model should not stay completely frozen.
Add subtle natural movement: gentle breathing, a slight shoulder shift, a very small neck turn, and a delicate natural sway of the necklace.
The movement should be minimal, elegant, and realistic, like a premium jewelry commercial.

The necklace should remain the main focus and clearly visible throughout the entire video.
Soft warm indoor lighting, realistic skin texture, premium jewelry commercial feeling.
The green stone pendant and dorika chain must stay sharp and unchanged.

Motion must be smooth, fluid, and stable:
no stutter,
no jitter,
no frame skipping,
no sudden camera movement,
no flicker.

Keep the necklace design unchanged.
No extra jewelry, no text, no logo, no watermark, no distorted neck, no warped chain.
```

## Favian Devam Notlari (2026-08-17)

### PayTR Durumu / Satis Modeli

- PayTR kuyum satisi icin kuyum sertifikasi/yetki belgesi istedigi icin odeme entegrasyonu simdilik rafa kaldirildi.
- Site su an `Saticiya Sor` modeliyle devam ediyor.
- Bu model kullanici tarafindan uygun bulundu; musteri urun sayfasindan WhatsApp'a dusunce direkt soru/satis konusmasi basliyor.
- WhatsApp Business ayarlari daha sonra yapilabilir; su an kritik degil.
- Mevcut urun detay akisi kontrol edildi:
  - WhatsApp numarasi canli ayarlardan geliyor: `+90 531 457 82 94`
  - `Saticiya Sor` butonu su mesaji hazirliyor:

```text
Merhaba, "[Urun Adi]" (Kod: [Urun Kodu]) urununun fiyati ve stok durumu hakkinda bilgi alabilir miyim?
```

- Urun detayda ayrica `WhatsApp Asistan` butonu da var; ikisi de WhatsApp'a yonlendiriyor. Su an sorun degil.

### E-posta Guncellemesi

- Tum gercek iletisim/admin placeholder mail adresleri `info@favianjewellery.com` yapildi.
- Canli site ayari da admin API uzerinden guncellendi.
- Canli kontrol:

```text
https://favianjewellery.com/api/settings -> email: info@favianjewellery.com
```

- Degisen dosyalar:
  - `prisma/seed.ts`
  - `setup.mjs`
  - `update-theme.mjs`
  - `src/app/admin/login/page.tsx`
- Eski `info@yaziciatolye.com`, `admin@yaziciatolye.com`, `admin@favianjewellery.com` aramasi temiz cikti.

### Link Onizleme / Favicon Guncellemesi

- Kullanici Favian sitesinin linki paylasilinca cikan kucuk siyah-beyaz ucgen/Vercel ikon yerine son indirilen Favian yazili gorselin cikmasini istedi.
- Kaynak dosya:

```text
C:\Users\User\Downloads\IMG_4767.jpg.jpeg
```

- Gorsel: beyaz/deri zemin uzerinde ortada `FAVIAN` yazisi.
- Bu gorselden yeni link onizleme ve ikon dosyalari uretildi:

```text
public/images/favian-link-preview.jpg
src/app/favicon.ico
src/app/icon.png
src/app/apple-icon.png
```

- `src/app/layout.tsx` metadata guncellendi:
  - `metadataBase: https://favianjewellery.com`
  - `openGraph.images: /images/favian-link-preview.jpg`
  - `twitter.images: /images/favian-link-preview.jpg`
  - `icons` alanlari yeni Favian ikonlarina baglandi.
- Ilk uretilen `.ico` dosyasi Next build'de `The PNG is not in RGBA format` hatasi verdi.
- Favicon RGBA olarak yeniden uretildi; sonrasinda `npm run build` basariyla gecti.
- Commit ve push:

```text
1f49da7 Update Favian contact email and link preview
```

- Canli kontrol:
  - `https://favianjewellery.com/images/favian-link-preview.jpg` -> 200
  - `https://favianjewellery.com/icon.png` -> 200
  - Ana sayfa HTML icinde `favian-link-preview` metadata gorundu.
- Not: WhatsApp / Instagram / Telegram gibi uygulamalar link onizlemesini cache'leyebilir; ayni link once paylasildiysa eski ikon bir sure gorunebilir.

### Reels / Pazarlama Durumu

- Kullanici reels atmaya basladi.
- Su an teknik odak odeme degil; reels'ten gelen kisiyi urun sayfasi ve `Saticiya Sor` WhatsApp akisi uzerinden konusmaya almak yeterli.
- `/instagram` landing page, detayli reels stratejisi ve WhatsApp Business ayarlari simdilik ertelendi; kullanici bunlari su an gereksiz detay olarak gordu.

### Bestas Yuzuk Gorsel Uretimi

- Kullanici yeni urun olarak bir bestas yuzuk eklemek istiyor.
- Kaynak HEIC referanslari:

```text
C:\Users\User\Downloads\IMG_9515.HEIC
C:\Users\User\Downloads\IMG_9516.HEIC
C:\Users\User\Downloads\IMG_9517.HEIC
C:\Users\User\Downloads\IMG_9518.HEIC
C:\Users\User\Downloads\IMG_9519.HEIC
```

- HEIC dosyalari Sharp ile metadata okunabildi ama decode sirasinda `Support for this compression format has not been built in` hatasi verdi.
- Cozum: FFmpeg ile JPG referanslara cevrildi:

```text
tmp/favian-bestas-ref/img_9515.jpg
tmp/favian-bestas-ref/img_9516.jpg
tmp/favian-bestas-ref/img_9517.jpg
tmp/favian-bestas-ref/img_9518.jpg
tmp/favian-bestas-ref/img_9519.jpg
```

- Kullanici ozellikle su ayrimi vurguladi:
  - `IMG_9519` = duz frontview / tas dizilimi.
  - `IMG_9518` = tas yuvalari, montur, oval oyma isciligi.
  - `IMG_9517` = dar yan profil, dikey oyma isciligi.
- Ilk 5 acili seri kalite/renk olarak zayif bulundu; metal gri/mat/CG gibi durdu.
- Daha iyi sonuc veren yontem:
  - Tek aci referansi ile aciyi kilitle.
  - Temiz studyo/metalik finish icin onceki temiz ciktinin stilini kullan.
  - Promptta `cizik yok, mat yok, kirli/tarnish yok, yeni parlatilmis beyaz/silver metal` seklinde net yasak koy.

- Kullanilabilir temiz ciktilar:

```text
C:\Users\User\Desktop\favian-görseller\favian-bestas-ring-frontview-img9519-studio.png
C:\Users\User\Desktop\favian-görseller\favian-bestas-ring-gallery-img9518-clean-studio.png
C:\Users\User\Desktop\favian-görseller\favian-bestas-ring-side-img9517-clean-studio.png
C:\Users\User\Desktop\favian-görseller\favian-bestas-ring-upright-frontview-corrected-studio.png
```

- Ayni gorseller kullanicinin yeni urun klasorune de kopyalandi:

```text
C:\Users\User\Desktop\yeni ürünler favıan\beştaş
```

- Klasor ismindeki `favıan` noktasiz `ı` ile yaziliyor; path yazarken dikkat.
- Urun adi icin onerilen isim:

```text
Mira Beştaş Yüzük
```

- Alternatif isimler: `Lina Beştaş Yüzük`, `Vera Beştaş Yüzük`, `Alina Beştaş Yüzük`, `Seren Beştaş Yüzük`.

- Son iyi prompt mantigi:

```text
Create an upright front-facing ecommerce studio photo of the exact same five-stone ring.
Use IMG_9519 for the stone row/front setting, IMG_9518 for the real basket/prong/side gallery construction, and the clean studio output only for polished metal finish.
The ring must stand vertically upright, full circular band visible, five stones along the top crown.
Preserve low shared basket/cup under each stone, short rounded prongs, vertical supports between stones, repeated oval/leaf openings, and triangular shoulder cutouts.
Clean polished bright white/silver metal, no scratches, no matte surface, no dirty/tarnished/yellow tone.
No redesign, no generic five-stone ring, no floating stones, no hand, no props, no text, no logo.
```

## Favian Devam Notlari (2026-08-18)

### Reels Video Kalitesi / Muzik Karari

- Kullanici elindeki yakin cekim urun videolarinda arka plan degistirmenin kaliteyi dusurup dusurmeyecegini sordu.
- Sonuc:
  - Kuyum yakin cekimlerinde komple background degistirmek riskli.
  - Tas pariltisi, metal yansimasi, motion blur, ten/parmak kenarlari ve yuzugun ic boslugu maske sirasinda kolay bozulur.
  - En guvenli yol arka plani tamamen degistirmek degil; arka plani blur/ton/karartma/isik ayariyla toparlamak.
- Galeri/iPhone video isik ayari:
  - Parlaklik/kontrast/pozlama ayari tek basina kaliteyi ciddi bozmaz.
  - Asil kalite kaybi yeniden export/sikistirma ve Instagram'in kendi recompression isleminden gelir.
  - Kuyumda highlights/parlak alanlar fazla acilirsa tas pariltisi patlayabilir; detay beyaza donebilir.
- Story/Reels muzik:
  - Instagram icinden muzik/sticker/efekt eklemek videoyu yeniden isletebilir; kalite az da olsa duser.
  - Kuyum urunlerinde tas pariltisi ve metal detaylari yuzunden bu dusus daha fark edilir olabilir.
- Business hesap / trend muzik:
  - Favian hesabi ticari/Business hesap olarak kalacak.
  - Creator hesaba gecmek trend muzik erisimi acabilir ama kullanici bunu marka/hesap yapisi icin mantiksiz buldu.
  - Business hesapta Instagram telifli/trend muzikleri kisitlayabilir; commercial music library daha sinirli olabilir.
- Pratik karar:
  - Tek urun videosu icin CapCut sart degil.
  - En az ugrastiran ve makul kalite akisi:

```text
1. Videoyu telefonda Galeri'den hafif isik/renk ayarla.
2. Direkt Instagram Reels'e yukle.
3. Muzigi Instagram icinden koy.
4. Filtre/efekt/sticker basma.
```

- CapCut sadece su durumlarda gerekli:
  - Instagram'da istenen muzik yoksa ve muzik videoya disaridan gomulecekse.
  - Birden fazla klip birlestirilecekse.
  - Kesme-bicme, yazi, transition veya daha ciddi kurgu gerekiyorsa.
- CapCut kullanilacaksa kalite icin:

```text
1080x1920
FPS: orijinal video neyse ayni
Bitrate: yuksek / higher
HDR ve otomatik enhance kapali denenmeli
WhatsApp uzerinden gonder-indir veya ekran kaydi kullanma
```

- Kisa sonuc:
  - Tek yakin cekim urun reels'i icin: CapCut kullanma, direkt Instagram daha az export ve daha az kalite kaybi.
  - Trend/telifli muzik Instagram'da cikmiyorsa CapCut ile gommek denenebilir ama telif/ses kisilmasi riski var.

## Favian Devam Notlari (2026-08-19)

### Higgs / Nano Banana Pro Prompt Notlari

- Kullanici Higgs/Nano Banana Pro'da urun gorseli uretirken kisa ve net prompt istiyor.
- Promptlarda image referanslari mutlaka hashtag ile yazilmali:

```text
#image1 #image2 #image3
```

- Genel prompt mantigi:
  - Referans gorseller ayni fiziksel urunun farkli acilari olarak tanitilmali.
  - Urun/yuzuk birebir ayni kalmali.
  - Sadece poz, kamera acisi, framing ve kompozisyon degismeli.
  - Tas sayisi, montur, prong, metal rengi, oranlar, form degismemeli.
  - `Do not redesign the ring. Do not create a new ring.` mutlaka yazilmali.

### Frontview Aci Sorunu

- Kullanici son indirilen gorselde yuzugun hafif yukaridan gorundugunu fark etti.
- Tam frontview icin sadece `front view` yazmak yetmiyor; model bunu hafif ustten/elevated product angle gibi yorumlayabiliyor.
- Tam frontview icin promptta su ifadeler kullanilmali:

```text
TRUE EYE-LEVEL FRONT VIEW
Camera is perfectly horizontal.
The lens is aligned with the center of the stone row.
Do not show from above.
No top-down angle.
No elevated angle.
Do not show the top inner surface.
The ring must physically touch the white studio surface.
It must not float in the air.
Show a realistic contact shadow under the ring.
```

- Kullanici ozellikle yuzugun havada asili durmasini istemiyor; stüdyo zeminine temas etmeli.

### Genis Tas Kanalli Yuzuk Denemesi

- Kullanici genis bantli, tas kanalli bir yuzuk icin frontview istedi.
- Codex imagegen ile duzeltme denendi ama model baska bir yuzuk uretmeye meyletti.
- Kullanici bu durumda Codex uretiminden memnun kalmadi; sadece Higgs icin prompt istemeyi tercih etti.
- Not: Bu tip yuzuklerde imagegen referansi bozabiliyor; Higgs tarafinda kisa prompt ve `same exact ring` vurgusu daha iyi.

### Higgs Icin Verilen 3 Aci Prompt Mantigi

- Tam frontview:

```text
#image1 #image2 #image3 are reference photos of the EXACT SAME physical ring.

Create a TRUE EYE-LEVEL FRONT VIEW of the exact same ring.
The ring must stand on a white studio surface and physically touch the ground.
It must not float in the air.

Camera is perfectly horizontal, aligned with the center of the stone row.
The ring faces directly forward.
Show a realistic contact shadow under the ring.

Keep the ring identical:
same wide band, same stone channel, same number of stones, same stone size and spacing, same prongs, same metal color, same proportions.

Do not redesign the ring.
Do not create a new ring.
Do not add or remove stones.
Do not show from above.

White studio background.
No text, no logo, no watermark.
```

- Three-quarter:

```text
#image1 #image2 #image3 are reference photos of the EXACT SAME physical ring.

Create a THREE-QUARTER VIEW of the exact same ring on a white studio surface.
The ring must physically touch the surface, with a realistic contact shadow.
It must not float in the air.

The stone channel should be clearly visible in the foreground.
The ring may be rotated slightly left or right, but the design must stay identical.

Keep the same wide band, same stone channel, same number of stones, same prongs, same metal color, same proportions and same ring shape.

Do not redesign, beautify, simplify, or alter the ring.
Do not add or remove stones.
Do not change the stone setting or metal color.

White studio background.
No text, no logo, no watermark.
```

- Bird's-eye/top-down:

```text
#image1 #image2 #image3 are reference photos of the EXACT SAME physical ring.

Create a TOP-DOWN BIRD'S-EYE VIEW of the exact same ring.
Camera is directly above the ring, looking straight down.
The ring lies flat on a white studio surface.

Show the full circular shape from above.
The stone channel must remain visible and match the reference ring.

Keep the ring identical:
same wide band, same stone channel, same number of stones, same stone spacing, same prongs, same metal color, same proportions.

Do not redesign the ring.
Do not add or remove stones.
Do not change the band or setting.
Do not create a different ring.

White studio background.
No text, no logo, no watermark.
```

### Tek Referanstan 4 Poz Uretme Promptlari

- Kullanici tek referans gorselden ayni sahne/ayni isikta 4 poz istemek icin prompt istedi.
- Amac: ref1'den alsin, ayni sahnede ayni isikta poz uretsin, ikinci/alttaki yuzugu kaldirsin.
- Genel kisa prompt:

```text
#image1 is the reference photo.

Generate 4 new photos of the same ring in the same scene and same lighting.
Use the exact same ring from #image1.
Only change the ring pose, angle, and composition.

Remove the second ring at the bottom side.
Show only one ring.

Keep the ring identical:
same design, same stones, same metal color, same proportions, same reflections.

Do not redesign the ring.
Do not add extra jewelry.
Do not change the background or lighting.

No text, no logo, no watermark.
```

- Ayrica 4 ayri poz promptu verildi:
  - Pose 1: close-up front angle, stone side facing the camera.
  - Pose 2: left three-quarter angle, ring slightly rotated, stone side clearly visible.
  - Pose 3: right three-quarter angle, ring slightly rotated, stone side in foreground.
  - Pose 4: top-down close-up angle, ring lying naturally in scene, stone side visible.

## 2026-08-20 - Urun Renk Varyanti Galeri Mantigi

- Kullanici bundan sonra ayni urunun Platin / Gold / Rose versiyonlarini ayri urun olarak acmak istemiyor.
- Tek urun kaydi olacak. Ornek: ana urun Platin yuklenecek, Gold ve Rose versiyonlari urunun icindeki renk secenekleri olarak eklenecek.
- Ana sayfa ve urun kartlarinda sadece ana urun gorselleri gorunecek. Karttaki kaydirmali galeri devam edecek ama varyant gorselleri burada karismayacak.
- Urun detay sayfasinda Platin / Gold / Rose butonlari olacak. Kullanici bu butonlara basinca detay galerisindeki gorseller o renk icin panelden yuklenen gorsellerle degisecek.
- Admin urun formuna "Renk Varyantlari" bolumu eklendi: ana renk secimi, Platin/Gold/Rose icin ayri URL ve ayri coklu gorsel yukleme alanlari var.
- Teknik not: `Product.colorVariants` mevcut Prisma alaninda JSON string olarak tutuluyor, `defaultColor` ana rengi belirliyor. Yeni migration gerekmedi.

## 2026-08-20 - Yeni Yuzuk Isim Notlari

- Kullanici tasli Platin ve Gold varyantli bir yuzuk icin isim istedi.
- Daha once sitede kullanildigi soylenen isimler: Liora, Arel, Mira, Elara, Luna, Vera.
- Yeni onerilen isimler: Alin Tasli Yuzuk, Nora Tasli Yuzuk, Sera Tasli Yuzuk, Dora Tasli Yuzuk, Rina Tasli Yuzuk, Iris Tasli Yuzuk, Selin Tasli Yuzuk, Alya Tasli Yuzuk.
- Son ek onerilen isim: Narin Tasli Yuzuk.

## Favian'i Hatirla - Ana Devam Notu

- Favian Jewellery projesinin ana not dosyasi: `C:\Users\User\Desktop\LİLİTHBROWNE\lilith!\yazici-atolye\CLAUDE.md`.
- Kullanici "Favian'i hatirla", "kaldigimiz yerden devam", "saveledigini oku" gibi bir sey derse once bu dosya okunacak.
- PayTR kuyum sertifikasi istedigi icin odeme konusu simdilik beklemede. Sitede satis akisi su an "Saticiya Sor" mantigina yakin ilerliyor; kullanici bu akisi simdilik okey buluyor.
- Tum mail adresleri `info@favianjewellery.com` olacak sekilde ayarlandi.
- Link preview/favicon icin kullanilan Favian gorseli `IMG_4767.jpg.jpeg` baz alindi; site linki atilinca siyah-beyaz ucgen yerine Favian gorseli cikmasi hedeflendi.
- Bes tas yuzuk icin referans HEIC dosyalari `C:\Users\User\Downloads\IMG_9515.HEIC` - `IMG_9519.HEIC`; uretilen/studyo gorselleri `C:\Users\User\Desktop\favian-görseller` ve `C:\Users\User\Desktop\yeni ürünler favıan\beştaş` tarafina kondu.
- Video/reels icin genel karar: kalite onemli oldugu icin background degistirme zorunlu degil; basit isik/renk ayarlari galeriden veya Instagram icinden yapilabilir. CapCut sadece gerekiyorsa, basit reels icin sart degil.
- Instagram Business hesap kalacak. Trend/telifli muzik kisitlari Business hesapta olabilir; kalite icin mumkunse final yuklemeyi Instagram icinden yapip sesi oradan eklemek daha mantikli.
- Urun renk varyanti karari: tek urun kaydi olacak; Platin/Gold/Rose ayri urun acilmayacak. Ana sayfa kartinda sadece ana urun gorselleri, urun detayinda renk butonuna basinca o renge ait manuel yuklenen galeri gorunecek.
- Bu renk varyanti ozelligi commit/push edildi: `39280c9 Add product color variant galleries`.
- Son isim notlari: Liora/Arel/Mira/Elara/Luna/Vera kullanilmis. Yeni oneriler arasinda Alin, Nora, Sera, Dora, Rina, Iris, Selin, Alya ve son olarak Narin Tasli Yuzuk var.

## 2026-08-26 - Alyans7 AI Varyasyon Uretimleri

- Kullanici `C:\Users\User\Desktop\yeni ürünler favıan\alyanslar 3\alyans7` klasorundeki genis tas kanalli platin alyans referanslarindan daha zarif, tasli, platin alyans varyasyonlari istedi.
- Uretilen ilk set ayni klasore kaydedildi:
  - `alyans7-zarif-platin-varyasyon-01.png`
  - `alyans7-zarif-platin-varyasyon-02.png`
  - `alyans7-zarif-platin-frontview-03.png`
  - `alyans7-zarif-platin-varyasyon-04.png`
- Degerlendirme: `02` ve `04` daha kullanilabilir; `03` duz frontview urun karti icin uygun.
- Sonra kullanici `alyans7-zarif-platin-varyasyon-04.png` ile attigi Favian iki tasli sari altin/mavi tas referansini birlikte kullanarak farkli model varyasyonlari istedi.
- Uretilen ikinci set ayni klasore kaydedildi:
  - `alyans7-favian-iki-tas-platin-model-01.png`
  - `alyans7-favian-iki-tas-platin-model-02.png`
  - `alyans7-favian-iki-tas-platin-model-03.png`
  - `alyans7-favian-iki-tas-platin-model-04.png`
- Degerlendirme: `01` ve `04` en iyi duranlar; `02` daha narin, `03` daha butik/tasarim hissinde.
- Stil notu: Beyaz studio background `#FFFFFF`, platin metal, zarif tasli alyans/yuzuk dili, urun katalog cekimi, tek urun, propsuz, logosuz.

## 2026-08-26 - FAVIAN f6-f10 Side ve Top AI Gorselleri

- Kullanici `C:\Users\User\Desktop\FAVIAN` klasorundeki yeni `f6`, `f7`, `f8`, `f9`, `f10` yuzukleri icin tek tek ugrasmamak adina side aci ve yukaridan/top-down gorseller istedi.
- Her klasordeki ana gorsel referans alindi; `f10` icin klasordeki iki referans birlikte kullanildi.
- Uretilen ve ilgili klasorlere kaydedilen dosyalar:
  - `C:\Users\User\Desktop\FAVIAN\f6\f6-side-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f6\f6-top-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f7\f7-side-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f7\f7-top-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f8\f8-side-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f8\f8-top-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f9\f9-side-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f9\f9-top-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f10\f10-side-ai.png`
  - `C:\Users\User\Desktop\FAVIAN\f10\f10-top-ai.png`
- Not: AI, bazi side/top acilarda referans tas dizilimini ufak simetriklestirebilir; yine de katalogda ek aci olarak kullanilabilecek beyaz studyo gorselleri alindi.

## 2026-08-26 - Yuzuk Manken Elde Yakin Cekim Promptu

- Kullanici yeni topladigi 6-7 model icin yuzukleri mankenin parmaginda veya elde tutarken uretmek istiyor.
- Higgs/Nano Banana icin genel kural: `#image1 #image2 #image3` ayni fiziksel urunun farkli acilari olarak verilecek; yuzuk degismeyecek, sadece sahne/poz/kamera degisecek.
- Ozellikle istenen sahne: yakin cekim, bir elin isaret parmagi ucu ve bas parmagi ucu ile yuzugu nazikce tutmasi; protez/akrilik tirnak gorunsun.

Prompt:

```text
#image1 #image2 #image3 are reference photos of the EXACT SAME physical ring from different angles.

Create a realistic macro close-up lifestyle photo of the same ring being held delicately between the model's thumb tip and index finger tip.
The fingers hold the ring gently from the sides, near the fingertips.

The ring must stay identical to the reference images:
same metal color, same stone layout, same stone shapes, same prongs, same band thickness, same proportions, same craftsmanship.

Show elegant feminine hands with clean glossy acrylic/prosthetic nails.
Nails should be neat, medium length, nude / milky white manicure.
Focus on the ring and fingertips.
Soft daylight, premium jewelry photography, shallow depth of field.
Background softly blurred, light neutral indoor setting.

Do not redesign the ring.
Do not add or remove stones.
Do not change the metal color.
Do not change the ring proportions.
Do not create a different ring.
No extra jewelry, no text, no logo, no watermark.
```

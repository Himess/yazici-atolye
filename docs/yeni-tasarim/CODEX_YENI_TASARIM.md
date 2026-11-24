# Favian yeni tasarım: Codex uygulama talimatı

Hazırlayan: Claude, 2026-11-24. Kullanıcı tasarımı onayladı ("pcde çok güzel duruyo", "pushlayalım").

## Amaç

Favian'ın müşteriye görünen yüzü Burato (buratogioielli.com) vitrin dilinde yenilenecek. Admin paneli, veritabanı, ürünler, sepet, favoriler, giriş ve ödeme altyapısı aynen kalacak.

Kullanıcının açık isteği: **ana sayfadaki görselleri ve metinleri admin panelden kendisi değiştirebilmeli.**

Referans tasarım bu klasörde: `anasayfa-referans.html`
- Ürünleri canlı `/api/products`'tan çeker. Yerelde görmek için geçici olarak `public/` altına kopyala, `http://localhost:3000/anasayfa-referans.html` adresini aç.
- O kopyayı **commit etme**.
- Renk, yazı tipi, ölçü ve boşlukların tamamı bu dosyadaki CSS'tedir. Birebir uygula.

## 0. Başlamadan: mevcut değişiklikleri koru

- `git status` ile bak. CLAUDE.md'deki son checkpoint'e göre şunlar commit edilmemiş olabilir:
  - `src/app/urun/[id]/page.tsx`: "Fiyat ve Detay İçin Sor" ve tek WhatsApp butonu sadeleştirmesi.
  - `CLAUDE.md`
  - `public/images/favian-hero-clean.png`
  - `tmp/`
- Bunları **silme, geri alma, üzerine yazma**.
- `git checkout -b yeni-tasarim` ile yeni dal aç. Mevcut değişiklikler dala taşınır.
- `tmp/` ve `.env*` commit edilmeyecek.

## 1. Tasarım dili (global)

**Yazı tipleri:** `next/font/google` ile yükle, `layout.tsx` içinde.
- Gilda Display: başlıklar, ürün adları.
- Hanken Grotesk (300/400/500): gövde metni, etiketler, menü.
- Cormorant, Montserrat ve Pinyon Script müşteri sayfalarından kalkacak. Admin paneli etkilenmesin.

**Renk tokenları** `globals.css` içine (Tailwind teması da bunları kullanmalı):

| Token | Değer | Kullanım |
|---|---|---|
| `--base` | `#fffdfa` | Sayfa zemini |
| `--shell` | `#fcf8f3` | Alternatif bölüm zemini |
| `--sand` | `#f4ece4` | Ürün görsel kutusu |
| `--ink` | `#2a2118` | Ana yazı |
| `--muted` | `#6d6259` | İkincil yazı |
| `--blush` | `#d9ab98` | Duyuru şeridi |
| `--gold` | `#a88655` | İkon halkaları, ince vurgular |
| `--line` | `#e9e0d6` | Çizgiler |

**Butonlar:**
- Hap biçimli (`border-radius:999px`), ince çerçeveli.
- Metin 12px, `letter-spacing:.24em`, BÜYÜK HARF.
- Metin linkleri altı çizgili, büyük harf.

## 2. Header ve duyuru şeridi (`components/header.tsx`)

**Duyuru şeridi:**
- `--blush` zemin, beyaz yazı, büyük harf.
- Metin: "Online sipariş · 7–10 gün içinde teslimat · Sertifikalı doğal taşlar".
- Admin > Ayarlar ya da İçerikler'den düzenlenebilir olsun.

**Masaüstü, satır 1:**
- Sol: `TR` ve "Sizin İçin" (/iletisim).
- Orta: logo `/images/favian-logo.png`, yükseklik 44px.
- Sağ: hap biçimli "Ürün ara" kutusu, mağaza, favoriler ve sepet ikonları.

**Masaüstü, satır 2:** Ortalanmış menü: Mağaza · Yüzükler · Alyanslar · Özel Tasarım · Atölye.

**Ana sayfa davranışı:**
- Header hero'nun üstünde şeffaf durur. Yazılar beyazdır, logo `filter: invert(1)` ile beyaz görünür.
- Hero geçilince header sabit olur: `--base` zemin, koyu yazı, alt çizgi.
- Diğer sayfalarda header baştan sabit ve açık zeminli.

**Mobil:**
- Hamburger menü, ortada logo, sağda arama ve sepet.
- Hamburger tam ekran çekmece açar, menü öğeleri serif ve büyük.
- Mevcut arama, sepet çekmecesi (`cart-drawer`), favoriler ve giriş modalı **aynen çalışmaya devam etsin**. Sadece görünüm değişir.

## 3. Ana sayfa (`src/app/page.tsx`), sırayla

Video hero, sticky kolye scroll, müşteri yorumları (0 yorum), SSS ve Instagram grid ana sayfadan kalkıyor. Bileşenleri ve admin verilerini **silme**; sadece ana sayfada render etme.

**1. Hero (tam genişlik görsel):**
- Kaynak: admin > Slider'daki ilk aktif `Slide`.
- Alanlar: `image`, `mobileImage` (mobilde bu kullanılır), `title`, `subtitle`, `buttonText`, `buttonUrl`.
- Üstte koyu degrade, ortalanmış beyaz serif başlık, hap buton.
- Slide yoksa varsayılan:
  - Görsel: `/images/hero.png`
  - Başlık: "Her Gün İçin / Pırlanta ve Altın Takılar"
  - Alt yazı: "Atölyemizde tek tek işlenen tektaşlar, alyanslar ve ince zincirler."
  - Buton: "Koleksiyonu keşfet" → `#yeni`

**2. Yeni Gelenler:**
- Yatay kaydırmalı ürün şeridi.
- `isActive` ürünler, `createdAt` azalan sırada, 12 adet, "Yeni" etiketiyle.

**3. Değerlerimiz, Vizyonumuz:**
- Ortalanmış serif metin.
- Kaynak: `PageContent` anasayfa / `degerler`, anahtarlar `title`, `p1`–`p4`.
- `**kalın**` işaretli kısımlar altın alt çizgili gösterilir.

**4. 2x2 kategori kutuları:**
- Kaynak: `PageContent` anasayfa / `kategori_1` … `kategori_4`.
- Her birinde `image`, `title`, `subtitle`, `buttonText`, `buttonUrl`.
- `subtitle` içindeki `{adet}` yer tutucusu o kategorinin aktif ürün sayısıyla doldurulur.

**5. Yüzükler şeridi:**
- Kaynak: mevcut `homepageRing.productIds` seçimi (admin'deki "ana sayfa yüzükleri").
- Seçim yoksa: iki görseli olan, adında "alyans" geçmeyen aktif yüzükler.
- `featured` olanlara "Çok satan" etiketi.

**6. Editoryal ikili (görsel + metin):**
- Kaynak: `PageContent` anasayfa / `editoryal`.
- Anahtarlar: `image`, `title`, `p1`, `buttonText`, `buttonUrl`.

**7. Alyanslar şeridi:**
- Kaynak: mevcut `homepage-alyans` seçimi.
- Seçim yoksa: adında "alyans" geçen aktif ürünler.

**8. Güven ikonları:**
- Mevcut `anasayfa:guven` içeriği bu görünüme taşınır.
- Altın dolu yuvarlak, başlık serif.

**9. Kolye, Küpe ve Bileklik şeridi:** Yüzük dışındaki aktif ürünler.

**10. Üçlü öne çıkan kutular:**
- Kaynak: `PageContent` anasayfa / `one_cikan_1` … `one_cikan_3`.
- Anahtarlar: `image`, `cap` (küçük üst etiket), `title`, `buttonText`, `buttonUrl`.

**11. Footer:**
- Bülten formu (ad, soyad, e-posta; alt çizgili inputlar, koyu hap buton).
- Bilgi ve Favian link kolonları, alt şerit.
- İletişim ve sosyal linkler `SiteSettings`'ten gelsin.

**Ürün şeritleri (ortak davranış):**
- Masaüstünde ekranda 4 kart, mobilde yaklaşık 1,6 kart.
- `scroll-snap` ile kayar, altında 4 parçalı ilerleme çubuğu.

## 4. Ürün kartı (`components/product-card.tsx`)

- Görsel kutusu `--sand` zeminli, 4:5 oranında.
- Masaüstünde hover'da ikinci görsele yumuşak geçiş.
- Mobildeki kart üstü kaydırmalı galeri özelliği (2026-07-23) korunacak.
- Kartın altında sırayla:
  - Küçük büyük harf etiket: kategori ve materyal, örneğin "YÜZÜK · 14 AYAR SARI ALTIN". "sari" yazımı "sarı" olarak düzeltilsin.
  - Serif ürün adı, mevcut `formatProductName`.
  - Fiyat: fiyat yoksa ya da `priceOnRequest` ise "Fiyat için danışın".
- Bu kart `/urunler` sayfasında da kullanılır, orada da aynı görünür.

## 5. Admin: görselleri kullanıcı kendisi değiştirebilmeli (zorunlu)

**`admin/icerikler`:**
- `type: "image"` olan içeriklerde URL kutusunun yanında **mevcut `ImageUploader` ile yükleme** ve küçük önizleme olsun. Yüklenen dosya Supabase'e gider, URL değere yazılır.
- `sectionLabels` içine yeni bölümlerin Türkçe adlarını ekle:
  - "Ana Sayfa – Değerlerimiz"
  - "Ana Sayfa – Kategori Kutusu 1"–"4"
  - "Ana Sayfa – Editoryal"
  - "Ana Sayfa – Öne Çıkan 1"–"3"
  - "Duyuru Şeridi"

**Varsayılan içerik:** Yeni bölümler için seed ya da ilk açılışta otomatik oluşturma yap. Değerler, canlı önizlemede kullanıcının onayladığı görsellerin aynısı olsun:

| Bölüm | image | title | diğer |
|---|---|---|---|
| kategori_1 | rohan-yuzuk ürününün 2. görseli | Yüzükler | subtitle: "{adet} model · tektaş, beştaş, su yolu", buttonUrl: `/urunler?kategori=yuzuk` |
| kategori_2 | dorika-necklace- ürününün 2. görseli | Kolyeler | subtitle: "{adet} model · ince zincirde tek taş", buttonUrl: `/urunler?kategori=kolye` |
| kategori_3 | platin-alyans ürününün 2. görseli | Alyanslar | subtitle: "{adet} model · kadın ve erkek", buttonUrl: `/#alyans` |
| kategori_4 | kupe-3 (Ariel Küpe) ürününün 2. görseli | Küpeler & Bileklikler | buttonUrl: `/urunler?kategori=kupe` |
| editoryal | ruby-kalp-kolye- (Amora Kolye) 2. görseli | "Işığı Taşıyan, İnce Zincirler" | referanstaki metin |
| one_cikan_1 | rohan-yuzuk 2. görseli | Rohan Yüzük | buttonUrl: `/urun/rohan-yuzuk` |
| one_cikan_2 | platin-alyans 1. görseli | "Platinium by Favian" | cap: "Yakında · Pt950" |
| one_cikan_3 | `/images/atolye-usta-1.png` | Özel Tasarım | buttonUrl: `/hakkimizda` |

Tüm `buttonText` değerleri "Şimdi incele", kategori dışındakiler referanstaki gibi.

Not: `public/images/favian-hero-clean.png` canlıda yok (commit edilmemiş), referansta kullanılmadı.

## 6. Diğer sayfalar

- `/urunler`, `/urun/[id]`, `/hakkimizda`, `/iletisim` ve bilgi sayfaları yeni header, footer, font ve renkleri otomatik alacak. Göze batan uyumsuzlukları (eski altın `#C6A25A` butonlar, Montserrat başlıklar) yeni tokenlara çevir.
- Ürün detay ve ürün listesi sayfasının derin yeniden tasarımını Claude ayrıca hazırlayacak. Bu adımda sadece uyumlu hale getir, akışlarını değiştirme.
- Admin paneli görünümü değişmeyecek.

## 7. Kontrol ve yayın

1. `npm run lint` ve `npm run build` hatasız geçmeli.
2. Yerelde masaüstü (1440px) ve mobil (375px) kontrol et:
   - Hero üstü şeffaf menü, kaydırınca sabitlenme.
   - Şeritlerin kayması, hover'da ikinci görsel.
   - Mobil menü, sepet ve favoriler.
3. Admin > İçerikler'den bir kategori görselini değiştir, ana sayfada değiştiğini gör. Sonra eski haline al.
4. `yeni-tasarim` dalını GitHub'a push et. Vercel otomatik **Preview** adresi verir; o linki kullanıcıya ver, telefonundan baksın.
5. **Kullanıcı onay vermeden `main`'e merge etme, canlıya alma.** Onaydan sonra `main`'e merge edilir, Vercel canlıya alır.
6. CLAUDE.md'ye "2026-11-24 – Burato tarzı yeni tasarım" başlığıyla kararları ve yeni PageContent anahtarlarını yaz.

Sorun çıkarsa ya da bir karar gerekiyorsa ortak klasördeki `CODEX_ISTEKLER.md` mantığıyla not bırak:
`C:\Users\User\Desktop\LAVIEN_BESTAS_CAD\PLATINIUM_SITE_ORTAK`

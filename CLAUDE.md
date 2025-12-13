# Yazici Atolye - Proje Hafizasi

Bu dosya proje hakkindaki tum kararlari ve bilgileri saklar.

## Proje Bilgileri

- **Proje Adi:** Yazici Atolye
- **Tur:** Kuyumcu E-Ticaret Sitesi
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Hosting:** Vercel (planli)

## Teknoloji Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (button, card, badge, input, separator, sheet, navigation-menu)
- Playfair Display + Inter fontlari

## Renk Paleti

- **Primary:** Amber tonlari (amber-700, amber-800)
- **Background:** Beyaz, zinc-50
- **Text:** zinc-900, zinc-600
- **Accent:** Altin tonlari (gradient'lar icin amber-100 - amber-200)

## Sayfa Yapisi

```
/                 - Ana sayfa (hero, kategoriler, one cikan urunler, CTA)
/urunler          - Urun listesi (filtreleme ile)
/urun/[id]        - Urun detay sayfasi
/hakkimizda       - Hakkimizda sayfasi
/iletisim         - Iletisim formu + bilgiler
```

## Onemli Dosyalar

- `src/lib/products.ts` - Urun verileri ve yardimci fonksiyonlar
- `src/components/header.tsx` - Site header'i
- `src/components/footer.tsx` - Site footer'i
- `src/app/layout.tsx` - Root layout (fontlar, metadata)
- `setup.mjs` - Sayfa olusturma scripti (gelistirme icin)

## Yapilacaklar (TODO)

- [ ] Mobil uyum iyilestirmeleri
- [ ] Gercek urun gorselleri eklenmesi (Gemini ile olusturulabilir)
- [ ] Odeme sistemi entegrasyonu (iyzico/Stripe - sonra)
- [ ] Admin paneli (urun ekleme/duzenleme)
- [ ] WhatsApp entegrasyonu (gercek numara)
- [ ] SEO optimizasyonlari
- [ ] Google Analytics entegrasyonu

## Domain Bilgisi

Domain henuz alinmadi. Onerilen kaynaklar:
- Namecheap.com (.com icin)
- Cloudflare.com (en ucuz)
- isimtescil.net (.com.tr icin)

## Vercel Deploy Notlari

1. GitHub'a push et
2. vercel.com'da GitHub repo'sunu bagla
3. Otomatik deploy ayarla
4. Custom domain ekle (alindiginda)

## Iletisim Bilgileri (Placeholder)

- Adres: Istanbul, Turkiye
- Telefon: +90 (212) 123 45 67
- E-posta: info@yaziciatolye.com
- Calisma Saatleri: Pzt-Cmt 10:00-19:00

## Notlar

- Turkce karakterler ASCII olarak yazildi (bash uyumlulugu icin)
- Emojiler placeholder olarak kullanildi, gercek gorseller eklenecek
- Odeme butonu disabled durumda ("Yakinda" yazisiyla)

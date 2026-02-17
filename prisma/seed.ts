import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin kullanıcı
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@yaziciatolye.com' },
    update: {},
    create: {
      email: 'admin@yaziciatolye.com',
      password: hashedPassword,
    },
  });
  console.log('Admin user created: admin@yaziciatolye.com / admin123');

  // Kategoriler
  const categories = [
    { name: 'Yüzükler', slug: 'yuzuk', order: 1 },
    { name: 'Kolyeler', slug: 'kolye', order: 2 },
    { name: 'Küpeler', slug: 'kupe', order: 3 },
    { name: 'Bileklikler', slug: 'bileklik', order: 4 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories created');

  // Site ayarları
  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: {
      id: 'settings',
      phone: '+90 (212) 123 45 67',
      email: 'info@yaziciatolye.com',
      address: 'İstanbul, Türkiye',
      workingHours: 'Pzt-Cmt 10:00-19:00',
      instagramUrl: 'https://instagram.com/yaziciatolye',
      facebookUrl: 'https://facebook.com/yaziciatolye',
      youtubeUrl: 'https://youtube.com/@yaziciatolye',
    },
  });
  console.log('Site settings created');

  // Slider
  const slides = [
    {
      title: '40 Yıllık Tecrübe',
      subtitle: 'Atölyeden Size',
      image: '/images/atolye-usta-1.png',
      buttonText: 'Koleksiyonu Keşfet',
      buttonUrl: '/urunler',
      overlay: 'dark',
      order: 1,
    },
    {
      title: 'Zarafetin ve Kalitenin',
      subtitle: 'Buluştuğu Yer',
      image: '/images/yuzuk-2.png',
      buttonText: 'Hemen Alışverişe Başla',
      buttonUrl: '/urunler',
      overlay: 'light',
      order: 2,
    },
    {
      title: 'Eşsiz Tasarımlar',
      subtitle: 'Özel Anlarınız İçin',
      image: '/images/kolye1-1.png',
      buttonText: 'Kolyeleri İncele',
      buttonUrl: '/urunler?kategori=kolye',
      overlay: 'dark',
      order: 3,
    },
  ];

  for (const slide of slides) {
    await prisma.slide.create({ data: slide });
  }
  console.log('Slides created');

  // Yorumlar
  const testimonials = [
    { name: 'Ayşe K.', rating: 5, title: 'Harika kalite!', comment: 'Nişanlımdan aldığı yüzük muhteşemdi. El işçiliği ve kalite gerçekten fark yaratıyor.', date: '2 gün önce', verified: true, order: 1 },
    { name: 'Mehmet Y.', rating: 5, title: 'Çok beğendik', comment: 'Eşime aldım hediye, çok beğendi. Paketleme ve teslimat da çok özenli.', date: '5 gün önce', verified: true, order: 2 },
    { name: 'Zeynep A.', rating: 5, title: 'Tam benim tarzım', comment: 'Minimalist tasarımlar tam benim tarzım. Her gün takıyorum.', date: '1 hafta önce', verified: true, order: 3 },
    { name: 'Can B.', rating: 4, title: 'Müthiş işçilik', comment: 'Alyanslarımızı buradan aldık. Mükemmel işçilik, herkese tavsiye ederim.', date: '2 hafta önce', verified: false, order: 4 },
    { name: 'Elif D.', rating: 5, title: 'Hediye için ideal', comment: 'Anneme doğum günü hediyesi olarak kolye aldım. Kutusu bile çok şık.', date: '3 hafta önce', verified: true, order: 5 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('Testimonials created');

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

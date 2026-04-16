import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const contents = [
  { page: 'anasayfa', section: 'koleksiyon_baslik', key: 'title', value: 'ÖZEL KOLEKSİYONLARIMIZ', type: 'text' },
  { page: 'anasayfa', section: 'koleksiyon_baslik', key: 'subtitle', value: '40 yıllık ustalıkla, atölyemizden sizlere özel tasarımlar', type: 'text' },
  { page: 'anasayfa', section: 'sticky', key: 'image', value: '/images/kuyumcu-1.jpeg', type: 'image' },
  { page: 'anasayfa', section: 'marka', key: 'quote', value: 'Her parça bir hikaye anlatır. 40 yılı aşkın tecrübemizle, atölyemizden çıkan her mücevher, sevgiyle işlenmiş bir sanat eseridir. Kaliteyi hissedin, zarafeti yaşayın.', type: 'textarea' },
  { page: 'anasayfa', section: 'marka', key: 'author', value: '— Yazıcı Atölye', type: 'text' },
  { page: 'anasayfa', section: 'banner', key: 'image', value: '/images/kolye1-1.png', type: 'image' },
  { page: 'anasayfa', section: 'banner', key: 'title', value: 'Her Gün Işılda', type: 'text' },
  { page: 'anasayfa', section: 'banner', key: 'subtitle', value: 'Eşsiz koleksiyonumuzu keşfedin', type: 'text' },
  { page: 'anasayfa', section: 'banner', key: 'buttonText', value: 'Hemen Alışverişe Başla', type: 'text' },
  { page: 'anasayfa', section: 'banner', key: 'buttonUrl', value: '/urunler', type: 'url' },
  { page: 'anasayfa', section: 'guven', key: 'items', value: '[{"icon":"Heart","title":"Sevgiyle El Yapımı","description":"Her parça, uzman ustalarımız tarafından özenle el işçiliğiyle üretilir."},{"icon":"Sparkles","title":"Alerjik Değil ve Hafif","description":"Cildinize zarar vermez, gün boyu rahatlıkla takabilirsiniz."},{"icon":"Gem","title":"Doğal Taşlar","description":"Sertifikalı doğal taşlar ve pırlantalar kullanıyoruz."}]', type: 'textarea' },
  { page: 'anasayfa', section: 'faq', key: 'items', value: '[{"question":"Ürünlerinizde hangi malzemeler kullanılıyor?","answer":"Tüm ürünlerimizde 14K ve 18K saf altın, 925 ayar gümüş ve GIA sertifikalı pırlantalar kullanıyoruz. Her parçamız kalite garantilidir."},{"question":"Kargo ve teslimat ne kadar sürüyor?","answer":"Siparişleriniz 1-2 iş günü içinde kargoya verilir. İstanbul içi 1 gün, Türkiye geneli 2-3 gün içerisinde teslim edilir. 500 TL üstü siparişlerde kargo ücretsizdir."},{"question":"İade ve değişim politikanız nedir?","answer":"14 gün içerisinde koşulsuz iade veya değişim yapabilirsiniz. Ürün orijinal kutusunda ve kullanılmamış olmalıdır."},{"question":"Özel tasarım sipariş verebilir miyim?","answer":"Evet! Özel tasarım talepleriniz için bizimle iletişime geçebilirsiniz. Size özel, tek ve benzersiz parçalar tasarılıyoruz."}]', type: 'textarea' },
  { page: 'anasayfa', section: 'uretim', key: 'title', value: 'ÜRETİMDEN SİZLERE', type: 'text' },
  { page: 'anasayfa', section: 'uretim', key: 'subtitle', value: '40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz. Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz.', type: 'textarea' },
  { page: 'anasayfa', section: 'uretim', key: 'items', value: '[{"image":"/images/atolye-3.png","title":"El İşçiliği","description":"Her parça, tek tek elle üretilir"},{"image":"/images/atolye-4.png","title":"Kalite Garantisi","description":"Sertifikalı malzeme, titiz işçilik"}]', type: 'textarea' },
  { page: 'anasayfa', section: 'instagram', key: 'items', value: '["/images/instagram-1.jpg","/images/instagram-2.jpg","/images/instagram-3.jpg","/images/instagram-4.jpg","/images/instagram-5.jpg","/images/instagram-6.jpg"]', type: 'textarea' },
  { page: 'hakkimizda', section: 'hero', key: 'image', value: '/images/atolye-usta-1.png', type: 'image' },
  { page: 'hakkimizda', section: 'hero', key: 'title', value: 'Üretimden Sizlere', type: 'text' },
  { page: 'hakkimizda', section: 'hero', key: 'subtitle', value: '40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz. Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz.', type: 'textarea' },
  { page: 'hakkimizda', section: 'hikaye', key: 'p1', value: 'Yazıcı Atölye, 40 yılı aşkın süredir Türkiye\'nin önde gelen kuyumcu markalarına toptan üretim yapmaktadır. Nesiller boyu aktarılan kuyumculuk sanatını, modern tasarımlarla buluşturuyoruz.', type: 'textarea', order: 1 },
  { page: 'hakkimizda', section: 'hikaye', key: 'p2', value: 'Yıllardır büyük mağazalara tedarik ettiğimiz aynı kalitedeki ürünleri, artık aracısız olarak sizlere ulaştırıyoruz. Böylece piyasa fiyatının çok altında, üstün kaliteli takılara sahip olabilirsiniz.', type: 'textarea', order: 2 },
  { page: 'hakkimizda', section: 'hikaye', key: 'p3', value: 'Her parçamız, usta ellerden çıkar ve sizin için özel olarak hazırlanır. El yapımı takılarımız, sizin özel anlarınıza anlam katar.', type: 'textarea', order: 3 },
  { page: 'hakkimizda', section: 'hikaye', key: 'image', value: '/images/atolye.png', type: 'image' },
  { page: 'hakkimizda', section: 'atolye_gorselleri', key: 'items', value: '[{"image":"/images/atolye-usta-1.png","alt":"Usta Çalışması"},{"image":"/images/atolye-3.png","alt":"Atölye Detay"},{"image":"/images/atolye-4.png","alt":"El İşçiliği"},{"image":"/images/atolye-kutu-1.png","alt":"Özel Paketleme"}]', type: 'textarea' },
  { page: 'hakkimizda', section: 'neden_biz', key: 'items', value: '[{"icon":"Award","title":"40 Yıllık Tecrübe","description":"Nesiller boyu aktarılan usta işçiliği"},{"icon":"Shield","title":"Sertifikalı Ürünler","description":"Tüm taşlar ve metaller sertifikalı"},{"icon":"Gem","title":"Uygun Fiyat","description":"Aracısız, doğrudan atölyeden size"},{"icon":"Heart","title":"El Yapımı","description":"Her parça özenle el işçiliği ile üretilir"}]', type: 'textarea' },
];

async function main() {
  console.log('Seeding PageContent...');

  for (const item of contents) {
    await prisma.pageContent.upsert({
      where: {
        page_section_key: {
          page: item.page,
          section: item.section,
          key: item.key,
        },
      },
      update: {},
      create: {
        page: item.page,
        section: item.section,
        key: item.key,
        value: item.value,
        type: item.type || 'text',
        order: item.order || 0,
      },
    });
    console.log('  + ' + item.page + ' > ' + item.section + ' > ' + item.key);
  }

  console.log('Done! ' + contents.length + ' content items seeded.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const contents = [
  { page: 'anasayfa', section: 'koleksiyon_baslik', key: 'title', value: 'ÖZEL KOLEKSİYONLARIMIZ', type: 'text' },
  { page: 'anasayfa', section: 'koleksiyon_baslik', key: 'subtitle', value: '40 yıllık ustalıkla, atölyemizden sizlere özel tasarımlar', type: 'text' },
  { page: 'anasayfa', section: 'sticky', key: 'image', value: '/images/kuyumcu-1.jpeg', type: 'image' },
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
  { page: 'anasayfa', section: 'instagram', key: 'items', value: '["/images/yuzuk-1-main.jpg","/images/kolye-yonca-1.jpg","/images/kupe-1.png","/images/bileklik-1.png","/images/kolye-melek-kanadi-gold-1.jpg","/images/kadin-alyans-1.png"]', type: 'textarea' },
  { page: 'hakkimizda', section: 'hero', key: 'image', value: '/images/atolye-usta-1.png', type: 'image' },
  { page: 'hakkimizda', section: 'hero', key: 'title', value: 'Üretimden Sizlere', type: 'text' },
  { page: 'hakkimizda', section: 'hero', key: 'subtitle', value: '40 yılı aşkın tecrübemiz ile büyük kuyumculara toptan satış yapıyoruz. Şimdi aynı kaliteyi, aracısız fiyatlarla sizlere sunuyoruz.', type: 'textarea' },
  { page: 'hakkimizda', section: 'hikaye', key: 'p1', value: 'Favian Jewellery, 40 yılı aşkın süredir Türkiye\'nin önde gelen kuyumcu markalarına toptan üretim yapmaktadır. Nesiller boyu aktarılan kuyumculuk sanatını, modern tasarımlarla buluşturuyoruz.', type: 'textarea', order: 1 },
  { page: 'hakkimizda', section: 'hikaye', key: 'p2', value: 'Yıllardır büyük mağazalara tedarik ettiğimiz aynı kalitedeki ürünleri, artık aracısız olarak sizlere ulaştırıyoruz. Böylece piyasa fiyatının çok altında, üstün kaliteli takılara sahip olabilirsiniz.', type: 'textarea', order: 2 },
  { page: 'hakkimizda', section: 'hikaye', key: 'p3', value: 'Her parçamız, usta ellerden çıkar ve sizin için özel olarak hazırlanır. El yapımı takılarımız, sizin özel anlarınıza anlam katar.', type: 'textarea', order: 3 },
  { page: 'hakkimizda', section: 'hikaye', key: 'image', value: '/images/atolye.png', type: 'image' },
  { page: 'hakkimizda', section: 'atolye_gorselleri', key: 'items', value: '[{"image":"/images/atolye-usta-1.png","alt":"Usta Çalışması"},{"image":"/images/atolye-3.png","alt":"Atölye Detay"},{"image":"/images/atolye-4.png","alt":"El İşçiliği"},{"image":"/images/atolye-kutu-1.png","alt":"Özel Paketleme"}]', type: 'textarea' },
  { page: 'hakkimizda', section: 'neden_biz', key: 'items', value: '[{"icon":"Award","title":"40 Yıllık Tecrübe","description":"Nesiller boyu aktarılan usta işçiliği"},{"icon":"Shield","title":"Sertifikalı Ürünler","description":"Tüm taşlar ve metaller sertifikalı"},{"icon":"Gem","title":"Uygun Fiyat","description":"Aracısız, doğrudan atölyeden size"},{"icon":"Heart","title":"El Yapımı","description":"Her parça özenle el işçiliği ile üretilir"}]', type: 'textarea' },
];

async function main() {
  console.log('Seeding PageContent...');

  const productImage = async (slug: string, index = 1) => {
    const product = await prisma.product.findUnique({ where: { slug }, select: { images: true } });
    try {
      const images = JSON.parse(product?.images || '[]');
      return images[index] || images[0] || '';
    } catch { return ''; }
  };
  const dynamic = [
    { section:'duyuru', key:'text', value:'Online sipariş · 7–10 gün içinde teslimat · Sertifikalı doğal taşlar', type:'text' },
    { section:'degerler', key:'title', value:'Değerlerimiz, Vizyonumuz', type:'text' },
    { section:'degerler', key:'p1', value:'Takıyı bir gün için değil, bir ömür için yapıyoruz.', type:'textarea' },
    { section:'degerler', key:'p2', value:'Her parça atölyemizde **usta ellerde** şekilleniyor; tasarım, döküm, mıhlama ve cila aynı çatı altında.', type:'textarea' },
    { section:'degerler', key:'p3', value:'Taşlarımızı tek tek seçiyoruz: **sertifikalı doğal taşlar**, **14 ayar altın**.', type:'textarea' },
    { section:'degerler', key:'p4', value:'Sade çizgi, ince işçilik.\nHer gün takılsın diye.', type:'textarea' },
    { section:'editoryal', key:'image', value:await productImage('ruby-kalp-kolye-'), type:'image' },
    { section:'editoryal', key:'title', value:'Işığı Taşıyan, İnce Zincirler', type:'text' },
    { section:'editoryal', key:'p1', value:'Tek bir taş, ince bir zincir. Gün boyu takılsın diye hafif tasarladık; taşın ışığı ise akşama kadar sizinle.', type:'textarea' },
    { section:'editoryal', key:'buttonText', value:'Kolyeleri keşfet', type:'text' },
    { section:'editoryal', key:'buttonUrl', value:'/urunler?kategori=kolye', type:'url' },
  ];
  const categories = [
    ['kategori_1','rohan-yuzuk','Yüzükler','{adet} model · tektaş, beştaş, su yolu','/urunler?kategori=yuzuk'],
    ['kategori_2','dorika-necklace-','Kolyeler','{adet} model · ince zincirde tek taş','/urunler?kategori=kolye'],
    ['kategori_3','platin-alyans','Alyanslar','{adet} model · kadın ve erkek','/#alyans'],
    ['kategori_4','kupe-3','Küpeler & Bileklikler','{adet} model','/urunler?kategori=kupe'],
  ];
  for (const [section,slug,title,subtitle,buttonUrl] of categories) dynamic.push(
    {section,key:'image',value:await productImage(slug),type:'image'}, {section,key:'title',value:title,type:'text'},
    {section,key:'subtitle',value:subtitle,type:'text'}, {section,key:'buttonText',value:'Şimdi incele',type:'text'}, {section,key:'buttonUrl',value:buttonUrl,type:'url'}
  );
  const featured = [
    ['one_cikan_1',await productImage('rohan-yuzuk'),'Rohan Yüzük','','Yüzüğü incele','/urun/rohan-yuzuk'],
    ['one_cikan_2',await productImage('platin-alyans',0),'Platinium by Favian','Yakında · Pt950','Haber ver','/urun/platin-alyans'],
    ['one_cikan_3','/images/atolye-usta-1.png','Özel Tasarım','','Bize yazın','/hakkimizda'],
  ];
  for (const [section,image,title,cap,buttonText,buttonUrl] of featured) dynamic.push(
    {section,key:'image',value:image,type:'image'}, {section,key:'title',value:title,type:'text'}, {section,key:'cap',value:cap,type:'text'},
    {section,key:'buttonText',value:buttonText,type:'text'}, {section,key:'buttonUrl',value:buttonUrl,type:'url'}
  );
  contents.push(...dynamic.map((item) => ({ page:'anasayfa', ...item })));

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

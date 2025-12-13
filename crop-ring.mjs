import sharp from 'sharp';

// Yüzük görselinin boyutlarını al
const metadata = await sharp('public/images/yuzuk-1.jpg').metadata();
const width = metadata.width;
const height = metadata.height;

console.log(`Orijinal boyut: ${width}x${height}`);

// Üst kısım yaklaşık %54, alt kısım %46
// Üst kısım (ana görsel) - büyük pırlanta görünümü
const topHeight = Math.floor(height * 0.54);
const bottomHeight = height - topHeight;
const halfWidth = Math.floor(width / 2);

await sharp('public/images/yuzuk-1.jpg')
  .extract({
    left: 0,
    top: 0,
    width: width,
    height: topHeight
  })
  .toFile('public/images/yuzuk-1-main.jpg');
console.log('1. görsel (üst/ana): yuzuk-1-main.jpg');

// Sol alt kısım (arka görünüm - halka şeklinde)
await sharp('public/images/yuzuk-1.jpg')
  .extract({
    left: 0,
    top: topHeight,
    width: halfWidth,
    height: bottomHeight
  })
  .toFile('public/images/yuzuk-1-back.jpg');
console.log('2. görsel (sol alt/arka): yuzuk-1-back.jpg');

// Sağ alt kısım (yan görünüm)
await sharp('public/images/yuzuk-1.jpg')
  .extract({
    left: halfWidth,
    top: topHeight,
    width: width - halfWidth,
    height: bottomHeight
  })
  .toFile('public/images/yuzuk-1-side.jpg');
console.log('3. görsel (sağ alt/yan): yuzuk-1-side.jpg');

console.log('\nTum gorseller olusturuldu!');

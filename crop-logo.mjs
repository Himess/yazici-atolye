import sharp from 'sharp';

// Logo görselinin sağ yarısını kırp (koyu logo)
const metadata = await sharp('public/images/logo.png').metadata();
const width = metadata.width;
const height = metadata.height;

// Sağ yarıyı al
await sharp('public/images/logo.png')
  .extract({
    left: Math.floor(width / 2),
    top: 0,
    width: Math.floor(width / 2),
    height: height
  })
  .toFile('public/images/logo-dark.png');

console.log('Logo kirpildi: public/images/logo-dark.png');
console.log(`Orijinal boyut: ${width}x${height}`);
console.log(`Yeni boyut: ${Math.floor(width/2)}x${height}`);

import sharp from 'sharp';

const W = 1200;
const H = 630;
const PHOTO_W = 470;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#fcfcfd"/>
  <rect x="${W - PHOTO_W - 1}" y="0" width="1" height="${H}" fill="#eaeaea"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <text x="80" y="222" font-size="18" font-weight="600" letter-spacing="3" fill="#8a8a8a">THE SYPEK GROUP &#183; COMPASS</text>
    <text x="78" y="312" font-size="88" font-weight="700" letter-spacing="-1" fill="#1a1a18">MICHAEL</text>
    <text x="78" y="396" font-size="88" font-weight="300" letter-spacing="-1" fill="#1a1a18">ANGELOS</text>
    <text x="80" y="448" font-size="19" font-weight="600" letter-spacing="3" fill="#6e6e6e">REAL ESTATE AGENT &#183; LOS ANGELES</text>
  </g>
</svg>`;

const photo = await sharp('public/portrait.jpg')
  .resize(PHOTO_W, H, { fit: 'cover', position: 'top' })
  .toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: photo, left: W - PHOTO_W, top: 0 }])
  .png()
  .toFile('public/og-home.png');

console.log('wrote public/og-home.png');

const fs = require('fs');
const path = require('path');

// Create a simple icon generator using canvas (if available) or fallback
function generateIcon(size, filename) {
    // For now, we'll create a simple SVG icon that can be converted
    const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00b4d8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size/8}" fill="url(#grad)"/>
  <rect x="${size*0.1}" y="${size*0.1}" width="${size*0.8}" height="${size*0.6}" rx="${size*0.05}" fill="white"/>
  <rect x="${size*0.15}" y="${size*0.15}" width="${size*0.7}" height="${size*0.15}" rx="${size*0.02}" fill="#1a1a1a"/>
  <circle cx="${size*0.25}" cy="${size*0.4}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.4}" cy="${size*0.4}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.55}" cy="${size*0.4}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.7}" cy="${size*0.4}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.25}" cy="${size*0.55}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.4}" cy="${size*0.55}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.55}" cy="${size*0.55}" r="${size*0.06}" fill="#00b4d8"/>
  <circle cx="${size*0.7}" cy="${size*0.55}" r="${size*0.06}" fill="#00b4d8"/>
</svg>`;

    fs.writeFileSync(path.join('assets', filename), svg);
    console.log(`✅ Generated ${filename} (${size}x${size})`);
}

// Generate all required icons
const iconSizes = [
    { size: 16, name: 'icon-16.png' },
    { size: 32, name: 'icon-32.png' },
    { size: 48, name: 'icon-48.png' },
    { size: 64, name: 'icon-64.png' },
    { size: 128, name: 'icon-128.png' },
    { size: 256, name: 'icon-256.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 1024, name: 'icon-1024.png' }
];

console.log('🎨 Generating app icons...');

iconSizes.forEach(({ size, name }) => {
    generateIcon(size, name);
});

// Create favicon
generateIcon(32, 'favicon.svg');

console.log('🎉 All icons generated successfully!');
console.log('📁 Icons saved in: assets/');
console.log('💡 Note: SVG icons can be converted to PNG using online tools or ImageMagick');

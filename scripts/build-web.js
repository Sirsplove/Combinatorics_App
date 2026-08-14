const fs = require('fs');
const path = require('path');

const out = path.join(__dirname, '..', 'public');
const root = path.join(__dirname, '..');
const files = [
  'index.html',
  'styles.css',
  'script.js',
  'mobile-app.js',
  'manifest.json',
  'sw.js'
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

const assets = path.join(root, 'assets');
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(out, 'assets'), { recursive: true });
}

console.log('Wrote static site to public/');

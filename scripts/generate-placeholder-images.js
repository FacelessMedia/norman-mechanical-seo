// Generate placeholder images for missing header assets
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create minimal valid PNG files (1x1 transparent pixel)
// This is the smallest valid PNG: 67 bytes
const minimalPNG = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4,
  0x89, 0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, // IDAT chunk
  0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, // Compressed data
  0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, // IEND chunk
  0x42, 0x60, 0x82
]);

const files = [
  'google-stars.png',
  'google-reviews.png',
  'facebook-reviews.png',
  'logo.png'
];

files.forEach(filename => {
  const filepath = path.join(outputDir, filename);
  fs.writeFileSync(filepath, minimalPNG);
  console.log(`✅ Created: ${filename}`);
});

console.log('\n✅ All placeholder images created successfully!');
console.log('📁 Location: public/images/');
console.log('\n⚠️  Note: These are minimal 1x1 transparent PNGs.');
console.log('   Replace with actual brand assets before production deployment.');

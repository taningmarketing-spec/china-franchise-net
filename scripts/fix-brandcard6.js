var fs = require('fs');
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
// Add translations import after Locale import
var old = "import type { Locale } from '@/lib/i18n';";
var replacement = "import type { Locale } from '@/lib/i18n';\nimport { translations } from '@/lib/i18n';";
if (c.includes(old)) {
  c = c.replace(old, replacement);
  console.log('Import added OK');
} else {
  console.log('Import not found. Current imports:');
  var lines = c.split('\n');
  for (var i = 0; i < 5; i++) console.log((i+1) + ': ' + lines[i]);
}
fs.writeFileSync('components/front/BrandCard.tsx', c);
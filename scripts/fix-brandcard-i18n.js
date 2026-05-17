var fs = require('fs');
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');

// Find LABELS constant block
var idx = c.indexOf('const LABELS');
if (idx === -1) { console.log('LABELS not found'); process.exit(1); }
var endIdx = c.indexOf('};', idx);
var endBraceIdx = endIdx + 2;
var block = c.substring(idx, endBraceIdx);
console.log('Found block of length:', block.length);

// New helper: get card labels from i18n
var newBlock = `const cardLabels = () => ({
  storesChina: (t.brandCard as any).storesChina,
  storesOverseas: (t.brandCard as any).storesOverseas,
  fee: (t.brandCard as any).fee,
  cost: (t.brandCard as any).cost,
});`;

c = c.replace(block, newBlock);
console.log('Replaced LABELS with cardLabels');

// Update LABELS[locale] -> cardLabels()
c = c.replace(/LABELS\[locale\]/g, 'cardLabels()');
console.log('Updated LABELS[locale] references');

// Remove unused import of Locale if only used for LABELS
// Actually keep it as it might be used elsewhere

fs.writeFileSync('components/front/BrandCard.tsx', c, 'utf8');
var c2 = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
console.log('Still has LABELS:', c2.includes('LABELS'));
console.log('Has cardLabels:', c2.includes('cardLabels'));
console.log('Done');
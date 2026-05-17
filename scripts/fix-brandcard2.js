var fs = require('fs');
var content = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');

// Fix 1: Restore curly braces for labels.franchiseFee (missing in JSX)
content = content.replace(
  '<span className="text-slate-500">{labels.franchiseFee}</span>',
  '<span className="text-slate-500">{labels.franchiseFee}</span>'
);
// But first check what's actually there
console.log('Checking current content around fee:');
var idx = content.indexOf('labels.franchiseFee');
console.log('Context:', JSON.stringify(content.substring(Math.max(0,idx-30), idx+60)));

// Fix 2: Fix the highlights label - it's plain text not JSX expression
// The current content has: (object literal) but should be: { (object literal) }
// Need to wrap in {}

// Fix 3: Fix storesChina/storesOverseas references - should be {labels.storesChina}
content = content.replace(
  /\{labels\.storesChina\}\s*\/\s*\{labels\.storesOverseas\}/,
  '{labels.storesChina} / {labels.storesOverseas}'
);

// Fix the highlights label - should be wrapped in JSX curly braces
// Current (wrong): <span ...> (object literal) </span>
// Should be: <span ...> {object literal} </span>
content = content.replace(
  /(<span[^>]*>)\((\s*\{[^}]+\}\s*as Record<string,string>)\)\[locale\]\s*\|\|\s*'Highlights'/,
  '{1}{2}[locale] || \'Highlights\''
);

// Actually let me just do a simple string fix for the highlights label
content = content.replace(
  '({ zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\' } as Record<string,string>)[locale] || \'Highlights\'',
  '{zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\'}[locale] || \'Highlights\''
);

fs.writeFileSync('components/front/BrandCard.tsx', content);

// Verify
var newContent = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
console.log('\n--- Verifying key parts ---');
console.log('franchiseFee:', newContent.includes('{labels.franchiseFee}'));
console.log('storesChina/stores:', newContent.includes('{labels.storesChina}'));
console.log('highlights line:', newContent.substring(newContent.indexOf('highlights &&')+15, newContent.indexOf('highlights &&')+200));
console.log('\nDone');
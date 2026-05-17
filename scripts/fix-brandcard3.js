var fs = require('fs');
var content = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');

// Fix highlights label: it's plain text (missing outer JSX braces)
// Current (wrong): <span ...> (object literal) </span>  
// Should be: <span ...> {object literal} </span>
var wrong = '( { zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\' } as Record<string,string>)[locale] || \'Highlights\'';
var correct = '{zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\'}[locale] || \'Highlights\'';

// Check current state
var idx = content.indexOf(wrong);
if (idx >= 0) {
  console.log('Found wrong pattern, replacing...');
  content = content.replace(wrong, correct);
} else {
  console.log('Wrong pattern not found, checking actual content...');
  var hiIdx = content.indexOf('highlights &&');
  console.log('Context:', JSON.stringify(content.substring(hiIdx, hiIdx+250)));
}

// Verify
var newContent = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
var hiIdx = newContent.indexOf('highlights &&');
if (hiIdx >= 0) {
  console.log('\nHighlights section:');
  console.log(newContent.substring(hiIdx, hiIdx+300));
}

fs.writeFileSync('components/front/BrandCard.tsx', content);
console.log('\nDone');
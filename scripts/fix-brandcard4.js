var fs = require('fs');
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');

// Find and fix the highlights label - missing outer JSX braces
// Current: <span ...>({ ... })[locale]</span>  <- plain text, not JSX
// Target:  <span ...>{({ ... })[locale]}</span> <- JSX expression

var wrong1 = '({ zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\' } as Record<string,string>)[locale] || \'Highlights\'';
var correct1 = '{zh: \'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\'}[locale] || \'Highlights\'';

if (c.includes(wrong1)) {
  c = c.replace(wrong1, correct1);
  console.log('Replaced wrong1');
} else {
  // Try without parentheses
  var wrong2 = '\'项目亮点\', en: \'Highlights\', th: \'จุดเด่น\', vi: \'Điểm nổi bật\'';
  console.log('wrong1 not found. Content around highlights:');
  var idx = c.indexOf('highlights &&');
  console.log(JSON.stringify(c.substring(idx, idx+400)));
}

// Also fix the outer span to have {} wrapping the expression
// Find the span containing the highlights label and ensure it's wrapped in {}
// The span currently has: >({ ... })</span>  should be: >{ ... }</span>

// Find: <span className="text-slate-500">(wrong1)</span>
// Replace with: <span className="text-slate-500">{wrong1}</span>

var spanOpen = '<span className="text-slate-500">';
var wrongSpan = spanOpen + wrong1 + '</span>';
var correctSpan = spanOpen + correct1 + '</span>';

if (c.includes(wrongSpan)) {
  c = c.replace(wrongSpan, correctSpan);
  console.log('Replaced span');
} else {
  console.log('Full span not found either');
  // Check what's around the expression
  var exprIdx = c.indexOf('{ zh:');
  if (exprIdx >= 0) {
    console.log('Expression found at:', exprIdx);
    console.log('Before:', JSON.stringify(c.substring(exprIdx-60, exprIdx)));
    console.log('After:', JSON.stringify(c.substring(exprIdx, exprIdx+200)));
  }
}

fs.writeFileSync('components/front/BrandCard.tsx', c);
console.log('\nFinal state:');
var final = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
var hiIdx = final.indexOf('highlights &&');
console.log(final.substring(hiIdx, hiIdx+300));
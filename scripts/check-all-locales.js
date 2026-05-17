var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Total lines:', lines.length);

// Find brandCard section for each locale
var locales = ['zh', 'en', 'th', 'vi'];
locales.forEach(function(loc) {
  var locIdx = c.indexOf(loc + ': {');
  if (locIdx < 0) { console.log(loc + ': NOT FOUND'); return; }
  var snippet = c.substring(locIdx, locIdx + 3000);
  var bci = snippet.indexOf('brandCard: {');
  if (bci < 0) { console.log(loc + ': brandCard NOT FOUND'); return; }
  var brandSection = snippet.substring(bci, bci + 600);
  // Count lines in brandSection
  var brandLines = brandSection.split('\n');
  console.log('\n=== ' + loc + ' brandCard (' + brandLines.length + ' lines) ===');
  brandLines.forEach(function(l, i) {
    console.log(i + ': ' + l.slice(0, 80));
  });
});

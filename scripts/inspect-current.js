// Read current state and fix exactly
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Total lines:', lines.length);

// Find the corrupted region for each locale
// Pattern: look for "whyChooseUs:" followed within 20 lines by a 6-space "brand:" line
// That's the start of the corrupted insertion area
// The "nav: {" at 4 spaces ends the corruption

function findCorruptionBounds(loc) {
  var locStart = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === loc + ': {') { locStart = i; break; }
  }
  if (locStart < 0) return null;
  
  var whyIdx = -1;
  for (var i = locStart; i < lines.length; i++) {
    if (lines[i].includes('whyChooseUs:')) { whyIdx = i; break; }
  }
  
  var navIdx = -1;
  for (var i = locStart; i < lines.length; i++) {
    if (lines[i].match(/^\s{4}nav: \{/) && !lines[i].includes('    nav: { home:')) { navIdx = i; break; }
  }
  
  return { locStart: locStart, whyIdx: whyIdx, navIdx: navIdx };
}

var locales = ['zh', 'en', 'th', 'vi'];
var bounds = {};
locales.forEach(function(loc) {
  bounds[loc] = findCorruptionBounds(loc);
  var b = bounds[loc];
  console.log('\n' + loc + ':');
  console.log('  whyIdx=' + b.whyIdx + ' navIdx=' + b.navIdx);
  if (b.whyIdx >= 0 && b.navIdx >= 0) {
    console.log('  why: ' + lines[b.whyIdx].trim().slice(0,60));
    console.log('  nav: ' + lines[b.navIdx].trim());
    console.log('  content between: ' + (b.navIdx - b.whyIdx) + ' lines');
    for (var i = b.whyIdx + 1; i < b.navIdx; i++) {
      console.log('    L' + (i+1) + ' (' + (lines[i].match(/^(\s*)/)[1].length) + 'sp): ' + lines[i].trim().slice(0,80));
    }
  }
});
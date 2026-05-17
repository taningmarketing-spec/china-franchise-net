// Fix specific corrupted lines in i18n.ts home sections
// Problem: L70 is blank (4sp) instead of "    }," closing home
// L71 has double comma after brand closing
// L74 is extra closing brace
// The brand/contactModal/brandGallery should be inside home at 6sp indent
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length);

// Fix per locale. Each locale's home section ends with "whyChooseUs" key,
// then new keys, then "nav: {". Find these and fix.
var locales = ['zh', 'en', 'th', 'vi'];

locales.forEach(function(loc) {
  // Find locale start
  var locStart = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === loc + ': {') { locStart = i; break; }
  }
  if (locStart < 0) { console.log(loc + ': not found'); return; }
  
  // Find whyChooseUs line (last key before new insertion)
  var whyIdx = -1;
  for (var i = locStart + 1; i < lines.length; i++) {
    if (lines[i].includes('whyChooseUs:')) { whyIdx = i; break; }
  }
  if (whyIdx < 0) { console.log(loc + ': whyChooseUs not found'); return; }
  
  // Find the 4-space blank/close line after whyChooseUs
  var blankCloseIdx = -1;
  for (var i = whyIdx + 1; i < whyIdx + 10; i++) {
    var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
    if (indent === 4 && lines[i].trim() === '') { blankCloseIdx = i; break; }
    if (indent === 4 && lines[i].trim() === '},') { blankCloseIdx = i; break; }
  }
  
  // Find nav: { start (after new insertions)
  var navIdx = -1;
  for (var i = whyIdx + 1; i < lines.length; i++) {
    if (lines[i].trim() === 'nav: {') { navIdx = i; break; }
  }
  if (navIdx < 0) { console.log(loc + ': nav not found'); return; }
  
  console.log('\n' + loc + ': whyIdx=' + whyIdx + ' blankClose=' + blankCloseIdx + ' nav=' + navIdx);
  console.log('  before:', lines[whyIdx].trim().slice(0, 50));
  console.log('  before nav:', lines[navIdx].trim().slice(0, 50));
  
  // Fix 1: the blank/4sp line should be "    },"
  if (blankCloseIdx >= 0) {
    lines[blankCloseIdx] = '    },';
    console.log('  fixed L' + (blankCloseIdx+1) + ' to "    },"');
  }
  
  // Fix 2: check for double comma in brand/contactModal/brandGallery closing lines
  for (var i = whyIdx + 1; i < navIdx; i++) {
    if (lines[i].trim().match(/brand:|contactModal:|brandGallery:/) && lines[i].trim() !== 'brand: { inquiry: "立即咨询加盟" },,'.split(':')[0] + ': { inquiry:') {
      // check if this line ends with },,
      if (lines[i].trim().endsWith(',,')) {
        lines[i] = lines[i].replace(/,,$/, ',');
        console.log('  fixed double comma at L' + (i+1));
      }
    }
  }
  
  // Fix 3: find and remove the extra closing brace before nav
  // After brand/contactModal/brandGallery, there should be ONE "    }," before nav
  // Count 6-sp lines between whyIdx+1 and navIdx-1 that are just "},"
  var extraCloseLines = [];
  for (var i = whyIdx + 1; i < navIdx; i++) {
    var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
    if (indent === 6 && lines[i].trim() === '},') {
      extraCloseLines.push(i);
    }
  }
  if (extraCloseLines.length > 0) {
    // Keep only the last one as the home close, remove others
    // The one right before nav (navIdx-1 or navIdx-2) is the home close
    // Remove the others
    for (var j = 0; j < extraCloseLines.length - 1; j++) {
      console.log('  removing extra close at L' + (extraCloseLines[j]+1));
      lines[extraCloseLines[j]] = null; // mark for removal
    }
  }
});

lines = lines.filter(function(l) { return l !== null; });
var newContent = lines.join('\n');
console.log('\nAfter:', newContent.split('\n').length, 'lines');

// Final validation
var badCommas = newContent.split('\n').filter(function(l) { return l.trim() === ','; });
console.log('Orphaned commas:', badCommas.length);
if (badCommas.length > 0) badCommas.forEach(function(l) { console.log(' ', l); });

var unclosed = (newContent.match(/\{[^{}]*$/g) || []);
console.log('Unclosed objects:', unclosed.length);

fs.writeFileSync('lib/i18n.ts', newContent, 'utf8');
console.log('Done!');
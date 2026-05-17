var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Check for "undefined" strings - these are bugs
console.log('=== Bug check: undefined values ===');
lines.forEach(function(l, i) { if (l.includes('undefined')) console.log('L'+(i+1)+': '+l.trim()); });

// Check for duplicate section headers
console.log('\n=== Duplicate section headers ===');
var sectionCounts = {};
lines.forEach(function(l, i) {
  var m = l.match(/^(\s+)([\w]+): \{/);
  if (m && m[1].length === 6) {
    var key = m[2];
    sectionCounts[key] = (sectionCounts[key] || 0) + 1;
  }
});
Object.keys(sectionCounts).forEach(function(k) {
  if (sectionCounts[k] > 1) console.log(k + ': appears ' + sectionCounts[k] + ' times');
});

// Show line count
console.log('\nTotal lines:', lines.length);

// Show home section end for zh
console.log('\n=== zh home section around brand ===');
var inZh = false, inHome = false, depth = 0;
lines.forEach(function(l, i) {
  if (l.trim().startsWith('zh:')) inZh = true;
  if (inZh && l.trim() === 'home: {') { inHome = true; }
  if (inHome) {
    var d = (l.match(/^\s+/g)||[''])[0].length;
    if (l.includes('brand:') || l.includes('contactModal:') || l.includes('brandGallery:')) {
      console.log('L'+(i+1)+' ('+d+'sp): '+l.trim().slice(0,80));
    }
    if (l.includes('},') && depth === 1) {
      console.log('L'+(i+1)+' CLOSE home: '+l.trim());
      inHome = false;
    }
    if (l.includes('{')) depth++;
    if (l.includes('}')) depth--;
  }
});
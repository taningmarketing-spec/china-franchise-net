// Test i18n structure by running rebuild and importing
const fs = require('fs');
const path = require('path');

// Test: read rebuilt i18n and try to require it
const i18nPath = path.join(__dirname, '..', 'lib', 'i18n.ts');
const content = fs.readFileSync(i18nPath, 'utf8');
console.log('File length:', content.length);
console.log('First 50 chars:', JSON.stringify(content.substring(0, 50)));

// Count braces on key lines
var lines = content.split('\n');
console.log('\nLines with closing braces (key structural points):');
[13, 23, 43, 65, 81, 98, 111, 125, 138, 143, 154, 155, 169, 182, 204, 220, 237, 250, 264, 277, 282, 293, 294, 321, 343, 359, 376, 389, 403, 416, 421, 432, 433, 460, 482, 498, 515, 528, 542, 555, 560, 571, 572].forEach(n => {
  if (lines[n-1]) console.log(n + ': ' + lines[n-1].trim().substring(0, 60));
});

// Check if zh.home.brandCard is nested inside zh
var zhStart = -1, zhEnd = -1;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'zh: {') zhStart = i;
  // Find the } after zh: {
  if (zhStart >= 0 && lines[i].trim() === '}' && i > zhStart) {
    // Check if this closes zh or a sub-object
    var prevNonEmpty = -1;
    for (var j = i - 1; j >= 0; j--) {
      if (lines[j].trim() !== '') { prevNonEmpty = j; break; }
    }
    if (prevNonEmpty >= 0 && lines[prevNonEmpty].trim().match(/^},?$/)) {
      zhEnd = i;
      break;
    }
  }
}
console.log('\nzh object: line ' + (zhStart+1) + ' to ' + (zhEnd+1));
console.log('Line ' + (zhStart+1) + ': ' + lines[zhStart].trim());

// Check if home is inside zh
var homeLine = -1;
for (var i = zhStart + 1; i < zhEnd; i++) {
  if (lines[i].trim().startsWith('home:')) { homeLine = i; break; }
}
console.log('home inside zh: ' + (homeLine >= 0 ? 'YES at line ' + (homeLine+1) : 'NO (outside zh)'));
if (homeLine >= 0) console.log('Line ' + (homeLine+1) + ': ' + lines[homeLine].trim());

// Check brandCard inside home
var bcLine = -1;
for (var i = homeLine + 1; i < zhEnd; i++) {
  if (lines[i].trim().startsWith('brandCard:')) { bcLine = i; break; }
}
console.log('brandCard inside home: ' + (bcLine >= 0 ? 'YES at line ' + (bcLine+1) : 'NO'));
if (bcLine >= 0) console.log('Line ' + (bcLine+1) + ': ' + lines[bcLine].trim());
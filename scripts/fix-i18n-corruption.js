// Fix corrupted insertions in i18n.ts
// Pattern: Lines with 12-space indentation inside home section = corrupted
// Keep 4-space indented sections (nav, brand at root level of translations)
// Remove 12-space corrupted content only
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

// Find lines to remove: 12-space indented lines within home section
// These are the corrupted insertions
var toRemove = new Set();
var inLocale = false;
var localeIndent = 0;
var inHome = false;
var homeIndent = 0;

lines.forEach(function(line, i) {
  var trimmed = line.trimStart();
  var leadingSpace = line.length - trimmed.length;
  
  if (trimmed.match(/^[a-z]{2}: \{/) && leadingSpace === 2) {
    inLocale = true;
    localeIndent = 2;
  }
  if (inLocale && trimmed === 'home: {') {
    inHome = true;
    homeIndent = 4;
  }
  if (inLocale && trimmed.startsWith('nav:') && leadingSpace === 4) {
    // nav section starts - we're past the home close
    inHome = false;
  }
  
  // Mark 12-space lines inside home for removal
  if (inHome && leadingSpace === 12) {
    toRemove.add(i);
  }
  // Also mark the 14-space content inside the 12-space blocks
  if (inHome && leadingSpace === 14) {
    toRemove.add(i);
  }
  
  // Reset when entering next locale
  if (inLocale && leadingSpace === 2 && trimmed.match(/^[a-z]{2}: \{/) && i > 10) {
    inHome = false;
  }
});

console.log('Removing', toRemove.size, 'corrupted lines');

// Filter out corrupted lines
var newLines = lines.filter(function(l, i) { return !toRemove.has(i); });

// Also fix the "undefined" lines that remain (should not exist anymore after removal)
var remainingBad = newLines.filter(function(l) { return l.includes('undefined'); });
if (remainingBad.length > 0) {
  console.log('WARNING: still has undefined:', remainingBad);
}

console.log('After:', newLines.length, 'lines');
fs.writeFileSync('lib/i18n.ts', newLines.join('\n'), 'utf8');
console.log('Done!');

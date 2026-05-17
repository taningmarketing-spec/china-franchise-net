var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Check new keys in zh locale
var checks = [
  'brand:',
  'inquiry:',
  'contactModal:',
  'title:',
  'copied:',
  'workHours:',
  'brandGallery:',
  'brandImage:',
  'page:',
  'of:',
];

checks.forEach(function(key) {
  var found = lines.filter(function(l) { return l.includes(key); });
  // Only show first 2 matches (may appear multiple times in different locales)
  var display = found.slice(0, 2).map(function(l) { return l.trim().slice(0, 60); });
  console.log(key, '->', display.join(' || '));
});
console.log('\nTotal lines:', lines.length);

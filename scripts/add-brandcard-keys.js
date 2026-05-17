// Add missing brandCard keys to ALL 4 locales
// Keys to add: storesChina, storesOverseas, fee, cost, highlights (all at 8-space indent inside brandCard)
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Detect locale based on indentation: "  xx: {" at top level (2 spaces)
function getLocale(line) {
  var m = line.match(/^  ([a-z]{2}): \{$/);
  return m ? m[1] : null;
}

// For each locale's home.brandCard, find totalCost line and insert new keys after it
var currentLocale = null;
var inBrandCard = false;
var output = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trimmed = line.trim();

  // Detect locale
  var locale = getLocale(line);
  if (locale) currentLocale = locale;

  // Detect brandCard
  if (trimmed === 'brandCard: {') {
    inBrandCard = true;
    output.push(line);
    continue;
  }

  // Inside brandCard
  if (inBrandCard) {
    output.push(line);

    // After totalCost line (8 spaces), inject new keys
    if (trimmed.startsWith('totalCost:')) {
      var newKeys = [
        '        storesChina: "中国门店",',
        '        storesOverseas: "海外门店",',
        '        fee: "加盟费",',
        '        cost: "总投资",',
        '        highlights: "项目亮点",',
      ];
      output.push(newKeys.join('\n'));
      console.log('Added brandCard keys after totalCost (locale: ' + currentLocale + ')');
    }

    // Closing brandCard (6 spaces)
    if (trimmed === '},' && line.match(/^      \}/)) {
      inBrandCard = false;
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync('lib/i18n.ts', output.join('\n'), 'utf8');
console.log('Done. Total lines:', output.length);

// Verify
var c2 = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines2 = c2.split('\n');
var found = {};
['zh','en','th','vi'].forEach(function(locale) {
  found[locale] = false;
});
var current = null;
for (var i = 0; i < lines2.length; i++) {
  var locale2 = getLocale(lines2[i]);
  if (locale2) current = locale2;
  if (lines2[i].trim().match(/^\},$/) && lines2[i].match(/^      \}/)) {
    // closing brandCard?
    var hasStore = false;
    for (var j = i-1; j >= 0 && lines2[j].trim() !== 'brandCard: {'; j--) {
      if (lines2[j].trim().match(/^storesChina:/)) { hasStore = true; break; }
    }
    if (hasStore) { found[current] = true; console.log('OK: ' + current + ' brandCard has storesChina'); }
    current = null;
  }
}

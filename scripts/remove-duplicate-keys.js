var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Remove duplicate lines in brandCard sections
// We want to keep only ONE instance of storesChina, storesOverseas, fee, cost per locale
// Strategy: for each locale, inside brandCard, track which keys we've seen and remove duplicates

var inLocale = null;
var inBrandCard = false;
var seenKeys = {};
var output = [];
var duplicateCount = 0;

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trim = line.trim();
  
  // Detect entering a locale
  var localeMatch = trim.match(/^([a-z]{2}): \{$/);
  if (localeMatch && line.match(/^  [a-z]{2}: \{$/)) {
    inLocale = localeMatch[1];
    inBrandCard = false;
    seenKeys = {};
    output.push(line);
    continue;
  }
  
  // Detect entering brandCard
  if (trim === 'brandCard: {') {
    inBrandCard = true;
    seenKeys = {};
    output.push(line);
    continue;
  }
  
  // Detect closing brandCard (6 spaces indent, just "},")
  if (inBrandCard && trim === '},' && line.match(/^      [^ ]/)) {
    inBrandCard = false;
    output.push(line);
    continue;
  }
  
  // Inside brandCard: check for duplicate keys
  if (inBrandCard) {
    var keyMatch = line.match(/^        (\w+):/);
    if (keyMatch) {
      var key = keyMatch[1];
      if (seenKeys[key]) {
        // Duplicate - skip this line
        duplicateCount++;
        console.log('L'+(i+1)+' duplicate key: ' + key + ' (locale: ' + inLocale + ')');
        continue;
      } else {
        seenKeys[key] = true;
      }
    }
  }
  
  output.push(line);
}

fs.writeFileSync('lib/i18n.ts', output.join('\n'), 'utf8');
console.log('\nRemoved ' + duplicateCount + ' duplicate lines');

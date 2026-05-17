var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Goal: fix zh.home.brandCard section (lines 19-31):
// - Lines 23-26: wrong indent (6 spaces -> 8 spaces) AND duplicate additions
// - Lines 27-30: duplicate additions -> REMOVE
// - Keep original keys (lines 20-22: franchiseFee, stores, totalCost) at 8 spaces
// - Keep closing (line 31: "      },") at 6 spaces

// Strategy: rebuild the brandCard section for each locale
// We need to identify brandCard sections and rebuild them

var inLocale = null;
var inBrandCard = false;
var brandCardLines = [];
var output = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trim = line.trim();
  
  // Detect entering a locale
  var localeMatch = trim.match(/^([a-z]{2}): \{$/);
  if (localeMatch && line.match(/^  [a-z]{2}: \{$/)) {
    inLocale = localeMatch[1];
    inBrandCard = false;
    output.push(line);
    continue;
  }
  
  // Detect entering brandCard
  if (trim === 'brandCard: {') {
    inBrandCard = true;
    brandCardLines = [line]; // keep the "brandCard: {" line
    continue;
  }
  
  // Inside brandCard: collect lines
  if (inBrandCard) {
    // Closing brandCard (6 spaces indent)
    if (trim === '},' && line.match(/^      \}/)) {
      brandCardLines.push(line); // keep closing
      // Rebuild brandCard section
      var correctSection = rebuildBrandCard(brandCardLines, inLocale);
      output.push(correctSection);
      inBrandCard = false;
      brandCardLines = [];
      continue;
    }
    // Other content inside brandCard (original keys like franchiseFee at 8 spaces)
    if (trim !== '') {
      brandCardLines.push(line);
    }
    continue;
  }
  
  output.push(line);
}

function rebuildBrandCard(lines, locale) {
  // Extract original keys (8 spaces indent, like "franchiseFee", "stores", "totalCost")
  var originalKeys = [];
  var seenNewKeys = { storesChina: false, storesOverseas: false, fee: false, cost: false };
  
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i];
    var trim = l.trim();
    if (trim === 'brandCard: {' || trim === '},') continue;
    
    // Original keys: 8 spaces indent (e.g. "franchiseFee:")
    var keyMatch = l.match(/^        (\w+):/);
    if (keyMatch) {
      originalKeys.push(l);
      continue;
    }
    
    // New keys added at WRONG indent (6 spaces): "storesChina:", "storesOverseas:", etc.
    var newKeyMatch = l.match(/^      (\w+):/);
    if (newKeyMatch) {
      var key = newKeyMatch[1];
      if (!seenNewKeys.hasOwnProperty(key)) {
        // First occurrence: convert to correct indent (add 2 spaces)
        originalKeys.push('        ' + trim);
        seenNewKeys[key] = true;
      } else {
        // Duplicate: skip
        console.log('Removing duplicate ' + key + ' (locale: ' + locale + ')');
      }
      continue;
    }
    
    // Fallback: keep as-is
    originalKeys.push(l);
  }
  
  // Build correct brandCard section
  var result = ['      brandCard: {'];
  result = result.concat(originalKeys);
  result.push('      },');
  return result.join('\n');
}

fs.writeFileSync('lib/i18n.ts', output.join('\n'), 'utf8');
console.log('Done. File length:', fs.readFileSync('lib/i18n.ts','utf8').split('\n').length, 'lines');

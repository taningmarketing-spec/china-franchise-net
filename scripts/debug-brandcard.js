var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Debug: find zh.home.brandCard structure
var inLocale = false;
var inHome = false;
var inBrandCard = false;
var depth = 0;

for (var i = 0; i < lines.length; i++) {
  var trimmed = lines[i].trim();
  if (trimmed === 'zh: {') { inLocale = true; console.log('Found zh: at line '+(i+1)); }
  if (!inLocale) continue;
  if (trimmed === 'home: {') { inHome = true; console.log('Found home: at line '+(i+1)); continue; }
  if (inHome && trimmed === 'brandCard: {') {
    inBrandCard = true;
    depth = 0;
    console.log('Found brandCard: at line '+(i+1));
    continue;
  }
  if (inBrandCard) {
    for (var j = 0; j < lines[i].length; j++) {
      var ch = lines[i][j];
      if (ch === '{') depth++;
      if (ch === '}') depth--;
    }
    console.log('line '+(i+1)+' depth='+depth+' content='+JSON.stringify(trimmed.substring(0,25)));
    if (depth === 0 && trimmed === '}') {
      console.log('brandCard closing at line '+(i+1));
      break;
    }
  }
}
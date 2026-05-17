// Rebuild i18n.ts with correct home section content for each locale
// Strategy: read zh/en/th/vi blocks, rebuild home sections properly
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Check what's in zh home currently (lines 18-71 based on earlier inspection)
console.log('=== Current zh home section ===');
for (var i = 17; i < 80; i++) {
  if (lines[i]) console.log('L'+(i+1)+': '+lines[i].trim().slice(0,80));
}
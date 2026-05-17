var fs = require('fs');
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
var count = 0;
var idx = 0;
while ((idx = c.indexOf('LABELS', idx)) !== -1) {
  console.log('LABELS at ' + idx + ': ' + c.substring(idx, idx + 30));
  idx += 6;
  count++;
}
console.log('Total: ' + count);
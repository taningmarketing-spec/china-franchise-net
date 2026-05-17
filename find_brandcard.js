const fs = require('fs');
const c = fs.readFileSync('C:/Users/LEO/.qclaw/workspace/china-franchise-net/lib/i18n.ts', 'utf8');
let n = 0, s = 0;
while ((s = c.indexOf('brandCard:', s)) !== -1) {
  n++;
  console.log(n + ': ' + c.substring(s - 10, s + 50));
  s += 10;
}
console.log('Total:', n);

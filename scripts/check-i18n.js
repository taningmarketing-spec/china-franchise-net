var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
// Find footer section
var idx = c.indexOf('footer:');
if (idx === -1) { console.log('No footer found'); process.exit(1); }
var end = c.indexOf('\n}', idx);
console.log(c.substring(idx, end + 2));

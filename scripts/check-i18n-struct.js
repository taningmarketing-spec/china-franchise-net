var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
for (var i = 0; i < lines.length; i++) {
  var l = lines[i].trim();
  if (l === '}' || l.startsWith('}') || l.match(/^\s+[a-zA-Z]+:$/) || l.match(/^\s+[a-zA-Z]+,$/)) {
    console.log((i+1) + ': ' + lines[i]);
  }
}
console.log('\nTotal lines: ' + lines.length);
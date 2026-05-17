var fs = require('fs');
var l = fs.readFileSync('lib/i18n.ts', 'utf8').split('\n');
console.log('Total lines:', l.length);
for (var i = 0; i < Math.min(l.length, 30); i++) {
  console.log('L'+(i+1)+': ' + l[i].trim().slice(0,80));
}
console.log('...');
for (var i = Math.max(0, l.length-20); i < l.length; i++) {
  console.log('L'+(i+1)+': ' + l[i].trim().slice(0,80));
}
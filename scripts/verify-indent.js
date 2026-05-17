var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Total lines:', lines.length);

// Show zh home section
console.log('\n=== zh home ===');
for (var i = 67; i < 77; i++) {
  var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
  console.log('L'+(i+1)+' ('+indent+'sp): ' + JSON.stringify(lines[i]));
}

// Show vi home section
console.log('\n=== vi home ===');
for (var i = 512; i < 522; i++) {
  var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
  console.log('L'+(i+1)+' ('+indent+'sp): ' + JSON.stringify(lines[i]));
}

// Check what's at line 70 character by character
console.log('\n=== zh L70 raw bytes ===');
var l70 = lines[69];
for (var i = 0; i < 20; i++) {
  console.log('  pos ' + i + ': char=' + JSON.stringify(l70[i]) + ' code=' + (l70.charCodeAt(i)));
}
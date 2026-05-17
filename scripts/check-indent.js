var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
for (var i = 220; i < 230; i++) {
  var line = lines[i];
  var indent = line.match(/^(\s*)/);
  var indentStr = indent ? indent[1] : '';
  console.log((i+1) + ' indent=' + indentStr.length + ' enterAcademy=' + line.includes('enterAcademy') + ' >' + line);
}
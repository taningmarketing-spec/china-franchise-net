var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Total lines:', lines.length);

// Find inquiry: "undefined"
for (var i = 0; i < lines.length; i++) {
  if (lines[i].includes('inquiry:') && lines[i].includes('undefined')) {
    console.log('L' + (i+1) + ': ' + lines[i].trim());
  }
}

// Find brand: keys at object level
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t.match(/^brand\s*:/)) {
    console.log('L' + (i+1) + ': ' + t + ' (indent: ' + (lines[i].length - lines[i].trimStart().length) + ')');
  }
}

// Find contactModal: keys
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t.match(/^contactModal\s*:/)) {
    console.log('L' + (i+1) + ': ' + t + ' (indent: ' + (lines[i].length - lines[i].trimStart().length) + ')');
  }
}

// Find brandGallery: keys
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t.match(/^brandGallery\s*:/)) {
    console.log('L' + (i+1) + ': ' + t + ' (indent: ' + (lines[i].length - lines[i].trimStart().length) + ')');
  }
}

// Check brace balance
var depth = 0;
for (var i = 0; i < lines.length; i++) {
  for (var j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === '{') depth++;
    if (lines[i][j] === '}') depth--;
  }
}
console.log('Brace balance:', depth === 0 ? 'OK' : 'BROKEN (depth=' + depth + ')');

// Show locale markers
for (var i = 0; i < lines.length; i++) {
  var t = lines[i].trim();
  if (t.match(/^(zh|en|th|vi)\s*:\s*\{/)) {
    console.log('L' + (i+1) + ': ' + t);
  }
}

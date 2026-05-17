var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Show lines 515-525 (vi home section)
console.log('=== vi home section ===');
for (var i = 505; i < 525; i++) {
  if (lines[i]) console.log('L'+(i+1)+' ('+(lines[i].match(/^(\s*)/)[1].length)+'sp): '+lines[i].trim());
}

// Check vi contactModal content
console.log('\n=== vi contactModal ===');
for (var i = 515; i < 530; i++) {
  if (lines[i] && lines[i].includes('contactModal')) {
    console.log('L'+(i+1)+': '+lines[i].trim().slice(0,100));
    // Show next 8 lines
    for (var j = i+1; j < i+10; j++) {
      if (lines[j]) console.log('L'+(j+1)+': '+lines[j].trim().slice(0,100));
    }
  }
}

// Count total lines
console.log('\nTotal:', lines.length);

// Check nav: { for vi (4-space nav)
console.log('\n=== nav: { lines ===');
for (var i = 0; i < lines.length; i++) {
  var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
  if (lines[i].trim() === 'nav: {' && indent === 4) {
    console.log('L'+(i+1)+' ('+indent+'sp): '+lines[i].trim());
  }
}
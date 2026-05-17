var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trim = line.trim();
  // Find lines around the home close (should be "  }," followed by "  brand: {")
  if (trim === '},') {
    var indent = line.match(/^(\s*)/)[0].length;
    var nextNonEmpty = '';
    for (var j = i+1; j < lines.length; j++) {
      if (lines[j].trim() !== '') { nextNonEmpty = lines[j].trim(); break; }
    }
    if (nextNonEmpty === 'brand: {') {
      console.log('L'+(i+1)+' home close? indent='+indent+' next_nonempty="'+nextNonEmpty+'" line='+JSON.stringify(line));
    }
  }
}

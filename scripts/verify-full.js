var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Total lines:', lines.length);

// Check zh home section
console.log('\n=== zh home section ===');
for (var i = 16; i < 65; i++) {
  if (!lines[i]) continue;
  var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
  var content = lines[i].trim();
  if (content) console.log('L'+(i+1)+' ('+indent+'sp): ' + content.slice(0, 80));
}

// Check vi home section
console.log('\n=== vi home section ===');
for (var i = 360; i < 420; i++) {
  if (!lines[i]) continue;
  var indent = (lines[i].match(/^(\s*)/) || [''])[0].length;
  var content = lines[i].trim();
  if (content) console.log('L'+(i+1)+' ('+indent+'sp): ' + content.slice(0, 80));
}

// Verify object balance
var opens = c.split('{').length - 1;
var closes = c.split('}').length - 1;
console.log('\nBrace balance: {=' + opens + ' }=' + closes + ' diff=' + (opens-closes));

// Check for common syntax issues
var bad = c.split('\n').filter(function(l) {
  var t = l.trim();
  return t === ',' || t === '},,' || t.match(/},\s*,/) || t.match(/:\s*,\s*"/);
});
console.log('Problem lines:', bad.length);
if (bad.length > 0) bad.forEach(function(l) { console.log(' BAD:', l); });

// Verify key paths work
try {
  // Simulate the structure
  var zh = {};
  lines.forEach(function(line) {
    var m = line.trim().match(/^(\w+):\s*"([^"]*)"/);
  });
  console.log('\nFile reads OK (no eval needed)');
} catch(e) {
  console.log('\nError:', e.message);
}
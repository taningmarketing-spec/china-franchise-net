const fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Remove the duplicate enterAcademy at line 228
// Line 227 has indent "    " (4 spaces), line 228 has indent "    " too
// Actually line 227 is "    enterAcademy: "Enter Academy"," (no leading space issue)
// Let me check: line 228 should be removed

console.log('Before removal:');
for (var i = 225; i < 232; i++) console.log((i+1) + ': |' + lines[i] + '|');

// Remove line 228 (0-indexed: 227) - the duplicate
lines.splice(227, 1);

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('Removed duplicate. After:');
var c2 = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines2 = c2.split('\n');
for (var i = 224; i < 233; i++) console.log((i+1) + ': ' + lines2[i]);

// Verify only one
var count = 0;
var pos = 0;
while ((pos = c2.indexOf('enterAcademy', pos + 1)) >= 0) count++;
console.log('Total enterAcademy keys:', count);
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Count occurrences of key phrases
var brandCount = 0;
var inquiryCount = 0;
for (var i = 0; i < lines.length; i++) {
  var l = lines[i].trim();
  if (l.match(/^\s*brand\s*:/)) brandCount++;
  if (l.match(/^\s*inquiry\s*:/)) inquiryCount++;
  if (l.includes('"undefined"') || l.includes("'undefined'")) {
    console.log('L' + (i+1) + ': ' + lines[i]);
  }
}
console.log('brandCount:', brandCount);
console.log('inquiryCount:', inquiryCount);

// Check structure
var braceStack = [];
var inZh = false, inEn = false, inTh = false, inVi = false;
for (var i = 0; i < lines.length; i++) {
  var l = lines[i];
  for (var j = 0; j < l.length; j++) {
    if (l[j] === '{') braceStack.push({line: i+1, char: j});
    if (l[j] === '}') braceStack.pop();
  }
  var t = l.trim();
  if (t.match(/^zh\s*:\s*\{/)) inZh = true;
  if (t.match(/^en\s*:\s*\{/) && !t.includes('nameEn')) { inEn = true; inZh = false; }
  if (t.match(/^th\s*:\s*\{/) && !t.includes('nameTh')) { inTh = true; inEn = false; }
  if (t.match(/^vi\s*:\s*\{/) && !t.includes('nameVi')) { inVi = true; inTh = false; }
}
console.log('Total lines:', lines.length);
console.log('Brace balance:', braceStack.length, 'unmatched {');
if (braceStack.length > 0) console.log('First few unmatched:', braceStack.slice(0,3));

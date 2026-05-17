var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var startIdx = c.indexOf('export const translations');
var objStart = c.indexOf('{', startIdx);
var depth = 0;
var objEnd = -1;
for (var i = objStart; i < c.length; i++) {
  if (c[i] === '{') depth++;
  if (c[i] === '}') {
    depth--;
    if (depth === 0) { objEnd = i + 1; break; }
  }
}
var objStr = c.slice(objStart, objEnd).replace(/as\s+const/g, '');
try {
  var t = eval('(' + objStr + ')');
  // Check for missing keys in brand section
  var keys = ['email', 'privacy', 'consultingDesc', 'successDesc', 'phoneLabel'];
  keys.forEach(function(k) {
    console.log('zh.brand.' + k + ':', t.zh.brand[k] ?? '(MISSING)');
    console.log('en.brand.' + k + ':', t.en.brand[k] ?? '(MISSING)');
  });
  console.log('---');
  console.log('zh.brand full keys:', Object.keys(t.zh.brand).join(', '));
} catch(e) {
  console.log('Error:', e.message);
}

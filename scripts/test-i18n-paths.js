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
  
  // Check zh.brand keys (inquiry form related)
  console.log('zh.brand keys:', Object.keys(t.zh.brand).join(', '));
  console.log('---');
  console.log('zh.brand.inquiryModal:', JSON.stringify(t.zh.brand.inquiryModal));
  console.log('zh.brand.name:', t.zh.brand.name);
  console.log('zh.brand.phone:', t.zh.brand.phone);
  console.log('zh.brand.message:', t.zh.brand.message);
  console.log('zh.brand.submit:', t.zh.brand.submit);
  console.log('zh.brand.submitting:', t.zh.brand.submitting);
  console.log('zh.brand.success:', t.zh.brand.success);
  console.log('zh.brand.error:', t.zh.brand.error);
  console.log('zh.brand.required:', t.zh.brand.required);
  console.log('zh.brand.applyNow:', t.zh.brand.applyNow);
  console.log('---');
  console.log('en.brand keys:', Object.keys(t.en.brand).join(', '));
  console.log('en.brand.inquiryModal:', JSON.stringify(t.en.brand.inquiryModal));
  console.log('en.brand.name:', t.en.brand.name);
  console.log('en.brand.phone:', t.en.brand.phone);
  console.log('en.brand.submit:', t.en.brand.submit);
  console.log('en.brand.success:', t.en.brand.success);
  console.log('en.brand.required:', t.en.brand.required);
} catch(e) {
  console.log('Error:', e.message);
}

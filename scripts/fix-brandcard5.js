var fs = require('fs');
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
var oldLine = "<span className=\"text-slate-500\">{zh: '项目亮点', en: 'Highlights', th: 'จุดเด่น', vi: 'Điểm nổi bật'}[locale] || 'Highlights'</span>";
var newLine = "<span className=\"text-slate-500\">{({zh: '项目亮点', en: 'Highlights', th: 'จุดเด่น', vi: 'Điểm nổi bật'}[locale] || 'Highlights')}</span>";
if (c.includes(oldLine)) {
  c = c.replace(oldLine, newLine);
  console.log('Replaced OK');
} else {
  console.log('Pattern not found. Current content:');
  var i = c.indexOf('highlights &&');
  console.log(JSON.stringify(c.substring(i, i+350)));
}
fs.writeFileSync('components/front/BrandCard.tsx', c);
var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');

// Fix 1: Logo area - replace hardcoded site name
var p1 = "{locale === 'zh' ? '中国国际加盟网' : locale === 'en' ? 'China Franchise Net' : 'ChinaFranchise'}";
if (c.includes(p1)) {
  c = c.replace(p1, "getLabel('siteName')");
  console.log('Fixed logo site name');
} else { console.log('p1 not found'); }

// Fix 2: Footer h3 site name
var p2 = "{locale === 'zh' ? '中国国际加盟网' : 'China Franchise Net'}";
if (c.includes(p2)) {
  c = c.replace(p2, "getLabel('siteName')");
  console.log('Fixed footer site name');
} else { console.log('p2 not found'); }

// Fix 3: Enter Academy link
var p3 = "{locale === 'zh' ? '进入学院主页' : 'View Academy Home'}";
if (c.includes(p3)) {
  c = c.replace(p3, "getLabel('enterAcademy')");
  console.log('Fixed enter academy');
} else { console.log('p3 not found'); }

// Fix 4: Dropdown descriptions - hardcoded Chinese/English in desc field
var descFixes = [
  ['追踪全球最新动态', "(t.nav as any)['overseasDynamicDesc']"],
  ['成功案例深度解析', "(t.nav as any)['overseasCaseDesc']"],
  ['从零建立知识体系', "(t.nav as any)['overseasTipsDesc']"],
  ['各国法规政策解读', "(t.nav as any)['overseasPolicyDesc']"],
];

descFixes.forEach(function(item) {
  var old = item[0], neu = item[1];
  var count = 0;
  while (c.indexOf(old) !== -1) {
    c = c.replace(old, neu);
    count++;
  }
  if (count > 0) console.log('Replaced "' + old + '" x' + count);
  else console.log('Not found: ' + old);
});

fs.writeFileSync('components/front/LocaleClientLayout.tsx', c, 'utf8');
console.log('File written');
// Verify
var c2 = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');
console.log('Still has "中国国际加盟网":', c2.includes('中国国际加盟网'));
console.log('Has getLabel siteName:', c2.includes("getLabel('siteName')"));
console.log('Has enterAcademy:', c2.includes("getLabel('enterAcademy')"));
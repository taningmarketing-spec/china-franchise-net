var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');

// Replace dropdown descriptions
var drops = [
  ["追踪全球最新动态", "Track global trends", "(t.nav as any)['overseasDynamicDesc']"],
  ["成功案例深度解析", "Case study analysis", "(t.nav as any)['overseasCaseDesc']"],
  ["从零建立知识体系", "Build knowledge from scratch", "(t.nav as any)['overseasTipsDesc']"],
  ["各国法规政策解读", "Policy & regulations guide", "(t.nav as any)['overseasPolicyDesc']"],
];
drops.forEach(function(item) {
  var zh = item[0], en = item[1], tKey = item[2];
  var pat = "desc: locale === 'zh' ? '" + zh + "' : '" + en + "'";
  var rep = "desc: " + tKey;
  if (c.includes(pat)) {
    c = c.replace(pat, rep);
    console.log('Replaced dropdown desc: ' + zh);
  } else {
    console.log('Not found: ' + pat.substring(0, 60));
  }
});

fs.writeFileSync('components/front/LocaleClientLayout.tsx', c, 'utf8');
var c2 = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');
console.log('Verification - overseasDynamicDesc:', c2.includes("overseasDynamicDesc"));
console.log('Verification - still has 追踪:', c2.includes('追踪全球最新动态'));
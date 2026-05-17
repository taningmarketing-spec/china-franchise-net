var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');

// Fix 1: Logo area - replace hardcoded site name (line 78)
c = c.replace(
  "{locale === 'zh' ? '中国国际加盟网' : locale === 'en' ? 'China Franchise Net' : 'ChinaFranchise'}",
  "getLabel('siteName')"
);

// Fix 2: Footer h3 - replace hardcoded site name (line 241)
c = c.replace(
  "{locale === 'zh' ? '中国国际加盟网' : 'China Franchise Net'}",
  "getLabel('siteName')"
);

// Fix 3: Enter Academy link (line 144)
c = c.replace(
  "{locale === 'zh' ? '进入学院主页' : 'View Academy Home'}",
  "getLabel('enterAcademy')"
);

// Fix 4: Dropdown descriptions - use nav.desc keys
var replacements = [
  [/"追踪全球最新动态"/, "(t.nav as any)['overseasDynamicDesc']"],
  [/"成功案例深度解析"/, "(t.nav as any)['overseasCaseDesc']"],
  [/"从零建立知识体系"/, "(t.nav as any)['overseasTipsDesc']"],
  [/"各国法规政策解读"/, "(t.nav as any)['overseasPolicyDesc']"],
];
replacements.forEach(function(item) {
  var old = item[0];
  var neu = item[1];
  if (c.includes(old)) {
    c = c.replace(old, neu);
    console.log('Replaced: ' + JSON.stringify(old));
  } else {
    console.log('Not found: ' + JSON.stringify(old));
  }
});

fs.writeFileSync('components/front/LocaleClientLayout.tsx', c, 'utf8');
console.log('Done');
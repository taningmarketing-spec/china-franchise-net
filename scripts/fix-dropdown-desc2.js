var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');

// Fix desc fields: replace the ternary with a single i18n key
var fixes = [
  "desc: locale === 'zh' ? '(t.nav as any)['overseasDynamicDesc']' : 'Track global trends'",
  "desc: locale === 'zh' ? '(t.nav as any)['overseasCaseDesc']' : 'Case study analysis'",
  "desc: locale === 'zh' ? '(t.nav as any)['overseasTipsDesc']' : 'Build knowledge from scratch'",
  "desc: locale === 'zh' ? '(t.nav as any)['overseasPolicyDesc']' : 'Policy & regulations guide'",
];

var reps = [
  "desc: (t.nav as any)['overseasDynamicDesc']",
  "desc: (t.nav as any)['overseasCaseDesc']",
  "desc: (t.nav as any)['overseasTipsDesc']",
  "desc: (t.nav as any)['overseasPolicyDesc']",
];

fixes.forEach(function(f, i) {
  if (c.includes(f)) {
    c = c.replace(f, reps[i]);
    console.log('Fixed: ' + f.substring(0, 40));
  } else {
    console.log('Not found: ' + f.substring(0, 40));
  }
});

fs.writeFileSync('components/front/LocaleClientLayout.tsx', c, 'utf8');
var c2 = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');
var terms = ['Track global', 'Case study', 'Build knowledge', 'Policy &amp; regulations', 'ChinaFranchise'];
terms.forEach(function(t) {
  if (c2.includes(t)) console.log('STILL HAS:', t);
});
console.log('Done');
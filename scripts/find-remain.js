var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');
var lines = c.split('\n');
var terms = ['ChinaFranchise', 'Track global', 'Case study', 'Build knowledge', 'Policy &amp; regulations'];
lines.forEach(function(l, i) {
  terms.forEach(function(t) {
    if (l.includes(t)) console.log('Line', i+1, ':', l.trim().substring(0, 120));
  });
});
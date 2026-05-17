var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');

var r1 = "\u8ffd\u8e2a\u5168\u7403\u6700\u65b0\u52a8\u6001";
var r2 = "\u6210\u529f\u6848\u4f8b\u6df1\u5ea6\u89e3\u6790";
var r3 = "\u4ece\u96f6\u5efa\u7acb\u77e5\u8bc6\u4f53\u7cfb";
var r4 = "\u5404\u56fd\u6cd5\u89c4\u653f\u7b56\u89e3\u8bfb";

var vals = [
  [r1, "(t.nav as any)['overseasDynamicDesc']"],
  [r2, "(t.nav as any)['overseasCaseDesc']"],
  [r3, "(t.nav as any)['overseasTipsDesc']"],
  [r4, "(t.nav as any)['overseasPolicyDesc']"],
];

vals.forEach(function(pair) {
  var old = pair[0], neu = pair[1];
  var idx = c.indexOf(old);
  if (idx !== -1) {
    c = c.replace(old, neu);
    console.log('Replaced: ' + old);
  } else { console.log('Not found: ' + old); }
});

fs.writeFileSync('components/front/LocaleClientLayout.tsx', c, 'utf8');
console.log('Done');
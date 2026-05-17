var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var idx = c.indexOf('export const translations');
var objStr = c.substring(idx).replace(/^export const translations = /, '');
// Remove trailing semicolon and whitespace
objStr = objStr.replace(/;\s*$/, '').trim();
try {
  var trans = eval('(' + objStr + ')');
  console.log('✓ i18n.ts parses OK');
  console.log('');
  console.log('=== Key structure checks ===');
  console.log('zh.nav.enterAcademy:', trans.zh.nav.enterAcademy);
  console.log('en.nav.enterAcademy:', trans.en.nav.enterAcademy);
  console.log('th.nav.enterAcademy:', trans.th.nav.enterAcademy);
  console.log('vi.nav.enterAcademy:', trans.vi.nav.enterAcademy);
  console.log('');
  console.log('zh.home.brandCard:', JSON.stringify(trans.zh.home.brandCard));
  console.log('en.home.brandCard:', JSON.stringify(trans.en.home.brandCard));
  console.log('');
  console.log('zh.footer keys:', Object.keys(trans.zh.footer).join(', '));
  console.log('en.footer keys:', Object.keys(trans.en.footer).join(', '));
  console.log('th.footer keys:', Object.keys(trans.th.footer).join(', '));
  console.log('vi.footer keys:', Object.keys(trans.vi.footer).join(', '));
  console.log('');
  console.log('=== All locales have nav.enterAcademy ===');
  for (const l of ['zh', 'en', 'th', 'vi']) {
    var has = trans[l] && trans[l].nav && trans[l].nav.enterAcademy ? '✓' : '✗ MISSING';
    console.log(l + ':', has, has === '✓' ? trans[l].nav.enterAcademy : '(missing)');
  }
  console.log('');
  console.log('=== All locales have home.brandCard ===');
  for (const l of ['zh', 'en', 'th', 'vi']) {
    var has = trans[l] && trans[l].home && trans[l].home.brandCard ? '✓' : '✗ MISSING';
    console.log(l + ':', has);
  }
} catch(e) {
  console.log('✗ Parse error:', e.message);
}

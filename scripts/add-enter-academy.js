var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Strategy: find nav: { for each locale, then insert enterAcademy before the closing }, at indent 4

var closesAdded = { zh: false, en: false, th: false, vi: false };
var inNav = false;
var currentLocale = null;

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  var trim = line.trim();
  
  // Detect locale entry (pattern like "  zh: {" or "  en: {" etc., 2 spaces indent)
  var localeMatch = trim.match(/^([a-z]{2}): \{/);
  if (localeMatch && line.match(/^  [a-z]{2}: \{/)) {
    currentLocale = localeMatch[1];
    inNav = false;
    continue;
  }
  
  // Detect entering nav block (indent 2 inside locale)
  if (trim === 'nav: {') {
    inNav = true;
    continue;
  }
  
  // Detect closing nav block: exactly "    }," at indent 4
  if (inNav && trim === '},' && line.startsWith('    ')) {
    var locale = currentLocale;
    if (locale && !closesAdded[locale]) {
      var vals = {
        zh: '      enterAcademy: "进入学院",',
        en: '      enterAcademy: "Enter Academy",',
        th: '      enterAcademy: "เข้าสู่หน้าสถาบัน",',
        vi: '      enterAcademy: "Vào trang Học viện",'
      };
      lines.splice(i, 0, vals[locale]);
      closesAdded[locale] = true;
      console.log('✓ Added ' + locale + '.nav.enterAcademy at line ' + (i+1));
      i++;
      inNav = false;
    }
    continue;
  }
}

fs.writeFileSync('lib/i18n.ts', lines.join('\n'), 'utf8');
console.log('');
console.log('Done. Closes added:', JSON.stringify(closesAdded));

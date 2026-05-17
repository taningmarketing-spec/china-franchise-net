const fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

// Find brandCard closing lines for each locale and add missing keys
// brandCard closes with "}," (line 23, 162, 301, 440 for zh/en/th/vi)

const additions = [
  { locale: 'zh', closingLine: 23, keys: [
    'storesChina: "中国门店",',
    'storesOverseas: "海外门店",',
    'highlights: "项目亮点",',
  ]},
  { locale: 'en', closingLine: 162, keys: [
    'storesChina: "CN Stores",',
    'storesOverseas: "Overseas Stores",',
    'highlights: "Highlights",',
  ]},
  { locale: 'th', closingLine: 301, keys: [
    'storesChina: "สาขาจีน",',
    'storesOverseas: "สาขาต่างประเทศ",',
    'highlights: "จุดเด่น",',
  ]},
  { locale: 'vi', closingLine: 440, keys: [
    'storesChina: "Cửa hàng TQ",',
    'storesOverseas: "Cửa hàng HQ",',
    'highlights: "Điểm nổi bật",',
  ]},
];

// Also add enterAcademy to nav (after search key for each locale)
// zh nav closing at line 81
// en nav closing at line 220
// th nav closing at line 359
// vi nav closing at line 498

const navAdditions = [
  { locale: 'zh', searchLine: 80, key: 'enterAcademy: "进入学院主页",' },
  { locale: 'en', searchLine: 219, key: 'enterAcademy: "Enter Academy",' },
  { locale: 'th', searchLine: 358, key: 'enterAcademy: "เข้าสู่หน้าสถาบัน",' },
  { locale: 'vi', searchLine: 497, key: 'enterAcademy: "Vào trang Học viện",' },
];

// Add brandCard keys
for (const add of additions) {
  // 0-indexed line number = closingLine - 1
  var idx = add.closingLine - 1;
  var indent = lines[idx].match(/^\s*/)[0];
  var insertStr = add.keys.map(k => indent + k).join('\n') + '\n' + indent;
  lines[idx] = insertStr + lines[idx];
  console.log(`Added 3 keys before line ${add.closingLine} for ${add.locale}`);
}

// Rebuild content
c = lines.join('\n');

// Recalculate line numbers after insertions
// zh nav closing after add: line 81 + 3 = 84 (because 3 lines added at line 23)
// Actually the insertions shifted lines differently.
// Let me recalculate:
// zh brandCard insert at line 23 (adds 3 lines) → all lines after shift by +3
// en brandCard was at 162, now at 165
// th brandCard was at 301, now at 304
// vi brandCard was at 440, now at 443
// zh nav was at 81, now at 84
// en nav was at 220, now at 223
// th nav was at 359, now at 362
// vi nav was at 498, now at 501

var lines2 = c.split('\n');

// Recalculate nav lines
const navNew = [
  { locale: 'zh', searchLine: 84, key: 'enterAcademy: "进入学院主页",' },
  { locale: 'en', searchLine: 223, key: 'enterAcademy: "Enter Academy",' },
  { locale: 'th', searchLine: 362, key: 'enterAcademy: "เข้าสู่หน้าสถาบัน",' },
  { locale: 'vi', searchLine: 501, key: 'enterAcademy: "Vào trang Học viện",' },
];

// Find nav closing (line with "}," after search) for each locale
for (const nav of navNew) {
  // The search line has "search:", insert after it
  // Find the line that ends with "}," after the searchLine
  var closingIdx = -1;
  for (var i = nav.searchLine; i < lines2.length && i < nav.searchLine + 5; i++) {
    if (lines2[i].trim() === '},') {
      closingIdx = i;
      break;
    }
  }
  if (closingIdx >= 0) {
    var indent = lines2[closingIdx].match(/^\s*/)[0];
    lines2[closingIdx] = indent + nav.key + '\n' + lines2[closingIdx];
    console.log(`Added enterAcademy to ${nav.locale}.nav at line ${closingIdx + 1}`);
  }
}

fs.writeFileSync('lib/i18n.ts', lines2.join('\n'), 'utf8');
console.log('Done!');

// Verify
c = fs.readFileSync('lib/i18n.ts', 'utf8');
for (const k of ['storesChina', 'storesOverseas', 'highlights', 'enterAcademy']) {
  var idx = c.indexOf(k);
  if (idx >= 0) {
    var lineNo = c.substring(0, idx).split('\n').length;
    console.log('✓ ' + k + ' found at line ' + lineNo);
  } else {
    console.log('✗ ' + k + ' NOT found!');
  }
}
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');

// Find th section end - look for ดูรายละเอียด then },\n  },\n  vi
var idx = c.indexOf("'ดูรายละเอียด'");
if (idx === -1) { console.log('NOT FOUND th common ending'); process.exit(1); }
var end = c.indexOf('  vi:', idx);
var chunk = c.substring(idx, end);
console.log('Found chunk:', JSON.stringify(chunk.substring(0, 60)));

// Replace th ending
var oldTh = chunk + '  vi:';
var newTh = chunk + "    academy: {\n      noArticles: 'ยังไม่มีบทความ โปรดรอ...',\n      pageLabel: 'หน้า',\n      ofLabel: 'จาก',\n      perPage: 'ต่อหน้า',\n      showing: 'แสดง {from}–{to} จาก {total}',\n      prev: 'ก่อนหน้า',\n      next: 'ถัดไป',\n      first: 'หน้าแรก',\n      last: 'หน้าสุดท้าย',\n    },\n  },\n  vi:";

fs.writeFileSync('lib/i18n.ts', c.replace(oldTh, newTh));
console.log('OK');

// Remove orphaned comma lines and add missing keys safely
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

// 1. Remove standalone comma lines (lines that are just "," or "   ,")
var toRemove = new Set();
lines.forEach(function(l, i) {
  var t = l.trim();
  if (t === ',') toRemove.add(i);
});

console.log('Removing', toRemove.size, 'comma-only lines');
var newLines = lines.filter(function(l, i) { return !toRemove.has(i); });

// 2. Now add missing keys by finding each locale's home section close
// Find "},  " that closes home: { in each locale and insert before it
var content = newLines.join('\n');

// New keys to add: home.brand.inquiry, home.contactModal section, home.brandGallery section
// academy.page and academy.of (low priority, add if easy)
// Using LINE NUMBER approach: find each locale's home close line and insert before it

function findHomeClose(localeName, content) {
  var locIdx = content.indexOf(localeName + ': {');
  if (locIdx < 0) return -1;
  var afterLoc = content.substring(locIdx);
  var homeStart = afterLoc.indexOf('home: {');
  if (homeStart < 0) return -1;
  var homeAbs = locIdx + homeStart;
  // Find the closing brace: depth 0 after home
  var depth = 0;
  for (var i = homeAbs; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

var inserts = {
  zh: {
    indent: '      ',
    keys: [
      'brand: { inquiry: "立即咨询加盟" },',
      'contactModal: { title: "选择联系方式", consulting: "咨询", copied: "✓ 已复制", copy: "复制", open: "打开", call: "拨打", workHours: "工作时间：周一至周六 9:00-18:00 (GMT+8)" },',
      'brandGallery: { brandImage: "品牌图片" },',
    ],
  },
  en: {
    indent: '      ',
    keys: [
      'brand: { inquiry: "Inquire Now" },',
      'contactModal: { title: "Choose Contact Method", consulting: "Consulting", copied: "✓ Copied", copy: "Copy", open: "Open", call: "Call", workHours: "Hours: Mon-Sat 9:00-18:00 (GMT+8)" },',
      'brandGallery: { brandImage: "Brand Image" },',
    ],
  },
  th: {
    indent: '      ',
    keys: [
      'brand: { inquiry: "สอบถามเลย" },',
      'contactModal: { title: "เลือกวิธีติดต่อ", consulting: "สอบถาม", copied: "✓ คัดลอกแล้ว", copy: "คัดลอก", open: "เปิด", call: "โทร", workHours: "เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)" },',
      'brandGallery: { brandImage: "รูปภาพแบรนด์" },',
    ],
  },
  vi: {
    indent: '      ',
    keys: [
      'brand: { inquiry: "Hỏi ngay" },',
      'contactModal: { title: "Chọn phương thức liên hệ", consulting: "Tư vấn", copied: "✓ Đã sao chép", copy: "Sao chép", open: "Mở", call: "Gọi", workHours: "Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)" },',
      'brandGallery: { brandImage: "Hình ảnh thương hiệu" },',
    ],
  },
};

// Process in reverse order (highest line number first) so insertions don't shift earlier line numbers
var locOrder = ['vi', 'th', 'en', 'zh'];
var shift = 0;
locOrder.forEach(function(loc) {
  var homeClose = findHomeClose(loc, content);
  if (homeClose < 0) {
    console.log(loc + ': home close not found');
    return;
  }
  var indent = inserts[loc].indent;
  var insertText = '\n' + indent + inserts[loc].keys.join(',\n' + indent) + '\n' + indent;
  content = content.substring(0, homeClose) + insertText + content.substring(homeClose);
  console.log(loc + ': inserted at line ' + (content.substring(0, homeClose).split('\n').length) + ' (home close before char ' + homeClose + ')');
});

console.log('\nAfter:', content.split('\n').length, 'lines');

// Check for undefined
if (content.includes('undefined')) {
  console.log('WARNING: still contains undefined!');
}

// Check for orphaned commas
var bad = content.split('\n').filter(function(l) { return l.trim() === ','; });
if (bad.length > 0) console.log('WARNING: orphaned commas:', bad.length);

fs.writeFileSync('lib/i18n.ts', content, 'utf8');
console.log('Done!');
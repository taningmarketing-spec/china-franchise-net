// Fix i18n.ts by rewriting home sections properly
// Problem: after whyChooseUs, the script inserted new keys OUTSIDE the home object
// Solution: find the corrupted region (whyChooseUs → nav: {) and rewrite it correctly
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

var locOrder = ['vi', 'th', 'en', 'zh'];

var newHomeContent = {
  zh: [
    '    brand: { inquiry: "立即咨询加盟" },',
    '    contactModal: { title: "选择联系方式", consulting: "咨询", copied: "✓ 已复制", copy: "复制", open: "打开", call: "拨打", workHours: "工作时间：周一至周六 9:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "品牌图片" },',
  ],
  en: [
    '    brand: { inquiry: "Inquire Now" },',
    '    contactModal: { title: "Choose Contact Method", consulting: "Consulting", copied: "✓ Copied", copy: "Copy", open: "Open", call: "Call", workHours: "Hours: Mon-Sat 9:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "Brand Image" },',
  ],
  th: [
    '    brand: { inquiry: "สอบถามเลย" },',
    '    contactModal: { title: "เลือกวิธีติดต่อ", consulting: "สอบถาม", copied: "✓ คัดลอกแล้ว", copy: "คัดลอก", open: "เปิด", call: "โทร", workHours: "เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "รูปภาพแบรนด์" },',
  ],
  vi: [
    '    brand: { inquiry: "Hỏi ngay" },',
    '    contactModal: { title: "Chọn phương thức liên hệ", consulting: "Tư vấn", copied: "✓ Đã sao chép", copy: "Sao chép", open: "Mở", call: "Gọi", workHours: "Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "Hình ảnh thương hiệu" },',
  ],
};

locOrder.forEach(function(loc) {
  // Find whyChooseUs line (last key before the corrupted region)
  var whyIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('whyChooseUs:') && lines[i].trim().startsWith('whyChooseUs:')) {
      whyIdx = i;
    }
  }
  // Find nav: { line
  var navIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'nav: {' && lines[i].match(/^\s{4}nav: \{/)) {
      navIdx = i;
    }
  }
  
  if (whyIdx < 0 || navIdx < 0) {
    console.log(loc + ': whyIdx=' + whyIdx + ' navIdx=' + navIdx);
    return;
  }
  
  // Remove all lines between whyIdx+1 and navIdx-1 (the corrupted region)
  // Keep: line[whyIdx] (whyChooseUs), line[navIdx] (nav: {)
  var before = lines.slice(0, whyIdx + 1);
  var after = lines.slice(navIdx);
  
  // Insert: blank line, new keys at 4sp, blank line, closing "    },"
  var insertion = [''].concat(newHomeContent[loc]).concat(['', '    },', '']);
  
  lines = before.concat(insertion).concat(after);
  console.log(loc + ': rewrote home section (whyIdx=' + whyIdx + ' navIdx=' + navIdx + ')');
});

var newContent = lines.join('\n');
console.log('\nAfter:', newContent.split('\n').length, 'lines');

// Validate
var orphans = newContent.split('\n').filter(function(l) { return l.trim() === ','; });
console.log('Orphaned commas:', orphans.length);

// Check that home: { closes properly
var unclosed = newContent.split('\n').filter(function(l) {
  return l.match(/^\s+brand: \{/) || l.match(/^\s+contactModal: \{/) || l.match(/^\s+brandGallery: \{/);
});
console.log('New keys found:', unclosed.length);

fs.writeFileSync('lib/i18n.ts', newContent, 'utf8');
console.log('Done!');
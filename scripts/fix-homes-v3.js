// Precisely fix all 4 locale home sections by searching within each locale's bounds only
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Before:', lines.length, 'lines');

var newKeys = {
  zh: [
    '      brand: { inquiry: "立即咨询加盟" },',
    '      contactModal: { title: "选择联系方式", consulting: "咨询", copied: "✓ 已复制", copy: "复制", open: "打开", call: "拨打", workHours: "工作时间：周一至周六 9:00-18:00 (GMT+8)" },',
    '      brandGallery: { brandImage: "品牌图片" },',
  ],
  en: [
    '      brand: { inquiry: "Inquire Now" },',
    '      contactModal: { title: "Choose Contact Method", consulting: "Consulting", copied: "✓ Copied", copy: "Copy", open: "Open", call: "Call", workHours: "Hours: Mon-Sat 9:00-18:00 (GMT+8)" },',
    '      brandGallery: { brandImage: "Brand Image" },',
  ],
  th: [
    '      brand: { inquiry: "สอบถามเลย" },',
    '      contactModal: { title: "เลือกวิธีติดต่อ", consulting: "สอบถาม", copied: "✓ คัดลอกแล้ว", copy: "คัดลอก", open: "เปิด", call: "โทร", workHours: "เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)" },',
    '      brandGallery: { brandImage: "รูปภาพแบรนด์" },',
  ],
  vi: [
    '      brand: { inquiry: "Hỏi ngay" },',
    '      contactModal: { title: "Chọn phương thức liên hệ", consulting: "Tư vấn", copied: "✓ Đã sao chép", copy: "Sao chép", open: "Mở", call: "Gọi", workHours: "Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)" },',
    '      brandGallery: { brandImage: "Hình ảnh thương hiệu" },',
  ],
};

// Find each locale's section boundaries (translations.X: { to translations.X+1: {)
var localeBounds = {};
var locales = ['zh', 'en', 'th', 'vi'];
locales.forEach(function(loc) {
  var locStart = -1, locEnd = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === loc + ': {') { locStart = i; }
    else if (locStart >= 0 && locEnd < 0 && lines[i].match(/^\s{2}[a-z]{2}: \{/) && !lines[i].includes(loc + ': {')) {
      locEnd = i; break;
    }
  }
  if (locStart >= 0 && locEnd < 0) locEnd = lines.length;
  localeBounds[loc] = { start: locStart, end: locEnd };
  console.log(loc + ': section L' + (locStart+1) + '-' + (locEnd+1));
});

// For each locale, find whyChooseUs and nav: { within its bounds only
locales.slice().reverse().forEach(function(loc) {
  var b = localeBounds[loc];
  if (b.start < 0) { console.log(loc + ': no start'); return; }
  
  var whyIdx = -1;
  for (var i = b.start; i < b.end; i++) {
    if (lines[i].includes('whyChooseUs:')) { whyIdx = i; break; }
  }
  
  // Find the first nav: { at 4 spaces after whyIdx (within locale bounds)
  var navIdx = -1;
  for (var i = whyIdx + 1; i < b.end; i++) {
    if (lines[i].match(/^\s{4}nav: \{/) && !lines[i].includes('    nav: { home:')) {
      navIdx = i; break;
    }
  }
  
  if (whyIdx < 0 || navIdx < 0) {
    console.log(loc + ': WHY=' + whyIdx + ' NAV=' + navIdx + ' (b=' + b.start + '-' + b.end + ') - SKIP');
    return;
  }
  
  console.log('\n' + loc + ': whyIdx=' + whyIdx + ' navIdx=' + navIdx);
  
  // Remove lines whyIdx+1 to navIdx-1, insert newKeys[loc]
  var before = lines.slice(0, whyIdx + 1);  // include whyChooseUs
  var after = lines.slice(navIdx);           // include nav: {
  lines = before.concat(newKeys[loc]).concat(after);
  
  // Update locale bounds for next iteration (indices shifted)
  // All subsequent locales (earlier in file) are NOT affected by this insertion
  // because we process in reverse order
  console.log(loc + ': replaced lines ' + (whyIdx+2) + '-' + navIdx + ' with ' + newKeys[loc].length + ' keys');
});

var result = lines.join('\n');
console.log('\nAfter:', result.split('\n').length, 'lines');

// Verify structure
var checks = [
  ['zh', 'brand: { inquiry: "立即咨询加盟"', 6],
  ['en', 'brand: { inquiry: "Inquire Now"', 6],
  ['th', 'brand: { inquiry: "สอบถามเลย"', 6],
  ['vi', 'brand: { inquiry: "Hỏi ngay"', 6],
];
checks.forEach(function(c) {
  var idx = result.indexOf(c[1]);
  if (idx < 0) { console.log(c[0] + ' brand: NOT FOUND'); return; }
  var lineStart = result.lastIndexOf('\n', idx);
  var line = result.substring(lineStart, result.indexOf('\n', idx));
  var indent = (line.match(/^(\s*)/) || [''])[0].length;
  console.log(c[0] + ' brand: indent=' + indent + 'sp (expected ' + c[2] + ') ' + (indent === c[2] ? '✓' : '✗'));
});

fs.writeFileSync('lib/i18n.ts', result, 'utf8');
console.log('\nDone!');
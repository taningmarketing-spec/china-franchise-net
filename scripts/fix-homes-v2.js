// Full rebuild of i18n.ts home sections
// Rebuild each locale's home content from scratch with correct structure
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

// For each locale, find the home: { ... nav: { section and rebuild it correctly
// home section ends right before "nav: {"
var localeStarts = {};
var localeNames = ['zh', 'en', 'th', 'vi'];
localeNames.forEach(function(loc, idx) {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === loc + ': {') { localeStarts[loc] = i; break; }
  }
});

// Find home section boundaries for each locale
var localeHomes = {};
localeNames.forEach(function(loc) {
  var start = localeStarts[loc];
  if (start < 0) return;
  var homeStart = -1;
  for (var i = start; i < lines.length; i++) {
    if (lines[i].trim() === 'home: {') { homeStart = i; break; }
  }
  if (homeStart < 0) return;
  var navStart = -1;
  for (var i = homeStart + 1; i < lines.length; i++) {
    // nav: { at 4 spaces indent
    if (lines[i].match(/^\s{4}nav: \{/) && !lines[i].includes('    nav: { home:')) {
      navStart = i; break;
    }
    // Stop if we enter the next locale
    if (lines[i].match(/^\s{2}[a-z]{2}: \{/) && !lines[i].includes(loc)) break;
  }
  localeHomes[loc] = { start: homeStart, end: navStart };
  console.log(loc + ': home from L' + (homeStart+1) + ' to L' + (navStart+1));
});

// New home section content for each locale
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

// Process in REVERSE order so line numbers of earlier locales don't shift
localeNames.slice().reverse().forEach(function(loc) {
  var h = localeHomes[loc];
  if (!h || h.start < 0 || h.end < 0) { console.log(loc + ': skipped'); return; }
  
  // Keep: lines before home section (up to and including "home: {")
  var before = lines.slice(0, h.start + 1);
  // Keep: lines from nav onwards
  var after = lines.slice(h.end);
  
  // Replacement: content from home: { to just before nav: {
  // The old home content (from home: { after to just before nav) - we need the whyChooseUs + closing }
  // Find whyChooseUs line
  var whyLineIdx = -1;
  for (var i = h.start + 1; i < h.end; i++) {
    if (lines[i].includes('whyChooseUs:')) { whyLineIdx = i; break; }
  }
  
  if (whyLineIdx < 0) { console.log(loc + ': whyChooseUs not found'); return; }
  
  var keepBefore = lines.slice(h.start, whyLineIdx + 1);
  // Insert new keys at 4sp, then closing "    },"
  var insertion = [''].concat(newHomeContent[loc]).concat(['', '    },', '']);
  var afterNav = lines.slice(h.end);
  
  lines = before.concat(keepBefore.slice(1)).concat(insertion).concat(afterNav);
  console.log(loc + ': rebuilt home section (keep ' + (whyLineIdx - h.start) + ' lines, add ' + newHomeContent[loc].length + ' keys)');
});

var newContent = lines.join('\n');
console.log('\nAfter:', newContent.split('\n').length, 'lines');

var orphans = newContent.split('\n').filter(function(l) { return l.trim() === ','; });
console.log('Orphaned commas:', orphans.length);

fs.writeFileSync('lib/i18n.ts', newContent, 'utf8');
console.log('Done!');
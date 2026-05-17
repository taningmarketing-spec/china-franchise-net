// Fix indentation: new keys need 6sp (inside home), close brace needs 4sp
// Current (wrong): brand/contactModal/brandGallery at 4sp → outside home
// Correct: brand/contactModal/brandGallery at 6sp → inside home
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

var locales = ['zh', 'en', 'th', 'vi'];
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

// Process in reverse order
locales.slice().reverse().forEach(function(loc) {
  var whyIdx = -1, navIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('whyChooseUs:')) whyIdx = i;
    if (lines[i].trim() === 'nav: {' && (lines[i].match(/^\s{4}nav: \{/) !== null)) {
      navIdx = i; break;
    }
  }
  if (whyIdx < 0 || navIdx < 0) { console.log(loc + ': skip'); return; }
  
  // Lines to replace: whyIdx+1 to navIdx-1 (the 4sp "}," + 4sp new keys)
  // Replace with: 6sp new keys
  var before = lines.slice(0, whyIdx + 1);  // include whyChooseUs
  var after = lines.slice(navIdx);           // include nav: {
  lines = before.concat(newKeys[loc]).concat(after);
  console.log(loc + ': replaced with ' + newKeys[loc].length + ' keys at 6sp');
});

var result = lines.join('\n');
console.log('\nAfter:', result.split('\n').length, 'lines');
console.log('Orphaned commas:', result.split('\n').filter(function(l){return l.trim()==','}).length);

fs.writeFileSync('lib/i18n.ts', result, 'utf8');
console.log('Done!');
// Fix corrupted home sections by replacing the whyChooseUs→nav block for each locale
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Before:', lines.length, 'lines');

var newContent = {
  zh: [
    '    },',
    '    brand: { inquiry: "立即咨询加盟" },',
    '    contactModal: { title: "选择联系方式", consulting: "咨询", copied: "✓ 已复制", copy: "复制", open: "打开", call: "拨打", workHours: "工作时间：周一至周六 9:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "品牌图片" },',
  ],
  en: [
    '    },',
    '    brand: { inquiry: "Inquire Now" },',
    '    contactModal: { title: "Choose Contact Method", consulting: "Consulting", copied: "✓ Copied", copy: "Copy", open: "Open", call: "Call", workHours: "Hours: Mon-Sat 9:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "Brand Image" },',
  ],
  th: [
    '    },',
    '    brand: { inquiry: "สอบถามเลย" },',
    '    contactModal: { title: "เลือกวิธีติดต่อ", consulting: "สอบถาม", copied: "✓ คัดลอกแล้ว", copy: "คัดลอก", open: "เปิด", call: "โทร", workHours: "เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "รูปภาพแบรนด์" },',
  ],
  vi: [
    '    },',
    '    brand: { inquiry: "Hỏi ngay" },',
    '    contactModal: { title: "Chọn phương thức liên hệ", consulting: "Tư vấn", copied: "✓ Đã sao chép", copy: "Sao chép", open: "Mở", call: "Gọi", workHours: "Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)" },',
    '    brandGallery: { brandImage: "Hình ảnh thương hiệu" },',
  ],
};

// For each locale, remove lines [whyIdx+1, navIdx-1] and insert newContent
var locales = ['zh', 'en', 'th', 'vi'];
// Process in reverse order so indices don't shift
locales.slice().reverse().forEach(function(loc) {
  var whyIdx = -1, navIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes('whyChooseUs:')) whyIdx = i;
    if (lines[i].match(/^\s{4}nav: \{/) && !lines[i].includes('    nav: { home:')) {
      // Only for this locale - find nav after whyIdx for this locale
      // Find locale start
      var locStart = -1;
      for (var j = 0; j < lines.length; j++) {
        if (lines[j].trim() === loc + ': {') { locStart = j; break; }
      }
      if (i > locStart && whyIdx >= locStart && whyIdx < i) {
        navIdx = i;
        break;
      }
    }
  }
  
  if (whyIdx < 0 || navIdx < 0) {
    console.log(loc + ': skip (whyIdx=' + whyIdx + ' navIdx=' + navIdx + ')');
    return;
  }
  
  // Remove lines whyIdx+1 to navIdx-1 and replace with newContent
  var before = lines.slice(0, whyIdx + 1);
  var after = lines.slice(navIdx);
  lines = before.concat(newContent[loc]).concat(after);
  console.log(loc + ': replaced lines ' + (whyIdx+2) + '-' + navIdx + ' with ' + newContent[loc].length + ' new lines');
});

var result = lines.join('\n');
console.log('\nAfter:', result.split('\n').length, 'lines');

// Final checks
var orphans = result.split('\n').filter(function(l) { return l.trim() === ','; });
console.log('Orphaned commas:', orphans.length);

var doubles = result.split('\n').filter(function(l) { return l.trim().match(/},\s*,$/); });
console.log('Double commas:', doubles.length);

// Check vi keys have Vietnamese text
var viSection = result.substring(result.indexOf("vi: {"));
var viSectionLines = viSection.substring(0, 2000).split('\n');
console.log('\nVi brand:', viSectionLines.find(function(l){return l.includes('brand:')})); 
console.log('Vi workHours:', viSectionLines.find(function(l){return l.includes('workHours:')})); 

fs.writeFileSync('lib/i18n.ts', result, 'utf8');
console.log('\nDone!');
// Add missing i18n keys for component hardcoded strings
// Adds: home.brand (brand CTA), contactModal section, brandGallery section, academy.page / academy.of
var fs = require('fs');
var content = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = content.split('\n');

// Helper: find line index of a key in a specific locale block
// We find locale: { → home: { → then insert into home or into the right section
function findLocaleHome(localeName, localeContent) {
  var locStart = localeContent.indexOf(localeName + ': {');
  if (locStart < 0) return -1;
  var afterLoc = localeContent.substring(locStart);
  var homeStart = afterLoc.indexOf('home: {');
  return locStart + homeStart;
}

var locales = ['zh', 'en', 'th', 'vi'];

// New keys to add to home section
var homeKeys = {
  zh: {
    'brand': { 'inquiry': '立即咨询加盟' },
  },
  en: {
    'brand': { 'inquiry': 'Inquire Now' },
  },
  th: {
    'brand': { 'inquiry': 'สอบถามเลย' },
  },
  vi: {
    'brand': { 'inquiry': 'Hỏi ngay' },
  },
};

// Academy section: page/of keys
var academyKeys = {
  zh: { 'page': '页', 'of': '共' },
  en: { 'page': 'Page', 'of': 'of' },
  th: { 'page': 'หน้า', 'of': 'จาก' },
  vi: { 'page': 'Trang', 'of': 'trong' },
};

// contactModal section
var contactModalKeys = {
  zh: {
    'title': '选择联系方式',
    'consulting': '咨询',
    'copied': '✓ 已复制',
    'copy': '复制',
    'open': '打开',
    'call': '拨打',
    'workHours': '工作时间：周一至周六 9:00-18:00 (GMT+8)',
  },
  en: {
    'title': 'Choose Contact Method',
    'consulting': 'Consulting',
    'copied': '✓ Copied',
    'copy': 'Copy',
    'open': 'Open',
    'call': 'Call',
    'workHours': 'Hours: Mon-Sat 9:00-18:00 (GMT+8)',
  },
  th: {
    'title': 'เลือกวิธีติดต่อ',
    'consulting': 'สอบถาม',
    'copied': '✓ คัดลอกแล้ว',
    'copy': 'คัดลอก',
    'open': 'เปิด',
    'call': 'โทร',
    'workHours': 'เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)',
  },
  vi: {
    'title': 'Chọn phương thức liên hệ',
    'consulting': 'Tư vấn',
    'copied': '✓ Đã sao chép',
    'copy': 'Sao chép',
    'open': 'Mở',
    'call': 'Gọi',
    'workHours': 'Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)',
  },
};

// brandGallery section
var brandGalleryKeys = {
  zh: { 'brandImage': '品牌图片' },
  en: { 'brandImage': 'Brand Image' },
  th: { 'brandImage': 'รูปภาพแบรนด์' },
  vi: { 'brandImage': 'Hình ảnh thương hiệu' },
};

// academy.contactMethod keys (weChat, WhatsApp, phone, email)
var contactMethodKeys = {
  zh: {
    'weChat': '微信咨询',
    'whatsApp': 'WhatsApp 咨询',
    'phone': '电话咨询',
    'email': '邮件咨询',
  },
  en: {
    'weChat': 'WeChat',
    'whatsApp': 'WhatsApp',
    'phone': 'Phone',
    'email': 'Email',
  },
  th: {
    'weChat': 'สอบถามผ่าน WeChat',
    'whatsApp': 'สอบถาม WhatsApp',
    'phone': 'โทรศัพท์',
    'email': 'อีเมล',
  },
  vi: {
    'weChat': 'WeChat',
    'whatsApp': 'WhatsApp',
    'phone': 'Điện thoại',
    'email': 'Email',
  },
};

// Strategy: insert into the "home:" block of each locale
// Find "    }," that closes the home object and insert before it
locales.forEach(function(loc) {
  var locBlockStart = content.indexOf(loc + ': {');
  if (locBlockStart < 0) return;
  
  var afterLoc = content.substring(locBlockStart);
  var homeStart = afterLoc.indexOf('home: {');
  var homeBlockStart = locBlockStart + homeStart;
  
  // Find closing "    }," of home block
  // home block starts at homeBlockStart, find the first "    }," at depth 1 (6 spaces indent)
  var depth = 0;
  var homeEnd = -1;
  for (var i = homeBlockStart + 7; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        // Check if this } is followed by comma + newline
        var after = content.substring(i+1, i+4);
        homeEnd = i;
        break;
      }
    }
  }
  
  if (homeEnd < 0) {
    console.log(loc + ': could not find home close');
    return;
  }
  
  // Build insertion text
  var indent = '      ';
  var newLines = [];
  
  // Add home.brand
  if (homeKeys[loc]) {
    newLines.push(indent + 'brand: {');
    newLines.push(indent + '  inquiry: "' + homeKeys[loc].inquiry + '",');
    newLines.push(indent + '},');
  }
  
  // Add contactModal
  if (contactModalKeys[loc]) {
    newLines.push(indent + 'contactModal: {');
    Object.keys(contactModalKeys[loc]).forEach(function(k) {
      newLines.push(indent + '  ' + k + ': "' + contactModalKeys[loc][k] + '",');
    });
    newLines.push(indent + '},');
  }
  
  // Add brandGallery
  if (brandGalleryKeys[loc]) {
    newLines.push(indent + 'brandGallery: {');
    Object.keys(brandGalleryKeys[loc]).forEach(function(k) {
      newLines.push(indent + '  ' + k + ': "' + brandGalleryKeys[loc][k] + '",');
    });
    newLines.push(indent + '},');
  }
  
  // Now find academy section and add page/of
  // academy section is at indent 4 spaces within home
  var academyInsertPt = homeEnd;
  
  // Find academy: { in home block
  var homeContent = content.substring(homeBlockStart, homeEnd+1);
  var academyStart = homeContent.lastIndexOf('academy: {');
  if (academyStart >= 0) {
    // Find closing of academy
    var acadAbsStart = homeBlockStart + academyStart;
    var acadDepth = 0;
    var acadEnd = -1;
    for (var j = acadAbsStart + 9; j < content.length; j++) {
      if (content[j] === '{') acadDepth++;
      else if (content[j] === '}') {
        acadDepth--;
        if (acadDepth === 0) {
          acadEnd = j;
          break;
        }
      }
    }
    if (acadEnd >= 0) {
      // Add page/of to academy
      var acadIndent = '    ';
      var acadNewLines = [
        acadIndent + 'page: "' + academyKeys[loc].page + '",',
        acadIndent + 'of: "' + academyKeys[loc].of + '",',
      ];
      content = content.substring(0, acadEnd + 1) + '\n' + acadIndent + acadNewLines.join('\n') + '\n' + content.substring(acadEnd + 1);
      console.log(loc + ': academy.page/of added');
      // homeEnd is now shifted
      homeEnd += acadIndent.length + acadNewLines.join('\n').length + 2;
    }
  }
  
  if (newLines.length > 0) {
    content = content.substring(0, homeEnd) + ',\n' + indent + newLines.join(',\n' + indent) + '\n' + content.substring(homeEnd);
    console.log(loc + ': added ' + newLines.length + ' keys to home');
  } else {
    console.log(loc + ': no new keys to add');
  }
});

fs.writeFileSync('lib/i18n.ts', content, 'utf8');
console.log('\nDone! Total lines:', content.split('\n').length);

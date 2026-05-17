// Add extended contactModal keys to i18n.ts
var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');
var lines = c.split('\n');
console.log('Before:', lines.length, 'lines');

// Find contactModal: { in each locale and expand it
var locales = ['zh', 'en', 'th', 'vi'];
var expansions = {
  zh: {
    weChat: '微信咨询',
    whatsApp: 'WhatsApp 咨询',
    phone: '电话咨询',
    email: '邮件咨询',
    copied: '✓ 已复制',
    copy: '复制',
    open: '打开',
    call: '拨打',
    workHours: '工作时间：周一至周六 9:00-18:00 (GMT+8)',
    consulting: '咨询',
    subtitle: 'Choose Contact Method',
  },
  en: {
    weChat: 'WeChat',
    whatsApp: 'WhatsApp',
    phone: 'Phone',
    email: 'Email',
    copied: '✓ Copied',
    copy: 'Copy',
    open: 'Open',
    call: 'Call',
    workHours: 'Hours: Mon-Sat 9:00-18:00 (GMT+8)',
    consulting: 'Consulting',
    subtitle: 'Choose Contact Method',
  },
  th: {
    weChat: 'สอบถามผ่าน WeChat',
    whatsApp: 'สอบถาม WhatsApp',
    phone: 'โทรศัพท์',
    email: 'อีเมล',
    copied: '✓ คัดลอกแล้ว',
    copy: 'คัดลอก',
    open: 'เปิด',
    call: 'โทร',
    workHours: 'เวลาทำการ: จันทร์-เสาร์ 09:00-18:00 (GMT+8)',
    consulting: 'สอบถาม',
    subtitle: 'เลือกวิธีติดต่อ',
  },
  vi: {
    weChat: 'WeChat',
    whatsApp: 'WhatsApp',
    phone: 'Điện thoại',
    email: 'Email',
    copied: '✓ Đã sao chép',
    copy: 'Sao chép',
    open: 'Mở',
    call: 'Gọi',
    workHours: 'Giờ làm việc: Thứ 2-Thứ 7 09:00-18:00 (GMT+8)',
    consulting: 'Tư vấn',
    subtitle: 'Chọn phương thức liên hệ',
  },
};

// For each locale, find contactModal: { and expand it with new keys
locales.slice().reverse().forEach(function(loc) {
  var locStart = -1;
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim() === loc + ': {') { locStart = i; break; }
  }
  if (locStart < 0) return;
  
  var cmStart = -1;
  for (var i = locStart; i < lines.length; i++) {
    if (lines[i].trim().startsWith('contactModal: {')) { cmStart = i; break; }
  }
  if (cmStart < 0) { console.log(loc + ': contactModal not found'); return; }
  
  // Find closing brace of contactModal (6 spaces, "      },")
  var cmEnd = -1;
  for (var i = cmStart + 1; i < lines.length; i++) {
    if (lines[i].match(/^\s{6}\},/) && !lines[i].includes('contactModal')) { cmEnd = i; break; }
  }
  if (cmEnd < 0) { console.log(loc + ': contactModal close not found'); return; }
  
  // Build new contactModal content
  var exp = expansions[loc];
  var newKeys = [
    '      weChat: "' + exp.weChat + '",',
    '      whatsApp: "' + exp.whatsApp + '",',
    '      phone: "' + exp.phone + '",',
    '      email: "' + exp.email + '",',
    '      copied: "' + exp.copied + '",',
    '      copy: "' + exp.copy + '",',
    '      open: "' + exp.open + '",',
    '      call: "' + exp.call + '",',
    '      workHours: "' + exp.workHours + '",',
    '      consulting: "' + exp.consulting + '",',
    '      subtitle: "' + exp.subtitle + '",',
  ];
  
  // Replace lines cmStart to cmEnd with new content
  var before = lines.slice(0, cmStart);
  var after = lines.slice(cmEnd + 1);
  lines = before.concat(newKeys).concat(after);
  console.log(loc + ': expanded contactModal (replaced ' + (cmEnd - cmStart + 1) + ' lines with ' + newKeys.length + ' keys)');
});

var result = lines.join('\n');
console.log('\nAfter:', result.split('\n').length, 'lines');
fs.writeFileSync('lib/i18n.ts', result, 'utf8');
console.log('Done!');
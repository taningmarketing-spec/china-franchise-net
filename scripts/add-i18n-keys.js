var fs = require('fs');
var c = fs.readFileSync('lib/i18n.ts', 'utf8');

// Add contactModal keys to all locales
var contactModalKeys = {
  zh: {
    title: '选择联系方式',
    wechat: '微信咨询',
    whatsapp: 'WhatsApp 咨询',
    phone: '电话咨询',
    email: '邮件咨询',
    wechatId: '微信号',
    copy: '复制',
    copied: '已复制',
    open: '打开',
    dial: '拨打',
  },
  en: {
    title: 'Choose Contact Method',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    email: 'Email',
    wechatId: 'WeChat ID',
    copy: 'Copy',
    copied: 'Copied',
    open: 'Open',
    dial: 'Call',
  },
  th: {
    title: 'เลือกวิธีการติดต่อ',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'โทรศัพท์',
    email: 'อีเมล',
    wechatId: 'WeChat ID',
    copy: 'คัดลอก',
    copied: 'คัดลอกแล้ว',
    open: 'เปิด',
    dial: 'โทร',
  },
  vi: {
    title: 'Chọn phương thức liên hệ',
    wechat: 'WeChat',
    whatsapp: 'WhatsApp',
    phone: 'Điện thoại',
    email: 'Email',
    wechatId: 'WeChat ID',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    open: 'Mở',
    dial: 'Gọi',
  },
};

// Add brandCard.labels to all locales
var brandCardKeys = {
  zh: {
    storesChina: '中国门店',
    storesOverseas: '海外门店',
    fee: '加盟费',
    cost: '总成本',
    highlights: '项目亮点',
    inquiryNow: '立即咨询',
  },
  en: {
    storesChina: 'China Stores',
    storesOverseas: 'Overseas',
    fee: 'Franchise Fee',
    cost: 'Total Cost',
    highlights: 'Highlights',
    inquiryNow: 'Inquire Now',
  },
  th: {
    storesChina: 'ร้านในจีน',
    storesOverseas: 'ต่างประเทศ',
    fee: 'ค่าสิทธิ์',
    cost: 'ต้นทุนรวม',
    highlights: 'จุดเด่น',
    inquiryNow: 'สอบถาม',
  },
  vi: {
    storesChina: 'Cửa hàng Trung Quốc',
    storesOverseas: 'Quốc tế',
    fee: 'Phí nhượng quyền',
    cost: 'Tổng chi phí',
    highlights: 'Điểm nổi bật',
    inquiryNow: 'Tư vấn ngay',
  },
};

['zh','en','th','vi'].forEach(function(locale) {
  // contactModal
  var locIdx = c.indexOf(locale + ': {');
  if (locIdx === -1) return;
  var endBlock = c.indexOf('\n  },', locIdx);
  if (endBlock === -1 || endBlock > c.indexOf('home:', locIdx)) endBlock = c.indexOf('\n  },', locIdx + 10);

  // Find a good insertion point - after common section
  var afterCommon = c.indexOf('  },\n  //', locIdx);
  var insertAfter = afterCommon !== -1 ? afterCommon + 6 : endBlock;

  var cm = contactModalKeys[locale];
  var cmBlock = '\n    contactModal: {\n      title: \'' + cm.title + '\',\n      wechat: \'' + cm.wechat + '\',\n      whatsapp: \'' + cm.whatsapp + '\',\n      phone: \'' + cm.phone + '\',\n      email: \'' + cm.email + '\',\n      wechatId: \'' + cm.wechatId + '\',\n      copy: \'' + cm.copy + '\',\n      copied: \'' + cm.copied + '\',\n      open: \'' + cm.open + '\',\n      dial: \'' + cm.dial + '\',\n    },';

  var bc = brandCardKeys[locale];
  var bcBlock = '\n    brandCard: {\n      storesChina: \'' + bc.storesChina + '\',\n      storesOverseas: \'' + bc.storesOverseas + '\',\n      fee: \'' + bc.fee + '\',\n      cost: \'' + bc.cost + '\',\n      highlights: \'' + bc.highlights + '\',\n      inquiryNow: \'' + bc.inquiryNow + '\',\n    },';

  // Insert after common block
  c = c.substring(0, insertAfter) + cmBlock + bcBlock + c.substring(insertAfter);
  console.log('Added contactModal + brandCard for ' + locale);
});

fs.writeFileSync('lib/i18n.ts', c, 'utf8');
console.log('Done');
console.log('Has contactModal:', c.includes('contactModal:'));
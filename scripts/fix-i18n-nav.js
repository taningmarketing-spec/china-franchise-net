var fs = require('fs');

// Read current i18n.ts
var c = fs.readFileSync('lib/i18n.ts', 'utf8');

// Add nav.siteName and nav.enterAcademy to all locales
var locales = ['zh', 'en', 'th', 'vi'];
var siteNames = {
  zh: '中国国际加盟网',
  en: 'China Franchise Net',
  th: 'สถานี แฟรนไชส์จีน',
  vi: 'Mạng Nhượng Quyền Trung Quốc',
};
var enterAcademy = {
  zh: '进入学院主页',
  en: 'View Academy Home',
  th: 'เข้าสู่หน้าสถาบัน',
  vi: 'Xem trang Học viện',
};
var descs = {
  overseasDynamic: {
    zh: '追踪全球最新动态',
    en: 'Track global franchise trends',
    th: 'ติดตามเทรนด์แฟรนไชส์ทั่วโลก',
    vi: 'Theo dõi xu hướng nhượng quyền toàn cầu',
  },
  overseasCase: {
    zh: '成功案例深度解析',
    en: 'In-depth case analysis',
    th: 'วิเคราะห์กรณีศึกษาอย่างลึกซึ้ง',
    vi: 'Phân tích chuyên sâu case study',
  },
  overseasTips: {
    zh: '从零建立知识体系',
    en: 'Build knowledge from zero',
    th: 'สร้างความรู้จากศูนย์',
    vi: 'Xây dựng kiến thức từ đầu',
  },
  overseasPolicy: {
    zh: '各国法规政策解读',
    en: 'Policy & regulations guide',
    th: 'คู่มือนโยบายและกฎระเบียบ',
    vi: 'Hướng dẫn chính sách và quy định',
  },
};

locales.forEach(locale => {
  var prefix = locale + ':';
  var idx = c.indexOf(prefix);
  if (idx === -1) { console.log('Locale ' + locale + ' not found'); return; }
  // Find opening brace of nav
  var navIdx = c.indexOf('nav:', idx);
  if (navIdx === -1) { console.log('nav: not found for ' + locale); return; }
  var braceIdx = c.indexOf('{', navIdx + 4);
  // Find the closing brace of nav block
  var depth = 0, endNav = braceIdx;
  for (var i = braceIdx; i < c.length; i++) {
    if (c[i] === '{') depth++;
    else if (c[i] === '}') { depth--; if (depth === 0) { endNav = i; break; } }
  }
  var navBlock = c.substring(braceIdx + 1, endNav);
  
  // Check if keys already exist
  if (navBlock.includes('siteName')) {
    console.log(locale + ': siteName already exists, skipping');
  } else {
    // Find last key in nav block (by searching for closing comma pattern)
    // Insert before the closing brace of nav
    var insertBefore = c.indexOf('search:', idx);
    if (insertBefore === -1 || insertBefore > endNav) {
      // Try to find a good insertion point
      var navEnd = c.lastIndexOf('\n    },', endNav);
      var insertPos = navEnd + 6;
    } else {
      var insertPos = idx;
    }
    var newKeys = '      siteName: \'' + siteNames[locale] + '\',\n';
    c = c.substring(0, insertPos) + newKeys + c.substring(insertPos);
    console.log(locale + ': added siteName');
  }

  // Add enterAcademy
  var navBlockAfter = c.substring(idx, c.indexOf('home:', idx));
  if (!navBlockAfter.includes('enterAcademy')) {
    var searchIdx = c.indexOf('search:', idx);
    var insertPos2 = c.indexOf('\n    },', searchIdx);
    var newKey2 = '      enterAcademy: \'' + enterAcademy[locale] + '\',\n';
    c = c.substring(0, insertPos2 + 6) + newKey2 + c.substring(insertPos2 + 6);
    console.log(locale + ': added enterAcademy');
  } else {
    console.log(locale + ': enterAcademy already exists');
  }

  // Add desc keys in dropdownDescriptions
  var descKeys = ['overseasDynamicDesc', 'overseasCaseDesc', 'overseasTipsDesc', 'overseasPolicyDesc'];
  var descKeyNames = ['overseasDynamic', 'overseasCase', 'overseasTips', 'overseasPolicy'];
  descKeyNames.forEach(function(k, i) {
    if (c.substring(idx, idx + 3000).includes(descKeys[i])) {
      console.log(locale + ': ' + descKeys[i] + ' exists');
    } else {
      var searchIdx2 = c.indexOf('search:', idx);
      var insertPos3 = c.indexOf('\n    },', searchIdx2);
      var newKey3 = '      ' + descKeys[i] + ': \'' + descs[k][locale] + '\',\n';
      c = c.substring(0, insertPos3 + 6) + newKey3 + c.substring(insertPos3 + 6);
      console.log(locale + ': added ' + descKeys[i]);
    }
  });
});

fs.writeFileSync('lib/i18n.ts', c, 'utf8');
console.log('\nDone writing lib/i18n.ts');
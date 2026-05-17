// Script to add missing keys to i18n.ts
const fs = require('fs');

const newKeys = {
  brandCard: {
    storesChina: '中国门店',
    storesOverseas: '海外门店',
    fee: '加盟费',
    cost: '总成本',
    highlights: '项目亮点',
  },
};

const newKeysEn = {
  brandCard: {
    storesChina: 'CN Stores',
    storesOverseas: 'Overseas Stores',
    fee: 'Franchise Fee',
    cost: 'Total Cost',
    highlights: 'Highlights',
  },
};

const newKeysTh = {
  brandCard: {
    storesChina: 'สาขาจีน',
    storesOverseas: 'สาขาต่างประเทศ',
    fee: 'ค่าธรรมเนียม',
    cost: 'ต้นทุนรวม',
    highlights: 'จุดเด่น',
  },
};

const newKeysVi = {
  brandCard: {
    storesChina: 'Cửa hàng TQ',
    storesOverseas: 'Cửa hàng HQ',
    fee: 'Phí nhượng quyền',
    cost: 'Tổng chi phí',
    highlights: 'Điểm nổi bật',
  },
};

// Footer keys
const footerNew = {
  onlineInquiry: '在线留言',
  admin: '管理后台',
};

const footerNewEn = {
  onlineInquiry: 'Online Inquiry',
  admin: 'Admin Panel',
};

const footerNewTh = {
  onlineInquiry: 'สอบถามออนไลน์',
  admin: 'แผงควบคุม',
};

const footerNewVi = {
  onlineInquiry: 'Tin nhắn trực tuyến',
  admin: 'Quản trị',
};

// Nav keys
const navNew = {
  enterAcademy: '进入学院主页',
};

const navNewEn = {
  enterAcademy: 'Enter Academy',
};

const navNewTh = {
  enterAcademy: 'เข้าสู่หน้าสถาบัน',
};

const navNewVi = {
  enterAcademy: 'Vào trang Học viện',
};

// Read current file
let c = fs.readFileSync('lib/i18n.ts', 'utf8');
const lines = c.split('\n');

function findClosingBrace(lines, startLine) {
  let depth = 0;
  for (let i = startLine; i < lines.length; i++) {
    const t = lines[i].trim();
    if (t.includes('{')) depth += (t.match(/{/g) || []).length;
    if (t.includes('}')) depth -= (t.match(/}/g) || []).length;
    if (depth <= 0) return i;
  }
  return lines.length - 1;
}

// 1. Add brandCard to zh.home (find "viewAll" line and insert before it)
let zhHomeInsertLine = -1;
let inZhHome = false;
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (t === 'zh: {') inZhHome = true;
  if (inZhHome && t.startsWith('home: {')) {
    // find viewAll within home
    let homeDepth = 0;
    for (let j = i; j < lines.length; j++) {
      const h = lines[j].trim();
      if (h.includes('{')) homeDepth += (h.match(/{/g) || []).length;
      if (h.includes('}')) homeDepth -= (h.match(/}/g) || []).length;
      if (h.startsWith('viewAll:')) { zhHomeInsertLine = j; break; }
      if (homeDepth <= 0) break;
    }
    break;
  }
}

console.log('Found zh.home viewAll at line:', zhHomeInsertLine);
if (zhHomeInsertLine > 0) {
  const indent = lines[zhHomeInsertLine].match(/^\s*/)[0];
  const brandCardStr = `${indent}brandCard: {\n${indent}  storesChina: '中国门店',\n${indent}  storesOverseas: '海外门店',\n${indent}  fee: '加盟费',\n${indent}  cost: '总成本',\n${indent}  highlights: '项目亮点',\n${indent}},`;
  lines.splice(zhHomeInsertLine, 0, brandCardStr);
}

// After insert, need to adjust line numbers. Let's just rebuild by reading the modified content.
c = lines.join('\n');

// 2. Add to en.home
let enHomeInsertLine = -1;
let inEnHome = false;
let enHomeDepth = 0;
for (let i = 0; i < lines.length; i++) {
  const t = lines[i].trim();
  if (t === 'en: {') inEnHome = true;
  if (inEnHome && t.startsWith('home: {')) {
    let depth = 0;
    for (let j = i; j < lines.length; j++) {
      const h = lines[j].trim();
      if (h.includes('{')) depth += (h.match(/{/g) || []).length;
      if (h.includes('}')) depth -= (h.match(/}/g) || []).length;
      if (h.startsWith('viewAll:')) { enHomeInsertLine = j; break; }
      if (depth <= 0) break;
    }
    break;
  }
}

if (enHomeInsertLine > 0) {
  const indent = lines[enHomeInsertLine].match(/^\s*/)[0];
  const brandCardStr = `${indent}brandCard: {\n${indent}  storesChina: 'CN Stores',\n${indent}  storesOverseas: 'Overseas Stores',\n${indent}  fee: 'Franchise Fee',\n${indent}  cost: 'Total Cost',\n${indent}  highlights: 'Highlights',\n${indent}},`;
  lines.splice(enHomeInsertLine, 0, brandCardStr);
}

// Rebuild
c = lines.join('\n');
fs.writeFileSync('lib/i18n.ts', c, 'utf8');
console.log('Added brandCard to zh and en. File written.');
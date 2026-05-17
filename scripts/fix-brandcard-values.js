// Fix brandCard new key VALUES for all 4 locales
// Replace Chinese hardcoded values with proper translations
var fs = require('fs');
var content = fs.readFileSync('lib/i18n.ts', 'utf8');

// Replacement map: find "Chinese text" and replace with locale-specific translation
// Only inside brandCard sections (after "brandCard: {" and before "categories:")
var replacements = {
  zh: {
    'storesChina: "中国门店"': 'storesChina: "中国门店"',
    'storesOverseas: "海外门店"': 'storesOverseas: "海外门店"',
    'fee: "加盟费"': 'fee: "加盟费"',
    'cost: "总投资"': 'cost: "总投资"',
    'highlights: "项目亮点"': 'highlights: "项目亮点"',
  },
  en: {
    'storesChina: "中国门店"': 'storesChina: "Stores in China"',
    'storesOverseas: "海外门店"': 'storesOverseas: "Overseas Stores"',
    'fee: "加盟费"': 'fee: "Franchise Fee"',
    'cost: "总投资"': 'cost: "Total Cost"',
    'highlights: "项目亮点"': 'highlights: "Highlights"',
  },
  th: {
    'storesChina: "中国门店"': 'storesChina: "ร้านในจีน"',
    'storesOverseas: "海外门店"': 'storesOverseas: "ร้านต่างประเทศ"',
    'fee: "加盟费"': 'fee: "ค่าแฟรนไชส์"',
    'cost: "总投资"': 'cost: "ต้นทุนรวม"',
    'highlights: "项目亮点"': 'highlights: "จุดเด่น"',
  },
  vi: {
    'storesChina: "中国门店"': 'storesChina: "Cửa hàng Trung Quốc"',
    'storesOverseas: "海外门店"': 'storesOverseas: "Cửa hàng nước ngoài"',
    'fee: "加盟费"': 'fee: "Phí nhượng quyền"',
    'cost: "总投资"': 'cost: "Tổng chi phí"',
    'highlights: "项目亮点"': 'highlights: "Điểm nổi bật"',
  },
};

var locales = ['zh', 'en', 'th', 'vi'];
var newContent = content;

locales.forEach(function(loc) {
  var localeBlock = newContent;
  // Find this locale's block
  var locStart = newContent.indexOf(loc + ': {');
  if (locStart < 0) return;
  
  var afterLoc = newContent.substring(locStart);
  var homeStart = afterLoc.indexOf('home: {');
  if (homeStart < 0) return;
  
  var brandStart = afterLoc.indexOf('brandCard: {');
  if (brandStart < 0) return;
  
  // Find the brandCard section end: "categories:" key
  var catStart = afterLoc.indexOf('categories:');
  if (catStart < 0) return;
  
  // The brandCard section is between brandStart and catStart
  var brandCardStart = locStart + homeStart + brandStart;
  var brandCardEnd = locStart + homeStart + catStart;
  
  var beforeBrand = newContent.substring(0, brandCardStart);
  var brandSection = newContent.substring(brandCardStart, brandCardEnd);
  var afterBrand = newContent.substring(brandCardEnd);
  
  var updated = brandSection;
  Object.keys(replacements[loc]).forEach(function(from) {
    var to = replacements[loc][from];
    if (from !== to) {
      updated = updated.split(from).join(to);
      console.log(loc + ': ' + from + ' -> ' + to);
    }
  });
  
  newContent = beforeBrand + updated + afterBrand;
});

fs.writeFileSync('lib/i18n.ts', newContent, 'utf8');
console.log('\nDone!');

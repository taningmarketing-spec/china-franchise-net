var fs = require('fs');
var content = fs.readFileSync('lib/i18n.ts', 'utf8');
var adds = {
  zh: {after: 'stores: "门店",', add: '      storesChina: "中国门店",\n      storesOverseas: "海外门店",'},
  en: {after: 'stores: "Stores",', add: '      storesChina: "China Stores",\n      storesOverseas: "Overseas Stores",'},
  th: {after: 'stores: "ร้านค้า",', add: '      storesChina: "ร้านในจีน",\n      storesOverseas: "ร้านต่างประเทศ",'},
  vi: {after: 'stores: "Cửa hàng",', add: '      storesChina: "Cửa hàng Trung Quốc",\n      storesOverseas: "Cửa hàng Quốc tế",'}
};
for (var loc of ['zh','en','th','vi']) {
  var info = adds[loc];
  if (content.includes(info.after)) {
    content = content.replace(info.after, info.after + '\n' + info.add);
    console.log(loc + ': added');
  } else {
    console.log(loc + ': NOT FOUND - ' + info.after.substring(0,30));
  }
}
fs.writeFileSync('lib/i18n.ts', '\uFEFF' + content, 'utf8');
console.log('Updated, new length: ' + content.length);
var fs = require('fs');
// Fix BrandCard labels hardcoded object -> t().brandCard
var c = fs.readFileSync('components/front/BrandCard.tsx', 'utf8');
// Check if already using t
if (c.includes('(t.brandCard as any)')) {
  console.log('BrandCard already uses t.brandCard');
} else {
  // Find and replace the hardcoded labels object
  var old = "  const labels = {\n    zh: { storesChina: '中国门店', storesOverseas: '海外门店', fee: '加盟费', cost: '总成本' },\n    en: { storesChina: 'China Stores', storesOverseas: 'Overseas', fee: 'Franchise Fee', cost: 'Total Cost' },\n    th: { storesChina: 'ร้านในจีน', storesOverseas: 'ต่างประเทศ', fee: 'ค่าสิทธิ์', cost: 'ต้นทุนรวม' },\n    vi: { storesChina: 'Cửa hàng Trung Quốc', storesOverseas: 'Quốc tế', fee: 'Phí nhượng quyền', cost: 'Tổng chi phí' },\n  };";
  var rep = "  const labels = {\n    zh: { storesChina: (t.brandCard as any).storesChina, storesOverseas: (t.brandCard as any).storesOverseas, fee: (t.brandCard as any).fee, cost: (t.brandCard as any).cost },\n    en: { storesChina: (t.brandCard as any).storesChina, storesOverseas: (t.brandCard as any).storesOverseas, fee: (t.brandCard as any).fee, cost: (t.brandCard as any).cost },\n    th: { storesChina: (t.brandCard as any).storesChina, storesOverseas: (t.brandCard as any).storesOverseas, fee: (t.brandCard as any).fee, cost: (t.brandCard as any).cost },\n    vi: { storesChina: (t.brandCard as any).storesChina, storesOverseas: (t.brandCard as any).storesOverseas, fee: (t.brandCard as any).fee, cost: (t.brandCard as any).cost },\n  };";
  if (c.includes(old)) {
    c = c.replace(old, rep);
    console.log('BrandCard labels replaced');
  } else {
    console.log('BrandCard labels pattern not found, trying indexOf');
    var idx = c.indexOf("storesChina: '中国门店'");
    if (idx !== -1) {
      console.log('Found storesChina at idx', idx, 'context:', c.substring(idx-20, idx+20));
    }
  }
}
fs.writeFileSync('components/front/BrandCard.tsx', c, 'utf8');
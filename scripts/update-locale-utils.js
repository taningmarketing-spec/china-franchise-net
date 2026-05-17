const fs = require('fs');
const filePath = 'C:/Users/LEO/.qclaw/workspace/china-franchise-net/lib/locale-utils.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add brands to each locale
content = content.replace(
  "search: '搜索品牌 - 中国国际加盟网',",
  "search: '搜索品牌 - 中国国际加盟网',\n    brands: '品牌列表 - 中国国际加盟网',"
);
content = content.replace(
  "search: 'Search Brands - China Franchise Net',",
  "search: 'Search Brands - China Franchise Net',\n    brands: 'All Brands - China Franchise Net',"
);
content = content.replace(
  "search: 'ค้นหาแบรนด์ - China Franchise Net',",
  "search: 'ค้นหาแบรนด์ - China Franchise Net',\n    brands: 'รายการแบรนด์ - China Franchise Net',"
);
content = content.replace(
  "search: 'Tìm Kiếm Thương Hiệu - China Franchise Net',",
  "search: 'Tìm Kiếm Thương Hiệu - China Franchise Net',\n    brands: 'Tất Cả Thương Hiệu - China Franchise Net',"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated locale-utils.ts, size:', fs.statSync(filePath).size);

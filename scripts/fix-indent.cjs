const fs = require('fs');
let c = fs.readFileSync('lib/i18n.ts', 'utf8');

const reps = [
  ['  hotProjects: "热点项目",\n  newOverseasProjects: "新出海项目",\n  viewAll: "查看全部",\n  noHotProjects: "暂无热点项目",\n  noNewProjects: "暂无新出海项目",\n      categoryBrands:', '      hotProjects: "热点项目",\n      newOverseasProjects: "新出海项目",\n      viewAll: "查看全部",\n      noHotProjects: "暂无热点项目",\n      noNewProjects: "暂无新出海项目",\n      categoryBrands:'],
  ['  hotProjects: "Hot Projects",\n  newOverseasProjects: "New Overseas Projects",\n  viewAll: "View All",\n  noHotProjects: "No hot projects yet",\n  noNewProjects: "No new overseas projects yet",\n      categoryBrands:', '      hotProjects: "Hot Projects",\n      newOverseasProjects: "New Overseas Projects",\n      viewAll: "View All",\n      noHotProjects: "No hot projects yet",\n      noNewProjects: "No new overseas projects yet",\n      categoryBrands:'],
  ['  hotProjects: "โปรเจกต์ฮอต",\n  newOverseasProjects: "โปรเจกต์ต่างประเทศใหม่",\n  viewAll: "ดูทั้งหมด",\n  noHotProjects: "ยังไม่มีโปรเจกต์ฮอต",\n  noNewProjects: "ยังไม่มีโปรเจกต์ใหม่",\n      categoryBrands:', '      hotProjects: "โปรเจกต์ฮอต",\n      newOverseasProjects: "โปรเจกต์ต่างประเทศใหม่",\n      viewAll: "ดูทั้งหมด",\n      noHotProjects: "ยังไม่มีโปรเจกต์ฮอต",\n      noNewProjects: "ยังไม่มีโปรเจกต์ใหม่",\n      categoryBrands:'],
  ['  hotProjects: "Dự án nổi bật",\n  newOverseasProjects: "Dự án vượt biên mới",\n  viewAll: "Xem tất cả",\n  noHotProjects: "Chưa có dự án nổi bật",\n  noNewProjects: "Chưa có dự án mới",\n      categoryBrands:', '      hotProjects: "Dự án nổi bật",\n      newOverseasProjects: "Dự án vượt biên mới",\n      viewAll: "Xem tất cả",\n      noHotProjects: "Chưa có dự án nổi bật",\n      noNewProjects: "Chưa có dự án mới",\n      categoryBrands:'],
];

for (const [oldStr, newStr] of reps) {
  if (c.includes(oldStr)) {
    c = c.replace(oldStr, newStr);
    console.log('fixed: ' + oldStr.slice(0, 30));
  } else {
    console.log('NOT FOUND: ' + oldStr.slice(0, 30));
  }
}

fs.writeFileSync('lib/i18n.ts', c);
console.log('done');
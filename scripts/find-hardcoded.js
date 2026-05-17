var fs = require('fs');
var c = fs.readFileSync('components/front/LocaleClientLayout.tsx', 'utf8');
var lines = c.split('\n');
var hardcoded = [
  '中国国际加盟网', 'China Franchise Net', 'ChinaFranchise',
  '进入学院主页', 'View Academy Home',
  '追踪全球最新动态', 'Track global trends',
  '成功案例深度解析', 'Case study analysis',
  '从零建立知识体系', 'Build knowledge from scratch',
  '各国法规政策解读', 'Policy & regulations guide'
];
hardcoded.forEach(s => {
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].includes(s)) {
      console.log('Line ' + (i+1) + ': ' + lines[i].trim().substring(0, 120));
    }
  }
  console.log('---');
});
var fs = require('fs');
var c = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');
var pageLabelCount = c.split('pageLabel').length - 1;
var ofLabelCount = c.split('ofLabel').length - 1;
console.log('pageLabel refs:', pageLabelCount);
console.log('ofLabel refs:', ofLabelCount);

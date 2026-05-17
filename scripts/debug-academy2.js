var fs = require('fs');
var c = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');

// Find showing block
var showingIdx = c.indexOf('`显示');
console.log('Showing idx:', showingIdx);
console.log('Context:', JSON.stringify(c.substring(showingIdx, showingIdx + 120)));

// Find noArticles block
var noIdx = c.indexOf('暂无文章');
console.log('NoArticles idx:', noIdx);
console.log('Context:', JSON.stringify(c.substring(noIdx - 5, noIdx + 60)));

// Find perPage
var perIdx = c.indexOf("'每页'");
console.log('PerPage idx:', perIdx);
console.log('Context:', JSON.stringify(c.substring(perIdx - 5, perIdx + 50)));
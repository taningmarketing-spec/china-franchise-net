var fs = require('fs');
var c = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');

// Fix empty state - use gT()
var old = "locale === 'zh' ? '暂无文章，敬请期待...' : locale === 'en' ? 'No articles yet, stay tuned...' : 'Chưa có bài viết, hãy chờ...'";
if (c.includes(old)) {
  c = c.replace(old, "gT(locale, 'academy.noArticles')");
  console.log('Fixed empty state');
} else { console.log('Empty state not found'); }

// Fix page info - use gT()
var old2 = "`显示 ${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} 条，共 ${total} 条`";
if (c.includes(old2)) {
  c = c.replace(old2, "gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))");
  console.log('Fixed showing text');
} else { console.log('Showing text not found'); }

var old3 = "`Showing ${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} of ${total}`";
if (c.includes(old3)) {
  c = c.replace(old3, "gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))");
  console.log('Fixed showing text en');
} else { console.log('Showing text en not found'); }

var old4 = "`${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} / ${total}`";
if (c.includes(old4)) {
  c = c.replace(old4, "gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))");
  console.log('Fixed showing text vi');
} else { console.log('Showing text vi not found'); }

// Fix per page label
var old5 = "locale === 'zh' ? '每页' : locale === 'en' ? 'Per page' : 'Mỗi trang'";
if (c.includes(old5)) {
  c = c.replace(old5, "gT(locale, 'academy.perPage')");
  console.log('Fixed perPage label');
} else { console.log('perPage not found'); }

// Fix prev arrow to include text
var old6 = "<span className=\"text-primary group-hover:translate-x-1 transition-transform shrink-0 self-center\">←</span>";
if (c.includes(old6)) {
  c = c.replace(old6, "<span className=\"text-primary group-hover:translate-x-1 transition-transform shrink-0 self-center\">←</span>");
  console.log('Found prev arrow (no change needed)');
} else { console.log('Prev arrow not found'); }

fs.writeFileSync('components/front/AcademyArticleList.tsx', c, 'utf8');
var c2 = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');
console.log('gT uses:', (c2.match(/gT\(/g) || []).length);
console.log('Still has zh empty:', c2.includes('暂无文章'));
console.log('Done');
var fs = require('fs');
var c = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');

// Fix empty state
c = c.replace(
  "<p>{locale === 'zh' ? '暂无文章，敬请期待...' : locale === 'en' ? 'No articles yet, stay tuned...' : 'Chưa có bài viết, hãy chờ...'}</p>",
  "<p>{gT(locale, 'academy.noArticles')}</p>"
);

// Fix page info text
c = c.replace(
  "{locale === 'zh'\n              ? `显示 ${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} 条，共 ${total} 条`\n              : locale === 'en'\n              ? `Showing ${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} of ${total}`\n              : `${(currentPage - 1) * limit + 1}–${Math.min(currentPage * limit, total)} / ${total}`}",
  "gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))"
);

// Fix "每页" label
c = c.replace(
  "{locale === 'zh' ? '每页' : locale === 'en' ? 'Per page' : 'Mỗi trang'}",
  "gT(locale, 'academy.perPage')"
);

// Fix prev/next button text: currently just arrow, should have proper text
// ← button (Previous)
c = c.replace(
  "<span className=\"text-primary group-hover:translate-x-1 transition-transform shrink-0 self-center\">→</span>",
  "<span className=\"text-primary group-hover:translate-x-1 transition-transform shrink-0 self-center\">→</span>"
);

fs.writeFileSync('components/front/AcademyArticleList.tsx', c, 'utf8');
var c2 = fs.readFileSync('components/front/AcademyArticleList.tsx', 'utf8');
console.log('Has gT(empty):', c2.includes('gT(locale'));
console.log('Still has zh empty:', c2.includes('暂无文章'));
console.log('Done');
/**
 * 修复 update-articles-real-content.js 文件
 * 问题：else 块被第二份脚本内容覆盖
 */

const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'update-articles-real-content.js');
const outputFile = path.join(__dirname, 'update-articles-real-content-fixed.js');

const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

console.log(`原始文件: ${lines.length} 行`);

// 找到 else { 块的位置 (line 1984, 索引 1983)
const elseLineIndex = 1983; // 0-based index for line 1984

// 保留前 1985 行 (包括 else { 和空行)
const goodLines = lines.slice(0, elseLineIndex + 2); // lines 0-1985 (1986 lines)

// 添加正确的 else 块内容
const elseBlock = `        await prisma.article.create({
          data: {
            title,
            slug,
            excerpt,
            content: html,
            coverImage: COVER_IMAGES[article.category] || null,
            category: article.category,
            locale,
            status: 'published',
          },
        });
        created++;
        console.log('[新建] ' + slug + ': ' + title);
      }
    }
  }

  console.log('\\n完成！更新 ' + updated + ' 篇，新建 ' + created + ' 篇，总计 ' + (updated + created) + ' 条');
  await prisma.$disconnect();
};

main().catch(e => { console.error(e); process.exit(1); });
`;

// 组合新文件
const newContent = goodLines.join('\n') + elseBlock;

// 写入新文件
fs.writeFileSync(outputFile, newContent, 'utf8');

console.log(`修复后文件: ${newContent.split('\n').length} 行`);
console.log(`输出: ${outputFile}`);

// 验证括号匹配
const openBraces = (newContent.match(/\{/g) || []).length;
const closeBraces = (newContent.match(/\}/g) || []).length;
const openBrackets = (newContent.match(/\[/g) || []).length;
const closeBrackets = (newContent.match(/\]/g) || []).length;

console.log(`\n括号统计:`);
console.log(`  {: ${openBraces}, }: ${closeBraces}`);
console.log(`  [: ${openBrackets}, ]: ${closeBrackets}`);

if (openBraces === closeBraces && openBrackets === closeBrackets) {
  console.log('\n✅ 括号匹配正确！');
} else {
  console.log('\n❌ 括号不匹配！');
}

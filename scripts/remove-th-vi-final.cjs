// 删除 i18n.ts 中的 th: 和 vi: 翻译对象
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'i18n.ts');
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');
const result = [];
let skip = false;
let braceDepth = 0;
let inThOrVi = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 检测 th: 或 vi: 对象的开始
  if (line.match(/^\s+th:\s*\{/) || line.match(/^\s+vi:\s*\{/)) {
    skip = true;
    braceDepth = 0;
    inThOrVi = true;
    continue;  // 跳过这一行（th: { 或 vi: {）
  }
  
  if (skip) {
    // 统计这一行的花括号
    for (let j = 0; j < line.length; j++) {
      const ch = line[j];
      if (ch === '{') braceDepth++;
      if (ch === '}') braceDepth--;
    }
    
    // 如果括号深度回到0，说明找到了匹配的结束括号
    if (braceDepth === 0) {
      skip = false;
      inThOrVi = false;
      continue;  // 跳过结束括号这一行
    }
    
    // 在 skip 状态，跳过这一行
    continue;
  }
  
  // 不在 skip 状态，保留这一行
  result.push(line);
}

const newContent = result.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('✅ 已删除 th 和 vi 翻译对象');
console.log(`原文件: ${lines.length} 行`);
console.log(`新文件: ${result.length} 行`);

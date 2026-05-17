// 删除 i18n.ts 中的 th: 和 vi: 翻译对象
import { readFileSync, writeFileSync } from 'fs';

const filePath = new URL('../lib/i18n.ts', import.meta.url).pathname;
const content = readFileSync(filePath, 'utf-8');

// 删除 th: { ... } 对象（从 "  th: {" 到 "  }," 之前）
// 使用非贪婪匹配到第一个 "  },"（th对象的结束）
const thPattern = /\s+th:\s*\{[\s\S]*?\n  \},\n/;
const step1 = content.replace(thPattern, '\n');

// 删除 vi: { ... } 对象（从 "  vi: {" 到 "  }," 之前）
const viPattern = /\s+vi:\s*\{[\s\S]*?\n  \},\n?\}/;
const step2 = step1.replace(viPattern, '\n};

export');

// 修复可能的格式问题
const result = step2.replace(/export;\s*$/, 'export default translations;');

writeFileSync(filePath, result, 'utf-8');
console.log('✅ 已删除 th 和 vi 翻译对象');

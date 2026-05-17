# Task Summary — 2026-05-12 i18n brandCard 修复 & Dev Server 恢复

## 时间
2026-05-12 10:12 ~ 10:25 GMT+8

## 目标
修复 Categories 页面 500 错误（`home.brandCard` 翻译键缺失）

## 问题根因
- `lib/i18n.ts` 中 `zh.home` 和 `en.home` 缺少 `brandCard` section（含 franchiseFee/storesChina/storesOverseas/highlights 四个键）
- `BrandCard.tsx` 使用 `t.home.brandCard.xxx` 但 zh/en 无对应翻译 → 运行时 undefined → 500 错误
- th 和 vi 在之前的会话中已添加，只有 zh/en 遗漏

## 修复操作
1. 用 edit 工具在 `zh.home` 的 features 和 brandGallery 之间插入 brandCard section
2. 同样在 `en.home` 插入对应英文翻译
3. 验证：4 个 locale 全部包含 brandCard（行 57/193/329/465）
4. TypeScript 编译：0 errors
5. 重启 dev server（原进程已死，端口未监听）

## 结果
- ✅ TypeScript 0 errors
- ✅ 全部 7 个页面返回 200 OK（/zh, /en, /th, /vi, /zh/search, /zh/categories, /en/categories）
- ✅ Dev server 运行在 localhost:3000

## 教训
- Dev server 进程可能静默死亡，需用 netstat 验证端口监听而不只是检查进程存在
- PowerShell 单行 Node.js -e 命令对复杂脚本容易转义错误，改用 .js 文件更可靠

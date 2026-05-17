# 项目：中国国际加盟网 (china-franchise-net)

## 状态：✅ 已上线运行

## 启动时间
2026-05-06 15:52 GMT+8

## 访问地址
- **前台首页**: http://localhost:3000
- **后台管理**: http://localhost:3000/admin
- **管理员账号**: admin / 密码: admin123

## 项目路径
`C:\Users\LEO\.qclaw\workspace\china-franchise-net`

## 已完成功能
1. ✅ 前台页面（首页、分类页、品牌详情、搜索）
2. ✅ 后台管理（仪表盘、品牌CRUD、分类管理、采集日志、SEO设置）
3. ✅ 数据库 SQLite（prisma + dev.db）
4. ✅ 自动 sitemap.xml + robots.txt
5. ✅ 品牌详情页 JSON-LD 结构化数据（SEO）
6. ✅ 6 个种子品牌（挞柠、霸王茶姬、瑞幸、杨国福、西树泡芙、五条人糖水）
7. ✅ 每日采集脚本（scripts/daily-scrape.ts）

## 技术栈
Next.js 14 + Tailwind CSS + Prisma + SQLite

## 待配置
- 香港服务器部署（Nginx + PM2）
- 定时 cron（每天 06:00 自动采集）

## 已解决的环境问题
- esbuild EFTYPE 错误 → 重新安装 @next/swc-win32-x64-msvc
- Prisma Schema 关系字段缺失 → 移除单向 @relation 字段
- .bin 目录为空 → npx 调用成功
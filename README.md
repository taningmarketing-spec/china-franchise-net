# 中国国际加盟网 (China Franchise Net)

餐饮/茶饮/咖啡/小吃/甜品/糖水加盟品牌搜索平台

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

```bash
# 生成 Prisma 客户端
npm run db:generate

# 创建数据库表
npm run db:push

# 初始化种子数据（6个品牌 + 管理员账户）
npm run db:seed
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:3000 查看前台
管理后台: http://localhost:3000/admin
默认账号: `admin` / 密码: `admin123`

## 📁 项目结构

```
china-franchise-net/
├── app/
│   ├── (front)/           # 前台页面
│   │   ├── page.tsx       # 首页
│   │   ├── brand/[slug]/  # 品牌详情
│   │   ├── category/[slug]/ # 分类列表
│   │   └── search/         # 搜索结果
│   ├── (admin)/           # 后台管理
│   │   ├── dashboard/    # 仪表盘
│   │   ├── brands/       # 品牌管理
│   │   ├── categories/  # 分类管理
│   │   ├── scrape-logs/  # 采集日志
│   │   └── settings/     # SEO设置
│   ├── api/              # API 接口
│   ├── sitemap.ts        # 自动 sitemap
│   └── robots.ts         # robots.txt
├── components/           # 组件
├── lib/                  # 工具函数
├── prisma/               # 数据库 Schema
└── scripts/
    └── daily-scrape.ts   # 每日采集脚本
```

## ⏰ 定时采集

服务器上配置 cron job，每天 06:00 自动采集：

```bash
# Linux/Mac crontab
0 6 * * * cd /path/to/china-franchise-net && npm run scrape >> /var/log/scrape.log 2>&1

# Windows 任务计划程序
schtasks /create /tn "ChinaFranchise Scrape" /tr "npm run scrape" /sc daily /st 06:00
```

## 🔍 SEO 功能

- ✅ `/sitemap.xml` 自动生成（含所有品牌/分类页）
- ✅ `/robots.txt` 屏蔽后台/API
- ✅ 每页独立 `<title>` + `<meta description>`
- ✅ JSON-LD 结构化数据（Brand / Organization / WebSite）
- ✅ 图片 `alt` 属性 + 懒加载
- ✅ 语义化 HTML（H1/H2/article/section）

## 🎨 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14 | 前台 SSR + 后台 SPA |
| Tailwind CSS | 样式 |
| Prisma + SQLite | 数据库（可迁 MySQL） |
| TypeScript | 类型安全 |

## 📝 品牌数据字段

| 字段 | 说明 |
|------|------|
| name | 品牌名称 |
| slug | URL 友好标识（唯一） |
| industry | 行业（茶饮/咖啡/小吃/甜品/糖水/餐饮） |
| categorySlug | 分类 slug |
| franchiseFee | 加盟费 |
| totalCost | 总投资额 |
| storeCount | 门店数量 |
| contractYears | 加盟年限 |
| description | 品牌介绍 |
| process | 加盟流程（JSON 数组） |
| support | 加盟支持（JSON 数组） |
| images | 品牌图片（JSON 数组） |
| status | 状态（pending/published/rejected） |

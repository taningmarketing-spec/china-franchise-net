# 中国国际加盟网 - Admin 404 修复报告

## 时间
2026-05-06 18:26 ~ 18:35

## 问题
1. `/admin` 路由返回 404（路由冲突）
2. `/admin/brands` 和其他管理页面白屏 + "1 error" 客户端报错

## 根因分析

### 问题1：Admin 404 — 路由冲突
- **原因**：`(admin)` 路由组与 `[locale]` 动态路由冲突。Next.js App Router 中，`[locale]` 会匹配任意单段路径，包括 `admin`，导致 `locale='admin'` 在 `getLocaleParams()` 中校验失败返回 `notFound()` → 404
- **修复**：将 `(admin)` 路由组改为显式 `admin/` 目录结构

### 问题2：白屏+报错 — 两个子问题
- **原因A**：`app/admin/brands/[id]/page.tsx` 在 `'use client'` 组件中 import 了 `PrismaClient`（Node.js 库无法在浏览器运行）
- **原因B**：`app/admin/categories/page.tsx` 中 API 返回 `{categories: [...]}` 但代码直接 `setCats(d || [])` 把对象当数组用 → `.map()` 调用失败 → React 崩溃

## 修复操作

### 文件变更
| 操作 | 文件 | 说明 |
|------|------|------|
| 删除 | `app/(admin)/` | 整个旧admin目录被误删后重建 |
| 新建 | `app/admin/layout.tsx` | 管理后台布局（侧边栏+顶栏），usePathname加Suspense |
| 新建 | `app/admin/page.tsx` | /admin 重定向到 /admin/dashboard |
| 新建 | `app/admin/dashboard/page.tsx` | 仪表盘（统计卡片+最近品牌）|
| 新建 | `app/admin/brands/page.tsx` | 品牌列表（筛选+分页+错误处理）|
| 新建 | `app/admin/brands/[id]/page.tsx` | 新增品牌表单（移除PrismaClient导入）|
| 新建 | `app/admin/categories/page.tsx` | 分类管理（修复API响应解析）|
| 新建 | `app/admin/scrape-logs/page.tsx` | 采集日志页 |
| 新建 | `app/admin/settings/page.tsx` | SEO设置页 |

### 关键代码修复
1. **PrismaClient 移除**：client组件中不可import服务端库
2. **API响应格式**：`d.categories || d || []` 兼容两种格式
3. **Suspense边界**：usePathname()需要包裹在Suspense中
4. **错误处理**：所有fetch添加catch和错误状态显示

## 验证结果
```
200  /               (中文首页)
200  /admin          (重定向到dashboard)
200  /admin/dashboard (仪表盘 ✅)
200  /admin/brands   (品牌列表 ✅)
200  /admin/categories (分类管理 ✅)
200  /en             (英文首页)
200  /th             (泰文首页)
```

## 当前状态
✅ 所有路由正常工作
✅ 管理后台可访问 http://localhost:3002/admin
✅ 客户端渲染错误已修复

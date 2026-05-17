# 中国国际加盟网 - 联系弹窗 + 多语言功能

## 时间
2026-05-06 17:00 ~ 18:10

## 目标
1. "立即咨询加盟"按钮点击后弹出浮动框，包含微信、WhatsApp、电话、邮箱等多种联系方式
2. 增加英文、泰文、越南文多语言版本

## 完成内容

### 1. 联系弹窗 (ContactModal)
**文件**: `components/front/ContactModal.tsx`
- 点击"立即咨询加盟"弹出精美浮动弹窗
- 4种联系方式：
  - 🟢 **微信咨询** → 一键复制微信号 (ChinaFranchiseNet)
  - 🟢 **WhatsApp** → 跳转 WhatsApp (+86 138 0242 9520)
  - 🔵 **电话咨询** → 直接拨打 (+86 138 0242 9520)
  - 🟠 **邮件咨询** → 打开邮件客户端 (leo@weimanduo.cn)
- 显示品牌名称（在品牌详情页）
- 复制成功提示动画
- 中英双语界面文字
- 工作时间提示

### 2. 品牌详情页 CTA 按钮
**文件**: `components/front/BrandCTA.tsx`
- 替换原来的 `<a href="#inquiry">` 链接
- 点击弹出 ContactModal
- hover 放大 + click 缩小动效

### 3. 浮动联系按钮 (全局)
**文件**: `components/front/FloatingContact.tsx`
- 右下角固定浮动按钮 💬
- 所有页面可见
- 缓慢上下跳动动画吸引注意
- 点击弹出 ContactModal

### 4. 语言切换器
**文件**: `components/front/LanguageSwitcher.tsx`
- 导航栏右侧显示当前语言（国旗+名称）
- 下拉选择：🇨🇳中文 / 🇺🇸English / 🇹🇭ไทย / 🇻🇳Tiếng Việt
- 基于 URL path 的 locale 切换 (/en/, /th/, /vi/)
- 平滑过渡动画

### 5. 多语言翻译系统
**文件**: `lib/i18n.ts`
- 完整的4语言翻译（zh/en/th/vi）
- 覆盖：导航、首页、品牌卡片、品牌详情、咨询表单、联系弹窗、页脚、通用文案
- 类型安全的 Locale 类型定义
- 可扩展的翻译结构

### 6. 导航栏更新
**文件**: `app/(front)/layout.tsx`
- 添加 LanguageSwitcher 组件到导航栏右侧
- 添加 FloatingContact 全局浮动按钮
- 修复之前的 JSX 语法错误

### 7. 缺失页面补充
- `/contact` - 联系我们页面 ✅
- `/about` - 关于我们页面 ✅
- `/privacy` - 隐私政策页面 ✅
- `/terms` - 使用条款页面 ✅
- `/categories` - 全部分类页面 ✅

## 技术实现
- 所有交互组件使用 `'use client'` 指令
- ContactModal 使用 CSS 动画（fade-in + zoom-in）
- FloatingContact 使用 CSS keyframes bounce 动画
- LanguageSwitcher 使用 next/navigation 的 useRouter/usePathname
- i18n 系统基于简单的对象映射，无需额外依赖

## 当前状态
- 开发服务器运行在 http://localhost:3001
- 所有页面编译通过 (200 OK)
- 联系弹窗功能已就绪
- 多语言框架已搭建（路由级切换待完善具体页面渲染）

## 待完成
- [ ] 各页面的实际多语言渲染（根据 URL locale 参数切换显示文本）
- [ ] SEO hreflang 标签配置
- [ ] 多语言 sitemap 生成

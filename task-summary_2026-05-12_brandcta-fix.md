# Task Summary — 2026-05-12 BrandCTA 500 错误修复

## 时间
2026-05-12 10:28 GMT+8

## 目标
修复品牌详情页 500 错误

## 问题
```
TypeError: Cannot read properties of undefined (reading 'inquiry')
at BrandCTA (./components/front/BrandCTA.tsx:24:28)
→ t.home.brand.inquiry 不存在
```
BrandCTA.tsx 使用 `t.home.brand.inquiry` 但 i18n.ts 中 home 下无 brand 子对象（brand 是顶层 section）

## 修复
**文件**: `components/front/BrandCTA.tsx`
- 第24行: `t.home.brand.inquiry` → `t.inquiry.title`
- `t.inquiry.title` 在4个locale中都有定义: zh="立即咨询加盟", en="Inquire Now", th="สอบถามเรื่องแฟรนไชส์", vi="Liên hệ ngay"

## 验证
- /zh/brand/taning-lemon-tea: ✅ 200 (28920 bytes)
- /en/brand/taning-lemon-tea: ✅ 200 (29275 bytes)

## 同时确认的其他页面状态
首页/分类/搜索/学院/联系/franchise 等全部 200 OK

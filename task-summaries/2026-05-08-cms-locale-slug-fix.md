# CMS多语言Slug修复 - 2026-05-08

## 目标
修复中国国际加盟网6个前台页面的CMS多语言读取问题：非zh语言版本无法从CMS读取内容（fallback到硬编码）。

## 问题根因
CmsPage.slug 字段全局唯一（非按locale），非zh记录使用 `franchise-en`、`franchise-th`、`franchise-vi` 等后缀slug，但前台页面固定查询 `slug='franchise'`，导致只有zh能命中CMS。

## 修改的6个文件

每个文件修改2处（generateMetadata + 页面组件）：

| 文件 | 旧代码 | 新代码 |
|------|--------|--------|
| `app/[locale]/franchise/page.tsx` | `slug: 'franchise'` | `cmsSlug = locale==='zh' ? 'franchise' : \`franchise-${locale}\`` |
| `app/[locale]/franchisee/page.tsx` | `slug: 'franchisee'` | 同上模式，替换 franchisee |
| `app/[locale]/about/page.tsx` | `slug: 'about'` | 同上模式，替换 about |
| `app/[locale]/privacy/page.tsx` | `slug: 'privacy'` | 同上模式，替换 privacy |
| `app/[locale]/terms/page.tsx` | `slug: 'terms'` | 同上模式，替换 terms |
| `app/[locale]/contact/page.tsx` | `slug: 'contact'` | 同上模式，替换 contact |

## 验证
- TypeScript 编译通过（`npx tsc --noEmit`，无输出 = 无错误）
- contact 页面：额外修复了误删 `const c = hardcoded[locale]` 的问题

## 下一步
- 通过 admin/pages 管理界面为 en/th/vi 添加非zh版本的CMS内容
- 确认前台各语言版本能正确读取对应CMS内容

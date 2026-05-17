# Task Summary — 2026-05-12 首页 Hero "挞柠" 高亮文字问题

## 时间
2026-05-12 11:18 GMT+8

## 目标
用户反馈首页 Hero 区域标题显示 `cnfranchise.com挞柠`，"挞柠"两个字不应该出现。

## 根因
`app/[locale]/page.tsx` 第55行：
```jsx
{t.home.title} <span className="text-yellow-300">{t.home.highlight}</span>
```
`title` = "cnfranchise.com"，`highlight` = "挞柠"（4语言都是品牌名占位符）

## i18n.ts 中 home.highlight 当前值
| 语言 | 值 |
|------|-----|
| zh | 挞柠 |
| en | Tading |
| th | ทาดิง |
| vi | Tading |

## 状态
⏳ 等待用户确认：highlight 应该改成什么文字，还是直接去掉黄色 span

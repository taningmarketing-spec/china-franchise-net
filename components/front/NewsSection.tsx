import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import type { Article } from '@prisma/client';

const prisma = new PrismaClient();

// 服务端组件 - 获取资讯文章
export default async function NewsSection({ locale }: { locale: string }) {
  // 获取出海动态最新4篇
  const dynamicArticles = await prisma.article.findMany({
    where: {
      category: 'overseas-dynamic',
      locale: locale,
      status: 'published',
    },
    orderBy: [
      { sortOrder: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 4,
  });

  // 获取品牌出海案例最新4篇
  const caseArticles = await prisma.article.findMany({
    where: {
      category: 'overseas-case',
      locale: locale,
      status: 'published',
    },
    orderBy: [
      { sortOrder: 'desc' },
      { publishedAt: 'desc' },
      { createdAt: 'desc' },
    ],
    take: 4,
  });

  const t = translations[locale as keyof typeof translations];

  return (
    <section className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {locale === 'zh' ? '最新资讯' : locale === 'en' ? 'Latest News' : locale === 'th' ? 'ข่าวล่าสุด' : 'Tin tức mới nhất'}
          </h2>
          <Link
            href={`/${locale}/academy/overseas-dynamic`}
            className="text-sm text-primary font-medium hover:underline"
          >
            {t.home?.viewAll || 'View All'} →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 出海动态 */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {locale === 'zh' ? '出海动态' : locale === 'en' ? 'Overseas Updates' : locale === 'th' ? 'อัปเดตต่างประเทศ' : 'Cập nhật hải ngoại'}
            </h3>
            <div className="space-y-4">
              {dynamicArticles.length === 0 && (
                <p className="text-slate-400 text-sm">No articles yet.</p>
              )}
              {dynamicArticles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/academy/${article.category}/${article.slug}`}
                  className="group flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {article.featuredImg && (
                    <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={article.featuredImg}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : locale === 'th' ? 'th-TH' : 'vi-VN')
                        : new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 品牌出海案例 */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {locale === 'zh' ? '品牌出海案例' : locale === 'en' ? 'Overseas Cases' : locale === 'th' ? 'กรณีศึกษา' : 'Case study hải ngoại'}
            </h3>
            <div className="space-y-4">
              {caseArticles.length === 0 && (
                <p className="text-slate-400 text-sm">No articles yet.</p>
              )}
              {caseArticles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/academy/${article.category}/${article.slug}`}
                  className="group flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {article.featuredImg && (
                    <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={article.featuredImg}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : locale === 'th' ? 'th-TH' : 'vi-VN')
                        : new Date(article.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 查看全部按钮 */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/academy/overseas-dynamic`}
            className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {locale === 'zh' ? '查看全部资讯' : locale === 'en' ? 'View All News' : locale === 'th' ? 'ดูข่าวทั้งหมด' : 'Xem tất cả tin tức'}
          </Link>
        </div>
      </div>
    </section>
  );
}

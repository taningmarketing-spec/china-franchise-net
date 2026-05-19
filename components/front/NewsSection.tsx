import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import type { Article } from '@prisma/client';

const prisma = new PrismaClient();

// 分类默认占位图（按主题色生成渐变背景）
const CATEGORY_IMAGES: Record<string, string> = {
  'overseas-dynamic': '/images/news-dynamic.jpg',
  'overseas-case': '/images/news-case.jpg',
  'overseas-tips': '/images/news-tips.jpg',
  'overseas-policy': '/images/news-policy.jpg',
};

// 获取文章图片（没有则用分类默认图）
function getArticleImg(article: Article): string {
  return article.featuredImg || CATEGORY_IMAGES[article.category] || '/images/news-default.jpg';
}

// 服务端组件 - 获取资讯文章
export default async function NewsSection({ locale }: { locale: string }) {
  // 获取出海动态最新4篇（用于顶部热点图文框 + 左侧列表）
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

  // 热点咨询：取前4篇动态文章作为图文卡片
  const hotArticles = dynamicArticles.slice(0, 4);

  // i18n labels
  const sectionTitle = locale === 'zh' ? '最新资讯' : locale === 'en' ? 'Latest News' : 'Latest News';
  const dynamicLabel = locale === 'zh' ? '出海动态' : locale === 'en' ? 'Overseas Updates' : 'Overseas Updates';
  const caseLabel = locale === 'zh' ? '品牌出海案例' : locale === 'en' ? 'Overseas Cases' : 'Overseas Cases';
  const hotLabel = locale === 'zh' ? '热点咨询' : locale === 'en' ? 'Hot Topics' : 'Hot Topics';
  const viewAllText = t.home?.viewAll || (locale === 'zh' ? '查看全部' : 'View All');
  const viewAllNewsText = locale === 'zh' ? '查看全部资讯' : locale === 'en' ? 'View All News' : 'View All News';
  const noArticlesText = locale === 'zh' ? '暂无文章' : 'No articles yet.';

  return (
    <section className="bg-slate-50 py-14" id="news">
      <div className="max-w-7xl mx-auto px-4">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">{sectionTitle}</h2>
          <Link
            href={`/${locale}/academy/overseas-dynamic`}
            className="text-sm text-primary font-medium hover:underline"
          >
            {viewAllText} →
          </Link>
        </div>

        {/* ===== 热点咨询：4个图文框 ===== */}
        {hotArticles.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-slate-700 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {hotLabel}
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {hotArticles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/academy/${article.category}/${article.slug}`}
                  className="group block bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  {/* 图片区域 */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={getArticleImg(article)}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* 分类标签 */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-blue-500/90 text-white text-[11px] font-medium rounded-md backdrop-blur-sm">
                      {dynamicLabel}
                    </span>
                  </div>
                  {/* 标题 */}
                  <div className="p-3.5">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ===== 8条资讯列表（左右两栏） ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 出海动态 */}
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              {dynamicLabel}
            </h3>
            <div className="space-y-3">
              {dynamicArticles.length === 0 && (
                <p className="text-slate-400 text-sm">{noArticlesText}</p>
              )}
              {dynamicArticles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/academy/${article.category}/${article.slug}`}
                  className="group flex gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {/* 小图（始终显示） */}
                  <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={getArticleImg(article)}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')
                        : new Date(article.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
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
              {caseLabel}
            </h3>
            <div className="space-y-3">
              {caseArticles.length === 0 && (
                <p className="text-slate-400 text-sm">{noArticlesText}</p>
              )}
              {caseArticles.map((article: Article) => (
                <Link
                  key={article.id}
                  href={`/${locale}/academy/${article.category}/${article.slug}`}
                  className="group flex gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {/* 小图（始终显示） */}
                  <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-slate-100">
                    <Image
                      src={getArticleImg(article)}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {article.publishedAt
                        ? new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')
                        : new Date(article.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
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
            {viewAllNewsText}
          </Link>
        </div>
      </div>
    </section>
  );
}

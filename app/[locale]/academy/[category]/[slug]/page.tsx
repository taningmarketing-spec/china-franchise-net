import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/front/ShareButton';

const catNames: Record<string, Record<string, string>> = {
  'overseas-dynamic': { zh: '海外加盟动态', en: 'Overseas Franchise Trends' },
  'overseas-case': { zh: '品牌出海案例', en: 'Brand Expansion Cases' },
  'overseas-tips': { zh: '海外加盟常识', en: 'Franchise Knowledge' },
  'overseas-policy': { zh: '海外特许政策', en: 'Franchise Policies' },
};

export async function generateMetadata({ params }: { params: { locale: string; category: string; slug: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { title: true, seoTitle: true, seoDesc: true },
  });
  if (!article) return { title: 'Article Not Found' };
  return {
    title: (article.seoTitle || article.title) + (locale === 'zh' ? ' - 海外加盟学院' : ' - Overseas Franchise Academy'),
    description: article.seoDesc || undefined,
  };
}

export default async function AcademyCategoryArticlePage({ params }: { params: { locale: string; category: string; slug: string } }) {
  const locale = getLocaleParams({ params });
  const { category, slug } = params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || article.status !== 'published') {
    notFound();
  }

  // 增加浏览量
  await prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  });

  const categoryName = catNames[article.category]?.[locale] || catNames[article.category]?.zh || article.category;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Article Header */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href={`/${locale}/academy`} className="hover:text-primary">{locale === 'zh' ? '海外加盟学院' : 'Overseas Franchise Academy'}</Link>
            <span>/</span>
            <Link href={`/${locale}/academy/${article.category}`} className="hover:text-primary">{categoryName}</Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{article.title}</h1>
          {article.excerpt && (
            <p className="text-slate-600 mb-4 text-lg">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {article.author && <span>✍️ {article.author}</span>}
            {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}</span>}
            <span>👁 {(article.viewCount + 1).toLocaleString()}</span>
            <ShareButton
              locale={locale}
              url={`https://cnfranchise.com/${locale}/academy/${article.category}/${article.slug}`}
              title={article.title}
            />
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImg && (
        <section className="max-w-6xl mx-auto px-4 py-4">
          <img src={article.featuredImg} alt={article.title} className="w-full rounded-xl" />
        </section>
      )}

      {/* Article Content */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <article
            className="bg-white rounded-2xl p-6 md:p-10 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href={`/${locale}/academy/${article.category}`}
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              ← {locale === 'zh' ? '返回列表' : 'Back to List'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { getLocaleParams } from '@/lib/locale-utils';
import { translations } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShareButton from '@/components/front/ShareButton';

const catNames: Record<string, Record<string, string>> = {
  'overseas-dynamic': { zh: '海外加盟动态', en: 'Overseas Franchise Trends', th: 'Xu hướng nhượng quyền', vi: 'Xu hướng nhượng quyền' },
  'overseas-case': { zh: '品牌出海案例', en: 'Brand Expansion Cases', th: 'Case thương hiệu', vi: 'Case thương hiệu' },
  'overseas-tips': { zh: '海外加盟常识', en: 'Franchise Knowledge', th: 'Kiến thức nhượng quyền', vi: 'Kiến thức nhượng quyền' },
  'overseas-policy': { zh: '海外特许政策', en: 'Franchise Policies', th: 'Chính sách nhượng quyền', vi: 'Chính sách nhượng quyền' },
};

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { title: true, seoTitle: true, seoDesc: true },
  });
  if (!article) return { title: 'Article Not Found' };
  return {
    title: (article.seoTitle || article.title) + ' - 海外加盟学院',
    description: article.seoDesc || undefined,
  };
}

export default async function AcademyArticlePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = getLocaleParams({ params });
  const { slug } = params;

  // 从数据库读取文章
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
            <Link href={`/${locale}/academy`} className="hover:text-primary">海外加盟学院</Link>
            <span>/</span>
            <Link href={`/${locale}/academy/${article.category}`} className="hover:text-primary">{categoryName}</Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{article.title}</h1>
          {article.excerpt && (
            <p className="text-slate-600 mb-4 text-lg">{article.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {article.author && <span>✍️ {article.author}</span>}
            {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : locale === 'th' ? 'th-TH' : 'vi-VN')}</span>}
            <span>👁 {(article.viewCount + 1).toLocaleString()}</span>
            <ShareButton
              locale={locale}
              url={`https://cnfranchise.com/${locale}/academy/article/${article.slug}`}
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
              ← 返回{categoryName}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

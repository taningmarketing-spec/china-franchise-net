import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

// Generate static params for all published pages
export async function generateStaticParams() {
  const pages = await prisma.cmsPage.findMany({
    where: { status: 'published' },
    select: { slug: true, locale: true },
  });
  return pages.map(p => ({ slug: p.slug, locale: p.locale }));
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const page = await prisma.cmsPage.findFirst({
    where: { slug: params.slug, locale, status: 'published' },
  });

  if (!page) return { title: '页面未找到' };

  return {
    title: `${page.title} - cnfranchise.com`,
    description: page.seoDesc || page.title,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDesc || '',
      images: page.featuredImg ? [page.featuredImg] : [],
    },
  };
}

export default async function CmsPageView({ params }: { params: { locale: string; slug: string } }) {
  const locale = getLocaleParams({ params });
  const page = await prisma.cmsPage.findFirst({
    where: { slug: params.slug, locale },
  });

  if (!page) {
    // Show a friendly not-found for CMS pages
    return (
      <div className="page-enter">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">页面未找到</h1>
          <p className="text-slate-500 mb-6">您访问的页面不存在或已被删除</p>
          <Link href="/" className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  // If page is draft and not in admin mode, show placeholder
  if (page.status === 'draft') {
    return (
      <div className="page-enter">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3">{page.title}</h1>
          <p className="text-slate-500 mb-6">此页面仍在编辑中，尚未发布</p>
          <Link href="/" className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
            ← 返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* 封面图 */}
      {page.featuredImg && (
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
          <img src={page.featuredImg} alt={page.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 pb-8 w-full">
              <nav className="flex items-center gap-2 text-sm text-blue-100 mb-3">
                <Link href="/" className="hover:text-white transition-colors">首页</Link>
                <span>/</span>
                <span className="text-white font-medium">{page.title}</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{page.title}</h1>
            </div>
          </div>
        </div>
      )}

      {/* 内容区 */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {!page.featuredImg && (
          <>
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-primary">首页</Link>
              <span>/</span>
              <span className="text-slate-800 font-medium">{page.title}</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-slate-800 mb-8">{page.title}</h1>
          </>
        )}

        {/* HTML Content */}
        <article
          className="cms-content prose prose-lg max-w-none
            prose-headings:font-extrabold prose-headings:text-slate-800
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-800
            prose-ul:my-4 prose-li:my-1.5 prose-li:marker:text-primary
            prose-ol:my-4
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
            prose-hr:border-slate-200"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}

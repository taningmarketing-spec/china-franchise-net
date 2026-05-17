'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
function gT(locale: string, key: string): string {
  const keys = key.split('.');
  let v: any = translations[locale as Locale];
  for (const k of keys) v = v?.[k];
  return (v as string) ?? key;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImg: string | null;
  publishedAt: Date | null;
  viewCount: number | null;
}

interface Props {
  articles: Article[];
  locale: string;
  category: string;
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  baseUrl: string;
}

export default function AcademyArticleList({
  articles,
  locale,
  category,
  currentPage,
  totalPages,
  total,
  limit,
  baseUrl,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const localeMap: Record<string, string> = {
    zh: 'zh-CN',
    en: 'en-US',
    th: 'th-TH',
    vi: 'vi-VN',
  };

  const fmtDate = (d: Date | null) =>
    d ? new Date(d).toLocaleDateString(localeMap[locale] || 'zh-CN', { year: 'numeric', month: 'short', day: 'numeric' }) : '';



  function buildUrl(page: number, newLimit?: number) {
    const url = new URL(baseUrl, 'http://x');
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', String(newLimit ?? limit));
    return url.pathname + url.search;
  }

  function handleLimitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLimit = Number(e.target.value);
    startTransition(() => {
      router.push(buildUrl(1, newLimit));
    });
  }

  // Build page numbers with ellipsis
  function getPageNumbers() {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }

  const placeholderByCategory: Record<string, { emoji: string; color: string }> = {
    'overseas-dynamic': { emoji: '📰', color: '#1a56db' },
    'overseas-case': { emoji: '🏆', color: '#10b981' },
    'overseas-tips': { emoji: '💡', color: '#8b5cf6' },
    'overseas-policy': { emoji: '📋', color: '#f59e0b' },
  };
  const placeholder = placeholderByCategory[category] || { emoji: '📄', color: '#6b7280' };

  return (
    <div>
      {/* Article List */}
      <div className="space-y-4 mb-8">
        {articles.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <div className="text-4xl mb-3">📝</div>
            <p>{gT(locale, 'academy.noArticles')}</p>
          </div>
        ) : (
          articles.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/academy/article/${article.slug}`}
              className="flex items-start gap-4 bg-slate-50 rounded-2xl p-4 hover:bg-white hover:shadow-md transition-all group"
            >
              {/* Cover Image */}
              <div className="w-64 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-100 flex items-center justify-center">
                {article.featuredImg ? (
                  <img
                    src={article.featuredImg}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-2xl"
                    style={{ background: `${placeholder.color}15` }}
                  >
                    {placeholder.emoji}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors mb-1 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-sm text-slate-500 mb-2 line-clamp-2">{article.excerpt}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  {article.publishedAt && (
                    <span>{fmtDate(article.publishedAt)}</span>
                  )}
                  <span>👁 {article.viewCount || 0}</span>
                </div>
              </div>

              {/* Arrow */}
              <span className="text-primary group-hover:translate-x-1 transition-transform shrink-0 self-center">→</span>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-slate-100">
          {/* Page info */}
          <div className="text-sm text-slate-500">
            {locale === 'zh'
              ? gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))
              : locale === 'en'
              ? gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))
              : gT(locale, 'academy.showing').replace('{from}', String((currentPage - 1) * limit + 1)).replace('{to}', String(Math.min(currentPage * limit, total))).replace('{total}', String(total))}
          </div>

          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">
              {gT(locale, 'academy.perPage')}
            </span>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="border border-slate-200 rounded-lg px-2 py-1 text-sm text-slate-700 bg-white hover:border-primary focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {/* Previous */}
            <Link
              href={buildUrl(currentPage - 1)}
              className={`px-3 py-1.5 rounded-lg text-sm border border-slate-200 transition-colors ${
                currentPage <= 1
                  ? 'text-slate-300 pointer-events-none'
                  : 'text-slate-600 hover:bg-slate-50 hover:border-primary'
              }`}
            >
              ←
            </Link>

            {getPageNumbers().map((p, i) =>
              p === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-sm text-slate-400">…</span>
              ) : (
                <Link
                  key={p}
                  href={buildUrl(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm border transition-colors ${
                    p === currentPage
                      ? 'bg-primary text-white border-primary'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary'
                  }`}
                >
                  {p}
                </Link>
              )
            )}

            {/* Next */}
            <Link
              href={buildUrl(currentPage + 1)}
              className={`px-3 py-1.5 rounded-lg text-sm border border-slate-200 transition-colors ${
                currentPage >= totalPages
                  ? 'text-slate-300 pointer-events-none'
                  : 'text-slate-600 hover:bg-slate-50 hover:border-primary'
              }`}
            >
              →
            </Link>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isPending && (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

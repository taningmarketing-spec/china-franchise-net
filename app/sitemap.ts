import { MetadataRoute } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const baseUrl = process.env.SITE_URL || 'https://www.cnfranchise.com';
const supportedLocales = ['zh', 'en', 'th', 'vi'];
const localePriority: Record<string, number> = { zh: 1.0, en: 0.8, th: 0.6, vi: 0.6 };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all published brands
  const brands = await prisma.brand.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true },
  });

  // Get all published articles
  const articles = await prisma.article.findMany({
    where: { status: 'published' },
    select: { slug: true, updatedAt: true, category: true },
  });

  // Get all categories
  const categories = await prisma.category.findMany({
    select: { slug: true, createdAt: true },
  });

  const staticPages: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  for (const locale of supportedLocales) {
    staticPages.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: localePriority[locale],
    });
  }

  // Core CMS pages for each locale
  const coreSlugs = ['franchise', 'franchisee', 'about', 'privacy', 'terms', 'contact'];
  for (const locale of supportedLocales) {
    for (const slug of coreSlugs) {
      staticPages.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: localePriority[locale] * 0.7,
      });
    }
  }

  // Category pages for each locale
      const categoryPages: MetadataRoute.Sitemap = [];
  for (const locale of supportedLocales) {
    for (const cat of categories) {
      categoryPages.push({
        url: `${baseUrl}/${locale}/category/${cat.slug}`,
        lastModified: cat.createdAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: localePriority[locale] * 0.8,
      });
    }
  }

  // Brand detail pages for each locale
  const brandPages: MetadataRoute.Sitemap = [];
  for (const locale of supportedLocales) {
    for (const brand of brands) {
      brandPages.push({
        url: `${baseUrl}/${locale}/brand/${brand.slug}`,
        lastModified: brand.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: localePriority[locale] * 0.7,
      });
    }
  }

  // Academy article pages for each locale
  const articlePages: MetadataRoute.Sitemap = [];
  for (const locale of supportedLocales) {
    for (const article of articles) {
      articlePages.push({
        url: `${baseUrl}/${locale}/academy/${article.category || 'general'}/${article.slug}`,
        lastModified: article.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: localePriority[locale] * 0.5,
      });
    }
  }

  return [...staticPages, ...categoryPages, ...brandPages, ...articlePages];
}

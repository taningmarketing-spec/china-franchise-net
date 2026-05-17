import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: '全部分类 - cnfranchise.com',
  description: '浏览所有加盟品牌分类，找到您感兴趣的行业',
};

const CATEGORIES = [
  { name: '茶饮', slug: 'chayin', icon: '🍵', desc: '奶茶、柠檬茶、水果茶等茶饮品牌加盟', color: '#10b981' },
  { name: '咖啡', slug: 'kafei', icon: '☕', desc: '精品咖啡、连锁咖啡品牌加盟', color: '#8b5cf6' },
  { name: '小吃', slug: 'xiaochi', icon: '🍢', desc: '炸鸡、卤味、烧烤、麻辣烫等小吃品牌', color: '#f97316' },
  { name: '甜品', slug: 'tianpin', icon: '🍰', desc: '蛋糕、泡芙、点心等甜品品牌', color: '#ec4899' },
  { name: '糖水', slug: 'tangshui', icon: '🍮', desc: '广式糖水、甜汤等品牌', color: '#f59e0b' },
  { name: '餐饮', slug: 'canyin', icon: '🍜', desc: '快餐、火锅、麻辣烫等餐饮品牌', color: '#ef4444' },
  { name: '民生生意', slug: 'minsheng', icon: '🏪', desc: '便利店、超市等民生相关项目', color: '#3b82f6' },
  { name: '高潜力', slug: 'gaoqianli', icon: '🚀', desc: '新兴品牌，增长迅速', color: '#06b6d4' },
];

export default async function CategoriesPage() {
  const categoryCounts = await prisma.brand.groupBy({
    by: ['categorySlug'],
    where: { status: 'published' },
    _count: true,
  });

  const countMap = Object.fromEntries(categoryCounts.map(c => [c.categorySlug, c._count]));

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4">全部分类</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            浏览所有加盟品牌分类，找到最适合您的创业项目
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-card transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {countMap[cat.slug] || 0} 个品牌
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-4 flex items-center text-sm text-primary font-medium">
                查看全部
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

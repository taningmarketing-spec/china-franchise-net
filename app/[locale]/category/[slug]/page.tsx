import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { getLocaleParams } from '@/lib/locale-utils';
import BrandCard from '@/components/front/BrandCard';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

const DEFAULT_ICONS: Record<string, { name: string; desc: string; icon: string }> = {
  zh: { name: '未分类', desc: '暂无描述', icon: '🏪' },
};

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const locale = getLocaleParams({ params });
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } });
  return { title: `${cat?.name || params.slug} - cnfranchise.com` };
}

export default async function CategoryPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = getLocaleParams({ params });
  const cat = await prisma.category.findUnique({ where: { slug: params.slug } });
  const info = {
    name: cat?.name || (DEFAULT_ICONS.zh.name),
    desc: cat?.desc || '',
    icon: cat?.icon || '🏪',
  };

  const brands = await prisma.brand.findMany({
    where: { categorySlug: params.slug, status: 'published' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <span className="text-5xl mb-3 block">{info.icon}</span>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{info.name}</h1>
          <p className="text-slate-500">{info.desc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {brands.map(brand => <BrandCard key={brand.id} brand={brand} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="text-5xl mb-4">{info.icon}</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">{locale === 'zh' ? '该分类暂无品牌' : locale === 'en' ? 'No brands in this category yet' : locale === 'th' ? 'ยังไม่มีแบรนด์ในหมวดหมู่นี้' : 'Chưa có thương hiệu trong danh mục này'}</h3>
            <p className="text-slate-400 text-sm">{locale === 'zh' ? '每天自动采集新品牌，敬请期待' : locale === 'en' ? 'New brands are added daily' : locale === 'th' ? 'แบรนด์ใหม่จะถูกเพิ่มทุกวัน' : 'Thương hiệu mới được thêm mỗi ngày'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

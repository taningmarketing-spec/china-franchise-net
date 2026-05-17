import Link from 'next/link';
import { PrismaClient, Prisma } from '@prisma/client';
import BrandCard from '@/components/front/BrandCard';
import type { Metadata } from 'next';

const prisma = new PrismaClient();

export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string } }): Promise<Metadata> {
  const q = searchParams.q || '';
  return {
    title: q ? `"${q}" 搜索结果 - cnfranchise.com` : '搜索品牌 - cnfranchise.com',
    description: q ? `搜索"${q}"的加盟品牌结果` : '搜索加盟品牌',
  };
}

export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const q = (searchParams.q as string) || '';
  const sort = searchParams.sort as string || 'newest';
  const maxCost = searchParams.maxCost ? parseInt(searchParams.maxCost as string) : undefined;
  const minCost = searchParams.minCost ? parseInt(searchParams.minCost as string) : undefined;
  const industry = searchParams.industry as string | undefined;
  const page = parseInt(searchParams.page as string || '1');
  const pageSize = 20;

  const orderBy =
    sort === 'fee_low' ? { franchiseFee: 'asc' as const } :
    sort === 'fee_high' ? { franchiseFee: 'desc' as const } :
    sort === 'stores' ? { storesChina: 'desc' as const } :
    { createdAt: 'desc' as const };

  const where: Prisma.BrandWhereInput = {
    status: 'published',
    ...(q ? { OR: [
      { name: { contains: q } },
      { description: { contains: q } },
      { industry: { contains: q } },
    ]} : {}),
    ...(industry ? { industry } : {}),
  };

  const [brands, total] = await Promise.all([
    prisma.brand.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.brand.count({ where }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="page-enter">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-2">
            {q ? `搜索："${q}"` : '全部品牌'}
          </h1>
          <p className="text-sm text-slate-500">共找到 <span className="font-bold text-primary">{total}</span> 个品牌</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 搜索框 */}
        <form action="/search" method="get" className="flex gap-2 mb-6">
          <input type="text" name="q" defaultValue={q} placeholder="搜索品牌..." className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
          <button type="submit" className="gradient-primary text-white px-6 py-3 rounded-xl font-medium">搜索</button>
          {q && <Link href="/search" className="px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-500 hover:bg-slate-50">清除</Link>}
        </form>

        {/* 筛选 */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-sm text-slate-500 self-center">行业：</span>
          {['茶饮', '咖啡', '小吃', '甜品', '糖水', '餐饮'].map(ind => (
            <Link key={ind} href={`/search?q=${q}&industry=${ind}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${industry === ind ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary'}`}>
              {ind}
            </Link>
          ))}
        </div>

        {/* 排序 */}
        <div className="flex gap-2 mb-6">
          {[
            { label: '最新加入', value: 'newest' },
            { label: '费用低→高', value: 'fee_low' },
            { label: '费用高→低', value: 'fee_high' },
            { label: '门店最多', value: 'stores' },
          ].map(s => (
            <Link key={s.value} href={`/search?q=${q}&sort=${s.value}&industry=${industry || ''}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${sort === s.value ? 'bg-primary text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-primary'}`}>
              {s.label}
            </Link>
          ))}
        </div>

        {brands.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">未找到匹配的品牌</h3>
            <p className="text-slate-400 text-sm">试试其他关键词或筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {brands.map(brand => <BrandCard key={brand.id} brand={brand} />)}
          </div>
        )}
      </div>
    </div>
  );
}

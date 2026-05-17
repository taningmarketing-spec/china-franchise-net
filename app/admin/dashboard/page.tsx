'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalBrands: number; publishedBrands: number; pendingBrands: number;
  todayNew: number; totalCategories: number; totalInquiries: number;
}
interface RecentBrand {
  id: string; name: string; industry: string; status: string; createdAt: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/brands?admin=true&limit=5')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        setStats(d.stats || {});
        setRecent(d.brands || []);
      })
      .catch(err => {
        console.error('Dashboard error:', err);
        setError(err.message || '加载失败');
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-600">加载失败: {error}</p>
        <button onClick={() => { setError(null); setLoading(true); }} className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm">重试</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="skeleton h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: '品牌总数', value: stats?.totalBrands ?? 0, icon: '🏪', color: 'text-blue-600', change: '+10/天' },
    { label: '已发布', value: stats?.publishedBrands ?? 0, icon: '✅', color: 'text-emerald-600', change: '已上线' },
    { label: '待审核', value: stats?.pendingBrands ?? 0, icon: '⏳', color: 'text-amber-600', change: '待处理' },
    { label: '今日新增', value: stats?.todayNew ?? 0, icon: '🆕', color: 'text-violet-600', change: '今天' },
    { label: '咨询数', value: stats?.totalInquiries ?? 0, icon: '💬', color: 'text-pink-600', change: '总计' },
    { label: '分类数', value: stats?.totalCategories ?? 0, icon: '🏷️', color: 'text-orange-600', change: '个' },
  ];

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">仪表盘</h1>
          <p className="text-sm text-slate-400 mt-0.5">cnfranchise.com - 系统概览</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await fetch('/api/admin-auth', { method: 'DELETE' });
                window.location.href = '/admin/login';
              } catch { alert('退出失败'); }
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-pointer"
          >
            🚪 退出
          </button>
          <button
            onClick={async () => {
              try {
                const r = await fetch('/api/scrape', { method: 'POST' });
                if (r.ok) alert('✅ 采集任务已触发！'); else alert('❌ 触发失败');
              } catch { alert('❌ 网络错误'); }
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
          >
            🔄 手动采集
          </button>
          <Link href="/admin/brands/new" className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark transition-colors">
            ➕ 新增品牌
          </Link>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card.icon}</span>
              <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-medium">{card.change}</span>
            </div>
            <div className={`text-2xl font-extrabold ${card.color}`}>{card.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{card.label}</div>
          </div>
        ))}
      </div>

      {/* 待审核警告 */}
      {(stats?.pendingBrands ?? 0) > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="font-bold text-amber-800 flex items-center gap-2">
              ⚠️ 待审核品牌 ({stats?.pendingBrands})
            </h3>
            <Link href="/admin/brands?status=pending" className="text-xs text-amber-600 font-medium hover:underline">查看全部 →</Link>
          </div>
          <p className="text-sm text-amber-700 mb-3">有 {stats?.pendingBrands} 个新采集的品牌需要审核后发布</p>
          <Link href="/admin/brands?status=pending" className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
            前往审核 →
          </Link>
        </div>
      )}

      {/* SEO 状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={`${(stats?.pendingBrands ?? 0) > 0 ? '' : 'lg:col-span-2'} bg-blue-50 border border-blue-200 rounded-xl p-5`}>
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">🔍 SEO 状态</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
            {['✓ Sitemap 已生成', '✓ Robots.txt 已配置', '✓ 结构化数据已添加', '✓ 移动端适配完成'].map(item => (
              <div key={item} className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> {item.replace('✓ ', '')}</div>
            ))}
          </div>
        </div>
      </div>

      {/* 最近品牌 */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">最近添加的品牌</h3>
          <Link href="/admin/brands" className="text-sm text-primary font-medium hover:underline">查看全部 →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="px-5 py-12 text-center text-slate-400">
            <div className="text-3xl mb-2">📭</div>
            <p>暂无品牌数据</p>
            <Link href="/admin/brands/new" className="text-primary text-sm hover:underline mt-1 inline-block">添加第一个品牌 →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">品牌名称</th>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">行业</th>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">状态</th>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">添加时间</th>
                  <th className="text-right px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recent.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-slate-800">{b.name}</td>
                    <td className="px-5 py-3 text-slate-500">{b.industry}</td>
                    <td className="px-5 py-3">
                      <span className={`tag-pill ${b.status === 'published' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                        {b.status === 'published' ? '已发布' : b.status === 'pending' ? '待审核' : '已拒绝'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{new Date(b.createdAt).toLocaleDateString('zh-CN')}</td>
                    <td className="px-5 py-3 text-right">
                      <Link href={`/admin/brands/${b.id}`} className="text-primary text-xs font-medium hover:text-primary-dark transition-colors">编辑 →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

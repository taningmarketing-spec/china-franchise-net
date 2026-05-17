'use client';

import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [cats, setCats] = useState<Array<{ id: string; name: string; slug: string; count: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => setCats(d.categories || d || []))
      .catch(err => console.error('Categories error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-slate-800">分类管理</h1>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr><th className="text-left px-5 py-3 text-xs text-slate-500">分类名</th><th className="text-left px-5 py-3 text-xs text-slate-500">Slug</th><th className="text-left px-5 py-3 text-xs text-slate-500">品牌数</th></tr></thead>
          <tbody>{loading ? <tr><td colSpan={3} className="px-5 py-8 text-center text-slate-400">加载中...</td></tr> : cats.map(c => (
            <tr key={c.id} className="border-t border-slate-50"><td className="px-5 py-3 font-medium text-slate-800">{c.name}</td><td className="px-5 py-3 text-slate-400">{c.slug}</td><td className="px-5 py-3">{c.count}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

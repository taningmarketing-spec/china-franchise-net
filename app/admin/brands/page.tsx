'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Brand {
  id: string; name: string; slug: string; industry: string; categorySlug: string;
  franchiseFee: string; totalCost: string; storeCount: number; status: string; createdAt: string; isHot: boolean;
}

interface Category {
  id: string; name: string; slug: string; icon?: string | null; color: string; desc?: string | null; brandCount: number;
}

export default function BrandsAdminPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);

  const toggleHot = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/brands/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isHot: !current }),
      });
      if (res.ok) {
        setBrands(prev => prev.map(b => b.id === id ? { ...b, isHot: !current } : b));
      }
    } catch (e) {
      console.error(e);
    }
  };  const pageSize = 15;

  // Load categories
  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => setCategories(d.categories || []))
      .catch(err => console.error('Categories error:', err));
  }, []);

  // Load brands
  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ admin: 'true', page: String(page), limit: String(pageSize) });
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);

    fetch(`/api/brands?${params}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        setBrands(d.brands || []);
        setTotal(d.total || 0);
      })
      .catch(err => {
        console.error('Failed to load brands:', err);
        setError(err.message || '加载失败');
      })
      .finally(() => setLoading(false));
  }, [statusFilter, selectedCategory, page]);

  const totalPages = Math.ceil(total / pageSize);

  // Category management state
  const [showCatForm, setShowCatForm] = useState(false);
  const [catFormMode, setCatFormMode] = useState<'create' | 'edit'>('create');
  const [catEditId, setCatEditId] = useState<string | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catIcon, setCatIcon] = useState('');
  const [catColor, setCatColor] = useState('#1a56db');
  const [catDesc, setCatDesc] = useState('');
  const [catSaving, setCatSaving] = useState(false);

  function openCreateCat() {
    setCatFormMode('create');
    setCatEditId(null);
    setCatName('');
    setCatSlug('');
    setCatIcon('');
    setCatColor('#1a56db');
    setCatDesc('');
    setShowCatForm(true);
  }

  function openEditCat(cat: Category) {
    setCatFormMode('edit');
    setCatEditId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatIcon(cat.icon || '');
    setCatColor(cat.color || '#1a56db');
    setCatDesc(cat.desc || '');
    setShowCatForm(true);
  }

  async function handleSaveCat() {
    if (!catName.trim() || !catSlug.trim()) return;
    setCatSaving(true);
    try {
      const body = { name: catName.trim(), slug: catSlug.trim(), icon: catIcon.trim() || null, color: catColor, desc: catDesc.trim() || null };
      let res;
      if (catFormMode === 'create') {
        res = await fetch('/api/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        res = await fetch(`/api/categories/${catEditId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '保存失败');

      // Refresh categories
      const catsRes = await fetch('/api/categories');
      const catsData = await catsRes.json();
      setCategories(catsData.categories || []);

      setShowCatForm(false);
    } catch (e: any) {
      alert(e.message || '保存失败');
    } finally {
      setCatSaving(false);
    }
  }

  async function handleDeleteCat(cat: Category) {
    if (!confirm(`确定要删除分类「${cat.name}」吗？${cat.brandCount > 0 ? `\n该分类下还有 ${cat.brandCount} 个品牌，无法删除。` : ''}`)) return;
    try {
      const res = await fetch(`/api/categories/${cat.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '删除失败');

      // Refresh categories
      const catsRes = await fetch('/api/categories');
      const catsData = await catsRes.json();
      setCategories(catsData.categories || []);

      // If deleted the currently selected category, reset to all
      if (selectedCategory === cat.slug) setSelectedCategory('all');
    } catch (e: any) {
      alert(e.message || '删除失败');
    }
  }

  // Auto-generate slug from name
  function handleCatNameChange(val: string) {
    setCatName(val);
    if (catFormMode === 'create') {
      setCatSlug(val.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
    }
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-800">品牌管理</h1>
          <Link href="/admin/brands/new" className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"><span>➕</span> 新增品牌</Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">⚠️</div>
          <p className="text-red-600 font-medium">加载失败: {error}</p>
          <button onClick={() => { setError(null); setLoading(true); }} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">重试</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* ===== 左侧：分类栏 ===== */}
      <aside className="w-64 flex-shrink-0 space-y-4">
        {/* 分类列表 */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700">📂 分类</h2>
            <button
              onClick={openCreateCat}
              className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1"
            >
              ＋ 新增
            </button>
          </div>

          <div className="p-2 max-h-[60vh] overflow-y-auto">
            {/* 全部 */}
            <button
              onClick={() => { setSelectedCategory('all'); setPage(1); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                selectedCategory === 'all'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>📋 全部品牌</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === 'all' ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'
              }`}>
                {total}
              </span>
            </button>


            {/* 🔥 火爆推荐 */}
            <button
              onClick={() => { setSelectedCategory("__isHot__"); setPage(1); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                selectedCategory === '__isHot__'
                  ? 'bg-red-50 text-red-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">🔥 火爆加盟项目</span>
            </button>

            {/* 各分类 */}
            {categories.map(cat => (
              <div key={cat.id} className="group/cat">
                <button
                  onClick={() => { setSelectedCategory(cat.slug); setPage(1); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span style={{ color: cat.color }} className="text-base flex-shrink-0">{cat.icon || '📁'}</span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                    selectedCategory === cat.slug ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {cat.brandCount}
                  </span>
                </button>
                {/* 分类操作按钮（hover 显示） */}
                <div className="hidden group-hover/cat:flex items-center justify-end gap-1 px-3 pb-1.5 -mt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); openEditCat(cat); }}
                    className="text-xs text-slate-400 hover:text-blue-600"
                    title="编辑分类"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteCat(cat); }}
                    className="text-xs text-slate-400 hover:text-red-600"
                    title="删除分类"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                暂无分类<br />
                <button onClick={openCreateCat} className="text-primary hover:underline mt-1">创建第一个分类 →</button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ===== 右侧：品牌列表 ===== */}
      <main className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-800">
            品牌管理
            {selectedCategory !== 'all' && (
              <span className="ml-2 text-sm font-normal text-slate-500">
                → {categories.find(c => c.slug === selectedCategory)?.name}
              </span>
            )}
          </h1>
          <Link href="/admin/brands/new" className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"><span>➕</span> 新增品牌</Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm bg-white">
              <option value="all">全部状态</option>
              <option value="published">已发布</option>
              <option value="pending">待审核</option>
              <option value="rejected">已拒绝</option>
            </select>
            <span className="text-sm text-slate-400">共 {total} 个品牌</span>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="skeleton h-8 w-48 mx-auto mb-4 rounded-lg" />
              <div className="space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="skeleton h-12 w-full rounded-lg" />
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">品牌名称</th>
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">行业</th>
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">加盟费</th>
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">状态</th>
                    <th className="text-right px-5 py-3 text-xs text-slate-500 font-medium uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {brands.length === 0 ? (
                    <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                      <div className="text-3xl mb-2">📭</div>
                      <p>暂无品牌数据</p>
                      <Link href="/admin/brands/new" className="text-primary text-sm hover:underline mt-1 inline-block">添加第一个品牌 →</Link>
                    </td></tr>
                  ) : brands.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          {b.isHot && <span className="text-red-500" title="火爆加盟项目">🔥</span>}
                          {b.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{b.slug}</div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{b.industry}</td>
                      <td className="px-5 py-3.5 font-medium text-accent">{b.franchiseFee}</td>
                      <td className="px-5 py-3.5">
                        <span className={`tag-pill ${b.status === 'published' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                          {b.status === 'published' ? '✅ 已发布' : b.status === 'pending' ? '⏳ 待审核' : '❌ 已拒绝'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => toggleHot(b.id, b.isHot)}
                          className="text-xs px-2 py-1 rounded transition-colors mr-1"
                          title={b.isHot ? '取消火爆' : '设为火爆'}
                          style={{
                            backgroundColor: b.isHot ? '#fef2f2' : 'transparent',
                            color: b.isHot ? '#ef4444' : '#94a3b8',
                            border: '1px solid ' + (b.isHot ? '#fecaca' : '#e2e8f0'),
                          }}
                        >
                          {b.isHot ? '🔥' : '☆'}
                        </button>
                        <Link href={`/admin/brands/${b.id}`} className="text-primary hover:text-primary-dark font-medium text-xs transition-colors">
                          编辑 →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← 上一页
              </button>
              <span className="text-sm text-slate-500">
                第 {page} / {totalPages} 页
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-1.5 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                下一页 →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ===== 分类表单弹窗 ===== */}
      {showCatForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowCatForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[480px] max-w-[95vw]" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {catFormMode === 'create' ? '➕ 新增分类' : '✏️ 编辑分类'}
              </h3>
              <button onClick={() => setShowCatForm(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* 分类名称 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">分类名称 *</label>
                <input
                  type="text"
                  value={catName}
                  onChange={e => handleCatNameChange(e.target.value)}
                  placeholder="例如：茶饮、咖啡、小吃..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug（URL 标识）*</label>
                <input
                  type="text"
                  value={catSlug}
                  onChange={e => setCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''))}
                  placeholder="例如：chayin、coffee..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-mono"
                />
              </div>

              {/* 图标 + 颜色 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">图标 Emoji</label>
                  <input
                    type="text"
                    value={catIcon}
                    onChange={e => setCatIcon(e.target.value)}
                    placeholder="例如：🍵 ☕ 🍜"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">颜色</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={catColor}
                      onChange={e => setCatColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={catColor}
                      onChange={e => setCatColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">描述（可选）</label>
                <textarea
                  value={catDesc}
                  onChange={e => setCatDesc(e.target.value)}
                  placeholder="分类简介..."
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCatForm(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveCat}
                disabled={catSaving || !catName.trim() || !catSlug.trim()}
                className="px-5 py-2 text-sm bg-primary text-white rounded-lg font-medium hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {catSaving ? '保存中...' : (catFormMode === 'create' ? '创建' : '保存')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface CmsPage {
  id: string; title: string; slug: string; locale: string;
  status: string; showInNav: boolean; createdAt: string; updatedAt: string;
}

const LOCALES = [
  { code: 'all', label: '🌐 全部' },
  { code: 'zh', label: '🇨🇳 中文' },
  { code: 'en', label: '🇺🇸 English' },
  { code: 'th', label: '🇹🇭 ไทย' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
];

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  published: { label: '✅ 已发布', cls: 'bg-emerald-100 text-emerald-700' },
  draft: { label: '📝 草稿', cls: 'bg-slate-100 text-slate-500' },
};

export default function PagesAdminPage() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>('zh');
  const [showNewModal, setShowNewModal] = useState(false);

  // New page form state
  const [newPage, setNewPage] = useState({ title: '', slug: '', locale: 'zh', status: 'draft' });
  const [saving, setSaving] = useState(false);
  const [newError, setNewError] = useState('');

  useEffect(() => {
    fetch('/api/pages?admin=true')
      .then(r => r.json())
      .then(data => { setPages(data); setLoading(false); })
      .catch(e => { console.error(e); setError('加载失败'); setLoading(false); });
  }, []);

  const filteredPages = activeLocale === 'all'
    ? pages
    : pages.filter(p => p.locale === activeLocale);

  const handleLocaleChange = (locale: string) => {
    setActiveLocale(locale);
    setNewPage(prev => ({ ...prev, locale }));
  };

  const handleCreate = async () => {
    if (!newPage.title.trim()) { setNewError('请输入页面标题'); return; }
    if (!newPage.slug.trim()) { setNewError('请输入页面Slug'); return; }
    setSaving(true);
    setNewError('');
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPage),
      });
      const data = await res.json();
      if (!res.ok) { setNewError(data.error || '创建失败'); return; }
      setPages(prev => [data, ...prev]);
      setShowNewModal(false);
      setNewPage({ title: '', slug: '', locale: activeLocale === 'all' ? 'zh' : activeLocale, status: 'draft' });
    } catch {
      setNewError('网络错误，请重试');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除此页面？')) return;
    await fetch(`/api/pages?id=${id}`, { method: 'DELETE' });
    setPages(prev => prev.filter(p => p.id !== id));
  };

  // Count per locale
  const countByLocale = (code: string) =>
    code === 'all' ? pages.length : pages.filter(p => p.locale === code).length;

  const statsPages = activeLocale === 'all' ? pages : filteredPages;
  const publishedCount = statsPages.filter(p => p.status === 'published').length;
  const draftCount = statsPages.filter(p => p.status === 'draft').length;
  const navCount = statsPages.filter(p => p.showInNav).length;

  const currentLocaleLabel = LOCALES.find(l => l.code === activeLocale)?.label.replace(/^.+\s/, '') || '中文';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">图文单页管理</h1>
          <p className="text-sm text-slate-400 mt-0.5">创建和管理自定义页面（关于我们、加盟流程、帮助中心等）</p>
        </div>
        <button onClick={() => setShowNewModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          ➕ 新建页面
        </button>
      </div>

      {/* 语言切换 Tab */}
      <div className="bg-white rounded-xl border border-slate-100 p-1.5 flex gap-1 overflow-x-auto">
        {LOCALES.map(locale => (
          <button
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeLocale === locale.code
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{locale.label}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              activeLocale === locale.code ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>{countByLocale(locale.code)}</span>
          </button>
        ))}
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '页面数', value: statsPages.length, icon: '📄', color: 'text-blue-600' },
          { label: '已发布', value: publishedCount, icon: '✅', color: 'text-emerald-600' },
          { label: '草稿', value: draftCount, icon: '📝', color: 'text-slate-400' },
          { label: '导航显示', value: navCount, icon: '🧭', color: 'text-violet-600' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center gap-2 mb-1"><span>{card.icon}</span><span className="text-xs text-slate-400">{card.label}</span></div>
            <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* 页面列表 */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">加载中...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredPages.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-slate-500 mb-2">
              {activeLocale === 'all' ? '暂无自定义页面' : `暂无 ${LOCALES.find(l => l.code === activeLocale)?.label.replace(/^.+\s/, '')} 页面`}
            </p>
            <p className="text-sm text-slate-400 mb-4">切换语言Tab或创建新页面</p>
            <button onClick={() => setShowNewModal(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">➕ 创建第一个页面</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase">页面标题</th>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase">Slug</th>
                  {activeLocale === 'all' && (
                    <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase">语言</th>
                  )}
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase">状态</th>
                  <th className="text-center px-5 py-3 text-xs text-slate-500 font-medium uppercase">导航</th>
                  <th className="text-left px-5 py-3 text-xs text-slate-500 font-medium uppercase">更新时间</th>
                  <th className="text-right px-5 py-3 text-xs text-slate-500 font-medium uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-medium text-slate-800">{page.title}</div>
                    </td>
                    <td className="px-5 py-3">
                      <code className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{page.slug}</code>
                    </td>
                    {activeLocale === 'all' && (
                      <td className="px-5 py-3">
                        <span className="text-xs">{LOCALES.find(l => l.code === page.locale)?.label || page.locale}</span>
                      </td>
                    )}
                    <td className="px-5 py-3">
                      <span className={`tag-pill ${STATUS_MAP[page.status]?.cls || ''}`}>
                        {STATUS_MAP[page.status]?.label || page.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      {page.showInNav ? <span className="text-violet-500">✅</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-400">
                      {new Date(page.updatedAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`/page/${page.slug}?locale=${page.locale}`} target="_blank" className="text-blue-500 hover:text-blue-700 text-xs font-medium">查看</a>
                        <Link href={`/admin/pages/${page.id}`} className="text-primary hover:text-primary-dark text-xs font-medium">编辑</Link>
                        <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 使用说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-bold text-blue-800 mb-2">💡 使用说明</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 上方Tab切换语言，可分语言管理页面内容</li>
          <li>• 同一Slug可为不同语言创建独立内容版本（如 franchise / franchise-en / franchise-th）</li>
          <li>• 勾选「显示在导航」后，页面会自动出现在前台顶部导航栏</li>
          <li>• 内容支持富文本编辑器，可自由排版（标题、图片、列表、表格等）</li>
        </ul>
      </div>

      {/* 新建页面 Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={e => e.target === e.currentTarget && setShowNewModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">新建页面</h2>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {newError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">{newError}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">页面标题</label>
                <input
                  type="text"
                  value={newPage.title}
                  onChange={e => setNewPage(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="例如：关于我们"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">页面Slug</label>
                <input
                  type="text"
                  value={newPage.slug}
                  onChange={e => setNewPage(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="例如：about（前台访问：/page/about）"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <p className="text-xs text-slate-400 mt-1">Slug在同语言下唯一，创建后不可更改</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">语言版本</label>
                <div className="flex gap-2 flex-wrap">
                  {LOCALES.slice(1).map(locale => (
                    <button
                      key={locale.code}
                      onClick={() => setNewPage(prev => ({ ...prev, locale: locale.code }))}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        newPage.locale === locale.code
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {locale.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-1.5">选择为此语言创建页面，如需其他语言请切换Tab</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">初始状态</label>
                <select
                  value={newPage.status}
                  onChange={e => setNewPage(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="draft">📝 草稿</option>
                  <option value="published">✅ 已发布</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex items-center justify-end gap-3">
              <button onClick={() => setShowNewModal(false)} className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors">取消</button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {saving ? '创建中...' : '创建页面'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

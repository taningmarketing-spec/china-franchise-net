'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { value: 'overseas', label: '海外加盟' },
  { value: 'brand-development', label: '品牌发展' },
  { value: 'general', label: '通用问题' },
];

const LOCALES = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'th', label: 'ภาษาไทย' },
  { value: 'vi', label: 'Tiếng Việt' },
];

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: '', locale: 'zh' });

  useEffect(() => {
    fetchFaqs();
  }, [filter]);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.category) params.set('category', filter.category);
      if (filter.locale) params.set('locale', filter.locale);
      const res = await fetch(`/api/faqs?${params}`);
      const data = await res.json();
      setFaqs(data.faqs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个问答吗？')) return;
    try {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (err) {
      alert('删除失败');
    }
  };

  const getCategoryLabel = (cat: string) => CATEGORIES.find(c => c.value === cat)?.label || cat;
  const getLocaleLabel = (locale: string) => LOCALES.find(l => l.value === locale)?.label || locale;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">❓ 问答管理</h1>
        <Link href="/admin/faqs/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + 新建问答
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4">
        <select
          value={filter.category}
          onChange={e => setFilter({ ...filter, category: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">全部分类</option>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select
          value={filter.locale}
          onChange={e => setFilter({ ...filter, locale: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">全部语言</option>
          {LOCALES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">问题</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">分类</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">语言</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
            ) : faqs.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">暂无问答</td></tr>
            ) : (
              faqs.map(faq => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{faq.question}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-1">{faq.answer}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {getCategoryLabel(faq.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getLocaleLabel(faq.locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${faq.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {faq.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/faqs/${faq.id}`} className="text-blue-600 hover:underline text-sm">编辑</Link>
                      <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:underline text-sm">删除</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

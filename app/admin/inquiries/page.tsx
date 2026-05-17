'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const fetchInquiries = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== 'all') params.set('status', status);
    if (search) params.set('search', search);
    fetch(`/api/inquiries?${params}`).then(r => r.json()).then(d => {
      setInquiries(d.inquiries || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInquiries();
  }, [status]);

  const handleSearch = () => fetchInquiries();

  const handleStatusChange = async (id: string, newStatus: string) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchInquiries();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除该咨询?')) return;
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    setInquiries(inquiries.filter(i => i.id !== id));
  };

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = { new: '新咨询', contacted: '已联系', rejected: '已拒绝' };
    return <span className={`px-2 py-1 rounded-full text-xs ${styles[s] || 'bg-slate-100 text-slate-600'}`}>{labels[s] || s}</span>;
  };

  if (loading) return <div className="p-8 text-center text-slate-400">加载中...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">咨询管理</h1>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4 items-center">
        <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg">
          <option value="all">全部状态</option>
          <option value="new">新咨询</option>
          <option value="contacted">已联系</option>
          <option value="rejected">已拒绝</option>
        </select>
        <input
          type="text"
          placeholder="搜索姓名/电话/邮箱"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="px-3 py-2 border border-slate-300 rounded-lg flex-1 min-w-[200px]"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">搜索</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">姓名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">电话</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">邮箱</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">时间</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {inquiries.map(inq => (
              <tr key={inq.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{inq.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inq.phone}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{inq.email || '-'}</td>
                <td className="px-4 py-3">{statusBadge(inq.status)}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(inq.createdAt).toLocaleString('zh-CN')}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/inquiries/${inq.id}`} className="text-primary hover:underline text-sm mr-3">详情</Link>
                  {inq.status === 'new' && (
                    <button onClick={() => handleStatusChange(inq.id, 'contacted')} className="text-green-600 hover:underline text-sm mr-3">标记已联系</button>
                  )}
                  <button onClick={() => handleDelete(inq.id)} className="text-red-500 hover:underline text-sm">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="p-8 text-center text-slate-400">暂无咨询</div>
        )}
      </div>
    </div>
  );
}

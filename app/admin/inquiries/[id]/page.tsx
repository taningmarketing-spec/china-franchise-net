'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [inquiry, setInquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/inquiries/${id}`).then(r => r.json()).then(d => {
      setInquiry(d.inquiry);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    await fetch(`/api/inquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setInquiry({ ...inquiry, status: newStatus });
  };

  const handleDelete = async () => {
    if (!confirm('确定删除该咨询?')) return;
    await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    router.push('/admin/inquiries');
  };

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = { new: '新咨询', contacted: '已联系', rejected: '已拒绝' };
    return <span className={`px-3 py-1 rounded-full text-sm ${styles[s] || 'bg-slate-100 text-slate-600'}`}>{labels[s] || s}</span>;
  };

  if (loading) return <div className="p-8 text-center text-slate-400">加载中...</div>;
  if (!inquiry) return <div className="p-8 text-center text-slate-400">未找到</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="text-slate-500 hover:text-slate-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">咨询详情</h1>
        {statusBadge(inquiry.status)}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">姓名</label>
            <div className="text-slate-800">{inquiry.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">电话</label>
            <div className="text-slate-800">{inquiry.phone}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">邮箱</label>
            <div className="text-slate-800">{inquiry.email || '-'}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">提交时间</label>
            <div className="text-slate-800">{new Date(inquiry.createdAt).toLocaleString('zh-CN')}</div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-500 mb-1">咨询内容</label>
          <div className="text-slate-800 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">{inquiry.message}</div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-slate-200">
          {inquiry.status === 'new' && (
            <button onClick={() => handleStatusChange('contacted')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              标记为已联系
            </button>
          )}
          {inquiry.status === 'new' && (
            <button onClick={() => handleStatusChange('rejected')} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition">
              拒绝
            </button>
          )}
          {inquiry.status === 'contacted' && (
            <button onClick={() => handleStatusChange('new')} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
              重新标记为新咨询
            </button>
          )}
          <button onClick={handleDelete} className="px-4 py-2 text-red-500 hover:underline">
            删除
          </button>
        </div>
      </div>
    </div>
  );
}

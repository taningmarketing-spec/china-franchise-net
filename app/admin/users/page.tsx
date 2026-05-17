'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Admin {
  id: string;
  username: string;
  nickname: string | null;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ username: '', nickname: '', password: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin-users').then(r => r.json()).then(d => {
      setUsers(d.admins || []);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!newForm.username || !newForm.password) return alert('用户名和密码必填');
    if (newForm.username.length < 3) return alert('用户名至少3位');
    if (newForm.password.length < 6) return alert('密码至少6位');
    setSaving(true);
    const res = await fetch('/api/admin-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newForm),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      setSaving(false);
      return;
    }
    setUsers([...users, data.admin]);
    setShowNew(false);
    setNewForm({ username: '', nickname: '', password: '' });
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除该用户?')) return;
    const res = await fetch(`/api/admin-users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.error) return alert(data.error);
    setUsers(users.filter(u => u.id !== id));
  };

  if (loading) return <div className="p-8 text-center text-slate-400">加载中...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">用户管理</h1>
        <button onClick={() => setShowNew(!showNew)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          + 新建用户
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-semibold mb-4">新建用户</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="用户名 *"
              value={newForm.username}
              onChange={e => setNewForm({ ...newForm, username: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
            <input
              type="text"
              placeholder="昵称"
              value={newForm.nickname}
              onChange={e => setNewForm({ ...newForm, nickname: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
            <input
              type="password"
              placeholder="密码 *"
              value={newForm.password}
              onChange={e => setNewForm({ ...newForm, password: e.target.value })}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleCreate} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50">
              {saving ? '保存中...' : '保存'}
            </button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
              取消
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">用户名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">昵称</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">创建时间</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{user.username}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{user.nickname || '-'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(user.createdAt).toLocaleString('zh-CN')}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/users/${user.id}`} className="text-primary hover:underline text-sm mr-3">编辑</Link>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline text-sm">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-8 text-center text-slate-400">暂无用户</div>
        )}
      </div>
    </div>
  );
}

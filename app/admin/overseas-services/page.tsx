'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OverseasService {
  id: string;
  serviceId: string;
  name: string;
  icon?: string | null;
  description?: string | null;
  content?: string | null;
  sortOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OverseasServicesAdminPage() {
  const [services, setServices] = useState<OverseasService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchServices();
  }, [statusFilter]);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`/api/overseas-services?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data.services || []);
    } catch (err: any) {
      console.error('Failed to load services:', err);
      setError(err.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个服务吗？')) return;
    try {
      const res = await fetch(`/api/overseas-services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('删除失败');
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      alert('删除失败');
    }
  };

  const handleToggleStatus = async (service: OverseasService) => {
    const newStatus = service.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await fetch(`/api/overseas-services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('更新失败');
      setServices(services.map(s => s.id === service.id ? { ...s, status: newStatus } : s));
    } catch (err) {
      alert('更新状态失败');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🌐 出海服务管理</h1>
        <Link href="/admin/overseas-services/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + 新建服务
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap gap-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">全部状态</option>
          <option value="active">已启用</option>
          <option value="inactive">已禁用</option>
        </select>
        <button
          onClick={fetchServices}
          className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          🔄 刷新
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12 text-slate-500">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          加载中...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">排序</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">图标</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">服务ID</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">名称</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">描述</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">状态</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    暂无数据
                  </td>
                </tr>
              ) : (
                services.map(service => (
                  <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-600">{service.sortOrder}</td>
                    <td className="px-4 py-3">
                      {service.icon ? (
                        <img src={service.icon} alt={service.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                          🌐
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-slate-600">{service.serviceId}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{service.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">
                      {service.description || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(service)}
                        className={`px-2 py-1 text-xs rounded-full font-medium transition-colors ${
                          service.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {service.status === 'active' ? '已启用' : '已禁用'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/overseas-services/${service.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 text-sm text-slate-500">
        共 {services.length} 项服务
      </div>
    </div>
  );
}

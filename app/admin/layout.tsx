'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

const ADMIN_NAV = [
  { label: '仪表盘', href: '/admin/dashboard', icon: '📊' },
  { label: '品牌管理', href: '/admin/brands', icon: '🏪' },
  { label: '出海服务', href: '/admin/overseas-services', icon: '🌏' },
  { label: '图文单页', href: '/admin/pages', icon: '📄' },
  { label: '文章管理', href: '/admin/articles', icon: '📰' },
  { label: '问答管理', href: '/admin/faqs', icon: '❓' },
  { label: '用户管理', href: '/admin/users', icon: '👤' },
  { label: '咨询管理', href: '/admin/inquiries', icon: '📧' },
  { label: '采集日志', href: '/admin/scrape-logs', icon: '🔄' },
  { label: 'SEO设置', href: '/admin/settings', icon: '⚙️' },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 py-3 px-2 space-y-0.5">
      {ADMIN_NAV.map(item => {
        const active = pathname?.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? 'bg-primary text-white font-medium' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
            <span>{item.icon}</span> {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function AdminLogoutBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin-auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {loading ? '退出中...' : '退出'}
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* 侧边栏 */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-56 bg-slate-900 text-white flex flex-col transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="px-4 py-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">加</div>
            <div><div className="font-bold text-sm">cnfranchise.com</div><div className="text-[10px] text-slate-400">管理后台</div></div>
          </div>
        </div>
        <Suspense fallback={<div className="flex-1 p-4 text-slate-400">加载中...</div>}>
          <AdminSidebar />
        </Suspense>
        <div className="px-3 py-4 border-t border-slate-700">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white text-sm transition-all"><span>🌐</span> 查看前台</Link>
        </div>
      </aside>

      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 顶部栏 */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm text-slate-500 hidden md:block">管理后台</span>
          <div className="flex items-center gap-2">
            <AdminLogoutBtn />
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看前台
            </Link>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
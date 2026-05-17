'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from '@/components/front/LanguageSwitcher';
import FloatingContact from '@/components/front/FloatingContact';

const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '茶饮', href: '/category/chayin' },
  { label: '咖啡', href: '/category/kafei' },
  { label: '小吃', href: '/category/xiaochi' },
  { label: '甜品', href: '/category/tianpin' },
  { label: '糖水', href: '/category/tangshui' },
  { label: '餐饮', href: '/category/canyin' },
];

export default function FrontLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchVal)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                加
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base text-slate-800 leading-tight">cnfranchise.com</div>
                <div className="text-[10px] text-slate-400 leading-tight">China Franchise Net</div>
              </div>
            </Link>

            {/* 桌面导航 */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-blue-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* 搜索框 */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 flex-1 max-w-sm mx-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="搜索品牌、行业..."
                  className="search-input w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:border-primary transition-colors"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* 右侧按钮 */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Link href="/admin" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-primary border border-slate-200 hover:border-primary rounded-lg transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                管理后台
              </Link>

              {/* 移动端菜单按钮 */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* 移动端菜单 */}
          {menuOpen && (
            <div className="py-3 border-t border-slate-100 lg:hidden">
              <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="搜索品牌..."
                  className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm"
                />
                <button type="submit" className="px-3 py-2 bg-primary text-white rounded-lg text-sm">搜索</button>
              </form>
              <div className="flex flex-wrap gap-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-1.5 text-sm text-slate-600 bg-slate-100 hover:bg-primary hover:text-white rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">加</div>
                <span className="font-bold text-white">cnfranchise.com</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                收录餐饮、茶饮、咖啡、小吃、甜品、糖水等行业优质加盟品牌，为创业者提供真实、可靠的加盟信息。
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">热门行业</h3>
              <ul className="space-y-2 text-sm">
                {[['茶饮', 'chayin'], ['咖啡', 'kafei'], ['小吃', 'xiaochi'], ['甜品', 'tianpin'], ['糖水', 'tangshui']].map(([name, slug]) => (
                  <li key={slug}>
                    <Link href={`/category/${slug}`} className="hover:text-primary transition-colors">{name}加盟</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">投资预算</h3>
              <ul className="space-y-2 text-sm">
                {[['5万以下', '?maxCost=5'], ['10万以下', '?maxCost=10'], ['20万以下', '?maxCost=20'], ['50万以下', '?maxCost=50'], ['50万以上', '?minCost=50']].map(([name, q]) => (
                  <li key={q}>
                    <Link href={`/search${q}`} className="hover:text-primary transition-colors">{name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 text-sm">关于我们</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary transition-colors">关于我们</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">联系我们</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">隐私政策</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">使用条款</Link></li>
                <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">网站地图</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>&copy; 2026 cnfranchise.com cnfranchise.com 版权所有</p>
            <p>收录优质加盟品牌，助力创业者成功</p>
          </div>
        </div>
      </footer>

      {/* 浮动联系按钮 */}
      <FloatingContact />
    </div>
  );
}

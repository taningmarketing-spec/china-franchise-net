'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import FloatingContact from './FloatingContact';
import type { Locale } from '@/lib/i18n';
import { translations } from '@/lib/i18n';

type NavItem = {
  key: string;
  href: string;
  isDropdown?: boolean;
  dropdownItems?: Array<{ key: string; label: string; href: string; desc?: string }>;
};

interface Props {
  children: React.ReactNode;
  locale: Locale;
}

export default function LocaleClientLayout({ children, locale }: Props) {
  const t = translations[locale] || translations.zh;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // NAVIGATION CONFIG
  const navItems: NavItem[] = [
    { key: 'home', href: '/' },
    { key: 'franchise', href: '/franchise' },
    { key: 'franchisee', href: '/franchisee' },
    {
      key: 'academy',
      href: '/academy',
      isDropdown: true,
      dropdownItems: [
        { key: 'overseasDynamic', href: '/academy/overseas-dynamic', label: (t.nav as any)['overseasDynamic'] || '海外加盟动态', desc: (t.nav as any)['overseasDynamicDesc'] },
        { key: 'overseasCase', href: '/academy/overseas-case', label: (t.nav as any)['overseasCase'] || '品牌出海案例', desc: (t.nav as any)['overseasCaseDesc'] },
        { key: 'overseasTips', href: '/academy/overseas-tips', label: (t.nav as any)['overseasTips'] || '海外加盟常识', desc: (t.nav as any)['overseasTipsDesc'] },
        { key: 'overseasPolicy', href: '/academy/overseas-policy', label: (t.nav as any)['overseasPolicy'] || '海外特许政策', desc: (t.nav as any)['overseasPolicyDesc'] },
      ],
    },
    { key: 'overseasQA', href: '/qa' },
    { key: 'overseasServices', href: '/overseas-services' },
    { key: 'aboutUs', href: '/about' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const withLocale = (href: string) => `/${locale}${href}`;

  const getLabel = (key: string) => (t.nav as any)[key] || key;

  return (
    <div className="min-h-screen flex flex-col">
      {/* === 顶部导航 === */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href={withLocale('/')} className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                加
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-base text-slate-800 leading-tight">
                  {getLabel('siteName')}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight tracking-wide">
                  cnfranchise.com
                </div>
              </div>
            </Link>

            {/* 桌面导航 */}
            <nav ref={dropdownRef} className="hidden lg:flex items-center gap-0">
              {navItems.map(item => (
                <div key={item.key} className="relative">
                  {item.isDropdown ? (
                    <>
                      {/* 下拉父菜单 */}
                      <button
                        onMouseEnter={() => setActiveDropdown(item.key)}
                        onClick={() => setActiveDropdown(activeDropdown === item.key ? null : item.key)}
                        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                          activeDropdown === item.key
                            ? 'text-primary bg-primary/5'
                            : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                        }`}
                      >
                        {getLabel(item.key)}
                        <svg className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.key ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* 下拉菜单 */}
                      {activeDropdown === item.key && (
                        <div
                          className="absolute left-0 top-full mt-1 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="p-2">
                            {item.dropdownItems?.map(dropdown => (
                              <Link
                                key={dropdown.key}
                                href={withLocale(dropdown.href)}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-start gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-slate-700 group-hover:text-primary transition-colors">
                                    {dropdown.label}
                                  </div>
                                  {dropdown.desc && (
                                    <div className="text-xs text-slate-400 mt-0.5">{dropdown.desc}</div>
                                  )}
                                </div>
                                <svg className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            ))}
                          </div>
                          {/* Bottom link */}
                          <div className="border-t border-slate-100 p-2">
                            <Link
                              href={withLocale(item.href)}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2 px-4 py-2 text-xs text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              <span>🎓</span>
                              {getLabel('enterAcademy')}
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={withLocale(item.href)}
                      onClick={() => setActiveDropdown(null)}
                      className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all"
                    >
                      {getLabel(item.key)}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* 右侧功能区 */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />

              {/* 移动端汉堡菜单 */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* 移动端全屏菜单 */}
          {menuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4 space-y-1">

              {/* Mobile Nav Items */}
              {navItems.map(item => (
                <div key={item.key}>
                  {item.isDropdown ? (
                    <div>
                      <Link
                        href={withLocale(item.href)}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <span>{getLabel(item.key)}</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <div className="pl-4 space-y-0.5">
                        {item.dropdownItems?.map(sub => (
                          <Link
                            key={sub.key}
                            href={withLocale(sub.href)}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={withLocale(item.href)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-sm font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      {getLabel(item.key)}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <div className="w-7 h-7 gradient-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">加</div>
                {getLabel('siteName')}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {(t.footer as any).slogan}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{(t.footer as any).quickLinks}</h4>
              <ul className="space-y-2 text-sm">
                {navItems.filter(i => !i.isDropdown).map(item => (
                  <li key={item.key}>
                    <Link href={withLocale(item.href)} className="hover:text-white transition-colors">{getLabel(item.key)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{(t.footer as any).categoryBrands}</h4>
              <ul className="space-y-2 text-sm">
                {[
                  (t.nav as any)['overseasDynamic'],
                  (t.nav as any)['overseasCase'],
                  (t.nav as any)['overseasTips'],
                  (t.nav as any)['overseasPolicy'],
                ].map((label: string, i: number) => (
                  <li key={i}>
                    <Link href={`/${locale}/academy/${['overseas-dynamic', 'overseas-case', 'overseas-tips', 'overseas-policy'][i]}`} className="hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">{(t.footer as any).contactUs}</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Email: contact@cnfranchise.com</li>
                <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{(t.footer as any).onlineInquiry}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500 space-y-1">
            © 2026 {(t.footer as any).copyright}
            <div>
              <Link href="/admin" className="hover:text-slate-300 transition-colors">{(t.footer as any).admin}</Link>
            </div>
          </div>

        </div>
      </footer>

      <FloatingContact />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { locales, localeNames } from '@/lib/i18n';

const flagEmojis: Record<Locale, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  th: '🇹🇭',
  vi: '🇻🇳',
};

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('zh');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Detect locale from path
    const segments = pathname.split('/').filter(Boolean);
    const localeSegment = segments[0] as Locale;
    if (locales.includes(localeSegment)) {
      setCurrentLocale(localeSegment);
    }
  }, [pathname]);

  const switchLocale = (locale: Locale) => {
    setOpen(false);
    // Remove current locale prefix if exists
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }
    const newPath = locale === 'zh' ? `/${segments.join('/')}` : `/${locale}/${segments.join('/')}`;
    router.push(newPath || '/');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-primary border border-slate-200 hover:border-primary rounded-lg transition-all"
      >
        <span>{flagEmojis[currentLocale]}</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden min-w-[140px]">
            {locales.map(locale => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                  currentLocale === locale
                    ? 'bg-primary/5 text-primary font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{flagEmojis[locale]}</span>
                <span>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

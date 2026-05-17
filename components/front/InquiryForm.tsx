'use client';

import { useState } from 'react';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

function gT(locale: string, key: string): string {
  const keys = key.split('.');
  let v: any = translations[locale as Locale];
  for (const k of keys) v = v?.[k];
  return (v as string) ?? key;
}

export default function InquiryForm({ brandId, brandName, locale = 'zh' }: { brandId: string; brandName: string; locale?: string }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError(gT(locale, 'brand.required'));
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, brandId }),
      });
      if (!res.ok) throw new Error(gT(locale, 'brand.error'));
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setError(gT(locale, 'brand.error'));
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-bold text-slate-800 mb-2">{gT(locale, 'brand.success')}</h3>
        <p className="text-sm text-slate-500">{gT(locale, 'brand.successDesc')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="font-bold text-slate-800 mb-1">{gT(locale, 'brand.inquiryModal.title')} {brandName}</h3>
      <p className="text-xs text-slate-400 mb-4">{gT(locale, 'brand.consultingDesc')}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder={`${gT(locale, 'brand.name')} *`}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder={gT(locale, 'brand.phoneLabel')}
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder={gT(locale, 'brand.email')}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <textarea
            placeholder={gT(locale, 'brand.message')}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full gradient-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? gT(locale, 'brand.submitting') : gT(locale, 'brand.submit')}
        </button>
      </form>

      <p className="text-[10px] text-slate-400 mt-3 text-center">
        {gT(locale, 'brand.privacy')}
      </p>
    </div>
  );
}

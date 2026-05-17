'use client';

import { useState } from 'react';

interface Props {
  labels: {
    name: string;
    phone: string;
    email: string;
    msg: string;
    submit: string;
  };
  successTitle: string;
  successDesc: string;
  errorText: string;
  submitting: string;
  privacyNote: string;
}

export default function ContactForm({ labels, successTitle, successDesc, errorText, submitting, privacyNote }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError(errorText);
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setError(errorText);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-bold text-slate-800 mb-2">{successTitle}</h3>
        <p className="text-sm text-slate-500">{successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder={labels.name} value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      <input type="tel" placeholder={labels.phone} value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      <input type="email" placeholder={labels.email} value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
      <textarea rows={4} placeholder={labels.msg} value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={status === 'loading'}
        className="w-full gradient-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'loading' ? submitting : labels.submit}
      </button>
      <p className="text-[10px] text-slate-400 mt-2 text-center">{privacyNote}</p>
    </form>
  );
}

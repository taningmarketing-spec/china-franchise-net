'use client';

import { useState } from 'react';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

export default function BrandGallery({ brand, locale = 'zh' }: { brand: { name: string; images: string }; locale?: Locale }) {
  let images: string[] = [];
  try {
    images = JSON.parse(brand.images || '[]');
  } catch {}

  const [lightbox, setLightbox] = useState<string | null>(null);
  const t = translations[locale];

  if (images.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">📷</span>
        {t.home.brandGallery.brandImage}
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightbox(img)}
            className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 hover:opacity-80 transition-opacity"
          >
            <img src={img} alt={`${brand.name} ${t.home.brandGallery.brandImage} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white text-3xl hover:text-red-400" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt={t.home.brandGallery.brandImage} className="max-w-full max-h-full rounded-xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
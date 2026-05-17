'use client';

import { useState } from 'react';
import ContactModal from './ContactModal';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface BrandCTAProps {
  brandName: string;
  locale?: Locale;
}

export default function BrandCTA({ brandName, locale = 'zh' }: BrandCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const t = translations[locale];

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="gradient-accent text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          💬 {t.inquiry.title}
        </button>
      </div>
      <ContactModal brandName={brandName} isOpen={modalOpen} onClose={() => setModalOpen(false)} locale={locale} />
    </>
  );
}
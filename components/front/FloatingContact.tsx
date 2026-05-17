'use client';

import { useState } from 'react';
import ContactModal from './ContactModal';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 浮动按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 gradient-accent rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
        title="联系我们 / Contact Us"
      >
        💬
      </button>

      <ContactModal isOpen={open} onClose={() => setOpen(false)} />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { translations } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

interface ShareButtonProps {
  locale: Locale;
  url: string;
  title: string;
}

type Platform = 'wechat' | 'facebook' | 'twitter' | 'linkedin' | 'line' | 'whatsapp' | 'telegram' | 'copy';

const platformConfig: Record<Platform, { icon: string; color: string; label: string }> = {
  wechat: { icon: '💬', color: '#07C160', label: 'wechat' },
  facebook: { icon: '📘', color: '#1877F2', label: 'facebook' },
  twitter: { icon: '🐦', color: '#000000', label: 'twitter' },
  linkedin: { icon: '💼', color: '#0A66C2', label: 'linkedin' },
  line: { icon: '💚', color: '#00B900', label: 'line' },
  whatsapp: { icon: '📱', color: '#25D366', label: 'whatsapp' },
  telegram: { icon: '✈️', color: '#26A5E4', label: 'telegram' },
  copy: { icon: '🔗', color: '#64748B', label: 'copyLink' },
};

function getShareUrl(platform: Exclude<Platform, 'wechat' | 'copy'>, url: string, title: string): string {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'line':
      return `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`;
    case 'whatsapp':
      return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
    default:
      return '#';
  }
}

export default function ShareButton({ locale, url, title }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = translations[locale] || translations.zh;
  const academy = t.academy as any;

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowQR(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open]);

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setShowQR(false);
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [open]);

  const handleShare = useCallback((platform: Platform) => {
    if (platform === 'wechat') {
      setShowQR(true);
      return;
    }
    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }
    const shareUrl = getShareUrl(platform, url, title);
    window.open(shareUrl, '_blank', 'width=600,height=500,scrollbars=yes');
  }, [url, title]);

  const platforms: Platform[] = ['wechat', 'facebook', 'twitter', 'linkedin', 'line', 'whatsapp', 'telegram', 'copy'];

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={buttonRef}
        onClick={() => { setOpen(!open); setShowQR(false); }}
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors cursor-pointer"
        aria-label={academy?.share || 'Share'}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        <span>{academy?.share || '分享'}</span>
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-semibold text-slate-700">{academy?.shareTitle || '分享到'}</h3>
          </div>

          {/* QR Code View */}
          {showQR ? (
            <div className="p-6 text-center">
              <div className="inline-block p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                <QRCodeSVG
                  value={url}
                  size={160}
                  level="M"
                  includeMargin={false}
                  fgColor="#1e293b"
                />
              </div>
              <p className="mt-3 text-sm text-slate-500">{academy?.wechatTip || '微信扫一扫分享'}</p>
              <button
                onClick={() => setShowQR(false)}
                className="mt-3 text-xs text-primary hover:underline"
              >
                ← {academy?.share || '分享'}
              </button>
            </div>
          ) : (
            /* Platform Grid */
            <div className="grid grid-cols-4 gap-1 p-3">
              {platforms.map((platform) => {
                const config = platformConfig[platform];
                const label = academy?.[config.label] || config.label;
                const isCopied = platform === 'copy' && copied;

                return (
                  <button
                    key={platform}
                    onClick={() => handleShare(platform)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                      style={{ background: `${config.color}15` }}
                    >
                      {config.icon}
                    </div>
                    <span className="text-[11px] text-slate-500 group-hover:text-slate-700 leading-tight">
                      {isCopied ? (academy?.copied || '已复制') : label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

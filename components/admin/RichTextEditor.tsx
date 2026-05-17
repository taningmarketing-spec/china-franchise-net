'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full border border-gray-200 rounded-lg" style={{ minHeight: '320px' }}>
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-8 h-6 bg-gray-200 rounded skeleton" />
          ))}
        </div>
        <div className="p-4 space-y-2" style={{ minHeight: '280px' }}>
          <div className="h-4 bg-gray-100 rounded w-full skeleton" />
          <div className="h-4 bg-gray-100 rounded w-5/6 skeleton" />
          <div className="h-4 bg-gray-100 rounded w-4/5 skeleton" />
        </div>
      </div>
    );
  }

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder={placeholder || '输入文章内容...'}
      modules={{
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['blockquote', 'code-block'],
          ['clean'],
        ],
      }}
      formats={[
        'header', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'align', 'link', 'image',
        'blockquote', 'code-block',
      ]}
    />
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function AdminHubLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 800);
    const hide = setTimeout(() => setVisible(false), 1500);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 bg-gradient-to-br from-[#3B82F6] to-[#0F172A] ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center mb-6">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white/30"></div>
        <span className="absolute text-4xl font-extrabold text-white tracking-widest">QS</span>
      </div>
      <span className="text-white font-medium animate-pulse text-sm tracking-wide">
        Loading Quickstack...
      </span>
    </div>
  );
}

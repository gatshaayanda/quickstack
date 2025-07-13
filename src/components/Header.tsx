'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          QUICKSTACK
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav
          className={`
            ${isOpen ? 'flex' : 'hidden'}
            flex-col space-y-4 items-start
            md:flex md:flex-row md:space-y-0 md:space-x-6 md:items-center
          `}
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Showcase', href: '/portfolio' },
            { label: 'Start App', href: '/new' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[#0F172A] hover:text-[#3B82F6] transition font-medium"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/client/login"
            className="bg-[#C9A43E] text-[#0F172A] px-4 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition"
          >
            Launchpad Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

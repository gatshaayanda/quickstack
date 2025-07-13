import type { Metadata } from 'next'
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loader from '@/components/AdminHubLoader'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: 'Quickstack',
  description: 'Fast fullstack app starter. Built by Ayanda Kopano Gatsha.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} bg-[--background] text-[--foreground] font-sans min-h-screen flex flex-col`}
      >
        <Loader />
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
          <Header />
        </div>
        <main className="flex-grow container py-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

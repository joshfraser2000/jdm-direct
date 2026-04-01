import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'JDM Direct — Import Japanese Vehicles to the US',
  description:
    'Buy authentic JDM vehicles directly from Japan. All vehicles comply with the US 25-year import rule. Supra, GT-R, NSX, RX-7, STI, and more.',
  keywords: 'JDM, Japanese import, Supra, GT-R, NSX, RX-7, Skyline, import cars, right hand drive',
  openGraph: {
    title: 'JDM Direct — Authentic Japanese Imports',
    description: 'Own the car you always dreamed about. Imported legally, delivered to your door.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased bg-neutral-950 text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

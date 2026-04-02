import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

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
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col" style={{ background: '#010101', color: '#fefefe', fontFamily: "'Lato', 'Arial', sans-serif" }}>
        <Navbar />
        {/* Offset for fixed navbar */}
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

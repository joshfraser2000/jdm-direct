'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '@/lib/nav-config'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(to bottom, #010101 0%, #010101 40%, transparent 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="text-[#d31f26] font-black text-3xl tracking-tight rpm-heading">JDM</span>
            <span className="text-[#fefefe] font-black text-3xl tracking-widest rpm-heading">DIRECT</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#fefefe] hover:bg-[rgba(119,119,119,0.8)] px-3 py-1.5 transition-colors rpm-heading font-light tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link href="/vehicles">
              <button className="btn-rpm px-5 py-2 text-sm">
                Shop Now
              </button>
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#fefefe] hover:bg-[rgba(119,119,119,0.4)]">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="border-[rgba(255,255,255,0.08)]" style={{ background: '#010101' }}>
              <div className="flex flex-col gap-6 mt-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-light text-[#fefefe] tracking-widest rpm-heading hover:text-[#d31f26] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/vehicles" onClick={() => setOpen(false)}>
                  <button className="btn-rpm w-full px-5 py-2.5 text-sm mt-4">
                    Shop Now
                  </button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

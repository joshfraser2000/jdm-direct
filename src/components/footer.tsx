import Link from 'next/link'
import { FOOTER_SHOP_LINKS, FOOTER_INFO_LINKS } from '@/lib/nav-config'

export function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-500 font-black text-2xl">JDM</span>
              <span className="text-white font-bold text-lg">DIRECT</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Your direct source for authentic Japanese Domestic Market vehicles, imported legally and
              delivered to your door. All vehicles comply with the US 25-year import rule.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {FOOTER_SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Info</h4>
            <ul className="space-y-3">
              {FOOTER_INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} JDM Direct. All vehicles imported under US 25-year import exemption (49 CFR 591.5).
          </p>
          <p className="text-neutral-600 text-xs">
            All prices in USD. Import duties and state taxes may apply.
          </p>
        </div>
      </div>
    </footer>
  )
}

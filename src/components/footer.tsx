import Link from 'next/link'
import { FOOTER_SHOP_LINKS, FOOTER_INFO_LINKS } from '@/lib/nav-config'

export function Footer() {
  return (
    <footer style={{ background: '#010101', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-5">
              <span className="rpm-heading font-black text-2xl" style={{ color: '#d31f26' }}>JDM</span>
              <span className="rpm-heading font-black text-2xl tracking-widest" style={{ color: '#fefefe' }}>DIRECT</span>
            </div>
            <p className="font-light leading-relaxed max-w-xs" style={{ color: '#aaa', fontSize: '0.85rem' }}>
              Your direct source for authentic Japanese Domestic Market vehicles, imported legally and
              delivered to your door. All vehicles comply with the US 25-year import rule.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="rpm-heading font-normal tracking-[0.25em] mb-5" style={{ color: '#fefefe', fontSize: '0.75rem' }}>
              Shop
            </h4>
            <ul className="space-y-3">
              {FOOTER_SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-light transition-colors hover:text-[#fefefe]"
                    style={{ color: 'rgb(144,144,144)', fontSize: '0.85rem' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="rpm-heading font-normal tracking-[0.25em] mb-5" style={{ color: '#fefefe', fontSize: '0.75rem' }}>
              Info
            </h4>
            <ul className="space-y-3">
              {FOOTER_INFO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-light transition-colors hover:text-[#fefefe]"
                    style={{ color: 'rgb(144,144,144)', fontSize: '0.85rem' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-light" style={{ color: '#555', fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} JDM Direct. All vehicles imported under US 25-year import exemption (49 CFR 591.5).
          </p>
          <p className="font-light" style={{ color: '#555', fontSize: '0.75rem' }}>
            All prices in USD. Import duties and state taxes may apply.
          </p>
        </div>
      </div>
    </footer>
  )
}

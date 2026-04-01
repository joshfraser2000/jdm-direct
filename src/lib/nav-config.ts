// Single source of truth for navigation links.
// Used by Navbar, Footer, and any breadcrumb components.

export const NAV_LINKS = [
  { href: '/vehicles', label: 'Browse Vehicles' },
  { href: '/coming-soon', label: 'Coming Soon' },
  { href: '/how-it-works', label: 'How It Works' },
] as const

export const FOOTER_SHOP_LINKS = [
  { href: '/vehicles', label: 'All Vehicles' },
  { href: '/vehicles?make=Toyota', label: 'Toyota' },
  { href: '/vehicles?make=Nissan', label: 'Nissan' },
  { href: '/vehicles?make=Honda', label: 'Honda' },
  { href: '/coming-soon', label: 'Coming Soon' },
] as const

export const FOOTER_INFO_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/shipping', label: 'Shipping & Import' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
] as const
